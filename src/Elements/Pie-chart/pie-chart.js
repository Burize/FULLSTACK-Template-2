import "./pie-chart.styl";


( function ($) {

  class CanvasRenderer { 
      
      
    constructor(element, percent, linewidth, barcolor) {
          
        this.element = element;
        this.percent = percent;
        this.linewidth = linewidth;
        this.barcolor = barcolor;
        this.trackcolor = '#eee';
   
        this.canvas = document.createElement('canvas');

        element.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
     
        }
      
        draw() {
            
        var width = $(this.element).outerWidth();
        
        this.canvas.width = this.canvas.height = width;
          
        this.ctx.translate(width / 2.0, width / 2.0);
            
        this.ctx.rotate( -0.5 * Math.PI);
            
        this.radius = (width -  this.linewidth * width / 100.0 ) / 2.0;
        
        if(this.percent != 0)
            {
                this.drawCircle(1, this.trackcolor);
                this.drawCircle(this.percent / 100.0, this.barcolor);
            }
        }

        drawCircle( percent, color ) {


          this.ctx.beginPath();
          this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2.0 * percent);

          this.ctx.strokeStyle = color;
          this.ctx.lineWidth = this.linewidth * $(this.element).outerWidth() / 100.0;

          this.ctx.stroke();
        }
   
  

     
  };


    $('.pie-chart').each(function () {
        
        var renderer = new CanvasRenderer(this, $(this).data('percent'), $(this).data('linewidth'), $(this).data('barcolor'));

    
        var Value = $(this).data('percent');
          
       $(this).children(".pie-chart__inner").children(".pie-chart__value").children("span").css('font-size',$(this).outerWidth()/2.4 ).html(Value);
          
        renderer.draw();
            
        var _this = $(this);
        $(window).resize(function(){
            
            _this.children(".pie-chart__inner").children(".pie-chart__value").children("span").css('font-size',_this.outerWidth()/2.4 )
            renderer.draw();
            
        });
      
    });
  

})(jQuery)