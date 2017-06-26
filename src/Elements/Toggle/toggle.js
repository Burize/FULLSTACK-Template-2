import "./toggle.styl"

$(function(){
    
    $(".toggle").children("input").click(function(e){
        e.stopPropagation();
    })
    
       $(".toggle").click( function(){
         
         $(this).toggleClass("toggle_off");
         
     }).each( function(index, element){
           
        $(this).toggleClass("toggle_off");
          
           if( $(element).attr('checked') )  
                    $(element).click();
                          
       });
    
})