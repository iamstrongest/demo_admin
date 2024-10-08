<script  setup>
const getFile = (e) => {
  const file = e.target.files[0];
  const filReader = new FileReader();
  filReader.onload = (e) => {
    console.log(e.target.result);
  }
  filReader.readAsBinaryString(file);
}
</script>
<template>
  <div>
    manager
    <h1>请选择表格</h1>
    <input type="file" name="file" id="file" @change="getFile">
  </div>
</template>

<style scoped lang='less'></style>