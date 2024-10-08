export function version() {
  const url = "/version.json";
  return fetch(url);
}
