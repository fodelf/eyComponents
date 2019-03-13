/*!
* Instruction :文本框组件
* 
* Author : 吴文周
* 
* Date: 2017-03-20
*/
(function($,ey){
	"use strict";
	
    var EyLabel = function(args){
    	ey.extendProperty(this,"view","widget",[args]);
    	//dom模板
    	this._domTemplate = $("<div class='ey-label ey-widget'><div class ='ey-chartsLayer'></div><a href='javascript:;' class='ey-labelContent'>我是标题</a></div>");
    	//组件名
    	this.widgetName = "eyLabel";
    	this.isTheme = true;
    };
    //继承组件基类
    ey.extendFun(EyLabel,"view","widget");
    //扩展当前组件
    ey.expandPrototype(EyLabel,{

		setText : function(text){
			this.text = text;
			this._domTemplate.find(".ey-labelContent").text(text);
		},
		getText : function(){
			return this.text;
		},
		//设置文本框高度
		setDomHeight : function(height){
			//调用基类设置
			ey.callFunction(this,"view","widget","setDomHeight",height);
			this._domTemplate.find(".ey-labelContent").css({
				"line-height":height + 'px',
			});			
		},
		//设置字体大小
		setFontSize : function(fontSize){
			this.fontSize = fontSize;
			this._domTemplate.find(".ey-labelContent").css({
				"font-size":fontSize + 'px'
			});
		},
		getFontSize :function(){
			return this.fontSize;
		},
		//设置字体粗细
		setFontWeight : function(fontWeight){
			this.fontWeight = fontWeight;
			this._domTemplate.find(".ey-labelContent").css({
				"font-weight":fontWeight
			});
		},
		getFontWeight :function(){
			return this.fontWeight;
		},
		
		setHref : function(href){
			this.href = href;
			this._domTemplate.find(".ey-labelContent").attr({
				"href":href
			});
		},
		getHref :function(){
			return this.href;
		},
		
		setTarget : function(target){
			this.target = target;
			this._domTemplate.find(".ey-labelContent").attr({
				"target":target
			});
		},
		getTarget :function(){
			return this.target;
		},
		removeBg: function(theme){
    		switch (theme){
    			case "blue":
//    			this._domTemplate.removeClass("eyCharts-bg-white");
    			this.color = "#fff";
    			this._domTemplate.find("a").css({"color":"#fff"});
    				break;
    			case "white":
//    			this._domTemplate.addClass("eyCharts-bg-white");
    			this.color = "rgb(102, 102, 102)";
    			this._domTemplate.find("a").css({"color":"rgb(102, 102, 102)"});
    				break;
    			case "black":
    				this.color = "#fff";
        			this._domTemplate.find("a").css({"color":"#fff"});
        			break;
    			default:
    				break;
    		}
    	},
    });
    ey.widget.eyLabel = function(arg){
    	
    	return new EyLabel(arg);
    };
       
})($,ey);