const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    const url = ctx.request.url;
    console.log(ctx.request);
  ctx.body = 'Hello World';
  if (url === "/index") {
    
    ctx.type= "text/html"
    ctx.body = "<h1>INDEX SAYFASI</h1>";
    return;
  }
  if (url === "/hakkimda") {
    
    ctx.type= "text/html"
    ctx.body = "<h1>HAKKIMDA SAYFASI</h1>";
    return;
  }
  if (url === "/iletisim") {
    
    ctx.type= "text/html"
    ctx.body = "<h1>ILETISIM SAYFASI</h1>";
    return;
  }
});

app.listen(3000);
