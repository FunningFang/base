/**
 * 检测元素是否已存在，并触发回调函数
 * @param {string} selector 选择器
 * @param {Function} func 回调函数
 * @param {number} times 查询次数
 * @param {number} interval 毫秒
 * @return {jQuery} jquery对象
 */
jQuery.fn.wait = function (selector, func, times, interval) {
    let _times = times || -1, // 100次
        _interval = interval || 20, // 20毫秒每次
        _self = this,
        _iIntervalID; // 定时器id
    if(this.length){ // 如果已经获取到了，就直接执行函数
        func && func.call(this);
    } else {
        _iIntervalID = setInterval(function() {
            if(!_times) { // 是0就退出
                clearInterval(_iIntervalID);
            }
            _times <= 0 || _times--; // 如果是正数就 --

            _self = $(selector); // 再次选择
            if(_self.length) { // 判断是否取到
                func && func.call(_self);
                clearInterval(_iIntervalID);
            }
        }, _interval);
    }
    return this;
};