!function () {
    const shoujihao = document.querySelector('.shoujihao');
    const password = document.querySelector('.yanzhengma');
    const btn = document.querySelector('.btn');
    btn.onclick = function () {
        $ajax({
            type: 'post',
            url: 'http://localhost/JS2002/SMHYSC/php/login.php',
            data: {//将用户名和密码传给后端
                user: shoujihao.value,
                pass: (password.value)
            },
            success: function (data) {//返回1 登录成功  返回空  登录失败
                if (data) {//登录成功
                    location.href = 'index.html';
                    localStorage.setItem('shoujihao', shoujihao.value);//将用户名永久存储。
                } else {//登录失败
                    alert('用户名或者密码错误');
                    password.value = '';
                }
            }
        });
    }
}();