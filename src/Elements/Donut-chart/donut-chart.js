var d3 = require('d3');

(function ( $ ) {
 	
	class DonutPie {
        
        
     constructor(self, width, linewidth, pies) {
		this.self = self;
		this.width = $(this.self).outerWidth();
        this.linewidth =  linewidth;
         this.data = pies
        var radius = this.width / 2;

		this.svg = d3.select(this.self)
			.append("svg")
			.append("g");

		this.svg.append("g")
			.attr("class", "slices");
		
		this.pie = d3.pie()
			.sort(null)
			.value(function(d){
				return d.value;
			});

	
		this.slice = this.svg.select(".slices").selectAll("path.slice")
		    .data(this.pie(this.data));
         
        this.Display();
	}

	Display(){
		var radius = $(this.self).outerWidth() / 2;

		$(this.self).children('svg')
			.attr("width", radius * 2)
			.attr("height", radius * 2)
            .find(".slices").first().html("");
			


		
		this.arc = d3.arc()
		  .outerRadius(radius * (1 - this.linewidth) )
		  .innerRadius(radius);

	
		this.svg.attr("transform", "translate(" + radius + "," + radius + ")");

	

		this.slice.enter()
		    .insert("path")
		    .style("fill", function(d) { return d.data.color; })
		    .attr("class", "slice")
		    .attr("d", this.arc);  

		this.slice.exit()
		    .remove();

	};
    }

    
    
     $('.donut-chart').each(function () {
       
            var $donutpie   = new DonutPie(this, $(this).outerWidth(), $(this).data('linewidth'), $(this).data('pies') );
           
         
         $(window).resize( function(){
                
                $donutpie.Display.call( $donutpie);
            });
        });		
	


}( jQuery ));