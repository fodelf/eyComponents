/*!
* Instruction :桥接模块有数据属性的引用
* 
* Author : 吴文周
* 
* Date: 2017-05-03
*/
(function($,ey){
	
	"use strict";
	
	var EyBridge = function(args){
		//扩展事件属性
		ey.extendProperty(this,"view","widget",[args]);
		//数据处理器
		this.dataProces = ey.data.dataProces();
		//是否有主题属性
		this.isTheme = true;
		//是否有数据属性
		this.dataProp = true; 
		
	};
	
	//继承事件基类
	ey.extendFun(EyBridge,"view","widget");
	//扩展自有方法
	ey.expandPrototype (EyBridge,{
		previewApp :function(){
    		this._commonPreviewFun();
    	},
		getOption : function(){
			//清除无用数据只保留样式 非常重要-------------
			//数据根据实际选择的数据源类型进行数据驱动
			var returnOption = JSON.stringify(this.option);
			returnOption = JSON.parse(returnOption);
			return returnOption;
		},
		//设置标题显示隐藏
   		setIsTitleShow:function(show){
   			this._isTitleShow = show;
   			if(show){
   				this._domTemplate.find("h5").show();
   			}
   			else{
   				this._domTemplate.find("h5").hide();
   			}
   		},
   		//获取标题显示隐藏
   		getIsTitleShow:function(show){
   			return this._isTitleShow;
   		},
   		//标题字体大小
   		setTitleFont : function(fontSize){
   			this._titleFont = fontSize;
   			this._domTemplate.find("h5").css({
   				"font-size":fontSize
   			})
   		},
   		//标题字体大小
   		getTitleFont : function(fontSize){
   			return this._titleFont;
   		},
   		//设置标题内容
   		setTitleName :function(titleName){
   			this._titleName = titleName;
   			this._domTemplate.find("h5").text(titleName);
   		},
   		//获取标题内容
   		getTitleName :function(titleName){
   			return this._titleName;
   		},
   		//设置标题文本位置
   		setTitleLocation : function(location){
   			this._location = location;
   			this._domTemplate.find("h5").css({
   				"text-align":location
   			});
   		},
   		setWordColor: function(wordColor){
   			this._wordColor = wordColor;
   			this._domTemplate.find("h5").css({
   				"color":wordColor[0].full
   			});
   		},
   		getWordColor: function(){
   			return this._wordColor;
   		},
	   	//获取文本位置
	   	getTitleLocation :function(location){
	   		return this._location;
	   		
	   	},
		//设置数据来源
		setDataSource : function(dataSource){
			this._dataSource = dataSource;
			this.dataProces.setSourceType(dataSource);
		},
		getDataSource :function (){			
			return this._dataSource;
		},
		//获取表Id
		setTableId : function (tableId){
			this._tableId = tableId;
			this.dataProces.setTableID(tableId);
		},
		getTableId : function(){
			return this._tableId;
		},
		//获取表Id
		setPage : function (page){
			this._page = page;
			this.dataProces.setPage(page);
		},
		getPage : function(){
			return this._page;
		},
		//设置静态数据
		setStaticData : function(StaticData){
			this._staticData = StaticData;
		},
		getStaticData : function (){
			return this._staticData;
		},
		//设置数据名称
    	setDataName : function (dataName){
    		this._dataName = dataName;
    	},
    	getDataName : function(){
    		return this._dataName;
    	},
		//数据测试
		dataTest: function(){
			this._commonPreviewFun();
		},
		createSaticData:function(){
			var data  = this.data;
			//无数据状态添加？
			var dataArry = data.resultList;
			//数组长度为0不绘图
			if(dataArry.length == 0){
				return;
			};
			var metaArry =  data.metaData;
			var dataXValue = [];
			 //解析有问题时转换后台传递不了大写Y
			var yName = metaArry["y"] ? metaArry["y"] :metaArry["Y"];
			var  newSeries = {};
			//二维数组遍历处理
			for(var i =0,len = dataArry.length;i<len;i++){
				var childArry = dataArry[i];
				for(var k = 0 ,childLen = childArry.length;k <childLen;k++ ){
					if(k == 0){
						dataXValue.push(childArry[k]);
					}
					else{
						if(!newSeries[k]){
							newSeries[k] = {};
							newSeries[k]["data"] = [];
						}
						newSeries[k]["name"] = yName[k-1];
						newSeries[k]["data"].push(childArry[k]);					
					}
				}				
			};
			//重新赋值
			if(this.option.xAxis){
				if(this.option.xAxis[0].data){
				this.option.xAxis[0].data = dataXValue;
				}
				else{
					this.option.yAxis[0].data  = dataXValue;
				};
			};
			if(this.option.legend){
				this.option.legend.data = yName;
			};
			//系列数组
			var series = [];
			for( var k in newSeries){
				
				if( typeof k == "string"){
					
					var newnewSerie = {};
				
					newnewSerie.name = newSeries[k].name;
					
					newnewSerie.data = newSeries[k].data;
					
					series.push(newnewSerie);
				}
			};
			//暂时没有不设置
			this._setSeries(series);
			this.repaint();			
		},
		//公共预览方法
		_commonPreviewFun : function(){
			//判断数据来源根据数据来源进行数据测试
			var currentObj = this;
			
        	switch (this._dataSource){
				case "source_static":
					this.data = this._staticData;
						//安全性判断
					if(!this.data){
						return;
					};
					//调用数据格式话
					this.createSaticData();
				break;
				//其他状态未定义
				case "source_dataTable":
				this._request();	
				break;
				case "source_workTable":
				this._request();
				break;
				case "source_API":
					var urlAddres = this._API;
					var params = {};
					var param = this._param;
					params ["params"] = JSON.stringify({"url":urlAddres,"param":param});
					$.ajax({
						type:"post",
						data:params,
						url: "../../dataFunc/list",
						dataType:"json",
						success:function(data){
							currentObj.data = data;
							currentObj.createSaticData();
						}
					});						
				break;
			};
		
		},
		//查询结果请求
		_request : function(){
			//如果量度属性不存在不必要发送请求查询数据
			if(this._measure.length ==0){
				return ;
			};
			var currentObj = this;
			var config = {};
			//过滤条件特殊处理
			var fitter = [];
			var fitterArr = this._fitter;
			for(var i = 0 , len = fitterArr.length;  i < len ; i ++){
				 if(fitterArr[i].value){
					 fitter.push(fitterArr[i]);
				 }
			};
			//排序字段重写
			var sort = false ;
			if(this._sort &&  ("value"  in  this._sort)){
				sort = this._sort;
			};
			config["dim"] = this._dim;
			config["mes"] = this._measure;
			config["fitter"] = fitter;
			config["sort"] = sort;
			config["infraduction"] = this._infraduction;
			config["value"] = this._value;
			config["pageNum"] = this._pageNum;
			config["pageSize"] = this._pageSize;
			config["callBack"] = function(data){
					currentObj.data = data;
					if(!currentObj.data){
						return;
					};
					//调用数据格式话
					currentObj.createSaticData();
			};
			this.dataProces.queryData(config);
		},
		_requestOther : function(){
			//如果量度属性不存在不必要发送请求查询数据
			if(this._measure.length ==0){
				return ;
			};
			var currentObj = this;
			var config = {};
			//过滤条件特殊处理
			var fitter = [];
			var fitterArr = this._fitter;
			for(var i = 0 , len = fitterArr.length;  i < len ; i ++){
				 if(fitterArr[i].value){
					 fitter.push(fitterArr[i]);
				 }
			};
			//排序字段重写
			var sort = false ;
			if(this._sort &&  ("value"  in  this._sort)){
				sort = this._sort;
			};
			config["dim"] = this._dim;
			config["mes"] = this._measure;
			config["fitter"] = this._fitter;
			config["sort"] = this._sort;
			config["infraduction"] = this._infraduction;
			config["value"] = this._value;
			config["pageNum"] = this._pageNum;
			config["pageSize"] = this._pageSize;
			config["callBack"] = function(data){
					currentObj.data = data;
					if(!currentObj.data){
						return;
					};
					//调用数据格式话
					currentObj.createSaticData();
			};
			this.dataProces.queryDataOther(config);
		},
		//公共条件查询
		requestComCondtion : function(comCondtion){
			var currentObj = this;
			var config = {};
			//过滤条件特殊处理
			var fitter = [];
			var fitterArr = this._fitter;
			for(var i = 0 , len = fitterArr.length;  i < len ; i ++){
				 if(fitterArr[i].value){
					 fitter.push(fitterArr[i]);
				 }
			};
			//公共条件与单图条件合并
			var resultFitter = [];
			for(var  i = 0 , len = comCondtion.length ; i < len; i ++){
				 var childCondtion = comCondtion[i];
				 //遍历循环当前条件进行
				 var  isChange = true;
				 for(var k = 0 , lenK = fitter.length ; k <  lenK ; k ++){
					 if(childCondtion.colAlias == fitter[k].colAlias){
						 resultFitter.push(fitter[k]);
						 isChange = false;
					 };
				 };
				 if(isChange){
					 for(var  j = 0 , lenJ = this._fitter.length ;  j < lenJ ; j ++){
						 if(this._fitter[j].colAlias == childCondtion.colAlias){
							var condtion = childCondtion;
							condtion.colId = this._fitter[j].colId;
							resultFitter.push(condtion);
						 }
					 }
				 }
			};
			
			//排序字段重写
			var sort = false ;
			if(this._sort &&  ("value"  in  this._sort)){
				sort = this._sort;
			};
			config["dim"] = this._dim;
			config["mes"] = this._measure;
			config["fitter"] = resultFitter;
			config["sort"] = this._sort;			
			config["value"] = this._value;
			config["pageNum"] = this._pageNum;
			config["pageSize"] = this._pageSize;
			config["callBack"] = function(data){
					currentObj.data = data;
					if(!currentObj.data){
						return;
					};
					//调用数据格式话
					currentObj.createSaticData();
			};
			this.dataProces.queryData(config);
		},
		//设置维度
		setDim:function(dim){
			this._dim = dim;
		},
		getDim:function(){
			return this._dim;
		},
		setFitter : function(fitter){
			this._fitter = fitter;
		},
		//设置过滤条件
		getFitter : function(){
			return this._fitter;
		},
		//设置排序
		setSort : function(sort){
			this._sort = sort;
		},
		getSort : function(){
			return this._sort;
		},
		getDimResult:function(){
			return  this.dataProces.getDimResultList();
		},
		getMeaSureResult:function(){
			return  this.dataProces.getMeasureResultList();
		},
		getFitterResult : function(){
			return  this.dataProces.getFitterResultList();
		},
		//设置量度
		setMeasure:function(measure){
			this._measure = measure;
		},
		getMeasure:function(){
			return this._measure;
		},
		setAPI:function(API){
    		this._API = API;
    	},
    	getAPI :function(){
    		return this._API;
    	},  
    	//获取参数
    	getParam : function(){
    	   return	this._param;
    	}, 
    	setParam : function(param){
    		this._param = param;
    	},
    	//数据类型过滤工具设置
    	//应用状态初始化
    	applicationInit: function(){
			//鼠标移入时显示过滤条件
			this._clickSettting();
   		},
   		//设置最大化放
    	setMaxBack :function(){
    		var currentObj = this;
    		
    		this._domTemplate.find(".ey-maxClose").remove();
//    		this._domTemplate.find(".ey-chartsSetting").show();
//    		this._domTemplate.find(".ey-chartsSettingCont").show();
    		//鼠标移入移出显示隐藏
    		this._domTemplate.unbind("mouseover");
   			this._domTemplate.bind("mouseover",function(){
   				$(this).find(".ey-chartsSetting").show();
   			});
   			this._domTemplate.unbind("mouseleave");
			this._domTemplate.bind("mouseleave",function(){
				if(currentObj._domTemplate.find(".ey-chartsSettingCont").is(":hidden") && currentObj._domTemplate.find(".ey-singleCondtion").is(":hidden")){
					$(this).find(".ey-chartsSetting").hide();
				}
   			});
    	},
    	//点击设置显示隐藏操作区域
   		_clickSettting : function(){
   			
   			var currentObj = this;
   			
   			var setting = $("<div class ='ey-chartsSetting' title='设置'></div>");
   			//设置区域内容
   			var setContent  = $("<div class = 'ey-chartsSettingCont' >" 
   									+"<div class='ey-chartsFitter' >过滤</div>"
   									+"<div class='ey-chartsCheackout'>导出</div>"
   									+"<div class='ey-chartsMax'>全屏</div>"
   									+"</div>");
   			
   			var  condition = $("<div class = 'ey-singleCondtion'><div class='ey-condition' style='text-align: left;'>过滤条件</div><div class= 'ey-condtionContent'></div><div><span class='ey-query ey-btn'>确定</span><span class='ey-condCancle'>取消</span></div></div>");
   			
   			this._domTemplate.find("h5").append(setting);
   			
   			this._domTemplate.find("h5").append(setContent);
   			
   			this._domTemplate.find("h5").append(condition);
   			//鼠标移入移出显示隐藏
   			this._domTemplate.bind("mouseover",function(){
   				$(this).find(".ey-chartsSetting").show();
   			});
			this._domTemplate.bind("mouseleave",function(){
				if(currentObj._domTemplate.find(".ey-chartsSettingCont").is(":hidden") && currentObj._domTemplate.find(".ey-singleCondtion").is(":hidden")){
					$(this).find(".ey-chartsSetting").hide();
				}
   			});
   			
   			this._domTemplate.find(".ey-chartsSetting").bind("click",function(){
				currentObj._domTemplate.find(".ey-chartsSettingCont").toggle();
				currentObj._domTemplate.find(".ey-singleCondtion").hide();
			});
   			
   			//生成过滤条件内容
   			currentObj._condition();
   			//点击弹出过滤条件
   			this._domTemplate.find(".ey-chartsFitter").bind("click",function(){
   				currentObj._domTemplate.find(".ey-chartsSettingCont").hide();
   				currentObj._domTemplate.find(".ey-singleCondtion").show();
			});
   			//点击最大化
   			this._domTemplate.find(".ey-chartsMax").bind("click",function(){
   				currentObj._domTemplate.find(".ey-chartsSettingCont").hide();
   				currentObj._domTemplate.find(".ey-chartsSetting").hide();
   				var eyCanvas = ey.widget.eyCanvas({
					"echartsObj":currentObj
				});
   				
   				
			});
   			
  		},
    	//鼠标移入时显示过滤条件
   		_condition : function(){
   			
   			var currentObj = this;
   			//条件内容显示
   			
   			//循环已有条件
   			var  fitter = this._fitter;
   			
   			for(var i = 0 , len = fitter.length ; i < len ; i ++){
   				var childFitter = fitter[i];
   				var span = $("<div class= 'ey-childCondition'></div>");
   				var spanText = $("<span class= 'ey-childText' style='text-align: left;'></span>");
   				var spanSetting = $("<span class= 'ey-childConSet'></span>");
   				span.append(spanText);
   				span.append(spanSetting);
   				spanText.text(childFitter.colAlias);
   				spanSetting.attr("id",childFitter.colId);
   				spanSetting.attr("textValue",childFitter.colAlias);
   				if(childFitter.colTypeCode =="dim"){
   					spanSetting.bind("click", function(){
   						var id = $(this).attr("id");
   						var textValue = $(this).attr("textValue");
   						var dataProces = currentObj.dataProces;
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
   											"value": currentValue,
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
   					span.bind("click", function(){
   						var id = $(this).attr("id");
   						var textValue = $(this).text();
   						var dataProces = currentObj.dataProces;
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
   												"value": currentValue,
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
   					span.bind("click", function(){
   						var id = $(this).attr("id");
   						var textValue = $(this).text();
	   					var eyDate = ey.widget.eyDate();
						eyDate.domInit();
						var valueArry = currentObj._fitter;
						for(var k = 0 , klen = valueArry.length;  k < klen; k++){
							 var childValue = valueArry[k];
							 if( childValue.colId == id ){
								 eyDate.setValue(childValue.colValue);
							 }
						};
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
	   				})
   				}
   				
   				currentObj._domTemplate.find(".ey-condtionContent").eq(0).append(span);
   			};
	   			//查询触发
	   			this._domTemplate.find(".ey-query").eq(0).bind("click",function(){
	   			
	   				currentObj.previewApp();
	   			});
	   			//取消隐藏
	   			this._domTemplate.find(".ey-condCancle").eq(0).bind("click",function(){
		   			
	   				currentObj._domTemplate.find(".ey-singleCondtion").hide();
	   			})
   		},
   		//更新值状态
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
	});
	//基类抛出构造函数
	ey.widget.eyBridge = EyBridge;
	
})($,ey);