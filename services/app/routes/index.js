import welcome from './welcome';
import sessions from './sessions';
import movie from './movie';
import book from './book';
import about from './about';

const controllers = [
  welcome, sessions, movie, about, book,
];

export default (router, container) => controllers.forEach(f => f(router, container));
