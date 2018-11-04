import _ from 'lodash';
import { Book } from '../models';
import books from '../data/books';
import uploadFile from '../lib/uploadFile';
import buildFormObj from '../lib/formObjectBuilder';
import requiredAuth from '../lib/requiredAuth';

export default (router) => {
  router
    .get('newBook', '/books/new', async (ctx) => {
      ctx.render('pages/books/new', { f: buildFormObj({}) });
    })
    .get('books', '/books', async (ctx) => {
      ctx.render('pages/books', { books, bucketUrl: process.env.S3_BUCKET_URL });
    })

    .post('newBook', '/books/new', async (ctx) => {
      const { body, files } = ctx.request;
      console.log(_.keys(files));

      const promises = await _.map(
        _.keys(files),
        key => uploadFile(files[key].name, files[key].path, files[key].type),
      );

      await Promise.all([...promises]);

      const book = await Book.build(body);
      await book.save();

      ctx.flash.set({ msg: `${book.title} has been created` });
      ctx.redirect(router.url('root'));
    })
    .post('editBook', '/books/:id', requiredAuth, async (ctx) => {
      ctx.render('pages/books/new', { f: buildFormObj({}) });
    })
    .delete('deleteBook', '/books/:id', requiredAuth, async (ctx) => {
      const { id } = ctx.params;
      const book = await Book.findById(id);

      await book.destroy();
      ctx.flash.set({ msg: `${book.title} has been deleted` });

      ctx.redirect(router.url('root'));
    });
};
