import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/js/all';
import 'jquery-ujs';
import Plyr from 'plyr';

import './styles/base.scss';

$(() => {
  const player = new Plyr('#player');

  window.player = player;

  $('.js-episode-link').on('click', ({ currentTarget }) => {
    const videoSrc = currentTarget.dataset.video;

    console.log(videoSrc);
    window.player.source = {
      type: 'video',
      sources: [
        {
          src: videoSrc,
          type: 'video/mp4',
          size: 720,
        },
      ],
    };
  });

  $('#episode-modal').on('hidden.bs.modal', () => {
    window.player.stop();
  });
});
