const MyKoa = require('./js/application');
const app = new MyKoa();

app.use((req, res, next) => {
  console.log('中间函数执行了-111');
  next();
  console.log('1111');
});

app.use((req, res) => {
  console.log('中间函数执行了-222');
  res.body = 'hello mykoa';
});

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功');
  else console.log(err);
});
