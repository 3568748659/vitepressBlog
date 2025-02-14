2025/1/15独立，单独的javaAPI

# java新特性

java8版本不做说明，大于java8会有注意⚠️提醒

## lambda表达式(->)

一个接口的唯一方法的快速重写语法糖

**案例**

使用lambda

```java
flavorList.forEach(flavor -> {
    flavor.setDishId(dishId);
});
```

不使用lambda

```java
flavorList.forEach(flavor -> {
    new Consumer<Flavor>() {
        @Override
        public void accept(Flavor flavor) {
            flavor.setDishId(dishId);
        }
    }
});
```

## Optional容器类

用于表示可能包含值或不包含值的对象。它主要用于避免空指针异常（NullPointerException）并提供更清晰的 API

Optional 是个容器：它可以保存类型T的值，或者仅仅保存null。Optional提供很多有用的方法，这样我们就不用显式进行空值检测。

Optional 类的引入很好的解决空指针异常。

在没有Optional的情况下，需要写很多的if避免空指针

#### Optional案例

1. 查询数据库

## Stream流

## CompletableFuture异步调用

可以使用类似js的链式编程优雅的处理异步函数

```java
CompletableFuture.supplyAsync(() -> {
    // 进行一些异步操作
    return "结果";
}).thenApply(result -> {
    // 处理结果
    return result.toUpperCase();
}).thenAccept(finalResult -> {
    // 最终处理结果
    System.out.println(finalResult);
}).exceptionally(ex -> {
    // 处理异常
    System.err.println("发生错误: " + ex.getMessage());
    return null;
});
```

## Map.of 初始化Map

⚠️注意：java 9以上版本

用于快速创建不可变Map，且每一个key必须唯一，常用于参数传递 Map.of(K1, V1, K2, V2)

```java
Map<String, Integer> map = Map.of(
    "Apple", 1,
    "Banana", 2,
    "Cherry", 3
);
System.out.println(map); // 输出: {Apple=1, Banana=2, Cherry=3}
```

# api与工具类

## StringAPI

#### replace字符串替换

```java
String str = "Hello World";
String newStr1 = str.replace('H', 'J'); // 替换 'H' 为 'J'
String newStr2 = str.replace("World", "Java"); // 替换 "World" 为 "Java"

System.out.println(newStr1); // 输出：Jello World
System.out.println(newStr2); // 输出：Hello Java
```

#### 判断字符串相同

```java
字符串.equals(比较对象)
```

#### 比较字符串相等

注意，比较字符串不能直接写==，那样比的是地址，使用String方法 equals

#### 字符串相关/分割/排序/查找

建议看菜鸟编程

https://www.runoob.com/java/java-string.html

## ArraysAPI

注意是Arrays不是Array

#### toString/转字符

- 转成string

```java
int[] a = {1, 2, 3, 4};
System.out.println(Arrays.toString(a));
//[1, 2, 3, 4]
```

#### sort/排序

```java
int[] a = {4, 2, 3, 1};
Arrays.sort(a);
```

#### binarySearch/二分查找

数组一定是有序的

```java
int[] a = {1, 2, 3, 4};
int index = Arrays.binarySearch(a, 3);
System.out.println(index); // 2
```

#### equals/比较相等

```java
int[] a = {1, 2, 3, 4};
int[] b = {1, 2, 3, 4};
System.out.println(Arrays.equals(a, b)); // true
```

#### copyOf/复制数组

```java
int[] a = {1, 2, 3, 4};
int[] b = Arrays.copyOf(a, 2);
System.out.println(Arrays.toString(b)); // [1, 2]
```

#### copyOfRange/复制指定范围数组

```java
int[] a = {1, 2, 3, 4};
int[] b = Arrays.copyOfRange(a, 1, 3);
System.out.println(Arrays.toString(b)); // [2, 3]
```

#### fill/填充数组

```java
int[] a = new int[4];
Arrays.fill(a, 7);
System.out.println(Arrays.toString(a)); // [7, 7, 7, 7]
```

#### asList/将数组转换为List

```java
String[] a = {"apple", "banana", "cherry"};
List<String> list = Arrays.asList(a);
System.out.println(list); // [apple, banana, cherry]
```

## time时间包

#### Date日期对象

旧版api，推荐使用新的java.time下的新api

获取当前时间

```java
import java.util.Date;
  
public class DateDemo {
   public static void main(String[] args) {
       // 初始化 Date 对象
       Date date = new Date();
     
       // 使用 toString() 函数显示日期时间
       System.out.println(date.toString());
   }
}
```

SimpleDateFormat 格式化日期

#### LocalDate(2024-11-28)

不含时间的日期（例如：2024-11-28）。

**常见方法：**

- LocalDate.now()：获取当前日期。
- LocalDate.of(int year, int month, int dayOfMonth)：创建指定日期。
- date.plusDays(10)：当前日期加上10天。
- date.minusMonths(1)：当前日期减去1个月。

#### LocalTime(14:30:15)

**表示：** 不含日期的时间（例如：14:30:15）。
**特点：** 只包含小时、分钟、秒和纳秒。

**常见方法：**

- LocalTime.now()：获取当前时间。
- LocalTime.of(int hour, int minute, int second)：创建指定时间。
- time.plusHours(2)：当前时间加2小时。

#### LocalDateTime

**表示：** 同时包含日期和时间（例如：2024-11-28T14:30:15）。
**特点：** 无时区信息。

**常见方法：**

- LocalDateTime.now()：获取当前日期时间。
- LocalDateTime.of(LocalDate date, LocalTime time)：组合日期和时间。
- dateTime.minusDays(5)：减去5天。

#### ZonedDateTime

**表示：** 带有时区的日期时间（例如：2024-11-28T14:30:15+08:00[Asia/Shanghai]）。
**特点：** 包含时区信息。

**常见方法：**

- ZonedDateTime.now(ZoneId.of("Asia/Shanghai"))：获取当前带时区的日期时间。
- ZonedDateTime.of(LocalDateTime, ZoneId)：通过`LocalDateTime`和`ZoneId`创建。

#### Instant

**表示：** 时间点（例如：1970-01-01T00:00:00Z后某一时刻）。
**特点：** 用于精确表示时间戳。

**常见方法：**

- Instant.now()：获取当前时刻。
- instant.plusSeconds(3600)：增加3600秒。

#### Duration

**表示：** 两个时间点之间的间隔，精确到纳秒。

**常见方法：**

- Duration.between(start, end)：计算两个时间点的间隔。
- duration.toMinutes()：将间隔转换为分钟。

#### Period

**表示：** 两个日期之间的间隔，单位为年、月、日。

**常见方法：**

- Period.between(startDate, endDate)：计算两个日期之间的年、月、日间隔。

## Math数学

#### 返回原生数据类型

- XXXValue

```java
Integer x = 5;
// 返回 byte 原生数据类型
System.out.println(x.byteValue());

// 返回 double 原生数据类型
System.out.println(x.doubleValue());

// 返回 long 原生数据类型
System.out.println(x.longValue());
```

#### 字符转数字

- parserXXX

```java
int x =Integer.parseInt("9");
double c = Double.parseDouble("5");
int b = Integer.parseInt("444",16);

System.out.println(x);
System.out.println(c);
System.out.println(b);
```

#### 绝对值

- abs

```java
int a = -8;
double d = -100;
float f = -90f;

System.out.println(Math.abs(a));
System.out.println(Math.abs(d));
System.out.println(Math.abs(f));
```

#### 四舍五入

- round

```java
double d = 100.675;
double e = 100.500;
float f = 100;
float g = 90f;

System.out.println(Math.round(d));
System.out.println(Math.round(e));
System.out.println(Math.round(f));
System.out.println(Math.round(g));
```

#### 返回大小值

- min()/max()

```java
System.out.println(Math.min(12.123, 12.456));
System.out.println(Math.min(23.12, 23.0));
```

#### 返回最近的整数

- rint  返回值是double

```java
double d = 100.675;
double e = 100.500;
double f = 100.200;

System.out.println(Math.rint(d));
System.out.println(Math.rint(e));
System.out.println(Math.rint(f));
```

#### 随机数

- random

```java
System.out.println( Math.random() );
System.out.println( Math.random() );
```

## Map常见api

1. 插入 put(key, value) 

    ```java
    map.put("Apple", 10);
    ```

2. 如果不存在插入 putIfAbsent(K key, V value) 

    ```java
    map.putIfAbsent("Apple", 20); 
    ```

3. 根据键获取对应的值，不存在返回null get(Object key) 

    ```java
    map.get("Name")
    ```

4. 如果不存在返回指定值 getOrDefault

    ```java
    map.getOrDefault("Name", "Unknown")
    ```

5. 根据键移除键值对 remove(Object key) 

    ```java
    map.remove("Apple");
    ```

6. 根据键值对删除 remove(Object key, Object value)

    ```java
    map.remove("Apple", 10);
    ```

7. 判断 Map 中是否包含某个键 containsKey(Object key)

    ```java
    map.containsKey("Name")
    ```

8. 判断为空 isEmpty()

    ```java
    map.isEmpty()
    ```

9. 返回所有键的集合 keySet()

    ```java
    map.keySet()
    ```

10. 返回所有值的集合 values()

    ```java
    map.values()
    ```

11. 返回键值对的集合，常用于遍历 entrySet()

    ```
    map.entrySet()
    ```

12. 替换指定键的值 replace(K key, V value)

    ```java
    map.replace("A", 2); //替换A键
    ```

13. 仅当键的当前值与指定值匹配时才替换 replace(K key, V oldValue, V newValue)

    ```java
    map.replace("A", 1, 2);
    ```

14. 遍历 对每个键值对执行指定的操作 forEach(BiConsumer<? super K, ? super V> action)

    ```java
    Map<String, Integer> map = new HashMap<>();
    map.put("A", 1);
    map.put("B", 2);
    map.forEach((key, value) -> System.out.println(key + ": " + value));
    // 输出:
    // A: 1
    // B: 2
    ```

15. 清空 `Map` 中的所有键值对 

    ```java
    map.clear();
    ```

## List常见api

#### ArrayList动态数组

直接写数组是静态的，不可变大小

```java
// 原始数组
String[] originalArray = {"A", "B", "D"};
// 转换为ArrayList
ArrayList<String> list = new ArrayList<>(Arrays.asList(originalArray));
// 插入新元素
list.add(2, "C");
// 输出结果
System.out.println(list);
```

## Pattern正则

常规使用步骤

1. 定义正则表达式，为String类型

    ```java
    String regex = "\\d{3}-\\d{2}-\\d{4}";
    ```

2. 创建java.util.regex.Pattern对象，编译正则表达式

    ```java
    Pattern pattern = Pattern.compile(regex);
    ```

3. 创建java.util.regex.Matcher对象，进行匹配

    ```java
    Matcher matcher = pattern.matcher(input);
    ```

4. 使用Matcher中的find和group方法判断和获取字符串

    **警告：在使用group方法前必须使用find方法**

    ```java
    // 检查是否匹配
    if (matcher.find()) {
        System.out.println("匹配到的内容: " + matcher.group());
    } else {
        System.out.println("未匹配到内容");
    }
    ```

简易判断步骤

如果只想检测是否匹配，有更简单的方法

```java
String email = "example@mail.com";
String regex = "^[\\w.-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,6}$";

// 判断 email 是否匹配正则表达式
boolean isValid = Pattern.matches(regex, email);
```

#### 正则API

- `.`: 匹配任意字符（除了换行符）
- `\d`: 匹配一个数字（相当于 `[0-9]`）
- `\w`: 匹配一个字母、数字或下划线（相当于 `[a-zA-Z0-9_]`）
- `\s`: 匹配一个空白字符（如空格、制表符）
- `+`: 匹配前面的元素 1 次或多次
- `*`: 匹配前面的元素 0 次或多次
- `{n}`: 匹配前面的元素恰好 n 次
- `^`: 匹配字符串的开始
- `$`: 匹配字符串的结尾

## system

#### 获取jar包运行路径

```
System.getProperty("user.dir")
```

## File

#### 判断是否存在

1. 使用file.exists

```java
String str = "C:\\Users\\35687\\Desktop\\java测试\\File\\index";
File file = new File(str);
//删除文件(夹)
if (file.exists()) {
    System.out.println("文件已删除");
} else {
    System.out.println("文件不存在");
}
```

#### 创建文件(夹)

1. 创建File对象
2. try file.creatNewFile

```java
String str = "C:\\Users\\35687\\Desktop\\java测试\\File\\index.js";
File file = new File(str);
//创建文件
try {
    file.createNewFile();
} catch (Exception e) {
    e.printStackTrace();
}
String str = "C:\\Users\\35687\\Desktop\\java测试\\File\\index";
File file = new File(str);
//创建文件夹
if (!file.exists()) {
    file.mkdirs();
}
```

##### 在同级目录下创建

```java
// 定义相对路径
String relativePath = "../myFile/index.js";

// 创建文件对象
File file = new File(relativePath);

// 确保目录存在
if (!file.getParentFile().exists()) {
    file.getParentFile().mkdirs();
}
// 创建新文件
if (!file.exists()) {
    try {
        file.createNewFile();
    } catch (Exception e) {
        e.printStackTrace();
    }
    System.out.println("File created: " + file.getAbsolutePath());
} else {
    System.out.println("File already exists: " + file.getAbsolutePath());
}
```

#### 删除文件(夹)

删除空文件夹

```java
String str = "C:\\Users\\35687\\Desktop\\java测试\\File\\index";
File file = new File(str);
//删除文件(夹)
if (file.exists()) {
    file.delete();
    System.out.println("文件已删除");
} else {
    System.out.println("文件不存在");
}
```

##### 递归删除文件

```java
String str = "C:\\Users\\35687\\Desktop\\goTest\\static\\22001010505aa";
File file = new File(str);

// 删除文件夹（递归删除）
if (file.exists()) {
    deleteDirectory(file);
    System.out.println("文件夹已删除");
} else {
    System.out.println("文件夹不存在");
}
}

// 递归删除文件夹及其内容
public static void deleteDirectory(File dir) {
    if (dir.isDirectory()) {
        // 获取文件夹中的所有文件和子文件夹
        File[] files = dir.listFiles();
        if (files != null) {
            for (File file : files) {
                // 递归删除子文件和子文件夹
                deleteDirectory(file);
            }
        }
    }
    // 删除文件或空文件夹
    dir.delete();
}
```

##### 删除带有指定内容的文件(夹)

使用contains进行包含匹配

```
file.getName().contains(keyword)
```

```java
for (File file : files) {
    // 检查文件名是否包含关键字
    if (file.isFile() && file.getName().contains(keyword)) {
        // 删除文件
        if (file.delete()) {
            System.out.println("文件已删除: " + file.getName());
        } else {
            System.out.println("无法删除文件: " + file.getName());
        }
    }
```