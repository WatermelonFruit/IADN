/* 原生js工具集 */
// arr是否包含obj
function contains1(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

// 获取两点经纬度距离;返回单位为m
function getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10;
    return s;
};

// 判断一个点是否在一个多边形范围内
function isPointInArr(point, arr) {
    var x = point[0];
    var y = point[1];
    var inside = false;
    for (var i = 0, j = arr.length - 1; i < arr.length; j = i++) {
        var xi = arr[i][0], yi = arr[i][1];
        var xj = arr[j][0], yj = arr[j][1];
        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
}

// 获得两个数之间的随机数
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// 时间转化为string 例如 getTimeToString(new Date(new Date().getTime() - 36000000), 'yyyy-MM-dd-h-mm-ss')
function getTimeToString(date, fmt) { //原author: meizz， jk改造
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
};

// 将HTML转换为节点
const html2node = (str) => {
    let container = document.createElement('div');
    container.innerHTML = str;
    return container.children[0];
}

// 赋值、扩展
const extend = (a, b) => {
    for (let i in b) {
        if (typeof a[i] === 'undefined') {
            a[i] = b[i];
        }
    }
    return a;
}

// add ClassName
const addClass = (node, className) => {
    let current = node.className || "";
    if ((` ${current} `).indexOf(` ${className} `) === -1) {
        node.className = current ? (`${current} ${className}`) : className;
    }
}

// remove ClassName
const removeClass = (node, className) => {
    let current = node.className || "";
    node.className = (` ${current} `).replace(` ${className} `, " ").trim();
}

// has ClassName
const hasClass = (node, className) => {
    let current = node.className || "";
    if (current.match(new RegExp(`(\\s|^)${className}(\\s|$)`))) {
        return true;
    } else {
        return false;
    }
}