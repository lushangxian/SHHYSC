let cont = document.querySelector('.cont');
$ajax({
    url: 'http://localhost/JS2002/SMHYSC/php/listdata.php',
    success: function (data) {
        console.log(JSON.parse(data) )
        let arrdata = JSON.parse(data);//解析字符串
        let str = '<div class="cont-1">';
       for(var i=0;i<arrdata.length;i++){
            str += `
            <div class="sp" style="z-index:10";>
                    <div class="sp1">
                        <a href="detail.html?=${arrdata[i].sid}">
                        <img class="lazy" data-original="${arrdata[i].url}" width="200" height="200"/>
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
                        <em><b>￥</b>${arrdata[i].price}</em>
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
//