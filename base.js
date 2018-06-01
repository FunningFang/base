function addAttr(elem, attr, val) {
	let name = elem.getAttribute(attr), hasVal = name ? name.indexOf(val) + 1 ? 1 : 2 : 3;
	if (hasVal === 1) {
		console.log('已有此属性名且有此键值');
		return false
	} else if (hasVal === 2) {
		name = name.concat(' ' + val);
		elem.setAttribute(attr, name)
	} else if (hasVal === 3) {
		elem.setAttribute(attr, val)
	}
}
function removeAttr(elem, attr, val) {
	let name = elem.getAttribute(attr), hasVal = name ? name.indexOf(val) + 1 ? 1 : 0 : 0;
	if (hasVal) {
		name = name.replace(val, '');
		elem.setAttribute(attr, name)
	} else {
		console.log('没有此属性名或没有此键值') return false
	}
}
function replaceAttr(elem, attr, val1, val2) {
	let name = elem.getAttribute(attr), hasVal1 = name ? name.indexOf(val1) + 1 ? 1 : 0 : 0, hasVal2 = hasVal1 ? name.indexOf(val2) + 1 ? 0 : 1 : 0;
	if (hasVal2) {
		name = name.replace(val1, val2);
		elem.setAttribute(attr, name)
	} else {
		return false
	}
}
function siblings(elem) {
	let arr = [], p = elem.parentNode.children, len = p.length, i = 0;
	for (; i < len; i++) {
		if (p[i] !== elem) {
			arr.push(p[i])
		}
	}
	return arr
}
function nextSiblings(elem) {
	let arr = [], n = elem.nextSibling;
	for (; n; n = n.nextSibling) {
		if (n.nodeType === 1) {
			arr.push(n)
		}
	}
	return arr
}
function prevSiblings(elem) {
	let arr = [], n = elem.previousSibling;
	for (; n; n = n.previousSibling) {
		if (n.nodeType === 1) {
			arr.push(n)
		}
	}
	return arr
}
function ajax(options) {
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || 'json';
	options.async = options.async ? true : false;
	let params = getParams(options.data), xhr;

	function getParams(data) {
		let arr = [];
		for (let param in data) {
			arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]))
		}
		arr.push(('randomNumber=' + Math.random()).replace('.'));
		return arr.join('&')
	}
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest()
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP')
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			let status = xhr.status;
			if ((status >= 200 && status < 300) || xhr.status === 304) {
				options.success && options.success(xhr.responseText, xhr.responseXML)
			} else {
				options.error && options.error(status)
			}
		}
	};
	if (options.type == 'GET') {
		xhr.open("GET", options.url + '?' + params, options.async);
		xhr.send(null)
	} else if (options.type == 'POST') {
		xhr.open('POST', options.url, options.async);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(params)
	}
}
function addEvent(elem, type, fn) {
	window.addEventListener ? elem.addEventListener(type, fn, false) : elem.attachEvent('on' + type, fn)
}
function removeEvent(elem, type, fn) {
	window.removeEventListener ? elem.removeEventListener(type, fn) : elem.detachEvent('on' + type, fn)
}