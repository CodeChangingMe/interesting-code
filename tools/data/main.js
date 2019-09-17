/**
 * 写一个函数，传递一个参数为时间戳，完成时间的格式化。
 * 如果发布一分钟内，输出：刚刚；n 分钟前发布，输出：n分钟前；
 * 超过一个小时，输出：n小时前；超过一天，输出：n天前；但超过一个星期，输出发布的准确时间
 */
function main(timestamp) {
  const min = 1000 * 60;
  const hour = 60 * min;
  const day = 24 * hour;
  const week = 7 * day;

  const currentTime = Date.now();
  let diffTime = currentTime - timestamp;
  if (diffTime < min) {
    console.log('刚刚');
  } else if (diffTime < hour) {
    console.log(`${Math.ceil(diffTime / min)}分钟前`);
  } else if (diffTime < day) {
    console.log(`${Math.ceil(diffTime / hour)}小时前`);
  } else if (diffTime < week) {
    console.log(`${Math.ceil(diffTime / day)}天前`);
  } else {
    console.log(new Date(currentTime).toLocaleString());
  }
}
