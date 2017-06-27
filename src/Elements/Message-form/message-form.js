import "./message-form.styl";


(function($){

    $.fn.Notfound = function(){
        
        return this.each( function(){
            
            $(this).addClass('message-form__input-search_not-found ').children("input").attr('value',"I've not found what i'm looking for ...");
        });
    }
})(jQuery)