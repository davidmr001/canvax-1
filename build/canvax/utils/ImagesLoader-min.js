KISSY.add("canvax/utils/ImagesLoader",function(a,b,c){var d=function(a){arguments.callee.superclass.constructor.apply(this,arguments),this.urls=a||[],this.images=[],this.loads=0,this.init()};return b.creatClass(d,c,{init:function(){this.images.length=this.urls.length},_loadHand:function(a,b){var c=new Image,d=this;return c.onload=function(){d.images.splice(a,1,c),b(a,c)},c},_load:function(a,b,c){this._loadHand(a,c).src=b+"?t="+(new Date).getTime()},start:function(){var a=this;if(this.urls.length>0)for(var b=0,c=this.urls.length;c>b;b++){var d=this.urls[b];a._load(b,d,function(b,d){a.loads=a.loads+1,a.hasEvent("secSuccess")&&a.fire({index:b,img:d,type:"secSuccess"}),a.loads==c&&a.hasEvent("success")&&a.fire({images:a.images,type:"success"})})}}}),d},{requires:["canvax/core/Base","canvax/event/EventDispatcher"]});