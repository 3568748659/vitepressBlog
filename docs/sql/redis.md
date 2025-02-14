# 介绍

Redis诞生于2009年全称是Remote DictionaryServer，远程词典服务器，是一个**基于内存**的键值型NoSQL数据库，配合其他数据库使用，把经常使用的数据放到内存（Redis）中以减少io操作，通过设置过期时间防止内存爆炸，还有存点验证码，session之类的

**特点**

- 为Key Value 键值形式，常见形式为 id:json 


- NoSQL数据库 redis没有表，也没有约束
- 单线程(网络为多线程)，每个命令自带原子性
- 低延迟，速度快，io多路复用
- 支持主从集群，分片集群
- 语言支持性好

# 安装

redis没有官方的windows版本，只能在linux，macOS中安装

**apt安装**

apt可以直接安装，如果想装最新的版本，需要严格执行官网命令

```
sudo apt install redis-server
```

## 添加用户组

默认只有root用户可以进入redis目录，通过添加用户组添加其他用户进入etc/redis下的目录 需要重启终端

```
sudo usermod -aG redis liyinghao505
```

# 语言连接

官网[Connect with Redis clients | Docs](https://redis.io/docs/latest/develop/connect/clients/)  其中有星的代表推荐使用

# 常见配置

在redis.conf中进行配置

- 端口

  ```
  bind x.x.x.x
  ```

- 守护进程保护在后台运行

  ```
  daemonize yes
  ```

- 密码

  ```
  requirepass 密码
  ```

- 端口

  ```
  port 6379
  ```

- 工作目录，命令日志持久化保存地址

  ```
  dir .
  ```

- 数据库数量，代表可以使用几个库

  ```
  databases 16
  ```

- 设置最大使用内存

  ```
  maxmemory 64mb
  ```

- 日志文件

  ```
  logfile /var/log/redis/redis-server.log
  ```

## 配置文件地址



## 库配置

在redis中，没有库相关操作，在配置文件中可以配置开启多少个库，在语言连接操作时配置连接第几个库

默认有16个库

## 配置检测

可以发现配置中的错误，非常好用

```
sudo redis-server /etc/redis/redis.conf --test
```

# 连接

## 命令行客户端

使用redis-cli命令行连接redis

```
redis-cli [options] [commonds]
```

#### 常见的options

- -h 指定地址
- -p 指定端口
- -a 指定密码
- -n 指定库 后接数字

也可以不指定密码直接进入，之后

```
AUTH 密码
```

## 图形化客户端

推荐redis lnsight

redis官方网址下载

# 数据类型

5中基本类型，3种特殊类型

其中Key全部为String类型的，value有5种类型

**基本类型**

1. **字符串 String**：`hello world`
2. **哈希 Hash**：`{ "name": "Jack", "age": "21" }` （类似于 `HashMap`，常用于存储对象）
3. **列表 List**：`[A -> B -> C -> C]`（可以排序，可以有重复元素，类似 `LinkedList`，适合有序存储）
4. **集合 Set**：`{A, B, C}`（无序集合，没有重复元素，类似于 `HashSet`）
5. **有序集合 Sortedset/zset**：`{A: 1, B: 2, C: 3}`

**特殊类型**

- **GEO**：`{A: (120.3, 30.5)}`
- **BitMap**：`0110110101110101011`
- **HyperLog**：`0110110101110101011`

## String命令

key value为键值 seconds为秒

- 设置指定key的值

  ```
  SET key value
  ```

- 获取指定key的值

  ```
  GET key
  ```

- 设置指定key的值，并将 key 的过期时间设为 seconds 秒

  ```
  SETEX key seconds value
  ```

- 只有在 key 不存在时设置 key 的值

  ```
  SETNX key value
  ```

## hash哈希命令

哈希表结构，特别适合存储对象

一个key 

vale为键值对形式field value

命令以H开头

- 将哈希表 key 中的字段 field 的值设为 value

  ```
  HSET key field value
  ```

- 获取存储在哈希表中指定字段的值 value

  ```
  HGET key field 
  ```

- 删除存储在哈希表中的指定字段 value

  ```
  HDEL key field
  ```

- 获取哈希表中所有字段

  ```
  HKEYS key
  ```

