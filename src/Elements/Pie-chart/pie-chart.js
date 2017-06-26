import "./pie-chart.styl";


( function ($) {

  class CanvasRenderer { 
      
      
    constructor(element, options) {
          
        this.element = element;
        this.options = options;
   
        this.canvas = document.createElement('canvas');

        element.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.canvas.height = options.size;

        this.ctx.translate(options.size / 2.0, options.size / 2.0);

        this.ctx.rotate( -0.5 * Math.PI);

        this.radius = (options.size - 2 * options.lineWidth) / 2.0;
        }

    drawCircle(color, lineWidth, percent) {
      

      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2.0 * percent);

      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;

      this.ctx.stroke();
    }
   
    draw(percent) {
     
        this.drawCircle(this.options.trackColor, this.options.lineWidth, 1);
        this.drawCircle(this.options.barColor, this.options.lineWidth, percent / 100.0);
        }

     
  };

  function pieChart (element, userOptions) {
    
    var defaultOptions = {
      barColor: '#ef1e25',
      trackColor: '#f9f9f9',
      lineWidth: 3,
      size: 150
    };

    var options = {};
    

      
      for (var i in defaultOptions) {
       
          options[i] = userOptions && typeof(userOptions[i]) !== 'undefined' ? userOptions[i] : defaultOptions[i]; 
      }

      var renderer = new CanvasRenderer(element, options);

      if ( element.getAttribute('data-percent')) {
        var Value = parseFloat(element.getAttribute('data-percent'));
          
       $(element).children(".pie-chart__inner").children(".pie-chart__value").children("span").css('font-size',$(element).width()/2.4 ).html(Value);
          
          if(Value != 0)
                renderer.draw(Value);
        
      }
   
  };

  $.fn.pieChart = function (options) {

    return this.each(function () {
          pieChart(this, options);
    });
  };

})(jQuery)