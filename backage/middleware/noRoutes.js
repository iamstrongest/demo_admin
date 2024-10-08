/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-01-01 23:24:05
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-08 16:10:00
 * @FilePath: \Front-end\uni-app\uni-project\backstage\utils\middleware\validate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
module.exports = function (req, res, next) {
  if (req.url.indexOf("/api") !== -1) {
    console.log(`接口请求错误,不存在${req.url}该接口，你怕是请求了个寂寞`);
    res.status(403).send({
      code: 403,
      message: `不存在${req.url}该路由，你怕是请求了个寂寞`,
      data: null,
      g: Date.now(),
    });
  } else {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  }
};
