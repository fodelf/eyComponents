/*!
* Instruction :装饰器基类，在编辑态时给组件对象添加事件，应用状态不存在
* 
* Author : 吴文周
* 
* Date: 2017-03-20
*/
(function($,ey,window){
	"use strict";
	
    var EyDecorator = function(widget){
    	   	
    	var widgetJqDom = widget.getJqDom();
			
		var widgetDom = widget.getJqDom()[0];
		
		var yBase = 82;
		
		var xBase = 16;
		
		function decorateAction(){
			//设置点击选中
			selectWidget();
	
			///根容器没有以下功能
			if(widget.isEyRootGroup){
				return;
			};
			
			//鼠标移入组件
			overWidget();
			
			//鼠标在最组件周围移动
			moveWidget();
			
		};
		//装饰行为自执行
    	decorateAction();
    	
    	//选中方法
    	function selectWidget(){
    		//设置选中组件
			widgetJqDom.bind("click",function(e){
				var  e  = e || window.event;
 				e.stopPropagation();
 				var id = e.currentTarget.id;
				//设置选中框
				if(widgetJqDom.hasClass("ey-mousehover")){
					widgetJqDom.removeClass("ey-mousehover");
				}				
				widget.setSelectedClass();				
				//选中控件时抛出事件
				var eventObj = ey.eventLibrary.eventBase("selectWidget");
				var information = {"widgetId":id};
				eventObj.setInformation(information);
				widget.triggerEvent(eventObj);
			});
    	};
    	   	
    	//鼠标移入组件
    	function overWidget(){
    		var delectIcon = $("<img class = 'ey-delectIcon' src = '../images/icon_del.png'/>");
			var hoverIcon = $("<img class='ey-hoverIcon' src='../images/icon_hover.png' draggable='false'>");	
			//鼠标移入控件添加装饰元素 
			widgetDom.onmouseover = function(e){
				var e = e || window.event;
				e.stopPropagation();
				e.preventDefault();
				var target = e.currentTarget;
				var id = target.id;
				widgetJqDom.append(delectIcon);
				widgetJqDom.addClass("ey-mousehover");
				//对象解除绑定click事件
				delectIcon.unbind("click");	
				widgetJqDom.append(hoverIcon);
				delectIcon.bind("click",function(e){
					//元素有父容器进行以下操作
					var e = e || window.event;
					e.stopPropagation();
					var eyTooltip = ey.widget.eyTooltip({
							"title":"请选择操作",
							"content":$("<div class='ey-tipSmallContent'>是否确定删除此组件</div>"),
							"className":'ey-tooltipSmall',
							"commit":function(){
								//删除子元素事件抛出
								var removeWidget = ey.eventLibrary.eventBase("removeWidget");
								var information = {"widget":id};	
								removeWidget.setInformation(information);
								widget.triggerEvent(removeWidget);
								eyTooltip.close();									
							},
							"cancel":function(){
								eyTooltip.close();	
							}});							
					eyTooltip.awake();					
				});
    		};
    		//鼠标移出控件删除 装饰元素
			widgetDom.onmouseleave = function(ev){
				var ev = ev || window.event;
				ev.stopPropagation();
				ev.preventDefault();	
				delectIcon.remove();
				hoverIcon.remove();
				delectIcon.unbind("click");
				widgetJqDom.removeClass("ey-mousehover");
			};   		
   		};
 
    	//鼠标在组件周围移动
    	function moveWidget(){
    		widgetDom.onmousemove = function(e){
				var e = e || window.event;
				var id =  e.currentTarget.id;
	         	var editArea = widget.getRootParent("editArea");
	         	var eyRootGroup = editArea.getListenerChirldren()[0];
	         	var limit = parseFloat(ey.callFunction(this,"view","widget","_remToPx",0.4,"return"));
	         	var eyRootGroupWidth = eyRootGroup.getDomWidth("px");
	         	var childWidget = editArea.getWidgetById(id);
				var childAbsoluteX = childWidget.getDomLeft("px") + xBase;
				var childAbsoluteY = childWidget.getDomTop("px") + yBase;			
				var childWidth = childWidget.getDomWidth("px");			
				var childHeight	= childWidget.getDomHeight("px");
				var childAbsoluteRight = childAbsoluteX +  childWidth;
				var childAbsoluteBottom  = childAbsoluteY +  childHeight;
				var childTop = childWidget.getDomTop("px");
				var childLeft = childWidget.getDomLeft("px");
				var scollT = eyRootGroup.getParentST();
				//鼠标感应区域设置
				var mousePesponse = 10;
				if(childWidth > 200 && childHeight > 200){
					mousePesponse = 20;
				};
				var lArea = ( e.pageX  - childAbsoluteX ) < mousePesponse;
		        var rArea = ( childAbsoluteRight -  e.pageX ) < mousePesponse;
		        var tArea = ( e.pageY  - childAbsoluteY  + scollT)  < mousePesponse;
		        var bArea = ( childAbsoluteBottom  - e.pageY - scollT ) < mousePesponse;	
				setMouseStyle(lArea,rArea,tArea,bArea,childWidget);
				//鼠标按下拖拽设置
				widgetJqDom.bind("mousedown",function(e){
					//鼠标按下时取出虚线
					widgetJqDom.addClass("ey-zindex");
			    	var e = e || window.event;
				    e.stopPropagation();				   			    
				    //记录鼠标按下时的宽高及鼠标pageY值
				    var top = childTop;
				    var left = childLeft;
				    var width = childWidth;
				    var height = childHeight;
				    var eX = e.pageX;
				    var eY = e.pageY;
				  	var changeType = ""; 
				    eyRootGroup.getJqDom()[0].onmousemove = function(e){
				    	//这么设置是否合理
				    	widgetJqDom.removeClass("ey-mousehover");
				    	$(".ey-selected").removeClass("ey-selected");
				    	widgetJqDom.removeClass("ey-selected");
				    	var  e = e || window.event;	
				    	e.stopPropagation();
				    	var changeType =  "";
				        //处于左侧范围
				        if(lArea){
				            left = childLeft - (eX - e.pageX);
				            width = childWidth + eX - e.pageX;
				            changeType = "left";
				        };
				        //处于右侧范围
				        if(rArea){
				            width = childWidth + e.pageX - eX;
				            changeType = "right";
				        };
				        //处于上侧范围
				        if(tArea){
				            top = childTop - (eY - e.pageY);
				            height = childHeight + eY - e.pageY;
				            changeType  = changeType + "top";
				        };
				        //处于下侧范围
				        if(bArea){
				            height = childHeight + e.pageY - eY;
				            changeType  =  changeType +"buttom";
				        };
				        //处于中间位置设置可拖拽
				        if(!lArea && !rArea && !tArea && !bArea){
				        	//设置元素可拖动								
							left = childLeft - (eX - e.pageX);
							
							top = childTop - (eY - e.pageY);
							
							changeType	= "move";	 
				        };
						//高度限制
						 top = top < limit  ? limit :top;
						 //左边距限制
						 left = left < limit/2 ? limit/2 :left;
						 
						 left = left > (eyRootGroupWidth -  limit/2 - width) ? (eyRootGroupWidth -  limit/2 - width) : left;
						 //宽度限制 是否设置？
//						 width = width > (eyRootGroupWidth -  limit/2 - left) ? (eyRootGroupWidth -  limit/2 - left) : width;
						 if(width > (eyRootGroupWidth -  limit)){
						 	return;
						 };
						//改变控件时抛出事件
						var changeWidget = ey.eventLibrary.eventBase("changeWidget");
						
						var changeWidgetInformation = {"widgetId":id,"top":top,"left":left,"height":height,"width":width,"changeType":changeType};
						
						changeWidget.setInformation(changeWidgetInformation);
						
						widget.triggerEvent(changeWidget);
												
				    };
				   	//关闭鼠标功能
				    eyRootGroup.getJqDom()[0].onmouseup = function(){	
						closeFun (eyRootGroup.getJqDom()[0],widget,widgetDom);
				   	};
				   	eyRootGroup.getJqDom()[0].onmouseleave = function(){				   	
						closeFun (eyRootGroup.getJqDom()[0],widget,widgetDom);						
				   };
				});    
    		};    	
    	};
    
    	//设置鼠标样式
    	function setMouseStyle(lArea,rArea,tArea,bArea,childWidget){
    		//左侧范围修改样式
	        if(lArea){childWidget.setMouseStyle("w-resize")};
	        //右侧范围
			if(rArea){childWidget.setMouseStyle("e-resize")};
			//上侧范围
			if(tArea){childWidget.setMouseStyle("n-resize")};   
			//下侧范围
			if(bArea){childWidget.setMouseStyle("s-resize")};    
			//左上范围
			if(lArea && tArea){childWidget.setMouseStyle("nw-resize")};
		    //右上范围
			if(rArea && tArea){childWidget.setMouseStyle("pointer")};
			//左下范围;
			if(lArea && bArea){childWidget.setMouseStyle("sw-resize")};
			//右下范围
		    if(rArea && bArea){childWidget.setMouseStyle("se-resize")};
			//中间范围    
			if(!lArea && !rArea && !tArea && !bArea){childWidget.setMouseStyle("move")};
    	};
    	//关闭鼠标功能
    	function closeFun (eyRootGroup,widget,widgetDom){
    		widgetJqDom.removeClass("ey-zindex");
			//关闭改变元素尺寸功能
			 eyRootGroup.onmousemove =  eyRootGroup.onmouseup =  eyRootGroup.onmouseleave= null;
			//释放全局捕获
			if(widgetDom.releaseCapture){
				widgetDom.releaseCapture();
			};
			//选中控件时抛出事件
			var hideGuides = ey.eventLibrary.eventBase("hideGuides");	
			widget.triggerEvent(hideGuides);			
    	};
    	
    };	
   
    ey.widget.eyDecorator = function(widget){
    	
    	return new EyDecorator(widget);
   	
    };
    
    ey.widget.eyDecoratorStructure = EyDecorator;
       
})($,ey,window);