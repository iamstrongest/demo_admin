/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-08 15:51:35
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-08 15:52:19
 * @FilePath: \Front-end\Vue\Vue3\demo\认证\backage\middleware\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const noRoutes = require("./noRoutes.js");
const errorHandle = require("./error.js");
const cache = require("./cache.js");
module.exports = {
  noRoutes,
  errorHandle,
  cache,
};
