/**
 * 写一个函数，传递一个参数为时间戳，完成时间的格式化。
 * 如果发布一分钟内，输出：刚刚；n 分钟前发布，输出：n分钟前；
 * 超过一个小时，输出：n小时前；超过一天，输出：n天前；但超过一个星期，输出发布的准确时间
 */
function main(timestamp) {
  let currentTime = new Date().getTime();
  let diffTime = currentTime - timestamp;
  let diffSecond = Math.ceil(diffTime / 1000);
  if (diffSecond < 60) {
    console.log('刚刚');
  } else if (diffSecond < 3600) {
    const minutes = Math.ceil(diffSecond / 60);
    console.log(`${minutes}分钟前`);
  } else if (diffSecond < 3600 * 24) {
    const day = Math.ceil(diffSecond / 3600);
    console.log(`${day}小时前`);
  } else {
    console.log(new Date(currentTime));
  }
}
