window.addEventListener('load', function () {
    // 获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    var li = ul.querySelectorAll('li');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    // 鼠标经过focus,就显示隐藏左右按钮,停止自动播放
    focus.addEventListener('mouseover', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        tiemr = null;   //清除定时器变量
    })
    // 鼠标离开，隐藏，自动播放
    focus.addEventListener('mouseout', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = window.setInterval(function () {
            arrow_r.click();
        }, 2000)
    })
    // 动态生成小圆圈,有几张图片就生成几个小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        // 创建节点
        var li = document.createElement('li');
        // 将节点追加到ol里面
        ol.appendChild(li);
        // 所有的li创建index索引号
        li.setAttribute('index', i);
        // 绑定事件,排他思想,切换circle,干掉所有人,留下我自己
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                // 是 ol.children[i] 所有的孩子 不是 li[i];
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            // 当我们点击了某个小li,就要把这个li的索引号给num
            num = index;
            // 当我们点击了某个小li,就要把这个li的索引号给circle
            circle = index;
            // 点击小圆圈，移动图片，当然移动的是ul,移动距离为 - index * focusWidth 
            // ul必须有定位才能执行动画
            animate(ul, -index * focusWidth);
        })
    }
    // 第一个li添加类名 current
    ol.children[0].className = 'current';
    // 克隆第一张图片添加到最后一个li中
    var clone = ul.children[0].cloneNode(true);
    ul.appendChild(clone);
    // 全局变量,左测图片也需要用
    var num = 0;
    var circle = 0;
    var focusWidth = focus.offsetWidth;
    // 点击右侧按钮，图片滚动一张
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            // 关闭节流阀
            flag = false;
            // 如果走到最后复制的一张图片,此时,我们的ul要快速复原left改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                // 打开节流阀
                flag = true;
            });
            // 点击右侧按钮,小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 先清除所有小圆圈，留下我自己
            circleChange();
        }
    })


    // 点击左侧按钮，图片滚动一张
    // flag 节流阀
    var flag = true;
    arrow_l.addEventListener('click', function () {
        if (flag) {
            // 关闭节流阀
            flag = false;

            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 点击左侧按钮,小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle<0 说明第一张图片,则小圆圈要改为第4个小圆圈
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 先清除所有小圆圈，留下我自己
            circleChange();
        }
    })
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = window.setInterval(function () {
        arrow_r.click();
    }, 2000)
})