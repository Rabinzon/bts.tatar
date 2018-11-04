import { Movie, Category } from '../models';

export default (router) => {
  router
    .get('root', '/', async (ctx) => {
      const movies = await Movie.findAll(ctx.session.userId ? {} : { where: { isDraft: false } });
      const categories = await Category.findAll();
      ctx.render('pages/index', { movies, categories });
    })
    .get('jose_muchiko', '/movie/jose_muchiko', async (ctx) => {
      ctx.redirect('/movie/jose-muchiko');
    });
};
