# 介绍

和Mybatis为配合关系，不是用来替换Mybatis的，**两者互不影响，原有的代码都可以实现**

MybatisPlus特别适合单表，Mybatis适合多表

通过简单的配置，进行单表的crud

MybatisPlus与其他的orm框架极其相识

官方文档：https://baomidou.com/introduce/

# 使用方式

## 1.引入依赖

MybatisPlus提供官方依赖包，其中**包含mybatis和mybatisplus**，可以直接替换，之后无需引入mybatis了

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.3.1</version>
</dependency>
```

## 2.定义Mapper

自定义的Mapper继承MybatisPlus提供的BaseMapper接口

```java
public interface UserMapper extends BaseMapper<User>{

}
```

其中抱含了许多自带的crud方法，都是以名称分辨的

## 3.直接使用

在UserMapper中，无需写入单表的crud操作，直接在其他地方注入UserMapper，直接就有其中父类的方法了

# crud方法

1. **增**

    直接插入，直接插入对应的对象

    ```java
    userMapper.insert(user);
    ```

2. **删**

    id删除

    ```java
    userMapper.deleteById(5L);
    ```

3. **改**

    根据id修改

    ```java
    User user = new User();
    user.setId(5L);
    user.setBalance(20000);
    userMapper.updateById(user);
    ```

4. **查**

    id查询

    直接传入对应的id

    ```java
    userMapper.selectById(5L);
    ```

    多查询

    使用list返回一个列表

    ```java
    List<User> users = userMapper.selectBatchIds(List.of(1L, 2L, 3L, 4L));
    ```


# 获取返回值

自动获取返回值

```java
User user = new User();
user.setName("Alice");

// 插入数据
userMapper.insert(user);

// 获取插入后的主键 ID
System.out.println("插入成功，主键 ID 为: " + user.getId());
```

# 注解

## @TableName-指定表名

用来指定表名

## @Tableld-指定主键

用来指定主键信息

#### type指定算法

如果不指定，使用的是雪花算法

```
@Tableld(value="id",type= )
```

通过枚举实现3种算法

- **AUTO**：数据库自增长，无需指定
- **INPUT**：通过set方法自行输入
- **ASSIGN_ID**：分配lD，接口ldentifierGenerator的方法nextld来生成id，默认实现类为DefaultldentifierGenerator雪花算法

## @TableField-指定普通表信息

用来指定普通字段的信息，大多情况下不需要配置

```java
@TableField("`username`")
private String name;

@TableField(exist = false) //没有对应
```

**警告：一定要有主键，一个表只有一个id**

**警告：如果以is开头的属性，在MP进行反射时会自动去除掉is，bool属性不建议使用is开头**

**警告：如果类种的某个属性不是数据库种的关系，必须进行映射**

```java
@TableField（exist = false）
private String noUse
```

**警告：如果属性与关键字冲突也必须手动映射**

```java
@TableField("`order`")
private String address;
```

#### 自动注入

使用 @TableField 时可以配置自动注入

```java
@TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
private Date updateTime;
```

之后通过处理器配置

```java
@Component
public class MybatisHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        this.setFieldValByName("createTime", new Date(), metaObject);
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }
    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }
}
```

其中MetaObject是mybatislpus的反射类，无需在意

# 条件构造器Wrapper

**警告：使用Wrapper必须包含无参构造**

使用条件构造器目的是构造复杂的条件语句

通过构建不同的Wrapper来生成相对复杂的sql语句

## Wrapper生成语句

官方文档：https://baomidou.com/guides/wrapper/#_top

使用案例，通过链式调用

-  普通Wrappe

    ```java
    QueryWrapper<Business> wrapper = new QueryWrapper<Business>()
      .select("email")
      .like("name", "12");
    List<Business> Business = mpBusinessMapper.selectList(wrapper);
    Business.forEach(System.out::println);
    ```

- (推荐)LanbdaWapper，通过反射的方式传递参数，目的是解耦和避免错误

    ```java
    LambdaQueryWrapper<Business> wrapper = new LambdaQueryWrapper<Business>()
      .select(Business::getAddress)
      .like(Business::getName, "12");
    List<Business> Business = mpBusinessMapper.selectList(wrapper);
    Business.forEach(System.out::println);
    ```

#### eq 等值条件=

查询用户名和密码，与数据库进行比较

```java
LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
queryWrapper.eq(User::getPhone, userLoginDTO.getPhone())
        .eq(User::getPassword, userLoginDTO.getPassword());
return userMapper.selectOne(queryWrapper);
```

#### setsql 设置(set)

.setsql 相当于 SET 语句

```java
List<int> ids = List.of(1L,2L,4L);
UpdateWrapper<user> wrapper = new UpdateWrapper<User>()
	.setSql("balance - #{balance}")
	.in("id",ids);
userMapper.update(null,wrapper);
```

```xml
UPDATE user
SET balance = balance - #{balance}
wheree id in 
<foreach collection="ids" separator="," item="id" open="(" close=")">
	#{id}
</foreach>
```

## 自定义SQL

使用${}拼接sql的复杂方法，**目的是**避免service层中出现固定的sql代码和无法拼接的复杂方法

可以利用MyBatisPlus的Wrapper来构建复杂的Where条件，然后自己定义SQL语句中剩下的部分。

1. 基于wrapper构建where条件

2. 在mapper方法参数中用Param注解声明wrapper变量名称，必须是 ew (Param("ew"))

    ```java
    void updateBalanceById(@Param("ew") LbdaQuerywrapper<User> wrapper, @Param("amount"）int amount);
    ```

3. xml中自定义sql，并使用Wrapper条件

# Service接口

简化service操作，内置大量IService

相对于mapper，添加了大量的批处理功能


## 使用方法

需要继承ServiceImpl并传入基础的基础方法即可

```java
@Service
public class IUserServiceImpl extends ServiceImpl<MpUserMapper, User> implements IUserService {

}
```

# 扩展功能

## 代码生成器

背景：使用mp之前需要很多准备工作，如添加注解，继承各种BaseMapper等重复工作

目的：解决重复配置代码

可以实现：根据数据库自动生成对应的实体类和mapper，service并全部配置完成

缺点：为了生成代码，需要写一堆生成代码的代码

解决方案：通过idea插件(MybatisX,MyBatisPlus(初音未来))

# 插件

## 分页插件

也是基于拦截器进行分页

使用方法

1. 在配置类中注册配置类，同时添加分页插件(不配置也行，但是推荐配置)

    ```java
    @Configuration
    public class MybatisConfig implements MetaObjectHandler {
    
        @Bean
        public MybatisPlusInterceptor paginationInterceptor() {
            MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
            //创建分页插件
            PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor();
            //设置最大单页限制数量，默认 500 条
            paginationInnerInterceptor.setMaxLimit(50L);
            //添加分页插件
            interceptor.addInnerInterceptor(paginationInnerInterceptor);
            return interceptor;
        }
    }
    ```

2. 构建wapper，使用selectPage方法进行分页查询

    ```java
    int pageNumb = 1, pageSize = 60;
    //1. 创建分页对象
    Page<User> page = Page.of(pageNumb, pageSize);
    //2.排序条件
    page.addOrder(new OrderItem("id",true));
    //3.分页查询Wrapper
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    //4.查询条件
    queryWrapper.like("username", "2");
    
    Page<User> userPage = userMapper.selectPage(page, queryWrapper);
    List<User> users = userPage.getRecords(); //查询结果
    System.out.println("当前页：" + userPage.getCurrent());
    System.out.println("每页大小：" + userPage.getSize());
    System.out.println("总记录数：" + userPage.getTotal());
    System.out.println("总页数：" + userPage.getPages());
    for (User user : users) {
        System.out.println(user);
    }
    ```

    

## 通用分页实体

# 配置项

全局配置低于特定配置

与mybatis配置相同，基本上无需配置，使用注解即可满足大多数需求

```yml
mybatis-plus:
  type-aliases-package: com.itheima.mp.domain.po #别名扫描包
  mapper-locations:"classpath*:/mapper/**/*.xml" # Mapper.xml文件地址，默认值
  configuration:
    map-underscore-to-camel-case: true #是否开启下划线和驼峰的映射
    cache-enabled: false # 是否开启二级缓存
  global-config:
    db-config:
      id-type: assign_id # id为雪花算法生成update-strategy:not_null #更新策略:只更新非空字段
```

## 开启sql log

可以在控制台上打印使用的sql，在开发和debug时非常有用

```yml
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

# 常见问题

## MP与M版本不匹配

mybatis和mybats plus之间有可能版本不匹配，在启动时会有一下错误

```
Correct the classpath of your application so that it contains compatible versions of the classes com.baomidou.mybatisplus.core.MybatisMapperAnnotationBuilder and org.apache.ibatis.session.Configuration
```

使用MP会自带M的依赖，使用自带的依赖即可

修改版本并不能解决问题，查看是否有其他的依赖依赖的mybatis

常见的使用mybatis的依赖

- pageHelper

## 类和数据库表对应信息

MyBatisPlus通过扫描实体类，并基于反射获取实体类信息(字节码)作为数据库表信息

```java
public interface UserMapper extends BaseMapper<User>
```

传入的实体类User，获取字节码后对数据库进行操作

## 表和对象的对应关系

有以下约定

1. 类名驼峰转下划线为表名
2. 名为id的为主键
3. 变量名**驼峰转下划线**为字段名

**警告：一定要有主键，一个表只有一个id**

**警告：如果以is开头的属性，在MP进行反射时会自动去除掉is，bool属性不建议使用is开头**

**警告：如果类种的某个属性不是数据库种的关系，必须进行映射**

```java
@TableField（exist = false）
private String noUse
```

**警告：如果属性与关键字冲突也必须手动映射**

```java
@TableField("`order`")
private String address;
```
