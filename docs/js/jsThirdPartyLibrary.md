# 通用js库

## swiper-轮播图

比较好的轮播图组件，中文支持很好

官方文档：https://swiper.com.cn/demo/index.html

官方api文档：https://swiper.com.cn/api

安装

```
npm i swiper
```

demo

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Swiper demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
    <!-- Link Swiper's CSS -->
    <link rel="stylesheet" href="./swiper-bundle.min.css" />

    <!-- Demo styles -->
    <style>
        html,
        body {
            position: relative;
            height: 100%;
        }

        body {
            background: #eee;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #000;
            margin: 0;
            padding: 0;
        }

        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .swiper-slide img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .mySwiper {
            width: 100%;
            height: 100%;
            --swiper-theme-color: #ff6600;
            /* 设置Swiper风格 */
            --swiper-navigation-color: #00ff33;
            /* 单独设置按钮颜色 */
            --swiper-navigation-size: 30px;
            /* 设置按钮大小 */
        }
    </style>
</head>

<body>
    <!-- Swiper -->
    <div class="swiper mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="http://127.0.0.1:5500/static/index/轮播长图2.webp" alt=""></div>
            <div class="swiper-slide"><img src="http://127.0.0.1:5500/static/index/轮播长图2.webp" alt=""></div>
            <div class="swiper-slide"><img src="http://127.0.0.1:5500/static/index/轮播长图2.webp" alt=""></div>
            <div class="swiper-slide"><img src="http://127.0.0.1:5500/static/index/轮播长图2.webp" alt=""></div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
    </div>

    <!-- Swiper JS -->
    <script src="./swiper-bundle.min.js"></script>

    <!-- Initialize Swiper -->
    <script>
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 30, //图片间隙
            centeredSlides: true,
            loop: true, //循环，可以避免首尾切换问题
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
                // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
                // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
                // 操作包括触碰(touch)，拖动，点击pagination等。
            },
            pagination: { //下方的分页小圆点
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: { //左右按钮
                nextEl: ".swiper-button-next", //左按钮
                prevEl: ".swiper-button-prev", //右按钮
            },
        });
    </script>
</body>

</html>
```





## Browserify-CJS打包

目的是在浏览器中使用CJS

 将递归分析您应用程序中的所有 `require()` 调用，以便构建一个捆绑包，您可以在单个 `<script>` 标签中提供给浏览器。

```
browserify index.js -o build.js
```

之后直接在浏览器中使用build.js

## Babel-代码降级 

是一个 JavaScript 编译器，主要用于将现代 JavaScript 代码（如 ES6/ES7 等）转换为兼容旧版浏览器的 JavaScript 代码。它使开发者能够使用最新的 JavaScript 特性，而无需担心这些特性是否被所有浏览器支持。

## nosleep.js-防止休眠

通过模拟视频播放来防止休眠

```
npm i nosleep.js
```

开启与关闭

```
import NoSleep from 'nosleep.js';
const noSleep = new NoSleep();
noSleep.enable();  //开启
noSleep.disable(); //关闭
```

## gsap-js动画

不要有分号

#### 安装

```
npm i gsap
```

官方文档（vue引入相关）

```
https://gsap.com/docs/v3/Installation?tab=npm&module=esm&method=private+registry&tier=free&club=true&require=false&trial=true&plugins=ScrollTrigger
```

#### 核心概念

实现动画的核心函数

gsap主要有以下api

1. gsap.to()  这是一种最常用的tween动画，就是让元素从初始状态变化到目标状态。
2. gsap.from()  有点像to方法的逆向变化，就是让元素从目标状态变化到初始状态。
3. gsap.fromTo()  需要自己定义两个状态的数据，然后从前一个变化到后一个。
4. gsap.set()  直接设置成想要的状态，没有任何过度与动画效果。本质上就是duration（动画时常）为0的 .to 方法

实例：

```js
onMounted(() => {
    gsap.to(".box", {
        //x: 200,
        duration: 2, //动画时常
        rotation: 360,//旋转
        opacity: 0.5,//透明度
        scale: 0.5,//缩放
        transform: "translate(200px)",//transform 谨慎使用
        //使用小驼峰命名法
        backgroundColor: "red",//背景颜色
    });
});
```

#### gsap配置项

- duration  -- 动画变化的时长（秒）默认是0.5
- delay  --  动画变化开始前的延迟时长（秒），默认是0.5
- repeat -- 动画的重复次数，通常搭配yoyo使用
- yoyo -- 如果设置为ture，那么动画会在执行完之后再反向执行一次，就像悠悠球的效果，默认是false，**必须**搭配repate使用
- stagger -- 是一个时间的设置（秒），如果有多个元素同时要被驱动，那么当这个属性设置了时间的值之后，元素们会被依次逐个驱动，间隔时长就是这个属性设置的时长
- ease -- 动画过渡的运动曲线的设置，默认是"power1.out"
- onComplete -- 动画结束时执行的回调函数

#### 动画曲线

~~非常牛逼的曲线，令我动画旋转~~

##### case曲线

在gsap中添加case

```js
gsap.to(".purple", { 
  rotation: 360,
  duration: 2,
  repeat: -1,
  repeatDelay: 2,
  ease: 'bounce.out'
});
```

通常使用3中

- 先快后慢  -- ease: "power1.out"
- 先慢后快 -- ease: "power1.in"
- 交替 -- ease: "power1.inOut"

更多效果在官网有

```
https://gsap.com/docs/v3/Eases/
```

##### Staggers 依次

错开（依次）动画

在{ }中添加，在相同的类中他就会间隔使用动画

```
 stagger: 0.2,//错开动画
```

完整版

```vue
<script setup>
import { gsap } from "gsap";
import { onMounted } from "vue";


onMounted(() => {
    gsap.to(".box", {
        duration: 1,
        rotation: 360,
        opacity: 1,
        delay: 0.5,
        stagger: 0.2,//错开动画
        ease: "sine.out",
        force3D: true //强制使用3D加速
    });

    document.querySelectorAll(".box").forEach(function (box) {
        box.addEventListener("click", function () {
            gsap.to(".box", {
                duration: 0.5,
                opacity: 0,
                y: -100,
                stagger: 0.1,
                ease: "back.in"
            });
        });
    });
});

</script>

<template>
    <div style="display: flex;">
        <div class="box green"></div>
        <div class="box green"></div>
        <div class="box green"></div>
        <div class="box green"></div>
    </div>

</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.box {
    position: relative;
    display: block;
    top: 20px;
    left: 20px;
    cursor: pointer;
    opacity: 0;
    margin: 10px;
}

.green {
    width: 100px;
    height: 100px;
    background-color: green;
}
</style>
```

##### Timeline动画

时间线,是gsap的非常重要的部分，创建非常容易调节的、很灵活的顺序动画效果

```js
let tl = gsap.timeline()
// 把tween动画添加到timeline实例上，注意我们在用的是tl.to 而不是gsap.to
tl.to(".green", { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1 });
tl.to(".orange", { x: 600, duration: 1 });
```

新建一条时间线

在时间线中，to被分成4等份green占2份，依次执行

完整版

```vue
<script setup>
import { gsap } from "gsap";
import { onMounted } from "vue";


onMounted(() => {
    let tl = gsap.timeline()

    // 把tween动画添加到timeline实例上，注意我们在用的是tl.to 而不是gsap.to
    tl.to(".green", { x: 600, duration: 2 });
    tl.to(".purple", { x: 600, duration: 1 });
    tl.to(".orange", { x: 600, duration: 1 });
});

</script>

<template>
    <div class="box green"></div>
    <div class="box purple"></div>
    <div class="box orange"></div>
</template>

<style scoped>
.purple{
    width: 100px;
    height: 100px;
    background-color: purple;
}
.orange{
    width: 100px;
    height: 100px;
    background-color: orange;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.box {
    position: relative;
    margin: 10px;
}

.green {
    width: 100px;
    height: 100px;
    background-color: green;
}
</style>
```

具体可以看中文网

```
https://gsap.framer.wiki/timelines
```

#### gsap.utils工具

提供非常使用的js工具

##### interpolate范围

给值提供一个范围，常配合滚动插键使用

```js
const progress = self.progress;
const radius = gsap.utils.interpolate(150, 2000, progress); // 从150px到2000px放大
```

限制radius的大小，

其中progress为进度 大小为 0 ~ 1

根据0 ~ 1映射为150 ~ 2000

使用案例

```js
onUpdate: (self) => {
    const progress = self.progress;
    const radius = gsap.utils.interpolate(150, 2000, progress); // 从150px到2000px放大
    overlay.value.style.background = `radial-gradient(circle at center, transparent ${radius}px, black ${radius + 1}px)`;
}
```

#### 动画结束回调/清除

原生支持的

#### gsap数字滚动效果

gsap不止能获取DOM炒作，对数值也是能很好的控制的

数字变化案例

```vue
<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
const number = ref(0);
onMounted(() => {
    gsap.to(number, { value: 100, duration: 1 });
});
</script>

<template>
    <h1>{{ number.toFixed(2) }}</h1>
</template>

<style></style>
```



## gsap插件

在gsap中，可以通过注册插件来实现功能拓展

#### ScrollTrigger/鼠标滚动插件

动画会默认进入视口后播放。里开视口关闭！

无需下载，需要引入

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);// 注册插件 ScrollTrigger  用于监听滚动事件
```

```js
gsap.to(".umx-blue", {//是由滚动条控制的
    height: "100%",
    ease: "expo-out",
    scrollTrigger: {
        trigger: ".umx-blue",
        scrub: true, //动画会与滚动同步
        //   markers: true,
    },
});
```

**注意事项：**

默认状态下（不进行start end配置），在元素的顶部（包括元素本身初始就在窗口内）进入视口动画开启，在元素底部离开视口动画关闭

#### ScrollTrigger常见配置

- trigger -- 目标对象 **必用**
- scrub: true  -- 动画会与滚动同步，**必用**
- markers: true  -- 在调试中会开启初始结束定位，非常建议开启
- pin: true -- 动画执行期间，页面不进行滚动，动画执行结束后，页面才可以滚动
- start -- 代表动画开启  一般有两个参数 如 'center center'表示元素的中心进入了视口的中心
- end  -- 代表动画结束 与start同理

#### start与end触发条件

在其中start有以下常见选项

如果不选end，那么默认离开视口结束，end同理

```js
start: "center center",// 触发动画的!! 元素的中心 !!与 !!视窗的中心!! 对齐时触发
```

```js
start: "bottom bottom",//元素的底部与视口的底部开始时触发
```

```js
start: "200px bottom", //元素的顶部距离视口的底部200px时触发
```

```js
end: "top center", //在元素的顶部与视口的中心重叠时结束
```

一个案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    <title>山羊の前端小窝</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .mainBox {
            height: 1500px;
        }

        .compare {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 800px;
            width: 800px;
            background-color: black;
        }

        .before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: green;
        }
    </style>
</head>

<body>
    <div class="mainBox">
        <div class="compare">
            <div class="before"></div>
        </div>
    </div>
</body>
<script>
    gsap.registerPlugin(ScrollTrigger);// 注册插件 ScrollTrigger  用于监听滚动事件
    gsap.to(".before", {//是由滚动条控制的
        width: "0px",
        scrollTrigger: {
            trigger: ".before",
            scrub: true,
            start: "top top",
            end: "bottom top",
            // pin: true
        }
    });
</script>

</html>
```

#### onUpdate-更新函数(推荐)

使用更新函数配合utils工具类可以写出更灵活的gsap动画

```js
const progress = self.progress;//动画进度 0~1
const radius = gsap.utils.interpolate(150, 2000, progress); // 从150px到2000px放大
```

- 案例

    ```js
    gsap.to(overlay.value, {
        background: () => `radial-gradient(circle at center, transparent 150px, black 151px)`, // 初始背景
        scrollTrigger: {
            trigger: overlay.value,
            start: 'top top',
            end: 'bottom top',
            scrub: true, // 使动画根据滚动同步
            onUpdate: (self) => {
                console.log(self.progress);
                const progress = self.progress;//动画进度 0~1
                const radius = gsap.utils.interpolate(150, 2000, progress); // 从150px到2000px放大
                overlay.value.style.background = `radial-gradient(circle at center, transparent ${radius}px, black ${radius + 1}px)`;
            }
        }
    });
    ```

#### onEnter-greoll回调函数

在ScrollTrigger中也能执行回调函数

```js
scrollTrigger: {
    trigger: ".img1",
    scrub: true, // 动画与滚动同步
    onEnter: () => {
        // 在进入滚动区域时执行的函数
        console.log("进入滚动区域");
        // 执行其他操作
    },
    onLeave: () => {
        // 在离开滚动区域时执行的函数
        console.log("离开滚动区域");
        // 执行其他操作
    },
    onEnterBack: () => {
        // 在向上滚动进入滚动区域时执行的函数
        console.log("向上滚动进入滚动区域");
        // 执行其他操作
    },
    onLeaveBack: () => {
        // 在向上滚动离开滚动区域时执行的函数
        console.log("向上滚动离开滚动区域");
        // 执行其他操作
    }
}
```

#### VUE配置(重点)

在vue单页面路由路由跳转时需要**全部**清除，推荐下面的写法

```js
// 初始化 GSAP 动画
onMounted(() => {
    gsapInit();
});

// 在组件卸载时清除动画和 ScrollTrigger
onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // 清除所有 ScrollTrigger 实例
});
```

## sortablejs拖拽库

[Sortable.js中文网 (sortablejs.com)](http://www.sortablejs.com/)

npm安装

```
npm install sortablejs
```

引入

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
</head>
<body>
  
</body>
</html>
```

#### 示例一：列表拖拽排序

```js
<div id="example1" class="list-group">
    <div class="list-group-item">Item 1</div>
    <div class="list-group-item">Item 2</div>
    <div class="list-group-item">Item 3</div>
    <div class="list-group-item">Item 4</div>
    <div class="list-group-item">Item 5</div>
    <div class="list-group-item">Item 6</div>
</div>

new Sortable(example1, {
  animation: 150,
  // 拖拽时预览图样式
  ghostClass: 'blue-background-class'
});

.blue-background-class {
    background-color: #C8EBFB!important;
}
```

#### 示例二：多组列表相互拖拽

```html
<div class="row">
    <div id="example2Left" class="list-group col-6">
      <div class="list-group-item">Item 1</div>
      <div class="list-group-item">Item 2</div>
      <div class="list-group-item">Item 3</div>
      <div class="list-group-item">Item 4</div>
      <div class="list-group-item">Item 5</div>
      <div class="list-group-item">Item 6</div>
    </div>
  
    <div id="example2Right" class="list-group col-6">
      <div class="list-group-item tinted">Item 1</div>
      <div class="list-group-item tinted">Item 2</div>
      <div class="list-group-item tinted">Item 3</div>
      <div class="list-group-item tinted">Item 4</div>
      <div class="list-group-item tinted">Item 5</div>
      <div class="list-group-item tinted">Item 6</div>
    </div>
</div>

new Sortable(example2Left, {
  group: 'shared', // set both lists to same group
  animation: 150
});

new Sortable(example2Right, {
  group: 'shared',
  animation: 150
});

.tinted {
    background-color: #fff6b2!important;
}
```

#### 示例三：多组列表拖拽克隆

不会影响原来的

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    <style>
        .blue-background-class {
            background-color: #C8EBFB !important;
        }

        .tinted {
            background-color: #fff6b2 !important;
        }
    </style>
</head>

<body>
    <div class="row">
        <div id="example3Left" class="list-group col-6">
          <div class="list-group-item">Item 1</div>
          <div class="list-group-item">Item 2</div>
          <div class="list-group-item">Item 3</div>
          <div class="list-group-item">Item 4</div>
          <div class="list-group-item">Item 5</div>
          <div class="list-group-item">Item 6</div>
        </div>
      
        <div id="example3Right" class="list-group col-6">
          <div class="list-group-item tinted">Item 1</div>
          <div class="list-group-item tinted">Item 2</div>
          <div class="list-group-item tinted">Item 3</div>
          <div class="list-group-item tinted">Item 4</div>
          <div class="list-group-item tinted">Item 5</div>
          <div class="list-group-item tinted">Item 6</div>
        </div>
    </div>
    
    <script>
        new Sortable(example3Left, {
            group: {
                name: 'shared',
                pull: 'clone' // To clone: set pull to 'clone'
            },
            animation: 150
        });

        new Sortable(example3Right, {
            group: {
                name: 'shared',
                pull: 'clone'
            },
            animation: 150
        });
    </script>
</body>

</html>
```

#### 示例四：禁止 Sorting

禁止黄色的div进入白色的div中

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    <style>
        .blue-background-class {
            background-color: #C8EBFB !important;
        }

        .tinted {
            background-color: #fff6b2 !important;
        }
    </style>
</head>

<body>
    <div class="row">
        <div id="example4Left" class="list-group col-6">
            <div class="list-group-item">Item 1</div>
            <div class="list-group-item">Item 2</div>
            <div class="list-group-item">Item 3</div>
            <div class="list-group-item">Item 4</div>
            <div class="list-group-item">Item 5</div>
            <div class="list-group-item">Item 6</div>
        </div>

        <div id="example4Right" class="list-group col-6">
            <div class="list-group-item tinted">Item 1</div>
            <div class="list-group-item tinted">Item 2</div>
            <div class="list-group-item tinted">Item 3</div>
            <div class="list-group-item tinted">Item 4</div>
            <div class="list-group-item tinted">Item 5</div>
            <div class="list-group-item tinted">Item 6</div>
        </div>
    </div>

    <script>
        new Sortable(example4Left, {
            group: {
                name: 'shared',
                pull: 'clone',
                put: false // Do not allow items to be put into this list
            },
            animation: 150,
            sort: false // To disable sorting: set sort to false
        });

        new Sortable(example4Right, {
            group: 'shared',
            animation: 150
        });

    </script>
</body>

</html>
```

#### 示例五：只对指定的 class 子元素上作用拖拽

比如指定当鼠标移动上 `i 标签` （icon）元素时进行拖拽。

```html
<div id="example5" class="list-group col">
        <div class="list-group-item"><i class="handle"></i>&nbsp;&nbsp;Item 1</div>
        <div class="list-group-item"><i class="handle"></i>&nbsp;&nbsp;Item 2</div>
        <div class="list-group-item"><i class="handle"></i>&nbsp;&nbsp;Item 3</div>
        <div class="list-group-item"><i class="handle"></i>&nbsp;&nbsp;Item 4</div>
        <div class="list-group-item"><i class="handle"></i>&nbsp;&nbsp;Item 5</div>
        <div class="list-group-item"><i class="handle"></i>&nbsp;&nbsp;Item 6</div>
    </div>

    <script>
        new Sortable(example5, {
            handle: '.handle', // handle class
            animation: 150
        });
    </script>
```

#### 示例六：过滤 Filter

过滤不需要使用拖拽的列表单元。

```html
<div id="example6" class="list-group">
    <div class="list-group-item">Item 1</div>
    <div class="list-group-item">Item 2</div>
    <div class="list-group-item">Item 3</div>
    <div class="list-group-item filtered">Filtered</div>
    <div class="list-group-item">Item 4</div>
    <div class="list-group-item">Item 5</div>
</div>

new Sortable(example6, {
  filter: '.filtered',
  animation: 150
});

.filtered{
  background-color: red!important;
}
```

#### sortable属性

- `group`：

```js
js复制代码string: 用于定义多组列表进行交互时进行关联的名称；
// or
object：{ name, pull, put }
    name：同上面 string；
    // 定义从容器列表移除的设置，可选值为：true/false/'clone'/function
    // 如果为 false，不能拖动容器子项添加到其他容器内，但可以在本容器内进行拖拽排序
    pull: true,
    // 定义向容器列表放置列表单元的的设置，可选值为true/false/['foo','bar']/function
    // 其中 ['foo','bar']：这个可以是一个字符串或者是字符串的数组，代表的是group配置项里定义的name值
    // 如果为 false，不允许其他容器的子项拖拽至当前容器内，但可以在本容器内进行拖拽排序
    put: true,
```

- `sort`：boolean 定义列表单元是否可以在列表容器内进行拖拽排序。
- `disabled`：boolean 定义当前容器单元 sortable 对象是否可用。
- `animation`：number 单位：ms，定义排序过程中动画的时间。
- `handle`：selector 格式：简单的选择器字符串，比如 class；使得在容器内，任意层级的子元素，只有存在指定的 class 的元素上，才能够拖动。
- `filter`：selector 格式：简单的选择器字符串，比如 class；定义哪些列表单元不能进行拖放，可设置为多个选择器，中间用“，”分隔。
- `draggable`：selector 格式：简单的选择器字符串，比如 class；定义哪些列表单元可以进行拖拽。
- `dragClass`：selector 格式 class 选择器，定义拖拽时，跟随鼠标移动的预览元素样式。
- `ghostClass`：selector 格式 class 选择器，在拖动元素时，放置位置的影子设置样式。
- `chosenClass`：selector 格式 class 选择器，当选中列表单元时会给该单元增加一个 class。
- `scroll`：boolean 默认为true，当排序的容器是个可滚动的区域，拖放可以引起区域滚动。

#### sortable事件

```js
// 列表单元被选中的回调函数
  onChoose(evt) {
    console.log('onChoose: 列表单元被选中！');
  },
  
  // 列表单元拖动开始的回调函数
  onStart(evt) {
    console.log('onStart: 列表单元拖动开始的回调函数！');
  },
  
  // 容器列表单元，在拖放结束后的回调函数
  onEnd(evt) {
    console.log('onEnd: 列表单元拖放结束后的回调函数！');
  },
  
  // 其他列表单元添加到本列表容器的回调函数
  onAdd(evt) {
    console.log('onAdd: 其他列表单元添加到本列表容器的回调函数');
  },
  
  // 列表单元在列表容器中的排序发生变化后的回调函数
  onUpdate(evt) {
    console.log('onUpdate: 列表单元在列表容器中的排序发生变化后的回调函数');
  },
  
  // 列表元素移到另一个列表容器成功后的回调函数
  onRemove(evt) {
    console.log('onRemove: 列表元素移到另一个列表容器的回调函数');
  },
  
  // 试图选中一个被 filter 过滤的列表单元的回调函数
  onFilter(evt) {
    console.log('onFilter: 试图选中一个被filter过滤的列表单元的回调函数');
  },
  
  // 当移动列表单元在一个列表容器中或者多个列表容器中的回调函数
  onMove(evt, originalEvt) {
    console.log('onMove: 当移动列表单元在一个列表容器中或者多个列表容器中的回调函数');
  },
  
  // 当创建一个列表单元副本的时候的回调函数
  onClone(evt) {
    console.log('onClone: 当创建一个列表单元副本的时候的回调函数');
  },
  
  // 用于传递数据，在容器单元按住拖动时触发
  setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
    dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
  },
```

#### sortable事件对象

```
to：HTMLElement--移动到的列表容器
from：HTMLElement--来源的列表容器
target：HTMLElement--来源的列表容器
item：HTMLElement--被移动的列表单元
clone：HTMLElement--副本的列表单元
oldIndex：number/undefined--在列表容器中的原序号
newIndex：number/undefined--在列表容器中的新序号
pullMode：默认是 undefined，当项目位于另一个可排序列表中时，如果操作克隆，值为 clone，如果是移动，只为 true。
```

#### sortable方法

- option：设置/获取配置信息

```js
sortable.option('sort', false); // 设置
sortable.option('sort'); // 获取
```

- toArray：获取 序列化可排序的列表单元的 data-id

```js
var order = sortable.toArray(); // ['36h', '36i', '36j', '36k', '36l', '36m']
```

- sort：根据列表单元的 data-id 进行排序

```js
sortable.sort(order.reverse()); // 重新排序
```

- destory：销毁容器排序：

```scss
scsssortable.destroy(); // 销毁容器排序
```

一个非常强大的js动画库，由原生js开发，**可以使用在任意框架中**

## cropperjs裁切

非常流行的前端裁切组件

```
npm i cropperjs
```

#### html案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cropper.js Example</title>
    <link href="https://unpkg.com/cropperjs/dist/cropper.css" rel="stylesheet">
    <style>
        img {
            max-width: 100%;
        }

        .cropper-container {
            margin: auto;
            max-width: 500px;
        }
    </style>
</head>

<body>
    <div class="cropper-container">
        <img id="image" src="./1.jpg" alt="Picture">
    </div>
    <button id="cropButton">Crop</button>
    <div id="croppedResult"></div>

    <script src="https://unpkg.com/cropperjs"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var image = document.getElementById('image');
            var cropper = new Cropper(image, {
                aspectRatio: 16 / 9,
                viewMode: 1,
                movable: true,
                zoomable: true,
                rotatable: true,
                scalable: true,
                crop(event) {
                    console.log(event.detail.x);
                    console.log(event.detail.y);
                    console.log(event.detail.width);
                    console.log(event.detail.height);
                    console.log(event.detail.rotate);
                    console.log(event.detail.scaleX);
                    console.log(event.detail.scaleY);
                },
            });

            document.getElementById('cropButton').addEventListener('click', function () {
                var canvas = cropper.getCroppedCanvas({
                    width: 640,
                    height: 360,
                });

                var croppedImage = canvas.toDataURL('image/png');
                var resultDiv = document.getElementById('croppedResult');
                resultDiv.innerHTML = '<img src="' + croppedImage + '">';
            });
        });
    </script>
</body>

</html>
```

#### vue3剪切案例

```vue
<template>
    <div id="Box">
        <h3>预览</h3>
        <!--  预览的图片  -->
        <div class="before"></div>
        <!--  裁剪按钮-->
        <el-button @click="sureSava">裁剪</el-button>
        <div class="box">
            <div class="box_1">
                <img class="image" src="../public/1.jpg" ref="image">
            </div>
            <!--裁剪完的图片-->
            <div class="box_2">
                <img :src="Shuju.afterImg">
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import Cropper from "cropperjs";
import 'cropperjs/dist/cropper.css'
const image = ref(null)
const Shuju = reactive({
    afterImg: '',// 裁剪后的图片
    image: null,// 裁剪的图片
    myCropper: null // 进行裁剪
})

const sureSava = () => {
    // 拿到裁剪后的图片
    Shuju.afterImg = Shuju.myCropper.getCroppedCanvas({
        imageSmoothingQuality: 'high'
    }).toDataURL('image/jpeg'); // 设置图片格式
}

// 页面刷新自动执行
onMounted(() => {
    Shuju.image = image.value;
    Shuju.myCropper = new Cropper(Shuju.image, {
        viewMode: 0,
        dragMode: 'move',
        background: true,
        preview: '.before',
        autoCropArea: 0.8,
        zoomOnWheel: true,
        center: true
    })
})
</script>

<style scoped lang="less">
.image {
    width: 300px;
    height: 300px;
}

#Box {
    border: 1px silver solid;
    padding: 20px;
    margin-top: 20px;
    border-radius: 5px;
    height: 800px;
}

.before {
    width: 150px;
    height: 150px;
    position: relative;
    left: 150px;
    overflow: hidden;
}

.box {
    display: flex;
    column-gap: 6rem;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    div {
        flex: 1;
        height: 500px;
        background: #ccc;

        img {
            display: block;
        }
    }

    .box_2 {
        img {
            width: 200px;
            margin: 0 auto;
        }
    }
}
</style>
```

#### vue3导出案例

通过 crop(event) 触发回调

```vue
<script setup>
import { onMounted, reactive, ref } from "vue";
import Cropper from "cropperjs";
import 'cropperjs/dist/cropper.css'

const image = ref()
const cropData = ref({
  x: 0,
  y: 0,
  width: 0,
  height: 0
})
const Shuju = reactive({
  afterImg: '',// 裁剪后的图片
  image: null,// 裁剪的图片
  myCropper: null // 进行裁剪
})

const sureSava = () => {
  // 拿到裁剪后的图片
  Shuju.afterImg = Shuju.myCropper.getCroppedCanvas({
    imageSmoothingQuality: 'high'
  }).toDataURL('image/jpeg'); // 设置图片格式
}

function downloadImage() {
  const link = document.createElement('a');
  link.href = Shuju.afterImg;
  link.download = 'cropped-image.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 页面刷新自动执行
onMounted(() => {
  Shuju.image = image.value;
  Shuju.myCropper = new Cropper(Shuju.image, {
    viewMode: 0,
    aspectRatio: 16 / 9,
    dragMode: 'move',
    background: true,
    preview: '.before',
    autoCropArea: 0.8,
    zoomOnWheel: true,
    center: true,
    crop(event) {
      cropData.value = {
        x: event.detail.x,
        y: event.detail.y,
        width: event.detail.width,
        height: event.detail.height,
      }
    }
  })
})
</script>

<template>
  <div id="Box">
    <h3>预览</h3>
    <!--  预览的图片  -->
    <div class="before"></div>
    <!--  裁剪按钮-->
    <el-button @click="sureSava">裁剪</el-button>
    <el-button @click="downloadImage">保存</el-button>
    <div class="box">
      <div class="box_1">
        <img class="image" src="../../public/1.jpg" ref="image">
      </div>
      <!--裁剪完的图片-->
      <div class="box_2">
        <img :src="Shuju.afterImg">
      </div>
    </div>
  </div>
  <div v-if="cropData">
    <h3>Crop Data:</h3>
    <p>X: {{ cropData.x }}</p>
    <p>Y: {{ cropData.y }}</p>
    <p>Width: {{ cropData.width }}</p>
    <p>Height: {{ cropData.height }}</p>
  </div>
</template>

<style scoped lang="less">
.image {
  width: 300px;
  height: 300px;
}

#Box {
  border: 1px silver solid;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  height: 800px;
}

.before {
  width: 150px;
  height: 150px;
  position: relative;
  left: 150px;
  overflow: hidden;
}

.box {
  display: flex;
  column-gap: 6rem;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  div {
    flex: 1;
    height: 500px;
    background: #ccc;

    img {
      display: block;
    }
  }

  .box_2 {
    img {
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
```

#### 配置项

```js
aspectRatio: 16 / 9, // 剪裁框的宽高比例
autoCropArea: 0.8, // 自动剪裁区域的大小，相对于原始图片
viewMode: 1, // 显示模式：0-剪裁框不可移动，1-剪裁框可移动，2-剪裁框自由移动
movable: true, // 是否允许剪裁框移动
zoomable: true, // 是否允许缩放图片
rotatable: true, // 是否允许旋转图片
guides: true, // 是否显示剪裁框虚线
background: true, // 是否显示背景网格
cropBoxMovable: true, // 是否允许剪裁框拖动
cropBoxResizable: true, // 是否允许剪裁框缩放
minCropBoxWidth: 100, // 剪裁框的最小宽度
minCropBoxHeight: 100, // 剪裁框的最小高度
/*
* viewMode 视图控制
- 0 无限制
- 1 限制裁剪框不能超出图片的范围
- 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
- 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
* */
viewMode: 0,
// 设置图片是否可以拖拽功能
/*
* dragMode 拖拽图片模式
- crop 形成新的裁剪框
- move 图片可移动
- none 什么也没有
* */
dragMode: 'move',
// 是否显示图片后面的网格背景,一般默认为true
background: true,
// 进行图片预览的效果
preview: '.before',
// 设置裁剪区域占图片的大小 值为 0-1 默认 0.8 表示 80%的区域
autoCropArea: 0.8,
// 设置图片是否可以进行收缩功能
zoomOnWheel: true,
// 是否显示 + 箭头
center: true
```

#### 核心获取

##### get/setCropBoxData

获取剪切框信息

##### get/setImageData

获取图片信息

##### get/setCanvasData

获取整体canvans数据

#### 重置位置

```
Shuju.myCropper.reset();
```

## fontawesome

#### fontawesome安装

官方文档

```
https://docs.fontawesome.com/web/use-with/vue/
```

先装SVG（建议全部引入）

```
npm i --save @fortawesome/fontawesome-svg-core
```

之后选装的（建议全部引入）

```
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
```

之后装vue框架（建议全部引入）

```
npm i --save @fortawesome/vue-fontawesome@latest-3
```

也建议全部引入

```
npm install @fortawesome/fontawesome-free
//main.js
import '@fortawesome/fontawesome-free/css/all.min.css';
```

#### fonawesom从vue迁移

#### 也可以全部引入

安装

```shell
npm install @fortawesome/fontawesome-free
```

之后在mian.js中全部引入

```js
import '@fortawesome/fontawesome-free/css/all.min.css';
```

之后就直接以html的形式引入就行了

```html
<div style="font-size: 30px; color: black;"><i class="fas fa-heart"></i>
    <i class="fas fa-star"></i>
    <i class="fab fa-twitter"></i>
    <i class="fa-brands fa-weixin"></i>
</div>
```

装一大堆东西后在mian.js文件中

添加bars组件：

```js
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUserSecret,faBars} from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret,faBars)

app.component('font-awesome-icon', FontAwesomeIcon)
```

使用的是驼峰命名引入

如faXmark是

```
<font-awesome-icon :icon="['fas', 'xmark']" />
```

## dayjs时间处理



## animate.css动画库

有一些好看的过度动画

```
$ npm i animate.css
```

装好了在package里能看见

之后看官网，这是VUE文档

## nprogress路由跳转进度条效果

安装

```
npm i nprogress
```

在router文件下导入

```js
import  NProgress  from 'nprogress'
import 'nprogress/nprogress.css'
```

```js
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})
```

## html2canvas网页转图片

把html保存为canvans，可以进行图片转换

```
https://www.npmjs.com/package/html2canvas
```

安装

```
npm i html2canvas
```

一个案例

```js
    // 获取预览元素
    // const previewElement = document.querySelector('.before');

    // if (!previewElement) {
    //     console.error('预览元素未找到');
    //     return;
    // }

    // // 创建一个新的 canvas 元素
    // const canvas = document.createElement('canvas');
    // const ctx = canvas.getContext('2d');

    // // 获取预览元素的宽高
    // const width = previewElement.clientWidth;
    // const height = previewElement.clientHeight;

    // // 设置 canvas 尺寸
    // canvas.width = width;
    // canvas.height = height;

    // // 将预览元素绘制到 canvas 上
    // html2canvas(previewElement).then((previewCanvas) => {
    //     // 将预览 canvas 绘制到新创建的 canvas 上
    //     ctx.drawImage(previewCanvas, 0, 0, width, height);

    //     // 导出 canvas 内容为图片数据 URL
    //     const finalCroppedImage = canvas.toDataURL();

    //     // 创建下载链接并点击下载
    //     const link = document.createElement('a');
    //     link.href = finalCroppedImage;
    //     link.download = '裁剪预览.png';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // }).catch((error) => {
    //     console.error('生成预览图像失败:', error);
    // });
```

## highlight.js代码高亮

[开始 | highlight.js中文网 (fenxianglu.cn)](https://www.fenxianglu.cn/highlightjs/docs/start/)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css">

    <title>Document</title>
</head>

<body>
    <pre>
        <code class="language-java">
            public class Main {
                public static void main(String[] args) throws Exception {
                    int a = 10;
                    if(a>5){
                        throw new RuntimeException("a>5");
                    }
                }
            }
        </code>
    </pre>

    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
    <script>
        hljs.highlightAll();
    </script>
</body>

</html>
```

## qrcode生产二维码库

npm地址

```
https://www.npmjs.com/package/qrcode
```

安装

```
npm install qrcode
```



- html案例

    ```html
    <!DOCTYPE html>
    <html>
    
    <head>
        <link href="https://unpkg.com/cropperjs/dist/cropper.css" rel="stylesheet" />
        <style>
            * {
                margin: 0;
                padding: 0;
            }
    
            .biga .aaa {
                width: 100px;
                height: 100px;
                background-color: red;
            }
        </style>
    </head>
    
    <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
        <div id="qrcode"></div>
        <script>
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: "https://www.liyinghao.cc",  // 你要生成二维码的网址
                width: 128,
                height: 128
            });
        </script>
    </body>
    
    </html>
    ```


## lenis平滑滚动

这个东西官网挺有意思的，实际使用意义不明

```
https://lenis.darkroom.engineering/
```

安装

```
npm i lenis
```

## VaraSVG字体动画

这个东西非常有趣，实现字体动画

安装

```
npm install vara
```

#### 完整案例

- html

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vara.js Example</title>
        <script src="https://unpkg.com/vara"></script>
        <style>
            #vara-container {
                width: 80%;
                margin: 50px auto;
                text-align: center;
                border: 1px solid #ddd;
                padding: 20px;
            }
        </style>
    </head>
    
    <body>
    
        <div id="vara-container"></div>
    
        <script>
            // 初始化 Vara.js 动画
            var vara = new Vara("#vara-container", "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json", [
                {
                    text: "Hello, World!",
                    fontSize: 48,
                    color: "#000",
                    duration: 2000
                }
            ], {
                strokeWidth: 1.3  // 增加线条宽度，让文字看起来更粗
            });
    
            // 动画完成后的回调函数
            vara.ready(function () {
                console.log('Animation Complete!');
            });
        </script>
    
    </body>
    
    </html>
    ```

- vue

    ```vue
    <template>
      <div id="vara-container">
        <svg width="0" height="0">
          <defs>
            <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#ff7e5f;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#feb47b;stop-opacity:1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </template>
    
    <script setup>
    import { onMounted } from 'vue';
    import Vara from 'vara';
    onMounted(() => {
      // 初始化 Vara.js 动画
      const vara = new Vara("#vara-container", "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json", [
        {
          text: "Hello, World!",
          fontSize: 180,
          duration: 2000
        }
      ]);
    
      // 动画完成后的回调函数
      vara.ready(function () {
        console.log('Animation Complete!');
        // 应用渐变填充
      });
    });
    </script>
    
    <style>
    #vara-container {
      width: 100%;
      margin: 50px auto;
      text-align: center;
      padding: 20px;
    }
    
    /* 通过默认颜色显示动画，动画完成后应用渐变 */
    svg text {
      fill: #000;
      /* 初始颜色 */
    }
    </style>
    ```

## dotenv环境控制

vite与现代node框架有原生的写法

下载量非常大可以在生产环境中使用，在vue中因为有node环境不用装，见vue文档

安装

```
npm i dotenv
```

## workbox

谷歌的pwa工具，很多pwa框架都是基于workbox的

## v-md-editor

网页md编辑器

## pixi-spine-2D动效

2D动效库，常见于二游网站(原神，明日方舟)

## Mock.js

在后端还没有完成之前，可以使用Mock拦截前端的请求，并通过Mock来获取数据

```
$ npm i mockjs
```

#### Mock定义

在api文件夹下建立mockData文件夹与mock.js

需要的单独数据放在mockdata文件夹下

eg.

```js
export default {
    getHomeData: () => {
        return{
            code: 200,
            data:{
                tableData:[
                    {
                      name: 'oppo',
                      todayBuy: 500,
                      monthBuy: 3500,
                      totalBuy: 22000
                    },
                    {
                      name: 'vivo',
                      todayBuy: 300,
                      monthBuy: 2200,
                      totalBuy: 24000
                    },
                    {
                      name: '苹果',
                      todayBuy: 800,
                      monthBuy: 4500,
                      totalBuy: 65000
                    }
                  ]
            }
        }
    }
}
```

然后在mock.js中使用

eg.

```js
import Mock from 'mockjs'
import homeApi from './mockData/home'

Mock.mock('/home/getData',homeApi.getHomeData)
```

需要在main.js中引入

```js
import './api/mock.js'
```

#### Mock使用

之后就可以在axios中使用啦

```js
const getTableList = async () => {
  await axios.get('/home/getData').then(res => {
    console.log(res)
    //tableData.push(res.data)
    tableData.value = res.data.data.tableData
  })
}
```

#### FastMock

在线的Mock接口，模拟出更复杂的后端接口数据

## 富文本编辑器

有现成的

[视频教程 | wangEditor](https://www.wangeditor.com/v5/video-course.html)

安装(两个都要安装)

```
npm install @wangeditor/editor
```

```
npm install @wangeditor/editor-for-vue@next
```

## 图标库echarts

看官方文档

```
https://echarts.apache.org/handbook/zh/basics/download
```

在vue项目中，使用ref获取dom，通过onMounted来启动

# VUE专属

## vueDraggablePlus拖拽库

安装

```
npm install vue-draggable-plus
```

发生拖拽后会自动更新list

```vue
<template>
<button @click="start">start</button>
<button @click="pause">pause</button>

<div class="flex">
    <VueDraggable ref="el" v-model="list" :disabled="disabled" :animation="150" ghostClass="ghost"
                  class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded" @start="onStart"
                  @update="onUpdate">
        <div v-for="item in list" :key="item.id" class="cursor-move h-30 bg-gray-500/5 rounded p-3 cursor-move">
            {{ item.name }}
    </div>
    </VueDraggable>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { VueDraggable } from 'vue-draggable-plus'
    const list = ref([
        {
            name: 'Joao',
            id: 1
        },
        {
            name: 'Jean',
            id: 2
        },
        {
            name: 'Johanna',
            id: 3
        },
        {
            name: 'Juan',
            id: 4
        }
    ])

    const el = ref()
    const disabled = ref(false)
    function pause() {
        el.value?.pause()
    }

    function start() {
        el.value?.start()
    }

    const onStart = () => {
        //console.log('start')
    }

    const onUpdate = () => {
        //console.log('update')
        console.log(list)
    }
</script>

<style scoped>
    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }
</style>
```

#### 两个列表互相拖拽

```vue
<template>
    <div class="flex">
        <VueDraggable class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
            v-model="list1" animation="150" ghostClass="ghost" group="people" @update="onUpdate" @add="onAdd"
            @remove="remove">
            <div v-for="item in list1" :key="item.id" class="cursor-move h-30 bg-gray-500/5 rounded p-3">
                {{ item.name }}
            </div>
        </VueDraggable>
        <VueDraggable class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
            v-model="list2" animation="150" group="people" ghostClass="ghost" @update="onUpdate" @add="onAdd"
            @remove="remove">
            <div v-for="item in list2" :key="item.id" class="cursor-move h-30 bg-gray-500/5 rounded p-3">
                {{ item.name }}
            </div>
        </VueDraggable>
    </div>
    <!-- <div class="flex justify-between">
        <preview-list :list="list1" />
        <preview-list :list="list2" />
    </div> -->
</template>
  
<script setup>
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
const list1 = ref([
    {
        name: 'Joao',
        id: '1'
    },
    {
        name: 'Jean',
        id: '2'
    },
    {
        name: 'Johanna',
        id: '3'
    },
    {
        name: 'Juan',
        id: '4'
    }
])
const list2 = ref(
    list1.value.map(item => ({
        name: `${item.name}-2`,
        id: `${item.id}-2`
    }))
)
function onUpdate() {
    console.log('update')
}
function onAdd() {
    console.log('add')
}
function remove() {
    console.log('remove')
}
</script>
```

在上述代码中，一些API的触发条件

**@update：**   列表中有列表原本就有的元素发生位置变换

 **@add：**        列表有新元素进入

**@remove**： 列表有新元素移除

## VueUse

官方封装js代码

安装

```
$ npm i @vueuse/core
```

看英文文档，要不然搜不出来

#### useLastChanged

记录时间戳

#### useIntersectionObserver

判断DOM是不是在视口内

在main.js中：

```js
app.directive('img-lazy',{
    mounted(el,binding){
        //el绑定的/需要监视的元素元素 img
        //binding.value 绑定的值 指令
        console.log(el,binding.value)
        useIntersectionObserver(
            el, //监听的目标
            ([{ isIntersecting }]) => { //是否进入视口区
              console.log(isIntersecting)
              if(isIntersecting){
                //进入视口区域

              }
            },
          )
    }
})
```

