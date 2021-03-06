/*!
* Instruction :容器装饰器,带有子组件的装饰器
* 
* Author : 吴文周
* 
* Date: 2017-03-22
*/
(function($,ey){
	"use strict";

    var EyGroupDecorator = function(widget){
    	//基类装饰器工厂属性继承
		ey.extendProperty(this,"eyDecoratorStructure","widget",[widget]);
		//装饰行为
		function  decorateAction(){
			var widgetDom = widget.getJqDom()[0];
			//拖拽悬浮阻止浏览器默认行为实现拖拽功能
			widgetDom.ondragover = function(ev){
				ev = ev || window.event;
				ev.preventDefault();					
			};
			//dom对象绑定捕获事件
			widgetDom.ondrop = function (ev){
				ev = ev || window.event;
				//阻止浏览器默认事件
				ev.preventDefault();
				//阻止冒泡
				ev.stopPropagation();
				//获取组件名
				var widgetName = ev.dataTransfer.getData("text");
				//新控件拖入
				createComp(widgetName);			
			};				
			
		};
		//创建一个新控件
		function createComp(widgetName){
			//设置初始属性是在装饰器中设置还是在编辑区设置
			var integration = widget.getRootParent("integration");
			var configure = integration.getWidgetListArea().configure;
			var configureCharts = integration.getWidgetListArea().configureCharts;
			var editArea = widget.getListenerParent();
			//拖入新控件之后从数据字典中获得配置项，并设置初始化值 ? 、？？？、？？、？、、？？ 判断是否有属性值如果有就不执行
			//百度地图的特殊判断
			if((widgetName == "eyMarkMap" || widgetName == "eyHeatMap" )&&  !BMap){
				return;
			};
			if(configure[widgetName]){
				//组件初始化
				var childWidget = ey.widget[widgetName](widgetName + editArea.widgetIdIndex);
				var attributes = configure[widgetName];
				//公共数据属性添加？  这样虽然便捷是否有其他问题？
				//如果是图形加入公共配置
				for (var i = 0 ,len = attributes.length;i < len ;i++ ){
					//二维数组属性遍历
					var attributeTypes = attributes[i];
//					//公共数据属性添加？  这样虽然便捷是否有其他问题？
//					if(attributeTypes.level){
//						//数据属性基础通用添加
//						if(attributeTypes.level == "baseData"){
//							attributeTypes.attributes = configureCharts.concat(attributeTypes.attributes);
//						};
//					};
					for (var k = 0 ,childLen = attributeTypes.attributes.length; k< childLen ; k++){
							var attribute = attributeTypes.attributes[k];
							//有对应属性方法时设置属性值没有不需要设置
							if(attribute.functionName){
								var propName = attribute.functionName.replace(/^\w/g,function(s){
				   	 				return s.toUpperCase();
								});
								var setFun = "set" + propName ;
								var defaultValue  =   attribute.defaultValue;
								if(setFun in childWidget){
									childWidget[setFun](defaultValue);
								}		
							}
										 
					};			
				};
				//主题状态值判断当前就两种状态用if,或者在装饰器阶段判断也行
				var theme = widget.getTheme();
				switch (theme){
	    			case "blue":
	    				break;
	    			case "white":
	    				if(childWidget.isTheme){
							childWidget.setInitTheme("white");
						}
	    				break;
	    			case "black":
	    				if(childWidget.isTheme){
							childWidget.setInitTheme("black");
						}
	        			break;
	    			default:
	    				break;
				};
				//将组件挂靠在最高层上面?直接挂靠编辑层？
				var widgetsCache = ey.eventLibrary.eventBase("widgetsCache");
				var information = {"widget":childWidget};		
				widgetsCache.setInformation(information);
				widget.triggerEvent(widgetsCache); 
			};
			
			
		};			
		//自执行装饰行为
		decorateAction();
    	
    };
   
    ey.widget.eyGroupDecorator = function(widget){
    	
    	return new EyGroupDecorator(widget);
   	
    };
       
})($,ey);