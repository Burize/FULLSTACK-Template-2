import "./message-form.styl";
import "./Hint/hint.js"

(function($){

       
     $(".message-form__input-search.notFound").each( function(){         
         
            $(this).children("input").css('background-color',$(this).children('svg').css('background-color')).css('color', 'white').attr('value',"I've not found what i'm looking for ...");
            
            $(this).children('input').focus(function(){
                
                $(this).css("background-color","").css('color',"").attr('value','')
                
                $(this).unbind('focus');
            });
        });
       
        
})(jQuery)

