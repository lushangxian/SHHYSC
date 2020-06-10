let cont = document.querySelector('.cont');
$ajax({
    url: 'http://localhost/JS2002/SMHYSC/php/listdata.php',
    success: function (data) {
        console.log(JSON.parse(data))
        let arrdata = JSON.parse(data);//解析字符串
        let str = '<div class="cont-1">';
        for (var i = 0; i < arrdata.length; i++) {
            str += `
            <div class="sp" style="z-index:10";>
                    <div class="sp1">
                        <a href="detail.html?=${arrdata[i].sid}">
                        <img class="lazy" data-original="${arrdata[i].url}" width="240" height="240"/>
                        </a>
                        <div class="yuan">
                            <img src="../img/1.tmp" alt="">
                        </div>
                    </div>
                    <p class="p1">
                        <em></em>
                        <a href="javascript:;">${arrdata[i].title}</a>
                    </p>
                    <p class="p2">
                        ${arrdata[i].title2}
                    </p>
                    <p class="p3">
                        <em class="price"><b>￥</b>${arrdata[i].price}</em>
                    </p>
                    <div class="shopp">
                        <ul>
                            <li class="jian">–</li>
                            <li class="m"><input type="text" value="1" class="int"></li>
                            <li class="jia">+</li>
                        </ul>
                        
                        <a href="javascript:;" class="shopCar">
                            <i class="icon iconfont"></i><span>加入购物车</span>
                        </a>
                </div>
                <div class="xiaog"></div>
            </div>
            `;
        }
        str += '</div>';
        cont.innerHTML = str;
        //添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    }
});
//点击展出 列表
const dt = document.querySelectorAll('.dt');
const dd = document.querySelectorAll('.dd');
const d1 = document.querySelectorAll('.d1 span');
const fenye = document.querySelector('.fenye-1');

function fn() {
    fenye.addEventListener('click', (e) => {//时间监听 点击
        e = e || window.event;//兼容
        var tag = e.target || src.element;//获取当前操作对象 游览器兼容
        //console.dir(e)
        if (tag.getAttribute('class') == 'dt') {//getAttribute() 方法返回指定属性名的属性值
            let index = tag.getAttribute('index');
            console.log(index);
            if (dd[index].style.overflow == "hidden") {
                dd[index].style.overflow = "visible";
                d1[index].style.transform = "rotate(0deg)";
                dd[index].style.height = "90px";

            } else {
                dd[index].style.overflow = "hidden";
                d1[index].style.transform = "rotate(180deg)";
                dd[index].style.height = "0";
            }
        }
    })
}
fn()

//分页结构
!function ($) {
    const $list = $('.cont')
    array_default = [];//排序前的li数组
    array = [];//排序中的数组
    prev = null;
    next = null;
    //将页面的li元素加载到两个数组中
    $('.cont').each(function (index, element) {
        //console.log($('.cont-1 .sp'))
        array[index] = $(this);
        array_default[index] = $(this);
    });
    //渲染的外部无法获取内部的元素对象，通过事件委托实现。

    //2.分页思路
    //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
    $('.page').pagination({
        pageCount: 5,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());//获取的页码给后端
            $.ajax({
                url: 'http://localhost/JS2002/SMHYSC/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                console.log(data);
                let $strhtml = '<div class="cont-1">';
                $.each(data, function (index, value) {
                    $strhtml +=
        ` <div class="sp" style="z-index:10";>
            <div class="sp1">
                <a href="detail.html?=${value.sid}">
                   <img class="lazy" src='' data-original="${value.url}" width="240" height="240"/>
                </a>
                <div class="yuan">
                    <img src="../img/1.tmp" alt="">
                </div>
            </div>
            <p class="p1">
                <em></em>
                <a href="javascript:;">${value.title}</a>
            </p>
            <p class="p2">
                ${value.title2}
            </p>
            <p class="p3">
                <em class="price">￥${value.price}</em>
            </p>
            <div class="shopp">
                <ul>
                    <li class="jian">–</li>
                    <li class="m"><input type="text" value="1" class="int"></li>
                    <li class="jia">+</li>
                </ul>
                
                <a href="javascript:;" class="shopCar">
                    <i class="icon iconfont"></i><span>加入购物车</span>
                </a>
        </div>
        <div class="xiaog"></div>
       </div>
    `;
                });
                $strhtml += '</div>';
                $list.html($strhtml);

                $(function () {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });

                array_default = [];//排序前的li数组
                array = [];//排序中的数组
                prev = null;
                next = null;

                //将页面的li元素加载到两个数组中
                $('.sp').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });

    //3.排序
   // console.log($('button'))
    $('button').eq(0).on('click', function () {
        $.each(array_default, function (index, value) {
            $('.cont-1').append(value);
            console.log(value)
        });
        return;
    });
    //console.log(find('.price'))
    $('button').eq(1).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {//循环出价格数值
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                console.log(prev,next);
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $('.list ul').empty();//清空原来的列表
        //这里能够省略empty
        //append在追加的时候，如果追加的是jquery的元素对象，而jquery元素对象在你追加的元素中存在，直接取出存在的元素，从后面追加。
        //如果追加的是内容结构，依然和appendChild一样，后面继续追加。
        $.each(array, function (index, value) {
          //  console.log(value);//n.fn.init [li, context: li]
            $('.cont-1 ').append(value);
        });
    });
    $('button').eq(2).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    //     //清空原来的列表，将排序后的数据添加上去。
    //     //empty() : 删除匹配的元素集合中所有的子节点。
    //     // $('.list ul').empty();//清空原来的列表
        $.each(array, function (index, value) {
          //  console.log(value);
            $('.cont-1').append(value);
        });
     })
}(jQuery);
