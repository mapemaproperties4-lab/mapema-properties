export function objectToGetParams(obj) {
  return new URLSearchParams(obj).toString();
}
