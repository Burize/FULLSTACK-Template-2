import './toggle.styl';


class Toggle {
  constructor(root) {
    this.$root = $(root);

    this.$root.toggleClass('toggle_off');

    this.setHandlers();


    if (this.$root.attr('checked')) { this.$root.click(); }
  }

  setHandlers() {
    this.$root.on('click.toggle', this.toggle);

    this.$root.children('input').click((e) => {
      e.stopPropagation();
    });
  }
  toggle(e) {
    $(e.currentTarget).toggleClass('toggle_off');
  }
}

$(() => {
  $('.toggle').each((index, element) => {
    $(element).data('toggle', new Toggle(element));
  });
});

