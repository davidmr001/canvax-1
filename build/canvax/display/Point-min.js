KISSY.add("canvax/display/Point",function(){var a=function(a,b){if(1!=arguments.length||"object"!=typeof arguments[0])a||(a=0),b||(b=0),this.x=1*a,this.y=1*b;else{var c=arguments[0];if("x"in c&&"y"in c)this.x=1*c.x,this.y=1*c.y;else{var d=0;for(var e in c){if(0!=d){this.y=1*c[e];break}this.x=1*c[e],d++}}}};return a});