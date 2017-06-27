import "./toggle.styl"

$(function(){
    
    $(".toggle").children("input").click(function(e){
        e.stopPropagation();
    })
    
       $(".toggle").click( function(){
         
         $(this).toggleClass("toggle_off");
         
     }).each( function(){
           
        $(this).toggleClass("toggle_off");
          
           if( $(this).attr('checked') )  
                    $(this).click();
                          
       });
    
})