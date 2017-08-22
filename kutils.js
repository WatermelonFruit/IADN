/* 原生js工具集 */

// arr是否包含obj
function contains(arr, obj) {
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
  var radLat1 = lat1 * Math.PI / 180.0
  var radLat2 = lat2 * Math.PI / 180.0
  var a = radLat1 - radLat2
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137
  s = Math.round(s * 10000) / 10
  return s
}

// 判断一个点是否在一个多边形范围内
function isPointInArr(point, arr) {
  var x = point[0]
  var y = point[1]
  var inside = false;
  for (var i = 0, j = arr.length - 1; i < arr.length; j = i++) {
    var xi = arr[i][0], yi = arr[i][1]
    var xj = arr[j][0], yj = arr[j][1]
    var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    if (intersect) {
      inside = !inside
    }
  }
  return inside
}

// 获得两个数之间的随机数
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

// 时间转化为string 例如 getTimeToString(new Date(new Date().getTime() - 1000 * 60 * 60 *24), 'yyyy-MM-dd-h-mm-ss')
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
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (o.hasOwnProperty(k)) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      }
    }
  }
  return fmt
}

// 'yy-MM-dd' -> 'yymmdd'
function timeFormat2Str(str) {
  var arr = str.split('-')
  var newStr = ''
  for (var i in arr) {
    newStr += arr[i]
  }
  return newStr
}

// 根据输入日期，返回当月最后一日，输入日期格式为'yyyy-MM-dd'
function getMonthEnd(date) {
  var dateArr = date.split('-')
  var monthStart = new Date(dateArr[0], dateArr[1], 1)
  return dateArr[0] + '-' + dateArr[1] + '-' + new Date(new Date(dateArr[0], dateArr[1], 1).getTime() - 1000 * 60 * 60 * 24).getDate()
}

/* 数组转换成字符串
    arr 原始一维数组
    symbol 连接符
    quote 是否开启引号
    例如： [1,2,4],'-',true -> "'1'-'2'-'4'"
          [1,2,4],'-',true ->  "1-2-4"
  */
function arr2Str(arr, symbol, quote) {
  var str = ''
  for (var i in arr) {
    if (Number(i) === arr.length - 1) {
      quote ? str += "'" + arr[i] + "'" : str += arr[i]
    } else {
      quote ? str += "'" + arr[i] + "'" + symbol : str += arr[i] + symbol
    }
  }
  return str
}

// strToDate('2017-04-02') -> Sun Apr 02 2017 00:00:00 GMT+0800 (中国标准时间)
function strToDate(str) {
  var arr = str.split('-')
  if (arr.length === 2) {
    return new Date(arr[0], Number(arr[1]) - 1)
  }
  return new Date(arr[0], Number(arr[1]) - 1, arr[2])
}

// 获得两个日期之间的所有日期(含本身)
// 如 getDayBetween('2017-03-24', '2017-04-02') -> ['2017-03-24', '2017-03-25', '2017-03-26', '2017-03-27', '2017-03-28', '2017-03-29', '2017-03-30', '2017-04-01', '2017-04-02']
function getDayBetween(start, end, split) {
  var startTime = strToDate(start)
  var endTime = strToDate(end)
  var dateArr = []
  while ((endTime.getTime() - startTime.getTime()) >= 0) {
    var year = startTime.getFullYear()
    var month = (startTime.getMonth() + 1).toString().length === 1 ? '0' + (startTime.getMonth() + 1).toString() : startTime.getMonth() + 1
    var day = startTime.getDate().toString().length === 1 ? '0' + startTime.getDate() : startTime.getDate()
    dateArr.push(split ? year + '-' + month + '-' + day : year + month.toString() + day)
    startTime.setDate(startTime.getDate() + 1)
  }
  return dateArr
}

//获得两个月之间的所有月份(含本身)
function getMonthBetween(start, end, split) {
  var result = []
  var s = start.split('-')
  var e = end.split('-')
  var min = new Date(s[0], Number(s[1]) - 1)
  var max = new Date(e[0], Number(e[1]) - 1)
  var curr = min
  while (curr <= max) {
    var month = (curr.getMonth() + 1).toString().length === 1 ? '0' + (curr.getMonth() + 1).toString() : curr.getMonth() + 1
    result.push(split ? curr.getFullYear() + '-' + month : curr.getFullYear() + month.toString())
    curr.setMonth(month)
  }
  return result
}

// 获取某日前num天日期 getBeforeDate('2017-04-02',2) -> '2017-03-31'
function getBeforeDay(date, num) {
  var current_date = strToDate(date).getTime()
  var startTime = new Date(current_date - 1000 * 60 * 60 * 24 * num)
  var year = startTime.getFullYear()
  var month = (startTime.getMonth() + 1).toString().length === 1 ? '0' + (startTime.getMonth() + 1).toString() : startTime.getMonth() + 1
  var day = startTime.getDate().toString().length === 1 ? '0' + startTime.getDate() : startTime.getDate()
  return year + '-' + month + '-' + day
}

// 获取某月前num月日期 getBeforeDate('2017-04',2) -> '2017-02'
function getBeforeMonth(date, num) {
  var x = strToDate(date)
  var month = x.getMonth() + 1
  x.setMonth(month - (num + 1))
  var start_year = x.getFullYear()
  var start_month = (x.getMonth() + 1).toString().length === 1 ? '0' + (x.getMonth() + 1).toString() : x.getMonth() + 1
  return start_year + '-' + start_month
}

// sql null 转化为 '--'
function dealSqlNull(str, substring) {
  if (typeof substring === 'number') {
    return "CASE WHEN " + str + " IS NULL THEN CAST('--' AS VARCHAR) ELSE SUBSTRING(CAST(" + str + " AS VARCHAR),0," + substring + ") END"
  }
  return "CASE WHEN " + str + " IS NULL THEN CAST('--' AS VARCHAR) ELSE CAST(" + str + " AS VARCHAR) END"
}

// 将HTML转换为节点
const html2node = (str) => {
  let container = document.createElement('div')
  container.innerHTML = str
  return container.children[0]
}

// 赋值、扩展
const extend = (a, b) => {
  for (let i in b) {
    if (typeof a[i] === 'undefined') {
      a[i] = b[i]
    }
  }
  return a
}

// add ClassName
const addClass = (node, className) => {
  let current = node.className || ''
  if ((` ${current} `).indexOf(` ${className} `) === -1) {
    node.className = current ? (`${current} ${className}`) : className
  }
}

// remove ClassName
const removeClass = (node, className) => {
  let current = node.className || ''
  node.className = (` ${current} `).replace(` ${className} `, " ").trim()
}

// has ClassName
const hasClass = (node, className) => {
  let current = node.className || ''
  if (current.match(new RegExp(`(\\s|^)${className}(\\s|$)`))) {
    return true
  } else {
    return false
  }
}
