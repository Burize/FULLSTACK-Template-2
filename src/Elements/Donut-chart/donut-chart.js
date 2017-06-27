

var d3 = require('d3');

(function ( $ ) {
 	
	class DonutPie {
        
        
     constructor($self, options) {
		this.$self = $self;
		this.settings =  options;
	}

	Display(data){
		
		var radius = this.settings.width / 2;

		this.svg = d3.select(this.$self)
			.append("svg")
			.attr("width", radius * 2)
			.attr("height", radius * 2)
			.append("g");

		this.svg.append("g")
			.attr("class", "slices");
		
		this.pie = d3.pie()
			.sort(null)
			.value(function(d){
				return d.hvalue;
			});

		this.arc = d3.arc()
		  .outerRadius(radius * (1 - this.settings.linewidth) )
		  .innerRadius(radius);

	
		this.svg.attr("transform", "translate(" + radius + "," + radius + ")");

	
		var slice = this.svg.select(".slices").selectAll("path.slice")
		    .data(this.pie(data));

		slice.enter()
		    .insert("path")
		    .style("fill", function(d) { return d.data.color; })
		    .attr("class", "slice")
		    .attr("d", this.arc);  

		slice.exit()
		    .remove();

	};
    }

	
    $.fn.donutpie = function(option, pies) {
	  
     return this.each(function () {
            var $donutpie   = new DonutPie(this, option);
            $donutpie.Display.call( $donutpie,pies);
        });		
	};

}( jQuery ));