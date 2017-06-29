import "./message-form.styl";


(function($){

    $.fn.Notfound = function(){
        
        return this.each( function(){
            
           
            
            $(this).children("input").css('background-color',$(this).children('svg').css('background-color')).css('color', 'white').attr('value',"I've not found what i'm looking for ...");
            
            $(this).children('input').focus(function(){
                
                $(this).css("background-color","").css('color',"").attr('value','')
                
                $(this).unbind('focus');
            });
        });
    }
})(jQuery)