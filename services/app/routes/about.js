
export default (router) => {
  router
    .get('about', '/about', async (ctx) => {
      ctx.render('pages/about');
    });
};
