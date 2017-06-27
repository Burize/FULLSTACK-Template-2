import "./profil.styl"


(function($){
    
    
    $.fn.Profil = function(portrait_src, name, profession, links){
        
        return this.each( function(){
                
            var profil_name = $("<p/>").addClass("profil__name").html(name)
            
            var profil_profession = $("<p/>").addClass("profil__profession").html(profession);
            
            var profil_links = $("<div/>").addClass('profil__links');
            
            links.forEach(function(element){
                
                profil_links.append( $('<a/>').attr("href",element.href).append( $('<i/>').addClass(element.class) ) ); 
            });
            
        
            var profil_data = $("<div/>").addClass('profil__data').append($('<div/>').addClass('profil__data-arrow'));
            
            profil_data.append(profil_name).append(profil_profession).append(profil_links);
            
            var profil_portrait = $('<div/>').addClass("profil__portrait").css("background-image", "url("+portrait_src+")")
            
            
            $(this).addClass('profil').append(profil_portrait).append(profil_data);
            
        })
    }
    
})(jQuery);