全部基于java和mysql

MyBatis是一款优秀的 持久层 框架，用于简化JDBC的开发。

**idea快捷键，java与sql对应数据类型位于底部**

# 使用流程总览

提供推荐的使用流程

1. 创建项目时(编辑启动器)选择MyBatis Framework，MySQL Driver(Mysql驱动)
1. 配置相关数据库，在-连接数据库配置-中有说明
1. 在项目中新建mapper包，在包下创建指定@Mapper接口，内编写sql接口
1. （必选）创建service文件夹，@Service类中使用@Autowired注入对应的Mapper，调用其中的方法
1. 注入service对象，调用其中的方法，完成使用

# Mybatis

在创建项目的时候就添加mybitis依赖和mysql的依赖，新建后需要配置，不配置无法启动

在SQL选项中

- MyBatis Framework
- MySQL Driver

如果是springboot 2 不要引入3.x的Mybatis

## 连接数据库配置

在 resources 中的 application.properties为mybatis的配置文件

在此输入仓库和密码

```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/learn_test
spring.datasource.username=root
spring.datasource.password=123456
```

常见问题 

1. com.mysql.cj.jdbc.Driver 找不到

    更改mysql依赖

    ```xml
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    ```

#### 连接数据库url参数

```xml
url: jdbc:mysql://${zc.datasource.host}:${zc.datasource.port}/${zc.datasource.database}?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true
```

- serverTimezone：指定时区
- useUnicode：保证多语言支持
- characterEncoding：配合useUnicode，指定字符编码为 UTF-8
- zeroDateTimeBehavior：处理0值 MySQL 中的“零日期时间”值
- useSSL：禁用ssl连接，如何不使用ssl连接，禁用可以1提高性能
- allowPublicKeyRetrieval：允许客户端向服务器获取公钥

## SQL语句封装

建立mapper包下，建立编写接口，编写SQL语句，使用@Mapper声明为查询接口

接口举例：

```java
@Mapper //只需要实现接口，不需要实现类,会自动生成对象（代理对象），并且将改对象交给ioc容器管理
public interface UserMapper {
    //查询全部用户信息
    @Select("select * from user")
    public List<User> selectAllUser();
}
```

接口中的对象要遵守java bean的写法，包含getter，setter方法，tostring，有参和空参构造

## 运行@Mapper SQL语句

在mapper文件夹中只需要实现接口，不需要实现类,会自动生成对象（代理对象），并且将改对象交给ioc容器管理

```java
@Mapper //只需要实现接口，不需要实现类, 会自动生成对象（代理对象），并且将改对象交给ioc容器管理
public interface UserMapper {
    public List<User> selectAllUser(String age);
}
```

因为会自动生成对象，并且将改对象交给ioc容器管理 所以直接使用@Autowired创建对象就能用了

```java
@SpringBootTest // Spring Boot 整合单元测试类的注解
class Mybatis1ApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void test() {
        List<User> userList = userMapper.selectAllUser();
        for (User user : userList) {
            System.out.println(user);
        }
    }
}
```

在运行时可能有**动态加载Java代理的警告**不用管

```
WARNING: A Java agent has been loaded dynamically 
```

## 数据库与对象类型转换

数据库中的每一个字段都必须一一对应过来，且类型必须兼容

```java
@Data
public class User {
    private Integer id;
    private String name;
    private Short age;
    private Short gender;
    private String phone;
}
```

**时间日期对应**

| java          | mysql    |
| ------------- | -------- |
| LocalDate     | date     |
| LocalDateTime | datetime |

## 数据库连接池

移交到SpringBoot文档中

## 基础操作

#### crud与返回值

注解就和语句一样，什么注解就写什么语句，自增id就不插入即可

- 增，**可以直接插入对象，会根据字段映射**

  ```java
  @Insert("INSERT INTO user(name, age) VALUES(#{name}, #{age})")
  void insertUser(User user);
  ```

- 删

  ```java
  @Delete("delete from user where id = #{id}")
  int deleteUserById(Integer id);
  ```

- 改

  ```java
  @Update("UPDATE user SET age = #{age} WHERE name = #{name}")
  void UpdateUserAge(User user);
  ```

- 查

  ```java
  @Select("select * from user")
  List<User> selectAllUser();//String age, String gender
  ```

#### #{}与${}变量

都是参数替换，不同的是 #{}会对SQL语句进行预处理，可以防止SQL注入

#### 获取操作返回值

在crud接口中是有返回值的，返回值的类型为int，返回值是影响的记录数

```java
public int deleteUserById(Integer id);
```

#### 预编译SQL

在使用#{ }使用的不是直接拼接，而是编译成？占位符，mysql在检查SQL语法与优化sql之后会编译后在执行，编译后相同的sql会进入缓存，使用？占位符可以降低编译sql的次数，提升性能，还可以防止sql注入

#### 数据封装(驼峰配置)

查询的字段是对象的字段，可以自动封装进去

如果sql表中的数据和java对象中的属性名不一样就无法正常导入

有3种方法解决

- 起别名：在SQL语句中，对不一样的列名起别名，别名和实体类属性名一样。（AS AS可以省略）

- 手动映射：通过 @Results及@Result 进行手动结果映射，

```java
//查询全部用户信息
@Results({
    @Result(column = "user_id",property = "id"),
})
@Select("select * from user")
public List<User> selectAllUser();
```

- 开启驼峰命名:如果字段名与属性名符合驼峰命名规则，mybatis会自动通过驼峰命名规则映射。

```yml
# 开启驼峰命名自动映射，即从数据库字段名a_column 映射到Java 属性名 aColumn
mybatis.configuration.map-underscore-to-camel-case=true
```

#### 字符串拼接

有的时候会遇到 `'%${name}%'`这种，使用字符串拼接函数

```java
concat('%',#{name),'%’)
```

## XML映射文件

将sql放在xml配置文件中，使代码更加规整

- XML映射**文件的名**称必须与Mapper**接口名称一致**，**并且将XML映射文件和Mapper接口放置在相同包下(同包同名)**
- XML映射文件的**namespace属性为Mapper接口全限定名一致**。
- XML映射文件中sql**语句的id**与Mapper接口中**的方法名一致**，并**保持返回类型一致**。

补充：

- xml文件编写在mybatis文档中有
- 获取全类名，在接口上右键，获取全类名（xx.xxx.xxx(pojo).xx）

之后接口处就不用写注解和sql代码了，直接就能运行，快速定位

无需在application.properties中进行任何配置

#### xml结构

##### 基本结构

namespace

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="cc.liyinghao.mybatis1.mapper.UserMapper">

</mapper>
```

mapper头上的必须带

##### id与resultType

在mapper中编写sql语句

```xml
<mapper namespace="cc.liyinghao.mybatis1.mapper.UserMapper">
    <select id="selectAllUser" resultType="cc.liyinghao.mybatis1.pojo.User">
        SELET * FROM user;
    </select>
</mapper>
```

## XML标签

#### select

基本结构

```xml
<select id="pageQuery" resultType="com.sky.vo.DishVO">

</select>
```

- id：函数名
- resultType：返回值类型

## 动态sql

随着用户的输入或外部条件的变化而**变化的SQL语句**，称为 **动态SQL**

#### set

通常在**updata语句**中配合if使用，使用set字段包裹，会自动去结尾多出的 "，"

如：

```xml
<update id="updataUser">
    UPDATE user
    <set>
        <if test="name != null">
            name = #{name},
        </if>
        <if test="age != null">
            age = #{age},
        </if>
    </set>
    WHERE id = #{id}
</update>
```

####  if

用于判断条件是否成立。使用test属性进行条件判断，如果条件为true，则**拼接SOL**（跟拼接字符串似的，直接加一起）

**常在insert和uodate中使用与where同时使用**

**在判断为null时，通常也与!=''连用** 

**常见问题：如何值为int相关类型，不能与!=''连用，无法进行比较，会抛sql问题**

如在xml中：

```xml
<select id="selectAllUser" resultType="com.example.springtest1.entity.User">
    SELECT *
    FROM user
    <where>
        <if test="age != null">
            age = #{age};
        </if>
        <if test="gender != null">
            and gender = #{gender}
        </if>
    </where>
</select>
```

#### trim

如果下文有多个if，需要在末尾的SQL语句中加上，if标签并不能直接生成,需要trim辅助

- 在大量if中

```xml
<trim suffixOverrides=",">
    <if test="name != null">name = #{name},</if>
    <if test="username != null">username = #{username},</if>
    <if test="password != null">password = #{password},</if>
    <if test="phone != null">phone = #{phone},</if>
    <if test="sex != null">sex = #{sex},</if>
    <if test="idNumber != null">id_number = #{idNumber},</if>
    <if test="updateTime != null">update_time = #{updateTime},</if>
    <if test="updateUser != null">update_user = #{updateUser},</if>
    <if test="status != null">status = #{status},</if>
</trim>
```

#### where

动态生成where，**中的条件都成立，就会生成where，还会去and或or**，通常与if配合使用

```xml
<select id="pageQuery" resultType="com.sky.vo.DishVO">
    select d.* ,c.name as categoryName from dish d left outer join category c on d.category_id = c.id
    <where>
        <if test="name != null and name != ''">
            and d.name like concat('%',#{name},'%')
        </if>
        <if test="categoryId != null and categoryId != ''">
            and d.category_id = #{categoryId}
        </if>
        <if test="status != null and status != ''">
            and d.status = #{status}
        </if>
    </where>
    order by d.create_time desc
</select>
```



#### foreach

常见于多条插入

遍历集合，动态生成SQL语句，使用foreach可以更加灵活

如下

```sql
delete from User where id in(18,19,20)
```

- 删除案例

  ```xml
  <delete id="deleteUser">
      DELETE
      FROM user
      WHERE id in
      <foreach collection="id" item="id" open="(" separator="," close=")">
          #{id}
      </foreach>
  </delete>
  ```

- 插入案例（别忘了括号）

  ```xml
  <insert id="insertList" useGeneratedKeys="true" keyProperty="id">
      insert into dish_flavor (dish_id, name, value)
      <foreach collection="flavorList" item="flavor" separator="," open="values" close=";">
          (#{flavor.dishId}, #{flavor.name}, #{flavor.value})
      </foreach>
  </insert>
  ```

在其中有

- collection：指定要遍历的集合的名称。这个集合是一个 Java 对象的属性，或者是传递给 MyBatis Mapper 方法的一个参数。
- item：指定在循环过程中每次迭代的当前元素的名称。

#### include

包括一个代码片段，可以重复利用 使用id和refid进行配合

如

```xml
<sql id="commonSelect">
    select id, name, age, gender, phone FROM user
</sql>

<select id="selectAllUser" resultType="com.example.springtest1.entity.User">
    <include refid="commonSelect"/>
    <where>
        <if test="age != null">
            age = #{age};
        </if>
        <if test="gender != null">
            and gender = #{gender}
        </if>
    </where>
</select>
```

就能重复使用代码片段了

# 分页查询

这个比其他的要复杂点

**前端传来的参数**

- 当前页码：page
- 每页的展示记录数：pageSize

**后端需要给返回的数据**

- 数据列表：list （select * from emp limit x,x）
- 总记录数（目的是给前端看还有多少页）：total（select count(*) from emp）

需要PageBean

```java
@Data
public class PageBean {
    private Long total; //总记录数
    private List rows; //当前页码
}
```

## PageResult封装

非必要

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResult implements Serializable {

    private long total; //总记录数

    private List records; //当前页数据集合

}
```

## pageHelper

mybatis插件，本质上是一个拦截器，目的是简化持久层代码

不需要写limt了，插件会自动拦截sql语句并拼接limt进行分页

可能与mp有冲突

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>2.0.0</version>
</dependency>
```

#### 配置

```yml
pagehelper:
  helperDialect: mysql
  reasonable: true
  supportMethodsArguments: true
  params: count=countSql
  pageSizeZero: true
```

- helperDialect：指定方言
- reasonable：当传入的页码小于等于 0 时，会自动将页码调整为第 1 页。如果页码大于总页数时，会自动调整为最后一页。这种机制可以防止用户请求不合理的页码。
- supportMethodsArguments：可以通过 Mapper 接口的方法参数来传递分页参数，方便在接口中直接设置分页，而无需在配置文件中额外指定。
- params: count：配置 count 查询语句的参数设置。count=countSql 表示在执行分页查询时，会使用 countSql 参数来统计总记录数。这样可以更灵活地控制分页查询的 count`语句。
- pageSizeZero：当 pageSizeZero 设置为true 时，如果 pageSize为 0，PageHelper 会查询所有记录，而不进行分页。这个选项通常用于当用户想一次性获取全部数据时。

#### 详细步骤

1. Controller正常写，无需特殊写法

    ```java
    @GetMapping("/page")
    public Result<PageResult> page(EmployeePageQueryDTO employeePageQueryDTO){
        PageResult pageResult = employeeService.pageQuery(employeePageQueryDTO);
        return Result.success(pageResult);
    }
    ```

2. server层调用pageHelper中的方法，自动生成limt

    Page为pagehelper内置类

    ```java
    PageHelper.startPage(userPageDTO.getPage(),userPageDTO.getPageSize());
    Page<User> page = pageMapper.getUserPage();
    long total = page.getTotal(); //获取总记录数
    List<User> records = page.getResult(); //获取次页的数据
    return new PageResult(total,records);
    ```

3. 在SQL编写的时候也无需limt，直接查询，pagehelper会自动拼接

    ```java
    @Mapper
    public interface PageMapper {
        Page<User> getUserPage(); //select * from user
    }
    ```

#### 简化步骤

直接在mapper中传入pageNum和pageSize就可以了，需要在配置文件中开启，无需字service中进行任何编写

```java
@Select("select * from user")
List<User> selectUsers(int pageNum, int pageSize); //注意顺序，按照顺序来的，与名称无关，从1开始
```

- **`pageNum`**：当前页码。
- **`pageSize`**：每页的记录数。

# 注解

## @Param早期版本参数

早期版本需要在参数前加上@Param注解，要不然xml识别不到，这很重要

```java
int updateArticleContent(@Param("id") Integer id, @Param("content") String content);
```

## @Options主键返回

能且只能配合@Insert使用

#### useGeneratedKeys主键返回

在instert中使用，在数据添加成功后，需要获取插入数据库数据的主键(自增)
如：添加套餐数据时，还需要维护套餐菜品关系表数据。

```java
@Insert("INSERT INTO user (name, age) VALUES (#{name}, #{age})")
@Options(useGeneratedKeys = true, keyProperty = "id")
void insertUser(User user);
```

之后会自动将生成的主键值，并且自动赋值给emp对象的id属性

```java
User user = new User();
user.setName("李四");
user.setAge(30);

userMapper.insertUser(user);
System.out.println("生成的主键: " + user.getId());
```

#### 多主键返回

```xml
<insert id="insertOrder" useGeneratedKeys="true" keyProperty="orderId,productId">
    INSERT INTO orders (order_id, product_id, quantity) VALUES (#{orderId}, #{productId}, #{quantity})
</insert>
```

# 配置项

## mybatis-config.xml配置文件

通常位于resources文件夹下的mybatis目录，命名为约定

在配置文件中可以配置环境变量，数据库连接池，事务处理等。但是一般使用spring框架对其接管，很少使用mybatis的配置文件

- environments：配置数据库连接环信息。可以配置多个environment，通过defauLt属性切换不同的environment
- typeALiases：配置别名，引入返回类型后可以不指定全类命

```xml
<typeAliases>
  <package name="cc.liyinghao"/>
</typeAliases>
```

## 日志配置

是有默认的日志的需要开启

可以在application.properties中，打开mybatis的日志，并指定输出到控制台。

```
mybatis.configuration.log-impl=org,apache.ibatis.logging.stdout.StdOutlmpl
```

# 代码优化

## 统一设置处理类

在java的mybatis  update语句中，可以设置一个包含全部属性的动态sql语句作为修改类，简化开发

就比如

```xml
<update id="update" parameterType="com.sky.entity.Employee">
    update employee
    <set>
        <if test="name != null">name = #{name}</if>
        <if test="username != null">username = #{username}</if>
        <if test="password != null">password = #{password}</if>
        <if test="phone != null">phone = #{phone}</if>
        <if test="sex != null">sex = #{sex}</if>
        <if test="idNumber != null">id_number = #{idNumber}</if>
        <if test="updateTime != null">update_time = #{updateTime}</if>
        <if test="updateUser != null">update_user = #{updateUser}</if>
        <if test="status != null">status = #{status}</if>
    </set>
    where id = #{id}
</update>
```

# 常见问题

## 无法正确返回或返回值为null

1. 排查数据库与类的对应关系

## 无法使用@Value做默认值

在序列化时会被覆盖，无法使用

推荐在service时编写

## UUID与雪花算法

见mysql

## sql注入

输入的密码

```
' or '1' ='1
```

变成了

```sql
select count(*) from emp where username = 'wuieuwiueiwuiew' and password = ''or '1'= '1',
```

不管是什么都会返回true

# idea快捷键和插件

## Alt+enter生成xmlSQL

没有mapper.xml先在接口上创建

## idea_sql补全

这非常好用

```
代码自动补全功能是在设置里-〉编辑器-〉常规-〉代码完成，找到SQL，然后给勾上就行了
```

## MybatisX

下载MybatisX 插件，点鸟就可以跳转，xml配置正确，直接就可以生成sql标签

## sql提示

配置sql方言，可以实现sql提示

## 配色方案

设置 -- 编辑器 -- 配色方案 -- 注入的语言片段 --背景关闭 

之后就没有难看的绿色背景了

# java对应sql类型

# MyBatisGenerator(MBG)

mybatis代码生成器，一般单独建包使用

