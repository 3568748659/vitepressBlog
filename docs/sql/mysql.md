独立于其他编程语言，只有基本操作与概念

mysql不区分任何大小写

# 警告与快速查找

警告：不要在任何小内存主机上安装mysql，mysql单单是启动就需要400M的内存，非常容易内存爆炸！！

插入表：INSERT INTO 表名 [(字段名1,字段名2,...)] VALUES(值1,值2,..);

联合查询 ：union all

自增： ID int NOT NULL **AUTO_INCREMENT**

按首字母排序

1. AUTO_INCREMENT 自动增长
2. CURRENT_TIMESTAMP 函数返回当前时间 
3. UNSIGNED unsigned 无符号 只能为正
4. UNIQUE 唯一 通过创建唯一索引保证唯一
5. DEFAULT default 默认值约束 后接默认值 如DEFAULT 'user'
6. DATETIME 时间类型 YYYY-MM-DD HH:MM:SS
7. ON UPDATE 更新时自动修改 一般后接CURRENT_TIMESTAMP
8. KEY 创建索引   KEY 索引名称 (被创建索引的字段)

# 相关配置

## 命令行操作

### linux进入

- 没有密码

```
sudo mysql -u root
```

- 有密码

```
sudo mysql -u root -p密码
```

## 配置文件

#### 远程连接

1. 开防火墙
2. 在/etc/mysql/mysql.conf.d/mysql.cnf 修改 bind-address = 0.0.0.0
3. 修改用户的登录地址 update user set host = '%' where user ='root';

mysql user表查询允许端口

```sql
SELECT host, user FROM user;
```

## 运行sql文件

记得添加sudo权限

```
sudo mysql -u root -p < ~/sql/mysql/lyxkl.sql
```

## sqlshell

mysql工具，全安装就是自带的

命令行输入

```
mysqlsh
```

出现高亮提示符成功

使用反斜线开头的，如

```
\connect root@localhost    //连接数据库
```

```
\use name       //要连接的数据库名
```

## 关键字冲突

这个很烦，如order（次序）等都会有冲突，可以使用``包裹，**添加下滑线**也是不错的

在添加反引号时要注意，如果你的字段确实是关键字，在插入搜索的时候也必须添加反引号，如果不是关键字在建表时添加了反引号建表，在搜索时可以不加

# 数据类型

## 数字数据类型

| 类型        | 大小    | 有符号范围                                          | 无符号范围                                            | 描述               |
| :---------- | ------- | --------------------------------------------------- | ----------------------------------------------------- | ------------------ |
| tinyint     | 1 byte  | -128，127                                           | 0，255                                                | 小整数             |
| smallint    | 2 byte  | -32768，32767                                       | 0，65535                                              | 小整数             |
| mediumint   | 3 byte  | -8388608，8388607                                   | 0,16777215                                            | 大整数值           |
| int/integer | 4 bytes | -247483648，2147483647                              | 0，4294967295 **四十二亿**                            | 大整数值           |
| bigint      | 8 bytes | -2^63，2^63-1                                       | 0，2^4-1                                              | 极大整数值         |
| float       | 4 bytes | -3.402823466 E+38，3.402823466351 E+38              | 0 和 1.175494351 E-38，3.402823466 E+38               | 单精度浮点数值     |
| double      | 8 bytes | -1.7976931348623157 E+308，1.7976931348623157 E+308 | 0 和 2.2250738585072014 -308，1.7976931348623157 +308 | 双精度浮点数值     |
| decimal     |         | 依赖于M(精度)和D(标度)的值                          | 依赖于M(精度)和D(标度)的值                            | 小数值(精确定点数) |

#### 无符号

无符号即没有负数，在全是正数的情况下可以节省空间

使用无符号方法

在声明的类型之后加上  UNSIGNED

```
`id` INT UNSIGNED AUTO_INCREMENT COMMENT '用户ID',
```

#### decimal高精度

存储精确数值的列类型，通常用于需要高精度的场景，例如金融计算、统计分析

字符串形式存储数值（而不是二进制浮点数），避免了浮点数的精度问题。

```
DECIMAL(18,2) # 最多 18 位数字，保留 2 位小数。
```

## 字符数据类型

| 类型       | 大小                                   | 描述                                     |
| ---------- | -------------------------------------- | ---------------------------------------- |
| char       | 0~255 bytes                            | 定长字符串                               |
| varchar    | 0~65535 bytes                          | 变长字符串                               |
| blob       | 0~65 535 bytes                         | 二进制文本数据（还有很多）               |
| TEXT       | 最大长度：65,535 字节                  | 存储中等大小的文本，如博客文章或评论。   |
| MEDIUMTEXT | 最大长度：16,777,215 字节（约16 MB）   | 存储较大的文本，如文章、文档。           |
| LONGTEXT   | 最大长度：4,294,967,295 字节（约4 GB） | 存储非常大的文本，如书籍内容或大型文档。 |

- char 定长字符串 如果长度不足预设依然占用预设的大小 在后补空格
- varchar 边长字符串 如果长度不足会自己

## 日期时间数据类型

| 类型     | 大小 | 范围                                      | 格式                | 描述                 |
| -------- | ---- | ----------------------------------------- | ------------------- | -------------------- |
| date     | 3    | 1000-01-01~9999-12-31                     | YYYY-MM-DD          | 日期值               |
| time     | 3    | --838:59:59~838:59:59                     | HH:MM:SS            | 簣涟螅间值或持续时间 |
| year     | 1    | 1901~2155                                 | YYYY                | 年份值               |
| datetime | 8    | 1000-01-01 00:00:00 ~ 9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值     |

## json数据类型

mysql  5.7.8开始支持

- **作用：**mysql会检验json的正确性，如{},"key":"value"，重复key等，并且会去除回撤，自动排序等

    但是仅仅验证json的正确性，并不会验证key的类型，依然可以添加/修改原来的key

- **优点：**存json

- **缺点：**无法大量的更新，添加新字段

    ​	案例：价钱表添加新字段，如果使用单独的表存储，很容易添加新字段，但是使用json无法添加新的key

# DCL用户配置

**Data Control Language**数据控制语言   管理数据库用户   控制数据库的访问权限

MySql中的用户信息存储在用户表中  

用户表名：mysql

## 配置用户密码

1. 初始用户是root没有密码，可以直接进入

2. 进入后进入mysql表，更新密码并更新权限

   ```sql
   use mysql;
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '密码';
   FLUSH PRIVILEGES;
   ```

3. 之后就能使用新密码登录了

## 管理用户

- 查询用户

```sql
use mysql;
select * from user;
```

- 创建用户

```sql
create user '用户名'@'主机名' identified by '密码';
```

- 修改用户密码

```sql
alter user '用户名'@'主机名' identified with mysql_bative_password（mysql的加密方式） by '新密码'
```

主机名可以使用%配置通配

- 删除用户

```sql
drop user '用户名'@'主机名'
```

## MySQL user表结构

Host：在mysql中需要一个用户名加上一个主机地址才能定位到一个用户，主机地址是指当前用户能在哪一个主机上访问数据库

## MySQL user权限控制

直接创建的用户没有一点权限，需要添加

MySQL中定义了很多种权限，但是常用的就以下几种:

| 权限                | 说明               |
| ------------------- | ------------------ |
| ALL, ALL PRIVILEGES | 所有权限           |
| SELECT              | 查询数据           |
| INSERT              | 插入数据           |
| UPDATE              | 修改数据           |
| DELETE              | 删除数据           |
| ALTER               | 修改表             |
| DROP                | 删除数据库/表/视图 |
| CREATE              | 创建数据库/表      |

**sql语句：**

- 查询权限

```sql
SHOW GRANTS FOR'用户名'@'主机名’;
```

- 授予权限

```sql
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
```

- 撤销权限

```sql
REVOKE 权限列表 ON 数据库名.表名 FROM'用户名'@'主机名’
```

注意：

- 多个权限之间，使用逗号分隔
- 授权时，数据库名和表名可以使用*进行通配，代表所有

#### 权限控制举例

- 查询权限

```sql
show grants for 'heima'@'%';
```

- 授子权限

```sql
grant all on itcast.* to 'heima'@'%';
```

- 撤销权限

```sql
revoke all on itcast.* from 'heima'@'%';
```

## 查看权限

- 查看某个用户在某张表上的权限

```sql
SHOW GRANTS FOR 'username'@'hostname';
```

- 查看所有用户在某张表上的权限

```sql
SHOW GRANTS FOR CURRENT_USER();
```

# SQL语句

### 创建表总览

```sql
CREATE TABLE Orders (
    OrderID int PRIMARY KEY, # 指定主键
    ProductID int comment 'id', # comment 'id' 注释
    OrderDate date,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) # 指定外键，自动生成外键名称
  	CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`id`) # 添加外键约束 
);
```

## DDL

**Data Definition Language**数据定义语言，主要目的是  **查询/创建/删除表**

**注意：**最后一列不要有逗号，且建议给列名加上``，保证不与关键字冲突

### 查询所有数据库

有哪些数据库

```
show databases;
```

### 创建数据库

```sql
create database 数据库名;
create database if not exists 数据库名; //存在就不创建
create database 数据库名 default charset utf8mb4;//设置字符集 (不建议使用utf8 utf8单个为3字节（一个汉字）但是有4字节的特殊符号无法保存 utf8mb4为4字节) 
```

### 删除数据库

```sql
drop database if exists 数据库名;
```

### 使用数据库

```sql
use 数据库名;
```

### 查看当前在哪个库

```sql
select database();
```

### 查看表名

```sql
show tables;
```

### 查看表结构

有哪些字段

```sql
desc 表名
```

### 查询表的构建语句

```sql
show create table 表名;
```

### 表修改/alter

- 修改数据库名

不能修

- 添加字段

```sql
alter table 表名 add 字段名 类型（长度） [comment 注释] [约束];
```

- 修改字段类型

```sql
alter table 表名 change 字段名 字段名 新的数据类型;
```

- 修改字段名和字段类型

```sql
alter table 表名 change 旧字段名 新字段名 类型 [comment 注释][约束];
```

- 删除字段

```sql
alter table 表名 drop 字段名
```

- 修改表名

```sql
alter table 表名 rename to 新表名; 
```

- 删除表

```sql
drop tablr[id exists] 表名;
```

## DML

**Data Manipulation Language**数据操作语言,添 删 改 insert  update delete

### 插入字段(insert into values)

- 给指定字段添加数据

    ```sql
    INSERT INTO 表名 [(字段名1,字段名2,...)] VALUES(值1,值2,..);
    ```

- 给全部字段添加数据

    ```sql
    INSERT INTO 表名 VALUES (值1,值2,…);
    ```

- 批量添加数据（插入多条数据）

    ```sql
    INSERT INTO 表名 (字段名1,字段名2,..) VALUES (值1,值2,..),(值1,值2,..),(值1,值2,..);
    ```

    ```sql
    INSERT INTO 表名 VALUES (值1,值2,….),(值1,值2,….),(值1,值2,….);
    ```

如果需要插入多表，可以使用事物

### 更新字段(update set where)

```sql
update 表名 set 字段名1 = 值1， 字段名2 = 值2,... [where 条件]
```

 **警告：如果没有条件，则会修改整张表的所有数据。**

eg：

- 将id为1的name改成77

```sql
updata name_table set name = '77' where id = 1;
```

- 把所有低于７５分的女生成绩提高5%;

```sql
UPDATE sc
SET grade = grade * 1.05
WHERE sno IN (SELECT sno FROM stu WHERE sex = 0)
AND grade < 75;
```

### 删除字段(delete from where)

删除表中的指定字段

```
delete from 表名 [where 条件]
```

 **警告：如果没有条件，则会删除整张表的所有数据**

DELETE 语句不能删除某一个字段的值(可以使用UPDATE(UPDATE 为 空))。

## DQL

**Data Query Language**数据查询语言，与DML的区别是不会改变数据库中的内容

### 基础查询

#### select  from AS

- from 不要翻译成 "从"  翻译成 "根据" 更好

```sql
SELECT sno,sname,major FROM Student;  
```

- as表示作为 为输出的名字


```sql
SELECT tname AS 姓名 FROM Teacher; 
```

其中as也可以省略

```sql
SELECT tname 姓名 FROM Teacher; 
```

#### distinct去重

在sc下查找sno并且去重

```sql
SELECT distinct sno FROM SC;   
```

### 条件查询

```sql
select 字段列表 from 表名 where 条件列表;
```

#### 条件选项

在where条件中可以使用

| 字段             | 意思                                    |
| ---------------- | --------------------------------------- |
| />/>=/<=/=/!=    | 大于/小于/不等于                        |
| between...and... | 在某个范围之间（含最大最小）            |
| in(...)          | 在in之后的列表中的值，多选一            |
| like             | 模糊匹配( 匹配单个字符,%匹配任意个字符) |
| is NULL          | 是NULL                                  |
| AND/&&           | 并且(多个条件同时成立)                  |
| OR/              | 或者(多个条件任意一个成立)              |
| not/!            | 非，不是                                |

#### 条件查询案例

- 查询生日在2005年的学生  year()

```sql
SELECT sname , birthdate from student where year(birthdate) = 2005;
```

- 查询分数小于60的学生 <


```sql
select sno from sc where grade<60;
```

- 查询生日大于的学生 >


```sql
select sname,gender,birthdate from student where birthdate > '2006-01-30';
```

- 查询semester在246的  in


```sql
select cno,cname from course where semester in (2,4,6);
```

- 不在范围内的  not in


```sql
select sno,sname,gender,birthdate,major from student where major not in ('计算机科学','软件工程');
```

- 不是空的  not null


```sql
select sno,cno,grade from sc where grade is not null;
```

- 名字的第二个字为样（_表示占位符单字符    %表示多字符）


```sql
select sname,sno from student where sname like '_洋';
```

- 查询不姓刘的   not like


```sql
select tname from teacher where tname not like '刘_';
```

- 查询包含指定字段的  like


```sql
select cno,ccredit from course where cname like '%数据库%';
```

- 多条件查询  and


```sql
select sname,birthdate from student where major  = '计算机科学' and gender = '女'; 
```

### 聚合函数

将一列函数作为整体，进行纵向计算

| 函数  | 功能     |
| ----- | -------- |
| max   | 最大值   |
| min   | 最小值   |
| sum   | 求和     |
| avg   | 平均值   |
| count | 统计数量 |

语法：

```
select 聚合函数（字段列表） from 表名;
```

**注意：所有的null值不参与计算**

#### 聚合函数举例

- 统计学生的总人数

```sql
SELECT count(id) AS 总人数 FROM Student;
```

- 查询c01的平均成绩

```sql
SELECT AVG(grade) 平均成绩 FROM SC WHERE cno = 'c01';
```

- 统计年龄之和

```sql
select sum(age) from emp;
```

- 嵌套使用 大于平均值

```sql
SELECT *
FROM Course
WHERE period > (
        SELECT AVG(period) 
        FROM Course
  );
```

### 分组查询（group/having）

核心字段   `group by`  `having`

语法：

```sql
select 字段列表 from 表名 [where 条件] group by 分组字段名 [having 分组后过滤条件]
```

where与having区别

- 执行时机不同:where是分组之前进行过滤，不满足where条件，不参与分组;而having是分组之后对结果进行过滤。
- 判断条件不同:where不能对聚合函数进行判断，而having可以。

**注意：**

执行顺序: where >聚合函数>having
分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义

#### 分组查询举例

- 统计男性员工和女性员工的数量，根据性别分组

```sql
select gender,count(*) from emp group by gender;
```

- 统计男性员工和女性员工的平均年龄

```sql
select gender,avg(age) from emp group by gender;
```

- 查询年龄小于45的员工 ，并根据工作地址分组 ，获取员工数量大于等于3的工作地址

```sql
select workaddress, count(*) from emp where age < 45 group by workaddress having count(*) >= 3;
```

**这个比较复杂，拆开来看**

1.查询年龄小于45的员工 

```sql
select * from emp where age < 45；
```

2.根据工作地址分组

```sql
select * from emp where age < 45 group by workaddress ；
```

3.添加工作地统计

```sql
select workaddress, count(*) from emp where age < 45 group by workaddress
```

4.通过having筛选统计结果

```sql
select workaddress, count(*) from emp where age < 45 group by workaddress having count(*) >= 3;
```

### 排序查询

核心语句  `order by`

语法：

```sql
SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1,字段2 排序方式2;
```

- `order by`表示分组，按相同的分成一堆一堆的
- `ASC` 表示升序排序。
- `DESC` 表示降序排序。

**注意:**如果是多字段排序，当第一个字段值**相同**时，才会根据第二个字段进行排序

#### 排序查询举例

- 根据年龄对公司的员工进行升序排序

```sql
select * from emp order by age asc;
```

- 根据入职时间，对员工进行降序排序

```sql
select * from emp order by entrydate desc;
```

- 根据年龄对公司的员工进行升序排序，年龄**相同**，再按照入职时间进行降序排序

```sql
select *from emp order by age asc,entrydate desc;
```

### 分页查询

核心语句  `limt`

- 语法

```sql
SELECT 字段列表 FROM 表名 LIMIT 起始索引, 查询记录数;
```

**注意：**

- 起始索引从0开始，起始索引=(查询页码-1)*每页显示记录数。
- 分页查询是数据库的方言，不同的数据库有不同的实现，MySQL中是LIMIT
- 如果查询的是第一页数据，起始索引可以省略，直接简写为limit 10

#### 分页查询案例

- 查询第1页员工数据，每页展示10条记录

```sql
select *from emp limit 0,10;
```

- 查询第2页员工数据，每页展示10条记录-------->(页码-1)*页展示记录数

```sql
select *from emp limit 10,10;
```

### 子查询

有嵌套的就是子查询

如：

```sql
SELECT 
    name, 
    (SELECT MAX(salary) FROM employees) AS highest_salary 
FROM 
    employees;
```

### sql的执行顺序与总结

1. from
2. where
3. group by
4. select
5. order by
6. limit


### 联合查询

核心语句：`union` `union all`

对于union查询，就是把多次查询的结果合并起来(同时发送给数据库)，形成一个新的查询结果集。

对于联合查询的多张表的列数必须保持一致，字段类型也需要保持一致。

union all 会将全部的数据直接**合并**在一起，union 会对合并之后的数据**去重**。

语法：

```sql
SELECT 字段列表 FROM 表A...
UNION [ ALL ]
SELECT 字段列表 FROM 表B ...;
```

### 多表连查

核心语句是`join/on`

**!!在多表查询的时候非常建议加.限定作用域，select时两张表都会统计!!**

**但是不用加加了可能有报错**

要做什么？

1. 加上限定域的select from 从根据的表（不一定是要查询的所在表）
2. join on 关联两表相同的地方
3. 之后在该分组分组，该干嘛干嘛

有两张表

```sql
users
------
user_id (int, primary key)
username (varchar)
email (varchar)
```

```sql
orders
------
order_id (int, primary key)
user_id (int, foreign key referencing users.user_id)
product_name (varchar)
quantity (int)
```

现在，我们想要检索每个用户的姓名和他们的订单信息，我们可以使用以下 SQL 查询：

```sql
SELECT users.username（非常建议加.）, orders.product_name, orders.quantity
FROM users
JOIN orders（第二张表名） ON （两张表关联的地方）users.user_id = orders.user_id;
```

假设我们想要检索用户及其订单信息，但只包括已完成的订单。我们可以在 `JOIN` 条件中添加额外的条件。

```sql
SELECT users.username, orders.product_name, orders.quantity
FROM users
JOIN orders ON users.user_id = orders.user_id
WHERE orders.status = 'completed';
```

三表连接

```sql
SELECT users.username, products.product_name, orders.quantity
FROM users
JOIN orders ON users.user_id = orders.user_id
JOIN products ON orders.product_id = products.product_id;
```

**案例**

查询计算机科学专业刘晨选修课程的课程名

```sql
SELECT Course.cname
FROM Student
JOIN SC ON Student.sno = SC.sno
JOIN Course ON SC.cno = Course.cno
WHERE Student.sname = '刘晨' AND Student.major = '计算机科学';
```

查询借阅了2本书以上的读者编号和姓名

```sql
select reader_ID, readerName from reader 
join borrow on reader.reader_ID = borrow.reader_ID 
GROUP BY reader.reader_ID
HAVING COUNT(*) >2
```

#### 内连接查询

查询两种表相关的部分

- **隐式内连接：**通过`where`语句实现

```sql
select 1.name,2.nameselect * from 1,2 where 1.id = 2.id; from 1,2 where 1.id = 2.id;
```

- **显式内连接：**通过`join/on`语句实现

```sql
SELECT 字段列表 FROM 表1 JOIN 表2 ON 连接条件 …;
```

#### 外连接查询

如一张表中存员工，一张表存领导，要查询所有员工和对应的领导（没有领导的员工也能查出来），就要使用外连接查询

分为左外连接和右外连接

- 左外连接`left`

相当于查询表1(左表)的所有数据 包含 表1和表2交集部分的数据

```sql
select e.*,d.name from emp e left join dept d on e.dept_id = d.id;
```

- 右外连接`right`

相当于查询表2(右表)的所有数据 包含 表1和表2交集部分的数据

```sql
select d.*, e.* from emp e right join dept d on e.dept id = d.id;
```

**注意：**使用左外连接的最多，两种连接是可以相互转换的，更改from和join的顺序就行了

#### 自连接查询

通过建立别名（必须）的方式自己与自己进行查询，使用场景如


- 自连接查询语法

```sql
SELECT 字段列表 FROM 表A 别名 A JOIN 表A 别名B ON 条件...;
```

自连接查询，可以是内连接查询，也可以是外连接查询

**自连接查询举例：**

- 查询员工 及其 所属领导的名字

```sql
select a.name ,b.name from emp a,emp b where a.managerid = b.id;
```

- 查询所有员工 emp 及其领导的名字emp，如果员工没有领导，也需要查询出来

```sql
select a.name '员工',b.name '领导'from emp a left join emp b on a.managerid = b.id;
```

## TCL

**Transaction Control Language**事务控制语言

在下文事物中

# 约束/check/unique/default/not null

六种

| 类型       | 语法                                         | 作用                                                         | 使用案例                                             |
| ---------- | -------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| 主键约束   | PRIMARY KEY                                  | 确定表中的标识列，主键字段不能为空且必须唯一                 | PRIMARY KEY (`id`),                                  |
| 外码约束   | foreign key(外码列)  references 表名(主码列) | 确定表与表之间的联系方式，一般情况下通过主表的标识列进行确定 | FOREIGN KEY (`product_id`) REFERENCES product (`id`) |
| 非空约束   | not null                                     | 确定这个字段中的数据必须不能为空                             | NOT NULL                                             |
| 检查约束   | check                                        | 设置这个字段中的数据特性                                     | CHECK (Price > 0)                                    |
| 唯一值约束 | unique                                       | 确定这个字段中的数据必须是唯一存在的                         | UNIQUE (ProductName),                                |
| 默认值约束 | default                                      | 如果我们不设置默认值，系统默认为NULL                         | CURRENT_TIMESTAMP                                    |

## 主键

主键的目的如下

1. 唯一标识每一条记录
2. 会创建索引，提升效率

#### 联合主键

两个字段组成主键

单id可以重复，但是不可以两个同时相同

案例

```
CREATE TABLE student_course (
    student_id INT,        -- 学生ID
    course_id INT,         -- 课程ID
    PRIMARY KEY (student_id, course_id)  -- 联合主键，保证同一学生只能选同一门课程一次
);
```

## 外键

FOREIGN KEY

为约束，被引用的列通常是该表的主键 PRIMARY KEY 或唯一键 UNIQUE KEY

**声明语法**

在表尾声明

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

在表中声明

```sql
creat table xxx(
	number char(10) references 表名(主码列)
)
```

MySQL支持在外键上设置级联操作来定义在删除或更新父表中的记录时对外键的影响。这些操作包括

1. **CASCADE**：当父表中的记录被删除或更新时，相应的子表记录也会被删除或更新。
2. **SET NULL**：当父表中的记录被删除或更新时，相应的子表记录的外键列会被设置为NULL。
3. **RESTRICT**：阻止删除或更新父表中的记录，默认行为。
4. **NO ACTION**：与RESTRICT相同，阻止删除或更新父表中的记录。

#### 外键行为

注意：外键不检查是否为空

添加行为方法

```sql
CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
```

| 行为              | 含义                                                         | 目的                                             |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| ON DELETE CASCADE | 表中的某行被删除时， 表中所有引用该行的记录将自动被删除。    | 避免无效的外键引用，保持数据一致性。             |
| ON UPDATE CASCADE | 表中的 ，值被更新时， 表中所有引用此值的记录会自动更新为新值。 | 确保外键引用始终指向正确的记录，防止数据不一致。 |
|                   |                                                              |                                                  |

## default默认

默认是0

```sql
gender tinyint(1) NOT NULL DEFAULT 0,
```

## 自增

(方言) 在MySQL中，可以使用 AUTO_INCREMENT 属性来定义自增列，一般作用于id（主码）：

```sql
CREATE TABLE Employees (
    ID int NOT NULL AUTO_INCREMENT,
    FirstName varchar(255),
    LastName varchar(255),
    Email varchar(255),
    PRIMARY KEY (ID)
);
```

使用alter语句：

```sql
ALTER TABLE Employees MODIFY ID int NOT NULL AUTO_INCREMENT;
```

之后在插入的时候自定字段就不用指定，如果不指定字段，自增设置为NULL

```sql
insert into employees values(NULL,"lyh");
```

在设置自增后依然可以设置值，之后会按着新设置的值进行自增

# 函数

### AUTO_INCREMENT自动增长

#### 设置增长起始值

```sql
CREATE TABLE `hall`
(
    `id`        int UNSIGNED AUTO_INCREMENT
) AUTO_INCREMENT = 15;
```

### 字符串函数

- CONCAT(S1,S2,.....)   -->  字符串拼接，将S1 S2 拼接成一个字符串
- LOWER(str)                -->  全部转小写
- UPPER(str)                 -->  全部转大写
- LPAD(str,n,pad)         -->  左填充，用字符串pad对str左进行填充，达到n个字符串长度	

- RPAD(str,n,pad)         -->  右填充，用字符串pad对str右进行填充，达到n个字符串长度

**常在统一位数的时候使用，如007，008，009，010（不足自动补零）**

```
lpad('01',5,'-')//---01
rpad('01',5,'-')//01---
```

- TRIM(str)                     -->  去掉字符串头部和尾部的空格
- SUBSTRING                -->  substring

```
substring('Hello mysql',1,5) //Hello
```

### 数值函数

- CEIL(X)         --> 向上取整
- FLOOR(x)     --> 向下取整
- MOD(x,y)     --> 返回x/y的模
- RAND()         --> 返回0~1内的随机数
- ROUND(x,y) --> 求参数x的四舍五入值，保留y位小数

### 日期函数

- year(now())获取时间

now为当前时间 数据库中的时间可以使用 2014-11-4这种格式

```sql
SELECT sname AS 姓名, year(now())-year(birthdate) AS 年龄 FROM Student; 
```

### 流程函数

指一段直接被另一程序调用的程序和代码

# 事务

事物是一组操作的组合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统同时提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

如银行转账

目的是：在发生异常时回滚数据，维持数据同步

**注：**在新版的mysql中已经不会在出现下面这种问题了

```sql
update money set money=money-100 where name='张三';
asasas --代表错误
update money set money=money+100 where name='李四';
```

以上的代码依然可以执行张三和李四的数据不会受到中间错误的影响

### 自动提交与手动提交

`自动`提交点击运行直接提交了

`手动`提交需要有commit指令才会提交

**注意：**在SET @@autocommit = 0;后没有提交记录也是会保存的，会在下一次提交的时候一起提交

- 查看/设置事务提交方式/开启事物

```
SFLFCT @@autocommit;
SET @@autocommit=0;

#开启事物
start transaction  /  begin
```

- 提交事务

```
COMMIT;
```

- 回滚事务

```
ROLLBACK;
```

### 事务的4大特性

1. 原子性(Atomicity):事务是不可分割的最小操作单元，要么全部成功，要么全部失败
2. 一致性(Consistency):事务完成时，必须使所有的数据都保持一致状态。
3. 隔离性(lsolation):数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。
4. 持久性(Durability):事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

### 事务并发问题

- **脏读：**一个事务读到另外一个事务还没有提交（更新了但是还没有commit）的数据。
- **不可重复读：**一个事务先后读取同一条记录，但两次读取的数据不同（在两次查询中间更新了），称之为不可重复读。
- **幻读：**一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在（一般为唯一主键存在，导致无法插入），好像出现了幻影”。



### 事物隔离级别

默认可重复读，读已提交，读未提交，串行化

mysql的默认级别！（不同的数据库不同）


从上到下隔离级别逐渐上升，性能逐渐下降

#### 查看事物隔离级别

```sql
SELECT @@TRANSACTION_ISOLATION;
```

#### 设置事物隔离级别

```sql
set session/global transaction isolation level（ read uncommitted 隔离级别）;
```

# 存储引擎

存储引擎就是存储数据、建立索引、更新/查询数据等技术的实现方式。存储引擎是**基于表的（每张表可以有不同的存储引擎）**，而不是基于库的，所以存储引擎也可被称为**表类型**。

**InnoDB是默认的 MySQL 存储引擎。**

在创建表的时指定存储引擎

使用查询表语句可以查看存储引擎

```
show create table xxx;
```

- 查看有哪些可用的引擎

```
show engins;
```

### innoDB

- 介绍

InnoDB是一种兼顾高可靠性和高性能的通用存储引擎，在 MySQL5.5之后，**InnoDB是默认的 MySQL 存储引擎。**

- 特点

1. DML操作遵循ACID模型，**支持事务**;
2. **行级锁**，提高并发访问性能;
3. **支持外键** FOREIGN KEY约束，保证数据的完整性和正确性

- 文件

xxx.ibd:xxx代表的是表名，innoDB引擎的每张表都会对应这样一个表空间文件，存储该表的表结构(frm（8.0之前）、sdi)、数据和索引。参数:innodb_file_per_table

- 存储逻辑


### MyISAM

- 介绍

MyISAM是MySOL早期的默认存储引擎。（5.5）

- 特点

1. 不支持事务，不支持外键
2. 支持表锁，不支持行锁
3. 访问速度快

- 文件

1. xxx.sdi:存储表结构信息
2. xxx.MYD:存储数据
3. xxx.MYI:存储索引

### Menory

- 介绍

Memory引擎的表数据时存储在内存中的，由于受到硬件问题、或断电问题的影响，只能将这些表作为临时表或缓存使用。

- 特点

1. 内存存放
2. hash索引(默认)

- 文件

xxx.sdi:存储表结构信息

### 存储引擎选择


- **InnoDB:**  是Mysql的默认存储引擎，支持事务、外键。如果应用对事务的完整性有比较高的要求，在并发条件下要求数据的一致>性，数据操作除了插入和查询之外，还包含很多的更新、删除操作，那么InnoDB存储引擎是比较合适的选择。（**只有innoDB支持事物**）
- **MVISAM : ** 如果应用是以**读取操作和插入操作为主**，只有**很少的更新和删除操作**，并且对事务的完整性、并发性要求不是很高，那么选择这个存储引擎是非常合适的。（日志数据，电商评论）
- **MEMORY: ** 将所有数据保存在内存中，访问速度快，通常用于临时表及缓存。MEMORY的缺陷就是对表的大小有限制，太大的表无法缓存在内存中，而且无法保障数据的安全性。（缓存）

**省流补充：**MVISAM 不如  mongoDB    MEMORY 不如Redis  

# 索引

英文就是 index  是一种数据结构 方便快速查找获取数据的

索引是单独的物理数据库结构，表中的一个或多个列

在设计表中查看索引

- **索引的优点：**提高数据检索的效率，降低数据库的I0成本，通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗。

- **索引的缺点：**索引列也是票占用空间的（很小，硬盘便宜，忽略不计）索引大大提高了查询效率，同时却也降低更新表的速度，如对表进行INSERT、UPDATE、DELETE时，效率降低。

## 索引类型

- **B+Tree索引：**最常见的索引类型，大部分引擎都支持 B+树索引，最主要，最重要的索引
- Hash索引：底层数据结构是用哈希表实现的,只有精确匹配索引列的查询才有效,不支持范围查询
- R-tree(空间索引)：空间索引是MVISAM引擎的一个特殊索引类型，主要用于**地理空间数据类型**，通常使用较少
- Full-text(全文索引)：是一种通过建立倒排索引,快速匹配文档的方式。类似于Lucene,Solr,ES

### 不同引擎的支持类型


### 索引的数据结构

数据结构可视化

```
https://www.cs.usfca.edu/~galles/visualization/Algorithms.html
```

#### B树

***向上分裂行成（重点）***的**多节点指针（树的度数（树的度数指的是一个节点的子节点个数。））**的**树型（二叉树，红黑树）**数据结构


#### B+树

B树的变种，***所有的元素都会出现在叶子节点**，**形成单项链表**。**非叶子节点提供索引作用**

在向上形成B树的**同时（重点，在分裂时必定形成新的节点指针）**在字节点保存，形成单项链表，构成B+树
#### MySQL B+树

MySQL索引数据结构对经典的B+Tree进行了优化。在原B+Tree的基础上，增加一个指向相邻叶子节点的链表指针，就形成了带有顺序指针的B+Tree，提高区间访问的性能。


**补：**应为B+数本身属于B树，所以在mysql中使用`show index from table_name`出的结构类型还是B树，实际为B+树

##### B+树高度补充

关于B+树的高度的补充，在二叉树中有高度问题，在B+树中没有，因为B+树的节点只存放指针，所以B+树在MySQL的高度非常非常离谱，基本上不会大于3（2千万条记录），大于3就必须要分表了


#### Hash

哈希索引就是采用一定的hash算法，将键值换算成新的hash值，映射到对应的槽位上，然后存储在hash表中。

两个值对应在同一个哈希表格中称为哈希冲突，也叫哈希碰撞

**Hash索引特点**

1. Hash索引只能用于对等比较(=，in)（因为哈希表），不支持范围查询(between，>，<，...)
2. 无法利用索引完成排序操作
3. 查询效率高，通常只需要一次检索（不出现哈希碰撞）就可以了，效率通常要高于B+tree索引

**Hash支持的存储引擎**、

在MSQL中，支持hash索引的是Memory引擎，而innoDB中具有**自适应hash**功能，hash索引是存储引擎根据B+Tree索引在**指定条件下自动构建**的。

### 索引分类

- 主要的索引分类

| 分类     | 含义                                                         | 特点                    | 关键字   |
| -------- | ------------------------------------------------------------ | ----------------------- | -------- |
| 主键索引 | 针对于表中主键创建的索引                                     | 默认自动创建,只能有一个 | PRIMARY  |
| 唯一索引 | 避免同一个表中某数据列中的值重复                             | 可以有多个              | UNIQUE   |
| 常规索引 | 避免同一个表中某数据列中的值重复                             | 可以有多个              |          |
| 全文索引 | 全文索引查找的是文本中的关键词，而不是比较索引中的值（很少使用） | 可以有多个              | FULLTEXT |

#### 聚集/二级索引/回表查询

- 在innoDB中，根据索引的存储型形式又可以分为

| 分类                      | 含义                                                       | 特点                |
| ------------------------- | ---------------------------------------------------------- | ------------------- |
| 聚集索引(Clustered Index) | 将数据存储与索引放到了一块，索引结构的叶子节点保存了行数据 | 必须有,而且只有一个 |
| 二级索引(Secondary Index) | 将数据与索引分开存储，索引结构的叶子节点关联的是对应的主键 | 可以存在多个        |

注：二级索引又叫辅助索引/非聚集索引

聚集索引(Clustered Index)的特点是**必须有**，且有一个，但是在开发中并不需要指定聚集索引，为自动选择的，选择规则如下（innoDB）：

- 如果存在主键，**主键**索引就是聚集索引
- 如果不存在主键，将使用第一个**唯一**(UNIQUE)索引作为聚集索引。
- 如果表没有主键，或没有合适的唯一索引，则InnoDB会自动生成一个**rowid作为隐藏的聚集索引**


**聚集索引存储的是行内容（row），二级索引存储的是聚集索引（id）**




## 联合索引

## 索引语法

### 默认索引

**主码，外码，唯一值（UNIQUE）**会默认创建索引，无需手动创建

### 创建索引

innoDB默认创建是数据结构就是B+树

```sql
creat [unique|fulltext] index index_name on table_name(index_col_name,...)
```

在其中

```sql
creat [unique（唯一索引，内容必须为不重复的）|fulltext（全文索引）]（可选） index index_name on table_name（表名）(index_col(列)_name,...)（表中的字段名）（一个索引可以关联多个字段,只关联单个字段叫单列索引，关联了叫多个联合/组合索引）
```

**注：**联合索引上文也有

### 查看索引

查看表已有的索引 

```sql
show index from table_name
```

### 删除索引

```sql
drop index index_name on table_name
```

# 视图/存储过程/触发器

- 可以简化操作，特别是在多表联查的时候

## 视图

视图(View)是一种虚拟存在的表。视图中的数据并不在数据库中实际存在，行和列数据来自定义视图的查询中使用的表（基本表），并且是在使用视图时动态生成的。
通俗的讲，视图只保存了查询的SQL透辑，不保存查询结果。所以我们在创建视图的时候，主要的工作就落在创建这条SOL查询语句上

视图是从基本表查出来的，不是实际存在的，是查出来的，建立在基础查询之上的(不会提升性能)

在create table 创建的叫基本表  Base Table 

对数据库进行权限管理，对数据保密，方便查询（在已经筛选过的条件下又筛选）

### 视图基本操作

#### 创建视图

```sql
create [or replace] view 视图名称[(列名列表)] as select语句 [with [cascaded|local] check option]
```

在其中

```sql
create [or replace]*（或者被替换） view 视图名称[(列名列表)] as select语句 [with [cascaded|local] check option]
```

#### 查询视图

- 查看创建视图的语句

```sql
show create view view_name
```

#### 从视图中查询

和正常的select语句相同 只是from视图名

```sql
select * from view_name;
```

#### 修改视图

```sql
CREATE [OR REPLACE] VIEW 视图名称((列名列表)AS SELECT语句 WITH[CASCADED|LOCAL] CHECK OPTION]
```

```sql
alter view 视图名称[(列名列表)] as select 语句 [ with [ cascaded | local ] check option ]
```

#### 删除视图

```sql
drop view [if exists] 视图名称[视图名称]
```

### 在视图中插入

在mysql中是可以对视图进行添加的，添加后的数据会**直接存储在源表中**，可以通过检查选项判定是否可以插入

```sql
insert into view_name values(xxx)
```

#### 视图插入的检查选项

在创建视图的时候设置`with local check option`或`with cascaded check option `

```sql
create or replace view stu_v 1 as select id,name from student where id <= 20 with local check option;
```

- with cascaded check option （默认值）满足所有视图where（视图是可以建立在视图之上的）

- with local         check option    只检查本表

在添加with cascaded check option之前，如果在视图中插入是不会检查的

eg：

在下面的视图中,如果不添加with cascaded check option的插入就不会根据where的条件判断

```sql
create view v1 as select id,name from student where id <= 20;
```

#### 视图的更新

要使视图可更新，视图中的行与基础表中的行之间必须存在一对一的关系。如果视图包含以下任何一项，则该视图不可更新:

- 聚合函数或窗口函数(SUM()、MIN()、MAX()、COUNT()等
- DISTINCT
- GROUP BY
- HAVING
- UNION 或者 UNION ALL

# 锁

锁是计算机协调多个进程或线程**并发访问某一资源的机制**。在数据库中，除传统的计算资源(CPU、RAM、I/0)的争用以外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。

### 锁分类

- 全局锁:锁定数据库中的所有表。
- 表级锁:每次操作锁住整张表。
- 行级锁:每次操作锁住对应的行数据。

### 全局锁

主要目的是数据库备份

全局锁就是对整个数据库实例加锁，加锁后整个实例就处于**只读状态（可以进行select）**，后续的DML的写语句，DDL语句，已经更新操作的事务提交语句都将被阻塞（**防止数据库中的多表不一致，保证数据的完整性**）
其典型的使用场景是做全库的逻辑备份，对所有的表进行锁定，从而获取一致性视图

**语句：**

```sql
flush tables with read lock ; -- 进行数据库锁
mysqldump -uroot -p1234 itcast> itcast.sql  -- 进行备份，在windows命令行进行
unlock tables; -- 解锁
```

**缺点：**

数据库中加全局锁，是一个比较重的操作，存在以下问题:

1. 如果在主库上备份，那么在备份期间都不能执行更新，业务基本上就得停摆
2. 如果在从库上备份，那么在备份期间从库不能执行主库同步过来的二进制日志(binlog)，会导致主从延迟

在InnoDB引擎中，我们可以在备份时加上参数--single-transaction 参数来完成**不加锁的一致性数据备份**

```
mysqldump --single-transaction -uroot -p123456 itcast > itcast.sql
```

### 表级锁

表级锁，**每次操作锁住整张表**。锁定粒度大，发生锁冲突的概率最高，并发度最低。应用在MVISAM、InnoDB、BDB等存储引擎中

主要是在数据导出时使用，但是能用快照，也不是很常用了

**表级锁主要分类:**

1. 表锁
2. 元数据锁(meta datalock，MDL)
3. 意向锁

**语法：**

1. 加锁：lock  tables  表名  read/write（表共享读锁（read lock）表独占写锁(write lock)）
2. 释放锁：unlock tables/客户端断开连接

**读锁：**只能读，不能写，其他客户端同样

**写锁：**其他不能读，也不能写，自己（当前客户端）能读也能写

读锁不会阻塞其他客户端的读，但是会阻塞写。写锁既会阻塞其他客户端的读，又会阻塞其他客户端的写

#### 元数据锁（meta data lock，MDL)

属于表级锁

MDL加锁过程是系统自动控制，**无需显式使用（无需手动配置）**，在访问一张表的时候会自动加上。MDL锁主要作用是维护表元数据的数据一致性，在表上有活动事务的时候，不可以对元数据进行写入操作。**为了避免DML与DDL冲突，保证读写的正确性。**

在MySQL5.5中引入了MDL，当对一张表进行增删改查的时候，加MDL读锁(共享);当对表结构进行变更操作的时候，加MDL写锁(排他)。

| 对应SQL                                        | 锁类型                                | 说明                                             |
| ---------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| lock tables xxx read/write                     | SHARED_READ_ONLY/SHARED_NO_READ_WRITE |                                                  |
| select、select ... lock in share mode          | SHARED_READ（共享_读）                | 与SHARED_READ、SHARED_WRITE兼容，与EXCLUSIVE互斥 |
| insert 、update、delete、select ... for update | SHARED_WRITE（共享_写）               | 与SHARED_READ、SHARED_WRITE兼容，与EXCLUSIVE互斥 |
| alter table ...                                | EXCLUSIVE（独家,排他锁）              | 与其他的MDL都互斥                                |

#### 查看元数据锁

```sql
select object_type,object_schema,object_name,lock_type,lock_duration from perfomance_schema.metadata_locks;
```

#### 意向锁

为了避免DML在执行时，加的行锁与表锁的冲突，在InnoDB中引入了意向锁，使得表锁不用检查每行数据是否加锁，使用意向锁来减少表锁的检查。

翻译翻译：如果有一行加锁了，要看他有没有锁，要一行一行的找，非常浪费性能，给整个表加一个意向锁，就不用一行一行找了，方便了不少


分为：

1. **意向共享锁(IS)**：由语句 select... lock in share mode添加。与表锁共享锁(read)兼容，与表锁排它锁(write)互斥
2. **意向排他锁(IX)**：由insert、update、delete、select... for update 添加。与表锁共享锁(read)及排它锁(write)**都互斥**。意向锁之间不会互斥

#### 查看意向锁的加锁情况

```sql
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;
```

# 其他

## COLLATE排序规则

使用方法

```sql
CREATE TABLE `user`
(
    `id`       int UNSIGNED AUTO_INCREMENT COMMENT '用户id'；
) COLLATE = utf8_general_ci;
```


| 排序规则               | 特点                                                         |
| ---------------------- | ------------------------------------------------------------ |
| **utf8_general_ci**    | 通用规则，忽略大小写，性能较好，但对语言特性支持不够精确。   |
| **utf8_bin**           | 按二进制值进行比较，区分大小写，严格区分字符（`a != A`，`ß != ss`）。 |
| **utf8_unicode_ci**    | 基于 Unicode 标准规则，支持更精确的语言特性排序，但性能稍差。 |
| **utf8mb4_general_ci** | 类似于 `utf8_general_ci`，但支持完整的 UTF-8 编码（包括 Emoji 和特殊字符）。 |
| **utf8mb4_unicode_ci** | 基于 Unicode，支持所有字符，排序规则更精确，推荐用于多语言系统。 |

# 常见问题

## 为什么不推荐自增id

1. 范围固定，后期很难调整
2. 后期无法将两种表迁移合并
3. 分布式系统id会有冲突

## UUDID主键有哪些问题

- 由于B+树的索引设计，查询性能不高
- 32位太长了，影响空间

## 1.为什么InnoDB存储引擎选择使用B+tree索引结构而不使用二叉树，红黑树，B树，哈希?

二叉树在顺序插入行成链表，性能很低，且有层级过多的问题

红黑树本质也是二叉树，也会有层级过多的问题

B树相对于二叉树层级更少，搜索效率更高

对于B-tree，无论是叶子节点还是非叶子节点，都会保存数据，这样导致一页中存储的键值减少，指针跟着减少，要同样保存大量数据，只能增加树的高度，导致性能降低

B+树因为所有的数据都存在底部，形成双向链表，叶子节点只提供查找索引辅助，搜索结果稳定，范围查找方便

相对Hash索引不支持范围匹配及排序操作，根本用不了

## 2.执行效率对比

以下SQL语句，那个执行效率高?为什么?

1. select *from user where id=10;
2. select *from user where name ='Arng';

备注: id为主键，name字段创建的有索引;

答：1，1为聚集索引，2为二级索引，多了回表查询的过程，差了10倍（倍数完全不固定，且差异很大）

## 3.关系型数据库与非关系型数据库的区别

**关系型数据库最典型的数据结构是表，由二维表及其之间的联系所组成的一个数据组织**
优点：
1、易于维护：都是使用表结构，格式一致；
2、使用方便：SQL语言通用，可用于复杂查询；
3、复杂操作：支持SQL，可用于一个表以及多个表之间非常复杂的查询。
缺点：
1、读写性能比较差，尤其是海量数据的高效率读写；
2、固定的表结构，灵活度稍欠；
3、高并发读写需求，传统关系型数据库来说，硬盘I/O是一个很大的瓶颈。

**非关系型数据库严格上不是一种数据库，应该是一种数据结构化存储方法的集合，可以是文档或者键值对等。**

优点：

1、格式灵活：存储数据的格式可以是key,value形式、文档形式、图片形式等等，文档形式、图片形式等等，使用灵活，应用场景广泛，而关系型数据库则只支持基础类型。
2、速度快：nosql可以使用硬盘或者随机存储器作为载体，而关系型数据库只能使用硬盘；
3、高扩展性；
4、成本低：nosql数据库部署简单，基本都是开源软件。

缺点：

1、不提供sql支持；
2、**无事务处理；**
3、数据结构相对复杂，复杂查询方面稍欠。

# 知识补充

## idea插件

还有一些小插件，非常好用了

视图或右侧的 数据库

添加库 -> 属性 -> 架构

**快捷插件**

在select表格后，点击表格的内容是可以直接修改的，修改完成后可以点提交

可以导出为各种各样的格式（json sql语句 xml）

## ROW_FORMAT = Dynamic;

 **InnoDB 存储引擎**的一种行存储格式配置，用于控制表中数据的物理存储方式，为mysql 5.7之后的默认方式

**作用：**

1. **动态行格式 (Dynamic Row Format)**
    `Dynamic` 是一种 **InnoDB** 行格式，它可以更灵活地存储长字段（如 `TEXT` 和 `BLOB` 类型）以及包含可变长度字段的表。
2. **特点**：
    - 可变长度字段（如 `VARCHAR`, `TEXT`, `BLOB`）的值 **尽可能存储在主表页之外** 的溢出页中，仅在主表页中保留一个指针。
    - 对于小字段，数据仍然存储在主表页中（尽可能减少对溢出页的使用）。
    - 能够更好地利用存储空间，减少数据页的碎片，提高读取性能。
3. **动态行格式的优势**：
    - **更高效的存储**：如果有大量的长字段，使用 `Dynamic` 格式可以避免主表页因为字段过长而导致的空间不足。
    - **优化 I/O**：主表页中只存储指针，数据本身存储在溢出页中，减少了读取表页时加载的数据量。
    - **兼容性更强**：在某些情况下，`Dynamic` 格式支持更大的行大小（与 Antelope 格式的 `Compact` 相比）。

## 慢SQL日志

有默认的，默认没开

## 性能分析

- InnoDB和MyISAM


- 不同事物的隔离级别


## 主从结构，读写分离

我现在还不会，下面由gpt4o生成

**主从结构**

**主从结构（Master-Slave Architecture）**是一种数据库复制（Replication）技术，包含一个主数据库（Master）和一个或多个从数据库（Slave）。其工作机制如下：

1. **主数据库（Master）：** 负责处理所有的写操作（INSERT、UPDATE、DELETE 等）以及读取操作。主数据库中的数据会通过二进制日志（binlog）记录下所有的写操作。
2. **从数据库（Slave）：** 从数据库通过复制主数据库的二进制日志，将写操作同步到自身，从而保持与主数据库的数据一致性。通常从数据库主要用来处理读取操作（SELECT）。

**优点：**

- **数据冗余：** 数据同时存在于多个数据库中，提高了数据的安全性和可用性。
- **负载均衡：** 可以通过将读取操作分散到多个从数据库上，减轻主数据库的负担，提高查询性能。

**读写分离**

**读写分离（Read-Write Splitting）** 是指将数据库的读操作和写操作分离开来，以提升数据库的性能和处理能力。其具体实现方式通常结合主从结构来进行：

1. **写操作**：所有的写操作（如插入、更新、删除）都直接发送到主数据库。
2. **读操作**：所有的读操作（查询）都发送到从数据库。通过负载均衡机制，可以将读操作分布到多个从数据库上，从而提高查询效率。

**优点：**

- **性能提升：** 读写分离可以有效分担主数据库的压力，使其主要负责写操作，从数据库主要负责读操作，提高整体性能。
- **扩展性：** 可以通过增加从数据库来处理更多的读请求，具有很好的横向扩展能力。

**实现方式**

- **配置主从复制**：在主数据库和从数据库之间配置数据复制，使得从数据库能实时同步主数据库的数据变化。
- **使用代理层**：例如 MySQL Proxy、ProxySQL 等，可以在应用程序和数据库之间添加代理层，自动将写请求转发到主数据库，将读请求分发到从数据库。
- **应用程序逻辑处理**：在应用程序的代码中明确指定哪些操作是读操作，哪些是写操作，并将其分别发送到不同的数据库实例。

## 快照

在数据库和计算机系统中，快照（Snapshot）是一种捕获和保存系统在某一特定时刻状态的技术。具体而言，快照可以包括文件系统快照、数据库快照、虚拟机快照等。下面是对不同类型快照的详细解释：

#### 文件系统快照

文件系统快照是在某个时间点对整个文件系统的一个精确拷贝。常见的文件系统快照工具包括 ZFS 和 LVM。文件系统快照的特点包括：

1. **时间点一致性**：快照捕获的是文件系统在创建快照时的状态，不受后续更改影响。
2. **空间效率**：大多数文件系统快照是写时复制（Copy-on-Write）技术，只有在数据更改时才会记录差异，从而节省存储空间。
3. **快速创建和恢复**：快照的创建和恢复操作非常迅速，适用于快速备份和数据恢复。

#### 数据库快照

数据库快照是数据库在某一时间点的只读副本，常用于备份、恢复和测试。以 Microsoft SQL Server 为例，数据库快照的特点包括：

1. **事务一致性**：快照包含的是数据库在创建时所有已提交事务的状态。
2. **读取优化**：快照通常是只读的，可以用来进行报表查询或数据分析，不影响主数据库的性能。
3. **空间效率**：与文件系统快照类似，数据库快照通常使用写时复制技术，节省存储空间。

#### 虚拟机快照

虚拟机快照是虚拟机在某一时间点的状态，包括虚拟机的磁盘、内存和配置。虚拟机快照的用途包括：

1. **系统备份**：在进行系统更新或安装新软件前创建快照，可以在出现问题时快速恢复。
2. **测试和开发**：开发人员可以创建快照，在不影响生产环境的情况下进行测试。
3. **灾难恢复**：在系统故障时，能够迅速恢复到快照创建时的状态。

#### 快照的优点

1. **快速创建和恢复**：快照创建和恢复通常非常迅速，比传统的全量备份要快。
2. **空间效率**：利用写时复制技术，快照只存储数据变化部分，大大节省了存储空间。
3. **数据保护**：快照提供了一种简单的方式来保护数据，特别是在数据出现问题时可以快速恢复到正常状态。

#### 快照的局限性

1. **性能影响**：虽然快照本身创建迅速，但在频繁写操作的环境中，写时复制可能会带来一定的性能开销。
2. **存储增长**：随着时间推移和数据变化，快照占用的存储空间可能会逐渐增大。
3. **有限的历史恢复点**：快照只能恢复到创建快照的时间点，无法像增量备份那样提供多个历史恢复点。

# 错误码

## **MySQL 常见错误码**

| 错误码   | 描述                                                         | 解决方式                                                     |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **1044** | Access denied for user to database                           | 数据库用户权限不足，检查用户权限配置。                       |
| **1045** | Access denied for user (using password: YES)                 | 用户名或密码错误，或者用户没有访问权限。                     |
| **1049** | Unknown database                                             | 数据库不存在，检查数据库名称是否拼写错误。                   |
| **1051** | Unknown table                                                | 表不存在，检查表名是否正确。                                 |
| **1062** | Duplicate entry for key                                      | 主键或唯一键冲突，尝试插入重复的数据。                       |
| **1064** | Syntax error in SQL                                          | SQL 语法错误，检查 SQL 语句的拼写和语法。                    |
| **1091** | Can't DROP, check table exists                               | 尝试删除不存在的列或索引，先确认表结构。                     |
| **1146** | Table doesn't exist                                          | 表不存在，确认表是否已创建或表名是否拼写错误。               |
| **1215** | Cannot add foreign key constraint                            | 外键添加失败，检查关联的表是否满足外键条件（如字段类型匹配）。 |
| **1216** | Cannot delete or update a parent row                         | 外键约束阻止删除或更新主表数据，检查关联表是否有依赖数据。   |
| **1451** | Cannot delete parent row, foreign key constraint fails       | 外键约束阻止删除操作，确保先删除关联表中的子数据。           |
| **1452** | Cannot add or update child row, foreign key constraint fails | 插入或更新子表数据失败，主表中无对应的外键值。               |
| **1364** | Field doesn't have a default value                           | 插入数据时字段未提供值且无默认值，设置默认值或提供字段值。   |
| **2002** | Can't connect to MySQL server                                | 无法连接到 MySQL 服务器，检查网络、主机名或端口配置。        |
| **3819** | Check constraint violated                                    | `CHECK` 约束失败，检查更新数据是否满足约束条件。             |

## **SQL 通用错误码**

#### **标准 SQLState 代码（ANSI SQL）**

| 错误码    | SQLState | 描述                                        | 解决方式                                                   |
| --------- | -------- | ------------------------------------------- | ---------------------------------------------------------- |
| **40001** | `40001`  | 事务死锁（Deadlock detected）               | 重新设计事务逻辑，减少锁争用，或引入重试机制。             |
| **42000** | `42000`  | SQL 语法错误                                | 检查 SQL 语句语法、关键词拼写和结构是否正确。              |
| **22001** | `22001`  | 字符串超出字段长度（Data too long）         | 检查字段长度限制，调整数据或扩展字段大小。                 |
| **23000** | `23000`  | 主键冲突、外键约束失败                      | 检查数据是否与约束条件冲突，例如重复主键、外键引用缺失等。 |
| **23503** | `23503`  | 外键约束冲突（Foreign key violation）       | 确保外键关联的数据存在或按正确顺序插入/删除。              |
| **23505** | `23505`  | 唯一约束冲突（Unique constraint violation） | 确保插入数据没有违反唯一性约束，或调整唯一字段值。         |
| **57014** | `57014`  | 查询被取消（Query canceled）                | 查询超时或被强制终止，检查查询是否优化或取消原因。         |
| **08001** | `08001`  | 无法连接到数据库                            | 检查数据库网络连接、用户凭据和主机配置。                   |
| **08007** | `08007`  | 事务已被回滚（Transaction rollback）        | 检查事务是否因死锁或其他问题被回滚，调整事务逻辑。         |