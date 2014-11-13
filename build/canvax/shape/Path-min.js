define("canvax/shape/Path",["canvax/display/Shape","canvax/core/Base"],function(a,b){var c=function(a){var c=this;c.type="path",a=b.checkOpt(a),"drawTypeOnly"in a&&(c.drawTypeOnly=a.drawTypeOnly),c._context={pointList:[],path:a.context.path||""},arguments.callee.superclass.constructor.apply(this,arguments)};return b.creatClass(c,a,{_parsePathData:function(a){if(!a)return[];var b=a,c=["m","M","l","L","v","V","h","H","z","Z","c","C","q","Q","t","T","s","S","a","A"];b=b.replace(/  /g," "),b=b.replace(/ /g,","),b=b.replace(/(\d)-/g,"$1,-"),b=b.replace(/,,/g,",");var d;for(d=0;d<c.length;d++)b=b.replace(new RegExp(c[d],"g"),"|"+c[d]);var e=b.split("|"),f=[],g=0,h=0;for(d=1;d<e.length;d++){var i=e[d],j=i.charAt(0);i=i.slice(1),i=i.replace(new RegExp("e,-","g"),"e-");var k=i.split(",");k.length>0&&""===k[0]&&k.shift();for(var l=0;l<k.length;l++)k[l]=parseFloat(k[l]);for(;k.length>0&&!isNaN(k[0]);){var m,n,o,p,q,r,s,t,u=null,v=[],w=g,x=h;switch(j){case"l":g+=k.shift(),h+=k.shift(),u="L",v.push(g,h);break;case"L":g=k.shift(),h=k.shift(),v.push(g,h);break;case"m":g+=k.shift(),h+=k.shift(),u="M",v.push(g,h),j="l";break;case"M":g=k.shift(),h=k.shift(),u="M",v.push(g,h),j="L";break;case"h":g+=k.shift(),u="L",v.push(g,h);break;case"H":g=k.shift(),u="L",v.push(g,h);break;case"v":h+=k.shift(),u="L",v.push(g,h);break;case"V":h=k.shift(),u="L",v.push(g,h);break;case"C":v.push(k.shift(),k.shift(),k.shift(),k.shift()),g=k.shift(),h=k.shift(),v.push(g,h);break;case"c":v.push(g+k.shift(),h+k.shift(),g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),u="C",v.push(g,h);break;case"S":m=g,n=h,o=f[f.length-1],"C"===o.command&&(m=g+(g-o.points[2]),n=h+(h-o.points[3])),v.push(m,n,k.shift(),k.shift()),g=k.shift(),h=k.shift(),u="C",v.push(g,h);break;case"s":m=g,n=h,o=f[f.length-1],"C"===o.command&&(m=g+(g-o.points[2]),n=h+(h-o.points[3])),v.push(m,n,g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),u="C",v.push(g,h);break;case"Q":v.push(k.shift(),k.shift()),g=k.shift(),h=k.shift(),v.push(g,h);break;case"q":v.push(g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),u="Q",v.push(g,h);break;case"T":m=g,n=h,o=f[f.length-1],"Q"===o.command&&(m=g+(g-o.points[0]),n=h+(h-o.points[1])),g=k.shift(),h=k.shift(),u="Q",v.push(m,n,g,h);break;case"t":m=g,n=h,o=f[f.length-1],"Q"===o.command&&(m=g+(g-o.points[0]),n=h+(h-o.points[1])),g+=k.shift(),h+=k.shift(),u="Q",v.push(m,n,g,h);break;case"A":p=k.shift(),q=k.shift(),r=k.shift(),s=k.shift(),t=k.shift(),w=g,x=h,g=k.shift(),h=k.shift(),u="A",v=this._convertPoint(w,x,g,h,s,t,p,q,r);break;case"a":p=k.shift(),q=k.shift(),r=k.shift(),s=k.shift(),t=k.shift(),w=g,x=h,g+=k.shift(),h+=k.shift(),u="A",v=this._convertPoint(w,x,g,h,s,t,p,q,r)}f.push({command:u||j,points:v})}("z"===j||"Z"===j)&&f.push({command:"z",points:[]})}return f},_convertPoint:function(a,b,c,d,e,f,g,h,i){var j=i*(Math.PI/180),k=Math.cos(j)*(a-c)/2+Math.sin(j)*(b-d)/2,l=-1*Math.sin(j)*(a-c)/2+Math.cos(j)*(b-d)/2,m=k*k/(g*g)+l*l/(h*h);m>1&&(g*=Math.sqrt(m),h*=Math.sqrt(m));var n=Math.sqrt((g*g*h*h-g*g*l*l-h*h*k*k)/(g*g*l*l+h*h*k*k));e===f&&(n*=-1),isNaN(n)&&(n=0);var o=n*g*l/h,p=n*-h*k/g,q=(a+c)/2+Math.cos(j)*o-Math.sin(j)*p,r=(b+d)/2+Math.sin(j)*o+Math.cos(j)*p,s=function(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1])},t=function(a,b){return(a[0]*b[0]+a[1]*b[1])/(s(a)*s(b))},u=function(a,b){return(a[0]*b[1]<a[1]*b[0]?-1:1)*Math.acos(t(a,b))},v=u([1,0],[(k-o)/g,(l-p)/h]),w=[(k-o)/g,(l-p)/h],x=[(-1*k-o)/g,(-1*l-p)/h],y=u(w,x);return t(w,x)<=-1&&(y=Math.PI),t(w,x)>=1&&(y=0),0===f&&y>0&&(y-=2*Math.PI),1===f&&0>y&&(y+=2*Math.PI),[q,r,g,h,v,y,j,f]},draw:function(a,b){for(var c,d=b.path,e=this._parsePathData(d),f=0,g=0,h=b.pointList=[],i=[],j=0,k=e.length;k>j;j++){"M"==e[j].command.toUpperCase()&&(i.length>0&&h.push(i),i=[]),c=e[j].points;for(var l=0,m=c.length;m>l;l+=2)i.push([c[l]+f,c[l+1]+g])}i.length>0&&h.push(i);for(var n,j=0,k=e.length;k>j;j++){n=e[j].command,c=e[j].points;for(var l=0,m=c.length;m>l;l++)c[l]+=l%2===0?f:g;switch(n){case"L":a.lineTo(c[0],c[1]);break;case"M":a.moveTo(c[0],c[1]);break;case"C":a.bezierCurveTo(c[0],c[1],c[2],c[3],c[4],c[5]);break;case"Q":a.quadraticCurveTo(c[0],c[1],c[2],c[3]);break;case"A":var o=c[0],p=c[1],q=c[2],r=c[3],s=c[4],t=c[5],u=c[6],v=c[7],w=q>r?q:r,x=q>r?1:q/r,y=q>r?r/q:1;a.translate(o,p),a.rotate(u),a.scale(x,y),a.arc(0,0,w,s,s+t,1-v),a.scale(1/x,1/y),a.rotate(-u),a.translate(-o,-p);break;case"z":a.closePath()}}},getRect:function(a){var b,a=a?a:this.context;b=a.strokeStyle||a.fillStyle?a.lineWidth||1:0;for(var c=Number.MAX_VALUE,d=Number.MIN_VALUE,e=Number.MAX_VALUE,f=Number.MIN_VALUE,g=0,h=0,i=this._parsePathData(a.path),j=0;j<i.length;j++)for(var k=i[j].points,l=0;l<k.length;l++)l%2===0?(k[l]+g<c&&(c=k[l]+g),k[l]+g>d&&(d=k[l]+g)):(k[l]+h<e&&(e=k[l]+h),k[l]+h>f&&(f=k[l]+h));var m;return m=c===Number.MAX_VALUE||d===Number.MIN_VALUE||e===Number.MAX_VALUE||f===Number.MIN_VALUE?{x:0,y:0,width:0,height:0}:{x:Math.round(c-b/2),y:Math.round(e-b/2),width:d-c+b,height:f-e+b}}}),c});