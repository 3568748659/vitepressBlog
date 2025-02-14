mavne：https://mvnrepository.com/

# 我的工具类

## 判断手机/邮箱

```java
public static final String PHONE_REGEX = "^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$";
public static final String EMAIL_REGEX = "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$";
```

## ip获取

```java
package com.atguigu.system.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

/**
 * 获取 IP 地址工具类
 */
public class IpUtil {
    private static final Logger logger = Logger.getLogger(IpUtil.class.getName());

    /**
     * 获取 IP 地址（适用于传统 Servlet）
     */
    public static String getIpAddress(HttpServletRequest request) {
        List<String> headerNames = Arrays.asList(
                "x-forwarded-for",
                "Proxy-Client-IP",
                "WL-Proxy-Client-IP"
        );

        for (String header : headerNames) {
            String ip = request.getHeader(header);
            if (isValidIp(ip)) {
                return getFirstIp(ip);
            }
        }

        // 获取远程 IP
        String ip = request.getRemoteAddr();
        if (ip != null && (ip.startsWith("127.") || "0:0:0:0:0:0:0:1".equals(ip))) {
            try {
                ip = InetAddress.getLocalHost().getHostAddress();
            } catch (UnknownHostException e) {
                logger.warning("获取本机 IP 失败：" + e.getMessage());
            }
        }

        return ip;
    }

    /**
     * 获取 IP 地址（适用于 Spring WebFlux）
     */
    public static String getGatewayIpAddress(ServerHttpRequest request) {
        HttpHeaders headers = request.getHeaders();
        List<String> headerNames = Arrays.asList(
                "x-forwarded-for",
                "Proxy-Client-IP",
                "WL-Proxy-Client-IP",
                "HTTP_CLIENT_IP",
                "HTTP_X_FORWARDED_FOR",
                "X-Real-IP"
        );

        for (String header : headerNames) {
            String ip = headers.getFirst(header);
            if (isValidIp(ip)) {
                return getFirstIp(ip);
            }
        }

        // 兜底获取 IP
        return request.getRemoteAddress() != null ? request.getRemoteAddress().getAddress().getHostAddress() : "";
    }

    /**
     * 判断 IP 是否有效
     */
    private static boolean isValidIp(String ip) {
        return ip != null && ip.length() > 0 && !"unknown".equalsIgnoreCase(ip);
    }

    /**
     * 处理多级代理 IP，返回第一个 IP
     */
    private static String getFirstIp(String ip) {
        if (ip.contains(",")) {
            return ip.split(",")[0].trim();
        }
        return ip;
    }
}
```



# 官方包

## spring-security-crypto加密解密(哈希加盐)

## validation数据验证

## websocket

WebSocket 是基于 TCP 的一种新的网络协议（**不是http了**）。它实现了浏览器与服务器全双工通信--浏览器和服务器只需要完成-次握手，两者之间就可以创建持久性的连接，并进行双向数据传输。

HTTP协议和WebSocket协议对比

- HTTP是短连接
- WebSocket是长连接
- HTTP通信是单向的，基于请求响应模式
- WebSocket支持双向通信
- HTTP和WebSocket底层都是TCP连接

与http请求的路径都不相同了

WebSocket的请求路径形式

```
ws://localhost:8080/ws/xxx
```

#### websocket使用

maven坐标

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

#### websocket配置类

ServerEndpointExporter常见配置

```java
@Configuration
public class WebSocketConfig {
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
```

#### @ServerEndpointWS路径处理

与常规的@RestControll类配置相同，通过@ServerEndpoint在类头进行**路由处理**

```java
@ServerEndpoint("/ws/{sid}")
public class WebSocketServer{

}
```

处理的完整路径

```
ws://localhost:8080/ws/clientId
```

#### ws代码示例

```java
@Component
@ServerEndpoint("/ws/{sid}")
public class WebSocketServer {

    //存放会话对象
    private static Map<String, Session> sessionMap = new HashMap();

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("sid") String sid) {
        System.out.println("客户端：" + sid + "建立连接");
        sessionMap.put(sid, session);
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    public void onMessage(String message, @PathParam("sid") String sid) {
        System.out.println("收到来自客户端：" + sid + "的信息:" + message);
    }

    /**
     * 连接关闭调用的方法
     *
     * @param sid
     */
    @OnClose
    public void onClose(@PathParam("sid") String sid) {
        System.out.println("连接断开:" + sid);
        sessionMap.remove(sid);
    }

    /**
     * 群发
     *
     * @param message
     */
    public void sendToAllClient(String message) {
        Collection<Session> sessions = sessionMap.values();
        for (Session session : sessions) {
            try {
                //服务器向客户端发送消息
                session.getBasicRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
```

#### websocket回调函数

##### @OnOpen开启回调

#### 补:webSocket前端代码

提供一个随机的sessionID

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>WebSocket Demo</title>
</head>
<body>
    <input id="text" type="text" />
    <button onclick="send()">发送消息</button>
    <button onclick="closeWebSocket()">关闭连接</button>
    <div id="message">
    </div>
</body>
<script type="text/javascript">
    var websocket = null;
    var clientId = Math.random().toString(36).substr(2);

    //判断当前浏览器是否支持WebSocket
    if('WebSocket' in window){
        //连接WebSocket节点
        websocket = new WebSocket("ws://localhost:8080/ws/"+clientId);
    }
    else{
        alert('Not support websocket')
    }

    //连接发生错误的回调方法
    websocket.onerror = function(){
        setMessageInnerHTML("error");
    };

    //连接成功建立的回调方法
    websocket.onopen = function(){
        setMessageInnerHTML("连接成功");
    }

    //接收到消息的回调方法
    websocket.onmessage = function(event){
        setMessageInnerHTML(event.data);
    }

    //连接关闭的回调方法
    websocket.onclose = function(){
        setMessageInnerHTML("close");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function(){
        websocket.close();
    }

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML){
        document.getElementById('message').innerHTML += innerHTML + '<br/>';
    }

    //发送消息
    function send(){
        var message = document.getElementById('text').value;
        websocket.send(message);
    }
	
	//关闭连接
    function closeWebSocket() {
        websocket.close();
    }
</script>
</html>
```

## Actuator监控信息

SpringBoot自带监控功能Actuator，可以帮助实现对程序内部运行情况监控，比如监控状况、Bean加载情况、配置属性，日志信息等。

依赖坐标

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

之后访问 就可以了

```
http://localhost:8080/actuator
```

之后会得到返回的json，显示的是开放的可查询信息

```json
{
    "_links": {
        "self": {
            "href": "http://localhost:8081/actuator",
            "templated": false
        },
        "health-path": {
            "href": "http://localhost:8081/actuator/health/{*path}",
            "templated": true
        },
        "health": {
            "href": "http://localhost:8081/actuator/health",
            "templated": false
        }
    }
}
```

#### Endpoints监控端点

Actuator中的核心概念，目的是给外部来与应用程序进行访问和交互。

# 第三方包

## lombok工具包

是一个库，在新建springboot项目时在 **Developer Tools** 中可以直接添加

在生成类的时候需要写一大堆java bean非常麻烦且难看，使用lombok能优化代码

Lombok是一个实用的]ava类库，能通过注解的形式自动生成构造器、getter/setter、equals、hashcode、tostring等方法，并可以自动化生成日志变量，简化java开发、提高效率

| 注解                             | 作用                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| @Getter/@Setter                  | 为所有的属性提供get/set方法                                  |
| @ToString                        | 会给类自动生成易阅读的 toString 方法                         |
| @EqualsAndHashCode               | 根据类所拥有的非静态字段自动重写 equals 方法和 hashcode 方法 |
| @Data（最常用的，前面4个的集合） | 供了更综合的生成代码功能(@Getter+@Setter+@ToString+@EqualsAndHashCode） |
| @NoArgsConstructor               | 为实体类生成无参的构造器方法                                 |
| @AllArgsConstructor              | 为实体类生成除了static修饰的字段之外带有各参数的构造器方法。 |

pom.xml配置，在springboot使用时不需要指定版本，内置有了

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.22</version>
</dependency>
```

也可以在创建springboot项目时添加在 Developer Tools 中选择 Lombok

#### lombok版本问题！

在java高版中可能会因为引入了低版本的lombok报错，建议使用的最低版本

```
<lombok>1.18.30</lombok>
```

#### @Getter/@Setter

自动生成getter和setter方法

#### @ToString

自动生成toString方法

#### @EqualsAndHashCode

自动生成 equals() 和 hashCode()方法。

#### @RequiredArgsConstructor

为 `final` 字段或 `@NonNull` 注解的字段生成构造方法。

#### @Data

综合注解，包括 @Getter、@Setter、@ToString、@EqualsAndHashCode、@RequiredArgsConstructor      

**@Data没有有参构造和无参构造**

#### @NoArgsConstructor

生成无参构造方法。

#### @AllArgsConstructor

生成全参构造方法（包含所有字段）

#### @Accessors

```java
@Accessors(chain = true)

// 使用示例：
User user = new User()
    .setName("Alice")
    .setAge(25);
```

生成链式调用

#### @Builder

提供类的 `Builder` 模式，可以方便地创建复杂对象

**与传统的直接new不同，需要注意**

```java
@Builder
public class User {
    private String name;
    private int age;
}

// 使用
User user = User.builder()
  .name("Alice")
  .age(30)
  .build();
```

#### @Slf4j

自动为类添加 `private static final Logger log`，用于日志记录。

## jUnit单元测试

**警告：在测试类中的package必须和main函数的包名相同**

JUnit的主要版本是JUnit 4和JUnit 5，通常使用JUnit 5。4和5有较大差别，下面是一些基本概念：

- **测试类**：包含测试方法的类。
- **测试方法**：使用注解`@Test`标记的方法，是你想要测试的方法。
- **断言（Assertions）**：用于验证测试结果的工具，常用的有`assertEquals`、`assertTrue`、`assertFalse`等。

**maven导入**

```xml
//junit5
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>
//junit4
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```

#### Junit测试步骤

1. 建立与mian包同级的test软件包，包中有与mian包下相同的java包和域名反写的软件包软件包，不同的包编写测试类
2. 在需要测试的方法上添加@Test注解，代表为测试类
3. 通过assertEquals判断结果的正确性
4. 通过maven中的生命周期test执行

实例

```java
import org.testng.annotations.Test;
import static org.junit.Assert.assertEquals;

//JUnit4
public class CalculatorTest {
    @Test
    public void myFirstTest() {
        assertEquals(2+2, 5);
    }
}
```

#### JUnit注解

基于Junit4

| **注解**    | **说明**                      |
| ----------- | ----------------------------- |
| @Test       | 标识一条测试用例。            |
| @Ignore     | 忽略的测试用例。在@Test上添加 |
| @Before     | 每一个测试方法之前运行。      |
| @After      | 每一个测试方法之后运行。      |
| @BefreClass | 所有测试开始之前运行。        |
| @AfterClass | 所有测试结果之后运行。        |

实例

```java
import static org.junit.Assert.assertEquals;

import org.junit.Ignore;
import org.junit.Test;

//验证超时
@Test(timeout=100)
public void testAdd() throws InterruptedException {
    Thread.sleep(11);
    new Count().add(1, 1);
}

//验证抛出异常
@Test(expected=ArithmeticException.class)
public void testDivision() {
    new Count().division(8, 0);
}

// 跳过该条用例
@Ignore
@Test
public void testAdd2() {
    Count count = new Count();
    int result = count.add(2,2);
    assertEquals(result, 5);
}
```

#### @Before/After

在测试类开始执行前后运行的代码

```java
//在当前测试类开始时运行。
@BeforeClass
public static void beforeClass(){
    System.out.println("-------------------beforeClass");
}

//在当前测试类结束时运行。
@AfterClass
public static void afterClass(){
    System.out.println("-------------------afterClass");
}

//每个测试方法运行之前运行
@Before
public void before(){
    System.out.println("=====before");
}

//每个测试方法运行之后运行
@After
public void after(){
    System.out.println("=====after");
}

@Test
public void testAdd1() {
    int result=new Count().add(5,3);
    assertEquals(8,result);
    System.out.println("test Run testadd1");
}

@Test
public void testAdd2() {
    int result=new Count().add(15,13);
    assertEquals(28,result);
    System.out.println("test Run testadd2");
}
```

#### 断言方法

| 方法                                  | 说明                                                       |
| :------------------------------------ | :--------------------------------------------------------- |
| assertArrayEquals(expecteds, actuals) | 查看两个数组是否相等。                                     |
| assertEquals(expected, actual)        | 查看两个对象是否相等。类似于字符串比较使用的equals()方法。 |
| assertNotEquals(first, second)        | 查看两个对象是否不相等。                                   |
| assertNull(object)                    | 查看对象是否为空。                                         |
| assertNotNull(object)                 | 查看对象是否不为空。                                       |
| assertSame(expected, actual)          | 查看两个对象的引用是否相等。类似于使用“==”比较两个对象。   |
| assertNotSame(unexpected, actual)     | 查看两个对象的引用是否不相等。类似于使用“!=”比较两个对象。 |
| assertTrue(condition)                 | 查看运行结果是否为true。                                   |
| assertFalse(condition)                | 查看运行结果是否为false。                                  |
| assertThat(actual, matcher)           | 查看实际值是否满足指定的条件。                             |
| fail()                                | 让测试失败。                                               |

#### 结果分析

在执行test后会输出

```
[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.496 s -- in cc.liyinghao.CalculatorTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  4.642 s
[INFO] Finished at: 2024-08-24T15:20:32+08:00
[INFO] ------------------------------------------------------------------------
```

#### 注意事项

1. 避免在测试类的函数使用参数，会产生ParameterResolutionException

## hutool-all工具包

内含很多工具包，下载量很大，非常流行

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.16</version>
</dependency>
```

#### 官方文档

https://www.hutool.cn/docs

#### DateUtil-时间工具

在time之后，常用来判断过期

```
DateUtil.offsetSecond(created,time)
```

#### RandomUtil-随机数

生成6位随机数

```java
RandomUtil.randomNumbers(6);
```

#### JSONUtil-map转json

map转json，非常好用

```java
Map<String, String> jsonData = new TreeMap<>();
jsonData.put("1", "1.jpg");
jsonData.put("2", "2.jpg");
JSONUtil.toJsonStr(jsonData); //直接返回String类
```

#### HttpUtil-发起http请求

发送简易http请求，复杂http请求可以使用

#### Validator-字段验证

字段验证器，可以对不同格式的字符串进行验证，比如邮箱、手机号、IP等格式。

```java
//判断是否为邮箱地址
boolean result = Validator.isEmail("macro@qq.com");
LOGGER.info("Validator isEmail:{}", result);
//判断是否为手机号码
result = Validator.isMobile("18911111111");
LOGGER.info("Validator isMobile:{}", result);
//判断是否为IPV4地址
result = Validator.isIpv4("192.168.3.101");
LOGGER.info("Validator isIpv4:{}", result);
//判断是否为汉字
result = Validator.isChinese("你好");
LOGGER.info("Validator isChinese:{}", result);
//判断是否为身份证号码（18位中国）
result = Validator.isCitizenId("123456");
LOGGER.info("Validator isCitizenId:{}", result);
//判断是否为URL
result = Validator.isUrl("http://www.baidu.com");
LOGGER.info("Validator isUrl:{}", result);
//判断是否为生日
result = Validator.isBirthday("2020-02-01");
LOGGER.info("Validator isBirthday:{}", result);
```

#### CaptchaUtil-验证码

验证码工具类，可用于生成图形验证码

```java
//生成验证码图片
LineCaptcha lineCaptcha = CaptchaUtil.createLineCaptcha(200, 100);
try {
    request.getSession().setAttribute("CAPTCHA_KEY", lineCaptcha.getCode());
    response.setContentType("image/png");//告诉浏览器输出内容为图片
    response.setHeader("Pragma", "No-cache");//禁止浏览器缓存
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expire", 0);
    lineCaptcha.write(response.getOutputStream());
} catch (IOException e) {
    e.printStackTrace();
}
```

#### SecureUtil-加密

加密解密工具类，可用于MD5加密

```java
//MD5加密
String str = "123456";
String md5Str = SecureUtil.md5(str);
LOGGER.info("secureUtil md5:{}", md5Str);
```

#### ServletUtil-客户端信息

需要依赖

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <!-- 此包一般在Servlet容器中都有提供 -->
    <scope>provided</scope>
</dependency>
```

- `getParamMap` 获得所有请求参数
- `fillBean` 将请求参数转为Bean
- `getClientIP` 获取客户端IP，支持从Nginx头部信息获取，也可以自定义头部信息获取位置
- `getHeader`、`getHeaderIgnoreCase` 获得请求header中的信息
- `isIE` 客户浏览器是否为IE
- `isMultipart` 是否为Multipart类型表单，此类型表单用于文件上传
- `getCookie` 获得指定的Cookie
- `readCookieMap` 将cookie封装到Map里面
- `addCookie` 设定返回给客户端的Cookie
- `write` 返回数据给客户端
- `setHeader` 设置响应的Header

## Swagger自动文档

注：openAPI等文档规范在后端技术文档中

只需要按照它的规范去定义接口及接口相关的信息，就可以做到生成接口文档，以及在线接口调试页面

无需使用注解，可以通过自动扫描生成接口文档

- Springboot2

    ```xml
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-boot-starter</artifactId>
        <version>3.0.0</version>
    </dependency>
    ```

- springboot2可用依赖

    ```xml
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-boot-starter</artifactId>
        <version>3.0.0</version>
        <exclusions>
            <exclusion>
                <groupId>io.swagger</groupId>
                <artifactId>swagger-models</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    
    <!-- 防止进入swagger页面报类型转换错误，排除3.0.0中的引用，手动增加1.6.2版本 -->
    <dependency>
        <groupId>io.swagger</groupId>
        <artifactId>swagger-models</artifactId>
        <version>1.6.2</version>
    </dependency>
    ```

    如果是springboot 2.6 以上，需要修改配置文件

    ```protobuf
    # 解决swagger空指针异常
    spring.mvc.pathmatch.matching-strategy=ANT_PATH_MATCHER
    ```

    springboot2.6与swagger2.9.2整合 报出空指针异常的，是因为 springboot2.6.0 中将SpringMVC 默认路径匹配策略从AntPathMatcher更改为PathPatternParser application.properties加上这个 spring.mvc.pathmatch.matching-strategy=ant_path_matcher

#### 文件上传文件

如果单文件上传不了，使用 @RequestPart("file")

如果多文件上传不了，那就真的上传不了

#### Swagger更多注解

参考下表

| 注解              | 说明                                                   | 举例                    |
| ----------------- | ------------------------------------------------------ | ----------------------- |
| @Api              | 用在类上，例如Controller，表示对类的说明               | @Api(tags = "用户管理") |
| @ApiModel         | 用在类上，例如entity、DTO、VO                          |                         |
| @ApiModelProperty | 用在属性上，描述属性信息                               |                         |
| @ApiOperation     | 用在方法上，例如Controller的方法，说明方法的用途、作用 |                         |

#### Swagger配置文件（实验性）

```yml
# Swagger配置
swagger:
  # 是否开启swagger
  enabled: true
  # 请求前缀
  pathMapping: /dev-api
```

#### swagger对应springboot依赖版本问题

非必要！适用版本2.6～2.7

在main函数上添加注解

```java
@EnableWebMvc
```

#### swagger2与openAPI3注解问题

不同版本注解不一样

swagger2

- `@Api`:定义接口分组名称
- `@ApiImplicitParam`: 单个参数注释
- `@ApiImplicitParams`:多个参数注释
- `@ApiModel`:实体类定义
- `@ApiModelProperty`:实体属性定义
- `@ApiOperation`:接口定义
- `@ApiParam`:参数注释
- `@ApiResponse`:响应码
- `@ApiResponses`:多个响应码

openAPI3

| Swagger3                                                     | 注解说明                                              |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| @Tag(name = “接口类描述”)                                    | Controller 类                                         |
| @Operation(summary =“接口方法描述”)                          | Controller 方法                                       |
| @Parameters                                                  | Controller 方法                                       |
| @Parameter(description=“参数描述”)                           | Controller 方法上 @Parameters 里Controller 方法的参数 |
| @Parameter(hidden = true) 、@Operation(hidden = true)@Hidden | 排除或隐藏api                                         |
| @Schema                                                      | DTO实体DTO实体属性                                    |

#### swagger缺少multipart

修改@RequestParam("files")为@RequestPart("file")

## Knife4j自动文档

**Knife4j：**为Java MVC框架集成Swagger生成Api文档的增强解决方案，为Swagger的增强版，本质上就是换了个UI

在规范一致的情况下注解也完全相同，并且比swagger配置更简单

- springboot2官方推荐

  ```xml
  <dependency>
      <groupId>com.github.xiaoymin</groupId>
      <artifactId>knife4j-openapi2-spring-boot-starter</artifactId>
      <version>4.4.0</version>
  </dependency>
  ```

- Springboot3官方推荐

    ```xml
    <dependency>
        <groupId>com.github.xiaoymin</groupId>
        <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
        <version>4.4.0</version>
    </dependency>
    ```

- 备选（最容易出bug的版本，尽量不要使用）

    ```xml
    <dependency>
        <groupId>com.github.xiaoymin</groupId>
        <artifactId>knife4j-spring-boot-starter</artifactId>
        <version>3.0.2</version> # 2.7可用
    </dependency>
    
    可能需要配置
    # spring.mvc.pathmatch.matching-strategy=ANT_PATH_MATCHER
    ```

**使用方法**

1. 导入 knife4j的maven坐标
2. 在配置类中加入 knife4j 相关配置，也可以使用配置文件(推荐)，无需配置配置类
3. 设置静态资源映射，否则接口文档页面无法访问(配置文件 无需配置映射）

配置文件

```yml
knife4j:
  enable: true
  openapi:
    title: Knife4j官方文档
    description: "`我是测试`,**你知道吗**
    # aaa"
    email: xiaoymin@foxmail.com
    concat: 八一菜刀
    url: https://docs.xiaominfo.com
    version: v4.0
    license: Apache 2.0
    license-url: https://stackoverflow.com/
    terms-of-service-url: https://stackoverflow.com/
    group:
      test1:
        group-name: 分组名称
        api-rule: package
        api-rule-resources:
          - com.knife4j.demo.new3
```

配置类

```java
@Configuration
@Slf4j
public class WebMvcConfiguration extends WebMvcConfigurationSupport {

    @Bean
    public Docket docket() {
        ApiInfo apiInfo = new ApiInfoBuilder()
                .title("xxx项目接口文档")
                .version("2.0")
                .description("xxx项目接口文档")
                .build();
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo)
                .select()
                .apis(RequestHandlerSelectors.basePackage("cc.liyinghao.sp2server.controller"))
                .paths(PathSelectors.any())
                .build();
    }
    
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
    }
}
```

其中重点如下

1. 指定扫描的包

    ```java
    .apis(RequestHandlerSelectors.basePackage("com.sky.controller")
    ```

2. 指定静态资源路径

    ```java
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
      registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
    }
    ```

之后就可以通过访问，来测试查看接口文档了

地址：http://127.0.0.1:8080/doc.html

#### Knife4j 404问题

使用配置类可以出现此问题

bug为knife4资源404 No mapping for GET 

额外在静态资源中添加了，解决了

```java
registry.addResourceHandler("swagger-ui.html")
        .addResourceLocations("classpath:/META-INF/resources/");
registry.addResourceHandler("/webjars/**")
        .addResourceLocations("classpath:/META-INF/resources/webjars/");
```

#### Knife4j 文件上传扫描异常

使用配置类可以出现此问题

设置规范为swagger2 即可

new Docket(DocumentationType.SWAGGER_2)

## log日志

Simple Logging Facade for Java 简单日志外观为了java

是private static logger log= LoggerFactory.getlogger(DeptController.class);的简写

在类上添加**@Slf4j注解(简化)**后直接使用log.info在控制台输出 

```java
@Slf4j //日志
@RestController
public class UserController {

    @RequestMapping("/")
    public String sayHello() {
        log.info("Hello, spring");
        return "Hello, spring";
    }
}
```

#### 持久化配置文件

配置文件配置，可以在常规的yml配置文件中，也常见xml配置文件进行配置

命名规范为_ 在springboot启动时会自动识别，也可以叫logback.xml，但是-spring优先级最高

```
logback-spring.xml
```

无配置是直接输出到控制台上的，通过配置可以保存log文件

```properties
# 设置日志文件名和路径
logging.file.name=logs/spring-boot-application.log  #之后会在根目录生成logs文件夹

# 设置日志级别
logging.level.root=INFO
logging.level.com.example=DEBUG

# 设置日志文件大小和轮转
logging.logback.rollingpolicy.max-file-size=10MB
logging.logback.rollingpolicy.max-history=7
```

在其中，有一些相关概念

1. **日志大小**

    日志文件大小指的是一个单个日志文件可以达到的最大存储容量。通常，日志框架允许你设置一个日志文件的最大大小，当日志文件达到这个限制时，会进行日志轮转（rotation），即创建一个新的日志文件来存储接下来的日志数据。

2. **日志轮转**

    日志轮转是当日志文件达到设定的大小或时间时，自动创建新的日志文件的过程。轮转后，旧的日志文件会被重命名，通常带有时间戳或序号，新的日志将写入一个新的文件。例如，`app.log` 在轮转后可能变为 `app.log.1` 或 `app-20230910.log`。轮转可以根据文件大小、时间间隔（每天、每周等）来进行控制

3. **日志级别**

    日志级别决定了哪些日志消息会被记录。常见的日志级别从低到高如下，其中为代码中log的方式

    - **TRACE**: 最详细的日志级别，记录非常详细的系统调试信息。
    - **DEBUG**: 调试信息，通常用于开发过程中了解系统的运行情况。
    - (常用)**INFO**: 主要用于记录系统运行中的关键信息，如启动、关闭等。
    - **WARN**: 警告信息，表明可能存在问题，但系统可以继续运行。
    - **ERROR**: 错误信息，表明系统遇到了严重问题，可能无法继续运行。
    - **FATAL**: 严重错误，系统可能会崩溃。

##### Logger/Appender日志记录/附加器/配置文件

1. **property**：**定义全局属性变量**，用于配置文件中的占位符引用，方便集中管理路径、格式等属性。

    - name：名称
    - value：值

2. **appender**：**定义日志输出方式**，如控制台、文件、滚动文件等。不同的 `class` 可以定义不同的 Appender 类型。

    - name：名称
    - class：不同的 Appender 类型，为slf4j提供的

3. **encoder**：**定义日志格式**

    - pattern：子标签，用于定义格式

4. (主要)**root**：**全局配置**默认日志级别和输出方式，只能有一个root

    - level：根日志级别，只有高于指定日志级别的才会输出，目的是配置最低输出的日志级别
    - appender-ref：子标签，将定义的 appender 关联到 logger 或root上

5. **logger**：定义指定包或类的日志记录器，用于设置不同模块的日志级别、是否继承 `root` 配置等。

    - (主要)name：指定这个 logger 所关联的**类或包的名称**。Logback 会将日志请求与对应的 logger 匹配。
    - level：根日志级别，只有高于指定日志级别的才会输出，目的是配置最低输出的日志级别
    - additivity：控制日志是否会被传递到父 logger。会重复输出

6. **filter**：**过滤**，常为appender的子标签

    - class：有多种，推荐使用ch.qos.logback.core.filter.ThresholdFilter

    - level：要过滤的日志级别

    - onMatch：当日志事件的级别与指定的级别匹配时，采取的操作 ，可选值：ACCEPT(接受),DENY(否认),NEUTRAL(中性)

    - onMismatch：当日志事件的级别与指定的级别不匹配时 ，可选值：ACCEPT(接受),DENY(否认),NEUTRAL(中性)

    - 案例：

        ```xml
        <appender name="FILTERED_CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
            <encoder>
                <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5level %msg%n</pattern>
            </encoder>
            <filter class="ch.qos.logback.classic.filter.LevelFilter">
                <level>INFO</level>
                <onMatch>DENY</onMatch>
                <onMismatch>NEUTRAL</onMismatch>
            </filter>
            <filter class="ch.qos.logback.core.filter.ThresholdFilter">
                <level>WARN</level>
            </filter>
        </appender>
        ```

        - 第一个 LevelFilter 拒绝所有 INFO 级别的日志事件。
        - 第二个 ThresholdFilter 只允许 WARN 及以上级别的日志通过。
        - 最终，控制台只会显示 WARN 和 ERROR 级别的日志。

##### appender类(class)选择问题

- ConsoleAppender：用于控制台
- FileAppender：用于文件

#### 彩色log

无需任何配置和插件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <include resource="org/springframework/boot/logging/logback/defaults.xml" />

    <!-- 定义日志文件路径 -->
    <property name="INFO_PATH" value="./logs/info.log"/>
    <property name="ERROR_PATH" value="./logs/error.log"/>

    <!-- 日志输出格式 -->
    <property name="log.pattern" value="%d{HH:mm:ss.SSS} [%thread] %-5level %logger{20} - [%method,%line] - %msg%n"/>
    <!-- 带有颜色的 -->
    <property name="log.console" value="%clr([%d{yyyy-MM-d HH:mm:ss.SSS}]){white,faint} %clr([%thread]){white} %highlight([%level]) %clr([%logger{20}:%method:%line]){white,faint} %clr(====>){blue} %msg%n" />

    <!-- 控制台输出格式 appender -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>${log.console}</pattern>
        </layout>
    </appender>

    <!-- INFO 级别日志文件输出 -->
    <appender name="INFO_FILE" class="ch.qos.logback.core.FileAppender">
        <file>${INFO_PATH}</file>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
    </appender>

    <!-- ERROR 级别日志文件输出 -->
    <appender name="ERROR_FILE" class="ch.qos.logback.core.FileAppender">
        <file>${ERROR_PATH}</file>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
    </appender>

    <!-- 全局日志级别及输出配置 -->
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="INFO_FILE"/>
    </root>

    <!-- 定义一个 logger 专门处理 ERROR 级别日志并输出到 ERROR_FILE -->
    <!--    <logger name="cc.liyinghao.zcserver.controller.LogTestController" level="INFO" additivity="false">-->
    <!--&lt;!&ndash;        <appender-ref ref="CONSOLE"/>&ndash;&gt;-->
    <!--        <appender-ref ref="ERROR_FILE"/>-->
    <!--    </logger>-->

</configuration>
```

其中

```
<include resource="org/springframework/boot/logging/logback/defaults.xml" />
```

为springboot包下的大量提供好的样式函数，为实现不同样式的基础

## 其他日志包

- Log4j：非常古老的日志包，2015年就停了，现在还有Log4j 2
- Logback：logback 是由 log4j 创始人设计的又一个开源日志组件，作为流行的 log4j 项目的后续版本，从而替代 log4j

总体来说还是建议使用Slf4j

- logback依赖

```xml
<dependency>
  <groupId>net.logstash.logback</groupId>
  <artifactId>logstash-logback-encoder</artifactId>
  <version>7.4</version>
</dependency>
```

## fastjson

阿里的库

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.83</version>
</dependency>
```

常见API

| 函数                              |              |
| --------------------------------- | ------------ |
| JSONObject.toJSONString(str);     | json转String |
| JSON.toJSONString(accountInfoMap) | 转j为son     |

## hippo4j线程池加强

java线程池加强

## kaptcha验证码

免费的验证服务，生成很丑的验证码，常见的输入验证码验证

若以使用

maven仓库

```xml
<dependency>
  <groupId>com.github.penggle</groupId>
  <artifactId>kaptcha</artifactId>
  <version>2.3.2</version>
</dependency>
```

使用流程

1. 建立配置类
2. 在使用时注入，将验证码放到session中，之后骄阳匹配

配置类

```java
@Configuration
public class KaptchaConfig {

    @Bean
    public DefaultKaptcha producer() {
        Properties properties = new Properties();

        // 设置是否有边框，"no" 表示没有边框
        properties.put("kaptcha.border", "no");

        // 设置边框颜色，RGB 格式
        properties.put("kaptcha.border.color", "105,179,90");

        // 设置验证码图片的宽度
        properties.put("kaptcha.image.width", "160");

        // 设置验证码图片的高度
        properties.put("kaptcha.image.height", "60");

        // 设置验证码文字的颜色
        properties.put("kaptcha.textproducer.font.color", "blue");

        // 设置验证码字符的长度，这里是 4 个字符
        properties.put("kaptcha.textproducer.char.length", "4");

        // 设置验证码文字的字体大小 字体样式
        properties.put("kaptcha.textproducer.font.names", "Arial,Courier,Georgia");
        properties.put("kaptcha.textproducer.font.size", "35"); // 适度增加字体大小，使识别更困难

        // 设置干扰线的颜色
        properties.put("kaptcha.noise.color", "black");

        // 设置背景颜色渐变的起始颜色
        properties.put("kaptcha.background.clear.from", "white");

        // 设置背景颜色渐变的结束颜色
        properties.put("kaptcha.background.clear.to", "blue");

        // 设置验证码图片样式，这里使用阴影效果
        //properties.put("kaptcha.obscurificator.impl", "com.google.code.kaptcha.impl.ShadowGimpy");
        //properties.put("kaptcha.obscurificator.impl", "com.google.code.kaptcha.impl.FishEyeGimpy");

        // 创建并配置 DefaultKaptcha 实例
        DefaultKaptcha kaptcha = new DefaultKaptcha();
        kaptcha.setConfig(new Config(properties));
        return kaptcha;
    }
}
```

使用案例

```java
@Autowired
private DefaultKaptcha kaptcha;


@GetMapping("/captcha")
public void getCaptcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
  // 生成验证码文本
  String captchaText = kaptcha.createText();
  // 将验证码文本保存到 session 中
  request.getSession().setAttribute("captcha", captchaText);
  // 生成验证码图片
  BufferedImage captchaImage = kaptcha.createImage(captchaText);
  response.setContentType("image/jpeg");
  // 禁止缓存
  response.setHeader("Cache-Control", "no-store, no-cache");
  response.setHeader("Pragma", "no-cache");
  response.setDateHeader("Expires", 0);
  // 将图片写入响应
  ImageIO.write(captchaImage, "jpeg", response.getOutputStream());
}

@PostMapping("/verifyCaptcha")
public ResponseEntity<String> verifyCaptcha(HttpServletRequest request, @RequestBody Map<String, String> requestBody) {
  // 从 session 中获取存储的验证码
  String storedCaptcha = (String) request.getSession().getAttribute("captcha");

  // 检查用户输入的验证码是否与存储的验证码匹配
  if (storedCaptcha != null && storedCaptcha.equals(requestBody.get("captchaInput"))) {
    // 验证通过
    return ResponseEntity.ok("验证码验证通过");
  } else {
    // 验证失败
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("验证码验证失败");
  }
}
```

## Caffeine缓存库

高性能，轻量级的嵌入式缓存库，具有丰富功能可以实现

- 容量的自动驱逐
- 基于时间的缓存失效
- 缓存加载
- 异步操作

与redis的区别如下

- 是一个嵌入式的**本地缓存库**，直接运行在应用程序的 JVM 内部，不需要独立的服务或网络支持
- 数据存储在应用的内存中（堆内存或直接内存）
- 缓存数据的容量受限于 JVM 内存大小
- 不支持数据持久化操作

```xml
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```



## houbb敏感词过滤

## ip2region IP地址查询

## reflections扫描类路径

用于在运行时扫描类路径，以查找类、方法、字段、注解等相关信息。这在需要动态反射或者运行时发现类型信息的场景中非常有用

独立与spring框架

```xml
<dependency>
    <groupId>org.reflections</groupId>
    <artifactId>reflections</artifactId>
    <version>0.10.2</version>
</dependency>
```

**主要功能**

1. **扫描类路径**：发现特定包、类、注解或方法。
2. **查找子类**：快速找到某个类的所有实现类或子类。
3. **查找注解**：找到某个注解标记的类、方法或字段。
4. **查找方法和字段**：根据条件（如方法名、返回类型等）查找匹配的方法或字段。

## 微信登录

#### 官方文档

https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html

## Flyway-数据库版本控制

用来自动创建sql表的

## HttpClient

是Apache Jakarta Common 下的子项目，可以发送http请求

- maven坐标

```xml
<dependency>
    <groupId>org.apache.httpcomponents</groupId>	
    <artifactId>httpclient</artifactId>
    <version>4.5.13</version>
</dependency>
```

核心API:

- HttpClient
- HttpClients
- CloseableHttpClient
- HttpGet
- HttpPost

发送请求步骤:

1. 创建HttpClient对象
2. 创建Http请求对象
3. 调用HttpClient的execute方法发送请求
