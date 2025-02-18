2025/1/15独立，单独的javaAPI，只有java本体的api，没有其他任何第三方包

# java新特性

java8版本不做说明，大于java8会有注意⚠️提醒

## Optional容器类

用于表示可能包含值或不包含值的对象。它主要用于避免空指针异常（NullPointerException）并提供更清晰的 API

Optional 是个容器：它可以保存类型T的值，或者仅仅保存null。Optional提供很多方法，不用显式进行空值检测。

在没有Optional的情况下，需要写很多的if避免空指针

#### 创建Optional对象

- `Optional.of(T value)`：创建一个包含非空值的 `Optional`，如果传入值为 `null` 会抛出 `NullPointerException`。

- `Optional.ofNullable(T value)`：创建一个可能为空的 `Optional`，如果传入值为 `null`，则返回一个空的 `Optional`。

- `Optional.empty()`：创建一个空的 `Optional`。

```java
Optional<String> optional1 = Optional.of("Hello"); // 非空值
Optional<String> optional2 = Optional.ofNullable(null); // 可为空
Optional<String> optional3 = Optional.empty(); // 空的
```

#### 检查值存在

- `isPresent()`：如果值存在，返回 `true`。

- `isEmpty()`：如果值为空，返回 `true`（⚠️注意 Java 11+）。

#### 获取值

- `get()`：获取值，如果值为空会抛出 `NoSuchElementException`。

- `orElse(T other)`：值存在则返回值，否则返回 `other`。

- `orElseGet(Supplier<? extends T> supplier)`：值存在则返回值，否则通过 `Supplier` 提供一个值。

- `orElseThrow()`：值存在则返回值，否则抛出异常。

```java
System.out.println(optional1.orElse("Default Value")); // 输出: Hello
System.out.println(optional2.orElse("Default Value")); // 输出: Default Value
```

#### 常见使用场景

1. 数据库查询

    ```java
    public Optional<String> findUserById(int id) {
        if (id == 1) {
            return Optional.of("John");
        } else {
            return Optional.empty();
        }
    }
    
    Optional<String> user = findUserById(1);
    user.ifPresent(System.out::println); // 输出: John
    ```

    

## lambda表达式(->)

一个接口的唯一方法的快速重写语法糖，与js的箭头函数有些类似

#### 使用lambda遍历List

```java
List<String> list = Arrays.asList("a", "b", "c");
for (String s : list) {
    System.out.println(s);
}
//可以快速访问内部属性
list.forEach(s -> {
    System.out.println(s);
});
//等同与
list.forEach(System.out::println); //也是lambda
```

#### 使用lambda简化list排序

```java
List<String> list = Arrays.asList("a", "c", "b");

//list排序
list.sort((a, b) -> a.compareTo(b));
//list.sort(String::compareTo);

list.forEach(System.out::println);
```

## Stream流

Stream 是一种数据处理方式，提供了对数据集合进行操作的功能，如过滤、映射、排序和聚合等。它的设计目的是使代码更简洁、可读性更强，同时利用多核架构提高性能

通常与lambda连续使用

#### 与for的区别

链式调用，简易的并发，在大数据下可以使用简单的代码实现，但是会带来额外的GC压力

#### stream/parallelStream

`list.stream()` 会返回一个顺序流（Stream），而 `list.parallelStream()` 返回一个并行流。流本身不存储数据，而是从集合或数组中获取数据后按管道进行操作

#### filter过滤

按条件筛选数据

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");

// 筛选名字长度大于3的名字
List<String> filteredNames = names.stream()
        .filter(name -> name.length() > 3)
        .collect(Collectors.toList());

System.out.println(filteredNames); // 输出: [Alice, Charlie, David]
```

#### map映射

将每个元素映射为其他类型或值

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // 将每个数字平方
        List<Integer> squaredNumbers = numbers.stream()
                                              .map(num -> num * num)
                                              .collect(Collectors.toList());
                                              
        System.out.println(squaredNumbers); // 输出: [1, 4, 9, 16, 25]
    }
}
```

#### sorted排序

对流中的元素进行排序。

```java
import java.util.Arrays;
import java.util.List;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 3, 8, 1, 9, 7);
        
        // 筛选大于5的数字，排序后打印
        numbers.stream()
               .filter(num -> num > 5)
               .sorted()
               .forEach(System.out::println); // 输出: 7, 8, 9
    }
}
```

#### sum求和

```java
import java.util.Arrays;
import java.util.List;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // 求和
        int sum = numbers.stream()
                         .mapToInt(Integer::intValue)
                         .sum();
                         
        System.out.println("Sum: " + sum); // 输出: Sum: 15
    }
}
```

#### reduce聚合

对流中的元素进行汇总

#### collect收集

将流转换为其他集合类型。

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

# 数据结构类

## Map图

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

## List集合

#### ArrayList动态数组

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

# 常规工具类

## StringAPI

#### replace字符串替换

```java
String str = "Hello World";
String newStr1 = str.replace('H', 'J'); // 替换 'H' 为 'J'
String newStr2 = str.replace("World", "Java"); // 替换 "World" 为 "Java"

System.out.println(newStr1); // 输出：Jello World
System.out.println(newStr2); // 输出：Hello Java
```

#### equals判断字符串相同等

注意，比较字符串不能直接写==，那样比的是地址，使用String方法 equals

```java
字符串.equals(比较对象)
```

#### startsWith以开始

```java
string.startsWith("")
```

#### 字符串相关/分割/排序/查找

建议看菜鸟编程

https://www.runoob.com/java/java-string.html

## ArraysAPI

注意是Arrays不是Array

**Arrays**为工具类，不是数组

#### toString转字符

- 转成string

```java
int[] a = {1, 2, 3, 4};
System.out.println(Arrays.toString(a));
//[1, 2, 3, 4]
```

#### sort排序

```java
int[] a = {4, 2, 3, 1};
Arrays.sort(a);
```

#### binarySearch二分查找

数组一定是有序的

```java
int[] a = {1, 2, 3, 4};
int index = Arrays.binarySearch(a, 3);
System.out.println(index); // 2
```

#### equals比较相等

```java
int[] a = {1, 2, 3, 4};
int[] b = {1, 2, 3, 4};
System.out.println(Arrays.equals(a, b)); // true
```

#### copyOf复制数组

```java
int[] a = {1, 2, 3, 4};
int[] b = Arrays.copyOf(a, 2);
System.out.println(Arrays.toString(b)); // [1, 2]
```

#### copyOfRange复制指定范围数组

```java
int[] a = {1, 2, 3, 4};
int[] b = Arrays.copyOfRange(a, 1, 3);
System.out.println(Arrays.toString(b)); // [2, 3]
```

#### fill填充数组

```java
int[] a = new int[4];
Arrays.fill(a, 7);
System.out.println(Arrays.toString(a)); // [7, 7, 7, 7]
```

#### asList将数组转换为List

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

#### LocalDateTime(2024-11-28T14:30:15)

**表示：** 同时包含日期和时间（例如：2024-11-28T14:30:15）。
**特点：** 无时区信息。

**常见方法：**

- LocalDateTime.now()：获取当前日期时间。
- LocalDateTime.of(LocalDate date, LocalTime time)：组合日期和时间。
- dateTime.minusDays(5)：减去5天。

#### ZonedDateTime(2024-11-28T14:30:15+08:00[Asia/Shanghai])

**表示：** 带有时区的日期时间（例如：2024-11-28T14:30:15+08:00[Asia/Shanghai]）。
**特点：** 包含时区信息。

**常见方法：**

- ZonedDateTime.now(ZoneId.of("Asia/Shanghai"))：获取当前带时区的日期时间。
- ZonedDateTime.of(LocalDateTime, ZoneId)：通过`LocalDateTime`和`ZoneId`创建。

#### Instant时间点

**表示：** 时间点（例如：1970-01-01T00:00:00Z后某一时刻）。
**特点：** 用于精确表示时间戳。

**常见方法：**

- Instant.now()：获取当前时刻。
- instant.plusSeconds(3600)：增加3600秒。

#### Duration时间间隔

**表示：** 两个时间点之间的间隔，精确到纳秒。

**常见方法：**

- Duration.between(start, end)：计算两个时间点的间隔。
- duration.toMinutes()：将间隔转换为分钟。

#### Period日期间隔

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

#### File构造

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

# 线程与线程安全类

## AtomicInteger原子整数
