import './location.styl'


(function($){
    
    $.fn.Location = function(title, place, lat, lng, icon_src){
        
        return this.each(function(){
            
            
            var footer = $("<div/>").addClass('map__footer').append($('<div/>').addClass('map__footer-title').text(title) ).append($('<div/>').addClass('map__footer-place').text(place));
            
            var icons = $("<div/>").addClass('map__footer-icons').append($('<i/>').addClass('fa fa-crosshairs').attr('aria-hidden','true')).append($('<i/>').addClass('fa fa-map-marker').attr('aria-hidden','true'))
            
            footer.append(icons);
            
           
            
            var map = $('<div/>').addClass('map__body');
            
             $(this).addClass('map').append(footer).append(map);
            
            var map = new google.maps.Map(map[0], {
                center: {lat:  lat, lng: lng}, 
                zoom: 15,
               disableDefaultUI: true
            });
    
  
    
           var markers = [];
              markers.push(new google.maps.Marker({
                                  map: map,
                                    icon: {
                                    url: icon_src,
                                    size: new google.maps.Size(110, 110),
                                    origin: new google.maps.Point(0, 0),
                                    anchor: new google.maps.Point(55, 110),
                                    scaledSize: new google.maps.Size(110, 110),
                                    labelOrigin: new google.maps.Point(18, 18)
                                  },

                                  title: "test",
                                  position: {lat: lat , lng: lng } 
                                }));
  
    
            
        });    
    }
    
})(jQuery)
        
