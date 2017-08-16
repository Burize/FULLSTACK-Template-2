import './video.styl';


class VideoPlayer {
  constructor(root) {
    autoBind(this);
    this.findControls(root);
    this.setHandlers();
  }


  findControls(root) {
    const $root = $(root);
    this.player = $root.children('video')[0];
    this.$btnPlayPause = $root.find('.player__controls-play').first();
    this.$progressBar = $root.find('.player__controls-progress').first();
    this.$expand = $root.find('.player__controls-fullscreen').first();
  }

  setHandlers() {
    this.$expand.on('click.expand', this.toggleFullScreen);
    this.$btnPlayPause.on('click.pause', this.togglePlayPause);
    this.$progressBar.on('click.progressBar', this.seek);

    this.player.addEventListener('play', this.play, false);
    this.player.addEventListener('timeupdate', this.updateProgressBar, false);
    this.player.addEventListener('pause', this.pause, false);
    this.player.addEventListener('ended', this.pause);
  }


  updateProgressBar() {
    this.$progressBar.val(Math.floor(this.player.currentTime / this.player.duration * 100));
  }

  togglePlayPause() {
    if (this.player.paused || this.player.ended) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  play() {
    this.$btnPlayPause.children('.svg-play').css('display', 'none');
    this.$btnPlayPause.children('.svg-pause').css('display', 'block');
  }

  pause() {
    this.$btnPlayPause.children('.svg-play').css('display', '');
    this.$btnPlayPause.children('.svg-pause').css('display', '');
  }

  onEndVideo() {
    this.pause();
  }

  seek(e) {
    const percent = e.offsetX / e.currentTarget.offsetWidth;
    this.player.currentTime = percent * this.player.duration;
    $(e.currentTarget).val(Math.floor(percent * 100));
  }

  toggleFullScreen() {
    if (this.player.requestFullscreen) {
      if (document.fullScreenElement) {
        document.cancelFullScreen();
      } else {
        this.player.requestFullscreen();
      }
    } else if (this.player.msRequestFullscreen) {
      if (document.msFullscreenElement) {
        document.msExitFullscreen();
      } else {
        this.player.msRequestFullscreen();
      }
    } else if (this.player.mozRequestFullScreen) {
      if (document.mozFullScreenElement) {
        document.mozCancelFullScreen();
      } else {
        this.player.mozRequestFullScreen();
      }
    } else if (this.player.webkitRequestFullscreen) {
      if (document.webkitFullscreenElement) {
        document.webkitCancelFullScreen();
      } else {
        this.player.webkitRequestFullscreen();
      }
    } else {
      throw new Error('Fullscreen API is not supported');
    }
  }
}

$(() => {
  $('.player').each((index, element) => {
    $(element).data('videoPlayer', new VideoPlayer(element));
  });
});

