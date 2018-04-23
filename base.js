let addListener;

addListener = window.addEventListener?
function (type, fn) {document.addEventListener(type, fn, false)}:
function (type, fn) {document.attachEvent('on'+type, fn)};