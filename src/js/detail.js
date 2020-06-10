//获取地址栏id
let id = location.search.substring(1).split('=')[1];
let Datu = document.querySelector('#spic img');//大图
let Datu1 = document.querySelector('#df img');//二培大图
let Xiaotu = document.querySelector('#list');//小图表
let btn = document.querySelector('.k-1');//购物车按钮
let value = document.querySelector('.value');//input的值
let jia = document.querySelector('.jia');//加号
let jian = document.querySelector('.jian');//减号
let mony = document.querySelector('.mony');//价格
let da = document.querySelector('.p1 a');//大标题
let xiao = document.querySelector('.p2');//小标题
//console.log(Xiaotu)

$ajax({
    url: 'http://localhost/JS2002/SMHYSC/php/getsid.php',
    data: {
        sid: id
    },
    success: function (data) {
        let arrdata = JSON.parse(data);
        Datu.src = arrdata.url;
        Datu1.src = arrdata.url;
        da.innerHTML = arrdata.title;
        xiao.innerHTML = arrdata.title2;
        mony.innerHTML = arrdata.price;
        let url2 = arrdata.picelisturl.split(',');//获取小图数据进行渲染
        console.log(url2);
        let str = '';
        console.log(str);
        for (let i = 0; i < url2.length; i++) {//循环渲染数据
            str += `
                
                    <img src="${url2[i]}">
                 
            `;
        }
        str += '';
        console.log(str);
        console.log(Xiaotu);
        Xiaotu.innerHTML = str;
    }

})

// //放大镜
function Scale() {
    this.scale = document.querySelector('#box1');
    this.spic =document.querySelector('#spic'); //小图
    this.spicimg=this.spic.children[0];
    this.sf = document.querySelector('#sf'); //小放
    this.df = document.querySelector('#df'); //大放
    this.bpic = this.df.children[0]; //大图
    this.list=document.querySelector('#list');
    this.listimg=this.list.children;
    console.log(this.listimg)//大盒子
}

Scale.prototype.init = function () {
    //1.鼠标经过小图，显示小放和大放
    this.scale.onmouseover = () => {
        this.sf.style.display = 'block';
        this.df.style.display = 'block';


        //2.求小放的尺寸和比例
        this.sf.style.width = this.spic.offsetWidth * this.df.offsetWidth / this.bpic.offsetWidth +
        'px';
        this.sf.style.height = this.spic.offsetHeight * this.df.offsetHeight / this.bpic.offsetHeight +
            'px';

        //比例
        this.bili = this.bpic.offsetWidth / this.spic.offsetWidth;

        //3.小图添加鼠标移动事件
        this.spic.onmousemove = (ev) => {
            var ev = ev || window.event;
            let l = ev.clientX - this.scale.offsetLeft - this.sf.offsetWidth / 2;
            let t = ev.clientY - this.scale.offsetTop - this.sf.offsetHeight / 2;
            if (l < 0) {
                l = 0
            } else if (l >= this.spic.offsetWidth - this.sf.offsetWidth) {
                l = this.spic.offsetWidth - this.sf.offsetWidth - 2;
            }
            if (t < 0) {
                t = 0
            } else if (t >= this.spic.offsetHeight - this.sf.offsetHeight) {
                t = this.spic.offsetHeight - this.sf.offsetHeight - 2;
            }


            this.sf.style.left = l + 'px';
            this.sf.style.top = t + 'px';
            this.bpic.style.left = -l * this.bili + 'px';
            this.bpic.style.top = -t * this.bili + 'px';
        }
         // 5 点击小图 切换图片
         for(let i=0;i<this.listimg.length;i++){
            this.listimg[i].onmousemove=()=>{
                //console.log(this.listimg[i])
                this.bpic.src=this.listimg[i].src;
                this.spicimg.src=this.listimg[i].src;
            }
        }
    };

    this.scale.onmouseout = () => {
        this.sf.style.display = 'none';
        this.df.style.display = 'none';
    };
}

new Scale().init();