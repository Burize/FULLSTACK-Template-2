import './button.styl';


$(() => {
  $('.ripple-button').on('click', function (event) {
    const btnOffset = $(this).offset();
    const xPos = event.pageX - btnOffset.left;
    const yPos = event.pageY - btnOffset.top;

    const $div = $('<div/>')
      .addClass('ripple')
      .css({
        top: yPos - ($(this).height() / 2),
        left: xPos - ($(this).height() / 2),
        background: $(this).data('ripple-color'),
      });

    $(this).append($div);

    window.setTimeout(() => {
      $div.remove();
    }, 1500);
  });
});
