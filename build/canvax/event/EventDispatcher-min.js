define("canvax/event/EventDispatcher",["canvax/core/Base","canvax/event/EventManager"],function(a,b){var c=function(){arguments.callee.superclass.constructor.call(this,name)};return a.creatClass(c,b,{on:function(a,b){return this._addEventListener(a,b),this},addEventListener:function(a,b){return this._addEventListener(a,b),this},un:function(a,b){return this._removeEventListener(a,b),this},removeEventListener:function(a,b){return this._removeEventListener(a,b),this},removeEventListenerByType:function(a){return this._removeEventListenerByType(a),this},removeAllEventListeners:function(){return this._removeAllEventListeners(),this},fire:function(a){return _.isString(a)&&(a={type:a}),this.dispatchEvent(a),this},dispatchEvent:function(a){if("mouseover"!=a.type){if(this._dispatchEvent(a),"mouseout"==a.type&&this._hoverClass){var b=this.getStage().parent;this._hoverClass=!1,b._hoverStage.removeChildById(this.id)}return this}var c=this._heartBeatNum;if(this._dispatchEvent(a),c!=this._heartBeatNum){this._hoverClass=!0;var b=this.getStage().parent,d=this.clone(!0);d._transform=this.getConcatenatedMatrix(),b._hoverStage.addChild(d)}},hasEvent:function(a){return this._hasEventListener(a)},hasEventListener:function(a){return this._hasEventListener(a)},hover:function(a,b){return this.on("mouseover",a),this.on("mouseout",b),this},once:function(a,b){return this.on(a,function(){b.apply(this,arguments),this.un(a,arguments.callee)}),this}}),c});