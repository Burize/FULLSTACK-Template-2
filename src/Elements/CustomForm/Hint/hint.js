import './hint.styl';

class Hint {
  static Show(element, side, text, color) {
    const $element = $(element);
    $element.children().remove('.hint');

    const $hint = $('<div/>').addClass('hint').css('background-color', color);
    const $hintText = $('<span/>').text(text);
    const $hintArrow = $('<div/>').addClass('hint__arrow');


    switch (side) {
      case 'left':

        $hint.addClass('hint_left');
        $hintArrow.css('border-color', `transparent transparent transparent ${color}`);
        break;

      case 'right':

        $hint.addClass('hint_right');
        $hintArrow.css('border-color', `transparent ${color} transparent transparent`);
        break;
      default:

        $hint.addClass('hint_right');
        $hintArrow.css('border-color', `transparent ${color} transparent transparent`);
        break;
    }

    $hint.append($hintText).append($hintArrow);

    $element.append($hint);
  }

  static Hide(element) {
    const $element = $(element);
    $element.children().remove('.hint');
  }
}

$(() => {
  $('.message-form').each(function () {
    $(this).submit(function (e) {
      $(this).find('.hint-control').each(function () {
        Hint.Hide(this);

        switch ($(this).data('hint')) {
          case 'text':

            if (!/[a-zа-я]{2,}/i.test($(this).children('input').val())) {
              Hint.Show(this, 'right', 'Только буквы!', '#e75735');

              e.preventDefault();
            }

            break;

          case 'email':

            if (!/[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i.test($(this).children('input').val())) {
              Hint.Show(this, 'right', 'Некорректный адрес!', '#e75735');
              e.preventDefault();
            }

            break;

          case 'phone':

            if (!/[0-9]-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}/i.test($(this).children('input').val())) {
              Hint.Show(this, 'right', 'Неправильный номер!', '#e75735');
              e.preventDefault();
            }

            break;
          case 'thanks':

            Hint.Show(this, 'right', 'thanks!', '#4eb7a8');
            e.preventDefault();
            break;

          default:

            Hint.Show(this, 'right', 'error!', '#e75735');
            e.preventDefault();
            break;
        }
      });
    });
  });
});
