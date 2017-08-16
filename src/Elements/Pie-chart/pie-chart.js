import './pie-chart.styl';


class CanvasRenderer {
  constructor(element, percent, linewidth, barcolor) {
    this.$element = $(element);
    this.percent = percent;
    this.linewidth = linewidth;
    this.barcolor = barcolor;
    this.trackcolor = '#eee';
    this.$value = this.$element.children('.pie-chart__inner')
      .children('.pie-chart__value')
      .children('span');


    this.canvas = document.createElement('canvas');

    this.$element.append(this.canvas);

    this.ctx = this.canvas.getContext('2d');

    this.draw();

    $(window).resize(() => {
      this.draw();
    });
  }

  drawCircle(percent, color) {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2.0 * percent);

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = this.linewidth * this.$element.outerWidth() / 100.0;

    this.ctx.stroke();
  }

  draw() {
    const width = this.$element.outerWidth();

    this.canvas.width = width;
    this.canvas.height = width;

    this.ctx.translate(width / 2.0, width / 2.0);

    this.ctx.rotate(-0.5 * Math.PI);

    this.radius = (width - this.linewidth * width / 100.0) / 2.0;

    if (this.percent !== 0) {
      this.drawCircle(1, this.trackcolor);
      this.drawCircle(this.percent / 100.0, this.barcolor);
    }

    this.$value.css('font-size', this.$element.outerWidth() / 2.4)
      .html(this.percent);
  }
}


$('.pie-chart').each((index, element) => {
  $(element).data('pieChart', new CanvasRenderer(element, $(element).data('percent'), $(element).data('linewidth'), $(element).data('barcolor')));
});

