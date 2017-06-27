import "./drop-down.styl"


(function($){
    

    
    class DropDown{
        
       
        
        
        constructor(root, name, options){
            
            var _this = this;
            this.root = $(root);
            var inner = $("<div/>").addClass("dropdown__inner")
           
            var select = $("<select/>").attr('name', name).click(function(){ return false; });
            var ul = $("<ul/>");
            options.forEach( function(element){
                select.append($("<option>").attr('value',element.value).html(element.text));
                
                  ul.append($('<li/>').attr('value',element.value).html(element.text).click(function(){ 
                        
                        select_option.contents().filter(function(){
                            return (this.nodeType == 3);
                        }).remove();
                      
                       select_option.append( document.createTextNode($(this).html()));
                       
                      select.val($(this).attr('value'))
                        _this.Expand.call(_this);
                        
                    }));
            }) 
             
            var option_dropdown = $("<div/>").addClass('dropdown__ul');
            
            var select_option = $("<div/>").addClass("dropdown__selected-option").html("Choose An Option").click(function(){ _this.Expand.call(_this)});
            
            select_option.append("<div class='dropdown__icon' style='background: #4eb7a8'> <svg  viewbox='0, 0, 100, 100' ><polyline points='30,45 50,65 70,45' fill='none' stroke='white' stroke-width='8%'></polyline></svg></div>")

            option_dropdown.append(ul);
            
            inner.append(select);
            inner.append(select_option);
            inner.append(option_dropdown);
            this.root.append( inner );
        }
        
      
          Expand(){
           
            var ul =  this.root.find("ul").first();
            var icon = this.root.find(".dropdown__icon").children('svg').first();
              
              if( ul.css('height') != '0px')
                  {
                    ul.css('height', '0');
                    icon.removeClass('dropdown__icon_rotate');
                  }
              else
                    {
                    ul.css('height', 'auto');
                    icon.addClass('dropdown__icon_rotate');
                    }
        }
    }
    
    
    $.fn.Dropdown = function(name, options){
         
        return this.each( function(){
            if(!$(this).data("dropdown") )
                $(this).data("dropdown", new DropDown(this, name, options )) 
        })
    }

})(jQuery)












