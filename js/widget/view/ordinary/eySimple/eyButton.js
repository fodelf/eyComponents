/*!
* Instruction :文本框组件
* 
* Author : 吴文周
* 
* Date: 2017-03-20
*/
(function($,ey){
	"use strict";
	
    var EyButton = function(args){
		// 继承属性
    	ey.extendProperty(this,"view","widget",[args]);
    };
    //继承组件基类方法
    ey.extendFun(EyButton,"view","widget");
    //扩展当前组件
    ey.expandPrototype(EyButton,{
		domInit : function(){
			console.log("button +  test" );
		},
		setText:function(text){
			this.text = text;
		},
		getText:function(){
			return this.text;
		}   		 
    });
    ey.widget.eyButton = function(args){
    	
    	return new EyButton(args);
   	
    };
       
})($,ey);