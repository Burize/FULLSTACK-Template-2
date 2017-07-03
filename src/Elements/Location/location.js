import './location.styl'


(function($){
    
        
        $('.map').each(function(){
            
            var map = new google.maps.Map($(this).children('.map__body')[0], {
                center: {lat:  $(this).data('lat'), lng: $(this).data('lng')}, 
                zoom: 15,
               disableDefaultUI: true
            });
    
    
           var markers = [];
              markers.push(new google.maps.Marker({
                                  map: map,
                                    icon: $(this).data('marker') ?  
                                          {
                                            url: $(this).data('marker'),
                                            size: new google.maps.Size(110, 110),
                                            origin: new google.maps.Point(0, 0),
                                            anchor: new google.maps.Point(55, 110),
                                            scaledSize: new google.maps.Size(110, 110),
                                            labelOrigin: new google.maps.Point(18, 18)
                                        } : "",

                                  title: "test",
                                  position: {lat: $(this).data('lat'), lng: $(this).data('lng') } 
                                }));
  
        });    
    
})(jQuery)
        
