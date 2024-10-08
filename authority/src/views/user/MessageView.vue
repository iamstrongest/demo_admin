<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-08-03 23:08:20
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2023-08-06 15:43:04
 * @FilePath: \Front-end\Vue\Vue3\demo\authority\src\views\user\MessageView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script  setup>
import * as XLSX from 'xlsx';
const getFile = (e) => {
  const file = e.target.files[0];
  const filReader = new FileReader();
  filReader.onload = (event) => {
    const workbook = XLSX.read(event.target.result)
    // const workbook = XLSX.read(event.target.result, { type: 'arraybuffer' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    const results = XLSX.utils.sheet_to_json(worksheet)
    console.log(results);
  }
  filReader.readAsArrayBuffer(file);

  // const workbook = XLSX.read(event.target.result, { type: 'binary' })
  // filReader.readAsBinaryString(file);
}
new Promise((resolve, reject) => {
  
})
const save = () => {
  const data = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Bob1', age: 251 },
    // 更多的 JSON 数据...
  ];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  const name = 'test1';
  XLSX.utils.book_append_sheet(workbook, worksheet, name);
  XLSX.writeFile(workbook, `${name}.xlsx`);
}
</script>
<template>
  <div>
    message
    <h1>请选择表格</h1>
    <input type="file" name="file" id="file" @change="getFile">
    <button type="button" @click="save">生成xlsx文件</button>
  </div>
</template>

<style scoped lang='less'></style>