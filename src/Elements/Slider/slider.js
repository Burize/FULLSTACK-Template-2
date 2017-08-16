import './slider.styl';


class Slider {
  constructor(root) {
    this.$root = $(root);

    autoBind(this);

    this.findDOM(this.$root);

    this.setHandlers();
  }

  findDOM(root) {
    this.slider = root.children('.slider__inner').children('svg');
    this.thumbler = this.slider.children('circle');
    this.hint = root.children('.slider-hint');
  }

  setHandlers() {
    this.thumbler.on('mousedown.slider', this.tumblerPreMove);
  }

  tumblerPreMove() {
    $(document).on('mousemove.slider', this.thumblerMove);

    $(document).on('mouseup.slider', () => {
      $(document).off('mousemove.slider');
      $(document).off('mouseup.slider');
    });

    return false;
  }

  thumblerMove(e) {
    const sliderleft = this.slider.offset().left;

    let newLeft = (e.pageX - sliderleft) * 100.0 / this.slider.outerWidth();

    if (newLeft < 5) { newLeft = 5; }

    if (newLeft > 95.1) { newLeft = 95.1; }

    this.thumbler.attr('cx', `${newLeft}%`);

    this.hint.css('left', `${newLeft - 6}%`).children('span').text(Math.round(newLeft * 1.099999) - 5);
  }
}


$(() => {
  $('.slider').each((index, element) => {
    $(element).data('slider', new Slider(element));
  });
});

