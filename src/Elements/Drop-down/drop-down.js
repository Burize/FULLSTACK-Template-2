import "./drop-down.styl"


(function($){
    

    
    class DropDown{
        
        constructor(root){
            
            var _this = this;
            this.root = $(root);
        
           
            var select = this.root.find('select').first();   
            
            this.root.find('li').click(function(){ 
                        
                        select_option.contents().filter(function(){
                            return (this.nodeType == 3);
                        }).remove();
                      
                       select_option.append( document.createTextNode($(this).html()));
                       
                      select.val($(this).attr('value'))
                        _this.Expand.call(_this);
                      return false;
                    });
             
            var select_option = this.root.find(".dropdown__selected-option").first().click(function(){ _this.Expand.call(_this); return false;}); 

        }
        
          Expand(){
               
              this.root.toggleClass('dropdown_open'); 
        }
    }
    
         
        $('.dropdown').each( function(){
           
                $(this).data("dropdown", new DropDown(this)) 
        })
        
        
        $(window).click( function(){
            
            $('.dropdown').removeClass('dropdown_open');
        });
        


})(jQuery)
