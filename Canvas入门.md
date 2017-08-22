# Canvas入门

## 基本要点
+ var ctx = document.getElementById('canvas').getContext('2d')
+ 每次开始绘制一个图形请使用ctx.beginPath()
+ 画布的宽高最好通过js计算动态设置html上的width/height,而非通过css设置(避免模糊)

## 鼠标事件
```javascript
const c = document.getElementById('canvas')
c.addEventListener('click', function (e) {
  // getgetBoundingClientRect() 获得画布相对屏幕的坐标
  // x,y 为点击点在画布的坐标(不考虑画布的padding/margin)
  // 通过x,y 与 画布上图形坐标比较
  let x = e.pageX - this.getBoundingClientRect().left
  let y = e.pageY - this.getBoundingClientRect().top
}, false)
```
