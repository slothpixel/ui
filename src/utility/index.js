/* eslint-disable no-param-reassign */
export default function addCommas(val) {
  if (typeof val !== 'number') return val;
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1,$2');
  }
  return val;
}
