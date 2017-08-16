const d3 = require('d3');

(function ($) {
  class DonutPie {
    constructor(root, width, linewidth, pies) {
      this.$root = $(root);
      this.width = this.$root.outerWidth();
      this.linewidth = linewidth;
      this.data = pies;

      this.createDOM();

      this.Display();


      $(window).resize(() => {
        this.Display();
      });
    }

    createDOM() {
      this.svg = d3.select(this.$root[0])
        .append('svg')
        .append('g');

      this.svg.append('g')
        .attr('class', 'slices');

      this.pie = d3.pie()
        .sort(null)
        .value(d => d.value);


      this.slice = this.svg.select('.slices')
        .selectAll('path.slice')
        .data(this.pie(this.data));
    }
    Display() {
      const radius = this.$root.outerWidth() / 2;

      this.$root.children('svg')
        .attr('width', radius * 2)
        .attr('height', radius * 2)
        .find('.slices')
        .first()
        .html('');

      this.arc = d3.arc()
        .outerRadius(radius * (1 - this.linewidth))
        .innerRadius(radius);

      this.svg.attr('transform', `translate(${radius},${radius})`);

      this.slice.enter()
        .insert('path')
        .style('fill', d => d.data.color)
        .attr('class', 'slice')
        .attr('d', this.arc);

      this.slice.exit()
        .remove();
    }
  }


  $('.donut-chart').each((index, element) => {
    $(element).data('donutPie', new DonutPie(element, $(element).outerWidth(), $(element).data('linewidth'), $(element).data('pies')));
  });
}(jQuery));
