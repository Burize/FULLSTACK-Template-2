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

     
        $('.message-form__input-search').eq(1).Notfound();
     
        $('#myselect').Dropdown("option_name",[{ value:"1", text: "option1"},
                                { value:"2", text: "option2"},
                                { value:"3", text: "option3"}]);
     
     
     $("#profil1").Profil('public/profil1.jpg','John Smith','ux designer',[{href: '/#', class: 'fa fa-facebook'},
                                                    {href: '/#', class: 'fa fa-twitter'},
                                                    {href: '/#', class: 'fa fa-dribbble'},]);
     
     $("#profil2").Profil('public/profil2.jpg','Sarah Brown','developer',[{href: '/#', class: 'fa fa-facebook'},
                                                    {href: '/#', class: 'fa fa-twitter'},
                                                    {href: '/#', class: 'fa fa-dribbble'},]);
     
     $('#my_map').Location('Meet us!', '1259  CALIFORNIA ST San Francisco, CA ',37.795712, -122.414756,'/public/marker.png');
     
     $('#mycalendar').glDatePicker();
     
   
        });