KISSY.add("canvax/core/PropertyFactory",function(a,b){function c(a,d,e){function g(a,f){(!unwatchOne[a]||unwatchOne[a]&&"$"!==a.charAt(0))&&(d[a]=f);var g=b.getType(f);if("function"===g)unwatchOne[a]||n.push(a);else{if(-1!==_.indexOf(i,a)||"$"===a.charAt(0)&&!e[a])return n.push(a);var o,p;if("object"===g&&"function"==typeof f.get&&_.keys(f).length<=2){var q=f.set,r=f.get;o=function(b){var c=o.value,e=c;return arguments.length?(h||("function"==typeof q&&q.call(j,b),p!==b&&(p=b,c=o.value=d[a]=b,j.$fire&&j.$fire(a,c,e))),void 0):(b=o.value=d[a]=r.call(j),c!==b&&(p=void 0,j.$fire&&j.$fire(a,b,c)),b)},m.push(o)}else o=function(e){var f,i=o.value,k=i;if(!arguments.length)return"array"!==g&&"object"!==g||i.$model||(i.$parent=j,i=c(i,i),o.value=i),i;var l=b.getType(e);if(!h&&i!==e){"array"===l||"object"===l?(i=e.$model?e:c(e,e),f=i.$model):i=e,o.value=i,d[a]=f?f:i,f||j.$fire&&j.$fire(a,i,k),g!=l&&(g=l);var m=j;if(!j.$watch)for(;m.$parent;)m=m.$parent;m.$watch&&m.$watch.call(m,a,i,k)}},o.value=f,l.push(a);k[a]={set:o,get:o,enumerable:!0}}}var h=!0,i=a.$skipArray,j={},k={},l=[],m=[],n=_.keys(unwatchOne);d=d||{},e=e||{},i=_.isArray(i)?i.concat(n):n;for(var o in a)g(o,a[o]);return j=f(j,k,n),_.forEach(n,function(b){a[b]&&(j[b]="function"==typeof a[b]?function(){a[b].apply(this,arguments)}:a[b])}),j.$model=d,j.$accessor=k,j.hasOwnProperty=function(a){return a in j.$model},h=!1,j}function d(a,b,c){var d=a[b]&&a[b].set;return 3!==arguments.length?d():(d(c),void 0)}unwatchOne={$skipArray:0,$watch:1,$fire:2,$model:3,$accessor:4,$owner:5,path:6,$parent:7};var e=Object.defineProperty;try{e({},"_",{value:"x"});var f=Object.defineProperties}catch(g){"__defineGetter__"in Object&&(e=function(a,b,c){return"value"in c&&(a[b]=c.value),"get"in c&&a.__defineGetter__(b,c.get),"set"in c&&a.__defineSetter__(b,c.set),a},f=function(a,b){for(var c in b)b.hasOwnProperty(c)&&e(a,c,b[c]);return a})}return!f&&window.VBArray&&(window.execScript(["Function parseVB(code)","	ExecuteGlobal(code)","End Function"].join("\n"),"VBScript"),f=function(a,b,c){a=c.slice(0),a.push("hasOwnProperty");var e="VBClass"+setTimeout("1"),f={},g=[];g.push("Class "+e,"	Private [__data__], [__proxy__]","	Public Default Function [__const__](d, p)","		Set [__data__] = d: set [__proxy__] = p","		Set [__const__] = Me","	End Function"),_.forEach(a,function(a){f[a]!==!0&&(f[a]=!0,g.push("	Public ["+a+"]"))});for(var h in b)f[h]=!0,g.push("	Public Property Let ["+h+"](val)",'		Call [__proxy__]([__data__], "'+h+'", val)',"	End Property","	Public Property Set ["+h+"](val)",'		Call [__proxy__]([__data__], "'+h+'", val)',"	End Property","	Public Property Get ["+h+"]","	On Error Resume Next","		Set["+h+'] = [__proxy__]([__data__],"'+h+'")',"	If Err.Number <> 0 Then","		["+h+'] = [__proxy__]([__data__],"'+h+'")',"	End If","	On Error Goto 0","	End Property");return g.push("End Class"),g.push("Function "+e+"Factory(a, b)","	Dim o","	Set o = (New "+e+")(a, b)","	Set "+e+"Factory = o","End Function"),window.parseVB(g.join("\r\n")),window[e+"Factory"](b,d)}),c},{requires:["canvax/core/Base"]});