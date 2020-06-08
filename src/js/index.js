let con = document.querySelectorAll('.con')[0];
let con1 = document.querySelectorAll('.con')[1];
let con2 = document.querySelectorAll('.con')[2];
console.log(con1);
$ajax({
    url: 'http://localhost/JS2002/SMHYSC/php/index.php',
    success: function (data) {
        console.log(JSON.parse(data))
        let arrdata = JSON.parse(data);//解析字符串
        let str = '';
        let str1 = '';
        let str2 = '';
        for (let i = 0; i <= 3; i++) {
            str += `
        <div class="con-1">
            <a href="#">
            <div class="con-2">
                <img src="${arrdata[i].url}" alt="">
            </div>
            <p style="padding-left: 65px;">
                <em class="x-tu"></em>${arrdata[i].title}
            </p>
            <span><em class="money">￥</em>${arrdata[i].price}</span>
            <div class="yuan">
                <div class="yuan-1">
                    <p>已省</p>
                    <p>
                        <em>￥</em>69
                    </p>
                </div>
            </div>
        </a> 
        </div>`;
        }
        for (let i = 4; i < 9; i++) {
            str1 += `
                    <div class="con-1">
                        <a href="#">
                        <div class="con-2">
                            <img src="${arrdata[i].url}" alt="">
                        </div>
                        <p style="padding-left: 65px;">
                            <em class="x-tu"></em>${arrdata[i].title}
                        </p>
                        <span><em class="money">￥</em>${arrdata[i].price}</span>
                        <div class="yuan">
                            <div class="yuan-1">
                                <p>已省</p>
                                <p>
                                    <em>￥</em>29
                                </p>
                            </div>
                        </div>
                    </a> 
                    </div>`;
        }
        for (let i = 9; i < 14; i++) {
            str2 += `
                    <div class="con-1">
                        <a href="#">
                        <div class="con-2">
                            <img src="${arrdata[i].url}" alt="">
                        </div>
                        <p style="padding-left: 65px;">
                            <em class="x-tu"></em>${arrdata[i].title}
                        </p>
                        <span><em class="money">￥</em>${arrdata[i].price}</span>
                        <div class="yuan">
                            <div class="yuan-1">
                                <p>已省</p>
                                <p>
                                    <em>￥</em>99
                                </p>
                            </div>
                        </div>
                    </a> 
                    </div>`;
        }
        con.innerHTML = str;
        con1.innerHTML = str1;
        con2.innerHTML = str2;
    }
});

//轮播图
class Lunbo{
    constructor(){
        this.banner=document.querySelector('.banner');//大盒子
        this.Li=document.querySelector('.banner ul li');//获取图片
        this.Span=document.querySelector('.p1 span');//跟随按钮
        this.num=0;//当前索引
        this.timer=null;//关闭定时器
    }
    init(){
        let _this=this;//指针
        for(let i=0;i<this.Span.length;i++){//遍历按钮长度 给num添加索引
            this.Span[i].onmouse
        }
    }
}