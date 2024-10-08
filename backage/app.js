/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-06-19 22:52:15
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-08 16:01:21
 * @FilePath: \Front-end\Vue\Vue3\demo\前后端cookie存储在后端\backage\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();
const cors = require("cors");
const path = require("path");
var ejs = require("ejs"); //我是新引入的ejs插件
var history = require("connect-history-api-fallback");
const whiteList = ["/origin", "/api/user"]; // 设置白名单
const middleware = require("./middleware/index.js");
// app.use(
//   history({
//     rewrites: whiteList.map((url) => ({ from: url, to: url })),
//   })
// );
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// view engine setup
// app.engine("html", ejs.__express);
// app.set("views", path.join(__dirname, "src/views"));
// app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
//在Express中没有内置获取表单post请求的api，所以不写任何中间件是得不到返回结果
//这里我们需要使用一个(第三方包 body-parser)
// 可能现在已经变成node.js内置模块了, 本人试验没有下载body-parser包也可以直接使用

// 或者使用express内指的中间件urlencoded({ extended: false })，它是根据body-parser来的
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  // || req.url !== "/origin"
  // if (req.url !== "/" || !req.url.includes("/api")) {
  //   next(new Error("index"));
  // }
  next();
});
// app.get("/", function (req, res) {
//   console.log(req.url);
//   res.render("index");
// });
app.get("/origin", function (req, res) {
  res.render("origin_router");
});
app.post("/api/login", (req, res) => {
  const body = req.body;
  const { username, password } = body;
  if (
    (username !== "admin" || "part1" || "part2" || "normal") &&
    password != 123456
  ) {
    res.send({
      code: 401,
      msg: "账号或者密码错误",
      g: Date.now(),
    });
    return;
  }
  res.send({
    code: 200,
    userInfo: {
      token: username,
      roleType:
        username == "admin"
          ? [1, 2]
          : username == "part1"
          ? [1]
          : username == "part2"
          ? [2]
          : [],
      username,
    },
    msg: "账号成功",
    g: Date.now(),
  });
});
app.get("/api/user", (req, res) => {
  const body = req.body;
  console.log(body);

  const { username } = body;
  res.send({
    userInfo: {
      token: "weqwe",
      roleType: [1, 2],
      username,
    },
  });
});
// app.use(function (err, req, res, next) {
//   res.render("index");
// });
// 前端路由匹配失败错误处理
app.use(middleware.noRoutes);
app.listen(3013, function () {
  console.log("Express server running at http://127.0.0.1:3013");
});
