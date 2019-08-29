## 概述
通过读取 src/testData文件夹下的json、js文件来生成接口和其反回数据

---

## 依赖
-   express
-   body-parser
-   mockjs
-   morgan

## 使用
-   npm run start
-   yarn start
-   node src/server.js
-   可自行修改config.js修改server参数

---

## testData文件夹规则
-   testData下读取文件为递归读取，不限制文件夹结构
-   如：src/testData/users/get.users.json 等同于 src/testData/get.users.json

---

## 路由文件命名规则
-   必须要以[get,delete,put,post]为开头
-   文件名中的“.” 会被替换成“/”
-   "$"等同于传统接口中的 ":"
-   例：
    -   src/testData/get.users.json --> /users  method:get
    -   src/testData/delete.users.$userId.js ---> /users/:userId mothod:delete

---

## json格式文件编写规则
-   json格式的返回内容可使用mockjs的@占位符
-   例：{"id":"@id"}

---

## js格式文件编写规则
-   js格式文件必须返回一个函数且该函数的返回值就是该接口返回的内容，该函数会接受3个参数：
    -   query：所有的参数值 
    -   req： 该次请求的request信息
    -   res： 该次请求的response信息
    -  例：
        ```
            module.exports = functon(query,req,res){
                return {
                    "errcode":0,
                    "errmsg":"",
                    "data":[]
                }
            }
        ```
