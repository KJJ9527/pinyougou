function animate(obj,target,callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var temp = (target - obj.offsetLeft) / 10;
        temp = temp > 0 ? Math.ceil(temp) : Math.floor(temp);
        if(obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if(callback) {
            //     callback();
            // }
            callback&&callback();
        }
        obj.style.left = obj.offsetLeft + temp + 'px';
    },15)
}