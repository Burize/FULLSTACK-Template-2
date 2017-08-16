import './tick-box.styl';


class TickBox {
  constructor(root) {
    this.$root = $(root);

    this.$root.toggleClass('tick-box_off');

    this.setHandlers();


    if (this.$root.attr('checked')) { this.$root.click(); }
  }

  setHandlers() {
    this.$root.on('click.tickBox', this.toggle);

    this.$root.children('input').click((e) => {
      e.stopPropagation();
    });
  }
  toggle(e) {
    $(e.currentTarget).toggleClass('tick-box_off');
  }
}


$(() => {
  $('.tick-box').each((index, element) => {
    $(element).data('tickBox', new TickBox(element));
  });
});

