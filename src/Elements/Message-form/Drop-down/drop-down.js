import "./drop-down.styl"


(function($){
    

    
    class DropDown{
        
        constructor(root){
            
            let _this = this;
            this.root = $(root);
        
           
            let select = this.root.find('select').first();   
            
            this.root.find('li').click(function(){ 
                        
                        select_option.contents().filter(function(){
                            return (this.nodeType == 3);
                        }).remove();
                      
                       select_option.append( document.createTextNode($(this).html()));
                       
                      select.val($(this).attr('value'))
                        _this.Expand();
                      return false;
                    });
             
            let select_option = this.root
                    .find(".message-form__dropdown")
                    .first()
                    .on('click.dropDown', () => {this.Expand(); return false;}); 

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
