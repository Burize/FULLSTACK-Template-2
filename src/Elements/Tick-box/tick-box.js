import "./tick-box.styl"


$(function(){
    
    $(".tick-box").children("input").click(function(e){
        e.stopPropagation();
    })
    
    $(".tick-box").click( function(){
         
         $(this).toggleClass("tick-box_off");
         
     }).each( function(){
           
        $(this).toggleClass("tick-box_off");
          
           if( $(this).attr('checked') )  
                    $(this).click();
                          
       });        
            
          
     }).each( function(){
           
           if( $(this).attr('checked') )  
                    $(this).click();
                          
       });
    
