const Koa = require('koa');
const app = new Koa();
const router = require('./api/test');
var cors = require('koa2-cors');

//koa2解决跨域
app.use(cors({
  origin: function (ctx) {
      // if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      // }
      // return "http://localhost:8080"; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true, // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(async (ctx,next)=>{
  const start = Date.now();
  await next();
  const ms = Date.now()-start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(router.routes());
app.listen(3002);


