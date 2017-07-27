import './hint.styl'

$(function(){

    $('.message-form').each(function(){
        
        
        $(this).submit(function(e){
              
        
            $(this).find('.hint-control').each(function(){
                
               Hint.Hide( this );
                
                 switch( $(this).data('hint') )
              {
                    case 'text':
                         
                        if( !/[a-zа-я]{2,}/i.test( $(this).children('input').val() ) )
                            {
                                Hint.Show( this,'right', 'Только буквы!', '#e75735')
                              
                                e.preventDefault();
                            }
                            
                      break;
                      
                    case 'email':
                         
                        if(!/[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i.test( $(this).children('input').val() )  )
                            {
                                Hint.Show( this,'right', 'Некорректный адрес!', '#e75735')
                                e.preventDefault();
                            }
                            
                      break;
                     
                  case 'phone':
                         
                        if(!/[0-9]-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}/i.test( $(this).children('input').val() )  )
                            {
                                Hint.Show( this,'right', 'Неправильный номер!', '#e75735')
                                e.preventDefault();
                            }
                            
                      break;
                  case 'thanks':
    
                                Hint.Show( this,'right', 'thanks!', '#4eb7a8')
                                e.preventDefault();
                      break;
                      
                  case 'error':
    
                                Hint.Show( this,'right', 'error!', '#e75735')
                                e.preventDefault();
                      break;
              }
            })
        })
   
         
       
    });
   
})


    class Hint{
        
        static Show(element, side, text, color){
            
        element = $(element)
        element.children().remove(".hint");
            
        let hint = $("<div/>").addClass("hint").css("background-color",color);        
        let hint_text = $("<span/>").text( text );
        let hint_arrow = $("<div/>").addClass("hint__arrow");
         
            
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
            
        element.append(hint);
        }
        
        static Hide(element){
            
            element = $(element);
            element.children().remove(".hint");
        }
    }