import { version } from "./api/request.js";
export async function checkVersion(params) {
  const hash = params;
  let status = "";
  await version()
    .then((resp) => {
      console.log(resp);
      status = resp.status;
      return resp.json();
    })
    .then(({ timestamp, info }) => {
      if (status === 200) {
        if (hash != timestamp) {
          const res = window.confirm(
            info || "系统已经更新，请刷新页面?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          );
          if (res) {
            window.location.reload();
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
    })
    .catch(() => {});
}
