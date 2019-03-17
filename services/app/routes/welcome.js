import { Movie, Category, Video } from '../models';

export default (router) => {
  router
    .get('root', '/', async (ctx) => {
      const include = {
        include: [{
          model: Video,
          as: 'videos',
        }],
      };
      const options = ctx.session.userId ? include : { where: { isDraft: false }, ...include };
      const movies = await Movie.findAll(options);
      const categories = await Category.findAll();

      ctx.render('pages/index', { movies, categories });
    })
    .get('jose_muchiko', '/movie/jose_muchiko', async (ctx) => {
      ctx.redirect('/movie/jose-muchiko');
    });
};
