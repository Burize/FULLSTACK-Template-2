import "./hint.styl"


(function($){
    
        
        $.fn.Hint = function(side, text, color){
            
       
        this.children().remove(".hint");
            
        var hint = $("<div/>").addClass("hint").css("background-color",color);        
        var hint_text = $("<span/>").text( text );
        var hint_arrow = $("<div/>").addClass("hint__arrow");
         
            
            switch (side){
                case 'left':
                   
                    hint.addClass("hint_left")
                    hint_arrow.css("border-color", "transparent transparent transparent " + color)
                break;
                    
                case 'right':
                
                    hint.addClass("hint_right")
                    hint_arrow.css("border-color", "transparent " + color + " transparent transparent") 
                break;
        }
                
        hint.append(hint_text).append(hint_arrow);
            
        this.append(hint);
              
    };
    
        $.fn.Hint_hide = function(){
            
            this.children().remove(".hint");
        }
    
})(jQuery)