import './drop-down.styl';

class DropDown {
  constructor(root) {
    autoBind(this);

    this.findDOM(root);
    this.setHandlers();
  }

  findDOM(root) {
    this.$root = $(root);
    this.$inputSelect = this.$root.find('select').first();

    this.$selectedOption = this.$root
      .find('.custom-form__dropdown')
      .first();
  }


  setHandlers() {
    this.$selectedOption.on('click.dropDown', this.expand);

    this.$root.find('li').on('click.dropDownOption', { dropDown: this, $inputSelect: this.$inputSelect, $selectedOption: this.$selectedOption }, this.selectOption);
  }
  expand() {
    this.$root.toggleClass('dropdown_open');
    return false;
  }

  selectOption(e) {
    e.data.$selectedOption.contents().filter((index, element) => (element.nodeType === 3)).remove();

    e.data.$selectedOption.append(document.createTextNode($(e.currentTarget).html()));

    e.data.$inputSelect.val($(e.currentTarget).attr('value'));
    e.data.dropDown.expand();
    return false;
  }
}

$(() => {
  $('.dropdown').each(function () {
    $(this).data('dropdown', new DropDown(this));
  });


  $(window).click(() => {
    $('.dropdown').removeClass('dropdown_open');
  });
});

