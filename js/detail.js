window.addEventListener('load',function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big_img');
    // 移入移出显示隐藏
    preview_img.addEventListener('mouseover',function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout',function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    // 获取鼠标在preview_img里的坐标
    preview_img.addEventListener('mousemove',function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        maskX = x -mask.offsetWidth/2 ;
        maskY = y -mask.offsetHeight/2;
        // 设置最小移动位置和最大移动位置
        // 遮挡层移动距离maskX,maskY
        // 遮挡层最大移动距离 maskmax
        maskmax = preview_img.offsetWidth - mask.offsetWidth;
        if(maskX <= 0) {
            maskX = 0;
        } else if(maskX >= maskmax) {
            maskX = maskmax;
        }
        if(maskY <= 0) {
            maskY = 0;
        } else if(maskY >= maskmax) {
            maskY = maskmax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 设置大图片跟随移动功能
        var big = document.querySelector('.big');
        var big_img = document.querySelector('.big_img');
        // 大图片最大移动距离
        var bigmax = big.offsetWidth - big_img.offsetWidth;
        // 大图片移动距离
        var bigY = maskY * bigmax / maskmax;
        var bigX = maskX * bigmax / maskmax;
        big.style.left = -bigX + 'px';
        big.style.top = -bigY + 'px';
        
    })
})