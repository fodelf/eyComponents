/*!
* Instruction :视图层基类
* 
* Author : 吴文周
* 
* Date: 2017-03-20
*/
(function($,ey){
	
	"use strict";
	
	var View = function(arg){
		//扩展事件属性
		ey.extendProperty(this,"listener","eventLibrary");
		//设置初始化配置id
		this.id = arg;
	};
	
	//继承事件基类
	ey.extendFun(View,"listener","eventLibrary");
	//扩展自有方法
	ey.expandPrototype (View,{
		//dom初始化
		domInit: function(){
			//设置dom元素Id
    		this._domTemplate.attr({
    			"id":this.id
    		});
   		},
   		//应用状态初始化
   		applicationInit: function(){
   			ey.callFunction(this,"view","widget","domInit");
   		},
   		delvelopmentInit : function(){
   			ey.callFunction(this,"view","widget","domInit");
   		},
   		previewApp : function(){
   			
   		},
   		repaint : function(){
   			
   		},
   		//设置主题样式
   		setTheme: function(theme){
   			this.removeBg(theme);
   		},
   		//设置主题初始化
    	setInitTheme : function(theme){
    		this.removeBg(theme);
    	},
   		//移除图形背景
    	removeBg: function(theme){
    		switch (theme){
    			case "blue":
    			this._domTemplate.removeClass("eyCharts-bg-white");
    			this._domTemplate.addClass("eyCharts-bg-blue");
    			this.color = "#fff";
    				break;
    			case "white":
    			this._domTemplate.removeClass("eyCharts-bg-blue");
    			this._domTemplate.addClass("eyCharts-bg-white");
    			this.color = "rgb(102, 102, 102)";
    				break;
    			default:
    				break;
    		}
    	},
   		setSelectedClass :function(){
   			$(".ey-selected").removeClass("ey-selected");
   			this._domTemplate.addClass("ey-selected");
   		},
   		//获取jq对象
   		getJqDom:function(){
   			return this._domTemplate;
   		},
   		//设置高度
    	setDomHeight:function(height){
    		this._setDomChange("_height",height);    		
    	},
    	//获取高度
		getDomHeight:function(unit){
			return this._getDomChange("_height",unit);
		},
		//设置组件宽度
		setDomWidth :function(width){
			this._setDomChange("_width",width);
		},
		//获取组件宽度
		getDomWidth:function(unit){
			return this._getDomChange("_width",unit);					
		},
		//获取组件的左边距
		getDomLeft:function(unit){
			return this._getDomChange("_left",unit);					
		},
		//设置左边距
		setDomLeft:function(left){
			this._setDomChange("_left",left);	
		},
		//设置顶部距离
		setDomTop:function(top){
			this._setDomChange("_top",top);		
		},
		//获取组件的高度值
		getDomTop :function(unit){
			return this._getDomChange("_top",unit);
		},
		//设置鼠标样式
		setMouseStyle :function(mouseStyle){
			
			this._domTemplate.css("cursor",mouseStyle);
		},
		//px值转rem
		_pxToRem :function(val){
			
			var base = parseFloat(document.documentElement.style.fontSize);
			
			return parseFloat(val)/base + "rem";
		},
		//rem值转px
		_remToPx:function(val){
			
			var base = parseFloat(document.documentElement.style.fontSize);
			
			return parseFloat(val)*base;
		},
		//限制宽高
		_limit:function(val){
			if(val <= 20 ){
				return 20;
			}
		},
		//设置dom变化
		_setDomChange:function(type,val){
			if(!this[type]){
				this[type] = val;
			}
			else{
				var attrVal = this[type];
			}			
			//如果值相同不执行
			if(val == attrVal){
				return;
			};
			var value ;			
			var valStr = val +"";
			if(valStr.substr(-3)=="rem"){
				this[type] = val;
				value = val;
			}else{				
				value = this._pxToRem(val);
				this[type] = value;
			};
			var attrName = type.substring(1);
		
			this._domTemplate.css(attrName,value);	
		},
		//获取变化的属性值
		_getDomChange:function(type,unit){
			//默认为px像素值
			if(unit == "px"){
				return parseFloat(this._remToPx(this[type]));
			}
			else{				
				return  this[type]; 
			}			
		}//,
		//重绘多数情况应用在图形
		/*repaint : function(){
			
		}*/
	});
	//基类抛出构造函数
	ey.widget.view = View;
	
})($,ey);