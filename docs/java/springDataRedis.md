# redis客户端

java中常见3种连接方式

- **Jedis：**以Redis命令作为方法名称，学习成本低，简单实用。但是Jedis实例是线程不安全的，多线程环境下需要基于连接池来使用
- **lettuce：**Lettuce是基于Netty实现的，支持同步、异步和响成式编程方式，并且是线程安全的。支持Redis的哨兵模式、集群模式和管道模式。
- **Redisson：**Redisson是一个基于Redis实现的分布式、可伸缩的Java数据结构集合。包含了诸如Map、0ueue、LockSemaphore、AtomicLong等强大功能

还用一种更为常见的，为SpringDataRedis为Jedis和lettuce的整合版本

**Jedis**

官方地址：https://github.com/redis/jedis

**maven地址**

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>5.0.0</version>
</dependency>
```

**使用步骤**

1. 引入依赖
2. 建立连接
3. 测试string
4. 释放资源

jedis是线程不安全的，需要建立连接池

# SpringDataRedis

SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SpringDataRedis

- 提供了对不同Redis客户端的整合(Lettuce和edis)
- 提供了RedisTemplate(核心)统一API来操作Redis
- 支持Redis的发布订阅模型
- 支持Redis哨兵和Redis集群
- 支持基于Lettuce的响应式编程
- 支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化
- 支持基于Redis的JDKcollection实现(jDK的各种集合)

## 连接配置

1. 引入配置坐标

   推荐在创建时引入在NoSQL种选择Spring Data Redis (Access+Driver)

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-redis</artifactId>
   </dependency>
   ```

2. 配置数据源

   ```yml
   spring:
     data:
       redis:
         host: localhost
         port: 6379
         # password: yourpassword  # 如果没有密码，可以不设置
         database: 0  # 默认为0
         timeout: 6000ms  # 连接超时时间
         lettuce:
           pool:
             max-active: 8 # 最大连接
             max-idle: 8 # 最大空闲连接
             min-idle: 0 # 最小空闲连接
             max-wait: 100 # 连接等待时间
   ```

3. 编写配置类config/RedisConfiguration，创建RedisTemplate对象

   ```java
   //常见的redisconfig
   @Configuration
   @Slf4j
   public class RedisConfig {
       @Bean
       public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
           RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
           // 设置连接工厂 由Start包自动注入
           redisTemplate.setConnectionFactory(redisConnectionFactory);
           // 设置String序列化器
           redisTemplate.setKeySerializer(new StringRedisSerializer());
           redisTemplate.setValueSerializer(new StringRedisSerializer());
           
           log.info("RedisTemplate注入成功");
           return redisTemplate;
       }
   }
   ```

4. 通过RedisTemplate对象操作redis

## RedisTemplate类

redis工具类

SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API封装到了不同的类型中:

| API                         | 返回值类型      | 说明                  |
| --------------------------- | --------------- | --------------------- |
| redisTemplate.opsForValue() | ValueOperations | 操作String类型数据    |
| redisTemplate.opsForHash()  | HashOperations  | 操作Hash类型数据      |
| redisTemplate.opsForList()  | ListOperations  | 操作List类型数据      |
| redisTemplate.opsForSet()   | SetOperations   | 操作Set类型数据       |
| redisTemplate.opsForZSet()  | ZSetOperations  | 操作Sortedset类型数据 |
| redisTemplate               |                 | 通用的命令            |

## redis序列化器

 redisTemplate.opsForValue接收的并不是单纯的String字符串，接收的**为Object对象**，转成redis可以处理的字节，设置序列器后可以直接根据构造函数储存对象（json），获取时会自动反序列化为对象

但是在redis自动序列化时会有**弊端**，会把序列化的对象一起存储在reids中，造成内存浪费

为了节省内存空间，我们并不会使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value。当需要存储Java对象时，手动完成对象的序列化和反序列化。

## 连接池

连接池配置

Jedis和Spring Data Redis底层都会使用commons-pool2实现连接池

```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

# 常见规范

## key命名方式

建立RedisConstants类，存放字符串常量

命令规范为   功能:种类

```java
public class RedisConstants {
    public static final String LOGIN_CODE_KEY = "login:code:";
    public static final Long LOGIN_CODE_TTL = 2L;
    public static final String LOGIN_USER_KEY = "login:token:";
    public static final Long LOGIN_USER_TTL = 36000L;

    public static final Long CACHE_NULL_TTL = 2L;

    public static final Long CACHE_SHOP_TTL = 30L;
    public static final String CACHE_SHOP_KEY = "cache:shop:";

    public static final String LOCK_SHOP_KEY = "lock:shop:";
    public static final Long LOCK_SHOP_TTL = 10L;

    public static final String SECKILL_STOCK_KEY = "seckill:stock:";
    public static final String BLOG_LIKED_KEY = "blog:liked:";
    public static final String FEED_KEY = "feed:";
    public static final String SHOP_GEO_KEY = "shop:geo:";
    public static final String USER_SIGN_KEY = "sign:";
}
```

## :命名

常见的login:code中间的:不是白来的，会形成目录结构 :: 会生成[Empty]路径

# SpringRedis操作

```java
@Autowired
private RedisTemplate redisTemplate;

@Test
public void testRedisTemplate(){
    System.out.println(redisTemplate);
    //string数据操作
    ValueOperations valueOperations = redisTemplate.opsForValue();
    //hash类型的数据操作
    HashOperations hashOperations = redisTemplate.opsForHash();
    //list类型的数据操作
    ListOperations listOperations = redisTemplate.opsForList();
    //set类型数据操作
    SetOperations setOperations = redisTemplate.opsForSet();
    //zset类型数据操作
    ZSetOperations zSetOperations = redisTemplate.opsForZSet();
}
```

## 1.String字符串

```java
@Autowired
RedisTemplate<String,String> redisTemplate;
```

- 设置键值对

  ```java
  redisTemplate.opsForValue().set("name","小明");
  ```

- 根据键获取值

  ```java
  String city = redisTemplate.opsForValue().get("name");
  ```

- 设置值同时设置过期时间

  ```java
  redisTemplate.opsForValue().set(key,value,time, TimeUnit.MINUTES);
  ```

  - time：时间
  - TimeUnit.MINUTES：单位

- 设置如果不存在（不存在就会创建 存在不会修改）

  ```java
  redisTemplate.opsForValue().setIfAbsent("lock","1");
  ```

- 获取key的值

  ```java
  redisTemplate.opsForValue().get("220");
  ```

- 获取过期时间

  ```java
  redisTemplate.getExpire("22", TimeUnit.HOURS);
  ```


## 2.Hash哈希

哈希表中可以存储任意形式的键值对

更加适**合存储对象**，增加修改更加灵活，且占用内存更小

```java
@Autowired
RedisTemplate<String,String> redisTemplate;
HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
```

- 设置哈希 key hashKey value

  ```java
  hashOperations.put("100","name","tom");
  ```

- 获取哈希表值

  ```java
  String name = (String) hashOperations.get("100", "name");
  ```

- 获取全部哈希key

  ```java
  Set<Object> keys = hashOperations.keys("100");
  ```

- 获取全部哈希值

  ```java
  List<Object> values = hashOperations.values("100");
  ```

- 删除对应哈希

  ```java
  hashOperations.delete("100","age");
  ```

## 3.List列表

集合中的index为数字

```java
@Autowired
RedisTemplate<String,String> redisTemplate;

ListOperations<String, String> listOperations = redisTemplate.opsForList();
```

- 多个头插

  ```java
  listOperations.leftPushAll("mylist","a","b","c");
  ```

- 单个头插

  ```java
  listOperations.leftPush("mylist","d");
  ```

- 查询

  ```java
  List<String> mylist = listOperations.range("mylist", 0, -1);
  ```

- 尾删

  ```java
  listOperations.rightPop("mylist");
  ```

- 输出长度

  ```java
   Long size = listOperations.size("mylist");Long size = listOperations.size("mylist");
  ```

## 4.set集合



## 5.zet有序集合



# key过期回调

在redis配置类中添加配置

```java
@Bean
MessageListenerAdapter listenerAdapter(RedisKeyExpirationListener listener) {
    return new MessageListenerAdapter(listener);
}

@Bean
RedisMessageListenerContainer container(RedisConnectionFactory connectionFactory,
                                        MessageListenerAdapter listenerAdapter) {
    RedisMessageListenerContainer container = new RedisMessageListenerContainer();
    container.setConnectionFactory(connectionFactory);
    // 监听键过期事件
    container.addMessageListener(listenerAdapter, new PatternTopic("__keyevent@0__:expired"));
    return container;
}
```

之后在{}就可以获取过期key的回调了

```java
@Component
public class RedisKeyExpirationListener implements MessageListener {
    @Override
    public void onMessage(Message message, byte[] pattern) {
        String expiredKey = message.toString();
        // 处理文件删除逻辑，比如根据 expiredKey 查找并删除对应的文件
        System.out.println("Key expired: " + expiredKey);
    }
}
```

# 使用案例

# 缓存

缓冲区 Cache 临时存储数据，读写性能较高

- 优点
    1. 降低后端负载
    2. 提高读写效率，降低响应时间 
- 缺点
    1. 数据库一致性成本
    2. 代码维护成本
    3. 运维成本

对于小性服务，不用缓存也是个好主意

## 缓存流程

客户端向redis发送请求，命中直接返回。未命中查询数据库，向redis中写入缓存，之后返回

![image-20241118下午103345225](../../../../Library/Application%20Support/typora-user-images/image-20241118%E4%B8%8B%E5%8D%88103345225.png)

# Spring Cache

通过注解的方式实现缓存

## @EnableCaching

开启缓存注解功能，通常加在启动类上

## @Cacheable

在方法执行前先查询缓存中是否有数据，如果有数据，则直接返回缓存数据，如果没有缓存数据，调用方法并将方法返回值放到缓存中

## @CahePut

将方法返回值放到缓存中

```

```



## @CacheEveict

将一条或多条数据从缓存中删除