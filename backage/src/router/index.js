// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();
const router = express.Router();
const mysql = require("mysql");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "909832",
  port: "3306",
  // 连接数据库
  database: "crsf",
});
// 登录的 API 接口
let islogin = false;
router.post("/login", (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== "admin" || req.body.password !== "000000") {
    return res.send({ status: 400, msg: "登录失败" });
  }

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  // req.session.user = req.body; // 用户的信息
  req.session.user = { username: "admin", password: 000000 };
  req.session.islogin = true; // 用户的登录状态
  console.log(req.session);
  islogin = true;
  // console.log(req.session);
  res.redirect("/index.html");
  res.send({ status: 200, msg: "登录成功" });
});

// 获取用户姓名的接口
router.get("/stu", async (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  res.setHeader("Access-Control-Allow-Origin", `${req.headers.origin}`);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //允许跨域的请求方法
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  ); //允许的请求头部
  console.log(req.cookies);
  console.log(req.session);
  if (!req.session.islogin) {
    res.redirect("/login.html");
    return res.send({ status: 401, msg: "您未登录，暂无资格查看信息" });
  }
  const stu = await new Promise((resolve, reject) => {
    db.query("SELECT * FROM stu", (err, rows) => {
      resolve(rows);
    });
  });
  res.send({
    status: 200,
    msg: "success",
    data: stu,
  });
});
// 删除
router.post("/id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `${req.headers.origin}`);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //允许跨域的请求方法
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!islogin) {
    return res.send({ status: 401, msg: "您未登录，暂无资格查看信息" });
  }
  const obj = await new Promise((resolve, reject) => {
    db.query(`delete  FROM stu where id=${req.query.id}`, (err, rows) => {
      resolve(
        rows.affectedRows > 0
          ? { status: 200, msg: "删除成功" }
          : { status: 401, msg: "暂未登录,无权操作" }
      );
    });
  });
  res.send(obj);
});
// 增加
router.post("/add", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `${req.headers.origin}`);
  res.setHeader("Access-Control-Allow-Credentials", true);
  // res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //允许跨域的请求方法
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With, Content-Type"
  // );
  if (!islogin) {
    return res.send({ status: 401, msg: "您未登录，暂无资格查看信息" });
  }
  console.log(req.body);
  const obj = await new Promise((resolve, reject) => {
    db.query(
      `insert into stu(username,class) values('${req.body.username}','${req.body.class}') `,
      (err, rows) => {
        resolve(
          rows.affectedRows > 0
            ? { status: 200, msg: "添加成功" }
            : { status: 401, msg: "暂未登录,无权操作" }
        );
      }
    );
  });
  res.send(obj);
});
// 退出登录的接口
router.post("/logout", (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy();
  islogin = false;
  res.send({
    status: 0,
    msg: "退出登录成功",
  });
});
router.get("/try", (req, res) => {
  res.render("tryHtmlTemplate", { title: "tryHtmlTemplate" });
});
module.exports = router;
