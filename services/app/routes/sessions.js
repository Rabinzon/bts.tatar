import buildFormObj from '../lib/formObjectBuilder';

export default (router) => {
  router
    .get('newSession', '/session/new', async (ctx) => {
      const data = {};
      ctx.render('pages/session', { f: buildFormObj(data) });
    })
    .post('session', '/session', async (ctx) => {
      const { email, password } = ctx.request.body;
      if (email === 'admin' && password === process.env.USER_PASSWORD) {
        ctx.session.userId = 1;
        ctx.redirect(router.url('root'));
        return;
      }

      ctx.render('pages/session', {
        f: buildFormObj({ email }),
        error: {
          msg: 'email or password were wrong',
          level: 'danger',
        },
      });
    })
    .delete('session', '/session', (ctx) => {
      ctx.session = {};
      ctx.redirect(router.url('root'));
    });
};

