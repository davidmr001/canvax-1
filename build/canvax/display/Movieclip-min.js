define("canvax/display/Moveclip",["canvax/display/DisplayObjectContainer","canvax/core/Base"],function(a,b,c){var d=function(a){var b=this;a=c.checkOpt(a),b.type="movieclip",b.currentFrame=0,b.autoPlay=a.autoPlay||!1,b.repeat=a.repeat||0,b.overPlay=a.overPlay||!1,b._frameRate=c.mainFrameRate,b._speedTime=parseInt(1e3/b._frameRate),b._preRenderTime=0,b._context={},arguments.callee.superclass.constructor.apply(this,[a])};return c.creatClass(d,b,{init:function(){},getStatus:function(){return this.autoPlay},getFrameRate:function(){return this._frameRate},setFrameRate:function(a){var b=this;b._frameRate!=a&&(b._frameRate=a,b._speedTime=parseInt(1e3/b._frameRate))},afterAddChild:function(a,b){1!=this.children.length&&void 0!=b&&b<=this.currentFrame&&this.currentFrame++},afterDelChild:function(a,b){this.currentFrame;b<this.currentFrame&&this.currentFrame--,this.currentFrame>=this.children.length&&this.children.length>0&&(this.currentFrame=this.children.length-1)},_goto:function(a){var b=this.children.length;a>=b&&(a%=b),0>a&&(a=this.children.length-1-Math.abs(a)%b),this.currentFrame=a},gotoAndStop:function(a){return this._goto(a),this.autoPlay?(this.autoPlay=!1,void 0):(this._preRenderTime=0,this.getStage().heartBeat(),void 0)},stop:function(){this.autoPlay&&(this.autoPlay=!1)},gotoAndPlay:function(a){this._goto(a),this.play()},play:function(){if(!this.autoPlay){this.autoPlay=!0;var a=this.getStage().parent;a._heartBeat||0!=a._taskList.length||a.__startEnter(),this._push2TaskList(),this._preRenderTime=(new Date).getTime()}},_push2TaskList:function(){this._enterInCanvax||(this.getStage().parent._taskList.push(this),this._enterInCanvax=!0)},_enterInCanvax:!1,__enterFrame:function(){var a=this;c.now-a._preRenderTime>=a._speedTime&&a.getStage().heartBeat()},next:function(){var a=this;a.autoPlay||a.gotoAndStop(a._next())},pre:function(){var a=this;a.autoPlay||a.gotoAndStop(a._pre())},_next:function(){return this.currentFrame>=this.children.length-1?this.currentFrame=0:this.currentFrame++,this.currentFrame},_pre:function(){return 0==this.currentFrame?this.currentFrame=this.children.length-1:this.currentFrame--,this.currentFrame},render:function(a){if(this.overPlay)for(var b=0;b<=this.currentFrame;b++)this.getChildAt(b)._render(a);else this.getChildAt(this.currentFrame)._render(a);if(1==this.children.length&&(this.autoPlay=!1),this.currentFrame==this.getNumChildren()-1&&(this.repeat||(this.stop(),this.hasEvent("end")&&this.fire("end")),_.isNumber(this.repeat)&&this.repeat>0&&this.repeat--),this.autoPlay)c.now-this._preRenderTime>=this._speedTime&&(this._preRenderTime=c.now,this._next()),this._push2TaskList();else if(this._enterInCanvax){this._enterInCanvax=!1;var d=this.getStage().parent._taskList;d.splice(_.indexOf(d,this),1)}}}),d});