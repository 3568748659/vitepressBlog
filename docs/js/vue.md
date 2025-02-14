*2024/10/11日，vite文档与vue进行分离，vite单独在其他中

2024/7/12 去框架化启动，非vue相关包会移动到js文档中

 2024/3/26 这是第三次重构了  加油 

# 准备配置

## 安装

vite安装

```
npm create vue@latest
```

#### 指定启动端口

在启动命令中添加

```
"dev": "vite --port 3000",
```

## 配置解释/ESLint/Vitest/JSX/Prettier

ESLint -->代码质量提示，显示没用过的变量

Vitest  -->单元测试用的 可以使用Vitest编写测试试用例

JSX  -->js语法扩展，允许在js中编写类似html的代码

Prettier  -->代码格式工具，格式代码工具，我不喜欢用

## 常规app.vue初始化

```vue
<script setup>

</script>

<template>
  <RouterView />
</template>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
```

# setup组合式API

**组合式**API是vue3的写法，vue2更偏向于**选项式**

setup是一个语法糖，在{{ }}中直接使用变量，{{ }}里支持运算，其中不需要写.value

```vue
<!-- 运算符 -->
<p>num + 24 = {{num + 24}}</p>
<!-- 三元表达式 -->
<p>Are you ok? {{ok ? 'I am ok !':'no'}}</p>
<!-- 对象方法直接调用 -->
<p>名字倒过来写：{{name.split('').reverse().join('')}}</p>
```

# 组件

长期以来，对VUE的组件都有大量的误解，导致写起来不是很灵活

总结如下

1. ref获取到的就是真实的DOM，无法设置可能是生命周期问题
2. 组件建议使用一个div进行包裹，类名为组件名
3. ref不会进行穿透，如果穿透可能是bug
4. 直接使用ref无法获取组件的dom，需要使用$el进行穿透

# ref/reactive 相应式

目的是响应式更新DOM

ref 支持所有类型

reactive  只支持引用类型

被ref和reactive包裹的才是响应式

`reactive()` 返回的是一个原始对象的 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，它和原始对象是不相等的

**ref 取值赋值 加 .value    reactive 不加 .value**

**在任何时候都优先考虑ref**

## 响应式解析

Q:为什么要使用响应式，而不是let 

当你在模板中使用了一个 ref，然后改变了这个 ref 的值时，Vue 会自动检测到这个变化，并且相应地更新 DOM。这是通过一个基于依赖追踪的响应式系统实现的。当一个组件首次渲染时，Vue 会**追踪**在渲染过程中使用的每一个 ref。然后，当一个 ref 被修改时，它会**触发**追踪它的组件的一次重新渲染。

#### ref初始化问题

在任何时候初始化时都建议声明类型

如何开始时不声明类型，之后无法赋值为对象

```js
const dataList = ref({});
dataList.value.p21 = [{ value: 'jiazai' }]
```

## ref获取dom对象

获取到的就是真正的DOM元素

1.调用ref函数为空，生成ref对象

2.通过ref标签绑定ref对象

3.**⚠️ 一定要注意生命周期**在生命周期获取完成之前无法获取DOM

```vue
<script setup lang="ts">
import { ref,onMounted } from 'vue'
const h1ref = ref(null)
//组件挂载完成后，获取到h1ref
onMounted(() => {
    console.log(h1ref.value)
})
</script>

<template>
    <h1 ref="h1ref">我是h1</h1>
</template>
```

#### 获取根DOM元素($el)

在需要直接获取html文本文件时使用 $el 

```js
preview.value.$el
```

案例：获取全部的h标签

```js
preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
```

# VUE指令

## 内置指令

#### v-text

- v-text：渲染文字

```vue
<template>
    <div v-text="a">

    </div>
</template>

<script setup>
const a = 'hello world'
</script>

<style scoped lang="less">

</style>
```

#### v-html

- v-html：可以解析html字符串/渲染html字符串

```vue
<template>
    <div v-html="a">
      
    </div>
</template>

<script setup>
const a = '<section style="color:red">hello world</section>'
</script>

<style scoped lang="less">

</style>
```

#### v-if

- v-if判断

```vue
<template>
    <div v-if="a">
        hello
    </div>
</template>

<script setup>
const a = true
</script>

<style scoped lang="less">

</style>
```

#### v-show

- v-show：高一点性能的v-if

切换了css  if是注释掉

```vue
<template>
    <div v-show="a">
        hello
    </div>
</template>

<script setup>
const a = true
</script>

<style scoped lang="less">

</style>
```

#### v-on(重点)

- v-on:添加/触发事件 

!==onclick，v-on是个非常好用的指令 v-on:clilck 可以简写成@click

```vue
<template>
    <button v-on:click="xxx">hello</button>
</template>

<script setup lang="ts">
const xxx = () => {
    console.log('xxx')
}
</script>

<style scoped lang="less">

</style>
```

v-on还支持动态写法

```vue
<template>
    <button @[event]="xxx">hello</button>
</template>

<script setup lang="ts">
const event = 'click'
const xxx = () => {
    console.log('xxx')
}
</script>

<style scoped>

</style>
```

常见的配合v-on的事件（与addEventListener是一样的）

##### v-on只触发一次

```js
@click.once
```

##### 阻止事件冒泡

```js
@click.stop
```

##### 事件穿透

使用css属性即可

```css
pointer-events: auto;
pointer-events: none;
```

##### 函数运行问题

有时候会有函数不生效的问题，是（）的锅

```js
v-on:touchmove="getMove"
v-on:touchmove="getMove()"
```

是完全不一样的，不加括号为执行函数，加括号为获取返回值

##### @keydown键鼠监听

其实也是v-on的简写

后面需要的按键就可以监听键盘了

eg：（input只会在选中后监听）

```html
<input @keydown.r="submit" />
```

```html
<input @keyup.enter="submit" />
```

- 右键

    ```js
    @contextmenu="handleRightClick"
    ```

    

#### v-bind

- v-bind： 绑定事件（id style class...）常见于v-bind:class（:class）

```vue
<template>
    
<div v-bind:id="id">
    yanshi
</div>

</template>

<script setup>
const id = 'app'

</script>
```

#### v-model(重点)

- v-model：双向绑定,绑定表单元素，常见于input标签中

```vue
<template>
<div>
    <input v-model="a" type="text">
    {{ a }}
</div>
</template>

<script setup>
import { ref } from 'vue'
const a = ref("lyh")
</script>
```

##### v-model跨组件传值

使用defineProps可以获取

```js
const props = defineProps({
    modelValue: Boolean
})
```

#### v-for（重点）

- v-for：遍历 

```vue
<template>
    <div v-for="(item,index) in arr" :key="index">
        {{index}}-{{ item }}
    </div>
</template>

<script setup>
const arr= [1,2,3,4,5,6,7,8,9,10]
</script>
```

**key的作用**

单一的，用于强制替换一个元素而不是复用它

key属性可以用来提升v-for渲染的效率！，vue不会去改变原有的元素和数据，而是创建新的元素然后把新的数据渲染进去

在使用v-for的时候，vue里面需要我们给元素添加一个key属性，这个key属性必须是唯一的标识

给key赋值的内容不能是可变的

#### v-once

- v-once：只渲染一次

在随后的重新渲染，元素/组件及其所有子项将被当作静态内容并跳过渲染。这可以用来优化更新时的性能。

```vue
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 带有子元素的元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<MyComponent v-once :comment="msg" />
<!-- `v-for` 指令 -->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

#### v-cloak

用于隐藏尚未完成编译的 DOM 模板。

详细信息

**该指令只在没有构建步骤的环境下需要使用。**

当使用直接在 DOM 中书写的模板时，可能会出现一种叫做“未编译模板闪现”的情况：用户可能先看到的是还没编译完成的双大括号标签，直到挂载的组件将它们替换为实际渲染的内容。

`v-cloak` 会保留在所绑定的元素上，直到相关组件实例被挂载后才移除。配合像 `[v-cloak] { display: none }` 这样的 CSS 规则，它可以在组件编译完毕前隐藏原始模板。

css

```
[v-cloak] {
  display: none;   
}
```

template

```
<div v-cloak>
  {{ message }}
</div>
```

直到编译完成前，`<div>` 将不可见。

## 自定义指令

#### 解析

分为两种

1. 单个组件自定义指令

   关键字  --  **directive**

   在setup语法糖中，任何以v开头的驼峰都可以被当成一个自定义指令

   下面为一个案例

   ```vue
   <script setup>
   // 在模板中启用 v-focus
   const vFocus = {
     mounted: (el) => el.focus()
   }
   </script>
   
   <template>
     <input v-focus />
   </template>
   ```

   这个指令的意义为，当没有点击其他的地方时，聚焦于此

2. 全局自定义组件

   在main.js中进行注册

   ```js
   app.directive('focus', {
       mounted: (el) => el.focus()
   })
   ```

   之后无需任何引入就能在其他vue文件中使用了

   ```vue
   <input v-focus />
   ```


还有更多钩子，可参考官方文档

```
https://cn.vuejs.org/guide/reusability/custom-directives.html#custom-directives
```

#### 拖拽

```js
app.directive('drag', (el) => {
    const oDiv = el // 当前元素
    const minTop = oDiv.getAttribute('drag-min-top')
    const ifMoveSizeArea = 20
    oDiv.onmousedown = e => {
        let target = oDiv
        while (window.getComputedStyle(target).position !== 'absolute' && target !== document.body) {
            target = target.parentElement
        }

        document.onselectstart = () => {
            return false
        }
        if (!target.getAttribute('init_x')) {
            target.setAttribute('init_x', target.offsetLeft)
            target.setAttribute('init_y', target.offsetTop)
        }

        const initX = parseInt(target.getAttribute('init_x'))
        const initY = parseInt(target.getAttribute('init_y'))

        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - target.offsetLeft
        const disY = e.clientY - target.offsetTop
        document.onmousemove = e => {
            // 通过事件委托，计算移动的距离
            // 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
            const l = e.clientX - disX
            const t = e.clientY - disY
            const { marginTop: mt, marginLeft: ml } = window.getComputedStyle(target)
            // 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
            target.style.left = l - parseInt(ml) + 'px'
            target.style.top = (t < minTop ? minTop : t) - parseInt(mt) + 'px'
            if (Math.abs(l - initX) > ifMoveSizeArea || Math.abs(t - initY) > ifMoveSizeArea) {
                target.setAttribute('dragged', '')
            } else {
                target.removeAttribute('dragged')
            }
        }
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            document.onselectstart = null
        }
        // return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false
    }
})
```

```vue
<script setup></script>

<template>
    <div class="mainBox" v-drag>mainBox</div>
</template>



<style scoped>
.mainBox {
    position: absolute;
    height: 300px;
    width: 300px;
    background-color: red;
}
</style>
```

#### 懒加载

```js
app.directive('img-lazy', {  //img-lazy 指令名称  
    mounted(el: any, binding: any) {  //mounted 指令生命周期  el绑定的元素 binding指令  调用时机：指令绑定到元素上时调用
        //el绑定的元素 img
        //binding.value 绑定的值 指令
        console.log(el, binding.value)
        useIntersectionObserver(
            el, //监听的目标
            ([{ isIntersecting }]) => { //是否进入视口区
                console.log(isIntersecting)
                if (isIntersecting) {
                    //进入视口区域
                    console.log(el.src)
                    el.src = binding.value
                }
            },
        )
    }
})
```

#### 删除节点

```js
const vAdmin = {
    mounted(el){
        console.log(el);
        if(categoryStore.userData.role != 1){
            el.style.display = "none"
        }
    }
}
```

就可以根据需要删除节点了

#### 失去焦点

通常在el-button中使用

```js
//自定义指令 目的是为了点击按钮后失去焦点
const elBlur = (el) => {
  return () => el?.blur()//失去焦点
}

app.directive('blur', {//自定义指令
    created (el, binding, vnode) {//创建
        if (vnode?.type === 'button') {//如果是按钮
          el.addEventListener('click', elBlur(el))//添加点击事件
        }
    },
    unmounted (el) {//卸载
        el.removeEventListener('click', elBlur(el))//移除点击事件
    }
})
```



# vue与样式

## :class/:style动态样式

#### :class

bool写法

```js
:class="{ active: isActive }"
//添加额外的class
:class="['switch', { active: isActive.value }]"
```

三元写法

```js
:class="[isActive ? activeClass ：errorClass]"
```

#### :style

`:style` 支持绑定 JavaScript 对象值，对应的是HTML 元素的 `style` 属性：

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

```js
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

同样建议直接绑定一个对象，也是非常好用

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '30px'
})
```

```html
<div :style="styleObject"></div>
```

## scoped语法糖

表示样式只在当前文件下生效

#### scoped穿透

使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

**父组件中可以直接修改组件中根元素的css**

## 用js快速添加/动态/选择类/:cla/css

当props长度大于6时添加

```js
<div :class="{'main':props.length > 6}">
```

## RouterLink导航条的高亮显示

点击时添加类

```VUE
<RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
```

## 消除滚动条抖动问题

```js
//给body添加class
onMounted(() => {
  if (window.innerWidth - document.body.clientWidth !== 0) {
    document.body.style.setProperty(
      'width',
      `calc(100% - ${window.innerWidth - document.body.clientWidth}px)`
    )
  }
  document.body.style.setProperty('overflow', 'hidden')
})
onUnmounted(() => {
  setTimeout(() => {
    document.body.style.removeProperty('width')
    document.body.style.removeProperty('overflow')
  }, 100)
})
```

# computed计算属性

值发生改变的时候会更新值，传入默认值

自动触发更新（**跟watch似的**）

下面是两个案例，效果在值改变前是完全一样的

```js
const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No'
})
```

```js
const publishedBooksMessage = calculateBooksMessage()
function calculateBooksMessage() {
    return author.books.length > 0 ? 'Yes' : 'No'
}
```

完整版

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

# watch（重点）

监听ref  reactive 的变化

ref  reactive 才能被watch监听到

watch和计算属性可以实现同样的功能，但是watch可以更加复杂，尤其是面对异步处理

如果可以使用计算属性，优先使用计算属性

```vue
<template>
<div>
    case: <input v-model="message" type="text">
    <hr>
    case2: <input type="text">
    </div>
</template>

<script setup>
    import { ref,computed, watch } from 'vue';
    let message = ref('Hello World!');
    watch(message, (newVal, oldVal) => {
        console.log('newVal', newVal);
        console.log('oldVal', oldVal);
    });

</script>
```

## 深度监听

如果是 嵌套ref 需要 **深度监听**  reactive 默认开启

```js
watch(message, (newVal, oldVal) => {
    console.log('newVal', newVal);
    console.log('oldVal', oldVal);
},{
    deep: true，
//	immediate:true  //立刻执行一次
    flush: 'sync' // sync: 同步执行  pre: 同步执行（组件更新前调用）  post: 异步执行(组件更新后执行)
});
```

## watch对象属性

正常直接watch是watch不到的，可以开启深度监听，也可以开启监听内部属性

```vue
<template>
    <div>
        <input v-model="b.x" type="text">
        {{ b.x }}
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const b = ref({
    x: 2
})

// 深度监视对象内部的属性
watch(b, (newVal, oldVal) => {
    console.log('newVal:', newVal)
    console.log('oldVal:', oldVal)
}, { deep: true })

// 或者监视对象内部的具体属性
watch(() => b.value.x, (newVal, oldVal) => {
    console.log('newVal:', newVal)
    console.log('oldVal:', oldVal)
})
</script>
```

## watchEffect

一个简洁的watch，但是关系不明确，不推荐使用

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

watchEffect不需要传入监听的变量，他会监听其中的全部响应式数据变化（并不是比较其中的值），**在init时会触发一次**

```vue
<template>
    <input v-model="message" type="text">
    <input v-model="message2" type="text">
</template>

<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue';
let message = ref('hello world');
let message2 = ref('hello world');
watchEffect(() => {
    console.log(message.value);
    console.log(message2.value);
})
</script>
```

# nextTick下一帧

**vue的渲染逻辑为异步渲染**，当连续改变时，全部的改变完成以后触发Dom更新

目的是获取DOM改变之后的数据(DOM更新后的结果)，修复VUE异步渲染的逻辑

通常在获取DOM时使用，dom有可能在onMounted之前有使用，使用`nextTick`确保获取DOM

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

下面是两个使用案例

- 获取位置

```js
onMounted(() => {
    const fly = ref()
    // Use nextTick to ensure that the DOM has been updated
    // and the ref is available
    nextTick(() => {
        console.log(fly.value?.offsetTop)
        console.log(fly.value?.offsetLeft)
    })
})
```

- 设置位置

```js
<div class="menu" v-if="show" ref="menu">
    nextTick(() => {
    if (menu.value) {
        menu.value.style.left = e.clientX + 'px'
        menu.value.style.top = e.clientY + 'px'
    }
})
```

# 组件和生命周期

## 创建，更新，销毁生命周期

v-show不会触发更新生命周期

- DOM钩子

    ```js
    onBeforeMount(()=>{  //读不到DOM
        console.log('创建之前')
    }) 
    onMounted(()=>{   //读DOM常用
        console.log('创建完成')
    })
    ```

- 更新钩子

    ```js
    //更新的钩子
    onBeforeUpdate(()=>{
        console.log('更新组件之前')
    })
    onUpdated(()=>{
        console.log('更新组件完成')
    })
    ```

- 销毁钩子

    ```js
    //销毁 (页面跳转组件不显示时触发，刷新)
    onBeforeUnmount(()=>{
        console.log('销毁之前')
    })
    onUnmounted(()=>{           //在这个生命周期中移除事件
        console.log('销毁完成')
    })
    ```

## 原生js事件与生命周期/删除/取消事件监听（非常重要，引起P0级bug）

在vue文件中裸露js事件，如定时器，等并不会随着组件消失而消失，必须手动销毁

```js
onUnmounted(() => {
    clearInterval(timer);
    document.removeEventListener('keydown', handleKeyPress);
})
```

## 组件销毁

```vue
<template>
    <h5> 我是组件 </h5>
    <div>{{ str }}</div>
</template>

<script setup lang="ts">
import { ref,onBeforeMount,onMounted,
    onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted } from 'vue'

//beforeCreate  created  setup语法糖模式没有这两个生命周期
const str = ref('hello')
//创建
onBeforeMount(()=>{
    console.log('创建之前')
})
onMounted(()=>{
    console.log('创建完成')
})
//更新的钩子
onBeforeUpdate(()=>{
    console.log('更新组件之前')
})
onUpdated(()=>{
    console.log('更新组件完成')
})
//销毁
onBeforeUnmount(()=>{
    console.log('销毁之前')
})
onUnmounted(()=>{  
    console.log('销毁完成')
})

</script>
```

app

```vue
<template>
    <h1>生命周期</h1>
    <A v-if="flag"></A>
    <button @click="flag =! flag">创建销毁</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import A from './components/A.vue'
const flag = ref(true)
</script>
```

## 渲染跟踪，捕获数据生命周期

```js
onRenderTracked((e)=>{
    console.log('渲染跟踪')
    console.log(e)
})
onRenderTriggered((e)=>{
    console.log('渲染触发')
    console.log(e)
})
```

# 组件

## 全局/动态/递归组件

出现频率高的组件 --全局

复用高的 --递归 

默认的组件就是局部组件

- 全局组件

  注册为全局组件，就不用import了，直接在template中使用了

  全局组件案例  在main.ts中

  ```js
  import CardVue from './components/A.vue'
  export const app = createApp(App)

  app.component('CardVue', CardVue)
  ```

- 动态组件

  由于组件是通过变量引用而不是基于字符串组件名注册的，在 `<script setup>` 中要使用动态组件的时候，应该使用动态的 `:is` 来绑定：

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Foo" />
    <component :is="someCondition ? Foo : Bar" />
  </template>
  ```

- 递归组件

  递归组件代表这在组件自身中可以引用组件自己

  一个单文件组件可以通过它的文件名被其自己所引用。例如：名为 `FooBar.vue` 的组件可以在其模板中用 `<FooBar/>` 引用它自己。

  请注意这种方式相比于导入的组件优先级更低。如果有具名的导入和组件自身推导的名字冲突了，可以为导入的组件添加别名：

  递归组件案例

  ```js
  import { FooBar as FooBarChild } from './components'
  ```

## components自定义组件

不会用

## keep-alive缓存组件

主要用来缓存反复使用的组件，避免重复渲染，还有记录值

```vue
<KeepAlive>
        <div></div>
</KeepAlive>
```

```vue
<KeepAlive :include="['div']">//enclue
    <div></div>
</KeepAlive>
```

里面的会被缓存

会添加新生命周期

## Teleport传送组件

veu内置组件可以将模板代码渲染至任何一个指定的DOM节点，不受父级的影响

```vue
<Teleport to="body">
  <A></A>
</Teleport>
```

## Suspense异步组件

vue提供的异步组件Suspense

```vue
<Suspense>
  <template #default>

  </template>
  <template #fallback>
      <div>loading...</div>
	//加载的时候显示
  </template>
</Suspense>
```

异步组件，打包的时候把后来的需要使用的包放到后面的引，加快显示进度

## Teleport传送组件

veu内置组件可以将模板代码渲染至任何一个指定的DOM节点，不受父级的影响

```vue
<Teleport to="body">
    <A></A>
</Teleport>
```

## Transition 动画组件

建议看官方文档：**https://cn.vuejs.org/guide/built-ins/transition.html**

内置组件，可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：

- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由特殊元素 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

基础案例

```vue
<script setup>
import {ref} from 'vue'
const show = ref(true)
</script>

<template>
    <button @click="show = !show">Toggle</button>
    <Transition>
        <p v-if="show">hello</p>
    </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
```

在 `<Transition>`本身中并没有任何的动画，他触发动画的钩子来实现动画

这些状态分别为：

1. `v-enter-from`：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
2. `v-enter-active`：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
3. `v-enter-to`：进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 `v-enter-from` 被移除的同时)，在过渡或动画完成之后移除。
4. `v-leave-from`：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
5. `v-leave-active`：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。
6. `v-leave-to`：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 `v-leave-from` 被移除的同时)，在过渡或动画完成之后移除。

#### Transition注意事项

1. Transition组件中只能包裹一个元素节点

#### 为过度效果命名

我们可以给 `<Transition>` 组件传一个 `name` prop 来声明一个过渡效果名：

```
<Transition name="fade">
  ...
</Transition>
```

对于一个有名字的过渡效果，对它起作用的过渡 class 会以其名字而不是 `v` 作为前缀。比如，上方例子中被应用的 class 将会是 `fade-enter-active` 而不是 `v-enter-active`。这个“fade”过渡的 class 应该是这样：

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

#### 贝塞尔曲线

一些复杂的效果距离（贝塞尔曲线）

```vue
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
    <button @click="show = !show">Toggle</button>
    <Transition name="slide-fade">
        <p v-if="show">hello</p>
    </Transition>
</template>

<style>
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
```

#### onMounted触发过度

```vue
<script setup>
import { onMounted, ref } from 'vue'
const show = ref(false)
onMounted(()=>{
    show.value = true
})
</script>

<template>
    <button @click="show = !show">Toggle</button>
    <Transition name="slide-fade">
        <p v-if="show">hello</p>
    </Transition>
</template>

<style>
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
```

# define系列/组件传递

在setup语法糖下的一系列组件操作

## defineProps-组件传参(常用)

**警告：传递的值为只读，需要修改值使用组件传递函数**

**必须在setup语法糖下编写，无需引入**

向子组件传递参数

在父组件内传递变量的时候，需要加**冒号**`:`，否则你就只是单纯的传递了一个字符串而已，不需要import引入

注意：如果在js中使用传递过来的参数需要使用对象接收，之后在对象中点出内容

- 普通使用案例

  ```js
  <A :title="name"></A>
  ```

  ```js
  <script setup >
  const props = defineProps({
      title:{
          default: ''
      }
  })
  </script>
  
  <template>
      <h5> 我是组件 </h5>
      <div>{{ title }}</div>
  </template>
  ```

- 传递方法和数组

  ```js
  <template>
      <h2>I am 子组件</h2>
      <h3>使用emit实现子传父</h3>
      
      <button @click="ipp()">111</button>
  </template>
  
  <script setup>
  import { defineEmits,ref,watch } from 'vue';
  const i = ref(0)
  const ipp = () =>{
      i.value++
  }
  watch(i,()=>{
      console.log(i.value)
      ziChuanFu()
  })
  const emit = defineEmits(['child'])
  const ziChuanFu = () => {
      emit('child',i)
  }
  </script>
  ```

  ```js
  <template>
      <h1>I am 父组件</h1>
      <ChildComponent @child="zCf"/>
      <h2>{{ x }}</h2>
  </template>
  
  <script setup>
  import ChildComponent from './ChildComponent.vue'
  import { ref } from 'vue';
  const x = ref('')
  const zCf = (value) => {
      x.value = value;
      console.log(x.value)
  }
  </script>
  ```

@child="zCf"是与子组件的关联

#### defineProps中的参数

**required: true**值为必传参数、没传会弹出报错

```vue
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>
```

默认值，没传的会用默认值

```js
const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
})
```

#### defineProps TS写法

在ts中会更加方便

- 父组件

  ```TS
  <HelloWorld msg="Hello Vue 3 + Vite + Vue Router + TypeScript!" />
  ```

- 子组件

  ```ts
  <script setup lang="ts">
  defineProps<{
      msg: string
  }>()
  
  </script>
  
  <template>
      <div class="greetings">{{ msg }}</div>
  </template>
  ```

## defineEmits-组件传递函数

在父组件中使用@符号把父组件的函数传递给子组件

在父组件中使用常量接收一个匿名函数

@名字="xx" 传递给子组件

```js
@getList="getList"
```

在子组件中使用defineEmits接收

```js
const emits = defineEmits(['clickCall']);
```

然后就能正常使用啦

```js
emits('clickCall')
```

- **案例**

父组件：

```vue
<template>
  <section class="parent">
    <childVue :num="nums" @increase="handleIncrease"></childVue>
  </section>
</template>

<script setup>
  import childVue from './child.vue';
  import { ref } from 'vue';
  const nums = ref(0);
  const handleIncrease = () => {
    nums.value++;
  };
</script>
```

子组件：

```vue
<template>
  <section class="box" @click="handelClick">{{ num }}</section>
</template>

<script setup>
  const emits = defineEmits(['increase']);
  const handelClick = () => {
    emits('increase');
  };
</script>
```

## defineModel-传递变量(3.4)

**在vue3.4版本后才能使用！**

如果你需要在其他地方使用本vue组件的响应式数据，需要使用v-model发送出去

在父组件中：

```vue
let isOpen = ref(false)

<List ref="listEl" v-model="isOpen"/>
```

在子组件中使用一个变量去接收

```vue
const isOpen = defineModel()
```

之后就能在子文件里使用完全一样的变量了

也支持key/vaule操作

```vue
<List ref="listEl" v-model:jjj="isOpen"/>
```

```js
const iOpen = defineModel('jjj')
```

## defineExpose-组件访问内部属性/暴露函数

默认情况下在`<script setup>`语法糖下组件内部的属性和方法是不开放给父组件访问的，可以通过defineExpose编译宏指定哪些属性和方法允许访问

**常见于父组件需要使用子组件的中的参数和函数**

**警告：避免使用下面的代码，会有生命周期问题** 

```
<div v-if="childRef.value.count">WDF</div> 
```

在子组件里，父组件可以访问myFunction函数

```vue
defineExpose({
  myFunction
})
```

案例

- 子组件

  ```vue
  <template>
      <div>子组件{{ count }}</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const count = ref(0);
  
  function increment() {
      count.value++;
      console.log('count incremented:', count.value);
  }
  
  // 使用 defineExpose 暴露 count 和 increment 方法
  defineExpose({
      count,
      increment
  });
  </script>
  ```

- 父组件

  ```vue
  <template>
      <ChildComponent ref="childRef" />
      <button @click="incrementChildCount">增加子组件计数</button>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ChildComponent from '../src/views/A.vue';
  
  const childRef = ref(null);
  
  // 通过 childRef 访问子组件暴露的方法
  const incrementChildCount = () => {
      childRef.value.increment();  // 调用子组件的 increment 方法
      console.log('子组件计数:', childRef.value.count);  // 访问子组件的 count
  };
  
  </script>
  ```

# provide/inject-跨组件通信

顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信

**这东西只能由顶层（父组件）向底层去发**（重点）

顶层组件发出：

```ts
provide('key',vaule)
```

底层组件接受：

```ts
const message = inject('key')
```

传递相应式的数据ref(value),甚至可以传递方法函数

# 插槽slot

**在同样的组件中串插不同的内容**，十分好用

子组件给父组件的一个占位符，slot  父组件可以在占位符中添加任意代码 

举例来说，这里有一个 `<FancyButton>` 组件，可以像这样使用：

template

```
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>
```

而 `<FancyButton>` 的模板是这样的：

template

```
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口 -->
</button>
```

`<slot>` 元素是一个**插槽出口** (slot outlet)，标示了父元素提供的**插槽内容** (slot content) 将在哪里被渲染。

最终的结果

```
<button class="fancy-btn">Click me!</button>
```

## 有名插槽

slot name="名字"

v-slot:名字

## 动态插槽

template #[变量]

let 变量 = ref('xxx')

# axios

## axios封装请求拦截器

**需要在main.js文件夹下引入**

大多都是通用的：

```js
import axios from "axios";

const hettpInatance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// 请求拦截器
hettpInatance.interceptors.request.use(
  (config) => {
    return config;
  },
  (e) => Promise.reject(e)
);

// 响应拦截器
hettpInatance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (e) => Promise.reject(e)
);

export default hettpInatance;
```

携带token的拦截配置与校验

```js
import axios from "axios";

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
    if (error.response && error.response.status === 401) {
        // 在这里执行处理 token 过期的逻辑，例如重新登录或刷新 token
        // 例如，您可以向用户显示一个提示，要求重新登录
        //alert('登录已过期，请重新登录');
        localStorage.removeItem("token");
        // router.push("/login")
        window.location.href = "/login"
      }
    return Promise.reject(error);
});
```

# vue-router路由

Vue Router 是Vue.js的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。

**安装：**

```shell
npm install vue-router@4
```

**使用：**

在main.js文件夹中

```js
import router from './router'
app.use(router)
```

在框架里的router配置路由

```js
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/',
            component:Layout
        }
    ]
})
export default router
```

## SPA单页面应用

客户端路由的作用是在单页应用 (SPA) 中将浏览器的 URL 和用户看到的内容绑定起来。当用户在应用中浏览不同页面时，URL 会随之更新，但页面不需要从服务器重新加载。

**在vue-router中，获取页面会直接加载全部的页面信息，执行全部的js代码，无论是否使用，并且在路由切换时不会刷新页面**

## RouterView路由出口

**router-view** 当你的路由**path 与访问的地址相符时**，会**将指定的组件**替换该 router-view

如访问的是index  会被替换为index.vue

```js
<RouterView />
```

## 外部js使用vue-router

有时候需要在单独的js文件中切换界面，使用window.location.href会刷新界面，破坏pinia的信息

在外部js文件中

```js
import Router from '@/router'
Router.push("/gaming")
```

## router子路由

#### 含children路由

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component: () => import('@/views/Main.vue'),
      children:[
        {
          path:'/',
          name:'home',
          component: () => import('@/views/home/Home.vue')
        }
      ]
    }
  ]
})

export default router
```

#### 复杂多文件路由配置

**index文件**

```js
import { createRouter, createWebHistory } from 'vue-router'
import { useCategoryStore } from '@/stores/counter'
import routesConfig from './config'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/mainbox',
            name: 'mainbox',
            component: () => import('@/views/MainBox.vue')
        },
        {
            path: "/",
            redirect: "/index"//重定向
        },
        {
            path: "/:pathMatch(.*)*",//匹配所有路由
            name: "NotFound",
            component: () => import('@/views/NoteFound.vue')
        }
    ]
})


//每次路由跳转之前触发
router.beforeEach((to, from, next) => {
    const store = useCategoryStore()
    if (to.path == '/login') {
        next()
    } else {
        if (!localStorage.getItem('token')) {//如果没有token，就跳转到登录页面
            next('/login')
        } else {
            if (!store.isGetterRoute) {//如果有token，就跳转到mainbox页面
                //需要登录后显示的路由
                routesConfig.forEach((item) => {
                    checkPermission(item) && router.addRoute('mainbox', item)
                })
                next({
                    //next()里面不写参数，就跳转到to.fullPath
                    path: to.fullPath
                })
                store.isGetterRoute = true
            } else {
                next()
            }
        }
    }
})

//检查权限
const checkPermission = (item) => {
    const store = useCategoryStore()
    if (item.requireAdmin) {
        return store.userData.role === 1
    } else {
        return true
    }
}

export default router
```

**config**

```js
//需要登录后显示的路由
const routes = [
  {
    path: "/index", //当访问/index时，会显示main和home组件的内容
    component: () => import('@/views/home/Home.vue')
  },
  {
    path:"/center",
    component: () => import('@/views/center/Center.vue')
  },
  {
    path:"/user-manage/adduser",
    component: () => import('@/views/user-manage/UserAdd.vue'),
    requireAdmin:true
  },
  {
    path:"/user-manage/userlist",
    component: () => import('@/views/user-manage/UserList.vue'),
    requireAdmin:true
  },
  {
    path:"/news-manage/newsadd",
    component: () => import('@/views/new-manage/NewAdd.vue')
  },
  {
    path:"/news-manage/newslist",
    component: () => import('@/views/new-manage/NewList.vue')
  }
]

export default routes
```

**配合的store配置（pinia）**

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCategoryStore = defineStore(
    'counter',
    () => {
        let isGetterRoute = ref(false)
        return {
            isGetterRoute,
        }
    }
```

在其中isGetterRoute 为登录状态管理 在登录成功后的vue文件下进行状态改变

```js
if (res.data.code == 1) {//登录成功
    //console.log(res.data.data);
    userData.userData = res.data.data
    userData.isGetterRoute = false
    router.push("/index")
}else{
    ElMessage.error('用户名或密码错误')
}
```

## 二级路由

二级路由path前不能加 / ，会被定义成一级路由

在一级路由里写：

```js
children:[{
    path:'',
    component:Home,
	},
    {
    path:'category',
    component:Category,
}]
```

### 二级路由出口问题

二级路由的路由出口也要写在一级路由的组件中

## router路由跳转

跳转到login，这是js的方法

```js
@click="$router.push('/login')"
```

也可以用router的方法

```js
import { useRouter } from 'vue-router'
const router = useRouter()
router.push("/index")
```

**注意：**在使用vue的路由跳转时，页面不会刷新

## 路由重定向

/要重定向到index，在路由中添加

```js
{
    path:"/",
    redirect:"/index"
}
```

## 404路由处理

```js
{
    path:"/:pathMatch(.*)*",//匹配所有路由
    name:"NotFound",
    component:()=>import('@/views/NoteFound.vue')
}
```

## 路由缓存问题

一级路由满足条件。组件实例**复用**，导致分类**无法更新**

解决思路：1.让组件实例不可复用，强制销毁重建 2.监听路由变化，变化后执行更新

## 路由守卫

在做后台管理系统时，经常会遇到有些页面只有管理员能访问，普通用户是不能访问的，这时候就要对路由进行限制

#### 动态路由

为了做权限区分，mainbox路由要动态添加，不能直接配置子路由

在router文件夹下index.js文件中

```js
router.addRoute("mainbox",{
    path:"/index",//当访问/index时，会显示main和home组件的内容
    component: ()=>import('@/views/home/Home.vue')
})
```

在多文件时，在router文件夹下创建config.js文件，把要添加的路由写到一个数组里

```js
const routes = [
  {
    path: "/index", //当访问/index时，会显示main和home组件的内容
    component: () => import('@/views/home/Home.vue')
  },
  {
    path:"/center",
    component: () => import('@/views/center/Center.vue')
  }
]

export default routes
```

在index.js中引入，并使用forEach循环填入

```js
routesConfig.forEach(item => {
  router.addRoute("mainbox",item)
})
```

#### 路由拦截/鉴权

**注意，非组件外使用pinia是危险的**

```js
import { createRouter, createWebHistory } from 'vue-router'
import { useCategoryStore } from '@/stores/counter'
import routesConfig from './config'
//const store = useCategoryStore() b
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/mainbox',
      name: 'mainbox',
      component: () => import('@/views/MainBox.vue')
    }
  ]
})

//每次路由跳转之前触发
router.beforeEach((to, from, next) => {
  const store = useCategoryStore()
  if (to.path == '/login') {
    next()
  } else {
    if (!localStorage.getItem('token')) {
      //如果没有token，就跳转到登录页面
      next('/login')
    } else {
      if (store.isGetterRoute) {
        //
        //如果有token，就跳转到mainbox页面
        routesConfig.forEach((item) => {
          router.addRoute('mainbox', item)
        })
        next({
          //next()里面不写参数，就跳转到to.fullPath
          path: to.fullPath
        })
        store.isGetterRoute = false
      } else {
        next()
      }
    }
  }
})

export default router
```

pinia文件

```js
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('counter', () => {
  let isGetterRoute = true

  return {
    isGetterRoute
  }
})
```

#### 路由守卫QA

Q1:  store.isGetterRoute 有什么用？

A1 :在router文件夹，只需要获取一次路由就行了，作为标记防止重复获取

Q1续：登录时需要修改store.isGetterRoute = true吗？

A1续：目前根据测试不需要（2024/3/12）

#### 路由守卫示例

没有那么复杂，自己写也挺好

```js
//每次路由跳转之前触发
router.beforeEach((to, from, next) => {
    const store = useCategoryStore()
    if (to.path == '/login') {
        next()
    } else {
        if (!localStorage.getItem('token')) {//如果没有token，就跳转到登录页面
            next('/login')
        } else {
            if (!store.isGetterRoute) {//如果有token，就跳转到mainbox页面
                routesConfig.forEach((item) => {
                    checkPermission(item) && router.addRoute('mainbox', item)
                })
                next({
                    //next()里面不写参数，就跳转到to.fullPath
                    path: to.fullPath
                })
                store.isGetterRoute = true
            } else {
                next()
            }
        }
    }
})

//检查权限
const checkPermission = (item) => {
    const store = useCategoryStore()
    if (item.requireAdmin) {
        return store.userData.role === 1
    } else {
        return true
    }
}
```

#### 权限管理/路由守卫

不能单独使用视图管理页面，视图看不见，但是路由可以进入

在需要管理的页面加上字段

eg

```js
{
    path:"/user-manage/adduser",
    component: () => import('@/views/user-manage/UserAdd.vue'),
    requireAdmin:true
}
```

在router/index中设置检查

```js
routesConfig.forEach((item) => {
    checkPermission(item) && router.addRoute('mainbox', item)
})
```

```js
const checkPermission = (item) => {
    const store = useCategoryStore()
    if (item.requireAdmin) {
        return store.userData.role === 1
    } else {
        return true
    }
}
```

然后在登录的时候切换路由状态

```js
if (res.data.code == 1) {//登录成功
    //console.log(res.data.data);
    userData.userData = res.data.data
    userData.isGetterRoute = false
    router.push("/index")
}else{
    ElMessage.error('用户名或密码错误')
}
```

## VUE前端JWT统一管理(token)

先上祖传代码，别忘了在main.js中引入

```js

```

**前端jwt**

```js
import axios from "axios";

// 请求之前拦截
axios.interceptors.request.use(function (config) {
    //请求前携带token
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ` + token;
    
    return config;
}, function (error) {

    return Promise.reject(error);
});

// 响应之后拦截
axios.interceptors.response.use(function (response) {

    //请求后设置token
    const { authorization } = response.headers;
    if (authorization) {
        localStorage.setItem("token", authorization);
    }
    return response;
}, function (error) {

    return Promise.reject(error);
});
```

## onBeforeRouteUpdate 路由钩子

```js
import { onBeforeRouteUpdate } from "vue-router
```

# Pinia状态管理

集中状态管理工具，**共享的数据**用Pinia管理会更方便

是vuex的替代品，Pinia 是 Vue 的存储库，它允许跨组件/页面共享状态（共享store）

**这玩意非常简单，不要想的太复杂**

**注意，非组件外使用pinia是危险的**

**注意，在pinia中使用的ref在外使用不需要.value**

安装（一般来说生成vue就装好了）

```
$ npm i pinia
```

创建实例传递给应用：

在mian文件中（非单一写法）

如果开始时装了pinia就不用设置了

main.js初始化 vue3/2 不同

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
//import router from './router'

const app = createApp(App)

app.use(createPinia())
//app.use(router)

app.mount('#app')
```

## pinia核心概念

### 定义store

在src目录下创建stores目录

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCounterStore = defineStore('counter', () => {
  
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

之后就可以通过**创建对象点出state中的方法和函数和数据**

注意：useCounterStore为导出的函数名，不是定义的仓库名

```vue
<script setup>
import { useCounterStore } from './stores/counter'
const counter = useCounterStore()  //counter是一个对象，包含count属性和increment方法
</script>

<template>
  <!-- 直接从 store 中访问 state -->
  <div>Current Count: {{ counter.count }}</div>
  <button @click="counter.increment">click me</button>
</template>
```

注意: pinia结构不具有响应式

有一个api

```js
import { storeToRefs } from 'pinia'
```

storeToRefs( )包裹上就成相应式的了

### watch监视pinia变化

需要多一个箭头

```js
watch(() => gameStore.enemyDraw, () => {
    console.log(123456);
})
```

## pinia持久化

官方文档：https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html

**只有相应式数据可以存储**

安装

```
npm i pinia-plugin-persistedstate
```

 **注意：需要安装和mian.js配置！**

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

//app.use(createPinia())

app.mount('#app')
```

全部持久化写法

```js
import { defineStore } from 'pinia'

export const useStore = defineStore(
  'main',
  () => {
    const someState = ref('你好 pinia')
    return { someState }
  },
  {
    persist: true,
  },
)
```

选择式存储

- 旧方法**（2025/1/12日测试失败）**

    ```js
    import { defineStore } from 'pinia'
    import { ref } from 'vue'
    export const useStore = defineStore(
      'main',
      () => {
        const someState = ref(1)
        return { someState }
      },
      {
        persist:{
            paths:['someState']
        }
      },
    )
    ```

- 新方法

    ```js
    import { defineStore } from 'pinia'
    
    defineStore('store', {
      state: () => ({
        toLocal: '',
        toSession: '',
        toNowhere: '',
      }),
      {
          persist: {
              pick: ['json', 'bgSet'],
          }
      }
    })
    ```

# VUEX

## 安装

```
npm i vuex
```

## Vuex定义

还是在stores文件夹下建立js文件

```js
import { createStore } from 'vuex'

export default createStore({
    state: {
        isCollapse: true,
    },
    mutations: {
        updateIsCollapse(state) {
            state.isCollapse = !state.isCollapse
        }
    },
})
```

然后去main.js文件中注册使用

```js
import store from './stores/index.js'
app.use(router).use(store)
```

## Vuex使用

使用$符点出里面的的方法

```js
@click="this.$store.commit('updateIsCollapse');"
```

也是使用$符点出里面的数据

```js
v-show="$store.state.isCollapse"
```

## vuex持久化

安装

```
npm i vuex-persistedstate
```

之后需要导入使用

## 安装

```
npm i vuex
```

## Vuex定义

还是在stores文件夹下建立js文件

```js
import { createStore } from 'vuex'

export default createStore({
    state: {
        isCollapse: true,
    },
    mutations: {
        updateIsCollapse(state) {
            state.isCollapse = !state.isCollapse
        }
    },
})
```

然后去main.js文件中注册使用

```js
import store from './stores/index.js'
app.use(router).use(store)
```

## Vuex使用

使用$符点出里面的的方法

```js
@click="this.$store.commit('updateIsCollapse');"
```

也是使用$符点出里面的数据

```js
v-show="$store.state.isCollapse"
```

## vuex持久化

安装

```
npm i vuex-persistedstate
```

之后需要导入使用

# 登录/表单校验

## 前端验证

这是element组件的验证

```js
//2.准备规则对象
const rules = {
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' },//trigger 触发条件
    { min: 3, max: 14, message: '长度在 3 到 14 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  //自定义校验规则
  agree: [
    { 
      validator: (rule:any, value:any, callback:any) => {
        console.log("点击勾选框了");
        if (value) {
          callback();//校验通过  不传参  不传错误信息  传参就是校验不通过  传参就是错误信息
        } else {
          callback(new Error('请同意隐私条款和服务条款'));
        }
      }
    }
  ]
}
```

然后你得获取对象做校验

```js
//3.获取form实例做统一校验
const formRef = ref(null)
const doLogin = ()=>{
  const {account,password} = form.value
  //调用实例方法
  //@ts-ignore  //忽略下一行报错，就是个注释
  formRef.value.validate(async(valid:any) => {
    if (valid) {
      //校验通过
      console.log("校验通过");
      const res =  await loginAPI({account,password})
      console.log(res);
       
    } else {
      //校验不通过
      console.log("校验不通过");
      return false
    }
  });
}
```

这个就已经可以判断登录是否成功了

```js
formRef.value.validate(async(valid:any) => {
    if (valid) {
      //校验通过
      console.log("校验通过");
      const res =  await loginAPI({account,password})
      console.log(res);
      //提示用户
      ElMessage({type:'success',message:'登录成功'})
      //跳转
      router.replace('/')
    } else {
      //校验不通过
      console.log("校验不通过");
      return false
    }
  });
```

错误信息也可用统一的axios拦截来做

在http.js文件夹下

```js
// axios响应拦截器
httpInstance.interceptors.response.use(
  res => {
    return res.data;
  },e => {
    ElMessage({
      type: 'error',
      message: e.response.data.msg
    })
    return Promise.reject(e)
  }
  //统一错误提示
);
```

## 登录数据存储

**登录的数据存储在piain目录下**

## 登录后模板切换

首先获取store中的数据

```js
import { useUserStore } from '@/stores/user';
const userStore:any = useUserStore();
```

使用v-if来切换模板

```html
<template v-if="userStore.uesrInfo.token">
```

```html
<template v-else>
```

模板内点出自己要的参数

```js
<li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.uesrInfo.account }}</a></li>
```

## Token

Token为用户标识，在很多个接口中都需要携带Token才能正确的获取数据，调用接口的时候要携带Token。另外为**统一控制**采取请求拦截器携带token的方案

Axios请求拦截器可以在接口正式发起之前对请求参数做一些事情，同常会被注入到请求header中，按格式照**后端的要求**进行拼接处理

在请求拦截器里设置（utils/http.ts）

## 退出登录

管理逻辑可以在piain中

```ts
//管理用户数据相关
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
export const useUserStore = defineStore(
  "user",
  () => {
    // 1.定义管理用户数据的state
    const uesrInfo = ref({});
    // 2.定义获取接口数据的action函数
    //@ts-ignore
    const getUserInfo = async ({ account, password}) => {
      const res: any = await loginAPI({ account, password });
      uesrInfo.value = res.result;
    };
    //退出登录，清除用户信息
    const clearUserInfo = () => {
      uesrInfo.value = {};
    };
    // 3.以对象的形式返回state和action return
    return {
      uesrInfo,
      getUserInfo,
      clearUserInfo
    };
  }
  ,{
    persist: true,//   持久化
  }
);
```

在组件中触发调用

```ts
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const userStore:any = useUserStore();
const router = useRouter();

const confirm = () => {
  userStore.clearUserInfo();
  router.push('/login');
}
```

## Token失效与401错误

Token是会失效的，使用失效的Token去请求接口就会出现401错误，发生后应该清除掉用户信息，重新登录

在utils/https.js文件夹下

```ts
// axios响应拦截器
httpInstance.interceptors.response.use(
   //统一错误提示
  (res) => {
    return res.data;
  },
  (e) => {
    const userStore: any = useUserStore();
    ElMessage({
      type: "error",
      message: e.response.data.msg,
    });
    //401token错误处理
    if (e.response.status === 401) {
      userStore.clearUserInfo();
      router.push("/login");
    }
    return Promise.reject(e);
  }
 
);
```

# element-plus

**前言：**他这玩意就是个ui，本身没有逻辑，并没有你想象的强大，有时会很丑，但是通过设置又能变好阿看，建议多看并且仔细阅读官方文档。本文是文档辅助，不是文档。经常会有稀奇古怪的padding，margin。F12调试用:deep解

[一个 Vue 3 UI 框架 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/#/zh-CN)

## 安装引入

安装

```shell
npm install element-plus
```

装插件（自动引入必装）

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

- **全部引入**

打包后会大一些，**不建议使用，建议使用自动**

在main.js中添加

```js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
```

- **自动引入**

安装完自动导入插件后

在vite.config.js文件夹中添加

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

之后不用导入就可以直接用了

## 配置elm主题颜色

在style文件夹下添加/element/index/scss(npm i sass)里面添加样式

vite.config.ts添加配置

```ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({ importStyle: "sass"}),
      ],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use"@/style/element/index.scss" as *;`
      }
    }
  }
})
```

## deep/修改elm组件的样式

用:deep包上就行了

**!!之后才可以对特点元素css进行修改，建议积极使用F12进行调试**

```css
:deep(#searchInput){
  background-color: rgba(255,255,255,0.2);
  color: rgb(240,240,240);
}
```

前面加上::v-deep也行

```css
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}
```

## Ele一些复杂组件

#### el_icon使用

这个需要单独装

```
$ npm install @element-plus/icons-vue
```

之后按需引入就ok了

```vue
<script setup>
import { Edit } from '@element-plus/icons-vue'
</script>

<template>
    <div class="l-content">
      <!-- 图标 -->
      <el-icon :size="size" :color="color">
        <Edit />
      </el-icon>
    </div>
    <div class="r-content"></div>
</template>
```

**注意**，Edit 为一个**对象**，不是一个字符串

#### elmessage弹出提示

##### 样式丢失

最新添加方案(2024/10/30)

```css
import 'element-plus/es/components/message/style/css'
```

自动引入会有可能格式错误，添加

```js
import { ElMessage } from 'element-plus';
//下面两种
import 'element-plus/theme-chalk/el-message-box.css'
//import "element-plus/theme-chalk/el-message.css";
```

其他系类也会有css丢失问题

```js
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
```

##### 单实例封装

本体有回调非常好写

```js
let messageInstance = null;

function showMessage(msg) {
    if (messageInstance) return; // 已有提示在显示，不再生成新的

    messageInstance = ElMessage({
        message: msg,
        type: 'info',
        onClose: () => {
            messageInstance = null; // 提示关闭后清空实例
        }
    });
}
```



#### el/Autocomplete自动补全输入框

必要参数

```js
:fetch-suggestions="querySearch"
```

在这段中querySearch是一个函数，函数为：

```js
const querySearch = (queryString, cb) => {
```

其中queryString为输入框里有的内容，cd为渲染在提示栏的内容

算法自己写

参考算法：

```js
const querySearch = (queryString, cb) => {
  let results
  if (queryString) {
    results = allList.filter((searchItem) => {
      return searchItem.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 //为true则包含该内容
    })
  } else {
    //没有输入
    results = allList
  } 
  cb(results)// 调用 callback 返回建议列表的数据
}
```

allList为要搜索的对象

**@select="handleSelect"**点击渲染出的列表触发的事件

举例

```js
const handleSelect = (item) => {
  window.open(item.link) //这是一个事件，要加@ 点击弹出框子按键触发
}
```

#### 在前缀添加图标

得写一个插槽，插槽在输入框模板里 插槽的#指向官方文档中的位置

```vue
<el-autocomplete
        class="input"
        placeholder="搜索"
        v-model="state"
        :fetch-suggestions="querySearch"
        @select="handleSelect"
        clearable
        :trigger-on-focus="false"
      >
        <template #prefix>
          <el-icon class="el-input__icon" @click="handleIconClick">
            <Search />
          </el-icon>
        </template>
      </el-autocomplete>
```

#### el-Form

1.准备表单对象

```
const form = ref({
  account: '',
  password: ''
})
```

使用

```
:model="form"
```

2.准备规则对象

```js
const rules = {
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' },//trigger 触发条件
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ]
}
```

使用

```
:rules="rules"
```

```vue
<el-form-item prop="account" label="账户">
                <el-input v-model="form.account"/>
              </el-form-item>
              <!-- 指定表单的校验字段名 -->
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password"/>
              </el-form-item>
```

自定义校验规则

在表单对象中添加

```
agree:true
```

然后就可以在规则里添加了

```
agree: [
    { 
      validator: (rule:any, value:any, callback:any) => {
        console.log("点击勾选框了");
        if (value) {
          callback();//校验通过  不传参  不传错误信息  传参就是校验不通过  传参就是错误信息
        } else {
          callback(new Error('请同意隐私条款和服务条款'));
        }
      }
    }
  ]
```

checkbox：

```
<el-form-item prop="agree" label-width="22px">
                <el-checkbox  size="large" v-model="form.agree"> 
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
```

#### el-dropdown

会有黑框，直接新建css

```css
.el-dropdown-link:focus {
    outline: none;
}
```

大小，在templat标签中

```
:size="30"
```

#### el-row

遵守24栅格

间隔

#### el-image

单张预览

```
<div class="demo-image__preview">
                        <el-image style="width: 192px; height: 108px" :src="srcList" :preview-src-list="[srcList]">
                        </el-image>
                    </div>
```

```
const srcList = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
```

主要是 []

层级问题不用调z-index

```
<el-image style="width: 192px; height: 108px" :src="srcList" :preview-src-list="[srcList]"
                        preview-teleported="true" />
```

## el表单校验

先做一个判断，排除低级错误，降低后端压力

对表单需要进行二次校验，第一次是输入格式的校验，第二次是空白校验，防止用户不输入直接点击登录

需要的内容

1.表单绑定的响应式对象

```js
const loginForm = reactive({ //表单绑定的响应式对象
    username: "",
    password: ""
})
```

2.表单的引用对象

```js
const loginFormRef = ref() 
```

3.表单校验规则

```js
const loginRules = { //表单的校验规则
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },//blur 失去焦点时触发
        { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
    ]
}
```

4.提交表单函数

```js
const submitForm = () => {
    //不点就不会触发失去焦点的事件，所以要手动触发一下
    //validate是el-form的方法，用来校验表单的
    loginFormRef.value.validate((valid) => {
        if (valid) {
            //console.log(loginForm)
            //localStorage.setItem('token', 'true')
            axios.post("http://127.0.0.1:3000/adminapi/user/login", {
                username: loginForm.username,
                password: loginForm.password
            }).then(res => {
                if (res.data.code == 1) {//登录成功
                    //console.log(res.data.data);
                    userData.userData = res.data.data
                    userData.isGetterRoute = false
                    router.push("/index")
                }else{
                    ElMessage.error('用户名或密码错误')
                }
            })
        } else {
            console.log("校验失败");
            return false;
        }
    });
};
```

5.表单实例

```js
<el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px"
            class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <!-- loginrules.username 是上面声明的-->
                <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" />
            </el-form-item>
            <el-form-item>
                <el-button v-blur type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
        </el-form>
```

### 选择器表单校验

改成change

```
role: [
	{ required: true, message: "请选择职位", trigger: "change"}
],
```

# canvans

canvas是在onMounted生命周期的后执行的

1.声明空的canvans对象获取DOM

```js
const canvas = ref()
let context = null
```

```js
<canvas ref="canvas" class="canvas1"></canvas>
```

2.建立init函数

```js
const initCanvas = ()=>{
    canvas1.value.width = 720;
    canvas1.value.height = 720;
    context = canvas1.value.getContext("2d");
}
```

3.在onMounted时初始化

```js
onMounted(() => {
    initCanvas();
})
```

别的在哪写都行

也可以建立ref标签配合watch使用（不建议！）

```js
const canvas1 = ref(null)

watch(canvas1, () => {
    canvas1.value.width = 720;
    canvas1.value.height = 720;
    let context = canvas1.value.getContext("2d");
    //720 * 720
    //30*30为一个格子  24*24个格子 
    for (let i = 1; i < 24; i++) {
        context.moveTo(30, 30 * i);
        context.lineTo(690, 30 * i);
        context.moveTo(30 * i, 30);
        context.lineTo(30 * i, 690);
        context.stroke()
    }
});
```

# 定时器相关

js知识，但是在**vue的生命周期记得关定时器**

记得关定时器与移除事件

```js
onUnmounted(() => {
    clearInterval(timer);
    winOrLostBox1.value.removeEventListener("mousedown", handleMouseDown);
    winOrLostBox1.value.removeEventListener("mouseup", handleMouseUp);
    winOrLostBox1.value.removeEventListener("mousemove", handleMouseMove);
})
```

##  setTimeout延时函数(防抖)/延时器

clearTimeout函数（库函数）

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// 2秒后执行greet函数，并传递参数"John"
let timeoutId = setTimeout(greet, 2000, "John");
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

##  setInterval计时器/定时器

延时器在上面

```js
timer = setInterval(function() {

}, 300); //每300毫秒执行一次
```

```js
clearInterval(timer);  //清理定时器
```

# 打包

## 静态文本处理

之前在静态资源引入的时候，使用.json文件作为数据，但是在`npm run build`之后，json的数据同时被打包到资源中去了，文件**不会再随着json文件更改**了，在dist文件中即使删除了json文件也不会有任何影响

## 修改打包后的根路径(jia)

在vite.donfig.js中添加

```js
base: './'
```

## 前端的路由模式/baseurl

前端路由不会向后端发送网络请求，纯前端，只监听浏览器变化

### Hash

以锚点#为标识，**锚点后的内容不会发送给服务器**，

例如，一个基于 hash 的路由可能看起来像这样：`http://example.com/#/page`

### History

在 history 模式下，路由信息以普通 URL 的形式出现，会被完整的发送给服务器，不再依赖于哈希。

这样的 URL 在美观性和可读性方面更胜一筹，但需要服务器配置以确保在刷新页面或直接访问 URL 时，服务器正确处理这些路由。

如果使用 page 服务

建议使用base:调整根路径（在vite.config.js文件夹中）如你的url根下含有/chart-online（vue2中叫baseUrl）

```
base: '/chart-online'
```

完整版样例

```js
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/chart-online'
})
```

## 路由记忆存储

当文件映射过去的

需要配置后端来解决（Nginx），vue-router文档中有说明

这里提供一个express的案例，更多在官网中查询

把打包好的文件放在pubilc文件夹中

#### nginx解决

```js
location / {
  try_files $uri $uri/ /index.html;
}
```

#### node.js解决方案

**安装：**

```
npm install --save connect-history-api-fallback
```

**使用：**

```js
var express = require('express');
var history = require('connect-history-api-fallback');
var app = express()

app.use(history())
app.use(express.static('public'))

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})  
```

# eslint

## eslint关闭对index/mian的命名检测

在根目录下的.eslintrc.cjs中

```json
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
}
```

## eslint驼峰文件名报错

一般是没用驼峰导致的，加个注释就好了

```
<!-- eslint-disable vue/multi-word-component-names -->
```

也可以在.eslintrc.cjs文件下添加配置

```js
,rules: {
    'vue/multi-word-component-names': 'off'
}
```

新版eslint直接在js中添加对象即可

## eslint找不到对象

谨慎使用，要仔细确认，很有可能是你自己写错了

加个注释，表示他是全局对象

```
/* global OrbitControls */
```

## ESLint Delete `␍`

linux和windows换行的问题

CRLF换成LF即可

## 没有根组件报错

去设置找eslint **Template**打勾

## 页面如果不能使用index命名在cjs里添加

```js
rules:{
    'vue/multi-word-component-names': 0,
  }
```

# 杂项

## 静态资源处理

#### assets静态资源处理

pubilc文件夹下通过/就能找到静态文件

assets（src下）把静态资源当成模块来对待

使用举例

```vue
import img1 from '@/assets/1.jpg'
<div :style="{ backgroundImage: `url(${img1})` }"></div>
<img :src="img1">
```

也可以直接在src使用路由

## scss自动导入

在项目里一些组件共享的色值会以scss变量的方式统一放到一个名为 var.sCss 的文件中，正常组件中使用，需要先导入SCSS文件，再使用内部的变量，比较繁琐，自动导入可以免去手动导入的步骤，直接使用内部的变量

no @import '.scss'

在styles文件夹下新建var.scss 内部存放要用的变量

在vite.config.ts中添加配置

```json
css: {
    preprocessorOptions: {
      scss: {
        // 自动导入scss文件
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    }
}
```

之后就能直接用了

```css
<style scoped lang="scss">
.test{
  color: $priceColor;
}
</style>
```

## pinia定义方法补充

vue2的写法

```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {  //定义store
    state: () => {   //数据
        return { count: 6 }
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {      //方法methods 同步异步都可以做
        increment() {
            this.count++
        },
    },
    getters: {      //计算属性computed修饰一些值
        doubleCount() {
            return this.count * 2
        },
    },
})
```

## @路径简写

**在最新的vue版本中已经自带了**

代表src下，需要配置

实际的在vite.config.json里了  

在根目录下添加jsconfig.json

```json
{
    "compilerOptions": {
      "baseUrl": "./",
      "paths": {
        "@/*": [
          "src/*"
        ]
      }
    }
}
```

# 补充说明与问题

## Proxy代理对象

为js本体功能

**Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

这个代理对象会在访问或修改原始数据时拦截操作，以便进行响应式跟踪和更新。
