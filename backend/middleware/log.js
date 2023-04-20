async function logMiddleware(ctx, next) {
  console.log(ctx.path.slice(1));
  await next();
}

module.exports = logMiddleware;
