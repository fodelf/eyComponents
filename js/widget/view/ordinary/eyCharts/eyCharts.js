/*!
* Instruction : 图形基类
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyCharts = function(args){
    	ey.extendProperty(this,"eyBridge","widget",[args]);
    	this.isCharts = true; 
    	//下钻层级
    	this._level = 0;
    };
    //继承组件基类
    ey.extendFun(EyCharts,"eyBridge","widget");
    //扩展当前组件
    ey.expandPrototype(EyCharts,{
    	//dom初始化
    	domInit: function(){
    		//执行基类方法
    		ey.callFunction(this,"view","widget","domInit");
			//获取画布
			var canvas = this._domTemplate.find(".ey-chartsContent")[0];
			this.initChart= echarts.init(canvas);
			this.initChart.setOption(this.option);
    	},
    	//改变图形初始化
    	domChangeInit: function(){
    		//执行基类方法
    		ey.callFunction(this,"view","widget","domInit");
			//获取画布
			var canvas = this._domTemplate.find(".ey-chartsContent")[0];
			this.initChart= echarts.init(canvas);
    	},
    	//应用状态初始化
    	applicationInit: function(){
    		this._domTemplate.find(".ey-chartsLayer").remove();
    		ey.callFunction(this,"view","widget","domInit");
			//获取画布
			var canvas = this._domTemplate.find(".ey-chartsContent")[0];
			this.initChart = echarts.init(canvas);
			this.setInfraduction(this._infraduction);
			this.applicationState = true;
			//鼠标移入时显示过滤条件
			ey.callFunction(this,"eyBridge","widget","applicationInit");
   		},
   		//下钻设置
   		setInfraduction :function(infraduction){
			this._infraduction = infraduction ;
			var currentObj = this;
			if(infraduction && this.initChart){
				//点击图形下钻操作
				this.initChart.on("click", function (param) { 
					if(currentObj._domTemplate.find(".ey-dimText").length ==0){
						//是否先选择维度
						var dimText = currentObj._dim[0]["colAlias"]?currentObj._dim[0]["colAlias"] :"";
						var dimDom = $("<span class = 'ey-dimText ey-infChecked' title='点击返回'></span>");
						dimDom.text(dimText);
						currentObj._domTemplate.find("h5 ").append(dimDom);
						dimDom.bind("click",function(){
							//添加蒙层
							var layer = $("<div class ='ey-chartsLayer'></div>");
							currentObj._domTemplate.append(layer);
							//正常条件请求
							currentObj._level	 = 0;
							currentObj._request();
							currentObj._domTemplate.find(".ey-infChecked").removeClass("ey-infChecked");
							$(this).addClass("ey-infChecked");
							currentObj._domTemplate.find(".ey-infChild").remove();
							currentObj._domTemplate.find(".ey-dimText").remove();
						});
					};
					//启用蒙层防止重复点击
					var layer = $("<div class ='ey-chartsLayer'></div>");
					currentObj._domTemplate.append(layer);
					currentObj._value = param.name;//横坐标的值 
					currentObj._level  = currentObj._level + 1;
					if(currentObj._level > currentObj._infraduction.length){
						currentObj._domTemplate.find(".ey-chartsLayer").remove();
						return;
					};
					currentObj._requestOther();
					var span = $("<span class = 'ey-infChild'>" 
										+"<span> > </span>"
										+"<span class = 'ey-infText' title='点击返回'></span>"
										+"</span>");
						span.find(".ey-infText").text(param.name);
						span.find(".ey-infText").attr("level", currentObj._level);
						currentObj._domTemplate.find(".ey-infChecked").removeClass("ey-infChecked");
						span.find(".ey-infText").addClass("ey-infChecked");
						span.find(".ey-infText").bind("click",function(){
						currentObj._domTemplate.find(".ey-infChecked").removeClass("ey-infChecked");
						$(this).addClass("ey-infChecked");
						var layer = $("<div class ='ey-chartsLayer'></div>");
						currentObj._domTemplate.append(layer);
						currentObj._level	 = $(this).attr("level")*1;
						currentObj._value = $(this).text();
						currentObj._requestOther();
						$(this).parent().nextAll().remove();
					});
						//添加
					currentObj._domTemplate.find("h5").append(span);
				});
			}
   		},
		getInfraduction :function(){
			return this._infraduction;
		},
		//下钻请求方式
		_requestOther : function(){
			var currentObj = this;
			var config = {};
			config["dim"] = this._dim;
			config["mes"] = this._measure;
			config["fitter"] = this._fitter;
			config["sort"] = this._sort;
			config["level"] = this._level;
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
   		//应用状态初始化
    	delvelopmentInit: function(){
    		ey.callFunction(this,"view","widget","domInit");
			//获取画布
			var canvas = this._domTemplate.find(".ey-chartsContent")[0];
			this.initChart = echarts.init(canvas);
   		},
		//设置echarts
		setOption : function(option){
			var options = JSON.stringify(option);			
			this.option = JSON.parse(options);
		},
		//每个图形必须重写此方法
   		getOption : function(){
			//清除无用数据只保留样式 非常重要-------------
			//数据根据实际选择的数据源类型进行数据驱动
			var returnOption = JSON.stringify(this.option);
			returnOption = JSON.parse(returnOption);
			return returnOption;
		},
	   	//设置图例是否显示
    	setIsLegendShow : function(show){
    		this.isLegendShow = show;
    		switch(show){
    			case true:
    				this.option.legend.show = true
    				break;
    			case false:
    				this.option.legend.show = false
    				break;
    		}
    	},
    	getIsLegendShow : function(){
    		return this.isLegendShow;
    	},//设置图例位置
    	setLegendLocation : function(legendLocation){
    		this.legendLocation = legendLocation;
    		switch(legendLocation){
    			case 'up':
    				delete this.option.legend.bottom;
    				$.extend(true, this.option.legend, {'top':10,'left':'center','orient':'horizontal'});
    				$.extend(true, this.option.grid, {'right':'30','top':40,'bottom':20});
    				this.top = 40;
    				this.right = 30;
    				this.bottom = 20;
    				break;
    			case 'right':
    				$.extend(true, this.option.legend, {'left':"right",'top':'center','orient':'vertical'});
    				$.extend(true, this.option.grid, {'right':"100",'top':'20','bottom':20});
    				this.top = 20;
    				this.right = 100;
    				this.bottom = 20;
    				break;
    			case 'down':
    				$.extend(true, this.option.legend, {'bottom':10,'left':'center','top':'','orient':'horizontal'});
    				$.extend(true, this.option.grid, {'right':'30','top':'20','bottom':40});
    				this.top = 20;
    				this.right = 30;
    				this.bottom = 40;
    				break;
    		}
    		
    	},
    	getLegendLocation : function(){
    		return this.legendLocation;
    	},
    	setSymbolSize:function(symbolSize){
    		this.symbolSize = symbolSize;
    		$.each(this.option.series,function(i,value){
    			value.symbolSize = symbolSize;
    		})
    	},
    	getSymbolSize:function(){
    		return this.symbolSize;
    	},
	   	setLineWidth:function(lineWidth){
    		this.lineWidth = lineWidth;
    		$.each(this.option.series,function(i,value){
				value.lineStyle.normal.width = lineWidth;
			})
//  		this.option.series[0].lineStyle.normal.width = lineWidth;
    		
    	},
    	getLineWidth:function(){
    		return this.lineWidth;
    	},
    	
//  	设置数据点标签是否显示
    	setIsLabelShow:function(isLabelShow){
    		this.isLabelShow = isLabelShow;
    		$.each(this.option.series,function(i,value){
				value.label.normal.show = isLabelShow;
			})
    	},
    	getIsLabelShow:function(){
    		return this.isLabelShow;
    	},
    	
//  	设置数据点标签位置
    	setLabelPosition:function(labelPosition){
    		this.labelPosition = labelPosition;
    		$.each(this.option.series,function(i,value){
				value.label.normal.position = labelPosition;
			})
    	},
    	getLabelPosition:function(){
    		return this.labelPosition;
    	},
    	
    	//设置数据点文字大小
    	setLabelFontSize:function(labelFontSize){
    		this.labelFontSize = labelFontSize;
    		$.each(this.option.series,function(i,value){
				value.label.normal.textStyle.fontSize = labelFontSize;
			})
    	},
    	getLabelFontSize:function(){
    		return this.labelFontSize;
    	},
//  	设置数据点文字颜色
    	setLabelFontColor:function(labelFontColor){
    		this.labelFontColor = labelFontColor;
    		$.each(this.option.series,function(i,value){
				value.label.normal.textStyle.color = labelFontColor[0].full;
			})
    	},
    	getLabelFontColor:function(){
    		return this.labelFontColor;
    	},
    	
//  	设置坐标轴是否显示
    	setIsAxisLineShow:function(isAxisLineShow){
    		this.isAxisLineShow = isAxisLineShow;
    		this.option.xAxis[0].axisLine.show = isAxisLineShow;
    		this.option.yAxis[0].axisLine.show = isAxisLineShow;
    	},
    	getIsAxisLineShow:function(){
    		return this.isAxisLineShow;
    	},
    	
//  	设置坐标轴分割线是否显示
    	setIsSplitLineShow:function(isSplitLineShow){
    		this.isSplitLineShow = isSplitLineShow;
    		this.option.xAxis[0].splitLine.show = isSplitLineShow;
    		this.option.yAxis[0].splitLine.show = isSplitLineShow;
    	},
    	getIsSplitLineShow:function(){
    		return this.isSplitLineShow;
    	},
    	
//  	设置坐标轴类型
    	setAxisLineType:function(axisLineType){
    		this.axisLineType = axisLineType;
    		this.option.xAxis[0].axisLine.lineStyle.type = axisLineType;
    		this.option.yAxis[0].axisLine.lineStyle.type = axisLineType;
    	},
    	getAxisLineType:function(){
    		return this.axisLineType;
    	},
    	
    	setAxisLineColor:function(axisLineColor){
    		this.axisLineColor = axisLineColor;
    		this.option.xAxis[0].axisLine.lineStyle.color = axisLineColor[0].full;
    		this.option.yAxis[0].axisLine.lineStyle.color = axisLineColor[0].full;
    	},
    	getAxisLineColor:function(){
    		return this.axisLineColor;
    	},
    	
    	setAxisLabelColor:function(axisLabelColor){
    		this.axisLabelColor = axisLabelColor;
    		this.option.xAxis[0].axisLabel.textStyle.color = axisLabelColor[0].full;
    		this.option.yAxis[0].axisLabel.textStyle.color = axisLabelColor[0].full;
    	},
    	getAxisLabelColor:function(){
    		return this.axisLabelColor;
    	},
    	setIsAxisLabelShow:function(isAxisLabelShow){
    		this.isAxisLabelShow = isAxisLabelShow;
    		this.option.xAxis[0].axisLabel.show = isAxisLabelShow;
    		this.option.yAxis[0].axisLabel.show = isAxisLabelShow;
    	},
    	getIsAxisLabelShow:function(){
    		return this.isAxisLabelShow;
    	},
    	
//  	设置坐标轴分割线类型
    	setSplitLineType:function(splitLineType){
    		this.splitLineType = splitLineType;
    		
    		switch(splitLineType){
    			case "square":
    				this.option.yAxis[0].splitLine.lineStyle.type = "solid";
    				break;
    			case "dotted":
    				this.option.xAxis[0].splitLine.lineStyle.type = splitLineType;
    				this.option.yAxis[0].splitLine.lineStyle.type = splitLineType;
    				break;
    			case "solid":
    				this.option.xAxis[0].splitLine.lineStyle.type = splitLineType;
    				this.option.yAxis[0].splitLine.lineStyle.type = splitLineType;
    				break;
    		}
    	},
    	getSplitLineType:function(){
    		return this.splitLineType;
    	},
    	
//  	设置坐标轴分割线宽度
    	setSplitLineWidth:function(splitLineWidth){
    		this.splitLineWidth = splitLineWidth;
    		this.option.yAxis[0].splitLine.lineStyle.width = splitLineWidth;
    		this.option.xAxis[0].splitLine.lineStyle.width = splitLineWidth;
    	},
    	getSplitLineWidth:function(){
    		return this.splitLineWidth;
    	},
    	
    	setAxisLineWidth:function(axisLineWidth){
    		this.axisLineWidth = axisLineWidth;
    		this.option.yAxis[0].axisLine.lineStyle.width = axisLineWidth;
    		this.option.xAxis[0].axisLine.lineStyle.width = axisLineWidth;
    	},
    	getAxisLineWidth:function(){
    		return this.axisLineWidth;
    	},
    	
//  	设置坐标轴分割线颜色
    	setSplitLineColor:function(splitLineColor){
    		this.splitLineColor = splitLineColor;
    		this.option.yAxis[0].splitLine.lineStyle.color = splitLineColor[0].full;
    		this.option.xAxis[0].splitLine.lineStyle.color = splitLineColor[0].full;
    	},
    	getSplitLineColor:function(){
    		return this.splitLineColor;
    	},
    	
//  	设置坐标轴文字大小
    	setAxisFontSize:function(axisFontSize){
    		this.axisFontSize = axisFontSize;
    		this.option.xAxis[0].axisLabel.textStyle.fontSize = axisFontSize;
    		this.option.yAxis[0].axisLabel.textStyle.fontSize = axisFontSize;
    	},
    	getAxisFontSize:function(){
    		return this.axisFontSize;
    	},
    	
    	setLeft:function(left){
    		this.left = left;
    		this.option.grid.left = left;
    	},
    	getLeft:function(){
    		return this.left;
    	},
    	
    	setBottom:function(bottom){
    		this.bottom = bottom;
    		this.option.grid.bottom = bottom;
    	},
    	getBottom:function(){
    		return this.bottom;
    	},
    	setTop:function(top){
    		this.top = top;
    		this.option.grid.top = top;
    	},
    	getTop:function(){
    		return this.top;
    	},
    	setRight:function(right){
    		this.right = right;
    		this.option.grid.right = right;
    	},
    	getRight:function(){
    		return this.right;
    	},
    	
    	setInterval:function(interval){
    		this.interval = interval;
    		if(interval == 'horizontal'){
    			this.option.xAxis[0].axisLabel.interval = 'auto';
//				this.interval = 'auto';
				$.extend(true, this.option.xAxis[0].axisLabel, {'rotate':0});
				$.extend(true, this.option.grid, {'bottom':40});
			}else if(interval == 'gradient'){
				$.extend(true, this.option.xAxis[0], {'axisLabel':{'rotate':45,'interval':0}});
				$.extend(true, this.option.grid, {'bottom':70});
			}else{
				$.extend(true, this.option.xAxis[0].axisLabel, {'rotate':90,'interval':0});
				$.extend(true, this.option.grid, {'bottom':80});
			}
    	},
    	getInterval:function(){
    		return this.interval;
    	},
	   	//设置高度
    	setDomHeight:function(height){
    		//执行基类方法
    		ey.callFunction(this,"view","widget","setDomHeight",height);
    		if(this.initChart){
    			this.initChart.resize();
    		}    		
    	},
    	//设置组件宽度
		setDomWidth :function(width){
			//执行基类方法
    		ey.callFunction(this,"view","widget","setDomWidth",width);
    		if(this.initChart){
    			this.initChart.resize();
    		}
		},
		//更改图形此方法为无用方法
   		setChangeCharts :function(chartType){
   			this._chartType = chartType;
   		},
   		getChangeCharts :function(){
   			return this._chartType;
   		},
		//设置主题
    	setTheme : function(theme){
    		
    		this.removeBg(theme);
    		
			this._changeColor(this.option,this.color);
	
    		this.repaint();
    	},
		//设置主题初始化
    	setInitTheme : function(theme){
    		this.removeBg(theme);
    		
			this._changeColor(this.option,this.color);
    	},
    	//移除图形背景
    	removeBg: function(theme){
    		switch (theme){
    			case "blue":
    			this._domTemplate.removeClass("eyCharts-bg-white");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this._domTemplate.addClass("eyCharts-bg-blue");
    			this.color = "#fff";
    			if(this._wordColor[0].full == "rgb(102, 102, 102)"){
    				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
    				this.setWordColor(this._wordColor);
    			};
    				break;
    			case "white":
    			this._domTemplate.removeClass("eyCharts-bg-blue");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this._domTemplate.addClass("eyCharts-bg-white");
    			this.color = "rgb(102, 102, 102)";
    			//当白色背景时改变标题颜色
    			console.log(this._wordColor);
    			if(this._wordColor[0].full == "#fff"){
    				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"rgb(102, 102, 102)"}];
    				this.setWordColor(this._wordColor);
    			};
    				break;
    			case "black":
        			this._domTemplate.removeClass("eyCharts-bg-blue");
        			this._domTemplate.removeClass("eyCharts-bg-white");
        			this._domTemplate.addClass("eyCharts-bg-black");
        			this.color = "#fff";
        			if(this._wordColor[0].full == "rgb(102, 102, 102)"){
        				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
        				this.setWordColor(this._wordColor);
        			};
        			break;
    			default:
    				break;
    		}
    	},
		//切换颜色方法递归写法可能有问题？
    	_changeColor: function(option,color){
    		for(var k in option){
    			if(k == "tooltip"){
    				continue;
    			};
    			if((typeof option[k] =="string") && ( k == "textStyle"  ||  k == "color" || k == "borderColor")){
    				if(option[k] == "#fff" || option[k] == "rgb(102, 102, 102)"){
    					option[k] = color;
    				};
    				continue;
    			}
    			else if(typeof option[k] != "string"){
    				this._changeColor(option[k],color);
    			}
    			else
    			{
    				continue;
    			}
    		}
    	},
		//重绘图形？这边设计是否合理？有待商榷
		repaint : function(){
			this.initChart.clear();
			console.log(JSON.stringify(this.option));
			this.initChart.setOption(this.option);
			console.time("draw");
			//应用状态移除蒙层
			if(this.applicationState){
				this._domTemplate.find(".ey-chartsLayer").remove();
			};
		}
   
    });
    
    ey.widget.eyCharts =  EyCharts;
       
})($,ey,echarts);