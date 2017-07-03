import "./index.styl";
import "./Elements/Button/button.js";
import "./Elements/Arrow-button/Arrow-button.js";
import "./Elements/pie-chart/pie-chart.js";
import "./Elements/donut-chart/donut-chart.js";
import "./Elements/slider/slider.js"
import "./Elements/stage/stage.styl"
import "./Elements/message-form/message-form.js"
import "./Elements/hint/hint.js"
import "./Elements/toggle/toggle.js"
import "./Elements/tick-box/tick-box.js"
import "./Elements/Drop-down/drop-down.js"
import "./Elements/Profil/profil.js"
import "./Elements/news/news.js"
import "./Elements/event/event.js"
import "./Elements/location/location.js"
import './Elements/calendar/calendar.js'
import './Elements/messaging/messaging.js'
import './Elements/video/video.js'

 $(document).ready(function () {
           
     
     $('#message-form-name').Hint('right', 'error', '#e75735');
    
     $('#message-form-email').Hint('right', 'thanks!', '#4eb7a8');

     $('.message-form__input-search').eq(1).Notfound();
     
   
        });