2024年2月1日重置

# HTML

## link

引入外部资源

1. 引入外部css/js

    ```js
    <link rel="stylesheet" href="./index.css">
    <script src="./main.js"></script>
    <script type="module"> //ES6
    ```

2. 引入icon，可以为png图片

    ```html
    <link rel="icon" href="./33-144_144.png" type="image/png">
    ```

    也可以使用favicon.ico

## 块和内联元素

div,h1,p,ul为块级元素。显示时**默认独占一行**

span,em,strong为内联元素，默认共享一行，有多大占多大

```css
display: inline;
```

## button-按钮

#### 好看的button

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flat Design Button</title>
    <style>
        .flat-button {
            padding: 12px 24px;
            background-color: #3498db;
            border: none;
            border-radius: 5px;
            color: white;
            font-size: 16px;
            font-family: 'Arial', sans-serif;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }
        
        .flat-button:hover {
            background-color: #2980b9;
        }

        .flat-button:active {
            transform: scale(0.95);
        }

        .flat-button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.4);
        }
    </style>
</head>
<body>
    <button class="flat-button">Click Me</button>
</body>
</html>
```

## h-标题

可以提升被浏览器爬虫的搜索获取效率

## section-独立章节

表示 HTML 文档中一个通用独立章节，它没有更具体的语义元素来表示。一般来说会包含一个标题 

**一般来说 ，没用**

## hr-分割线

```html
<hr style="border: 1px solid #ccc; width: 100%;">
```

## t-body-表格

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
<style type="text/css">
thead {color:green;}
tbody {color:blue;}
tfoot {color:red;}
</style>
</head>
<body>

<table border="1">
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <td>Sum</td>
      <td>$180</td>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>
</table>

<p><b>提示:</b>  thead, tbody, 和 tfoot 元素默认不会影响表格的布局。不过，您可以使用 CSS 来为这些元素定义样式，从而改变表格的外观。</p>

</body>
</html>
```

## ul/ol li-有序/无序列表

li里套li会换行，

ul是一个列表

li是每一行

- ul是

1. ol是

其中ol有不同的type

```
<ol type='a'>
```

| 属性 | 含义     |
| ---- | -------- |
| 1    | 1,2,3    |
| a    | a,b,c    |
| A    | A,B,C    |
| i    | i,ii,iii |
| I    | I,II,III |

#### ul动态插入(js)

动态插入两条数据

```js
var ul = document.querySelector('ul');
var lis = ul.querySelectorAll('li');
var news = ['宝能欲罢免整个万科董事会 业内称王石下课几率较高',
            '万科回应王石薪酬问题 称是执行董事负责战略',
           ];
for (var i = 0; i < news.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = news[i];
    ul.appendChild(li);
}
```

#### 修改列表样式(css)

```css
ul {
    list-style-type: square; /* 修改为方形标记 */
    list-style-image: url('path/to/your/image.png'); /* 使用自定义图像 */
}

li::marker {
    color: red; /* 修改标记的颜色 */
    font-size: 20px; /* 修改标记的大小 */
}
```

## dl/dt/dd-列表

定义列表

dt是title dd是文本

## label-标签

点击后会跳转到指定控件，扩大点击范围

- for属性：用于绑定 input

    ```html
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username">
    ```

    实现效果：点击用户名

- 直接包含，实现效果同for

## input-输入

```html
<input type="file">
```

其中的常见属性

- placeholder：默认提示

    ```html
    <input type="email" id="email" name="email" placeholder="请输入您的邮箱">
    ```

- 禁止浏览器提示

    ```js
    autocomplete="off"
    ```

#### type=checkbox-确认框

```html
<input type="checkbox">
```

##### checkbox样式修改

缺一不可

```css
input[type="checkbox"]:checked {
    background-color: var(--logo-color);
    border-color: var(--logo-color);
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
    appearance: none;
    background-color: #f0f0f0;
    border: 1px solid #999;
    cursor: pointer;
    position: relative;
}

input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 6px;
    width: 4px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}
```

#### type=file-获取文件

获取文件

**多文件**

加上webkitdirectory 也有加multiple获取文件相对于所选文件夹的路径

```html
<input type="file" webkitdirectory>
```

##### input file样式

- 推荐案例

  ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Multi-File and Folder Upload</title>
      <style>
          .file-input-container {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              margin: 50px auto;
              text-align: center;
          }
  
          .custom-file-input {
              position: relative;
              overflow: hidden;
              display: inline-block;
              margin-bottom: 20px;
          }
  
          .custom-file-input input[type="file"] {
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              cursor: pointer;
              height: 100%;
              width: 100%;
          }
  
          .file-input-label {
              display: inline-block;
              background-color: #3498db;
              color: white;
              padding: 10px 20px;
              font-size: 16px;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s ease;
              font-family: 'Arial', sans-serif;
          }
  
          .file-input-label:hover {
              background-color: #2980b9;
          }
  
          .file-list {
              margin-top: 10px;
              font-size: 16px;
              color: #333;
              list-style: none;
              padding-left: 0;
          }
  
          .file-list li {
              margin: 5px 0;
          }
      </style>
  </head>
  
  <body>
  
      <div class="file-input-container">
          <!-- 文件上传 -->
          <div class="custom-file-input">
              <label class="file-input-label" for="file-multiple">Choose Files</label>
              <input type="file" id="file-multiple" multiple onchange="displayMultipleFiles()">
          </div>
  
          <!-- 文件夹上传 -->
          <div class="custom-file-input">
              <label class="file-input-label" for="file-folder">Choose Folder</label>
              <input type="file" id="file-folder" webkitdirectory multiple onchange="displayMultipleFiles()">
          </div>
  
          <ul class="file-list" id="file-list">No files chosen</ul>
      </div>
  
      <script>
          function displayMultipleFiles() {
              const fileInput = event.target;
              const fileListDisplay = document.getElementById('file-list');
              fileListDisplay.innerHTML = ''; // 清空列表
  
              const files = fileInput.files;
              if (files.length > 0) {
                  for (let i = 0; i < files.length; i++) {
                      const listItem = document.createElement('li');
                      listItem.textContent = files[i].webkitRelativePath || files[i].name;
                      fileListDisplay.appendChild(listItem);
                  }
              } else {
                  fileListDisplay.textContent = 'No files chosen';
              }
          }
      </script>
  
  </body>
  
  </html>
  ```

#### button-按钮

变成按钮

#### color-取色器

变成取色器

#### date-日期选择器

变成日期选择器

#### range-滑条

变成滑条

```
<input id="seek-bar" type="range" min="0" value="0">
```

下面是一些可用的css样式

- 对于中心球

```css
#range::-webkit-slider-thumb {
    /* 原生的中间的小球，去掉后才可以加其他css属性 */
    appearance: none;
    /* 下面为新的中间小球 */
    width: 10px;
    height: 100vh;
    background-image: linear-gradient(to bottom,
        #91defe,
        #99c0f9,
        #bdb6ec,
        #d7b3e3,
        #efb3d5,
        #f9bccc);
}
```

- 对于滑条本身

```css
#range {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1400px;
    transform: translate(-50%, -50%);
    z-index: 1;
    
    appearance:none;
    height: 10px;
    /* background-color: red; */
    /* 背景设置为透明，很重要，滑条会挡住内容 */
    /* background: transparent; */
    cursor: pointer;
}
```

#### input修改回调(onkeyup,onchange)

非类似于VUE中的watch，只要imput中的内容发生改变就会触发

```js
<input type="text" id="myInput" onkeyup="myFunction()" placeholder="搜索...">
```

#### input样式

##### input::placeholder

用于修改input中的placeholder样式

注意：仅仅为placeholder的样式，常规的字体直接使用font设置即可

```
outline: none;
```

- **类小米输入框案例**

    其中

    - input:not(:placeholder-shown)：会检查输入是否为空，非空时添加样式

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>美观的输入框案例</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background: linear-gradient(135deg, #89f7fe, #66a6ff);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
    
            .input-container {
                position: relative;
                width: 300px;
            }
    
            input {
                width: 100%;
                padding: 12px 10px;
                font-size: 16px;
                padding-top: 30px;
                box-sizing: border-box;
                border: 2px solid #ccc;
                border-radius: 8px;
                outline: none;
                transition: border-color 0.3s, box-shadow 0.3s;
            }
    
            input:focus {
                border-color: #66a6ff;
                box-shadow: 0 0 10px rgba(102, 166, 255, 0.5);
            }
    
            label {
                position: absolute;
                top: 50%;
                left: 12px;
                transform: translateY(-50%);
                background: white;
                padding: 0 5px;
                color: #888;
                font-size: 16px;
                pointer-events: none;
                transition: 0.3s ease;
            }
    
            input:focus+label,
            input:not(:placeholder-shown)+label {
                top: 0px;
                left: 10px;
                font-size: 14px;
                color: #66a6ff;
            }
    
            .input-container input:focus+label {
                color: #007bff;
            }
        </style>
    </head>
    
    <body>
    
        <div class="input-container">
            <input type="text" id="username" placeholder=" " />
            <label for="username">用户名</label>
        </div>
    
    </body>
    
    </html>
    ```

- **推荐样式二**

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Stylish Input Field</title>
        <style>
            .styled-input {
                width: 100%;
                max-width: 400px;
                padding: 12px 16px;
                font-size: 16px;
                color: #333;
                background-color: #f0f0f0;
                border: 2px solid transparent;
                border-radius: 5px;
                outline: none;
                transition: background-color 0.3s ease, border 0.3s ease;
                box-sizing: border-box;
                font-family: 'Arial', sans-serif;
            }
    
            .styled-input::placeholder {
                color: #999;
            }
    
            .styled-input:focus {
                background-color: #fff;
                border: 2px solid #3498db;
                box-shadow: 0 0 8px rgba(52, 152, 219, 0.2);
            }
    
            .input-container {
                margin: 50px auto;
                text-align: center;
            }
        </style>
    </head>
    
    <body>
    
        <div class="input-container">
            <input type="email" class="styled-input" placeholder="Enter your email">
        </div>
    </body>
    
    </html>
    ```

## audio-声音

```html
<audio  src="./1387088902.mp3"></audio>
```

默认什么都没有 + controls 可以显示默认的控制器

```html
<audio controls src="./1387088902.mp3"></audio>
```

使用js获取dom后可以使用js控制

```js
const musicPlayer = document.getElementById('music-player');
musicPlayer.play();//开始
musicPlayer.pause();//暂停
```

## header-标签

就是一个默认在顶部的标签，暂时没发现有什么特点

## a-链接

```
<a href="accountUrl"><a>
```

#### 跳转分页拦截

跳转分页，在a标签中添加

```
target="_blank"
```

#### a去下划线

```css
text-decoration: none;
```

## img-图片

#### alt替换字

如果图片不能加载，就使用字进行说明，注意，不是图片替换

```html
<img src="./copy.vue" alt="蓝天">
```

#### draggable禁止拖动

设置 draggable="false"

## iframe-嵌入网页

```html
<iframe src="嵌入网页的URL" width="宽度" height="高度"></iframe>
```

## video-视频

#### 循环播放

使用muted loop

```js
<video src="../../../public/video_WebTitle_batch.mp4" muted loop></video>
```

#### 控制播放(js)

- 播放

  ```js
  document.getElementById('myVideo').play();
  ```

- 暂停

  ```js
  document.getElementById('myVideo').pause();
  ```

- 重新加载

  ```js
  document.getElementById('myVideo').load();
  ```

- 检测浏览器是否可以播放指定的视频格式。返回值可以是 `"probably"`、`"maybe"` 或 `""`。

  ```js
  document.getElementById('myVideo').canPlayType('video/mp4');
  ```

- 为视频添加字幕、描述等文本轨道。

  ```js
  document.getElementById('myVideo').addTextTrack('captions', 'English captions', 'en');
  ```

- 将视频跳转到指定时间位置（单位：秒）。

  ```js
  document.getElementById('myVideo').currentTime = 60; // 跳转到 60 秒
  ```

- 让视频进入全屏模式。

  ```js
  document.getElementById('myVideo').requestFullscreen();
  ```

- 退出全屏模式。

  ```js
  document.exitFullscreen();
  ```

- 设置或获取视频的静音状态。可以使用 `true` 或 `false`。

  ```js
  document.getElementById('myVideo').muted = true; // 静音
  ```

- 获取或设置视频音量（取值范围为 `0.0` 到 `1.0`）。

  ```js
  document.getElementById('myVideo').volume = 0.5; // 设置音量为 50%
  ```

- 获取或设置视频播放速度。默认值为 `1.0`，可以设置为 `0.5`（慢速）或 `2.0`（加速）。

  ```js
  获取或设置视频播放速度。默认值为 1.0，可以设置为 0.5（慢速）或 2.0（加速）。
  ```

- 获取或设置视频当前播放的时间点（以秒为单位）

  ```js
  document.getElementById('myVideo').currentTime = 30; // 跳转到 30 秒
  ```

- 获取视频的总时长（以秒为单位）

  ```js
  let duration = document.getElementById('myVideo').duration; // 获取视频时长
  ```

#### 常见问题

1. **不允许播放**

   在浏览器中默认是不可播放的，需要用户与浏览器进行交互后才可以播放，但是在静音的情况下，可以直接播放

## svg-矢量图形

Scalable Vector Graphics 可缩放矢量图形

#### svg引入方式

推荐将svg代码同静态文件一同放入中assets文件夹下，之后使用img标签引入，vue和其他框架中使用同理

#### viewBox

用来定义svg内容的位置

```
viewBox="x y width height"
```

这四个值的含义是：

- x: 可视区域的左上角 x 坐标
- y: 可视区域的左上角 y 坐标
- width: 可视区域的宽度
- height: 可视区域的高度


viewBox 的主要作用是：

1. 定义坐标系统：它设置了 SVG 内部元素使用的坐标系。
2. 控制缩放：它决定了 SVG 内容如何适应其容器的大小。
3. 设置可见区域：它指定了 SVG 图像中应该显示的部分。

注意：可视区域的高度并不是具体的高度，高度还是height和width，这个是比例高度

## audio-声音

## preload-缓存

提前加载，有相关回调，详细写在js文档中

## template

使用起来非常麻烦，不建议用

## html/Unicode-转义符

为了统一性，还是建议使用svg

| 符号 | 转意符  |
| ---- | ------- |
| <    | &lt ;   |
| >    | &gt ;   |
| 空格 | &nbsp ; |
|      |         |

Unicode原生符号

| &#9662; | &#8964; | &#9652; | &#8963; | &#10095; | &#8250; |
| ------- | ------- | ------- | ------- | -------- | ------- |
| &#8595; | &#8593; |         |         |          |         |
|         |         |         |         |          |         |
|         |         |         |         |          |         |

# CSS

向着更好的设计，前进！！！！！

# 设计的基本原则

- 对比：重要的内容要使用粗体/醒目的设计，对比突出主题
- 亲密：相似的内容应该放在一起，避免混乱
- 对齐：常见为居中对其，左右对齐
- 重复：使用的风格需要统一，圆角就都是圆角，扁平都是扁平

# 变量(root)

:root 是一种 CSS 伪类，它选择文档的根元素，通常用来配置伪类

```css
:root{ //全局写法
	--size:300px;
}
.xxx{
	width:var(--size);
}
```

# 常用颜色

### element颜色

也推荐参考ele的配色，使用配色无需安装ele

```
https://element-plus.org/zh-CN/component/color.html
```

### 拟态灰/水泥灰

偏浅色

```
#d6dce6;
```

### 有点毛玻璃感觉的灰（比较淡）

常用于字体背景

```
#353535  | #535353
```

### 有点毛玻璃感觉的白（有点灰）

常用于非重要字体

- apple灰

    ```
    #d2d2d2
    ```

- 小米灰(推荐)

    ```
    #838383
    ```


### apple商品背景

发灰白

```
#f5f5f7
```

### apple字体灰

```
#3f3f3f
```

### 黑但是不是很黑

```
#1e1e1e
```

### 注释绿

```
#70c000
```

### 小米橙

```
#ff6900;
```

### 渐变纸张背景

推荐设置

```css
background: linear-gradient(135deg, #f5f5dc 25%, #fafafa 100%);
background-size: cover;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
font-family: 'Georgia', serif;
/* 选择类似纸质排版的字体 */
filter: brightness(0.9) contrast(1.1);
```

### 透明颜色

```css
color: transparent;
```

# box-sizing 盒模型属性

默认情况下，CSS 中的盒模型有两种：

**Content-Box（默认值）：** 元素的宽度和高度仅包括内容，不包括边框和内边距。如果你设置一个元素的宽度为 `100px`，并且添加 `10px` 的内边距和 `2px` 的边框，最终的宽度将是 `100px + 2 * 10px + 2 * 2px = 124px`。

**Border-Box：** 元素的宽度和高度包括内容、内边距和边框。换句话说，设置元素的宽度为 `100px`，并且添加 `10px` 的内边距和 `2px` 的边框，元素的最终宽度将保持为 `100px`，而不受边框和内边距的影响。

```css
box-sizing: border-box;
```

### padding 

这个东西有一个非常重要的误区！非常重要

如果一个盒高为280px 有10px的padding，那么这个盒子的实际的height为300px

如果一个盒子的宽为0，有10px的padding，那么实际的宽度为20px

推荐设置

```css
box-sizing: border-box;
```

# position

### static

默认定位

### relative-相对定位

相对于**原来的位置**进行定位，运行使用 top right bottom left **不会使文件脱离文档流，依然占用原来的位置，不影响其他元素的位置**

```
position: relative;
top: 20px; /* 向下偏移20像素 */
left: 10px; /* 向右偏移10像素 */
```

### fixed-绝对定位

**脱离文档流**，相对于窗口固定特定位置

### absolute-绝对定位

**必须带有手写定位!!，跟随其他定位不会脱离文档流，不然会脱离文档流**

相对与最近的具有定位属性的**父级元素定位**（带有非static定位的），如果没有相对与根元素进行定位，会使文件脱离文档流，不影响其他部件

```css
top: 20px; /* 相对于父元素上边缘的距离 */
left: 10px; /* 相对于父元素左边缘的距离 */
```

### sticky-粘性定位

到达指定位置的时候，在父元素的范围内，粘在指定位置

```css
position: sticky;
top: 0;
```

设置后位置受2个元素影响（包含块与top）

**sticky失效的原因**

1、父元素不能overflow:hidden或者overflow:auto属性。
2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
3、父元素的高度不能低于sticky元素的高度
4、sticky元素仅在其父元素内生效

# display

### block-块级元素

将元素显示为块级元素，即元素会在**页面中独占一行**，其宽度会自动填充其父容器的宽度。

在标签中默认为的块级的是 

```html
<div>, <p>, <h1> - <h6>, <form> 
```

### inline-行内元素

将元素显示为行内元素，即元素**不会独占一行**，其**宽度由内容决定**，可以与其他行内元素在同一行显示。

在标签中默认为的行级的是 

```html
<span>, <a>, <strong>, <em> 
```

### inline-block;

将元素显示为行内块元素，具有块级元素的特性，同时可以与其他行内元素在同一行显示。

元素之间的空白会被视为文本节点而被渲染，因此需要注意元素间的间距

例如：`<img>`, `<button>` 等元素常用该属性

### none;

没了，彻底不显示

### inline-table;

将元素显示为内联表格，即表格元素可以在行内显示，与其他行内元素共同占据一行。

### list-item;

将元素显示为列表项，通常用于自定义列表样式时。

# flex-弹性盒布局

弹性盒常见问题

- 如何固定item大小

建议设置最小宽度

```
min-width: 80px;
```

**任何布局都需要在父元素上进行说明**

能够使父元素在子元素的大小未知或动态变化情况下仍然能够分配好子元素之间的间隙。使父元素能够调整子元素的宽度、高度、排列方式，设定为flex布局的元素能够放大子元素使之尽可能填充可用空间，也可以收缩子元素使之不溢出。

在设为Flex布局以后，其子元素的`float`、`clear`和`vertical-align`属性将失效

**在flex下的父元素中可以添加如下其他flex属性**

- flex-direction：排列方式
- flex-wrap：换行
- flex-flow：简写
- justify-content
- align-items
- align-content

### flex-direction/排列方式

flex-direction: row：默认值，沿水平主轴从左到右排列，起点在左沿

flex-direction: row-reverse：沿水平主轴从右到左排列，起点在右沿

flex-direction: column-reverse：沿垂直主轴从下到上排列，起点在下沿

##### fcolumn上下排列

沿垂直主轴从上到下排列，起点在上沿

```css
flex-direction: column
```

###  flex-wrap/换行

flex-wrap: nowrap：默认值，不换行。当主轴的长度是固定并且空间不足时，项目尺寸会随之进行调整，而不会换行。

flex-wrap: wrap：换行，第一行在上面

flex-wrap: wrap-reverse：换行，第一行在下面，**倒序**

### flex-flow/前两个简写

flex-flow 是 flex-direction 属性和flex-wrap属性的简写，默认为:flex-flow:row nowrap，用处不大，最好还是分开来写。该属性的书写格式如下：

```css
.container {
    flex-flow: <flex-direction> <flex-wrap>;
}
```

### justify-content 对齐方式

justify-content : flex-start：默认值，元素在主轴上**左对齐**（**上对齐**）

justify-content : flex-end：元素在主轴上**右对齐**（**下对齐）**

justify-content : center：元素在主轴上**居中对齐**

**(常用)**justify-content : space-between：元素在主轴上**两端对齐**，两端的元素会 仅靠在两边，在元素之间间隔相等

justify-content : space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### align-items 竖轴排列方式

 align-items: flex-start; 子元素将沿交叉轴起始位置对齐。

align-items: flex-end;   子元素将沿交叉轴末尾位置对齐。

align-items: center;      子元素将在交叉轴上居中对齐。

align-items: baseline;  子元素将根据其基线对齐。

### align-content 竖轴对齐方式

align-content: flex-start;  多行的行将沿着交叉轴的起始位置对齐。

align-content: flex-end;  多行的行将沿着交叉轴的末尾位置对齐。

align-content: center;   多行的行将在交叉轴上居中对齐。

align-content: space-between; 多行的行将在交叉轴上平均分布，第一行在容器的起始位置，最后一行在容器的末尾位置。

align-content: space-around;  多行的行将在交叉轴上平均分布，两侧留有相等的空间。align-content: space-evenly;  多行的行将在交叉轴上平均分布，包括两侧和行之间的空间。

### flex item属性

#### order flex排列顺序

数越小越靠前

#### flex-grow剩余空间分配

剩余空间分配

```css
flex-grow:1;//1份
flex-grow:2;//2份
```

#### flex-shrink

如果不想缩小，设为0，就不会发生变化

```css
flex-shrink:0;
```

建议使用min-max系列

# Grid-网格布局

非常强大的布局，完全大于flex布局

当使用grid布局时，他的子元素都会成为有行有列的网格元素，元素的大小由grid布局控制

### grid-template-columns/rows行列宽高

- grid-template-columns：每行有几个 后接参数表示 每一块的大小
- grid-template-rows：有几行 可以不指定
- fr：一组

常与repeat();连用

```css
grid-template-columns: repeat(3, 100px); /* 重复3次，每列宽度为100px */
```

**实例**

```css
<!DOCTYPE html
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .container {
            display: grid;
            grid-template-columns: 100px 1fr 2fr;
            grid-template-rows: 60px 50px 70px;
            gap: 10px;
            /* 间距为10px */
        }

        .item {
            background-color: #ddd;
            padding: 10px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
        <div class="item">6</div>
        <div class="item">6</div>
        <div class="item">6</div>
        <div class="item">6</div>
        <div class="item">6</div>
        <div class="item">6</div>
        <div class="item">6</div>
    </div>
</body>

</html>
```

### grid-gap行列间距 

不会扩大父元素，如果间隙+元素大于父元素会直接溢出

- grid-row-gap：行间距
- grid-column-gap：列间距
- grid-gap：两者的简写形式

### grdisplay: inline-grid;内联网格体

- 结合了 inline 和 grid 的特性。
- 使元素成为一个内联级别的网格容器，这意味着它既是内联的，又可以使用网格布局模型。
- 它不会独占一行，多个 inline-grid 元素可以在同一行内并排排列。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .container {
      display: inline-grid;
      grid-template-columns: auto auto auto;
      gap: 10px; /* 列之间的间距 */
    }
      
    .item {
      background-color: #ddd;
      padding: 10px;
      text-align: center;
    }
  </style>
  <title>Inline Grid Example</title>
</head>
<body>
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
  </div>
</body>
</html>
```

### **repeat() 函数**

可以简化重复的值。该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。比如上面行高都是一样的，我们可以这么去实现，实际效果是一模一样的

```css
.wrapper-1 {
  display: grid;
  grid-template-columns: 200px 100px 200px;
  grid-gap: 5px;
  /*  2行，而且行高都为 50px  */
  grid-template-rows: repeat(2, 50px);
}
```

### grid自动换行填充

**⚠️注意：自动换行必须指定父元素的宽度**

**核心代码** grid-template-columns: repeat(auto-fill, 200px);

表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格。

grid-template-columns: repeat(auto-fill, 200px) 表示列宽是 200 px，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素

中译中：grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));如果剩余空间大于300px，就多一个

```css
.wrapper-2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 5px;
  grid-auto-rows: 50px;
}
```

### minmax() 函数

我们有时候想给网格元素一个最小和最大的尺寸，minmax() 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。它接受两个参数，分别为最小值和最大值。

grid-template-columns: 1fr 1fr minmax(300px, 2fr) 的意思是，第三个列宽最少也是要 300px，但是最大不能大于第一第二列宽的两倍。

### auto 关键字

由浏览器决定长度。通过 `auto` 关键字，我们可以轻易实现三列或者两列布局。`grid-template-columns: 100px auto 100px` 表示第一第三列为 100px，中间由浏览器决定长度，

### grid(vue)布局举例

普通html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 20px;
            grid-auto-rows: minmax(100px, auto);
        }

        .one {
            /*  */
            grid-column: 1 / 2;
            grid-row: 1;
            background: #19CAAD;
        }

        .two {
            grid-column: 2 / 4;
            grid-row: 1 / 3;
            background: #8CC7B5;
        }

        .three {
            grid-row: 2 / 5;
            grid-column: 1;
            background: #D1BA74;
        }

        .four {
            grid-column: 3;
            grid-row: 3;
            background: #BEE7E9;
        }

        .five {
            grid-column: 2;
            grid-row: 3/5;
            background: #E6CEAC;
        }

        .six {
            grid-column: 3;
            grid-row: 4;
            background: #ECAD9E;
        }

        .item {
            text-align: center;
            font-size: 200%;
            color: #fff;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="one item">One</div>
        <div class="two item">Two</div>
        <div class="three item">Three</div>
        <div class="four item">Four</div>
        <div class="five item">Five</div>
        <div class="six item">Six</div>
    </div>
</body>

</html>
```

vue v-for 实例

```vue
<script setup>
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
  <div class="item-main">
    <div class="grid-container">
      <div class="xxx" :key="index" v-for="(item, index) in arr">
        {{ index }}-{{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-main {
  margin-left: 10%;
  width: 80%;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 20px);
  grid-row-gap: 10px;
  grid-column-gap: 20px;
}
.xxx {
  background-color: aquamarine;
  border: 1px solid black;
}
</style>
```

# 流式布局(瀑布布局)数列

### column-count

**警告：column-count只是单纯的把页面分成固定的份数，不会严格的进行布局！**

可以设置竖排的排列方式，限定宽度或份数，高度自适应

```css
column-count:3;
columns: 300px;
columns: 200px 3; /* 每列宽200px，最多3列 */
```

### column-gap瀑布边距

```css
column-gap:10px
```

###  break-inside

配合column使用的，防止换行和撕裂？

```css
break-inside: avoid; //auto
```

#### 案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>瀑布流</title>
    <style>
        * {
            margin: 0;
            padding: 0;

        }

        .container {
            width: 620px;
            height: 900px;
            columns: 3;
            column-gap: 10px;
        }

        img {
            width: 200px;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <div class="container" id="scroll-container">
        <img src="./img/gy.png" alt="image1">
        <img src="./img/2.webp" alt="image2">
        <img src="./img/2.webp" alt="image2">
        <img src="./img/gy.png" alt="image1">
        <img src="./img/gy.png" alt="image1">
        <img src="./img/2.webp" alt="image2">
    </div>
</body>

</html>
```

# css选择器

###  *号选择器

*: 通配符选择器，匹配文档中的所有元素

### 多选器

容易出bug，为全部的添加样式

```css
.jian div div{}
```

### 并集选择器

```css
h1, h2, h3 {}
```

### >/**子元素选择器*

只能选择作为某元素儿子元素的元素（直接子元素），不包括孙元素、曾孙元素等等等

```css
ul > li {}
```

### nth-child/多子类选择器

名字叫img的类有5个

```css
.img:nth-child(1) {}
.img:nth-child(2) {}
```

### 最后一个孩子选择器

```css
.xxx:last-child 
```

### +相邻兄弟选择器

```css
A + B { /* 样式规则 */ }
```

- **A**：参考元素。
- **B**：选择紧接在 A 后面的兄弟元素。

### &css

&符号表示当前组件的根元素

### css文档选择器 type

根据不同的type选择，常见于input标签

```css
input[type="text"]
```

# 伪元素

在css中有很多特殊选定器，使用  ::  称为伪元素

```css
.aaa::before {
    content: open-quote;
    /* 插入开引号 */
    /* 插入箭头字符 */
}

/* 尾插 */
.aaa::after {
    content: "▶";
    /* 插入箭头 */
}

/* 第一个字 */
.aaa::first-letter {
    font-size: 150%;
    color: red;
}

/* 第一行 */
.aaa::first-line {
    font-size: 120%;
    color: blue;
}
```

### selection选中伪类

```css
::selection{

}
```

### hover伪类选择器

```css
a:hover {
    color: orange;
}
```

#### hover后选择其他的标签（只能选择子类的）

- 选择子类

    ```css
    li:hover .iconfont {}
    ```

- 选择后代兄弟节点

    ```css
    .box1:hover ~ .box2 {}
    ```

鼠标在li标签上时.iconfont变透明

### focus聚焦

常见于input标签，被选中后的样式

```css
input:focus {
  border-color: #66a6ff;
  box-shadow: 0 0 10px rgba(102, 166, 255, 0.5);
}
```

### before前置插入

```css
p::before {
    content: ">> ";
}
```

### active点击事件

点击事件同时只能触发一个，无法多指，只能用于纯pc

```css
:active{}
```

# transform平移/旋转/缩放/倾斜

**警告!：transform只对脱离文档流的有效**

不影响主线程，效率非常高

在 CSS 中，`transform` 属性用于将元素进行变形，可以通过一系列的函数来实现不同的变形效果。常见的 `transform` 函数包括：

- `translate()`：移动元素
- `rotate()`：旋转元素
- `scale()`：缩放元素
- `skew()`：倾斜元素

这些函数可以单独使用，也可以组合使用，从而实现更加复杂的变形效果。

1. **平移（Translation）：** 使用 `translate()` 函数可以沿着 X 和 Y 轴平移元素。示例：`transform: translate(100px, 50px);`
2. **旋转（Rotation）：** 使用 `rotate()` 函数可以围绕元素的原点进行旋转。示例：`transform: rotate(45deg);`
3. **缩放（Scale）：** 使用 `scale()` 函数可以沿着 X 和 Y 轴缩放元素。示例：`transform: scale(1.5, 2);`
4. **倾斜（Skew）：** 使用 `skew()` 函数可以使元素倾斜。示例：`transform: skew(30deg, 20deg);`
5. **混合使用：** 你可以组合使用多个变换效果，将它们放在一个 `transform` 属性中。示例：`transform: translate(100px, 50px) rotate(45deg) scale(1.5);`

### rotate旋转

```css
transform: rotate(90deg);
```

### scale缩放

```css
transform: scale(1);//正常一倍
transform: scale(1.3, 0.4);//长1.3倍，高0.4倍
transform: scale(-0.5, 1); //甚至可以翻转
```

### translate3d三轴平移

非常好玩的属性，可以实现卡片翻转，轮播图等

```css
transform: translate3d(tx, ty, tz)
```

#### perspective透视

perspective 通常应用于**父元素**，影响其子元素的 3D 变换效果。通过改变透视距离，可以调整用户的观察角度和 3D 效果的强弱。

- 卡片翻转案例

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>优化的3D卡片翻转</title>
      <style>
        /* 全局样式 */
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          background: #f0f0f0;
          font-family: Arial, sans-serif;
        }
    
        .card-container {
          perspective: 1000px; /* 定义视角距离 */
          width: 200px;
          height: 300px;
        }
    
        .card-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d; /* 保留子元素的 3D 变换 */
          transition: transform 0.6s; /* 添加平滑过渡 */
        }
    
        /* 在父容器上设置 hover 效果 */
        .card-container:hover .card-wrapper {
          transform: rotateY(180deg); /* 鼠标悬停时翻转 */
        }
    
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden; /* 隐藏背面内容 */
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          color: #fff;
          border-radius: 10px;
        }
    
        .card-front {
          background: #007bff; /* 卡片正面背景色 */
        }
    
        .card-back {
          background: #ff5722; /* 卡片背面背景色 */
          transform: rotateY(180deg); /* 背面初始状态翻转 */
        }
      </style>
    </head>
    <body>
      <div class="card-container">
        <div class="card-wrapper">
          <div class="card-front">正面</div>
          <div class="card-back">背面</div>
        </div>
      </div>
    </body>
    </html>
    ```

    

# cursor/鼠标效果

1. 生成小手 -- pointer;
2. 生成问号 -- help;
3. 生成等待 -- wait;
4. 隐藏光标  -- caret-color: transparent;

# overflow/溢出

### overflow: hidden/隐藏超长/溢出内容

`overflow: hidden;` 是一个用于控制元素溢出内容的属性。当应用此属性时，任何溢出元素的内容都会被隐藏，而不会显示在元素的框之外。

以下是一个简单的例子：

```css
.container {
  width: 200px;
  height: 200px;
  overflow: hidden;
}
```

在这个例子中，如果 `.container` 内的内容超过了容器的大小，超出的部分将被隐藏。

补充，对于position: fixed;不生效，fixed为相对于窗口位置，脱离文档流

### overflow: visible/显示溢出内容

```css
overflow: visible;
```

### overflow: scroll/可滚动

溢出内容生成进度条，可滑动

```css
overflow: scroll;
```

只能在x轴上滚动

```css
overflow-x: scroll;
```

### overflow: auto/自动

自动生成进度条，可滚动

```css
overflow: auto;
```

# 滚动条/滑条样式

```css
/* 自定义滚动条的整体样式 */
::-webkit-scrollbar {
    width: 6px;
    /* 滚动条的宽度（竖向滚动条）或高度（横向滚动条） */
    height: 6px;
    /* 横向滚动条的高度 */
}

/* 自定义滚动条轨道 */
::-webkit-scrollbar-track {
    background: #f1f1f1;
    /* 轨道背景色 */
    border-radius: 10px;
    /* 轨道圆角 */
}

/* 自定义滚动条滑块 */
::-webkit-scrollbar-thumb {
    background: #888;
    /* 滑块背景色 */
    border-radius: 10px;
    /* 滑块圆角 */
}

/* 当滚动条滑块被悬停时的样式 */
::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* 悬停时滑块的背景色 */
}
```

### 指定元素添加滚动条/指定元素修改滚动条样式

```css
.sy::-webkit-scrollbar {
    display: block;
    /* 显示滚动条 */
    height: 12px;
    width: 2px;
    /* 自定义滚动条宽度 */
}

.sy::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;

    /* 自定义滚动条颜色 */
    border-radius: 4px;
    /* 自定义滚动条圆角 */
}
```

# 更多单位

css3中添加了更多单位，使布局添加了更多可能

MDN文档

```
https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units
```

### cm/mm/Q/in/pc/pt/px/固定大小

- cm 厘米
- mm  毫米
- Q 四分之一毫米
- in 英寸
- pc 派卡
- pt 点
- px 像素

### em/ex/rem/vw/vmax/.../相对大小

主表

| 单位     | 相对于                                                       |
| :------- | :----------------------------------------------------------- |
| em       | 在 font-size中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width。 |
| ex       | 字符“x”的高度。                                              |
| ch       | 数字“0”的宽度。                                              |
| rem      | 根元素的字体大小。                                           |
| lh       | 元素的行高。                                                 |
| rlh      | 根元素的行高。当用于根元素的 `font-size` 或 `line-height` 属性时，它指的是这些属性的初始值。 |
| vw       | 视口宽度的 1%。                                              |
| vh       | 视口高度的 1%。                                              |
| vmin     | 视口较小尺寸的 1%。                                          |
| vmax     | 视口大尺寸的 1%。                                            |
| vb       | 在根元素的[块向](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_logical_properties_and_values#块向与行向)上，初始包含块的尺寸的 1%。 |
| vi       | 在根元素的[行向](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_logical_properties_and_values#块向与行向)上，初始包含块的尺寸的 1%。 |
| svw、svh | 分别为[视口较小尺寸](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length#基于视口的相对长度单位)的宽度和高度的 1%。 |
| lvw、lvh | 分别为[视口大尺寸](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length#基于视口的相对长度单位)的宽度和高度的 1%。 |
| dvw、dvh | 分别为[动态视口](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length#基于视口的相对长度单位)的宽度和高度的 1%。 |

下面是几个常用的

#### em/rem相对于字体大小

如果父元素的 `font-size` 为 25px

那么子元素的 `1em` 为 25px

在`rem`中r指的不是子元素，而是根元素，如`html`

```css
html {
    font-size: 10px;
}
```

那么在body中的子元素的`1rem`为10px

**这在某些响应式布局中会非常有用**

#### vmin/vmax

一个可视最小/大边距，如果width > height 那么 vmax = width = 1vw | vmin = height = 1vh

在在移动端适配会非常有用

# 图片相关

### object-fit-图片禁止缩放 建议

```css
object-fit: cover;
```

可选项

- cover：背景图片会等比缩放，以完全覆盖元素。可能会裁剪图片以适应宽高比例。
- contain：背景图片会等比缩放，以完全显示图片，同时保证图片完整地容纳在元素内。

### object-position-位置

```css
object-position: center center; //图片居中对齐
```

```css
object-position: top right;/* 图片在容器顶部右侧对齐 */
```

```css
object-position: 50% 25%; /* 水平方向50%，垂直方向25%的位置 */
```

```css
object-position: 20px 40px;/* 水平方向20px，垂直方向40px的位置 */
```

### 背景图片适配

```css
background-size: cover;
background-position: center;
```

### 防止拉伸/保持比例

```css
max-width: 100%;
max-height: 100%;
object-fit: contain;
```

# background系列

### background背景

直接设置背景，是一个简写属性

#### 分割背景/双色

以70度分割

```css
background: linear-gradient(70deg, #fff700 50%, #f0e900 50%);
```

### background-image

很多人都推荐这么写

```css
background-image: url(./images/iqooneo7-color-img1-md.png);
```

通常搭配配置

- background-size: cover;
-  background-position: center;

## background-size

不拉伸，不填充

```
contain
```

不重复

```
no-repeat;
```

不拉伸，填充

```
cover;
```

# clip/clip-path/剪切

clip已经被弃用了，不要使用了

非常有意思的css属性

可以将图片剪切成不同的形状，如

- 半角圆形/圆形
- 菱形
- 门洞型
- 长方形裁切/ clip-path: inset(0 0 0 var(--pos, 50%));（上 右 下 左）

配合js可以实现非常好的效果

mdn链接

```
https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path
```

```
https://juejin.cn/post/6998178400506642445
```

### 在线调试工具

```
https://www.cssportal.com/css-clip-path-generator/
```

### clip-path/polygon

最常用的分割方式，绘制点，保留点围成的片段，传入的是点坐标

如

```
clip-path: polygon(50% 0%, 20% 80%, 100% 100%);
```

```
clip-path: polygon(0% 0%, 0% 80%, 20% 100%, 100% 100%, 100% 0%);
```

同样也支持弧形变宽  **inset**

```
clip-path: inset(5% 13% 15% 10% round 5% 20% 0 10%);
```

# 各种布局的居中

**注意：布局信息放在父元素中！**

### 文本居中

```css
text-align: center;
line-height: 14vw/9vh;
```

### flex/grid布局居中

置于父元素中

```css
display: grid/flex;
justify-content: center; //左右居中
align-items: center; //上下居中
height: 300px;  //一定要设置大小
```

```css
display:grid;
place-items: center;
height: 300px;   //一定要设置大小
```

### relative定位居中

使用布局居中

### absolute定位居中

```css
display:absolute;
top: 50%;
left: 50%;
transform:translate(-50%,-50%);
```

### fixed定位居中

```css
position: fixed; //不加这个不好使
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

### 万能居中

最后的居中方式，试试

```css
margin: 0 auto;
```

# 滚动css吸附

推荐使用fullPage.js做文档吸附

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        html,
        body {
            height: 100%;
            margin: 0;
            overflow: hidden;
        }

        .section {
            height: 100vh;
            scroll-snap-align: start;
        }

        .container {
            height: 100vh;
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="section" style="background-color: red;">Page 1</div>
        <div class="section" style="background-color: blue;">Page 2</div>
        <div class="section" style="background-color: green;">Page 3</div>
    </div>
</body>

</html>
```

### scroll-snap-align/scroll-snap-type

两个相互配合的css属性

- **scroll-snap-align：**属性用于定义滚动容器中的元素如何对齐到滚动位置。它用于设置元素在滚动结束时的吸附位置。

  - start（常用）：滚动时，该元素的起点（通常是上边缘或左边缘）与滚动容器的起点对齐。

    center：滚动时，该元素的中心与滚动容器的中心对齐。

    end：滚动时，该元素的末端（通常是下边缘或右边缘）与滚动容器的末端对齐。

    none：禁用对齐，不会有吸附效果。

- **scroll-snap-type：**用于设置滚动容器的吸附行为。它指定了滚动吸附的方向以及是否强制吸附。

  - **方向（轴）**

    - x：在水平方向上实现吸附滚动。

      y：在垂直方向上实现吸附滚动。

      both：在水平和垂直方向上都能吸附滚动。

  - **强制吸附模式**

    - mandatory：强制吸附。当用户滚动时，滚动会自动吸附到最近的对齐位置。
    - proximity：临近吸附。当滚动接近对齐位置时，才会吸附到该位置。

###  scroll-padding-top滚动padding

通常与前两个API结合，当滚动到数值时停止

```css
scroll-padding-top: 50px;
```

#  @用法

###  引用其他在线文件

```css
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
```

### 媒体查询/宽度查询/响应式布局

**这玩意需要放到最后**！

```css
/* 默认样式，适用于所有屏幕 */
.container {
  background-color: lightblue;
  padding: 20px;
}

/* 当视口宽度小于等于 768px 时应用 */
@media (max-width: 768px) {
  .container {
    background-color: lightgreen;
    padding: 10px;
  }
}

/* 当视口宽度大于 768px 时应用 */
@media (min-width: 769px) {
  .container {
    background-color: lightcoral;
    padding: 30px;
  }
}
/* 竖屏时应用 */
@media (orientation: portrait) {
  .sidebar {
    display: none;
  }
}

/* 横屏时应用 */
@media (orientation: landscape) {
  .sidebar {
    display: block;
  }
}
```

使用scss/less语法会更加便于维护

```scss
div.demo {
    width: 800px;
    @media screen and (max-width: 1440px) {
        width: 600px;
    }
    @media screen and (max-width: 768px) {
        width: 400px;
    }
}
```

#### 高度大于宽度案例

```css
/* 当高大于宽时应用的样式 */
@media screen and (max-aspect-ratio: 1/1) {
    body {
        background-color: red;
    }
}
```

### @media查询系统模式(暗色)

在系统为暗色时生效

```css
@media screen and (prefers-color-scheme:dark){
}
```

### @media判断横竖屏幕

```css
/* 在纵向方向（竖屏）下的样式 */
@media screen and (orientation: portrait) {
    body {
        background-color: lightblue;
    }
    /* 在竖屏时的其他样式 */
}

/* 在横向方向（横屏）下的样式 */
@media screen and (orientation: landscape) {
    body {
        background-color: lightgreen;
    }
    /* 在横屏时的其他样式 */
}
```

# 文本字体

### 常用字体总览

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>常用字体展示</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .font-sample {
            margin: 10px 0;
            font-size: 24px;
        }
    </style>
</head>
<body>
    <h1>常用字体展示</h1>
    <div class="font-sample" style="font-family: 'Arial';">Arial</div>
    <div class="font-sample" style="font-family: 'Verdana';">Verdana</div>
    <div class="font-sample" style="font-family: 'Georgia';">Georgia</div>
    <div class="font-sample" style="font-family: 'Times New Roman';">Times New Roman</div>
    <div class="font-sample" style="font-family: 'Trebuchet MS';">Trebuchet MS</div>
    <div class="font-sample" style="font-family: 'Courier New';">Courier New</div>
    <div class="font-sample" style="font-family: 'Impact';">Impact</div>
    <div class="font-sample" style="font-family: 'Comic Sans MS';">Comic Sans MS</div>
    <div class="font-sample" style="font-family: 'Oswald';">Oswald</div>
    <div class="font-sample" style="font-family: 'Tahoma';">Tahoma</div>
    <div class="font-sample" style="font-family: 'Lucida Console';">Lucida Console</div>
</body>
</html>
```

### 字体添加下滑线

```css
text-decoration: underline;
```

### text-align文本排列

文本的排列方式

```css
text-align: left;
text-align: right;
```

### font-family/字体

常用的字体

```css
font-family: sans-serif;
```

使用方法

```css
font-family:cursive;
```

### 字体重量

```css
font-weight: bold;
```

### 默认字体

警告：尽可能的避免使用浏览器自带的字体，在不同的操作系统上会有较大的差异，很多常用的字体在macOS，windows上是不同的

包括，楷体，隶书等等，在不同系统中的edge也不同

### @font-face字体使用

引用

```css
@font-face {
    font-family: "HYLeMiaoTi";        //自定义字体名称
    src:url("HYLeMiaoTiJ.ttf");       //字体包路径
}
```

使用

```css
.font1 {
  font-family:HYLeMiaoTi;   //在font.css中自定义的字体名称
 // font-family: HYLeMiaoTi,"Microsoft YaHei","微软雅黑";  //第一种字体不支持情况下，往后类推选择支持的字体
}
```

### 字体间距

```css
letter-spacing:2px;
```

### 字体左右对齐

```css
text-align: left;
```

### 字体阴影

只给字体加

```css
text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
```

### 文本溢出省略号

```css
text-overflow:ellipsis;   //文本溢出省略号
white-space:nowrap;       //强制不换行
```

### 提升为大写

```
text-transform: uppercase;
```

### 文字描边

```
-webkit-text-stroke: 4px #000000;
```

### 文字强制换行

```css
word-wrap: break-word; 
word-break: break-all;
```

### 文字禁止换行

仅对文字有效

```css
white-space: nowrap;
```

### 超长省略号

经常与禁止换行一起使用，

需要和overflow: hidden;配合使用

```css
white-space: nowrap;
/* 禁止文本换行 */
overflow: hidden;
/* 隐藏超出容器的内容 */
text-overflow: ellipsis;
/* 使用省略号表示溢出的文本 */
```

### em/sub/sup/strong字体形式

各种字体形式

- em：斜体
- sup：上角标
- sub：下角标
- strong：粗体

# C3动画

**警告：在使用时必须在mdn上查明支持范围**

### 实验性css属性 

- animation-timeline -- safari firfox 无法使用  --2024/10/8

### transition过度效果动画

```css
transition: 0.2s;
```

指定效果添加过度

```css
transition: all 0.3s;
```

通常配合过度曲线使用

#### 过度曲线

```css
transition: all 0.3s ease;
```

1. **线性过渡（linear）**这是默认的过渡曲线，变化以恒定的速度进行。在`cubic-bezier`函数中，您可以使用`linear`关键字来定义线性过渡。例如：`cubic-bezier(0, 0, 1, 1)`。
2. **缓入缓出（ease-in-out）**
3. **缓入（ease-in）**
4. **缓出（ease-out）**

### @keyframes/animation动画

**注：**在animation动画中没有display，可以使用透明度代替

通过js可以做更加详细的修改，但是要注意设置延时生效，保证播放完整

声明动画

```css
@keyframes myfirst
{
    from {background: red;}
    to {background: yellow;}
}
@-webkit-keyframes myfirst /* Safari 与 Chrome */
{
    from {background: red;}
    to {background: yellow;}
}
```

调用动画

```css
div{
    animation: myfirst 5s;
    -webkit-animation: myfirst 5s; /* Safari 与 Chrome */
}
```

百分比

```css
@keyframes myfirst
{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}
 
@-webkit-keyframes myfirst /* Safari 与 Chrome */
{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}
```

#### animation动画持续事件/迭代次数

```css
animation-iteration-count: 1;
```

#### 结束效果

维持动画结束时的样式

```css
animation: myfirst 4s forwards;
```

#### 顶部进度条案例

警告：实验性参数

```css
@keyframes scrollWarcher {
    to {
        scale: 1 1;
    }
}
.scrollWarcher {
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 10px;
    top: 0;
    background-color: #000;
    scale: 0 1;
    transform-origin: left;
    animation: scrollWarcher linear;
    animation-timeline: scroll(y);
    mix-blend-mode: difference;
}
```

### hover下滑线动画

初始div：

```css
background: linear-gradient(to right, #555, #280101) no-repeat right bottom;
background-size: 0px 2px;
transition: background-size 0.3s;
```

hover

```css
background-position: left bottom;
background-size: 100% 2px;
```

# 边框

### border/border-style/边框

```css
border: 1px solid #000;
```

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>菜鸟教程(runoob.com)</title>
</head>

<body>
    <p style="border-style:none;">无边框。</p>
    <p style="border-style:dotted;">虚线边框。</p>
    <p style="border-style:dashed;">长虚线边框。</p>
    <p style="border-style:solid;">实线边框。</p>
    <p style="border-style:double;">双边框。</p>
    <p style="border-style:groove;">凹槽边框。</p>
    <p style="border-style:ridge;">垄状边框。</p>
    <p style="border-style:inset;">嵌入边框。</p>
    <p style="border-style:outset;">外凸边框。</p>
    <p style="border-style:hidden;">隐藏边框。</p>
    <p style="border-style:dotted dashed solid double;">混合边框</p>
</body>

</html>
```

#### 底部下边框

用于列表底部

```css
border-bottom: 1px solid #eee;
```

```css
border-bottom: 1px solid rgba(215, 218, 226, 0.65);
```

### border-radius圆角

```css
border-radius: 15px;
```

彻底变圆

```css
border-radius: 50%;
```

特定方位

```css
border-radius: 0 0 0 15px;
```

# 特殊图形

### 三角形(边框实现)

小米商城的网页也是通过这种方法，提示的小尖是正方形旋转得到的

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Triangle Example</title>
    <style>
        /* 创建一个向下的三角形 */
        .triangle {
            width: 0; /* 没有宽度 */
            height: 0; /* 没有高度 */
            border-left: 50px solid transparent; /* 左边框透明 */
            border-right: 50px solid transparent; /* 右边框透明 */
            border-top: 50px solid #333; /* 上边框有颜色，形成三角形 */
        }
    </style>
</head>
<body>
    <div class="triangle"></div>
</body>
</html>
```

常见于提示框

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tooltip with Arrow</title>
    <style>
        .tooltip-container {
            position: relative;
            top:300px;
            left: 300px;
            display: inline-block;
            cursor: pointer;
        }

        .tooltip-text {
            visibility: hidden;
            width: 200px;
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 5px;
            border-radius: 4px;
            position: absolute;
            bottom: 125%; /* 调整提示框的位置 */
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
        }

        .tooltip-text::after {
            content: '';
            position: absolute;
            top: 100%; /* 定位在提示框的下方 */
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: #333 transparent transparent transparent; /* 小尖尖的颜色 */
        }

        .tooltip-container:hover .tooltip-text {
            visibility: visible;
        }
    </style>
</head>
<body>
    <div class="tooltip-container">
        Hover over me
        <div class="tooltip-text">This is a tooltip with an arrow!</div>
    </div>
</body>
</html>
```



### 扇形

- 下面是css3的实现，后面还有canvans实现（更加简单）

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>半圆</title>
    <style>
        body {
            margin: 0;
        }

        p {
            margin: 5px;
        }

        .container {
            margin: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px 20px;
        }


        .cquarter-circle-1 {
            position: relative;
            width: 100px;
            height: 100px;
        }

        .cquarter-circle-1::after {
            content: "";
            position: absolute;
            border: solid #20b2aa;
            border-width: 100px 100px 0 0;
            border-top-left-radius: 100px;
        }

        .cquarter-circle-2 {
            position: relative;
            width: 100px;
            height: 100px;
        }

        .cquarter-circle-2::after {
            content: "";
            position: absolute;
            border: solid #20b2aa;
            border-width: 100px 100px 0 0;
            border-top-right-radius: 100px;
        }

        .cquarter-circle-3 {
            position: relative;
            width: 100px;
            height: 100px;
        }

        .cquarter-circle-3::after {
            content: "";
            position: absolute;
            border: solid #20b2aa;
            border-width: 100px 100px 0 0;
            border-bottom-left-radius: 100px;
        }

        .cquarter-circle-4 {
            position: relative;
            width: 100px;
            height: 100px;
        }

        .cquarter-circle-4::after {
            content: "";
            position: absolute;
            border: solid #20b2aa;
            border-width: 100px 100px 0 0;
            border-bottom-right-radius: 100px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="cquarter-circle-1"></div>
        <div class="cquarter-circle-2"></div>
        <div class="cquarter-circle-3"></div>
        <div class="cquarter-circle-4"></div>
    </div>
</body>

</html>
```

- canvans实现

```html
<!DOCTYPE html>
<html>

<head>
    <title>Canvas 扇形示例</title>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="myCanvas" width="200" height="200"></canvas>
    <script>
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 100;
        var startAngle = 0;
        var endAngle = Math.PI * 0.7; // 绘制到90度（逆时针方向）
        var anticlockwise = false;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        ctx.closePath();

        // 可以根据需要设置扇形的填充颜色
        ctx.fillStyle = 'orange';
        ctx.fill();
    </script>
</body>

</html>
```

# 其他

## 保持固定比例(宽高比)

```css
aspect-ratio:16/9;
```

## 阴影

左右位移  上下位移   模糊程度  大小

```css
box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
```

##  opacity透明度

1为完全可见

```css
opacity: 1;
```

## 限制最小宽度

```css
min-width: 800px;
```

## z-index/层级

```css
position: relative; z-index: 100;
```

可以显示在第100层，越大越在前，尽量写在父级上。**必须要有position: 不然不生效**

## user-select/禁止复制/选中/框选/粘贴

```css
user-select: none;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
```

主要还是这个

```
user-select: none;
```

## backdrop-filter/filte毛玻璃

目前成熟的毛玻璃方案

```css
background-color: rgba(240, 240, 240, 0.5);
border: 1px solid rgba(215, 218, 226, 0.65);
backdrop-filter: blur(8px);
```

毛度

```css
filter: blur(2px);
```

## 允许滚动/建立滚动条

```css
overflow-x:scroll;
```

## 添加滑动效果

丢到需要滑动的组件里

```css
scroll-behavior: smooth;
```

## 隐藏上下滑动条/进度条/滚动条/滑条

```css
::-webkit-scrollbar {display:none}
```

## linear-gradient()颜色渐变

```css
linear-gradient(to right,#ff5f57,#28c840)
```

```css
/* 渐变轴为 45 度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 色标：从下到上，从蓝色开始渐变，到高度 40% 位置是绿色渐变开始，最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);

/* 颜色提示：从左到右的渐变，由红色开始，沿着渐变长度到 10% 的位置，然后在剩余的 90% 长度中变成蓝色 */
linear-gradient(.25turn, red, 10%, blue);

/* 多位置色标：45% 倾斜的渐变，左下半部分为红色，右下半部分为蓝色，中间有一条硬线，在这里渐变由红色转变为蓝色 */
linear-gradient(45deg, red 0 50%, blue 50% 100%);
```

#### radial-gradient渐变(中新圆)

可以实现复杂的背景

如：中心透明圆洞

```css
background: radial-gradient(circle at center, transparent 150px, black 151px);
```

- circle：为圆形
- at center：在中间
- transparent 150px：透明颜色 150px
- black 151px：黑色151px开始

#### 好看的橙色渐变

```
background: linear-gradient(90deg, #f12711, #f5af19);
```

## rotate旋转

以原点为中心旋转45度

```css
rotate: 45deg;
```

## 可滚动/滑条

```css
overflow:scroll;
```

## calc()计算函数

允许在括号内使用+-*/来计算数据

## 手机点击有选项框问题(蓝色点击)

直接*上去

```css
/* 解决手机浏览器点击有选框的问题 */
-webkit-tap-highlight-color: transparent;
```

## 一些加载效果

https://www.cssportal.com/css-loader-generator/

## input自动填充样式

3个属性都有用

```css
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    -webkit-text-fill-color: red;
    /* 字体颜色 */
    -webkit-box-shadow: 0 0 0px 1000px black inset;
    /* 背景色 */
    transition: background-color 5000s ease-in-out 0s;
}
```

## visibility隐藏不影响布局

常见于小三角提示框

- hidden：隐藏元素，但仍然占据空间，页面布局不会受到影响。

# 扩展

# less

css预处理器，基于js编译代码来生成css，最终生成的是标准的css

## less安装

```
npm install -g less
```

同样可以使用vscode插件来使用，下载easy less 后直接编写.less文件，后插件就会自动编译并生成成css

## 使用

使用less有很多好处，下面是推荐使用的

### 注释

可以使用//注释了

### @变量

```css
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

等同于

```css
#header {
  width: 10px;
  height: 20px;
}
```

### 嵌套

```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

嵌套为

```css
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

### 导入外部less/css

“导入”的工作方式和你预期的一样。你可以导入一个 `.less` 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 `.less` 扩展名，则可以将扩展名省略掉：

```css
@import "library"; // library.less
@import "typo.css";
```

# rem适配/24栅格

## cssrem插件

非常好用的插件，可以方便的书写rem

在vscode中下载，一般需要在设置中更改基准值

## flexible源码/js

自己引入就完了

```js
(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1; // 获取设备的dpr

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  function setRemUnit() {
    //设置rem的基准值 划分24份
    var rem = docEl.clientWidth / 24;
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function(e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
```

## 24栅格

下载完cssrem和flexible（上文）后，在flex布局下，1rem即1/24

# 加载生命周期

## defer在DOM构建之前加载

在标签中添加

```
<script defer src="main.js"></script>
```

# lottielab动画库

https://www.lottielab.com/

# 好看的虚线框

```css
.dashed-box {
    width: 300px;
    padding: 20px;
    margin: 50px auto;
    text-align: center;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border: 3px dashed #007bff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    font-size: 18px;
    color: #495057;
}
```

```html
<div class="dashed-box">
    This is a beautiful dashed border box!
</div>
```

# 边距空白bug

可能有空格，font-size=0试试

# 平滑滚动

推荐使用一些js库，如lenis

# flex定位bug

在高度有很大变化时会flex会乱

添加

```css
html, body {height:100%;overflow:auto;margin: 0;}
```

