/*!
* Instruction : 容器基类
* 
* Author : 吴文周
* 
* Date: 2017-03-21
*/
(function($,ey){
	"use strict";
	
    var EyGroup = function(args){
    	
    	//扩展视图属性
    	ey.extendProperty(this,"view","widget",[args]);
    	
    };
    //继承组件基类方法
    ey.extendFun(EyGroup,"view","widget");
    //扩展当前组件
    ey.expandPrototype(EyGroup,{
    	//添加子元素并添加事件关系方法
		addChild : function(child){
			if(child){
				//对象本身是否有获取dom方法如果没有调用视图的方法
				var childDom = child.getJqDom ? child.getJqDom() : ey.callFunction(child,"view","widget","getJqDom","","return");
				var parentDom = this.getJqDom ? this.getJqDom() : ey.callFunction(this,"view","widget","getJqDom","","return");
				if(parentDom && childDom){
					this.addListenerChild(child);
					parentDom.append(childDom);
				}				
			}						
		},
		//删除子元素并移除事件关系方法
		removeChild : function (child){
			var childDom = child.getJqDom();
			if(child && childDom){
				this.removeListenerChild(child);
				childDom.remove();
			}
		}
		
    });
    
    ey.widget.eyGroup = EyGroup;
       
})($,ey);