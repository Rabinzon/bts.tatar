import _ from 'lodash';
import { Movie, Category } from '../models';
import buildFormObj from '../lib/formObjectBuilder';
import requiredAuth from '../lib/requiredAuth';
import uploadFile from '../lib/uploadFile';


export default (router) => {
  router
    .get('newMovie', '/movie/new', requiredAuth, async (ctx) => {
      const categories = await Category.findAll();
      ctx.render('pages/movie/new', { f: buildFormObj({}), categories });
    })
    .get('editMovie', '/movie/edit/:id', async (ctx) => {
      const { id } = ctx.params;
      const movie = await Movie.findOne({ where: { uniqueName: id } });
      const categories = await Category.findAll();
      ctx.render('pages/movie/edit', { f: buildFormObj(movie), categories });
    })
    .post('editMovie', '/movie/edit/:id', requiredAuth, async (ctx) => {
      const { id } = ctx.params;
      const { body, files } = ctx.request;
      const movie = await Movie.findOne({ where: { uniqueName: id } });
      const data = { ...body };

      if (files.poster.name) {
        const posterFileName = `${body.uniqueName}.jpg`;
        data.poster = `${process.env.S3_BUCKET_URL}/${posterFileName}`;
        await uploadFile(posterFileName, files.poster.path, files.poster.type);
      }

      await movie.update(body);
      ctx.flash.set({ msg: `${movie.uniqueName} has been updated` });
      ctx.redirect(router.url('root'));
    })
    .get('movie', '/movie/:id', async (ctx) => {
      const { id } = ctx.params;
      const movie = await Movie.findOne({ where: { uniqueName: id } });

      ctx.render('pages/movie/movie', { movie });
    })
    .delete('deleteMovie', '/movie/:id', requiredAuth, async (ctx) => {
      const { id } = ctx.params;
      const movie = await Movie.findOne({ where: { uniqueName: id } });

      await movie.destroy();

      ctx.flash.set({ msg: `${movie.uniqueName} has been deleted` });

      ctx.redirect(router.url('root'));
    })
    .post('newMovie', '/movie/new', requiredAuth, async (ctx) => {
      const { body, files } = ctx.request;

      const posterFileName = `${body.uniqueName}.jpg`;
      const videoFileName = `${body.uniqueName}.mp4`;

      const data = {
        ...body,
        poster: `${process.env.S3_BUCKET_URL}/${posterFileName}`,
        video: `${process.env.S3_BUCKET_URL}/${videoFileName}`,
        isDraft: true,
      };

      if (!_.isEmpty(files.poster.name)) {
        await uploadFile(posterFileName, files.poster.path, files.poster.type);
      }

      const categories = await Category.findAll();

      try {
        const movie = await Movie.build(data);
        await movie.save();
        ctx.flash.set({ msg: `${movie.uniqueName} has been created` });
        ctx.redirect(router.url('root'));
      } catch (e) {
        ctx.render('pages/movie/new', { f: { ...buildFormObj(body), errors: _.groupBy(e.errors, 'path') }, categories });
      }
    })
    .post('publishMovie', '/movie/:id/publish', requiredAuth, async (ctx) => {
      const { id } = ctx.params;
      const movie = await Movie.findOne({ where: { uniqueName: id } });
      await movie.update({ isDraft: false });
      ctx.flash.set({ msg: `${movie.uniqueName} has been published` });
      ctx.redirect(router.url('root'));
    });
};
