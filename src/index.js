import "./index.styl";
import "./Elements/Button/button.js";
import "./Elements/Arrow-button/Arrow-button.js";
import "./Elements/pie-chart/pie-chart.js";
import "./Elements/donut-chart/donut-chart.js";
import "./Elements/slider/slider.js"
import "./Elements/stage/stage.styl"
import "./Elements/message-form/message-form.styl"
import "./Elements/hint/hint.js"
import "./Elements/toggle/toggle.js"
import "./Elements/tick-box/tick-box.js"

 $(document).ready(function () {
           
     $('.pie-chart').pieChart({
                barColor: '#e75735',
                trackColor: '#eee',
                lineWidth: 10,
                size: 185
            });
  
        $(".donut-chart").donutpie( {width: '180', linewidth: '0.33'},
                           [    {"color": '#747474', "hvalue": 11},
                                {"color": '#e75735', "hvalue": 26},
                                {"color": '#4eb7a8', "hvalue": 30},
                                {"color": '#e5e5e5', "hvalue": 33}
                           ]);
     
     
     $('#message-form-name').Hint('right', 'error', '#e75735');
     $('#message-form-email').Hint('right', 'thanks!', '#4eb7a8');

     
        $(' .message-form__input-search_not-found .message-form_form-control').attr('value',"I've not found what i'm looking for ...");
     
   
        });