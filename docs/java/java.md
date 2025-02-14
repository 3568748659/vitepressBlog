本文只有java的基础教程，javaAPi单独独立了一个文档，并且不包括java安装，也不包括 javaGUI，maven，spring 相关 更多见java高级，部分内容移动到java其他了，高级注释在java其他中

java完全面向对象，所有的方法都是对象中的方法。在继承中不断变化

# 常见问题

## ==与equals

- ==比较的是基本数据类型的值和引用类型的地址，即使两个对象的属性完全一样，也不能算是相等
- equals比较object中的方法，注意：equals不能比较基本数据类型

## hashCode

确定对象在哈希表中的索引位置，提升equals方法效率

# 基本概念

## JDK/JRE/JVM/javac/jdb

JDK：全程java Develop Kit，java开发工具包，中有java虚拟机（JVM），核心类库和开发工具

在JDK中有

- JVM： java虚拟机，真正运行java程序的地方
- javac：编译工具
- jdb：调试工具
- jhat：内存分析工具... 

JRE：java的运行环境，只需要运行，不需要编写的环境，在JRE中，包含JDK

## java跨平台原理

java是混合型语言，即编译和解释型，同时存在，运行在java虚拟机中，虚拟机为java语言本身自带的，在对应的操作系统中有对应的JVM虚拟机

## linux安装

windows中使用集成开发环境

linux安装非常方便

```
sudo apt install openjdk-17-jdk
```

# 打包相关

通过maven生命周期，在idea中进行打包

1. 设置--项目结构--设置主键和打包类型
2. 构建--构建工件
3. 指定版本运行

## 运行jar包

- 直接运行

```
java -jar .\upload.jar
```

- 通过命令指定端口（高优先级）

```
java -jar upload.jar --server.port=8081
```

- 指定非环境变量版本

```
C:\Users\35687\.jdks\corretto-17.0.11\bin\java.exe -jar .\javatest2.jar
```

# HelloWorld

**在java中，类名必须跟文件名相同！！**

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello JAVA");
    }
}
```

运行

```
java .\HelloWorld.java
```

在上诉中

```
public    static  void     main (String[]  args)
访问修饰符  关键字  返回类型   方法名 String类  字符串数组
```

# 开发规范与相关概念

编写 Java 程序时，应注意以下几点：

- **类名**：对于所有的类来说，类名的首字母应该**大写**。如果类名由若干单词组成，那么每个单词的首字母应该大写，例如 **MyFirstJavaClass** 。
- **方法名**：所有的方法名都应该以小写字母开头。如果方法名含有若干单词，则后面的每个单词首字母大写。
- **源文件名**：源文件名必须和类名相同。当保存文件的时候，你应该使用类名作为文件名保存（切记 Java 是大小写敏感的），文件名的后缀为 **.java**。（如果文件名和类名不相同则会导致编译错误）。
- **主方法入口**：所有的 Java 程序由 **public static void main(String[] args)** 方法开始执行。

## 模块化

在java中，一个文件夹就是一个软件包，代码都是在包下的

在代码的开头有包声明，作用仅为声明作用域

```java
package cc.lyh.packge; //声明在哪个包下的（文件夹）
```

## 全类名

就是包名加类名，如Start类

```
cc.liyinghao.Start
```

# 关键字

## 访问控制

- private 私有的
- protected 受保护的
- public 公共的
- default 默认  在同一包内可见

## 类方法和变量修饰符

- abstract 声明抽象
- class 类
- extends 扩充、继承
- final 最终值、不可改变的  === const
- implements 实现（接口）
- interface 接口
- native 本地、原生方法（非 Java 实现）
- new 创建
- static 静态
- strictfp 严格浮点、精准浮点
- synchronized 线程、同步
- transient 短暂
- volatile 易失

## 程序控制语句

- break 跳出循环
- case 定义一个值以供 switch 选择
- continue 继续
- do 运行 
- instanceof 实例
- switch 根据值选择执行

**break**

给循环起名字之后指定跳出

```
loop: while (true) {
break loop;
```

## try/catch

- assert 断言表达式是否为真
- catch 捕捉异常
- finally 有没有异常都执行
- throw 抛出一个异常对象
- throws 声明一个异常可能被抛出
- try 捕获异常

## 包相关

- import  引入
- package 包

# 数据类型

| 数据名  | 大小                                                         |
| ------- | ------------------------------------------------------------ |
| byte    | 最大值127（2^7-1），最小值-128，默认0，占空间大小为int 1/4   |
| short   | 整数，最大值32768**（2^15 - 1）**，最小值-32768，默认0，占空间大小为int 1/2 |
| int     | 整数，最大值2,147,483,648**（2^31 - 1）**，最小值-2,147,483,648，默认0 |
| long    | 整数，最大值9,223,372,036,854,775,808**（-2^63 -1）**，最小值-9,223,372,036,854,775,808，默认0L |
| float   | 单精度浮点型，32位，默认值是 **0.0f**，**不能表示精确值**    |
| double  | 双精度浮点型，64位，默认值是 **0.0d**，**不能表示精确值**    |
| boolean | === bool                                                     |
| char    | 单单位字符，最小值是 **\u0000**（十进制等效值为 0），最大值是 **\uffff**（即为 65535） |

## 封装类

为对象，需要new，但即使是对象，通过自动装箱和拆箱，也能相互赋值

```java
int a = 10;//自动装箱
Integer b = a;//自动拆箱
```

- 在传递类型的有时需要传递对象，如 ArrayList  HashMap 这种集合
- 默认值不同 封装类空为null
- 封装了一些方法和属性

| 原名    | 封装类    |
| ------- | --------- |
| byte    | Byte      |
| int     | Integer   |
| short   | Short     |
| long    | Long      |
| float   | Float     |
| double  | Double    |
| char    | Character |
| boolean | Boolean   |

## 转意符

| \n     | 换行 (0x0a)              |
| ------ | ------------------------ |
| \r     | 回车 (0x0d)              |
| \f     | 换页符(0x0c)             |
| \b     | 退格 (0x08)              |
| \0     | 空字符 (0x0)             |
| \s     | 空格 (0x20)              |
| \t     | 制表符                   |
| \"     | 双引号                   |
| \'     | 单引号                   |
| \\     | 反斜杠                   |
| \ddd   | 八进制字符 (ddd)         |
| \uxxxx | 16进制Unicode字符 (xxxx) |

# 增强for

跟c++一样，同样配有continue和break     支持for ：

```java
int [] numbers = {10, 20, 30, 40, 50};

for(int x : numbers ){
    System.out.print( x );
    System.out.print(",");
}
System.out.print("\n");
String [] names ={"James", "Larry", "Tom", "Lacy"};
for( String name : names ) {
    System.out.print( name );
    System.out.print(",");
}
```

# try/catch

在try模块中添加可能出现问题的代码，如果try中出现问题，不会报错，不会阻塞程序运行

## assert断言

- 如果boolean表达式]为true，则程序继续执行。
- 如果为false，则程序抛出AssertionError，并终止执行。
- 可以输出到日志

# 面向对象

面向对象三大特征：**封装，继承，多态**

在java中，全部的代码都是以项目存在的，在所有的类中，一般有一个Main类，为代码入口

再次强调，java中类名首字母大写，每个文件中只能有一个类，同一个仓库下使用类无需引入

- new一个对象

```java
Student xiaoming = new Student();
```

## static/静态

static表示静态，是Java中的一个修饰符，可以修饰成员方法，成员变量

- 被static修饰的成员变量，叫做静态变量
    - **被该类所有对象共享**（创建多个对象，但是内部的static变量是同一个）
    - **不属于对象，属于类**
    - **随着类的加载而加载，优先于对象存在**
- 被static修饰的成员方法，叫做静态方法
    - 多用在测试类和工具类中
    - Javabean类中很少会用
    - 使用类名可以直接调用

#### 静态变量

全局”或者“静态”的意思，它不依赖类特定的实例（不属于对象的东西），被**类**的所有实例共享（只赋值一次就让全部的类的实例共享）

#### 静态方法

在测试类和工具类中创建的列的修饰符

#### 静态代码块

在类中直接使用static会在类初始化时调用，这在一些工具类中会非常有用

```java
static{
		//执行的代码
}
```

#### static注意事项

- 静态方法**只能**访问静态变量或者静态方法（没有this）
- 非静态方法可以访问静态变量或者静态方法，也可以访问非静态成员变量和非静态的成员方法
- 静态方法中**没有this**关键字

没有this补充：this表示本类对象（类似于指针，指向类自己），static表示共有的，不是某个对象所特有的，所以不包含this

**额外补充**

在内存中，静态变量是随着类的加载而加载的，而非静态变量跟对象有关

jvm也是一个相对完整的虚拟机，也是有 栈内存 堆内存（静态区） 方法区的

静态方法不能访问非静态

## 工具测试类/javabean

- Javabean类  用来描述一类事物的类。比如，Student，Teacher，Dog，Cat等
- 测试类  用来检查其他类是否书写正确，:带有main方法的类，是程序的入口
- 工具类  不是用来描述一类事物的，而是帮我们做一些事情的类

在其中**工具类**的区别最大，在工具类中，是用来提供方法的，不需要创建类的实例（创建对象），对类来说，使用**static**进行修饰

## 封装

**对象代表什么，就得看封装对应的数据，并提供数据对应的行为**

案例，实现一个标准的javabean

- People类

```java
package class1;

public class People {
    private String name;
    private int age;

    public void eat() {
        System.out.println("I am eating");
    }

    public void sleep() {
        System.out.println("I am sleeping");
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return this.age;
    }
}
```

- Main类创建并调用people的方法

```java
package class1;

public class Main {
    public static void main(String[] args) {
        People people = new People();
        people.eat();
        people.setAge(20);
        people.setName("John");
        System.out.println("Name: " + people.getName());
        System.out.println("Age: " + people.getAge());
    }
}
```

#### 封装权限

- private  私有 在同一个类中可以使用
- protected 保护 在不同包下的无关类中不能使用
- public 共有 在全部地方都能使用

## extends/继承

子类继承父类中的属性和行为。子类对象具有与父类相同的属性和行为，子类可以直接访问父类中的**非私有**属性

```
pubil class Student extends People {}
```

如有一个Student类继承自People，那么Student类中可以使用People类中的函数和属性

Student

```java
public class Student extends People{
    private String studentId;

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentId() {
        return studentId;
    }
}
```

People

```java
public class People {
    private String name;
    private int age;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

## this/super

- this表示本类对象（类似于指针，指向类自己）

一个经典案例

```java
private String school;

public void setSchool(String school) {
    this.school = school;//school = school 加this指向自己
}
```

- super表示父类对象

## 构造函数

常见的初始化类的函数，目的是初始化对象中的类的属性

分为无参构造和有参构造

一个构造实例

```java
public class student {
    private string name;
    public student(){} //空参构造
    public student(string name){ //有参构造 
        this.name = name
    }
}
```

在构造函数中必有

- 够着函数名和类名必须相同

**调用构造函数**

直接new一个就行了

```
new LoginJFrame();//空参构造
```

## 重写和重载

`方法重写`：子类中出现与父类一摸一样的方法时（**返回类型，方法名都相同**），会出现覆盖效果

目的是 在父类方法的基础上添加更多的功能

`方法重载`：方法名相同，方法参数类型或者个数不相同（返回值不考虑）

跟重写特别想，就是添加了更多参数

#### @Override/重写注解

放在重写后的方法上，作为重写的校验注解，错误会出现提示

## 子类的构造过程

子类继承父类后构造器的特点:

- 子类中所有的构造器默认都会先访问父类中无参的构造器，再执行自己

为什么?

- 子类在初始化的时候，有可能会使用到父类中的数据，如果父类没有完成初始化，子类将无法使用父类的数据。子类初始化之前，一定要调用父类构造器先完成父类数据空间的初始化。

怎么调用父类构造器的?

- 子类构造器的第一行语句默认都是:super()，不写也存在

## abstract/抽象类和抽象方法

是实现多态的基础，主要是抽象方法

**抽象方法所在的类叫抽象类**

在继承类的时候很有可能其中有函数用法不同，在继承时需要重写方法，抽象类在父类中不具体写实际的方法代码，强制要求子类继承抽象类重写其中的方法，否则直接报错

**语法格式**

- 抽象方法的定义格式

```java
public abstract 返回值类型 方法名（参数）; 
```

- 抽象类的定义格式

```java
public abstract class 类名{}
```

注意事项

1. 抽象类不能创建对象，只能当父类让别的类继承，然后创建对象
2. 在抽象类父类和子类中**都是抽象类**
3. 一个类中如果定义了抽象方法，这个**类必须声明成抽象类**，否则报错。
4. 抽象类**无法实例化，只能new具体的子类**，但是抽象类都可以具有成员**变量、方法、构造器**
5. **抽象类中不一定有抽象方法，有抽象方法的类一定是抽象类。**
6. 类继承了抽象父类，**则必须重写完抽象类的全部抽象方法，否则这个子类也必须定义成抽象类。**

## interface/接口

抽象类的拓展，抽象类中的继承子类必须重写完抽象类的全部抽象方法，但是有写方法是不需要的，****

在idea中，接口的图标为一个绿色的 i

**抽象类中的可选功能就可以单独定义成一个接口**

**接口是抽象类的一个功能**

**注意：接口不是抽象类，接口就是一种规则，是对行为的抽象，而且不要有命名冲突**

定义接口

```
Pubilc interface 接口名 {}
```

- jdk8之前的只能是抽象方法和常量

- 接口不能实例化

- 接口的成员都是pubilc修饰的

- 接口的子类(实现类)
    要么重写接口中的所有抽象方法
    要么是抽象类

- 接口和类的实现关系，通过implements关键字表示，可以单实现，也可以多实现。

    ```java
    public class 类名 implements 接口名1，接口名2 {}
    ```

- 实现类还可以在继承一个类的同时实现多个接口。

    ```java
    public class 类名 extends 父类 implements 接口名1，接口名2 {}
    ```

- 一个类的实现接口，必须重写所有接口的全部抽象方法（不然会报错），否则这个类需要定义成抽象类

**接口中成员的特点**

- **成员变量**
    只能是常量
    默认修饰符：public static final
- 构造方法
    没有，创建不了对象，只能给类提供继承

#### implements/接口实现

声名一个类，做接口实现

- EmployeeService是接口
- EmployeeServiceImpl 是接口实现类

```java
public class EmployeeServiceImpl implements EmployeeService {

}
```

实现接口的实现需要满足下面几点

- **相同的函数名**：实现接口的方法必须与接口中声明的方法具有相同的函数名。

- **相同的参数列表**：方法的参数列表（包括参数的类型和顺序）必须与接口中声明的方法一致。

- **相同的返回类型**：方法的返回类型必须与接口中声明的方法一致。

- **相同的修饰符**：方法的可见性修饰符必须与接口中声明的方法一致或更宽松（如从 `protected` 变为 `public`）。

## 多态

对象有多种形态，从而调用不同的行为

1. 方法调用：编译看左边，运行看右边。

    编译时，只访问父类的方法，访问不到子类独有的方法，而运行时，调用子类的重写的方法

2. 变量调用：编译看左边，运行也看左边

​		编译时，只能访问父类的变量，运行后也只能访问父类的变量

常见形式：

```
父类类型 对象名称 = new 子类的构造器
```

```
Pet pet1 = new Cat();
pet.eat();
Pet pet2 = new Dog();
pet2.eat();//都是eat 但是是完全不相同的
```

**多态案例：**

- 目录结构
    - Cat
    - Dog
    - Main
    - Pet

- Pet类

```java
package org.example;

public abstract class Pet {
    public abstract void eat();
}
```

- Dog类

```java
package org.example;

public class Dog extends Pet{
    @Override
    public void eat() {
        System.out.println("狗吃骨头！");
    }
    public void watchHouse() {
        System.out.println("狗看家！");
    }
}
```

- Cat类

```java
package org.example;

public class Cat extends Pet {
    @Override
    public void eat() {
        System.out.println("猫吃鱼！");
    }
    public void catchMouse() {
        System.out.println("猫抓老鼠！");
    }
}
```

- Main类

```java
package org.example;
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        Pet pet1 = new Dog();
        Pet pet2 = new Cat();
        pet1.eat();
        pet2.eat();
//        pet1.watchHouse();
//        pet2.catchMouse();
    }
}
```

打印结果

```
狗吃骨头！
猫吃鱼！
```

#### 多态向上/下转型

- **向上转型**（自动类型转换，默认）：安全转换

```
父类类型 对象名称 = new 子类构造器
```

缺点：不能访问子类独有的方法和变量

- **向下转型**（强制类型转化）：非安全转换

能访问子类独有的方法和变量

类型必须相同，可以使用`instanceof`判断当前对象的真实类型，再进行强制转换

```
变量名 instanceof 真实类型
if（变量名 instanceof 真实类型）{
	//执行的函数
}
```

## 内部类

在一个类中再定义一个类

```java
public class Outer{
	public class inner{
	
	}
}
```

**内部类的访问特点：**

- 内部类可以直接访问外部类的成员，包括私有
- 外部类要访问内部类的成员，必须创建对象

**内部类的使用方面：**

- B表示事物是A类的一部分，且B的单独存在没有意义

**内部类的分类：**

- 成员内部类（不常用）
- 静态内部类（不常用）
- 局部内部类（不常用）
- 匿名内部类（常用）

#### 成员类

- 写在成员位置的，属于外部类的成员
- 可以被修饰符修饰，如provate，默认（只能在本包中用），protected，pubilc，static（静态内部类）等

#### 匿名内部类

匿名类本质上就是隐藏了名字的内部类

```java
new 类名或接口名(){
	重写方法；
}

new inter(){
	/*真正的没有名字的类
	pubilc void show
	*/ 
}
```

# 集合

## Map(s)映射

Map：字典，用于存储键值对，常见的有`HashMap `和`TreeMap`

```java
Map<String, Integer> hashMap = new HashMap<>();
Map<String, Integer> treeMap = new TreeMap<>();
```

**HashMap:**

- **特点：** 基于哈希表实现的键值对存储结构。
- **优点：** 高效的查找、插入和删除操作。
- **缺点：** 无序，不保证顺序。

**TreeMap:**

- **特点：** 基于红黑树实现的有序键值对存储结构。
- **优点：** 有序，支持按照键的顺序遍历。
- **缺点：** 插入和删除相对较慢。

## Vector向量

**警告：在任何情况下都避免使用Vector**

1. 因为vector是线程安全的，所以效率低，这容易理解，类似StringBuffer，同时只能在尾部进行插入和删除操作，更加造成效率低；
2. Vector空间满了之后，扩容是一倍，而ArrayList仅仅是一半；
3. Vector分配内存的时候需要连续的存储空间，如果数据太多，容易分配内存失败；

动态数组，和ArrayList是很相似的，但两者是不同的

- Vector 是同步访问的。
- Vector 包含了许多传统的方法，这些方法不属于集合框架

```java
// 创建一个Vector
Vector<String> vec = new Vector<String>();

// 添加元素
vec.add("Element 1");
vec.add("Element 2");
vec.add("Element 3");

// 输出Vector的元素
for(int i=0; i<vec.size(); i++){
    System.out.println(vec.get(i));
}

// 删除元素
vec.remove(1);

// 再次输出Vector的元素
System.out.println("After removal:");
for(int i=0; i<vec.size(); i++){
    System.out.println(vec.get(i));
}
```

## 单列与双列集合

- 单列集合(Collection)：一次添加一个数据
- 双列集合(Map)：一次添加一对集合（键值对）

#### Collection对象(集合)

单例集合的父类，无法单独使用

成员结构如下，包含关系

- Collection
    - List
        - ArrayList：动态数组，类型不能是基本类型（对象），如 int 转为 Integer，中间插入慢，高效随机访问和快速尾部插入
        - LinkedList：双向链表，通过指针连接，高效插入和删除，迭代器性能好，随机访问较慢
        - Vector（弃用）：由于向量（vector）不是线程安全的并且效率较低，因此建议使用ArrayList代替Vector。
    - Set
        - HashSet：无序集合，基于HashMap实现，高效的查找和插入操作
            - LinkedHashSet
        - TreeSet：TreeSet 是有序集合，底层基于红黑树实现，不允许重复元素。提供自动排序功能，适用于需要按顺序存储元素的场景。性能相对较差，不允许插入 null 元素。

##### List接口(有序集合)

有以下特性

- 有序：存放和取的顺序是一样的
- 可重复：可以重复的
- 有索引：可以通过索引获取内容

##### Set接口(无序集合)

有以下特性

- 无序：存放和取的顺序是不一样的
- 不可重复：不可以重复的，**可以进行数据的去重**
- 无索引：不可以通过索引获取内容

#### CollectionAPI

Collection是一个接口，不能直接创建对象，为全部Collection的祖宗

| 方法名称                            | 说明                             |
| ----------------------------------- | -------------------------------- |
| public boolean add(E e)             | 把给定的对象添加到当前集合中     |
| public void clear()                 | 清空集合中所有的元素             |
| public boolean remove(Ee)           | 把给定的对象在当前集合中删除     |
| public boolean contains(object obj) | 判断当前集合中是否包含给定的对象 |
| public boolean isEmpty()            | 判断当前集合是否为空             |
| public int size()                   | 返回集合中元素的个数/集合的长度  |

**警告**：如果集合中存储的是自定义对象，也想通过contains方法来判断是否包含，那么在javabean类中，一定要重写equals方法，如果存的自定义对象，依赖地址指进行判断，使用快捷键ALT+ins重写方法，直接重写就可以。idea会自动重写好

#### 集合遍历

通用的遍历方式，不依靠索引

- 迭代器遍历
- 增强for遍历
- Lambda表达式遍历

##### Iterator迭代器

新建迭代器

```java
Iterator<E>iterator()//返回迭代器对象，默认指向当前集合的0索引
```

常用方法

```java
boolean hasNext()//判断当前位置是否有元素，有元素返回true,没有元素返回false
E next()//获取当前位置的元素,并将迭代器对象移向下一个位置。
```

迭代器循环案例

```java
Iterator<String> it = list.iterator();
while(it.hasNext()){
    String str = it.next();
    String str = it.next();
}
```

# 泛型

**泛型**：JDK5中引入的特性，可以在编译阶段约束操作的数据类型，并进行检查，限制集合类型，**统一集合中数据的类型，在编写类的时候不指定类型，在创建对象时指定类型**

**泛型的格式**：<数据类型>

**注意**：泛型只能支持引用数据类型(integer)，不能写基本的数据类型

```java
ArrayList<Integer> list =new ArrayList<>();
```

如果没有限制类型直接使用 ArrayList List 类型就是Object（**默认类型**），全部类型，但是有致命缺陷，在遍历时不能使用子类功能，且无法强转

**多态的弊端是不能访问子类的特有功能**

**拓展：**java中的泛型是伪泛型，只在编译阶段生效，在使用时还是强转成指定的类型，专有名词叫**泛型的擦除**，原因是历史原因，不想改底层代码

## 泛型类

当一个类的时候，某个变量的数据类型不确定时，就可以使用泛型

- 泛型类

```java
public class ArrayList<E> {
	声明时不确定类型，创建对象时指定类型 字母T E K V 随便写
}
```

## 泛型方法

在一个类中，只有一个，方法中的类型不确定，可以使用泛型方法，可以在本方法中使用

```java
public class MyArrayList {
	public <E> boolen add(E e){
		//方法参数是泛型
	}
}
```

## 泛型接口

有两种使用方法

1. 在类实现接口时直接指定

    ```java
    public class MyarrayList implements List<string>{ 
    
    }
    ```

2. 在创建对象时指定，**泛型延续**

    ```java
    public class MyarrayList implements List<T>{ 
    
    }
    MyarrayList myarrayList = new MyarrayList();
    ```

# 内置对象

## Object

java中的顶级父类，所有的类都直接或间接继承Object类

Object类中的方法可以被所有的子类访问，也就是所有类

#### 构造与成员方法

在Object中只有无参构造

Object的成员方法

| 方法名                            | 说明                     |
| --------------------------------- | ------------------------ |
| public string toString()          | 返回对象的字符串表示形式 |
| public boolean equals(object obj) | 比较两个对象是否相等     |
| protected object clone(int a)     | 对象克隆                 |

#### toString重写

一般来说，会重写类中的toString方法，常用lombok，ptg插件

- 直接使用toString

```java
Count count = new Count();
String str1 = count.toString();
System.out.println(str1);
```

打印结果

```
cc.liyinghao.Count@10f87f48
```

为包名类名 @分隔符 加处理过的地址值，这对开发者意义不大需要重写为字符串拼接

```java
@Override
public String toString() {
    return "Count{x = " + x + "}";
}
```

#### equals重写

Object中的对象对比方法，默认使用时会对比地址值，内容相同但地址不同也会返回falsh，一般需要重写，重写后就是内部属性值了

**快捷键 Alt+Ins**

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;//如果地址相同就直接返回
    if (o == null || getClass() != o.getClass()) return false;
    Count count = (Count) o;
    return x == count.x;
}

@Override
public int hashCode() {
    return Objects.hashCode(x);
}
```

#### clone()重写

对象克隆，也叫对象拷贝，对象复制

在java中clone是受保护的方法，需要**重写**，使用Alt+Ins快捷键可以重写

```java
@Override
protected Object clone() throws CloneNotSupportedException {
    return super.clone();
}
```

之后还需要标记克隆类

```java
public class Count  implements Cloneable 
```

在调用时还需要抛错

#### 深浅拷贝

- 浅拷贝

    默认的克隆的是相同的地址，指向同一块内存，当有一方改变时，另一个也会改变

- 深拷贝

    推荐使用第三方库进行拷贝，自己写在遇到多维数组时比较困难

#### Objects工具类

Objects是一个工具类，提供一些方法去实现功能

如过对象的值为null 代表什么都没有，也没有方法，无法调用

Objects会判断对象是否为空，之后进行判断，就不会产生空指针异常了

| 方法名                                          | 说明                                     |
| ----------------------------------------------- | ---------------------------------------- |
| public static boolean equals(object a,object b) | 先做非空判断，之后比较两个对象           |
| public static boolean isNull(object obj)        | 判断对象是否为nu11，为null返回true，反之 |
| public static boolean nonNull(object obj)       | 判断对象是否为nu11，跟isNu11的结果相反   |

示例：

```java
Count count = new Count(1);
Count count1 = null;
boolean result = Objects.equals(count, count1);
System.out.println(result);
```

## Biglnteger

java有四种类型，byte，short，int，long 分别为 1 2 4 8 个字节 存储范围都有线

Biglnteger表示整数类型，非常非常大，可以近似看成无限的

**Biglnteger对象一旦创建，不能修改记录的值，每一次都会新建一个新的Biglnteger对象**

| 方法名                                     | 说明                                                       |
| ------------------------------------------ | ---------------------------------------------------------- |
| public BigInteger(int num public Random r) | 获取随机大整数，范围：[ 0~2的num次方-1 ] 包含0~2 num次方-1 |
| public BigInteger(string val)              | 获取指定的大整数，传入的必须为字符，且必须为数字           |
| public BigInteger(string val,int radix)    | 获取指定进制的大整数                                       |

还有常用方法 

- 静态方法获取BigInteger的对象，有内部优化，对-16~16这个范围的数字有优化

    ```java
    public static BigInteger valueOf(Long val)
    ```

    警告：这个方法只能获取Long范围之内的，大了会报错

#### Biglnteger方法

| 方法名                                                 | 说明                                  |
| ------------------------------------------------------ | ------------------------------------- |
| public BigInteger add(BigInteger val)                  | 加法                                  |
| public BigInteger subtract(BigInteger val)             | 减法                                  |
| public BigInteger multiply(BigInteger val)             | 乘法                                  |
| public BigInteger divide(BigInteger val)               | 除法，获取商                          |
| public BigInteger[] divideAndRemainder(BigInteger val) | 除法，获取商和余数                    |
| public BigInteger max/min(BigInteger val)              | 返回较大值/较小值                     |
| public BigInteger pow(int exponent)                    | 次幂                                  |
| publicboolean equals(object x)                         | 比较是否相同                          |
| publicint intValue(BigInteger val)/longValue           | 转为int类型整数，超出范围数据丢失精度 |

## BigDecimal 高精度数字

适合金融、科学计算等对数值精度要求很高的场景。它是 `java.math` 包的一部分。

在java中

- float 4个字节 32个总bit位 小数部分23个bit位
- double 8个字节 64个比特位 小数部分52个bit位 

如果超出了这些比特位，只能舍弃，出现精度丢失

通过字符串创建BigDecimal

```java
BigDecimal bd1 = new BigDecimal("23.55");
```

#### BigDecima方法

| 方法名                                                       | 说明     |
| ------------------------------------------------------------ | -------- |
| public static BigDecimal value0f(double val)                 | 获取对象 |
| public BigDecimal add(BigDecimal val)                        | 加法     |
| public BigDecimal subtract(BigDecimal val)                   | 减法     |
| public BigDecimal multiply(BigDecimal val)                   | 乘法     |
| public BigDecimal divide(BigDecimal val)                     | 除法     |
| public BigDecimal divide(BigDecimal val，精确几位，舍入模式) | 除法     |

#### 注意事项

1. **避免直接使用浮点数初始化：**
    - 不推荐：`new BigDecimal(0.1)`
    - 推荐：`BigDecimal.valueOf(0.1)` 或 `new BigDecimal("0.1")`
2. **`BigDecimal` 是不可变对象：** 每次运算都会返回新对象，需注意避免多次运算带来的性能开销。
3. **合理选择精度和舍入模式：** 金融计算中建议明确指定 `scale` 和 `RoundingMode`。

## StingBuild/StringBuffer

可变的字符串类，两个类是中的方法是相同的，唯一的区别为StingBuild线程不安全，适用于需要频繁修改字符串内容的场景。StringBuffer线程安全

## File

进行文件操作，本身是一个对象，通过调用对象中的方法进行fs操作(File System)

#### File构造

只推荐使用java，避免使用字符串拼接，在linux和win平台的文件路径是不同的\linux /win

**在JWM中会根据底层系统自动修改路径符，无需考虑**

```java
String str = "C:\\Users\\liyinghao\\Desktop\\test.txt";
File file = new File(str);

String parent = "C:\\Users\\liyinghao\\Desktop";
File parentFile = new File(parent);
System.out.println(file.getParentFile().equals(parentFile));
```

#### 路径选择

在java中是可以使用相对路径的，不能使用./直接写 xxx/xxx.x 就在jar包运行的路径上

**警告：在创建文件时，没有父级目录无法创建**

```java
String str = "static/index.js";
File file = new File(str);
try {//创建文件
    file.createNewFile();
} catch (Exception e) {
    e.printStackTrace();
}
```

## Scanner输入

和cin一样，用处不大

```java
Scanner scanner = new Scanner(System.in);
System.out.println("Enter the radius of the circle: ");
String input = scanner.nextLine();
System.out.println("The radius of the circle is: " + input);
```

# io流文件读写

## io的分类

- I：input
- O：output

**流的方向**

- 输入流
- 输出流

**操作文件的类型**

- 字节流（能操作所有类型文件）
- 字符流（只能操作纯文本文件（用记事本能打开看懂的就是纯文本文件（word和execl不是纯文本文件）））

## FileOutputStream文件写入

操作本地文件的输出流，可以把程序中的数据写到本地文件中

使用步骤

1. 创建字节输出对象,创建通道
2. 写数据
3. 释放资源，销毁通道，否者会占用文件

```java
FileOutputStream fos = new FileOutputStream("a.txt");//参数路径或者File对象
fos.write(97);//覆盖写入，为ASCII码
fos.write(98);//结果是ab
fos.close();
```

**注意：**文件不存在会自动创建，但是父级路径必须存在

#### write方法

| 方法名称                             | 说明                                               |
| ------------------------------------ | -------------------------------------------------- |
| void write(int b)                    | 一次写一个字节数据                                 |
| void write(byte b)                   | 一次写一个字节数组数据                             |
| void write(byte[] b,int off.int len) | 一次写一个字节数组的部分数据，数组，起始索引，个数 |

案例：

```java
//字节流演示
FileOutputStream fos = new FileOutputStream("a.txt");
fos.write(98);
byte[] bytes = {99, 100, 101,102, 103, 104, 105, 106, 107, 108, 109, 110};
fos.write(bytes);
fos.write(bytes, 0, 3);
fos.close();
```

实际使用getBytes方法，可以输入全部语言

```java
String text = "Hello, World!";
fos.write(text.getBytes());
String chineseText = "你好，世界！";
fos.write(chineseText.getBytes());
```

#### 写入换行

在windows系统中

```java
fos.write("\r\n".getBytes());
```

在mac/linux中直接使用\n

## FileInputStream文件读取

#### 指定UTF-8

可以通过String对象中的方法，InputStreamReade

```java
try (FileInputStream fis = new FileInputStream("a.txt")) {
    byte[] buffer = new byte[fis.available()]; // 获取文件大小，创建合适的缓冲区
    int bytesRead = fis.read(buffer); // 读取文件内容

    // 将字节数组转换为字符串，指定 UTF-8 编码
    String content = new String(buffer, 0, bytesRead, "UTF-8");
    System.out.println(content);

} catch (IOException e) {
    e.printStackTrace();
}
```

#### 循环读取

## 序列/反序列化流

也叫对象操作输出流，为高级流

序列化流可以把java对象写入到本地文件中，写入的人是看不懂的，通过反序列化可以读取，核心目的是无法看懂并修改

#### Serializable接口

在序列化存储类时类（**为被存储的类，不是使用序列化的类**）必须实现Serializable接口，Serializable接口为一个空接口，仅仅作为可以被序列化的认证

```java
implements Serializable{

}
```

#### 序列化案例

创建ObjectOutputStream对象传入FileOutputStream参数

```java
JG jg = new JG();
jg.setName("Jay Chou");
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("a.txt"));

oos.writeObject(jg);
oos.close();
```

#### 反序列化案例

ObjectInputStream传入FileInputStream对象

```java
//对象反序列化io读取
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("a.txt"));
JG jg = (JG) ois.readObject();
System.out.println(jg);
ois.close();
```

# 异常

异常就是代表程序出现的问题

## Exception异常分类

java在编译时只会检查语法错误，不会允许检测

java中的问题分文为两种

- **Error：**错误，系统级，严重问题，程序员无法也无需管理
- **Exception：**异常，表程序出现的问题，分为两类。Exception为全部类的异常类的父类
    - **RuntimeException：**运行时异常，编译阶段不会出现异常提醒。运行时出现的异常(如:数组索引越界异常)
    - **编译时异常：**编译阶段就会出现异常提醒的。(如:日期解析异常)

## throw(s)抛出异常

作为特殊通知，统一返回结果

- throws：写在方法定义处，表示声明一个异常，告诉调用者，使用本方法可能会有哪些异常，编译时异常:必须要写，运行时异常:可以不写。

    ```java
    public class Main {
        public static void main(String[] args) throws Exception {
            
        }
    }
    ```

- throw：写在方法内，结束方法，手动抛出异常对象，交给调用者，方法中下面的代码不再执行了，相当于return

    ```java
    public void 方法(){
        throw new NullPointerException()
    }
    ```

直接创建对象并抛出是更常见的做法

```java
throw new RuntimeException("a>5");
```

## try{}catch捕获异常

**捕获的核心目的是不让程序停止**

有两种处理方式

- JVM默认处理方式
    1. 把异常的名称原因等输出在控制台
    2. 停止执行，异常下的代码不会执行了
- 自定义方式
    1. try{}catch(对应的异常){}，在try中的错误抛出后程序还能继续允行，如果多个异常，就接上多个catch或者（|单个！），父类一定要写在下面，try中遇到了问题，try中后的代码就不会执行了 ctrl+Alt+t自动生成

## Throwable异常处理

Throwable 的成员方法

| 方法名称                      | 说明                              |
| ----------------------------- | --------------------------------- |
| public String getMessage()    | 返回此 throwable 的详细消息字符串 |
| public String tostring()      | 返回此可抛出的简短描述            |
| public void printStackTrace() | 把异常的错误信息输出在控制台      |

## 自定义异常

目的是自定义异常报错的名字，在以后会经常使用

1. 定义异常类
2. 写继承关系
    - 运行时异常：RuntimeException
    - 编译时异常：Exception
3. 空参构造 Alt+ins快速生成
4. 带参构造

实例：

一般在exception包下

```java
public class BaseException extends RuntimeException {

    public BaseException() {
    }

    public BaseException(String msg) {
        super(msg);
    }

}
```

## 统一捕获异常

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 捕获业务异常-
     *
     * @param ex
     * @return
     */
    @ExceptionHandler
    public Result exceptionHandler(BaseException ex) {
        log.error("异常信息：{}", ex.getMessage());
        return Result.error(ex.getMessage());
    }

    /**
     * 处理SQL异常
     * @param ex
     * @return
     */
    @ExceptionHandler
    public Result exceptionHandler(SQLIntegrityConstraintViolationException ex) {
        log.error("异常信息：{}", ex.getMessage());
        //Duplicate entry 'liyinghao' for key 'employee.idx_username'
        String message = ex.getMessage();
        if (message.contains("Duplicate entry")) {
            return Result.error("用户名已存在");
        }
        return Result.error(ex.getMessage());
    }
}
```

#### BaseException代码

```java
/**
 * 业务异常
 */
public class BaseException extends RuntimeException {

    public BaseException() {
    }

    public BaseException(String msg) {
        super(msg);
    }

}
```



# 动态代理

非侵入式的修改代码中的方法，增加额外功能

调用者调用代理调用对象，java通过接口保证代理，接口中就是被代理的所有方法

## 创建动态代理方法

1. 声明接口

    接口与实现类

    ```java
    public interface Start {
        public String sing(String singName); //接口中都是抽象方法
    }
    @Data
    public class JG implements Start {
        private String name;
    
        @Override
        public String sing(String singName) {
            System.out.println(this.name + " am singing!" + singName);
            return "I am singing!";
        }
    }
    ```

2. 声明代理类

    其中核心函数为Proxy.newProxyInstance创建代理对象

    ```java
    public class ProxyUtil {
    
        public static Start createPoxy(JG jg) {
            /**
             * 生成代理对象
             * 参数1：指定被代理对象的类加载器
             * 参数2：指定被代理对象的接口，用于指定代理的方法
             * 参数3：指定代理对象做什么事情
             *
             * 外部使用代理对象
             * 1.获取代理对象
             *   Start start = ProxyUtil.createPoxy(new JG());
             * 2.调用代理对象的方法
             *   代理对象.方法();
             */
            Start start = (Start) Proxy.newProxyInstance(
                    ProxyUtil.class.getClassLoader(),
                    new Class[]{Start.class},//代理对象实现的接口
                    new InvocationHandler() {
                        @Override
                        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                            /**
                             * 参数1.代理的对象
                             * 参数2.要运行的方法
                             * 参数3.方法的参数
                             */
                            if("sing".equals(method.getName())) {
                                System.out.println("before sing");
                                Object result = method.invoke(jg, args);
                                System.out.println("after sing");
                                return result;
                            }
                            return null;
                        }
                    }
            );
            return start;
        }
    }
    ```

## 调用代理类

创建代理对象，调用创建代理方法，传入代理对象就可以调用原本的方法了

```java
JG jg = new JG();
Start start = ProxyUtil.createPoxy(jg);
String rust = start.sing("my love");
System.out.println(rust);
```

# 反射

反射允许对成员变量，成员方法和构造方法的信息进行编程访问

## 反射获取

**通过反射可以获取类中全部类型**，idea中的提示就是使用反射获取的

Class为java语言中的内置类

- **字段（成员变量）**(Field)：获取修饰符 获取名字 获取类型 赋值/获取值
- **构造方法** (Constructor)：获取修饰符 获取名字 获取形参 创建对象
- **成员方法**(Method)： 获取修饰符 获取名字 获取形参 获取返回值 抛出的异常 获取注解 运行方法

#### 反射获取对象

获取的是字节码文件对象有三种方法

1. Class.forName(“全类名"); 对应源码阶段 java文件，没有进入内存 （常用）
2. 类名.class 加载阶段，进入内存，没有创建对象 （参数传递）
3. 对象.getclass(); 运行阶段，创建对象（已经有对象使用）

```java
//1.通过全类名获取
Class clazz1 =  Class.forName("cc.liyinghao.JG");
System.out.println(clazz1);
//2.通过类名.class获取
Class clazz2 =  JG.class;
System.out.println(clazz2);
//3.通过新建对象获取
JG jg = new JG();
Class clazz3 = jg.getClass();//clazz1和clazz2和clazz3是同一个类,完全相同
```

#### 反射获取构造方法

Constructor

**Class类中用于获取构造方法的方法**

- `Constructor<?>[]getConstructors()`:返回所有**公共构造方法**对象的数组
- `Constructor<?>[]getDeclaredConstructors()`:返回**所有构造方法**对象的数组
- `Constructor<T>getConstructor(Class<?>... parameterTypes)`:返回**单个公共构造方法**对象，参数与构造方法保持一致 eg：构造方法为int 参数为int.class
- `Constructor<T>getDeclaredConstructor(Class<?>.. parameterTypes)`:返回**单个构造方法对象**

实例-获取全部的公共方法

```java
Class clazz= class.forName("com.itheima.myreflect2.student");
Constructor[]cons = clazz.getConstructors();
for(constructor con:cons){
    System.out.println(con);
}
```

**注意：**获取私有构造方法后只是能获取，并不能使用，使用需要加上权限 对象.setAccessible(true); 也叫**暴力反射**

#### 反射获取成员变量

Field

**Class类中用于获取成员变量的方法**

- Field[]getFields():返回所有公共成员变量对象的数组 
- Field[ getDeclaredFields():返回所有成员变量对象的数组
- Field getField(String name):返回单个公共成员变量对象
- Field getDeclaredField(Stringname):返回单个成员变量对象

**Field类中用于创建对象的方法**

- void set(Object obj, Object value):赋值

- Object get(Object obj) 获取值。

使用方法同上，传入成员方法名即可

#### 反射获取成员方法

Method

**Class类中用于获取成员方法的方法**

- MethodgetMethods():返回所有公共成员方法对象的数组，包括继承的（父类中的）
- MethodgetDeclaredMethods():返回所有成员方法对象的数组，不包括继承的
- MethodgetMethod(String name, Class<?>... parameterTypes):返回单个公共成员方法对象
- MethodgetDeclaredMethod(String name, Class<?>... parameterTypes):返回单个成员方法对象

**Method类中用于创建对象的方法**

Object invoke(Object obj, Object... args):运行方法

参数一:用obj对象调用该方法

参数二:调用方法的传递的参数(如果没有就不写)（String.class int.class）

返回值:方法的返回值(如果没有就不写)

## 反射的作用

1. 获取一个类中的所有信息，获取到了以后，执行其他业务逻辑
2. 结合配置文件，动态的创建并调用方法

对于任意一个对象，都可以把对象所有的字段名和值，保存到文件中去

#### 补：获取与调用方法对象

- 获取方法

`Method method = clazz.getDeclaredMethod("methodName", paramTypes);` 获取方法对象。

- 调用获取的方法

method(获取的方法).invoke();

eg：setCreateTime.invoke(entity, LocalDateTime.now());

这将调用 `entity` 对象的 `setCreateTime` 方法，并传入当前时间作为参数。

#### 补：反射与Object类

`Object` 是 Java 中所有类的根类，所有类都直接或间接继承自 `Object`。这意味着 `Object` 类型的变量可以引用任何类型的对象。

在使用反射机制时，通常需要处理各种类型的对象，而这些对象在编译时类型不确定。通过使用 `Object` 类型，可以灵活地处理这些对象。

# 多线程编程

**进程：**一个软件就是一个进程

**线程：**软件中可以同时运行的功能就是一个线程，线程是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位。

## 并发并行

**并发：**在同一时刻，有多个指令在**单个**CPU（核心）上交替执行

**并行：**在同一时刻，有多个指令在**多个**CPU（核心）上同时执行

一般来说，并发和并行是同时发生的，如一个cpu是2核心4线程，那么他最多只能运行4个线程，多出4个就会进入并发状态

## 实现多线程基本方式

|                  | 优点                                                    | 缺点                                       |
| ---------------- | ------------------------------------------------------- | ------------------------------------------ |
| 继承Thread类     | 编程比较简单，可以直接使用Thread类中的方法              | 可以扩展性较差，不能再继承其他的类         |
| 实现Runnable接口 | 扩展性强，实现该接口的同时还可以继承其他的类,没有返回值 | 编程相对复杂，不能直接使用Thread类中的方法 |
| 实现Callable接口 | 扩展性强，实现该接口的同时还可以继承其他的类,有返回值   | 编程相对复杂，不能直接使用Thread类中的方法 |

#### 1.继承Thread类

编写自己的类继承Thread，重写其中的方法，并且可以使用Thread中的方法（如getname），在使用时建立对象，调用start方法启动

- MyThread

```java
public class MyThread extends Thread{
    @Override
    public void run() {
        System.out.println(getName() + "MyThread.run()");
    }
}
```

- main函数

```java
public class Main {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();

        t1.setName("t1");
        t2.setName("t2");

        t1.start();
        t2.start();
    }
}
```

#### 2.实现Runnable接口

1. 自己定义一个类实现Runnable接口
2. 重写里面的run方法
3. 创建自己的类的对象
4. 创建一个Thread类的对象，并开启线程

- MyRun

```java
public class MyRun implements Runnable{
    @Override
    public void run() {
        //获取当前线程的名字
        Thread t = Thread.currentThread();
        System.out.println(t.getName() + "MyRun.run()");
    }
}
```

- main

```java
// MyThread.run()
MyRun r = new MyRun();
Thread t3 = new Thread(r);
t3.setName("t3");
t3.start();
```

#### 3.实现Callable接口

可以获取到多线程运行的结果

1. 创建一个类MyCallable实现callable接口

    ```java
    import java.util.concurrent.Callable;
    public class MyCallable implements Callable<Integer> {
        @Override
        public Integer call() throws Exception {
            return 1;
        }
    }
    ```

2. 重写call (是有返回值的，表示多线程运行的结果)

3. 创建MyCallable的对象(表示多线程要执行的任务)

4. 创建FutureTask的对象(作用**管理**多线程运行的**结果**)

5. 创建Thread类的对象，并启动(表示线程)

**运行示例**

```java
MyCallable myCallable = new MyCallable();
FutureTask<Integer> futureTask = new FutureTask<>(myCallable);
Thread thread = new Thread(futureTask);
thread.start();
try {
    System.out.println(futureTask.get());
} catch (Exception e) {
    e.printStackTrace();
}
```

## 多线程成员方法

常见的成员方法

| 方法名称                          | 说明                                                     |
| --------------------------------- | -------------------------------------------------------- |
| String getName()                  | 返回此线程的名称，默认名称Thread-X(X为序号，重0开始的)   |
| void setName(String name)         | 设置线程的名字(构造方法也可以设置名字)                   |
| **static** Thread currentThread() | 获取当前线程的对象                                       |
| **static** void sleep(long time)  | 让线程休眠指定的时间，单位为毫秒                         |
| setPriority(int newPriority)      | 设置线程的优先级（1~10）默认是5，越大获取CPU的概率就越大 |
| final int getPriority()           | 获取线程的优先级                                         |
| final void setDaemon(boolean on)  | 设置为**守护线程**                                       |
| public **static** void yield()    | 出让线程/礼让线程                                        |
| public **static** void join()     | 插入线程/插队线程                                        |

#### 设置线程名称

在MyThread中包含设置名称的构造函数，但是构造函数不继承，需要重写

```java
public MyThread(String name) {
    super(name);
}
```

细节：在JVM启动之后，会自动开启一条mian线程，运行mian函数中的内容

#### 线程休眠

直接调用，就可以停止线程

```java
Thread.sleep(5000);//1 秒= 1000毫秒
```

#### 线程优先级

线程有多种调度方式

- 抢占式调度：随机执行，有**随机性**
- 非抢占式调度：顺序执行

java为**抢占式调度**。有10个优先级，默认是5

使用如下函数

- setPriority(int newPriority) 设置优先级
- final int getPriority()  获取优先级

#### 守护线程

备胎线程

没有设置的为非守护线程，守护线程与非守护线程同时执行，当非守护线程执行完成后，守护线程陆续结束(即使没有执行完毕)

设置为守护线程 final void setDaemon(boolean on)

#### 礼让线程

yield()  Thread中的静态方法，在类中使用类名调用

```java
Thread.yield();
```

表示让出执行权，重新抢夺，但是有可能再次抢到，会均匀一些，没什么用

#### 插入线程

真插队，执行完后其他的才会执行

```java
MyThread myThread = new MyThread("111");
myThread.start();
myThread.join();//插入
for (int i = 0; i < 10; i++) {
    System.out.println("2222");
}
```

## 线程的生命周期

线程也是有生命周期的

创建时新建对象，start开始抢夺资源，进行**抢夺循环**，直到运行完毕，变成垃圾

#### 线程安全问题

在同一个任务中开多线程执行就很有可能有线程重复问题，使用static也无法解决

需要同步代码块

#### synchronized同步代码块

把操作共享数据的代码锁起来，保证在运行此部分代码时不会被其他线程抢夺

格式

```java
//在MyThread对象中编写
synchronized(锁对象){
	操作共享数据的代码
}
```

- 特点1:锁默认打井，有一个线程进去了，锁自动关闭
- 特点2:里面的代码全部执行完毕，线程出来，锁自动打开
- **锁对象任意对象，但是一定要唯一 static Object obj = new Object();都行。通常使用 MyThread.class字节码文件，为唯一文件**

#### 同步方法

就是把synchronized关键字加到方法上

- 特点1:同步方法是锁住方法里面所有的代码
- 特点2:锁对象不能自己指定

案例

```java
@Override
public void run() {
    test();
}

private static synchronized void test() {
    for (int i = 0; i < 10; i++) {
        System.out.println(Thread.currentThread().getName() + "正在执行" + i);
    }
}
```

其中static非常关键，添加static后共享锁对象，这样所有线程都将共用一个类级别的锁。

synchronized方法默认同步锁对象是this，即当前的实例对象。每个MyThread对象都有自己独立的锁。因此，创建两个线程myThread1和myThread2时，它们分别持有自己的锁，互不干扰。

#### lock锁

# 补充知识

## StringBuilder

```java
private StringBuilder stringBuilder = new StringBuilder(4);
```

**不可变性与可变性**

- **`String`** 是不可变的，这意味着一旦创建了一个 `String` 对象，它的内容就无法更改。如果你对一个 `String` 进行修改（如拼接、替换等），实际上会创建一个新的 `String` 对象，并将原有的内容和新内容组合成新的字符串对象。这就会导致大量的临时对象被创建，浪费内存和增加不必要的性能开销。
- **`StringBuilder`** 是可变的，可以在不创建新对象的情况下修改字符串内容。当你对 `StringBuilder` 进行拼接、修改等操作时，它会直接修改内部的字符数组，而不会产生新的对象。因此，`StringBuilder` 在频繁修改字符串时更高效。

**性能**

- **`String`** 在拼接多个字符串时会涉及多个对象的创建和复制，尤其是在循环或重复拼接时。每次拼接都会产生新的字符串对象，这会导致性能下降。
- **`StringBuilder`** 会自动管理其内部字符数组的大小。当你使用 `StringBuilder` 拼接字符串时，它会在原有内容的基础上追加新的字符，不会频繁创建新的对象。这使得在进行大量字符串拼接时，`StringBuilder` 的性能比 `String` 高得多。