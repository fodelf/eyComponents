/*!
* Instruction :标题组件
* 
* Author : 吴文周
* 
* Date: 2017-05-03
*/
(function($,ey){
	"use strict";
	
    var EyTitle = function(args){
    	ey.extendProperty(this,"view","widget",[args]);
    	//dom模板
    	this._domTemplate = $("<div class='ey-title ey-widget'></div>");
    	//组件名
    	this.widgetName = "eyTitle";
    };
    //继承组件基类
    ey.extendFun(EyTitle,"view","widget");
    //扩展当前组件
    ey.expandPrototype(EyTitle,{
		setText : function(text){
			this.text = text;
			this._domTemplate.text(text);
		},
		getText : function(){
			return this.text;
		}
    });
    ey.widget.eyTitle = function(arg){
    	
    	return new EyTitle(arg);
    };
       
})($,ey);