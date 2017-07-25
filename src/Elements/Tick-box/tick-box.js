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
    
//       $(".tick-box").click( function(){
//         
//           var svg = $(this).find("svg");
//          
//        if( $(this).data('checked') != 'true' )
//            {
//                svg.children("circle").attr('fill', $(this).data('background-color'))
//                svg.children("polyline").attr('stroke', '')
//                $(this).data('checked','true');
//            }
//        else
//            {
//                svg.children("circle").attr('fill', '#e5e5e5')
//                svg.children("polyline").attr('stroke', '#c0c0c0')
//                $(this).data('checked','false');
//            }
             
            
          
     }).each( function(){
           
           if( $(this).attr('checked') )  
                    $(this).click();
                          
       });
    
