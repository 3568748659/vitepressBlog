*2024/12/14，学习知识形文档移动到spring文档中，本文档仅为api声明与快速启动

2024/10/17，去除后端根文档地位，业务移动到后端场景文档中

....

QA墙已经防在java其他中了

# 内置工具类

spring内置

## BeanUtils

org.springframework.beans.BeanUtils;

#### 对象属性拷贝

可以直接把相同名称的属性进行复制，简化set方法

```java
//employee.setUsername(employeeDTO.getUsername());
//employee.setName(employeeDTO.getName());
//employee.setPhone(employeeDTO.getPhone());
//employee.setSex(employeeDTO.getSex());

//对象属性拷贝,属性名必须是一样的
BeanUtils.copyProperties(employeeDTO, employee);

Employee employee = new Employee();
BeanUtils.copyProperties(employeeDTO, employee);
employeeMapper.update(employee);
```

## WebUtils

## DigestUtils

#### MD5加密

加密

```java
DigestUtils.md5DigestAsHex(rawPassword.toString().getBytes());
```

验证（与加密的进行对比）

```java
encodedPassword.equals(DigestUtils.md5DigestAsHex(rawPassword.toString().getBytes()));
```

## jackson

springMVC自带的json解析工具

maven坐标（**SpringBoot无需引入**）

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.17.2</version>
</dependency>
```

ObjectMapper为jackson中的json解析类

- 序列化

    ```java
    ObjectMapper mapper = new ObjectMapper();
    
    // 序列化
    User user = new User("Alice", 25);
    String jsonString = mapper.writeValueAsString(user);//序列化
    System.out.println(jsonString);
    ```

- 反序列化

    ```java
    ObjectMapper mapper = new ObjectMapper();
    // 反序列化
    String jsonInput = "{\"name\":\"Bob\",\"age\":30}";
    User userFromJson = mapper.readValue(jsonInput, User.class); //反序列化
    System.out.println(userFromJson.getName());
    System.out.println(userFromJson.getAge());
    ```

## ResponseEntity响应实体

spring框架提供， 通用的返回实体，目的是设置返回给前端的状态码，非json类型

1. 400 badRequest

    ```java
    ResponseEntity.badRequest().body(message);
    ```

# IOC-DI依赖注入控制反转

spring中的核心概念，**目的是降低代码的耦合度，使引入更加灵活**

- **控制反转**:Inversion Of Control，简称IOC对象的创建控制权由程序自身转移到外部(**容器**（IOC容器/spring容器）)，由ioc创建与管理这些对象，这种思想称为控制反转。

- **依赖注入**: DependencyInjection，简称Dl。容器为应用程序提供运行时，所依赖的资源，称之为依赖注入。

- **Bean对象**:IOC容器中创建、管理的对象，称之为bean对象。

就是把对象丢进spring容器中，之后其他层要就自动去spring容器中去找，在修改其他层的时候就不用改名字了

**实现过程**

1. swrvice层及Dao层成的实现类，交给OIC**容器管理**  `@Component `（控制反转，把控制交给容器）
2. 为Controller及Service注入运行时依赖的对象  `@Autowired`（依赖注入，从容器中获取IOC对象）

**idea查看bean关系**

在运行框中的Actuator中Bean  白色的就是自己的bean

## bean组件扫描

bean要想生效，还需要被组件扫描注解@ComponentScan扫描。在main函数上添加

```java
@SpringBootApplication  //默认扫描当前包及其子包
```

@Componentscan注解虽然没有显式配置，但是实际上已经包含在了启动类声明注解 @SpringBootApplication中，默认扫描的范围是

**！启动类所在包及其子包(在多模块开发时非常重要，以package命为例，扫描当前包及其子包)**。

其他地方也可以，但是需要配置

## @Component声明bean

目的是让spring自动创建并管理bean，为自己写的bean

Component为主注解，其他三个为衍生注解，功能是一样的

| 注解        | 说明                 | 位置                                                    |
| ----------- | -------------------- | ------------------------------------------------------- |
| @Component  | 声明bean的基础注解   | 不属于以下三类时，用此注解                              |
| @Controller | @Component的衍生注解 | 标注在控制器类上                                        |
| @Service    | @Component的衍生注解 | 标注在业务类上   service层类上                          |
| @Repository | @Component的衍生注解 | 标注在数据访问类上(由于与mybatis整合，用的少) dao层上的 |

**注意**：

- bean是有名字的，声明bean的时候，可以通过value属性指定bean的名字，如果没有指定，默认为类名首字母小写。
- 使用以上四个注解都可以声明bean，但是在springboot集成web开发中，声明控制器bean只能用@Controller

## @Configuration三方bean

如果要管理的bean对象来自于第三方，是无法用 @Component及衍生注解声明bean的，就需要用到 @Bean 注解来控制返回的对象

适用于 **不能修改源码的类**（如 **第三方类**），或 **需要自定义 Bean 创建逻辑** 时使用

#### @Bean

在config包下建立CommonConfig类 声明为 @Configuration  配置类

```java
@Configuration //配置类
public class CommonConfig{
    //声明第三方bean
    @Bean //将当前方法的返回值对象交给IOC容器管理，成为IOC容器bean
    public SAXReader saxReader (){
        return new SAXReader();
    }
}
```

在配置类注解下，springBoot会自动创建@Bean下的对象并将返回的对象交给IOC容器管理

通过@Bean注解的name/value属性指定bean名称，如果未指定，默认是方法名

如果第三方bean需要依赖其它bean对象，直接在bean定义方法中设置形参即可，容器会根据类型自动装配。

```java
Object saxReader = applicationContext.getBean("saxReader");
```

**补：**@Component 及衍生注解 与 @Bean注解使用场景?

- 项目中自定义的，使用@Componznt及其衍生注解
- 项目中引入第三方的，使用@Bean注解

## bean注入

同样的同类bean只能有一个，出现多个就会报错

可以使用注解解决

- @Primary   在类头添加，主要的，如果有多个以这个为准
- @Qualifier 在Autowired下使用，`@Qualifier("beanA")(默认是类名（首字母小写）) `告诉Autowired使用哪个bean
- @Resource  按照名称注入（autowired是按照类型注入），为JDK提供，不使用autowired，直接在private 变量上写`Resource(name = "bean_name")`

#### @Autowired

spring框架提供

默认按照 **类型** 注入（by type）。

如果需要按名称注入，可以与 @Qualifier 配合使用

```java
@Autowired
@Qualifier("beanName")
private MyBean myBean;
```

##### 设置非必要注入

如果某个bean找不到也不报错，可以正常编译时使用

```java
@Autowired(required = false)
```

#### @Resource

java语言本体的依赖注入方式，属于javaEE规范，使用于全部的java框架

为按照名称注入，跟类型没有关系

**不推荐使用，相对于@Autowired更容易出问题，且需要配置**

- 默认按照 **名称** 注入（by name）。
- 如果找不到对应的名称，则按照 **类型** 注入（by type）。
- 可以通过 `name` 或 `type` 属性明确指定：

```java
@Resource(name = "beanName")
private MyBean myBean;
```

#### 构造函数注入对象

也是spring团队推荐的一种方式

**警告：避免在单元测试使用**

注入案例

```java
private final RedisTemplate<String, Object> redisTemplate;

// 构造函数注入
@Autowired  // 这个注解可以省略，Spring 4.3+ 会自动注入
public MyClass(RedisTemplate<String, Object> redisTemplate) {
    this.redisTemplate = redisTemplate;
}
```

可以使用lombok简化

```java
@RequiredArgsConstructor

private final UserMapper userMapper;
```

就可以注入了

## bean管理

对bean的生命周期进行管理，不常见

默认情况下，Spring项目启动时，会把bean都创建好放在I0C容器中，如果想要主动获取这些bean，可以通过如下方式

- 根据name获取bean
- 根据类型获取bean
- 根据name获取bean(带类型转换)

```java
DeptController bean1 = (DeptController) applicationcontext.getBean("deptController");
DeptController bean2 = applicationContext.getBean(DeptController.class);
DeptController bean3 = applicationContext.getBean( s: "deptController", DeptController.class);
```

**注：**上述所说的【Spring项目启动时，会把其中的bean都创建好】还会受到作用域及延迟初始化影响，这里主要针对于 默认的单例
非延迟加载的bean而言。

#### 延迟加载bean

通过注解延迟加载， 延迟初始化，延迟到第一次使用时，不使用不生成

```
@Lazy
```

#### 非单例模式

Spring支持五种作用域，后三种在web环境才生效，比较少见

prototype的bean，每一次使用该bean的时候都会创建一个新的实例。

实际开发当中，绝大部分的Bean是单例的，也就是说绝大部分Bean不需要配置scope属性。

通过配置注解来实现

```java
@scope("prototype")
```

| 作用域      | 说明                                           |
| ----------- | ---------------------------------------------- |
| singleton   | 容器内同 名称 的 bean 只有一个实例(单例)(默认) |
| prototype   | 每次使用该 bean 时会创建新的实例(非单例)       |
| request     | 每个请求范围内会创建新的实例(web环境中，了解)  |
| session     | 每个会话范围内会创建新的实例(web环境中，了解)  |
| application | 每个应用范围内会创建新的实例(web环境中，了解)  |

## 生命周期

#### @PostConstruct容器初始化完成后

在 Spring 容器初始化完成后自动执行方法常见于初始化数据库，配置数据库

```java
@PostConstruct
public void init() {}
```



# springMVC

通过maven和idea创建，在创建时选择Spring Boot 生成器与 Maven创建即刻

**多余文件**

- HELP.md
- mvnw
- mvnw.cmd

在其中resources中为静态文件与`application.properties`配置模板,java文件夹下为主要的代码 在每个包下新建包（controller）在其中以`Application`为结尾的是主函数

.mvn为保证使用同一版本的 Maven 校验

## Mapping/请求处理类

下面是一个案例，在注释解析这个案例，在其中 赋值的import和package idea都会自动引入

#### HelloWorld

```java
@RestController//声明这是一个请求处理类
public class Hello { //一个请求处理类
    @RequestMapping("/hello") //对哪个路径进行相应
    public String sayHello() { //执行的函数
        return "Hello, spring"; //返回内容
    }
}
```

**注意：**这个类直接编写，无需在任何main函数中引入，spring会根据语法糖找这个东西

在正常的接口返回模式下，一般返回一个Result类，为code  message  data  三层结构的json

```java
//请求处理类
@RestController
public class Hello {
    @RequestMapping("/")
    public Result sayHello() {
        return Result.success("Hello, Spring Boot!");
    }
}
```

#### 泛型Result

```java
@Data
public class Result<T> implements Serializable {

    private Integer code; //编码：1成功，0和其它数字为失败
    private String msg; //错误信息
    private T data; //数据

    public static <T> Result<T> success() {
        Result<T> result = new Result<T>();
        result.code = 1;
        return result;
    }

    public static <T> Result<T> success(T object) {
        Result<T> result = new Result<T>();
        result.data = object;
        result.code = 1;
        return result;
    }

    public static <T> Result<T> error(String msg) {
        Result result = new Result();
        result.msg = msg;
        result.code = 0;
        return result;
    }

}
```

#### 指定路径与方法

可以使用正常的RequesMapping指定 method 

```java
@RequestMapping(value ="/depts",method = RequestMethod.GET)//指定消求方式为GET
```

推荐使用**对应的注解**

- 处理get请求

    ```java
    @GetMapping("/hello")
    ```

- 处理post请求

    ```java
    @PostMapping("/hello") 
    ```

put   delete  同理

#### 公用路径抽取

在类头上加上注解，下文的全部

```java
@RequestMapping("/admin")
```

## 获取前端的参数

警告：字段必须匹配，不然无响应

#### 获取url参数

获取query

处理如{}这样的url，能获取参数（name age）

```
http://127.0.0.1:8080/Request?name=xxx&age=12  //处理的路径
```

原始方法通过HttpServletRequest获取，简化后直接根据名称获取就OK了

```java
@RequestMapping("/Request")
public String sayHello(String name,Integer age) {
  System.out.println("name: " + name + ", age: " + age);
  return "ok";
}
```

##### url参数映射

这个是参数映射，不是获取参数，参数不需要注解

通过`@RequestParam`能进行参数映射 路劲中的 names 为 name

```java
@RequestMapping("/Request")
public String sayHello(@RequestParam(name = "names") String name, Integer age) {
  System.out.println("name: " + name + ", age: " + age);
  return "ok";
}
```

**注意：**

@RequestParam中的required属性默认是true，代表必须传递，不传递会报错，添加required = false

```java
public String sayHello(@RequestParam(name = "names",required = false) String name, Integer age)
```

##### url多参数

如果参数中有多个相同名称的参数，可以使用同名数组进行接收

```
http://localhost:8080/arrayParam?hobby=game&hobby=java
```

- 数组

```java
@RequestMapping("/array")
public String array(String[] hobby) {
    System.out.println(Arrays.toString(hobby));
    return "ok";
} 
```

- 集合@RequestParam为必须

```java
@RequestMapping("/Requestpojo")
public String array(@RequestParam List<String> hobby) {
    System.out.println(hobby);
    return "ok";
}
```

##### 实体参数封装

如果url中的值过多，就封装到一个类中

```java
@RequestMapping("/Requestpojo")
public String pojo(User user) {
    System.out.println(user);
    return "ok";
}
```

#### @PathVariable获取请求路径

**获取的是路径，不是？后的参数**

使用{ }和@PathVariable获取url路径中的参数

```java
@RequestMapping("/url/{id}")
public String url(@PathVariable Integer id){
    System.out.println(id);
    return "ok";
}
```

多个也可以正常使用

```java
@RequestMapping("/url/{id}/{name}")
public String url(@PathVariable Integer id,@PathVariable String name){
    System.out.println(id);
    System.out.println(name);
    return "ok";
}
```

#### @DateTimeFormat获取日期时间参数

使用@DateTimeFormat确定日期的格式

```java
@RequestMapping("/time")
public String time(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")LocalDateTime time){
    System.out.println(time);
    return "ok";
}
```

#### @RequestBody获取请求体

JSON参数：JSON数据键名与形参对象属性名相同，定义POJO类型形参即可接收参数，需要使用 @RequestBody 标识

使用`@ReuestBody`来获取请求体中的json字符串，传给一个对象，对象必须和json相同

```java
@RequestMapping("/json")
public String json(@RequestBody User user){
    System.out.println(user);
    return "ok";
}
```

对于简单的请求体，也可以直接使用对应的数据结构进行接收

```java
@RequestBody Map<String, String> requestBody
```

## 参数格式化与校验

#### 时间格式化

##### @JsonFormat

使用 @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss") 修改返回给前端的时间格式

直接在想要改变格式的类的属性上添加

```java
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
private LocalDateTime createTime;
```

#### 扩展消息转换器转换时间

可以在WebMvcConfiguration中扩展Spring MVC的消息转换器，统一对日期类型进行格式化处理

#### @Pattern正则

在类的属性上添加

```java
@Pattern(regexp = "^\\d{3}$", message = "用户名必须是1到3位的字母或数字")
private String name;
```

之后在获取请求时添加@Vali验证字段

```java
@PostMapping("/Pattern")
public String hello(@Valid @RequestBody Business business) {
  log.info(business.toString());
  return "ok";
}
```

如何验证失败，会抛出异常，使用全局异常处理器处理

#### @Valid/@Validated参数校验

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("/register")
    public String register(@Valid @RequestBody User user) {
        return "注册成功";
    }
}

@Data
class User {
    @NotBlank(message = "用户名不能为空")
    private String name;

    @Email(message = "邮箱格式不正确")
    private String email;
}
```

#### @Email/@NotBlank校验包

邮箱验证/非空验证等，来自spring-boot-starter-validation包，默认不提供(jdk 17)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

**常见的校验注解**（`jakarta.validation.constraints` 包）

| 注解                            | 作用                                          |
| ------------------------------- | --------------------------------------------- |
| `@NotNull`                      | 字段不能为 `null`（但可以是 `""` 空字符串）   |
| `@NotBlank`                     | 不能为 `null` 且 **必须包含至少一个非空字符** |
| `@NotEmpty`                     | 不能为 `null` 且 **长度必须大于 0**           |
| `@Size(min=, max=)`             | 字符串、集合等的长度限制                      |
| `@Pattern(regexp=)`             | 使用正则表达式校验格式                        |
| `@Email`                        | 校验邮箱格式                                  |
| `@Min(value=)` / `@Max(value=)` | 校验数字最小/最大值                           |
| `@Positive` / `@Negative`       | 数值必须为正数/负数                           |

#### 补：拦截校验

@ExceptionHandler(value = MethodArgumentNotValidException.class) 可以专门捕获

```java
@ExceptionHandler(value = MethodArgumentNotValidException.class)
public Object validationException(MethodArgumentNotValidException e, HttpServletRequest request) {
    log.error("未处理异常 -> {}", e.getClass());
    log.error("url -> {}", request.getRequestURL());
    log.error("msg -> {}", e.getBindingResult().getFieldError().getDefaultMessage());
    log.error("stack trace -> {}", e.getStackTrace());
    return ResultUtil.Fail(e.getBindingResult().getFieldError().getDefaultMessage());
}
```

## MultipartFile文件上传

在springMVC 中封装好了文件上传类 MultipartFile，直接就可以进行文件获取

1. 直接在参数中设置注解获取file请求体

    ```java
    @RequestParam("file") MultipartFile file
    ```

2. 设置文件保存路劲

    ```java
    File dest = new File("C:\\Users\\35687\\Desktop\\java测试\\File\\" + file.getOriginalFilename());
    ```

3. 使用file.transferTo(dest);保存文件

#### 上传单个文件

```java
@RestController
@Slf4j
public class MainController {
    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "Please select a file to upload.";
        }
        try {
            // 获取文件的字节流并保存到本地
            //byte[] bytes = file.getBytes();
            File dest = new File("C:\\Users\\35687\\Desktop\\java测试\\File\\" + file.getOriginalFilename());
            file.transferTo(dest);
            return "File uploaded successfully: " + file.getOriginalFilename();
        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed: " + e.getMessage();
        }
    }
}
```

#### 上传单个文件带参

直接使用 @RequestParam 就能获取，需要和前端名称保持一致

```java
@PostMapping("/File")
public String multipartFileTest(@RequestParam("file") MultipartFile file,@RequestParam String username,@RequestParam String email) throws Exception{
    System.out.println("username: " + username);
    System.out.println("email: " + email);
    try {
        // 获取文件的字节流并保存到本地
        File dest = new File("/Users/liyinghao/Documents/学校课程/java作业/homeWorlForJavaWeb/java/static/" + file.getOriginalFilename());
        file.transferTo(dest);
        return "File uploaded successfully: " + file.getOriginalFilename();
    } catch (IOException e) {
        e.printStackTrace();
        return "File upload failed: " + e.getMessage();
    }
}
```

#### 上传单个文件,包含其它请求实体

```java
@PostMapping
public String multipartFileTest(@RequestParam MultipartFile multipartFile,@ApiParam(value = "用户名") @Valid UserDO userDO) throws Exception{
    File file = new File("E:\\data\\test\\testFile");
    multipartFile.transferTo(file);
    return  userDO.toString();
}
```

#### 多文件上传

直接使用数组MultipartFile[] 接收就ok

```java
@PostMapping
public JSONObject multipartFileTest(@RequestParam MultipartFile [] multipartFiles) throws Exception{
    JSONObject jsonObject = new JSONObject();
  	//之后可以遍历存储
     for (MultipartFile file : files) {
        jsonObject.put("file" + i, multipartFiles[i].getSize());
    }
    return jsonObject;
}
```

#### 多文件夹保存

可以实现嵌套文件夹的保存，空文件不保存

```java
@PostMapping("/api/upload")
public String upload(@RequestParam("files") MultipartFile[] files) throws IOException {
    String rootDir = "C:/Users/35687/Desktop/tt/";
    for (MultipartFile file : files) {
        log.info("文件上传{}", file.getOriginalFilename());
        if (!file.isEmpty()) {
            String relativePath = file.getOriginalFilename();// 获取文件的相对路径（例如：学生证/student.jpg）
            File destFile = new File(rootDir + relativePath);// 创建目标文件对象
            File parentDir = destFile.getParentFile();// 获取目标文件的父目录
            if (!parentDir.exists()) {// 如果父目录不存在，创建它
                parentDir.mkdirs();
            }
            file.transferTo(destFile);// 保存文件
        }
    }
    return "Files uploaded successfully!";
}
```

## 配置上传文件大小

在配置文件中配置

```
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

## @ModelAttribute封装上传参数

前端的Content-Type: **multipart/form-data **  可以直接使用@ModelAttribute获取

```java
public String multipartFileTest(@ModelAttribute User user) {
    String username = user.getUsername();
    String email = user.getPassword();
    MultipartFile file = user.getFile();
}
```

user类

```java
@Data
public class User {

    private String username;

    private String password;

    private MultipartFile file;
}
```

## 文件上传API

#### 限制文件大小

无需获取文件大小，推荐直接在配置文件种进行限制，见上文

#### 保存文件

```java
// 设置文件保存路径，使用自定义文件名
File dest = new File("/Users/liyinghao/Documents/学校课程/java作业/homeWorlForJavaWeb/java/static/" + newFilename);
// 保存文件
file.transferTo(dest);
```

#### 获取文件大小

```java
byte[] bytes = file.getBytes();
```

#### 获取文件数量

获取files中的文件数量，不包括文件夹

```java
files.length
```

#### 获取文件名称

获取第一个文件名称，不是文件夹名称！

```java
files[0].getOriginalFilename(); //files操作
file.getOriginalFilename() //file操作
```

#### 获取文件路径(文件夹名称)

```java
file.getOriginalFilename();
```

这个API是可以获取到文件夹名称的

如用户上传的文件夹为 a/public/index.html

在file.getOriginalFilename();中会完整显示

#### 获取文件父路径

```java
File destFile = new File(rootDir + relativePath);// 创建目标文件对象
File parentDir = destFile.getParentFile();// 获取目标文件的父目录
```

## 图片回显与保存路径问题

有很多种图片回显方式，使用static文件夹直接访问，默认无需配置，是自动开启的，开发的时候可以用

 在springboot中有 main-->resources-->static

在static中的文件可以直接访问

如static/1.jpg

前端的url就可以是 http://127.0.0.1:8080/1.jpg

在java打包后新加入的图片无法回显！！打包后就没有resources路径了

打包后的图片也会直接打包到jar包中

保存设置无法使用相对路径

**而且如果父路径不存在，那么并不会保存文件！**

#### 设置相对jar包路径

```java
String basePath = System.getProperty("user.dir") + "/uploads/";
File uploadDir = new File(basePath);
if (!uploadDir.exists()) {
    uploadDir.mkdirs(); // 创建目录
}
File dest = new File(basePath + file.getOriginalFilename());
file.transferTo(dest);
System.out.println("文件已保存至: " + dest.getAbsolutePath());
```

#### 设置静态托管

```java
@Configuration
@Slf4j
public class WebMvcConfiguration extends WebMvcConfigurationSupport {

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadPath = System.getProperty("user.dir") + "/uploads/";
        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:" + uploadPath);
    }
}
```

#### 配置超出大小异常拦截

需要在配置文件中修改tomcat配置

```properties
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB
server.tomcat.max-swallow-size = 10MB
```



# 登录校验/会话

会话:用户打开浏览器，访问web服务器的资源，会话建立，直到有一方断开连接，会话结束。在一次会话中可以包含多次请求和响应

会话跟踪:一种维护浏览器状态的方法，服务器需要识别多次请求是否来自于同一浏览器，以便在同一次会话的多次请求间共享数据

会话跟踪方案:

- 客户端会话跟踪技术:Cookie
- 服务端会话跟踪技术:Session
- 令牌技术:JWT

**注：**cookie是http自带的功能，自动携带

## cookie

**优点：**

- HTTP协议中支持的技术

**缺点:**

- 移动端APP无法使用Cookie
- 不安全，用户可以自己禁用cookie
- Cookie**不能跨域**

#### 获取cookie

```java
@RequestMapping("/c2")
public Result sayHello2(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    for (Cookie cookie : cookies) {
        if (cookie.getName().equals("login username")) {
            System.out.println(cookie.getName() + ":" + cookie.getValue());
        }
    }
    return Result.success();
}
```

#### 设置cookie

除了 Result 都是内置对象

```java
@Slf4j //日志
@RestController
public class TestController {
    @RequestMapping("/c1")
    public Result sayHello(HttpServletResponse response) {
        response.addCookie(new Cookie("login_username","it"));//设置cookie/mmcookie
        return Result.success();
    }
}
```

## session

session存储session(id)在cookie里,spring默认的JSESSIONID这是就是session_id的名称

**优点：**

- 存储在服务端，安全

**缺点：**

- 服务器集群环境下无法直接使用Session
- Cookie的缺点

#### 设置session

```java
@RequestMapping("/s3")
public Result sayHello3(HttpSession session) {
    log.info("sessionId: {}", session.getId());
    session.setAttribute("login_username", "it");
    return Result.success();
}
```

#### 读取session

```java
@RequestMapping("/s4")
public Result sayHello4(HttpServletRequest request) {
    HttpSession session = request.getSession();
    log.info("sessionId: {}", session.getId());

    Object login_username = session.getAttribute("login_username");
    log.info("login_username: {}", session.getAttribute("login_username"));
    return Result.success();
}
```

## jwt_token



## ThreadLocal线程存储token

ThreadLocal 并不是一个Thread，而是Thread的局部变量。**用来存数据的**

ThreadLocal为每个线程提供单独一份存储空间，具有线程隔离的效果，只有在线程内才能获取到对应的值，线程外则不能访问。

**可以避免多线程修改的安全问题**

每一个springboot程序都有一个主线程

ThreadLocal常用方法:

- public void set(T value) 设置当前线程的线程局言变量的值
- public T get()   返回当前线程所对应的绘程局部变量的值
- public void remove()  移除当前线程的线程局部变量

一般会封装后使用

在common软件包下

```java
public class BaseContext {

    public static ThreadLocal<Long> threadLocal = new ThreadLocal<>();

    public static void setCurrentId(Long id) {
        threadLocal.set(id);
    }

    public static Long getCurrentId() {
        return threadLocal.get();
    }

    public static void removeCurrentId() {
        threadLocal.remove();
    }

}
```

#### 存储token

之后在校验令牌时使用

```java
//2、校验令牌
try {
    log.info("jwt校验:{}", token);
    Claims claims = JwtUtil.parseJWT(jwtProperties.getAdminSecretKey(), token);
    Long empId = Long.valueOf(claims.get(JwtClaimsConstant.EMP_ID).toString());
    log.info("当前员工id：", empId);
    BaseContext.setCurrentId(empId);
    //3、通过，放行
    return true;
} catch (Exception ex) {
    //4、不通过，响应401状态码
    response.setStatus(401);
    return false;
}
```

#### 获取token

在任意地点都可以获取

```java
BaseContext.getCurrentId()
```

## jwt常见问题

问题太多了，很容易忘

#### 前缀问题

请求头前缀为 Authorization

授权令牌前缀为 Bearer 

标注jwt样例

```
Authorization: Bearer eyJhbGciOiJIUzI1...
```

警告：前缀要求为严格规范，**OAuth 2.0** 规范中，访问令牌（Access Token）通常采用 **Bearer Token** 方式传递。如果修改可能会产生兼容性问题

并且不同的token认证前缀也是不同的

| **认证方式**           | **示例**                                                     |
| ---------------------- | ------------------------------------------------------------ |
| **Bearer Token (JWT)** | `Authorization: Bearer eyJhbGciOiJIUzI1...`                  |
| **Basic 认证**         | `Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`              |
| **Digest 认证**        | `Authorization: Digest username="admin", realm="example.com"` |

# 过滤器/拦截器

- 过滤器(Filter)

- 拦截器(Interceptor)

## Filter/过滤器

类似于中间键

- 概念:Filter 过滤器，**是JavaWeb（不是springboot，是java本体的功能，拦截器是springboot的）**三大组件(Servlet、Filter、Listener)之一（Servlet和Listener已经很少使用了）
- 过滤器可以把对资源的请求拦截下来，从而实现一些特殊的功能。
- 过滤器一般完成一些通用的操作，比如:登录校验、统一编码处理、敏感字符处理等

**实现步骤**

1. 创建filter包，创建对应的java类
2. 定义Filter:定义一个类，实现 Filter 接口，并重写其所有方法。
3. 配置Filter: Filter类上加 @WebFilter 注解，配置拦截资源的路径。**引导类（main函数的类）上加@ServletComponentScan 开启Servlet组件支持。**

在main文件上添加

```java
@ServletComponentScan
```

**Fliter类基本结构**

其实还有创建和销毁，但是**创建和销毁都有默认实**现。只需要实现do就行

```java
@WebFilter(urlPatterns = "/*")
public class LoginFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
        System.out.println("doFilter");
        //chain.doFilter(request, response);//放行
    }
}
```

#### 过滤器顺序/过滤器链

放行后访问对应资源，资源访问完成后，还**会回到Filter中**，继续没有执行的逻辑，需要**使用return结束**，如果有多个Filter（过滤器链），会按Filter的名称顺序顺序执行，chain.doFilter(request, response);表示放行到下一个过滤器

过滤器的顺序如下

1. 放行前逻辑 
2. 放行
3. 类中的逻辑
4. 放行后逻辑 

#### 过滤器jwt

```java
@WebFilter(urlPatterns = "/*")
public class LoginFilter implements Filter {
    private static final Logger log = LoggerFactory.getLogger(LoginFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest req = (HttpServletRequest)request;
        HttpServletResponse resp = (HttpServletResponse)response;
        //获取请求头
        String url = req.getRequestURL().toString();
        log.info("请求的url:{}",url);

        if(url.contains("login")){
            log.info("登录");
            chain.doFilter(request, response);
            return;
        }

        //获取请求头中的内容
        String jwt = req.getHeader("token");
        //判断请求头中的jwt是否为空
        if (!StringUtils.hasLength(jwt)){
            log.info("请求头为空");
            Result error = Result.error("NOT_LOGIN");
            String notLogin = JSONObject.toJSONString(error);
            resp.getWriter().write(notLogin);
            return;
        }

        //解析token
        try {
            JWT.parseClaim(jwt);
        } catch (Exception e){
            //e.printStackTrace();
            log.info("jwt解析失败");
            Result error = Result.error("NOT_LOGIN");
            String notLogin = JSONObject.toJSONString(error);
            resp.getWriter().write(notLogin);
            return;
        }

        log.info("验证成功");
        chain.doFilter(request, response);
    }
}
```

## Interceptor/拦截器

**概念：**是一种动态拦截方法调用的机制，类似于过滤器。**为Spring框架中提供**的，用来动态拦截控制器方法的执行。

**作用：**拦截请求，在指定的方法调用前后，根据业务需要执行预先设定的代码。

**拦截器执行流程**

Tomcat主要是处理servlet，servlet调用一个个Controller，**拦截器位于servlet与Controller之间**，处于spring容器内，而过滤器位于servlet之前，不属于spring，先执行过滤器，后执行容器，在**返回结果时反是**，先经过过滤器，后经过拦截器

#### 定义拦截器

定义拦截器，实现**HandlerInterceptor接口**，并重写其所有方法

1. 建立**interceptor包**中建立**LoginCheckinterceptor类**
2. 继承HandlerInterceptor接口，重写其中的三个接口（idea可以使用ctrl+o快速重写）

```java
public class LoginCheckinterceptor implements HandlerInterceptor {
    
}
```

#### 重写的拦截器方法

##### preHandle_Http请求之前

处理 HTTP 请求之前执行一些逻辑

有三个参数

1. HttpServletRequest：req，前端发出的http请求
    - request.getHeader() -- 获取请求头
    - request.getSession() -- 获取session
    - request.getCookies() -- 获取cookies
2. HttpServletResponse：res，回应给前端的http请求
    - response.setStatus() -- 设置请求状态
    - response.setHeader("headerName", "headerValue") -- 添加相应头
3. Object：表示当前请求对应的处理器。在 Spring MVC 中，通常处理器是一个@Controller的方法或者一个HandlerMethod对象。

##### instanceof_HandlerMethod

- instanceof：关键字，用于检查一个对象是否是特定类或接口的实例。
- HandlerMethod：springBoot中的类

通常用于检测

```java
//判断当前拦截到的是Controller的方法还是其他资源
if (!(handler instanceof HandlerMethod)) {
  //当前拦截到的不是动态方法，直接放行
  return true;
}
```

#### 注册拦截器/拦截器配置/排除拦截路径

目的是使创建的拦截器生效

config包建立相关Config类，设置拦截相关路径

```java
@Configuration  //配置类
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private LoginCheckinterceptor loginCheckinterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginCheckinterceptor)
                .addPathPatterns("/**")//需要拦截的资源
                .excludePathPatterns("/", "/login", "/Request", "/Re/{id}");//不需要拦截的资源
    }
}
```

在拦截路径中和其他和其他配置不同

| 拦截路径  | 含义                                 | 举例                                                |
| --------- | ------------------------------------ | --------------------------------------------------- |
| /*        | 一级路径                             | 能匹配/depts，/emps，/login，不能匹配/depts/1       |
| /**       | 任意级路径                           | 能匹配/depts，/depts/1，/depts/1/2                  |
| /depts/*  | /depts下的一级踏径/depts下的一级踏径 | 能匹配/depts/1，不能匹配/depts/1/2，/depts          |
| /depts/** | /depts下的任意级路径                 | 能匹配/depts，/depts/1，/depts/1/2，不能匹配/emps/1 |

#### 拦截器jwt(常用)

跟之前过滤器的非常相像，别忘了拦截器配置

```java
@Slf4j
@Component
public class LoginCheckinterceptor implements HandlerInterceptor {
  @Override //目标方法执行之前执行，方行为true，返回为false
  public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {

    String url = req.getRequestURL().toString();
    log.info("请求的url:{}",url);

    if(url.contains("login")){
      log.info("登录");
      return true;
    }

    //获取请求头中的内容
    String jwt = req.getHeader("token");
    //判断请求头中的jwt是否为空
    if (!StringUtils.hasLength(jwt)){
      log.info("请求头为空");
      Result error = Result.error("NOT_LOGIN");
      String notLogin = JSONObject.toJSONString(error);
      resp.getWriter().write(notLogin);
      return false;
    }

    //解析token
    try {
      JWT.parseClaim(jwt);
    } catch (Exception e){
      //e.printStackTrace();
      log.info("jwt解析失败");
      Result error = Result.error("NOT_LOGIN");
      String notLogin = JSONObject.toJSONString(error);
      resp.getWriter().write(notLogin);
      return false;
    }
    log.info("验证成功");
    return HandlerInterceptor.super.preHandle(req, resp, handler);
  }

  @Override //目标方法执行之后执行
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
  }

  @Override //页面渲染之后执行，最后执行
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
  }
}
```

# 异常处理器

目的是统一异常规范，属于springMVC

程序开发过程中不可避免的会遇到各种各样的异常现象，有可能会返回不符合规范的默认值

建立exception/hander（例外）包，在包中建立GlobalExceptionHandler（全局异常处理程序）类

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(Exception.class)
    public Result error(Exception e) {
        //e.printStackTrace();
        return Result.error("不合法的请求");
    }
}
```

## @ExceptionHandler

异常处理注解 捕获异常

```java
/**
 * 全局异常处理器，处理项目中抛出的业务异常
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler
    public Result exceptionHandler(BaseException e) {
        log.warn(e.getMessage());
        return Result.error(e.getMessage());
    }
}
```

其中BaseException为自己写的

## 抛出异常

配合全局异常处理器直接抛出

**举例：**如密码验证失败

```java
if (!password.equals(employee.getPassword())) { //密码错误
    throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
}
```

抛出的异常为自己定义的异常

全局异常处理器一般定义在handler中

```java
/**
 * 全局异常处理器，处理项目中抛出的业务异常
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
  
    @ExceptionHandler(Exception.class)
    public Result error(Exception e) {
        //e.printStackTrace();
        return Result.error("不合法的请求");
    }
}
```

可以通过重载的方式处理不同的异常

```java
/**
     * 捕获业务异常
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
```

## 自定义异常



# 配置类

## 消息(对象)转换器

目的是把java对象转变成json数据,并配置相关格式

#### 创建消息转换器

一般在config文件夹下添加

```java
protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
    //创建一个消息转化器
    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
    //设置消息转化器的属性
    converter.setObjectMapper(new JacksonObjectMapper());
    //将消息转化器添加到converters中
    converters.add(0, converter);//0是排在第一个，优先使用
}
```

## 静态资源映射

如果无法使用static中静态文件就是对静态文件配置做了限制

一般在WebMvcConfiguration类中中

```java
//设置静态资源映射
protected void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
    registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
}
```

# AOP切面编程

## @interface自定义注解

注解是java本体的功能，与spring无关

@interface是自定义注解的关键字，在annotation包下建立

```java
@Target(ElementType.METHOD) // 指定注解可以用于方法
@Retention(RetentionPolicy.RUNTIME) // 指定注解的保留策略
public @interface MyAnnotation { //MyAnnotation 注解的名称 同时也是一个类
    String value(); // 定义一个名为 value 的元素
}
```

- @Target：指定注解可以用于方法
    - ElementType.METHOD：表示该注解可以应用于方法定义
- @Retention：指定注解的保留策略
    - RetentionPolicy.RUNTIME：表示注解会被保留在运行时，因此**可以通过反射机制获取**

#### 获取注解中的字段参数

直接点就能获取

AOP示例

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UrlLimit {
    LimitKeyType keyType() default LimitKeyType.ID; //限制类型，ip或者id
    int maxRequests() default 60; //每分钟最大请求次数
}

public Object around(ProceedingJoinPoint joinPoint, UrlLimit urlLimit) throws Throwable {
  urlLimit.keyType()
}
```

#### HandlerMethodArgumentResolver



## aop概述

切的时候要小心，切不好被切的全部受影响，特别是@Around作用范围

**AOP：**Aspect Oriented Programming(面向切面编程、面向方面编程)，其实就是**面向**特定**方法编程**，相当于给指定的方法前加上了过滤器

**AOP使用场景：**统计执行耗时，记录操作日志，权限控制，事务管理（事物底层也是aop）

**AOP的实现原理：**动态代理是面向切面编程最主流的实现。而SpringAOP是Spring框架的高级技术，旨在管理bean对象的过程中，主要通过底层的**动态代理**机制，对特定的方法进行编程

**导入依赖**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

实例：记录函数运行时间

```java
@Slf4j
@Component
@Aspect //标注这个类是一个切面AOP类
public class TimeAspect {

    @Around("execution(* com.example.springtest1.*.*.*(..))")
    public Object recordTime(ProceedingJoinPoint joinPoint) throws Throwable{
        //记录起始时间
        long begin= System.currentTimeMillis();
        //执行目标方法
        Object result = joinPoint.proceed();
        //记录结束时间
        long end = System.currentTimeMillis();
        //打印耗时
        log.info("{}方法执行耗时:{}ms", joinPoint.getSignature(), end - begin);
        return result;
    }
}
```

**补：**翻译

- execution(执行) 
- Aspect(方面)

#### 核心概念

- **连接点：**JoinPoint，可以被AOP控制的方法(暗含方法执行时的相关信息（被aop控制的方法）)
- **通知：**Advice，指哪些重复的逻辑，也就是共性功能(最终体现为一个方法(就是aop的那个函数)）
- **切入点：**Pointcut，匹配连接点的条件，通知仅会在切入点方法执行时被应用
- **切面：**Aspect，描述通知与切入点的对应关系(通知+切入点)
- **目标对象：**Tarqet，通知所应用的对象

#### 执行流程

相对于@Around注解

1. 首先进入AOP对象，完成AOP函数中的前置内容
1. 通过joinPoint.proceed();调用原始函数的操作，获取返回值后继续执行AOP函数
1. 生成代理对象，包括AOP和原函数的全部内容
1. 将代理对象注入给调用原始对象的函数，完成AOP切面

## @Aspect

声明为aop类，必备

## @Pointcut切入点表达式

**注意：切入点函数必定是空实现**

声明公用的execution()

```java
@Pointcut("execution(* com.example.springtest1.*.*.*(..))")
public void pt(){}

@Around("pt()")
```

#### 1.execution

execution 主要根据方法的返回值、包名、类名、方法名、方法参数等信息来匹配，语法为：

```
execution(访问修饰符? 返回值 包名.类名.?方法名(方法参数)throws 异常?)
```

其中带?的表示可以省略的部分

- 访问修饰符:可省略(比如:public、protected)
- 包名.类名: 可省略
- throws 异常:可省略(注意是方法上声明抛出的异常，不是实际抛出的异常)

**可以使用通配符描述切入点**

- *****：**单个**独立的任意符号，可以通配任意返回值、包名、类名、方法名、任意类型的一个参数，也可以通配包、类、方法名的一部分
- **..**  :**多个**连续的任意符号，可以通配任意层级的包，或任意类型、任意个数的参数

eg

```java
@Pointcut("execution(*/任意一个返回值 com.example.springtest1.*/任意一个包.*/任意一个类名.*/任意一个方法名(../任意多个方法参数))"
          
@Pointcut("execution(* com.example..*(..))")
public void allMethodsInExamplePackage() {}
```

根据业务需要，可以使用 **且(&&)、或()、非(!)**来组合比较复杂的切入点表达式。

**书写规范**

- 所有业务方法名在命名时尽量规范，方便切入点表达式快速匹配。如:查询类方法都是find 开头，更新类方法都是 update开头。
- 描述切入点方法通常基于接口描述，而不是直接描述实现类，增强拓展性。
- 在满足业务需要的前提下，**尽量缩小切入点的匹配范围**。如:名匹配尽量不使用…，使用*匹配单个包。

#### 2.@annotation

通过自定义注解来实现AOP切入

在要使用的AOP类上添加@Around("@annotation(MyAspect1)")

```java
@Around("@annotation(MyAspect)")
public Object recordTime(ProceedingJoinPoint joinPoint) throws Throwable {
    //记录起始时间
    long begin= System.currentTimeMillis();
    //执行目标方法
    Object result = joinPoint.proceed();
    //记录结束时间
    long end = System.currentTimeMillis();
    //打印耗时
    log.info("{}方法执行耗时:{}ms", joinPoint.getSignature(), end - begin);
    return result;
}
```

之后要切哪个方法就在方法上加上@MyAspect就ok了

#### 3.args

用于匹配方法的参数类型

```java
@Pointcut("args(java.lang.String)")
public void methodsWithStringArg() {}
```

#### 4.within

用于匹配某个类或包内的方法。

```java
@Pointcut("within(com.example.service.*)")
public void allServiceMethods() {}
```

##  @Orde通知顺序

就是切入的顺序

1. 不同切面类中，默认按照切面类的类名字母排序:

    - 目标方法前的通知方法：字母排名靠前的先执行
    - 目标方法后的通知方法：字母排名靠前的后执行

2. 用 @Order加在切面类上来控制顺序

    - 目标方法前的通知方法：数字小的先执行

    - 目标方法后的通知方法： 数字小的后执行

        ```
        @Order(1)
        ```

## @Around通知类型

即切面的函数运行生命周期

```java
@Around("pointcutExpression")
```

| 通知类型        | 通知含义                                                     |
| --------------- | ------------------------------------------------------------ |
| @Around         | 环绕通知，此注解标注的通知方法在目标方法前、后都被执行，需要ProceedingJoinPoint joinPoint()API,返回值必须是Object |
| @Before         | 前置通知，此注解标注的通知方法在目标方法前被执行             |
| @After          | 后置通知，此注解标注的通知方法在目标方法后被执行，无论是否有异常都会执行 |
| @AfterReturning | 返回后通知，此注解标注的通知方法在目标方法后被执行，有异常不会执行 |
| @AfterThrowing  | 异常后通知，此注解标注的通知方法发生异常后执行               |

#### ProceedingJoinPoint连接点

获取法执行时的相关信息

在Spring中用JoinPoint抽象了连接点，用它可以获得方法执行时的相关信息，如目标类名、方法名、方法参数等。

- 对于 @Around 通知，获取连接点信息只能使用ProceedingJoinPoint
- 对于其他四种通知，获取连接点信息只能使用 JoinPoint，它是 ProceedingJoinPoint 的父类型

有以下常见函数

```java
String className = joinPoint.getTarget().getClass().getName();//获取目标类名
Signature signature =joinPoint.getSignature();//获取目标方法签名
String methodName = joinPoint.getSignature().getName();//获取目标方法名
Object[]args =joinPoint.getArgs();//获取目标方法运行参数
log.info("类名:{},方法名:{},参数:{},signature:{}",className,methodName,args,signature);
```

**注意事项**

1. **必须调用 `proceed` 方法**：如果没有调用 `proceed` 方法，目标方法将不会被执行。
2. **处理异常**：`proceed` 方法可能抛出异常，需要在环绕通知中捕获或继续向外抛出。
3. **返回值**：环绕通知需要返回目标方法的执行结果，否则可能导致返回值丢失或出错。

## aop使用案例

#### 切面公共字段自动填充

- @Aspect：声明这是一个切面类

- @Pointcut：在类中声明@Pointcut注解为切入点

  ```java
  @Pointcut("execution(* com.sky.mapper.*.*(..)) && @annotation(com.sky.annotation.AutoFill)")
      public void autoFill() {}
  ```

  - execution：在哪个包下

  - @annotatio：注解限制

- @Before("autoFill()")：声明为前置注解

  ```java
  public void before(JoinPoint joinPoint) throws NoSuchMethodException {
      log.info("before auto fill...");
  }
  ```

# 数据库相关

## 数据库连接池(Druid)

目的是减少资源消耗

**介绍：**

- 数据库连接池是个容器，负责分配、管理数据库连接(Connection)
- 它允许应用程序**重复使用一个现有的数据库连接**，而不是再重新建立一个
- 释放空闲时间超过最大空闲时间的连接，来避免因为没有释放连接而引起的数据库连接遗漏

**优势：**

- 资源重用
- 提升系统响应速度
- 避免数据库连接遗漏

有现成的产品，不用自己写

- Hikari（光）：springboot**默认连接池**，性能也是非常好
- Druid（德鲁伊）：阿里的开源项目，也是非常好的数据库连接池之一

Druid官方文档

```
https://github.com/alibaba/druid
```

# 配置相关

## application配置文件

#### 配置文件类型

还是有很多配置的

springboot支持3种配置(都是application(应用)),下面是配置启动端口的案例

- application.properties

```
server.port=8081
```

- application.yml


```
server:
  port:8082
```

- application.yaml

```
server:
  port:8082
```

注：虽然支持很多格式，但是 **yml**是偏主流的方式 且：后必须有空格

#### 系统配置

- java系统属性

```
-Dserver.port=9000
```

- 命令行参数

```
--server.port=10010
```

#### 配置优先级

1. 命令行参数，java系统属性
2. application.properties
3. application.yml
4. application.yaml

#### @value使用配置项数据

**注意:**@value是在spring包下，不是loobook，且类必须为Spring容器管理(@Component)

在一些情况下使用{}获取配置文件中的内容，甚至可以自己读取系统环境变量

```java
@Value("${file.upload-dir}")
private String uploadDir;
```

在配置文件中

```yml
file.upload-dir=C:/Users/35687/Desktop/javatest/myFile/
```

也可以设置默认值

```java
@Value("${spring.port:8080}")
private String port;
```

#### 环境配置

```
application.properties
```

目的是配置开发，测试与生产环境

如果每次打包时，都要修改配置文件，那么非常麻烦。profile功能就是来进行动态配置切换的。

1. profile配置方式
    - 多profile文件方式
    - yml多文档方式
2. profile激活方式
    - 配置文件
    - 虚拟机参数
    - 命令行参数

##### 环境配置配置

直接复制原来的properties文件，一般建立

- application-dev.properties 开发
- application-pro.properties 生产
- application-test.properties 测试

**补：-后接的不是固定的，并且完全自由**

在原来的application.properties中配置生效的文件

```properties
spring.profiles.active=dev
```

之后启动springboot的时候就会有打印

```properties
The following 1 profile is active: "dev"
```

**yml配置**

**警告：**通过---分割+rofiles:dev已经弃用了

```xml
spring:
  profiles: dev //弃用了
```

##### 配置环境${}

在主yml中，可以配置${}为变量，在指定active中创建变量

- 普通yml

    ```yml
    spring:
      profiles:
        active: dev
      main:
        allow-circular-references: true
      redis:
        host: ${sky.redis.host}
        port: ${sky.redis.port}
        # password: yourpassword  # 如果没有密码，可以不设置
        database: ${sky.redis.database} # 默认为0
        timeout: ${sky.redis.timeout}  # 连接超时时间
    ```

- 在-dev中

    ```yml
    sky:
      redis:
        host: localhost
        port: 6379
        database: 0  # 默认为0
        timeout: 6000ms  # 连接超时时间
    ```

##### 打包后修改配置文件

在打包后的jar包同级目录下建立配置文件就ok了

##### @ConfigurationProperties配置属性类

```java
@ConfigurationProperties(prefix = "sky.jwt") 
```

会去配置文件（根配置文件（springboot的配置文件））中找sky下的jwt，

eg：

```java
@Component
@ConfigurationProperties(prefix = "sky.jwt") // 当前类是一个配置属性类 读取配置文件中前缀为sky.jwt的配置
public class JwtProperties {
    private String adminSecretKey;
    private long adminTtl;
    private String adminTokenName;
}
```

yml

```yml
sky:
  jwt:
    # 设置jwt签名加密时使用的秘钥
    admin-secret-key: itcast
    # 设置jwt过期时间
    admin-ttl: 7200000
    # 设置前端传递过来的令牌名称
    admin-token-name: token
```

## 常见配置

#### 启动端口

```
server.port=8081
```

#### 配置最大连接数/线程数

可以控制最大连接数和最大等待数（实验性）

```yml
server:
  tomcat:
  	threads:
      min-spare:10
      max:20
    max-connections:30
    accept-count:10
```

## WebMvcConfigurer跨域配置

生产环境推荐在nginx中配置反向代理

#### 注解配置

跨域通过注解配置，在controller类或者Mapping上添加

```java
@CrossOrigin(origins = "*")
```

#### addCorsMappings

推荐的跨域配置方法

```java
/**
 * Spring Boot 跨域配置
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${cors.allowedOrigins}")
    private String allowedOrigins;

    @Value("${cors.allowedMethods}")
    private String allowedMethods;

    @Value("${cors.allowCredentials}")
    private boolean allowCredentials;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods(allowedMethods.split(","))
                .allowCredentials(allowCredentials); // 允许传递 Cookie
    }
}
```

在配置文件中

```xml
cors.allowedOrigins=http://localhost:5173/
cors.allowedMethods=GET,POST,PUT,DELETE
cors.allowCredentials=true
```

#### FilterRegistrationBean

一种更加底层的过滤器，不依赖于springMVC

标准的 Servlet 过滤器，可以拦截所有进入应用的请求，而不仅限于由 Spring MVC 控制的请求

如果引入了其他框架，推荐使用，websocket中非必要使用

## https下编程

如果前端为https下，请求后端的http就会报错

```
axios.min.js:1  Mixed Content: The page at 'https://www.liyinghao.cc/lyxkl/' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://www.liyinghao.cc:5002/loginUser?username=lxx'. This request has been blocked; the content must be served over HTTPS.
```

建议配网关

## banner-mode横幅

可以配置是否启动时开启spring的横幅

```yml
spring:
	main:
    banner-mode: off
```

## 启动时初始化sql(易出bug)

可以在指定位置存放sql文件，在spring启动时会执行一次

```properties
spring.sql.init.mode=always
spring.sql.init.schema-locations=classpath:/db/schema.sql # 创建sql
# spring.sql.init.data-locations=classpath:/db/user.sql # 数据sql
```

警告（实验性，未经过验证）：线上环境避免使用本方法，如果服务器启动后sql脚本还没有执行完毕，会出现业务异常

**警告：bug记录：避免使用# 形式注释（涉及数据库，非常重要！！）**

1. **# 和 -- 为完全不同的注释方式，在JDBC中会进行优化，去除全部的空格和换行，如果使用# ，不会识别为注释，导致sql语句被注释掉，不允许写一切的# 注释**
2. **无法创建数据，无法使用数据库，一切数据库是由datasource决定的，使用时就已经进入了数据库中，禁止使用一切create database和use语句**

## 详细日志输出

会显示更加详细的实时日志，在debug时会非常有用

```yml
#logging:
#  level:
#    root: debug 
```

# fs补充

底层原理在java文档中，这里提供一些高级写法

## 获取java运行目录(根目录)

在保存文件时会非常好用

```java
String jarDir = System.getProperty("user.dir");
```

**案例：**

```java
@Component
public class FilePathInitializer {

    private String staticDirectoryPath;

    @PostConstruct
    public void init() {
        // 获取当前运行的 JAR 包的路径
        String jarDir = System.getProperty("user.dir");

        // 在 JAR 包所在目录下创建 static 文件夹
        File staticDirectory = new File(jarDir, "static");
        if (!staticDirectory.exists()) {
            staticDirectory.mkdir(); // 如果不存在则创建
        }

        // 保存路径
        staticDirectoryPath = staticDirectory.getAbsolutePath();
        System.out.println("文件将保存在: " + staticDirectoryPath);
    }

    public String getStaticDirectoryPath() {
        return staticDirectoryPath;
    }
}
```

## 递归删除文件夹内容

```java
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

# javaWeb补充

## HttpServletRequest

tomcat10 java11版本引入包不同

```java
import jakarta.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletRequest;
```

Servlet API 的核心接口，用于封装客户端的 HTTP 请求

包含了请求的所有信息，比如 URL、HTTP 方法、请求头、参数、Session 等

```java
request.getMethod(); // 返回请求的 HTTP 方法，例如 "GET"、"POST"。

request.getRequestURL(); // 返回完整的 URL，例如 http://localhost:8080/api/test
request.getRequestURI(); // 返回请求路径，例如 /api/test

request.getContextPath(); // 返回应用的上下文路径，例如 /myapp

request.getQueryString(); // 返回 URL 中的查询参数，例如 id=123&name=test

request.getRemoteAddr(); // 返回客户端的 IP 地址
request.getRemotePort(); // 返回客户端的端口号

request.getRemoteHost(); // 返回客户端的主机名

HttpSession session = request.getSession(); //获取session
```

#### 获取HttpServletRequest

通过

```java
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
```

可以获取

```java
HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest(); 
```

## HttpServletResponse

## 会话

用户打开浏览器进行会话，发起多个请求，**一次会话，多次请求**

直到**关闭浏览器，会话结束**

会话的过程中产生一些数据，可以通过会话技术**存储用户的会话数据**

**目的是在一次会话中共享数据/共享一次会话中产生的数据**

注意：跨域同样会影响会话，且前后端都需要配置

## Cookie

将少量的用户信息以键值对的形式**存储在浏览器**，在每一次请求的**时候都会携带**，服务器可以获取处理，从而实现了**多个Servlet之间共享**数据

常见使用场景

- 保存用户信息，记住用户名和密码
-  记录用户名，自动填充
- 保存视频进度

Cookie会在浏览器关闭后被删除(默认)

一般情况下不要存中文，也不能有空格

#### CookieAPI

1. 浏览器设置cookie，通过相应头中的set-cookie
2. 服务端获取cookie，通过相应头

#### 设置有效期

可以设置cookie中的有效期

```java
cookie.setMaxAge(7*24*60*60); //（7天）
```

#### 设置有效路径

指定哪一个路径能获取到这个cookie

```java
setPath()
```

一般设置的cookie为当前项目，目的是保证其他网站的cookie不会传到自己的项目中

#### cookie删除

1. 清楚浏览器缓存

2. 后端代码实现

    同名，同项目路径，有效期为0

    ```
    setMaxAge(0)
    ```

#### cookie配置类

**记录上次访问时间**

需求：如果用户是第一次访问，如过不是，显示上一次访问的时间

## session

服务器中的会话技术，服务器会对每一个浏览器开辟一块内存空间，存储httpSession，为每个浏览器独享的，**当服务器关闭之后，session也会删除**

前端在cookie中存储sessionid，本次会话的更多信息存储在后端中，服务器通过sessionid找到对应session

#### JSESSIONID

Java EE 应用服务器（如 Tomcat、Jetty）用来标识用户会话的唯一标识符。当用户首次访问你的 Web 应用时，服务器会自动创建一个新的会话，并为该会话生成一个唯一的 JSESSIONID，然后将其存储在 Cookie 中并发送给客户端。

#### session设置获取

设置session

```java
request.getSession().setAttribute("captcha", captchaText);
```

获取session

```
String storedCaptcha = (String) request.getSession().getAttribute("captcha");
```

# 打包部署

支持两种打包方式

- jar包(推荐且默认方式)
- war包
- sp3原生镜像(实验性)

不建议使用命令行进行打包，直接在idea的maven生命周期中点击clean后package（建议清除test中的代码）

后会生成两个文件

```
springboot-exec-jar-1.0-SNAPSHOT.jar //Spring Boot打包插件创建的包含依赖的jar，可以直接运行
springboot-exec-jar-1.0-SNAPSHOT.jar.original //是Maven标准打包插件打的jar包，它只包含我们自己的Class，不包含依赖
```

之后直接java -jar命令就可以了

打包war包 需要修改xml 和 main文件，之后端口在TomCat中配置

# 常见问题解决

## 没有配置数据导致无法启动

在main class中注解添加

```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
```

## 在websocket导致测试不通过

在测试时不添加websocket的bean注入

 WebSocket 依赖于 Web 容器：WebSocket 通常依赖于服务器提供的 `ServerContainer`，这是由 Web 容器（如 Tomcat、Jetty）提供的。在测试环境中，尤其是使用内嵌服务器的测试时，可能不会启动完整的 Web 容器，因此 `ServerContainer` 可能不可用

通过@ConditionalOnProperty注解进行配置不进行注入

在webSocket上添加

```java
@ConditionalOnProperty(name = "spring.profiles.active", havingValue = "dev")
```

## 创建时版本问题

- RC：Release Candidate，发行候选版本，基本不再加入新的功能，主要修复bug。是最终发布成正式版的前一个版本，将bug修改完就可以发布成正式版了。

- GA：General Availability,正式发布的版本，官方推荐使用此版本
- SNAPSHOT：快照版，可以稳定使用，且仍在继续改进版本
- PRE：预览版,内部测试版. 主要是给开发人员和测试人员测试和找BUG用的，不建议使用

## javax.xml.bind异常

```
NoClassDefFoundErrorjavax/xml/bind/DatatypeConverterNoClassDefFoundError
```

常见于配置文件类

版本问题，在java8之后移除了bind模块，需要手动添加

```xml
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
</dependency>
```

或者

```xml
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.1</version> <!-- 根据需要选择版本 -->
</dependency>
<dependency>
    <groupId>org.glassfish.jaxb</groupId>
    <artifactId>jaxb-runtime</artifactId>
    <version>2.3.1</version> <!-- 与上面版本一致 -->
</dependency>
```

