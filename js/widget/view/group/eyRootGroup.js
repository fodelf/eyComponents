/*!
* Instruction : 根容器组件
* 
* Author : 吴文周
* 
* Date: 2017-03-22
*/
(function($,ey){
	"use strict";
	
    var EyRootGroup = function(){
    	
		// 扩展容器属性
    	ey.extendProperty(this,"eyGroup","widget");
    	
    	this._domTemplate = $("<div id = 'eyRootGroup'>" 
    									+"<div id = 'ey-rootTitle'>未命名仪表盘</div>"
    									+"<div class='ey-rootFunction'>" 
    									+"<div id= 'ey-toPng' title='导出'></div>" 
    									+"<div id = 'ey-comCond'>"
    									+"<div id= 'ey-comCondition' title='公共条件'></div>"
    									+"<div id= 'ey-comCondContent'>"
    									+"<div class='ey-condition'>公共条件</div>"
    									+"<div id='ey-comqueyContent'></div>"
    									+"<div><span class='ey-query ey-btn'>确定</span><span class='ey-condCancle'>取消</span></div>"
    									+"</div></div></div></div>");
    	
        //是否为根容器
        this.isEyRootGroup = true;
        
        this.widgetName = "eyRootGroup";
        
        this.id = "eyRootGroup";
        //默认设置主题
        this._theme ="blue";
        //默认不显示导出
        this._check ="false";
       //默认不显示条件
        this._condition = "hide";
        //默认仪表盘名称 
        this._title = "未命名仪表盘";
        //公共条件数组
        this._fitter = [];
           	
    };
    //继承组件基类方法
    ey.extendFun(EyRootGroup,"eyGroup","widget");
    //扩展当前组件方法
    ey.expandPrototype(EyRootGroup,{	
    	domInit :function(){
    		//基础高度
    		this._baseHeight = parseFloat(this.getDomHeight());
    		this._domTemplate.find("#ey-toPng").hide();
    		this._domTemplate.find("#ey-comCondition").hide();
    	},
    	//应用状态初始化
   		applicationInit: function(){
   			ey.callFunction(this,"view","widget","domInit");
   			this.checkOut();
   			this.comCondtion();
   		},
   		//设置仪表盘名称
   		setRootTitle : function(title){
   			this._title = title;
   			this._domTemplate.find("#ey-rootTitle").text(title);
   		},
   		getRootTitle : function(){
   			return this._title;
   		},
  		//共同条件查询
   		comCondtion: function(){
   			var currentObj = this;
   			this._domTemplate.find("#ey-comCondition").bind("click",function(){
   				currentObj._domTemplate.find("#ey-comCondContent").toggle();
   				if(currentObj.firstChild){
   					return ;
   				};
   				//查询每个图形条件
   				var children = currentObj._listenerChildren;
   				var comCondition = [];
   				var firstCondition = [];
   				currentObj.dataChildren =  [];
   				for(var i = 0,len = children.length;i < len ;i++){
   					var childWidget = children[i];
   					//遍历有数据属性的组件
   					if(childWidget.dataProp){
   						currentObj.dataChildren.push(childWidget);
   						var condition = childWidget.getFitter();
   						//第一次循环
   						if(firstCondition.length == 0){
   							firstCondition = condition;
   							currentObj.firstChild  = childWidget;
   						}
   						else{
   							comCondition  = currentObj._getCondition(firstCondition,condition);
   							firstCondition = comCondition;
   						}
   						
   					}
   				}
   				console.log(comCondition);
   				
   				//根据数据第一个子元素去查询数据详细信息使用第一个元素的数据处理器
   				
   				var dataProces = currentObj.firstChild.dataProces;
   				
   				for(var i = 0, len = comCondition.length ; i < len ; i++){
   					var childFitter = comCondition[i];
   	   				var span = $("<div class= 'ey-childCondition'><div>");
   	   				var spanText = $("<span class= 'ey-childText'></span>");
   	   				var spanSetting = $("<span class= 'ey-childConSet'></span>");
		   	   			span.append(spanText);
		   				span.append(spanSetting);
		   				spanText.text(childFitter.colAlias);
		   				spanSetting.attr("id",childFitter.colId);
		   				spanSetting.attr("textValue",childFitter.colAlias);
   	   				if(childFitter.colTypeCode =="dim"){
   	   				spanSetting.bind("click", function(){
   	   						var id = $(this).attr("id");
   	   						var textValue =  $(this).attr("textValue");
   	   						var param = {
   	   							"colId":id,
   	   							"colDataTypeCode":"VARCHAR",
   	   						};
	   	   					var currentValue = {};
	   						var valueArry = currentObj._fitter;
	   						for(var i = 0 , len = valueArry.length;  i < len; i++){
	   							 var childValue = valueArry[i];
	   							 if( childValue.colId == id ){
	   								 currentValue  = childValue;
	   							 }
	   						};
   	   						var eySearch = ey.widget.eySearch({
   	   											"param":param,
   	   											"dataProces" :dataProces,
   	   											 "value":currentValue,
   	   											"commit":function(){
   	   												var  fitterObj = {};
   	   												fitterObj["colId"] = id;
   	   												fitterObj["colAlias"]  = textValue;
   	   												fitterObj["colValue"] = eySearch.getValue();
   	   												fitterObj["isReversed"] = eySearch.getIsReversed();
   	   												fitterObj["colTypeCode"] = "dim";
   	   												fitterObj["value"] = true;
   	   												fitterObj["operateType"] = eySearch.getOperateType();
   	   												currentObj._updateValue(id);
   	   												currentObj._fitter.push(fitterObj);
   	   												eySearch.close();						
   	   											},
   	   											"cancel":function(){
   	   												eySearch.close();	
   	   											}});
   	   						eySearch.awake();
   	   					});
   	   				}
   	   				else  if (childFitter.colTypeCode =="mesure"){
   	   						spanSetting.bind("click", function(){
	   						var id = $(this).attr("id");
	   						var textValue =  $(this).attr("textValue");
   	   						var param = {
   	   								"colId":id,
   	   								"colDataTypeCode":"NUMBER",
   	   							};
	   	   						var currentValue = {};
	   	   						var valueArry = currentObj._fitter;
	   	   						for(var i = 0 , len = valueArry.length;  i < len; i++){
	   	   							 var childValue = valueArry[i];
	   	   							 if( childValue.colId == id ){
	   	   								 currentValue  = childValue;
	   	   							 }
	   	   						};
   	   							var eyCount = ey.widget.eyCount({
   	   												"param":param,
   	   												"dataProces" :dataProces,
   	   												"value":currentValue,
   	   												"commit":function(){
   	   													var  fitterObj = {};
   	   													fitterObj["colId"] = id;
   	   													fitterObj["colAlias"]  = textValue;
   	   													fitterObj["colValue"] = eyCount.getValue();
   	   													fitterObj["colTypeCode"] = "mesure";
   	   													fitterObj["value"] = true;
   	   													fitterObj["operateType"] = eyCount.getOperateType();
   	   													currentObj._updateValue(id);
   	   													currentObj._fitter.push(fitterObj);
   	   													eyCount.close();						
   	   												},
   	   												"cancel":function(){
   	   													eyCount.close();	
   	   												}});
   	   								eyCount.awake();
   	   					});
   	   				}
   	   				else{
   	   				spanSetting.bind("click", function(){	
	   	   				var eyDate = ey.widget.eyDate();
						eyDate.domInit();
						var dateDom = eyDate.getJqDom();
						var eyTooltip = ey.widget.eyTooltip({
							"title":"请选择时间",
							"content":dateDom,
							"className":'ey-tooltipDate',
							"commit":function(){
								var  fitterObj = {};
								fitterObj["colId"] = id;
								fitterObj["colAlias"]  = textValue;
								fitterObj["colValue"] = eyDate.getValue();
								fitterObj["colTypeCode"] = "date";
								fitterObj["operateType"] = "BETWEEN";
								fitterObj["value"] = true;
								currentObj._updateValue(id);
								currentObj._fitter.push(fitterObj);
								eyTooltip.close();
							},
							"cancel":function(){
								eyTooltip.close();	
							}});			
						eyTooltip.awake();
   	   					
   	   					});
   	   				}
   	   				currentObj._domTemplate.find("#ey-comqueyContent").append(span);
   	   				
   	   				   				
   				};
   			});
   			currentObj._domTemplate.find(".ey-query").eq(0).bind("click",function(){
  					
   					var children = currentObj._listenerChildren;
  					//循环遍历数据属性的子元素进行公共条件查询驱动
  					for (var i = 0 ,len =  children.length ; i <len ; i++){
  							if(children[i].dataProp){
  								children[i].requestComCondtion(currentObj._fitter);
  							};
  					};
  				});
   			//点击取消关闭
   			currentObj._domTemplate.find(".ey-condCancle").eq(0).bind("click",function(){
					
   				currentObj._domTemplate.find("#ey-comCondContent").hide();
   			});
   		},
   		//更新公共条件
   		_updateValue : function(id){
   			var valueArry = this._fitter;
			for(var i = 0 ,len = valueArry.length ; i < len; i++){
				var childValue = valueArry[i];
				if(childValue.colId == id){
					this._fitter.splice(i,1);
					break;
				}
			}
   		},
   		//获取公共条件方法
   		_getCondition:function(firstCondition,condition){
   			var  returnCondition = [];
   			//循环处理
   			for(var i = 0,len = firstCondition.length; i < len; i++){
   				var childCondition = firstCondition[i];
   				for(var k = 0,lenK = condition.length; k < lenK; k++){
   					//业务逻辑体现是否合适
   					var childCon = condition[k];
   					//设置第一个为列详细查询
   					if(childCon.colAlias == childCondition.colAlias){
   						returnCondition.push(childCondition);
   					}
   				}
   			}
   			return returnCondition;
   		},
   		//导出方法
   		checkOut : function(){
   			//var  rootHeight = document.getElementById("article").offsetHeight;
//   			var children = this._listenerChildren;
   			
   			
//   			this._domTemplate.find("#ey-toPng").bind("click",function(ev){
//   				ev.preventDefault();
//   				var max  = 0 ;
//   				if(children.length == 0){
//   					max = document.getElementById("article").offsetHeight;
//   				}
//   				else{
//   					for(var i = 0,len= children.length ; i < len ; i++){
//   	   	   				var child =  children[i];
//   	   	   				var height = parseFloat(child.getDomHeight());
//   	   	   				var top = parseFloat(child.getDomTop());
//   	   	   				var sum = height + top ;
//   	   	   				if(sum > max){
//   	   	   					max  = sum;
//   	   	   				}
//   	   	   			};
//   	   	   			max = ey.callFunction(this,"view","widget","_remToPx",max,"return") + 100;
//   				};
// 				html2canvas($("#article"),{allowTaint: true,height: max,}).then(function (canvas) {
////		              
//////					width: rootWidth,
////		               	allowTaint: false,
////		              	taintTest: true,
////		              	timeout:1000,
////		             	onrendered: function(canvas) {
////		                canvas.id = "mycanvasCheck";		                
//		                //生成base64图片数据
//		                var dataUrl = canvas.toDataURL();
//	                    var a = $("<a></a>").attr("href", dataUrl).attr("download", "img.png").appendTo("body");		
// 						a[0].click();
//					    a.remove();					            
////		              }
//		         });
//   				html2canvas($("#article"),{
//	   				height: max,
//	               	allowTaint: false,
//	               	background:"#fff",
//	             	onrendered: function(canvas) {
//	                canvas.id = "mycanvasCheck";		                
//	                //生成base64图片数据
//	                var dataUrl = canvas.toDataURL();
//	                var a = $("<a></a>").attr("href", dataUrl).attr("download", "img.png").appendTo("body");		
//						a[0].click();
//					    a.remove();					            
//	             		}	
//	   				});
//   			});
   		},
    	setHigetInit : function(){
    		this._domTemplate.parent().css("height","100%");
    	},
		//计算拖入控件的高度与y轴位置的和，当大于根容器高度时重绘根容器高度
		measureRootHeight:function(child){
			var childHeight = parseFloat(child.getDomTop())  + parseFloat(child.getDomHeight());
			var rootHeight = parseFloat(this.getDomHeight());
			if(rootHeight < childHeight){
				//留出底部的距离
				this.setDomHeight((childHeight + 0.3)+"rem")
				var disHeight = childHeight - parseFloat(this._baseHeight) + 0.3;
				var disHeightPx = this._remToPx(disHeight);
				//设置滚动到当前位置
				this._domTemplate.parent().scrollTop(disHeightPx);
			}
		},
		//获取根容器宽度
		getDomHeight :function(unit){
			return this._getDomValue("height",unit);		
		},
		//获取根容器宽度
		getDomWidth : function (unit){
			return this._getDomValue("width",unit);
		},
		_getDomValue :function(type,unit){
			var value = this._domTemplate.css(type);
			//默认返回像素值
			if(unit){
				return parseFloat(value);
			}
			else{
				return ey.callFunction(this,"view","widget","_pxToRem",value,"return");
			}
		},
		//获取滚动条的高度
		getParentST: function(){
			return this._domTemplate[0].parentNode.scrollTop;
		},	
		//窗口变化时图形实现重绘
		redrawEcharts: function(){
			var children = this._listenerChildren;
			for(var i = 0,len = children.length;i < len ;i++){
				var childWidget = children[i];
				if(childWidget.isCharts){
					var width =  childWidget.getDomWidth();
					childWidget.setDomWidth(width);
				}
			}
		},
		//设置主题切换
		setTheme: function(theme){
			this._theme = theme;
			//这样设置是否有问题？ 逻辑不对性能欠佳？
			switch (theme){
				case "blue":
				$("#ey-editConfig").removeClass("ey-bgWhite");
				$("#article").removeClass("ey-artBgWhite");
				$("#article").removeClass("ey-artBgBlack");
				$("#ey-editConfig").addClass("ey-bgBlue");
				this._childTheme("blue");
				$("#ey-editConfig").css("color","#fff");
				if($("#article").length >0){
					$("#article").addClass("ey-bg");
				}
				break;
				case "white":
				$("#ey-editConfig").removeClass("ey-bgBlue");
				$("#article").removeClass("ey-artBgBlack");
				$("#article").removeClass("ey-bg");
				$("#ey-editConfig").removeClass("ey-bgBlack");
				if($("#article").length >0){
					$("#article").addClass("ey-artBgWhite");
				}
				else{
					$("#ey-editConfig").addClass("ey-bgWhite");
				}
				$("#ey-editConfig").css("color","rgb(102, 102, 102)");
				this._childTheme("white");
				break;
				case "black":
					$("#article").removeClass("ey-bg");
					$("#ey-editConfig").removeClass("ey-bgBlue");
					$("#article").removeClass("ey-artBgWhite");
					$("#ey-editConfig").removeClass("ey-bgWhite");
					if($("#article").length >0){
						$("#article").addClass("ey-artBgBlack");
					}
					else{
						$("#ey-editConfig").addClass("ey-bgBlack");
					}
					$("#ey-editConfig").css("color","#fff");
					this._childTheme("black");
				break;
				default:
				break;
			}
		},
		getTheme:function(){
			return this._theme;
		},
		setCondition: function(condition){
			this._condition = condition;
			if(condition == "hide"){
				this._domTemplate.find("#ey-comCondition").hide();
			}
			else{
				this._domTemplate.find("#ey-comCondition").show();
			}
		},
		getCondition: function(){
			return this._condition;
		},
		//是否显示公共条件 
		setCheck :function(check){
			this._check = check;
			if(check == "false"){
				this._domTemplate.find("#ey-toPng").hide();
			}
			else{
				this._domTemplate.find("#ey-toPng").show();
			}
		},
		getCheck :function(){
			return this._check;
		},
		//设置子组件样式
		_childTheme : function(theme){
			var children =  this._listenerChildren;
			for (var i = 0 , len = children.length; i < len ; i++){
				var child = children[i];
				if(child.isTheme){
					child.setTheme(theme);
				}
			}			
		},
		//设置布局
		setLayout :function(layout){
			this._layout = layout;
		},
		//获取布局
		getLayout :function(){
			return this._layout;
		},
		//获取所有的子组件
		getChildren : function(){
			return this._listenerChildren;
		}
		
    });
    ey.widget.eyRootGroup = function(){
    	
    	return new EyRootGroup();
   	
    };
       
})($,ey);