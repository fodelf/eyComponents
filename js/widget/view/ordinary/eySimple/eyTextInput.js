/*!
* Instruction :文本输入框组件
* 
* Author : 吴文周
* 
* Date: 2017-03-22
*/
(function($,ey){
	"use strict";
	//测试状态样式写死
    var EyTextInput = function(args){
    	ey.extendProperty(this,"view","widget",[args]);
    	//dom模板
    	this._domTemplate = $("<div class='ey-textInput ey-widget'><textarea class='ey-textInputContent'>我是文本</textarea></div>");
		//自执行dom初始化设置
		//this.domInit();
		this.widgetName = "eyTextInput";
    };
    //继承组件基类
    ey.extendFun(EyTextInput,"view","widget");
    //扩展当前组件
    ey.expandPrototype(EyTextInput,{
    	//设置文本
		setText : function(textConetent){
			this.textConetent = textConetent;
			this._domTemplate.find('textarea').text(textConetent);
		},
		getText : function(){
			return this.textConetent;
		},
		
		setFontSize : function(fontSize){
			this.fontSize = fontSize;
			this._domTemplate.find('textarea').css("font-size",fontSize + 'px');
		},
		getFontSize : function(){
			return this.fontSize;
		},
		setFontColor : function(fontColor){
			this.fontColor = fontColor;
			this._domTemplate.find('textarea').css("color",fontColor[0].full);
		},
		getFontColor : function(){
			return this.fontColor;
		},
		setFontWeight : function(fontWeight){
			this.fontWeight = fontWeight;
			this._domTemplate.find('textarea').css("font-weight",fontWeight);
		},
		getFontWeight : function(){
			return this.fontWeight;
		},
		setLineHeight : function(lineHeight){
			this.lineHeight = lineHeight;
			this._domTemplate.find('textarea').css("line-height",lineHeight + 'px');
			
		},
		getLineHeight : function(){
			return this.lineHeight;
		},
		setTextIndent : function(textIndent){
			this.textIndent = textIndent;
			this._domTemplate.find('textarea').css("text-indent",textIndent + 'em');
		},
		getTextIndent : function(){
			return this.textIndent;
		}
    });
    ey.widget.eyTextInput = function(arg){
    	
    	return new EyTextInput(arg);
    };
       
})($,ey);