# koa下多spa项目部署

```ts
// app.ts

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as views from 'koa-views';
import * as statics from 'koa-static';
import * as send from 'koa-send';

...

const app = new Koa();

const router = new Router();

// static
app.use(statics(path.join(__dirname, '../views')));

// koa-views
app.use(views(path.join(__dirname, '../views')));

app.use(router.get(/\/downloads\/\/*/, async (ctx) => {
  // downloads => 下载文件
  // ../public/downloads
  await send(ctx, ctx.path, { root: path.join(__dirname, '../public') });
}).get(/\/admin\/\/*/, async (ctx) => {
  // admin => 路由由前端处理 /admin/index.html
  await ctx.render('/admin/index');
}).get('*', async (ctx) => {
  // 其他 => 路由由前端处理 /index.html
  await ctx.render('index');
})
  .middleware());

...

```