import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/js/all';
import 'jquery-ujs';
import Plyr from 'plyr';

import './styles/base.scss';

$(() => {
  const player = new Plyr('#player');

  window.player = player;
});
