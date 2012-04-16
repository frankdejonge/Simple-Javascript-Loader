//(function(){function h(a){return toString.call(a)==="[object String]"}function g(a){return toString.call(a)==="[object Function]"}function f(a,b){if(!e(a)){return false}for(var c=0;c<a.length;c++){if(a[c]===b){return true}}return false}function e(a){return toString.call(a)==="[object Array]"}"use strict";var a=this;var b=a.Sjl;var c=function(){this.stack=1;this.container=[];this.callbacks=[];this.injected=[];this.loaded=[];this.instack=[];this.fired=[]};c.prototype.add=function(a){if(!e(this.container[this.stack])){this.container[this.stack]=[]}if(!e(a)){a=[a]}for(var b=0;b<a.length;b++){if(!f(this.loaded,a[b])&&!f(this.container[this.stack],a[b])){this.container[this.stack].push(a[b]);var c="Sjl-loaded-"+a[b].replace(/[^a-zA-Z0-9]+/g,"-");if(!e(this.instack[c])){this.instack[c]=[]}this.instack[c].push(this.stack)}}return this};c.prototype.load=function(b,c){var h=this.stack;this.loaded[h]=0;if(g(b)){this.callbacks[h]=b}else{this.add(b);this.callbacks[h]=c}if(!e(this.container[h])||this.container[h].length<1){this.fireCallback(h);return}var i=this;var j=function(){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){this.onload=this.onreadystatechange=null;i.loaded[this.className]=true;for(var a=0;a<i.instack[this.className].length;a++){var b=i.instack[this.className][a];if(i.stackLoaded(b)){i.fireCallback(b)}}}};for(var k=0;k<this.container[h].length;k++){var l=this.container[h][k];var m="Sjl-loaded-"+l.replace(/[^a-zA-Z0-9]+/g,"-");if(!f(this.injected,this.container[h][k])){this.injected.push(this.container[h][k]);var n=a.document.createElement("script");n.type="text/javascript";n.className=m;n.src=l;n.onload=n.onreadystatechange=j;d.appendChild(n)}else if(i.loaded[m]==true){if(i.stackLoaded(h)){i.fireCallback(h);return true}}}this.stack++};c.prototype.noConflict=function(){a.Sjl=b;return this};c.prototype.fireCallback=function(a){if(!this.fired[a]&&g(this.callbacks[a])){this.fired[a]=true;this.callbacks[a].call()}};c.prototype.stackLoaded=function(a){for(var b=0;b<this.container[a].length;b++){if(this.loaded["Sjl-loaded-"+this.container[a][b].replace(/[^a-zA-Z0-9]+/g,"-")]!=true){return false}}return true};var d=a.document.getElementsByTagName("head")[0];a.sjl=new c;var i=a.document.getElementsByTagName("script");var j=i[i.length-1],k;if((k=j.dataMain)||(k=j.getAttribute("data-main"))){a.sjl.load(k)}}).call(this)

;(function(){
	"use strict";

	var root = this;
	var prev_Sjl = root.Sjl;
	var toString = Object.prototype.toString;
	
	var Sjl = function(){
		this.stack = 1;
		this.container = [];
		this.callbacks = [];
		this.injected = [];
		this.loaded = [];
		this.instack = [];
		this.fired = [];
	};
	
	Sjl.prototype.add = function(scripts)
	{
		if( ! is_array(this.container[this.stack]))
		{
			this.container[this.stack] = [];
		}
		
		if( ! is_array(scripts))
		{
			scripts = [scripts];
		}

		for(var i = 0; i < scripts.length; i++)
		{
			if( ! in_array(this.loaded, scripts[i]) && ! in_array(this.container[this.stack], scripts[i]))
			{
				this.container[this.stack].push(scripts[i]);
				var hash = 'Sjl-loaded-'+scripts[i].replace(/[^a-zA-Z0-9]+/g, '-');
				if( ! is_array(this.instack[hash]))
				{
					this.instack[hash] = [];
				}
				this.instack[hash].push(this.stack);
			}
		}
		
		return this;
	};
	
	Sjl.prototype.load = function(scripts, callback)
	{
		var _stack = this.stack;
		this.loaded[_stack] = 0;
		
		if(is_function(scripts))
		{
			this.callbacks[_stack] = scripts;
		}
		else
		{
			this.add(scripts);
			this.callbacks[_stack] = callback;
		}
		
		if( ! is_array(this.container[_stack]) || this.container[_stack].length < 1)
		{
			this.fireCallback(_stack);
			return;
		}
		
		var _Sjl = this;
		
		var scriptload = function ()
		{
			if ( ! this.readyState || this.readyState == "loaded" || this.readyState == "complete")
			{
				this.onload = this.onreadystatechange = null;
				_Sjl.loaded[this.className] = true;
				for(var i = 0; i < _Sjl.instack[this.className].length; i++)
				{
					var stack = _Sjl.instack[this.className][i];
					if(_Sjl.stackLoaded(stack))
					{
						_Sjl.fireCallback(stack);
					}
				}
			}
		};
		
		for(var i = 0; i < this.container[_stack].length; i++)
		{
			var src = this.container[_stack][i];
			var _class = 'Sjl-loaded-' + src.replace(/[^a-zA-Z0-9]+/g, '-');
			if( ! in_array(this.injected, this.container[_stack][i]))
			{
				this.injected.push(this.container[_stack][i]);
				var script = root.document.createElement('script');
				script.type = 'text/javascript';
				script.className = _class;
				script.src = src;
				script.onload = script.onreadystatechange = scriptload;
				head.appendChild(script);
			}
			else if(_Sjl.loaded[_class] == true)
			{
				if(_Sjl.stackLoaded(_stack))
				{
					_Sjl.fireCallback(_stack);
					return true;
				}
			}
		}
		this.stack++;
	};
	
	Sjl.prototype.noConflict = function()
	{
		root.Sjl = prev_Sjl;
		return this;
	};
	
	Sjl.prototype.fireCallback = function(_stack)
	{
		if( ! this.fired[_stack] && is_function(this.callbacks[_stack]))
		{
			this.fired[_stack] = true;
			this.callbacks[_stack].call();
		}
	};
	
	Sjl.prototype.stackLoaded = function(_stack)
	{
		for(var i = 0; i < this.container[_stack].length; i++)
		{
			if(this.loaded['Sjl-loaded-'+this.container[_stack][i].replace(/[^a-zA-Z0-9]+/g, '-')] != true)
			{
				return false;
			}
		}
		
		return true;
	}
	
	var head = root.document.getElementsByTagName('head')[0];
	
	function is_array(arr)
	{
		return toString.call(arr) === '[object Array]';
	}
		
	function in_array(arr, item)
	{
		if( ! is_array(arr))
		{
			return false;
		}
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i] === item)
			{
				return true;
			}
		}
		return false;
	}
	
	function is_function(func)
	{
		return toString.call(func) === '[object Function]';
	}
	
	function is_string(str)
	{
		return toString.call(str) === '[object String]';
	}
	
	root.sjl = new Sjl();
	
	var s = root.document.getElementsByTagName('script');
	var c = s[s.length-1], dataMain;
	if((dataMain = c.dataMain) || (dataMain = c.getAttribute('data-main')))
	{
		root.sjl.load(dataMain);
	}
	
}).call(this);