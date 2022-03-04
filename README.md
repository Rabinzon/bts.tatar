[![Build Status](https://travis-ci.org/Rabinzon/bts.tatar.svg?branch=master)](https://travis-ci.org/Rabinzon/bts.tatar)

For development requires `docker`, `docker-compose`, `ansible`.

For the run on local machine just run following commands:

```sh
make app-setup // only once
make app
```

You can change environment variables in `ansible` directory

Project developing with [koa](https://github.com/koajs), [postgres](https://github.com/postgres/postgres),
[sequelize](https://github.com/sequelize/sequelize) and [bootstrap](https://github.com/twbs/bootstrap).
