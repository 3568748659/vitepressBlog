*2024/11/4 重新重构，回归浏览器相关操作，回归面向对象本质

2024/10/31，进一步优化，基于DOM和BOM进行分类，提升可读性，分离了npm库，浏览器相关操作，本文档更加专注于js本身

2024/10/9升级为js根文档，分支包括node.js，vue.js，relact.js，vite，webpack，canvans

js文档2024/1/3日重置，尽量去除框架化开发

# 0.模块化

模块化的核心思想是   模块中间是**隔离**的，通过**导入**和**导出**进行文件功能的共享

1. 防止出现全局污染(同名函数污染)
2. 依赖混乱问题，相互依赖的包有先后导入问题
3. 数据安全问题，部分js包中的数据直接引入直接就可以.出属性

##  CommonJS

通常用于服务端包管理规范，在nodejs环境中，无需安装任何其他，即可使用

#### require/exports

在nodejs中，可以直接通过名称导入

- require引入，使用对象接收

```js
const main1 = require("./1.js");
```

- exports导出

```js
const name = '2.js';
exports.name = name;
```

#### module.exports

通过nodule构造进行导出是更加常用的方式，其中对象可以任意更换

注：ES6语法同名可以简写

```java
const name = '2.js';

module.exports = {
    name: name
};
```

在同一个模块中，this，exports，module.exports指向的是同一个对象

但是无论如何修改对象，导出的都是module.exports的值

#### CJS的浏览器引用

通过browserify库进行

```
npm i browserify -g
```

将递归分析您应用程序中的所有 `require()` 调用，以便构建一个捆绑包，您可以在单个 `<script>` 标签中提供给浏览器。

```
browserify index.js -o build.js
```

之后直接在浏览器中使用build.js

## ES6模块化规范

通常使用在浏览器端，type=”model“，在node中也可以使用，但是在node中推荐使用CommonJS

在package.json中添加

```
{
	"type":"moudle"
}
```

#### export导出

export导出时必须使用const，ES6原模块与使用模块使用同一块内存，CJS不是

**提供三种导出方案，可以同时使用**

- 分别导出(单独导出)-export

  在正常想暴露中的数据头中加上export

  ```js
  export name = 'xxx'
  ```

- 统一导出-export{}

  使用类似对象

  ```js
  export {
  	name，age
  }
  ```

- 默认导出-export default{}

  导出的内容为，在import导入的是单个的default对象

  ```js
  {
  	default:{}
  }
  ```

  同样可以简写

  ```js
  export default{
  	a:name,
  	b:age,
  }
  ```

#### import引入

万能方法，无关导出，之后xxx作为对象

```js
import * as xxx from './xxx.js'
```

- **命名导入**

  在分别导出和统一导出时可以使用，default无法使用

  ```js
  export const name = '2.js';
  import { name } from './2.js';
  ```

-  默认导入，无需{}

  直接写，**随便起名**

  ```js
  export default {a:1}
  
  import xxx from './xxx.js'
  ```

  都可以混用 甚至可以

  ```js
  import xxx,{xxx,xxx} from 'xxx.js'
  ```

- 动态导入

  返回Promise对象

  ```js
  const result = await import('xxx.js')
  ```

- 直接导入

  在代码块中直接导入，可以导入并且执行一次

  ```js
  import 'xxx.js'
  ```

# 1.js与html样式

## 获取

#### 获取DOM

- 通过类名获取 -- getElementsByClassName

    ```js
    var slides = document.getElementsByClassName("imgs");
    ```

- 通过id获取  -- getElementById

    ```js
    const scrollToTopButton = document.getElementById("runToTopButton");
    ```

- 通过css获取 -- querySelector

    ```js
    const closeButton = document.querySelector(".closeja-ad");
    ```

    可以通过循环完成复杂选择

    ```js
    const cues = document.querySelectorAll('.cue');
    for (let i = 0; i < cues.length; i++) {
        cues[i].style.display = 'block';
    }
    ```

- 通过标签名获取 -- getElementsByTagName

    ```js
    const elements = document.getElementsByTagName('div');
    ```

dom是灵活的，甚至是可链式的，可以在DOM里继续获取DOM

```js
// 获取所有 color-box 元素
const colorBoxes = document.querySelectorAll('.color-box');

// 为每个 color-box 添加点击事件
colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const colorValue = box.querySelector('div:nth-child(2)').textContent.trim();
        console.log('点击的颜色值:', colorValue);
    });
});
```

#### 获取元素宽高

mainbox为获取的dom对象

```js
mainbox.clientHeight
```

#### 获取子元素宽高

ul为获取的dom对象，示例控制的是ul下的第一个li标签

```js
ul.children[0].clientHeight;
```

#### 获取输入框的值

```js
// 获取输入框的值
var inputElement = document.getElementById("myInput");
var inputValue = inputElement.value;
```

#### 获取元素位置/offsetTop

offsetTop 是一个只读属性，返回当前元素相对于 offsetParent 节点顶部边界的偏移像素值

```
DOM.offsetLeft
DOM.offsetTop
```

获取屏幕中元素距离top和left的位置，注意起始有8px的padding

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    </style>
</head>
<body>
    <div style="position: relative; top: 150px; left: 300px; width: 100px; height: 100px; background-color: black;" id="divv"></div>
    <script>
        let divv = document.getElementById("divv");
        console.log(divv.offsetLeft);
        console.log(divv.offsetTop);
    </script>
</body>
</html>
```

#### 获取点击位置

```js
canvas1.value.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    let i = Math.floor(x / 30);
    let j = Math.floor(y / 30);
    context.beginPath();
    context.arc(i * 30 + 15, j * 30 + 15, 10, 0, 2 * Math.PI);
    context.fill();
})
```

#### 获取元素大小

```js
// const targer = document.getElementById('target')

// //获取窗口长度
// const windowWidth = window.innerWidth
// //获取窗口高度
// const windowHeight = window.innerHeight
// //获取目标元素的宽度
// const targetWidth = target.offsetWidth
// //获取目标元素的高度
// const targetHeight = target.offsetHeight
// //获取目标原素的顶点位置
// let targetTop = target.offsetTop //位于document的位置
```

```
getBoundingClientRect() 是一个用于获取元素在视口中的位置和尺寸信息的方法。它返回一个 DOMRect 对象，该对象包含了指定元素的位置和尺寸信息。

具体地说，getBoundingClientRect() 方法返回的 DOMRect 对象包含以下属性：

x：元素左上角相对于视口左边缘的 X 坐标。
y：元素左上角相对于视口上边缘的 Y 坐标。
width：元素的宽度。
height：元素的高度。
top：元素顶部相对于视口顶部的距离。
right：元素右侧相对于视口左侧的距离。
bottom：元素底部相对于视口顶部的距离。
left：元素左侧相对于视口左侧的距离。
```

## 

## css相关

#### css/类切换

```js
dots[i].className = dots[i].className.replace("active", "");
```

#### 添加/减少类

```js
DOM.className += "class";
```

```
DOM.classList.add('class');
```

```
DOM.classList.remove('class');
```

#### style 改变(基本.style都能.出来)

```js
function myMove() {
        var elem = document.getElementById("myAnimation");
        var pos = 0;
        var id = setInterval(frame, 10);
        function frame() {
            if (pos == 350) {
                clearInterval(id);
            } else {
                pos++;
                elem.style.top = pos + 'px';
                elem.style.left = pos + 'px';
            }
        }
    }
```

背景颜色改变

```js
elmnt.style.backgroundColor = color;
```

#### css正负转换/添加删除类

查看类，如果有就删除， 没有就添加（vue不行）

```js
 x.classList.toggle("change");
```

#### setProperty设置css

一个更加灵活的设置css的api

```js
document.documentElement.style.setProperty("background-color", "transparent", "important");
```

## 判断css的支持性

```js
if (CSS.supports('display', 'grid')) {
  console.log('浏览器支持 CSS Grid');
} else {
  console.log('浏览器不支持 CSS Grid');
}

// 使用条件文本
if (CSS.supports('(display: grid) and (width: 100px)')) {
  // 应用特定逻辑
}
```

## 判断是否包含指定css

```js
document.documentElement.classList.contains('dark')
```

## parseInt类型转换(去px单位)

类型转换，可以去掉px，非常好用

```js
parseInt(play1.style.left)
```

## 文本注入

```js
captionText.innerHTML = this.alt;  
```

## onclick点击

```js
var img = document.getElementById('myImg');
img.onclick = function () {
    //点击 .myimg 后执行函数
}
```

## 禁止缩放

在html头里了，改后面一点就行了

```js
<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
```

## 按钮禁用

```JS
buttonElement.disabled = true; //禁用
buttonElement.disabled = false; //启用
```

## 拦截刷新

```js
window.addEventListener('beforeunload', function(event) {
    // 在这里可以执行你的操作，例如显示一个提示框
    event.preventDefault(); // 这会弹出一个确认提示框，防止用户意外刷新页面
    //event.returnValue = ''; // 在旧版本的浏览器中需要设置一个返回值来触发提示框
});
```

## 获取/设置文本

在获取dom后设置文本

```js
const playPauseButton = document.getElementById('play-pause-button');
playPauseButton.textContent = '暂停';
```

## 修改动画属性

```js
const element = document.getElementById('animatedElement');
// 修改动画属性
element.style.animationName = 'newBlock';
element.style.animationDuration = '1s';
element.style.animationIterationCount = '3';
element.style.animationTimingFunction = 'ease-in-out';
element.style.animationDelay = '0.5s';
element.style.animationDirection = 'reverse';
```

## 创建并点击对象

```js
//生成一个input
const input = document.createElement('input');
input.type = 'file';
input.accept = 'image/*';
input.onchange = (e) => {
    const file = e.target.files[0];
    loadFile(file);
};
input.click();
input.remove();
```

## 禁止鼠标滚动

```js
document.body.style.overflow = "hidden";
```

## 创建html元素

通过createElement创建元素

```js
const newDiv = document.createElement("div");
document.body.appendChild(newDiv);
```

之后通常配合添加css和内容

```js
newDiv.className = "my-class";
newDiv.classList.add("my-class", "another-class");
newDiv.textContent = "这是一个带有类名的 div 元素";
document.body.appendChild(newDiv);
```

## 翻转元素

```js
play1.style.transform = 'scaleX(-1)';
```

## 逐帧动画

非常好玩

```html
<div>
    <div id="animation"></div>
</div>
<script>
    const animation = document.getElementById('animation');
    animation.style.backgroundImage = 'url(./img/run.png)';
    const frameWidth = 128; // 每一帧的宽度
    const totalFrames = 8; // 总帧数
    let currentFrame = 0;

    function updateFrame() {
        const backgroundPositionX = -currentFrame * frameWidth;
        animation.style.backgroundPosition = `${backgroundPositionX}px 0`;
        currentFrame = (currentFrame + 1) % totalFrames;
    }

    setInterval(updateFrame, 100); // 每100ms更新一帧（10帧每秒）
</script>
```

## requestAnimationFrame动画API

`requestAnimationFrame` 是浏览器提供的一种API，用于在下一次浏览器重绘（repaint）之前执行指定的回调函数。它通常用于实现高性能的动画

**优点**

1. **帧同步**：`requestAnimationFrame` 会自动与显示器的刷新率同步（通常是60次/秒），保证动画在每一帧的绘制之间间隔均匀，从而使动画更加流畅。
2. **性能优化**：与 `setInterval` 或 `setTimeout` 不同，`requestAnimationFrame` 只在页面可见时才会执行回调函数，如果页面不可见（例如切换到另一个标签页），它会暂停调用，从而节省资源。
3. **节省CPU和GPU资源**：`requestAnimationFrame` 会在浏览器即将绘制下一帧内容时调用回调函数，这避免了不必要的绘制和资源消耗

```js
function animate() {
    // 执行动画的代码
    console.log('Animating...');
    // 继续下一帧的动画
    requestAnimationFrame(animate);
}
// 启动动画
requestAnimationFrame(animate);


let animationId;
function animate() {
    // 执行动画的代码
    console.log('Animating...');
    // 请求下一帧动画
    animationId = requestAnimationFrame(animate);
}
// 启动动画
animationId = requestAnimationFrame(animate);
// 停止动画
cancelAnimationFrame(animationId);
```

## navigator运行环境

它提供了有关**用户浏览器和运行环境的信息**

navigator.

1. **userAgent**：包含了浏览器的用户代理字符串，可以用来检测用户使用的浏览器类型和版本。
2. **appName**：返回浏览器的名称，通常是 "Netscape"。
3. **appVersion**：返回浏览器的版本信息。
4. **platform**：返回操作系统平台信息，例如 "Win32" 或 "MacIntel"。
5. **language**：返回用户浏览器的首选语言，通常是一个 BCP 47 语言标签，用于国际化。
6. **onLine**：返回一个布尔值，表示用户是否处于在线状态。
7. **geolocation**：提供了获取用户地理位置信息的 API。
8. **cookieEnabled**：返回一个布尔值，表示浏览器是否启用了 cookie。
9. **serviceWorker**：提供了与 Service Worker 相关的功能，包括注册、控制和通信。

#### 获取地理位置经纬度

BOM对象中的Navigator中的geolocation则可以获取到用户设备的经纬度

#### Clipboard读取剪切板

```js
// 检查浏览器是否支持 Clipboard API
if (navigator.clipboard && navigator.clipboard.readText) {
    // 尝试读取剪贴板内容
    navigator.clipboard.readText()
        .then((text) => {
            console.log('剪贴板内容:', text);
        })
        .catch((error) => {
            console.error('读取剪贴板失败:', error);
        });
} else {
    console.error('当前浏览器不支持 Clipboard API。');
}
```

#### 写入剪切板

```js
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard:', text);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
}

// 调用示例
copyToClipboard('Hello, this is copied to clipboard!');
```

# 2.页面交互

## 阻止默认行为

```js
event.preventDefault();
```

## 禁止事件上浮影响父类（事件冒泡）

```js
event.cancelBubble=true;
```

## 回到顶部与底部

需要平滑滚动css

```css
/* 平滑滚动效果 */
html {
  scroll-behavior: smooth;
}
```

函数

```js
scrollToBottomButton.addEventListener("click", () => {
  // 滚动到底部
  chatContainer.scrollTop = chatContainer.scrollHeight;
});

scrollToTopButton.addEventListener("click", () => {
  // 滚动到顶部
  chatContainer.scrollTop = 0;
});
```

## 点击时关闭其他效果

```js
*{
    /* 点击时关闭其他效果 */
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
```

```js
//console.log(JSON.stringify(userData.userData));
if (JSON.stringify(userData.userData) === '{}') {
  await axios.get('http://localhost:3333/game/userInf').then(res => {
    userData.userData.imgSrc = 'http://localhost:3333/' + res.data.userData[0].cover
    userData.userData.username = res.data.userData[0].username
    userData.userData.winTime = res.data.gameData[0].winTime
  })
  console.log(userData.userData);
}
```

# 3.事件监听

## 添加事件监听

注意：时间监听只能进行单个的时间监听，如id（id是唯一的嘛）

```js
const element = document.getElementById('myElement');
```

在使用querySelectorAll后需要遍历每一个元素添加

```js
// 遍历每个元素，为其添加事件监听器
elements.forEach(function(element) {
    element.addEventListener('mouseover', function(event) {
        console.log('Mouse entered ' + this.textContent); // 在这里可以执行你想要的操作
    });
});
```

## keydown-按键监听

#### 小键盘上下左右

警告，如果使用了const key = event.key.toLowerCase(); // 统一处理小写，小键盘字母也需要小写

```js
function handleKeyPress(event) {
    const key = event.key;
    switch (key) {
        case 'ArrowUp'://上键
            break;
        case 'ArrowDown':
            break;
        case 'ArrowLeft':
            break;
        case 'ArrowRight':
            break;
    }
}

document.addEventListener('keydown', handleKeyPress);
```

#### 多键同时监听

使用多数组存储,在下文有释放回调

```js
// 记录按下的键
const keys = {};

// 监听键盘按下事件
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;

    // 检查按下的键并执行相应操作
    if (keys['ArrowUp']) {
        console.log(111);
    }
    if (keys['ArrowDown']) {
        console.log(222);
    }
});

// 监听键盘松开事件
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});
```

#### 平滑键盘监听

调用下一帧强制监听

```js
const keys = {};

// 处理按键按下事件
function handleKeyDown(event) {
    keys[event.key] = true;
}

// 处理按键释放事件
function handleKeyUp(event) {
    keys[event.key] = false;

    // 在释放按键时执行特定的逻辑
    if (event.key === 'ArrowUp') {
        console.log('ArrowUp key released');
        console.log(222);
    }
}

// 更新游戏状态的函数
function update() {
    if (keys['ArrowUp']) {
        console.log(111);
    }
    // 请求下一帧更新
    requestAnimationFrame(update);
}

// 绑定事件监听器
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// 启动更新循环
update();
```

#### requestAnimationFrame限制帧率

```js
const keys = {};
let lastFrameTime = 0;
const fps = 10; // 设置每秒帧数
const frameDuration = 1000 / fps; // 每帧的时间间隔

// 处理按键按下事件
function handleKeyDown(event) {
    keys[event.key] = true;
}

// 处理按键释放事件
function handleKeyUp(event) {
    keys[event.key] = false;

    // 在释放按键时执行特定的逻辑
    if (event.key === 'ArrowUp') {
        console.log('ArrowUp key released');
        // 在这里调用你需要触发的函数
    }
}

// 更新游戏状态的函数
function update(timestamp) {
    const elapsed = timestamp - lastFrameTime;

    if (elapsed > frameDuration) {
        lastFrameTime = timestamp;

        if (keys['ArrowUp']) {
            console.log(111);
        }

        // 在这里可以处理其他按键
    }

    // 请求下一帧更新
    requestAnimationFrame(update);
}

// 绑定事件监听器
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// 启动更新循环
requestAnimationFrame(update);
```

## mouse-鼠标监听

后面是执行的函数

```js
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);//鼠标在上
document.addEventListener("mouseup", handleMouseUp);//
```

## contextmenu-鼠标右键监听

VUE：

```js
const youjian = (e) => {
    e.preventDefault()
    console.log('右键')
    //打印点击位置
    console.log(e.clientX, e.clientY)
}

v-on:contextmenu="youjian"
```

左键就是click

html:

```
document.addEventListener('click', function(event) {
    const x = event.clientX;
    const y = event.clientY;
});
```

## wheel-滚轮监听

```js
document.addEventListener("wheel", handleScroll, { passive: false });
```

滚轮放大并且可拖动实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zoom and Drag Page</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      user-select: none; /* Disable text selection for better dragging experience */
    }

    .zoom-container {
        /* 缩放的原点 */
      transform-origin: top left;
      transition: transform 0.5s;
      position: absolute;
    }
  </style>
</head>
<body>
  <div class="zoom-container">
    <!-- Your HTML content goes here -->
    <h1>Hello, Zoomable and Draggable World!</h1>
    <p>This is a sample content.</p>
  </div>

  <script>
    let currentZoom = 1;
    let isDragging = false;
    let startMouseX, startMouseY, startContainerX, startContainerY;

    function handleScroll(event) {
      event.preventDefault();

      const delta = event.deltaY || event.detail || event.wheelDelta;

      if (delta > 0) {
        // Zoom out (decrease zoom level)
        currentZoom -= 0.1;
      } else {
        // Zoom in (increase zoom level)
        currentZoom += 0.1;
      }

      // Set the zoom level
      document.querySelector('.zoom-container').style.transform = `scale(${currentZoom})`;
    }

    function handleMouseDown(event) {
      isDragging = true;
      startMouseX = event.clientX;
      startMouseY = event.clientY;
      startContainerX = document.querySelector('.zoom-container').offsetLeft;
      startContainerY = document.querySelector('.zoom-container').offsetTop;
    }

    function handleMouseMove(event) {
      if (isDragging) {
        const deltaX = event.clientX - startMouseX;
        const deltaY = event.clientY - startMouseY;

        // Move the container
        document.querySelector('.zoom-container').style.left = startContainerX + deltaX + 'px';
        document.querySelector('.zoom-container').style.top = startContainerY + deltaY + 'px';
      }
    }

    function handleMouseUp() {
      isDragging = false;
    }

    // Add event listeners
    document.addEventListener("wheel", handleScroll, { passive: false });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  </script>
</body>
</html>
```

#### 具体元素滚轮监听

当鼠标放在具体元素上滚动时触发

#### 阻止滚动

```js
DOM.addEventListener('wheel', (event) => {
    if (event.deltaY !== 0) { // 检查垂直滚动
        event.preventDefault(); // 阻止默认的滚动行为
    }
});
```

## scroll-滚轮监听

在鼠标滚动时执行

```js
window.addEventListener('scroll', onScroll);
```

## onmousemove-移动鼠标监听

在选择后使用 onmousemove

```js
const docker = document.querySelector('.bottom-box');

docker.onmousemove = function (e) {//鼠标移动事件
    console.log(e.clientX, e.clientY);
}
```

## dragstart-拖拽监听

一点也不好用，只有选中后才能监听

```js
mainbox.value.addEventListener("dragstart", handleMouseDown);
```

```js
mainbox.value.addEventListener('dragend', handleMouseMove);//拖拽结束
```

## touchstart-触摸监听

```js
container.addEventListener('touchstart', function (e) {
container.addEventListener('touchmove', function (e) {
container.addEventListener('touchend', function (e) {
```

完整案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag and Drop</title>
    <style>
        .container {
            width: 100vw;
            height: 100vh;
            overflow-x: scroll;
            white-space: nowrap;
            background-color: red;
        }

        .page {
            width: 100%;
            height: 100%;
            display: inline-block;
        }
    </style>
</head>

<body>
    <div>
        <div class="container">
            <div class="shu"></div>
            <div class="page" id="page1">Page 1 Content</div>
            <div class="page" id="page2">Page 2 Content</div>
            <div class="page" id="page3">Page 3 Content</div>
        </div>
    </div>
    <script>
        let container = document.querySelector('.container');
        let pages = document.querySelectorAll('.page');
        let shu = document.querySelector('.shu');
        let startX, startY, dist, threshold = 100; // 设置阈值，判断滑动距离是否足够触发切换

        container.addEventListener('touchstart', function (e) {
            container.style.backgroundColor = 'blue';
            let touchObj = e.changedTouches[0];
            startX = touchObj.pageX;
            startY = touchObj.pageY;
        });

        container.addEventListener('touchmove', function (e) {
            shu.innerHTML = e.changedTouches[0].pageX;
            e.preventDefault(); // 阻止默认滚动行为
        });

        container.addEventListener('touchend', function (e) {
            let touchObj = e.changedTouches[0];
            dist = touchObj.pageX - startX; // 计算滑动距离

            if (Math.abs(dist) >= threshold) { // 如果滑动距离超过阈值，则切换页面
                if (dist > 0) {
                    // 向右滑动，切换到前一页
                    showPage('prev');
                } else {
                    // 向左滑动，切换到后一页
                    showPage('next');
                }
            }
        });

        function showPage(direction) {
            let currentPage = document.querySelector('.page.active');
            let index = Array.from(pages).indexOf(currentPage);

            if (direction === 'prev' && index > 0) {
                pages[index].classList.remove('active');
                pages[index - 1].classList.add('active');
            } else if (direction === 'next' && index < pages.length - 1) {
                pages[index].classList.remove('active');
                pages[index + 1].classList.add('active');
            }
        }
    </script>
</body>

</html>
```

## mouseenter/mouseleave-鼠标移入移出

完整案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>鼠标移入监听</title>
    <style>
        .box {
            width: 200px;
            height: 200px;
            background-color: lightblue;
            border: 1px solid blue;
            text-align: center;
            line-height: 200px;
        }
    </style>
</head>

<body>

    <div class="box">将鼠标移入我</div>

    <script>
        const box = document.querySelector('.box');

        box.addEventListener('mouseenter', () => {
            box.style.backgroundColor = 'lightgreen'; // 鼠标移入时改变背景色
            box.textContent = '鼠标在我上面'; // 修改文本
        });

        box.addEventListener('mouseleave', () => {
            box.style.backgroundColor = 'lightblue'; // 鼠标移出时恢复背景色
            box.textContent = '将鼠标移入我'; // 恢复文本
        });
    </script>

</body>

</html>
```

## window

#### 回到顶部

```js
window.scrollTo(0, 0);
```

#### 获取屏幕长宽

```js
let screenWidth = window.innerWidth;
console.log(screenWidth);
```

## 获取滚动参数

获取滚动的y，在window对象中

```js
window.scrollY || document.documentElement.scrollTop
```

常见搭配

最大滚动范围

```js
const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
```

移除滚动事件

```js
window.removeEventListener('scroll', onScroll);
```

## resize窗口大小变化监听

```js
window.addEventListener('resize', () => {});
```

#### 滚动触发

```
window.onscroll
```

# 4.生命周期

1. **导航开始**：用户请求一个网页，浏览器开始加载资源。
2. **文档解析**：浏览器解析 HTML，构建 DOM 树。
3. **资源加载**：解析过程中，浏览器加载外部资源（如 CSS、JS、图片等）。
4. **DOMContentLoaded 事件**：当初始的 HTML 被完全加载和解析，不必等待样式表、图片和子框架完成加载。
5. **load 事件**：当页面及所有依赖资源（如样式表、图片）都完成加载。
6. **页面交互**：用户可以与页面进行交互。
7. **卸载事件**：用户离开页面，触发 `beforeunload` 和 `unload` 事件。

## DOMContentLoaded

`DOMContentLoaded` 事件在 HTML 文档完全加载并解析完成后触发，而无需等待样式表、图片和子框架的完全加载。这个事件通常用于确保在操作 DOM 元素之前，整个文档结构已经加载完成。

使用 `DOMContentLoaded` 事件可以确保脚本在处理文档的元素之前执行，但不必等待所有外部资源（如图片、样式表等）加载完毕，从而提高页面的响应速度和用户体验。

```js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 已完全加载和解析');
    // 进行 DOM 操作
    const header = document.querySelector('h1');
    header.textContent = '欢迎使用 DOMContentLoaded 示例';
});
```

## load-加载监听

```js
window.addEventListener('load', function() {
    console.log('所有资源已加载');
    // 执行依赖于所有资源加载完成的操作
    const img = document.querySelector('img');
    img.style.border = '5px solid green';
});
```

## beforeunload离开事件

当用户尝试离开页面（如刷新、关闭标签页、导航到其他页面）时触发。

```js
window.addEventListener('beforeunload', function (e) {
  // 标准浏览器要求必须设置 returnValue
  e.preventDefault();
  e.returnValue = '';
});
```

```js
for (const item of result) {
    const ans = await UserService.idGetUsername(item.id);
    console.log(ans[0].username);
    username.push(ans[0].username);
}
```

# 5.基础语法

## 循环方法

1. for in 遍历对象

    ```js
    const obj = { a: 1, b: 2, c: 3 };
    for (const key in obj) {
        console.log(key, obj[key]);
    }
    ```

2. for of 遍历数组

    ```js
    const arr = [1, 2, 3];
    for (const value of arr) {
        console.log(value);
    }
    ```

3. foreach 是数组的一个方法，遍历数组中的每一个元素

    ```js
    const arr = [1, 2, 3];
    arr.forEach(function(value) {
        console.log(value);
    });
    
    const fruits = ['apple', 'banana', 'orange'];
    
    fruits.forEach((fruit, index, array) => {
        console.log(`Fruit: ${fruit}, Index: ${index}, Array: ${array}`);
    });
    ```

    注意 foreach不支持await操作，使用for of是更好的选择

## this与this指向

普通函数this指向 ---  谁调用了函数就指向谁  （谁使用了）（最大的是window）

eg.  点击button调用函数 this指向button

箭头函数与普通函数完全不同，实际上箭头函数没有this，箭头函数中引用的this是最近作用域的this，向外层找this，直到找到为止

#### call/apply/bind_改变this指向

- call：调用函数，改变this指向

    ```js
    fun,call(thisArg) //调用 并把this指向改变为参数
    fun.call(thisArg,arg1,arg2,...) //arg1/2 是目标函数里需要传的参
    ```

- apply

    ```js
    fun,apply(thisArg) //和call一模一样
    fun.apply(this,[arg1,arg2])  //后面必须是一个数组。可以求数组的最大值 
    ```

- (重要)bind

    bind方法不会调用函数，但是他的返回值是改变了this指针的函数

    ```js
    fun(){}.bind(thisArg,arg1,arg2,...)
    ```

## 自定义事件/Event

自定义事件，之后就可以监听自己的事件了

```js
let event = new Event('documentRefreshBackgroundImage');
document.dispatchEvent(event)   
```

##  setTimeout延时器

clearTimeout函数（库函数）

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// 2秒后执行greet函数，并传递参数"John"
let timeoutId = setTimeout(greet, 2000, "John");

// 取消延时任务

```

setTimeout

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// 2秒后执行greet函数，并传递参数"John"
setTimeout(greet, 2000, "John");
```

```js
setTimeout(()=>{
      document.getElementById('leftList').style.marginLeft = '2%'
    },140)
```

延时但什么也不干

```js
function delay(time){
 return new Promise((resolve,reject)=>{ //resolve成功的回调函数，reject失败的回调函数
    setTimeout(resolve,1000) //延迟1秒
 })
}
```

主要用法

```js
setTimeout(() => {
     document.querySelector('.StatusCode').style.display = 'none'
}, 2000)
```

```
clearTimeout(timeoutId);
```

##  setInterval定时器

延时器在上面

```js
timer = setInterval(function() {

}, 300); //每300毫秒执行一次
```

```js
clearInterval(timer);  //清理定时器
```

#### 定时器匿名函数与立刻执行

直接传入带有参数的函数的定时器，会出现bug，只执行一次

```js
setInterval(updateFrame(playerOne.runPng), 100);
```

需要传入函数

```js
setInterval(() => updateFrame(playerOne.runPng), 100);
```

## ES6解构赋值

#### 解构/嵌套/索引解构赋值

```js
const response = {
    status: 200,
    data: {}
}

// 我们可以用下面方法取代 response.data 
const { status } = response
console.log(status);

const objectList = [{ key: 'value' }, { key: 'value' }, { key: 'value' }]

// 我们可以用下面方法取代 objectList[0], objectList[1] 
const [obj, obj1, obj2] = objectList
console.log(obj.key, obj1.key, obj2);
```

```js
const response = {
    status: 200,
    data: {
        user: {
            name: 'xiaoming',
            title: 'Title'
        },
        account: {},
        company: 'Juejin'
    }
}

const { data: { user } } = response
//console.log(data);这是错误的写法 {}里的才是对象
console.log(user);
console.log(user.name);
```

不建议这样写，很难看懂

```js
const user = [['xiaoming', ['writer', 'editor', 'reader']], ['xiaohong', ['writer', 'reader']]]

const [[xiaoming, roles]] = user
console.log(xiaoming, roles);
// xiaoming = 'rachel'
// roles = [ 'writer', 'editor', 'reader' ]
```

#### 对象/数组混合的嵌套解构

```js
const organization = {
    users: ['xiaoming', 'xiaohong', 'xiaobai'],
    name: 'Juejin',
    site: 'https://www.juejin.cn/'
}

const { users: [xiaoming] } = organization // xiaoming is 'xiaoming'
const { name, site } = organization // name is 'Juejin', site is 'https://www.juejin.cn/'
console.log(xiaoming);
console.log(name);
console.log(site);
```

使用索引也是可以的

```js
const users = [{ name: 'xiaoming', title: 'editor' }, { name: 'xiaohong', title: 'contributor' }]

const [{ name }] = users // name is 'xiaoming'
console.log(name);
```

#### 解构重命名

解构student中的name并且将name重名为Lyh

```js
{name:Lyh} = student
```

##### 解构赋值默认值

给一个默认值，防止他undef

```js
const user = { name: 'Luke', organization: 'Acme Publishing' }
const { name = 'Brian', role = 'publisher' } = user
console.log(name, role);
```

数组的写法

```js
const roleCounts = [2]
const [editors = 1, contributors = 100] = roleCounts
// editors = 2
// contributors = 100
```

##### 解构赋值忽略值

```js
const roleCounts = [2, 100, 100000]
const [editors, contributors] = roleCounts
// editors = 2
// contributors = 100
```

```js
const roleCounts = [2, 100, 100000]
const [, contributors, readers] = roleCounts
// contributors = 100
// readers = 100000
```

##  展开运算符(...)

目的是复制对象，收集参数

```js
const head = { ...snake[0] };
```

使用扩展运算符可以非常方便地复制对象，避免直接引用原对象的问题。

**可以展开数组**

```js
console.log(...[1,2,3]);
// 1 2 3
console.log(1,...[2,3,4],5)
// 1 2 3 4 5
console.log([1,...[2,3,4],5])
// [1, 2, 3, 4, 5]
```

**实现数组拷贝**

```js
let a = [1,2,3]
let b = [...a]
a[0] = 9
console.log(b)// 1 2 3
```

**克隆/合并对象**

```js
var obj1 = { foo: 'bar', x: 42 };
var clonedObj = { ...obj1 };
console.log(clonedObj); // { foo: "bar", x: 42 } 
```

```js
let age = {age: 15};
let name = {name: "Amy"};
let person = {...age, ...name};
console.log(person);  // {age: 15, name: "Amy"}
```

**注意：** 自定义的属性在拓展运算符后面，则拓展运算符对象内部同名的属性将被覆盖掉； 自定义的属性在拓展运算度前面，则自定义的属性将被覆盖掉；

```js
let person = {name: "Amy", age: 15};
let someone = { ...person, name: "Mike", age: 17};
let someone1 = {  name: "Mike", age: 17,...person};
console.log(someone);  // {name: "Mike", age: 17}
console.log(someone1);  // {name: "Amy", age: 15}
```

**函数**

```js
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];

//不使用延展操作符
console.log(sum.apply(null, numbers));

//使用延展操作符
console.log(sum(...numbers)); // 6
```

```js
function f(x,y,z,v,w,u){
	console.log(x,y,z,v,w,u)
}
var args = [0,1,5];
f(-1,...args,2,...[3]); // -1, 0, 1, 5, 2 ,3
```

#### 传递任意数量参数

```js
function func(...args) {
  args.forEach(arg => console.log(arg));
}

func(1, 2, 3, 4); // 输出：1 2 3 4
```

# 6.内置对象及其方法

## Promise(async)

**异步编程，js的灵魂之一**，允许在等待时进行其他操作，之后通过回调处理问题，提高cpu执行效率

在浏览器底层代码中，队列是有优先级的，微队列最高，promise会直接放微队列中

JavaScrip从设计开始就是单线程语言，页面逻辑，数据请求处理等，都在一个线程执行，无需考虑线程同步，资源竞争问题，避免线程切换开销

async/await/then为Promise的语法糖

#### 原生Promise写法

async和await只能捕捉Promise对象，所以原生的Promise也是极其重要的

```js
function getHallInf2(username, id) {
    return new Promise((resolve, reject) => {
        resolve("Operation was successful!");
    })
}
```

#### resolve/reject

**警告：**这俩是非常重要的参数，会直接影响Promise的返回内容。resolve()为Promise对象的必要内容

判断Promise是否执行成功的函数

- **`resolve`**: 这是一个函数，当你调用它时，表示这个 `Promise` 已经成功完成。调用 `resolve` 会将 `Promise` 的状态从 pending 变为 fulfilled，并将 `resolve` 的参数传递给 `then` 方法的回调函数。

- **`reject`**: 这是一个函数，当你调用它时，表示这个 `Promise` 已经失败。调用 `reject` 会将 `Promise` 的状态从 pending 变为 rejected，并将 `reject` 的参数传递给 `catch` 方法的回调函数。

可以传递参数

```js
const myPromise = new Promise((resolve, reject) => {
    const success = true; // 模拟一个条件
    if (success) {
        resolve("Operation was successful!"); // 成功时调用 resolve
    } else {
        reject("Operation failed."); // 失败时调用 reject
    }
});

myPromise
    .then((message) => {
    console.log("Success:", message); // 成功时输出的信息
})
    .catch((error) => {
    console.log("Error:", error); // 失败时输出的错误信息
});
```

#### then/catch捕获异常

其中then可以进行链式调用，使用catch可以捕获错误，在链接中，第一个错误将会被catch捕获，之后的.then都不会执行。在最后还可以添加.finally(()=>{}) 无论成功与否都会执行，可以进行清理工作，比如关闭加载动画

可脱离await使用 在promise完成后直接运行

```js
// showMessage(); // 调用 async 函数
function delayMessage() {
  return new Promise((resolve, reject) => {
    // 模拟一个异步操作，在2秒后将 Promise 解析为 "Hello, World!"
    setTimeout(() => {
      resolve("Hello, World!");
    }, 2000);
  });
}

// 使用 delayMessage 函数创建 Promise 对象
const promise = delayMessage();

// 在 Promise 完成后，使用 .then 处理成功的情况
promise.then((message) => {
  console.log(message); // 输出 "Hello, World!"
}).catch((error) => {
  console.error(error);
});	
```

#### async写法

语法糖，与await配合使用，await 会阻塞函数的执行，在接收到promise后继续

```js
async function f(){}
```

```js
const f = async () => {
}
```

##### await注意事项(await.all)

- 在同时不相管的两个await时，使用await.all()可以直接提升一倍

```js
const a = await fetch();
const b = await fatch(); NO!

Promise.all([a,b])  YES! 
```

- forEach()/map()中不能使用 await，不会等待异步完毕 可以使用for of

```js
async func f(){
    for(let i of []){
        await func()
    }
    for await(let i of []){
        func()
    }
}
```

async function 声明的函数中允许使用 await函数来等待异步操作完成（运行结束后继续） 在需要异步运行的函数前添加

## Date

注意：在不同的环境中执行结果会因时区而不同，尤其是在node环境中

新建Data对象

```ja
var now = new Date();
console.log(now);
```

在浏览器中打印出浏览器中设置的时间

```
Wed Apr 17 2024 09:12:35 GMT+0800 (中国标准时间)
```

在node中则是

```
2024-04-17T01:07:44.285Z
```

在其中 `T`表示分割符 Z表示时区 为UTC（协调世界时）转换为北京时间为

```js
var now = new Date(); // 获取当前时间（UTC 时间）
var beijingTime = new Date(now.getTime() + 8 * 3600 * 1000); // 将当前时间加上八个小时

console.log(beijingTime); // 输出北京时间
```

#### 获取部分时间

```js
var now = new Date(); // 创建一个表示当前日期和时间的 Date 对象
console.log(now);
var year = now.getFullYear(); // 获取年份
var month = now.getMonth(); // 获取月份（0-11，0 表示一月）
var day = now.getDate(); // 获取日期
var hour = now.getHours(); // 获取小时
var minute = now.getMinutes(); // 获取分钟
var second = now.getSeconds(); // 获取秒钟
console.log(year, month + 1, day, hour, minute, second);
```

#### 根据日期获取星期

```js
var date = new Date('2024-01-03');
var dayOfWeek = date.getDay();
console.log(dayOfWeek);
```

## Object

#### 遍历Object

获取对象的全部字段，返回一个数组

```js
const keys = Object.keys(data);
```

## Math

#### 保留位数/返回绝对值

```js
number.toFixed(1)
Math.abs(-5); // 返回 5
```

#### 向上/下取整

```js
Math.ceil(4.3); // 返回 5 上
Math.floor(4.9); // 返回 4 下
```

#### 四舍五入

```js
Math.round(4.6); // 返回 5
```

#### 最大/小值

```js
Math.max(2, 5, 1, 8); // 返回 8
Math.min(2, 5, 1, 8); // 返回 1
```

#### 随机数

```js
var randomNum = Math.random(); // 返回 0 到 1 之间的随机数

const randomInt = Math.floor(Math.random() * 9) + 1; //1~9Ï
```

#### 次幂/平方根

```js
次幂 Math.pow(2, 3); // 返回 8

平方根 Math.sqrt(9); // 返回 3
```

#### 正余弦和正切值/π

Math.sin(x), Math.cos(x), Math.tan(x)分别返回x的正弦、余弦和正切值（x的单位是弧度）

```js
Math.sin(Math.PI / 2); // 返回 1（正弦值）
Math.PI; // 返回 3.141592653589793
```

补：.E 表示自然对数的底数e的常量

```js
Math.E; // 返回 2.718281828459045
```

## String

#### replace_字符替换

进行字符替换

```js
const originalString = "Hello World!";
const newString = originalString.replace(/ /g, "");
console.log(newString); // 输出: "HelloWorld!"

const originalString = "Hello, World!";
const newString = originalString.replace(/[aeiou]/gi, "");
console.log(newString); // 输出: "Hll, Wrld!"
```

#### length_获取对象长度

```
.length
```

#### substring_截取字符串

```js
let originalUrl = 'blob:http://localhost:5173/d1a946fc-34bd-4d1e-832a-63a04074472a';
let extractedUrl;

// 找到blob:后的位置
let index = originalUrl.indexOf('blob:');
if (index !== -1) {
    // 如果找到了blob:，则截取该位置后的部分
    extractedUrl = originalUrl.substring(index + 'blob:'.length);
} else {
    // 如果没有找到blob:，则使用原始字符串
    extractedUrl = originalUrl;
}

console.log(extractedUrl); // 输出 http://localhost:5173/d1a946fc-34bd-4d1e-832a-63a04074472a
```

#### slice_截取字符串

```js
const str = "Hello, World!";
const skippedString = str.slice(7);
console.log(skippedString); // 输出: "World!"
```

```js
const arr = [1, 2, 3, 4, 5];
const skipCount = 2;

const skippedArray = arr.slice(skipCount);
console.log(skippedArray); // 输出: [3, 4, 5]
```

#### concat_叠加字符

```js
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2];// 将 arr2 中所有元素附加到 arr1 后面并返回
//等同于
var arr4 = arr1.concat(arr2); 
console.log(arr3, arr4) // [0,1,2,3,4,5] [0,1,2,3,4,5] 
```

#### indexOf_查找字符串

用于查找一个字符串中是否包含另一个字符串，并返回第一次出现的位置索引。
基本语法：

```js
string.indexOf(searchValue[, fromIndex])
```

- `string`是要搜索的字符串。
- `searchValue`是要查找的子字符串。
- `fromIndex`（可选）是搜索的起始位置索引，如果未提供该参数，将从字符串的开头开始搜索。

`.indexOf()`方法会返回找到的子字符串的起始位置索引，如果没有找到，将返回-1。

```js
const text = "Hello, world! This is a test.";

const index1 = text.indexOf("world");
console.log(index1); // 输出：7

const index2 = text.indexOf("test");
console.log(index2); // 输出：23

const index3 = text.indexOf("notfound");
console.log(index3); // 输出：-1
```

#### includes_字符串包含

```js
const str1 = 'Hello, world!';
const str2 = 'world';

// 判断 str1 是否包含 str2
const contains = str1.includes(str2);
console.log(contains); // 输出 true，因为 str1 中包含 str2
```

#### toLowerCase_提升为大/小写

```js
const originalString = "Hello, World!";
const lowerCaseString = originalString.toLowerCase();
.toUpperCase()
```

#### toFixed_保留位数

```js
.toFixed(x)
```

#### match_正则表达式

`match` 是 JavaScript 字符串对象上的方法，它用于在字符串中查找与正则表达式匹配的子串，并返回匹配的结果。`match` 方法的语法如下：

```
string.match(regexp)
```

其中 `string` 是要匹配的字符串，`regexp` 是要用于匹配的正则表达式。`match` 方法返回一个数组，其中包含了与正则表达式匹配的子串及其捕获分组（如果有的话）

**一般来说按如下方式使用**

1. 建立一个正则的规则   const timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;//时间的正则规则
2. 使用变量去接收正则的返回值  const timeRegExpArr = lyrics[i].match(timeReg);//得到时间的数组
3. 之后.match() 返回的是一个数组，根据下标进行运算 

**以下是正则的一些规则（建议不要完全自己写正则）**

？前面的字符出现0次或1次，可有可无

*会匹配0个或者多个字符

+会匹配出现一次以上的字符

{ }里面传上数组为指定出现的次数 {2,6}表示2到6之间{2,}表示2次以上 

()包裹起来表示一体

|或者 a (cat|dog) 一个cat或者dog

[]要求匹配的字符只能取决于他们 [a-z]所有的小写 ^表示除了匹配之内的

\元字符 \d 数字 \w单词字符 \s空白字符TAB换行\D非数字字符\W非单词字符\S飞空白字符

.任意字符，但是不包含换行

^匹配行首 a^只会找行首的a

$匹配行尾 a$只会找行尾的a

#### trim_去两端空白

```js
const data = " \n\tHello World! \r\n";
console.log(data.trim()); // 输出: "Hello World!"
```

#### js空对象判断空对象

```js
.length === 0
```

还可以用JSON方法

## Array

#### 深拷贝与浅拷贝(数组)

对于非直接类型的数据转换

```js
let a = [1,2,3] //数组是引用类型 存的是一个内存地址
let b = a //a和b共享一块内存，所以对彼此有影响 只是把地址赋值过去了，浅拷贝
a[0] = 9  //改动a对b的数据是有影响的
console.log(b)// 9 2 3
```

转变为深拷贝（单层）

```js
let a = [1,2,3]
let b = [...a]
a[0] = 9
console.log(b)// 1 2 3
```

但是这个深拷贝还不深，不能用于多维数组

```js
let a = [1, 2, 3, [3, 4]]
let b = [...a]
a[3][0] = 5
console.log(b)//1 2 3 5 4
```

解决方法

把对象转换json对象，然后转变回去（缺点是里面函数就不行了）

```js
let a = [1, 2, 3, [3, 4]]
let b = JSON.parse(JSON.stringify(a))
a[3][0] = 5
console.log(b)
```

#### 判断数组相同

不能直接===，需要便利判断

```js
function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
```

#### 数组去重

1. 使用set方法

    ```js
    const array = [1, 2, 3, 4, 4, 5, 5, 6];
    const uniqueArray = [...new Set(array)];
    console.log(uniqueArray); 
    ```

    其中 ... 的目的是 将set集合重新转化回数组 

2. 使用 filter 和 indexOf

    ```js
    const array = [1, 2, 3, 4, 4, 5, 5, 6];
    const uniqueArray = array.filter((item, index) => {
      return array.indexOf(item) === index;
    });
    console.log(uniqueArray); // [1, 2, 3, 4, 5, 6]
    ```

3. 使用 reduce

    ```js
    const array = [1, 2, 3, 4, 4, 5, 5, 6];
    const uniqueArray = array.reduce((accumulator, currentValue) => {
      if (!accumulator.includes(currentValue)) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
    console.log(uniqueArray); // [1, 2, 3, 4, 5, 6]
    ```

4. 使用 forEach 和 includes

    ```js
    const array = [1, 2, 3, 4, 4, 5, 5, 6];
    const uniqueArray = [];
    array.forEach(item => {
      if (!uniqueArray.includes(item)) {
        uniqueArray.push(item);
      }
    });
    console.log(uniqueArray); // [1, 2, 3, 4, 5, 6]
    ```

#### filter_双数组去重

1.  普通数组

    ```js
    function removeCommonElements(arr1, arr2) {
        // 将数组转换为集合
        let set1 = new Set(arr1);
        let set2 = new Set(arr2);
    
        // 找出两个集合的交集（即相同的元素）
        let commonElements = [...set1].filter(x => set2.has(x));
    
        // 从原始数组中移除相同的元素
        let result1 = arr1.filter(x => !commonElements.includes(x));
        let result2 = arr2.filter(x => !commonElements.includes(x));
    
        return [result1, result2];
    }
    
    // 示例
    let arr1 = [1, 2, 3, 4];
    let arr2 = [3, 4, 5, 6];
    let [result1, result2] = removeCommonElements(arr1, arr2);
    
    console.log(result1); // [1, 2]
    console.log(result2); // [5, 6]
    ```

2. 对象嵌套数组

    ```js
    let arr1 = [{ name: 111, value: 222 }, { name: 222, value: 222 }, { name: 333, value: 222 }];
    let arr2 = [{ name: 222}, { name: 333 }];
    
    // 使用 filter 去除 arr1 中与 arr2 重复的对象（根据 name 属性）
    let uniqueArr1 = arr1.filter(item1 => {
      return !arr2.some(item2 => item1.name === item2.name);
    });
    
    console.log(uniqueArr1);
    ```

#### splice_移除数组中的指定元素

```js
.splice(index, num);
```

- index：删除的起始索引
- num：删除的数量

#### filter_过滤/新数组

过滤

```
array.filter(item => item.name !== name)
```

`filter()` 是一个数组方法，用于从一个数组中创建一个，新数组包含满足特定条件的元素。`.filter()` 方法不会修改原始数组，而是返回一个新的数组，其中包含通过条件测试的元素。

`.filter()` 方法接受一个回调函数作为参数，这个回调函数用来定义筛选条件。回调函数将被应用于数组中的每个元素，如果回调函数返回 `true`，则表示该元素满足条件，会被包含在新数组中，否则会被排除。

```js
const newArray = array.filter(callback(element[, index[, array]])[, thisArg])
```

- `callback` 是一个用来测试每个元素的函数。
- `element` 是当前正在测试的数组元素。
- `index`（可选）是当前元素的索引。
- `array`（可选）是调用 `.filter()` 方法的原始数组。
- `thisArg`（可选）是回调函数内部的 `this` 值

举例：

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter(function(number) {
  return number % 2 === 0;
});
console.log(evenNumbers); // 输出 [2, 4, 6, 8, 10]
```

#### some_检查

```js
const array = [1, 2, 3, 4, 5];

// 检查数组中是否有大于 3 的元素
const hasElementGreaterThanThree = array.some(element => element > 3);
console.log(hasElementGreaterThanThree); // true

// 检查数组中是否有小于 0 的元素
const hasElementLessThanZero = array.some(element => element < 0);
console.log(hasElementLessThanZero); // false
```

#### map_构建数组操作

数组方法，与循环遍历非常类似，目的是获取返回值

```js
const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]
```

可以使用索引

```js
const numbers = [10, 20, 30];
const indexed = numbers.map((num, index) => `Index ${index}: ${num}`);
console.log(indexed); 
// 输出: ["Index 0: 10", "Index 1: 20", "Index 2: 30"]
```

#### push/unshift_头插/尾插

```js
myArray.unshift(1);
.push()
```

## Set

唯一元素集合

#### set去重

```js
let arr1 = [1, 2, 2, 2, 3, 4, 1, 4];
let set1 = new Set(arr1);
console.log(set1);
```

#### set转数组

```js
[...set1]
const uniqueArray = [...new Set(array)];
```

## json

#### parse/stringify/json字符方法

创建json字符串/stringify

```js
JSON.stringify（）
```

解析json字符串

```js
const jsonString = '{"handleCollapsed":false,"userData":{"username":"admin","gender":0,"introduction":"null","avatar":"null","role":"null"}}';

// 将字符串解析为 JavaScript 对象
const parsedData = JSON.parse(jsonString);

// 使用解构赋值语法提取 userData 对象的属性
const { username, gender, introduction, avatar, role } = parsedData.userData;

// 打印提取的属性值
console.log(username);
console.log(gender);
console.log(introduction);
console.log(avatar);
console.log(role);
```

# 7.文件与文件上传

## base64/dataURL

- base64

    本质上是字符串

    base64是中编码格式，把二进制按6个一组的形式存储为64中ASCLL码，通常用于图片/音频/视频 保存

    在浏览器中 img标签的**src能直接识别**base64作为源

- dataURL

    也是一个文件的地址，把资源的数据直接写到url里面了，本质还是字符串

## ArrayBuffer

最基本的二进制对象

## Blob/URL

可以实现的功能为

- 转成URL，文本信息图片转Url，提供下载功能(URL)
- 支持流操作，大文件上传分段上传

#### URL.createObjectURL

**URL.createObjectURL(Blob)**静态方法会创建一个 DOM String 其中包含一个表示参数中给出的对象的 URL。这个新的 URL 对象表示指定的 File对象或Blob对象。

Boble 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取

也可以转换为ReadableStream来用于数据

可以使用URL.createObjectURL(file)将一个文件对象转为Blob路径（创建对象路径）

一个Blob路径形态如下，其中Blob为必要参数，可以作为img的src使用

```
blob:http://localhost:5173/1e866895-c010-4db0-ab77-47d3c833efc5
```

**警告：**URL 的生命周期与其创建时所在窗口的 [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 绑定在一起。新对象 URL 代表指定的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象。要释放对象 URL，请调用 [`revokeObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL_static)。内存泄露了捏

```js
URL.revokeObjectURL(objectURL)
```

#### 原生js选择添加图片并且本地回显示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Upload Avatar</title>
<style>
  .avatar-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  .avatar-preview {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .avatar-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .file-input {
    display: none;
  }
  .choose-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
</head>
<body>
  <div class="avatar-upload">
    <div class="avatar-preview">
      <img id="avatarImg" src="placeholder.jpg" alt="Avatar Preview">
    </div>
    <input type="file" id="fileInput" class="file-input" accept="image/*">
    <button class="choose-button" onclick="chooseFile()">Choose Image</button>
  </div>

  <script>
    function chooseFile() {
      document.getElementById('fileInput').click();
    }

    document.getElementById('fileInput').addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('avatarImg').src = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    });

    // 提交逻辑示例
    function submitAvatar() {
      const imgData = document.getElementById('avatarImg').src;
      // 在这里执行上传逻辑，将imgData发送到后端
      console.log('上传头像:', imgData);
    }
  </script>
</body>
</html>
```

## File/FileReader

- File

    - File继承自Blob，特殊类型的Blob，且可以用在任意类型的context中

    - File接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

    - File对象来自input元素选择后的FileList对象

- FileReader

    - 目的是从Blob，File对象中读取数据
    - 允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。
    - 使用事件传递数据

通过新建对象使用

```js
const reader = new FileReader();
```

有很多实例方法，建议在MDN上查找

核心的处理方法就是reader.onload 加载时 可以通过**e.target.result**得到结果

经常使用的格式如下

```js
const reader = new FileReader();
reader.onload = (e) => {
    const newFile = {
        name: file.name,
        size: file.size,
        preview: e.target.result,
    };
};
reader.readAsDataURL(file);
```

可以获取到的

- 文件的名称
- 文件的大小
- 文件的url

如果是图片文件，可以新建图片后获取长度和宽度

#### readAsArrayBuffer

将数据读取成二进制的ArrayBuffer

#### readAdText

将数据读取为文本字符串

#### readAsDataURL(转bace64)

生成URL，在创建FileReader之后转成可以获取的base64 url

异步函数，通过FileReader的onload自动触发事件，有以下事件

1. loadstart 开始加载
2. progress 在读取过程中出现
3. load 读取完成，没有error  （常用）
4. abort 调用了abort
5. error 出现错误   （常用）
6. loaded 读取完成，无论成功还是失败

读取完成后访问结果

- reader.result 成功结果
- reader.error 失败结果

## FormData

## axios文件提交

一般来说，简单的单独文件上传axios会自动识别文件形式，所以无需单独设置

```js
const formData = new FormData()
formData.append('file', imgDataList.file)
await axios.post("http://127.0.0.1:3000/adminapi/home/home", formData)
```

## 监听文件上传

对于input标签进行监听

```html
<input type="file" id="upload" accept="image/*">
```

```js
// 监听文件上传
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
           //加载完触发的回调
        };
        reader.readAsDataURL(file);
    }
});
```

## 多文件提交

（实验性）对于前端提交，必须有一个file命名的文件，file可以为多个，**但是不要更改名file字端，必须与后端相同**

```js
const formData = new FormData();//提交
imgData.value.forEach((item, index) => {
    formData.append(`file`, item.file);//这个必须有其他的无所谓
    formData.append(`idd${index}`, "114514");
    formData.append(`id${index}`, item.id);
});
```

## 添加非同文件上传

遇到对象字符串上传要转成json字符串

```js
formData.append('data',  JSON.stringify(allData1));
```

就能正确的在请求体中获取内容了(node.js)

```js
console.log(req.body.data);
```

## 拖拽文件上传

- 完整案例，如果想要整体页面的拖拽效果document.addEventListener就ok

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Drag and Drop File Upload with Preview</title>
        <style>
            .drop-zone {
                border: 2px dashed #ccc;
                padding: 20px;
                text-align: center;
                transition: background-color 0.3s;
            }

            .drop-zone.dragover {
                background-color: #f0f0f0;
            }

            #file-list {
                margin-top: 20px;
                list-style: none;
                padding: 0;
            }

            #file-list li {
                margin: 5px 0;
                padding: 10px;
                background: #e0e0e0;
                border-radius: 5px;
                display: flex;
                align-items: center;
            }

            #file-list img {
                max-width: 100px;
                max-height: 100px;
                margin-right: 10px;
            }
        </style>
    </head>
    <body>
        <div id="drop-zone" class="drop-zone">
            Drag and drop files here
        </div>
        <ul id="file-list"></ul>

        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const dropZone = document.getElementById('drop-zone');
                const fileList = document.getElementById('file-list');

                dropZone.addEventListener('dragover', (event) => {
                    event.preventDefault();
                    dropZone.classList.add('dragover');
                });

                dropZone.addEventListener('dragleave', () => {
                    dropZone.classList.remove('dragover');
                });

                dropZone.addEventListener('drop', (event) => {
                    event.preventDefault();
                    dropZone.classList.remove('dragover');
                    const files = event.dataTransfer.files;
                    handleFiles(files);
                });

                function handleFiles(files) {
                    for (const file of files) {
                        const listItem = document.createElement('li');
                        const fileInfo = document.createElement('div');
                        fileInfo.textContent = `File: ${file.name}, Size: ${file.size} bytes`;

                        listItem.appendChild(fileInfo);

                        if (file.type.startsWith('image/')) {
                            const img = document.createElement('img');
                            img.src = URL.createObjectURL(file);
                            img.onload = () => URL.revokeObjectURL(img.src); // Free memory
                            listItem.insertBefore(img, fileInfo);
                        }

                        fileList.appendChild(listItem);

                        // You can add additional file processing here, e.g., uploading the file to a server
                    }
                }
            });
        </script>
    </body>
</html>
```

## VUE标准文件上传

1. 建立存储文件数组

    ```js
    const files = ref([]); // 保存文件列表
    ```

2. 触发上传事件(不要括号)

    ```html
    <input v-on:change="fileInput" type="file" webkitdirectory>
    ```

3. 插入到文件数组中

    ```js
    const fileInput = (event) => {
        console.log(event.target.files);
        files.value = event.target.files;
    }
    ```

# 8.网络相关

## https下通讯

在https环境下必须写域名来进行请求，不然会不安全，产生错误

## axios

基于XMLHttpRequest封装

使用axios库得到其他url信息并渲染：

```js
axios.get('http://hxxxt.cc/province').then(res => {
    console.log(res.data);
})
```

#### url传参(params)

形式如下

```
127.0.0.1:8080/Request?name=tom&&age=10
```

1.直接使用？语法：

```js
const url = 'https://example.com/api/data?param1=value1&param2=value2';

axios.get(url)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

2.使用axios的params选项：

```js
axios({
    url:'http://hmajax.itheima.net/api/city',
    params:{
        pname:"河北省"
    }
}).then(res => {
    console.log(res.data.list);
})
```

#### 添加请求体

注意：不要在get请求添加请求体

直接在第二个参数中添加

```js
axios.post('http://127.0.0.1:8084/Pattern', t1)
```

#### 添加请求头/表单提交

在一些表单提交时会用到

```js
await axios.post("http://127.0.0.1:3000/adminapi/home/changeHome", formData,{
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
```

```js
async function handleFiles (files) {
    const formData = new FormData();
    for (const file of files) {
        formData.append('file', file);//file 字段必须和后端接收的字段一致
    }
    await axios.post("http://localhost:3000/upload", formData)
}
```

#### axios请求拦截器

通常在util文件夹下添加axios.config.js配置统一的拦截器

```js
import axios from "axios";

// 请求之前拦截
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应之后拦截
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```

- 完整Token配置

```js
import axios from "axios";
import { useRouter } from 'vue-router'
const router = useRouter()

// 请求之前拦截
axios.interceptors.request.use(function (config) {
    //请求前携带token
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;

    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应之后拦截
axios.interceptors.response.use(function (response) {
    const { authorization } = response.headers;
    if (authorization) {
        localStorage.setItem("token", authorization);
    }
    return response;
}, function (error) {
    if (error.response && error.response.status === 401) {//过期
        // 在这里执行处理 token 过期的逻辑，例如重新登录或刷新 token
        // 例如，您可以向用户显示一个提示，要求重新登录
        //alert('登录已过期，请重新登录');
        localStorage.removeItem("token");//清除token
        router.push("/login")
      }
    return Promise.reject(error);
});
```

## WebSocket

js内置WebSocket对象

#### ws前端

##### ws前端回调

onopen        -->  打开成功

onmessage -->  每次服务端推东西出来

onclose        --> 服务器掉了，关闭了

onerror         -->打开时发生错误

前端代码

**ws端口号与服务器端口号不能相同**

```js
//建立ws连接 ws端口号与服务器端口号不能相同
var ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => {
    console.log("连接成功");
}
ws.onmessage = (msg) => {
    console.log(msg.data);
}
ws.onerror = (err) => {
    console.log(err);
}
```

给后端发送信息

```js
ws.send("xxx")
```

前端举例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>聊天室</h1>
    <button onclick="send()">send</button>
    <script>
        //axios.get
        var ws = new WebSocket("ws://localhost:8080")

        ws.onopen = ()=>{
            console.log("连接成功")
        }

        ws.onmessage = (msgObj)=>{
            console.log(msgObj.data)
        }

        ws.onerror  =()=>{
            console.log("error")
        }
        
        const send = ()=>{
            ws.send("hello")
        }
    </script>
</body>
</html>
```

##### ws前端json解析

会出现双重json解析，可能困难，出现/ /之类的就是没解析

解析好了跟正常对象一样

```js
let ws = null;
const WebSocketType = {
    Error: 0, //错误
    GroupList: 1,
    GroupChat: 2,
    SingleChat: 3
}

const openWS = () => {
    ws = new WebSocket(`ws://localhost:8000?token=${localStorage.getItem("token")}`);
    ws.onopen = () => {
        console.log("连接成功");
    }

    ws.onmessage = (msgObj) => {
        msgObj = JSON.parse(msgObj.data)
        switch (msgObj.type) {
            case WebSocketType.Error:
                localStorage.removeItem("token")
                location.href = "/login"
                break;
            case WebSocketType.GroupList:
                console.log(JSON.parse(msgObj.data))
                counterStore.onlineUserList = JSON.parse(msgObj.data)
                break;
            case WebSocketType.GroupChat:
                var title = msgObj.user ? msgObj.user.username : "广播"
                console.log(title + " : " + msgObj.data)
                break;
            case WebSocketType.SingleChat:
                console.log(msgObj.user.username + " : " + msgObj.data)
                break;
        }
    }

    ws.onerror = (err) =>{
        console.log(err);
    }
}
```

## SSE

持久化的连接

长http请求，在进行连接后可以由后端反复且单项向前端方式字符文本

**严重警告！！EventSource在http1.1前端单个浏览器对单个路径中最多只能有6个页面，大于6个6个之后会被阻塞，http2可以解决问题**

#### EventSource

连接并处理回调

使用起来相比Webosocket要简单

1. 新建EventSource，传入路径

2. 创建事件监听函数，调用onmessage方法

    ```js
    eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
    };
    ```

3. 创建错误处理方法

    ```js
    eventSource.onerror = function () {
        console.log('Error occurred with the SSE connection.');
    };
    ```

4. 前端可以主动取消SSE事件

    ```js
     eventSource.close();
    ```

完整案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SSE Example</title>
</head>

<body>
    <h1>Server-Sent Events Example</h1>
    <div id="messages"></div>

    <script>
        // 创建 EventSource 对象，连接到 /events 路径
        const eventSource = new EventSource('http://localhost:3000/events');

        // 监听消息事件
        eventSource.onmessage = function (event) {
            const data = JSON.parse(event.data);
            const messageElement = document.createElement('p');
            messageElement.textContent = data.message;
            document.getElementById('messages').appendChild(messageElement);
        };
        setInterval(() => {
            eventSource.close();
        }, 7000);
        // 处理错误
        eventSource.onerror = function () {
            console.log('Error occurred with the SSE connection.');
        };
    </script>
</body>

</html>
```

## fetch

#### fetch_post

```js
fetch("/api/user/add",{
    method:"POST",
    body:JSON.stringify({
        username:username.value,
        password:password.value,
    }),
    headers:{
        "Content-Type":"application/json"
    }
}).then(res => res.json()).then(res => {
    console.log(res);
})
```

# 9.js路由

## 获取url占位符参数

```js
//http://localhost:5173/news/65b87b99f0aa1666425000d1
const url = window.location.pathname;
const lastSegment = url.substring(url.lastIndexOf('/') + 1);
console.log(lastSegment); //65b87b99f0aa1666425000d1
```

## location/页面跳转

**跳转页面**

```js
location.herf = 'xxx.com'
```

#### 重新加载页面

```js
window.location.reload()
```

# 10.缓存与本地存储

## preload缓存标(实验性)

添加link标签实现缓存

```html
<link rel="preload" as="image" href="./img/HelianthusAnnuus_ZH-CN1675762555_1920x1080.jpg">
```

添加link触发onload回调，实现完成加载

#### preloadjs配置

```js
const preloadLink = document.createElement("link");
preloadLink.href = "myscript.js";
preloadLink.rel = "preload";
preloadLink.as = "script";
document.head.appendChild(preloadLink);
```

#### preload跨域

在预加载启用 CORS的资源（例如 fetch() 或字体）时，需要特别注意在你的 link元素上设置 crossorigin 属性。该属性需要设置为与资源的 CORS 和凭据模式相匹配，**即使获取请求不跨域也需要设置。**

其中一个适用的有趣情况是字体文件。由于各种原因，这些文件必须使用**匿名模式**的 CORS 进行获取

##### 字体配置匿名配置

```js
{
    href: getAssetsPath('font/Slidechunfeng-Regular.ttf'),
    as: 'font',
    crossorigin: fontCorsConfig
}
```

crossorigin: fontCorsConfig名称可以重复

## localstore本地存储

#### 存储localstore字符串

```js
localStorage.setItem("token", authorization);
```

#### 从localstore中取数据并转变成对象

使用getItem就能获取

```js
localStorage.getItem("counter");
```

但是获取的是string字符串，使用它JSON方法转变成对象

## IndexedDB

在存储大型对象时使用的底层 API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。该 API 使用索引实现对数据的高性能搜索。

但是操作相对复杂

**保存获取图片案例**

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload and Display Background</title>
</head>

<body>
    <input type="file" id="upload" accept="image/*">
    <button id="save">Save Background</button>
    <img id="backgroundImage" alt="Background Image" style="display: none; max-width: 100%;">
    <script src="app.js"></script>
</body>

</html>
```

```js
document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload');
    const saveButton = document.getElementById('save');
    const backgroundImage = document.getElementById('backgroundImage');

    // 打开IndexedDB数据库
    const request = indexedDB.open('backgroundDB', 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('images', { keyPath: 'id' });
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        loadBackground(db);
    };

    request.onerror = (event) => {
        console.error('Database error:', event.target.errorCode);
    };

    // 加载保存的背景图片
    function loadBackground(db) {
        const transaction = db.transaction(['images'], 'readonly');
        const objectStore = transaction.objectStore('images');
        const getRequest = objectStore.get(1);

        getRequest.onsuccess = (event) => {
            const result = event.target.result;
            if (result && result.image) {
                backgroundImage.src = result.image;
                backgroundImage.style.display = 'block';
            }
        };

        getRequest.onerror = (event) => {
            console.error('Error loading background image:', event.target.errorCode);
        };
    }

    // 监听文件上传
    uploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                backgroundImage.src = e.target.result;
                backgroundImage.style.display = 'block';
            };
            reader.readAsDataURL(file);//将文件读取为 DataURL
        }
    });

    // 保存背景图片到IndexedDB
    saveButton.addEventListener('click', () => {
        const file = uploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dbRequest = indexedDB.open('backgroundDB', 1);

                dbRequest.onsuccess = (event) => {
                    const db = event.target.result;//获取数据库对象
                    const transaction = db.transaction(['images'], 'readwrite');//创建事务
                    const objectStore = transaction.objectStore('images');//获取对象存储
                    const putRequest = objectStore.put({ id: 1, image: e.target.result });//添加数据
                    putRequest.onsuccess = () => {
                        alert('Background image saved!');
                    };
                    putRequest.onerror = (event) => {
                        console.error('Error saving background image:', event.target.errorCode);
                    };
                };

                dbRequest.onerror = (event) => {
                    console.error('Database error:', event.target.errorCode);
                };
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a file to upload.');
        }
    });
});
```

#### vue3存储实例

```vue
<script setup>
import { onMounted, ref } from 'vue'
const uploadInput = ref()
const saveButton = ref()
const backgroundImage = ref()
// 监听文件上传
const change = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      backgroundImage.value.src = e.target.result
      backgroundImage.value.style.display = 'block'
    }
    reader.readAsDataURL(file)
  }
}

// 保存背景图片到IndexedDB
const saveBtn = () => {
  const file = uploadInput.value.files[0]
  if (file) {
    console.log('file1:', file)
    const reader = new FileReader()
    reader.onload = (e) => {
      const dbRequest = indexedDB.open('backgroundDB', 1)

      dbRequest.onsuccess = (event) => {
        const db = event.target.result
        const transaction = db.transaction(['images'], 'readwrite')
        const objectStore = transaction.objectStore('images')
        const putRequest = objectStore.put({ id: 1, image: e.target.result })

        putRequest.onsuccess = () => {
          alert('Background image saved!')
        }
        putRequest.onerror = (event) => {
          console.error('Error saving background image:', event.target.errorCode)
        }
      }

      dbRequest.onerror = (event) => {
        console.error('Database error:', event.target.errorCode)
      }
    }
    reader.readAsDataURL(file)
  } else {
    alert('Please select a file to upload.')
  }
}

onMounted(() => {
  // 打开IndexedDB数据库
  const request = indexedDB.open('backgroundDB', 1)

  request.onupgradeneeded = (event) => {
    const db = event.target.result
    db.createObjectStore('images', { keyPath: 'id' })
  }

  request.onsuccess = (event) => {
    const db = event.target.result
    loadBackground(db)
  }

  request.onerror = (event) => {
    console.error('Database error:', event.target.errorCode)
  }

  // 加载保存的背景图片
  function loadBackground(db) {
    const transaction = db.transaction(['images'], 'readonly')
    const objectStore = transaction.objectStore('images')
    const getRequest = objectStore.get(1)

    getRequest.onsuccess = (event) => {
      const result = event.target.result
      if (result && result.image) {
        backgroundImage.src = result.image
        backgroundImage.style.display = 'block'
      }
    }

    getRequest.onerror = (event) => {
      console.error('Error loading background image:', event.target.errorCode)
    }
  }
})
</script>

<template>
  <input type="file" ref="uploadInput" accept="image/*" v-on:change="change" />
  <button ref="saveButton" @click="saveBtn()">Save Background</button>
  <img ref="backgroundImage" alt="Background Image" style="display: none; max-width: 100%" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
```

## CacheStorage API

也是一种缓存技术，存储在缓存存储中

```js
if ('caches' in window) {
    // 首先打开缓存存储
    let url = 'index.html';
    caches.open('my-cache').then((cache) => {
        // 存储一个请求的响应结果 
        fetch(url).then((response) => {
            cache.put(url, response);
        });
    });

    caches.open('my-cache').then((cache) => {
        cache.match(url).then((response) => {
            if (response) {
                // 在缓存中找到了匹配的响应
                console.log('Matched response:', response);
                // 使用响应结果
                response.text().then((text) => {
                    document.getElementById('content').innerHTML = text;
                });
            } else {
                // 在缓存中未找到匹配的响应
                console.log('No matching response found.');
            }
        });
    });
}
```



# 11.高级

这里有一些不常用的js语法与设计模式

## IIFE（立即调用表达式）

IIFE（立即调用表达）在避免全局变量污染的手法

在ES6只前使用常见，在ES6之后使用匿名函数，提升性能（运行一次后就立即销毁，不在window对象中了）的一种方法

MDN

```
https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE
```

## CSP内容安全策略

在Electron中常见，目的是**内容安全策略**（[CSP](https://developer.mozilla.org/zh-CN/docs/Glossary/CSP)）是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本（[XSS](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting)）和数据注入攻击等。无论是数据盗取、网站内容污染还是恶意软件分发，这些攻击都是主要的手段。

## sleep

可以实现像python一样的sleep函数，不会阻塞主线程

```js
function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
```

## 时间格式化

```js
var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1;
var date = currentDate.getDate();
// 从Date对象中获取小时、分钟和秒
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();
// 判断月、日、小时、分、秒是否在10或者10以下，如果是则在前面加字符串0
month = month < 10 ? "0" + month : month;
date = date < 10 ? "0" + date : date;
hours = hours < 10 ? "0" + hours : hours;
minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;
// 拼接年月日时分秒，中间加上空格
const editTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
console.log(editTime);
```

## 判断pc/移动端设备

```js
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.write("移动")
} else {
    document.write("PC")
}
```

