//获取地址栏id
let id = location.search.substring(1).split('=')[1];
let Datu = document.querySelector('.spic img');//大图
let Xiaotu = document.querySelector('.list');//小图表
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
        da.innerHTML = arrdata.title;
        xiao.innerHTML = arrdata.title2;
        mony.innerHTML = arrdata.price;
        let url1 = arrdata.picelisturl.split(',');//获取小图数据进行渲染
        console.log(url1);
        let str = '<ul>';
        console.log(str);
        for (let i = 0; i < url1.length; i++) {//循环渲染数据
            str += `
                 <li>
                    <img src="${url1[i]}">
                 </li>
            `;
        }
        str+='</ul>';
        console.log(str);
        console.log(Xiaotu);
        Xiaotu.innerHTML=str;
    }
    
})
