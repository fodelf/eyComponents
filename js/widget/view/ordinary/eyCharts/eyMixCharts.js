/*!
* Instruction : 线图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyMixCharts = function(args){
    	//继承线图基类
    	ey.extendProperty(this,"eyCharts","widget",[args]);
    	//dom模板
    	this._domTemplate = $("<div class='ey-lineCharts ey-widget eyCharts eyCharts-bg-blue'>"
    						//蒙层
    						+"<div class ='ey-chartsLayer'></div>"
							// 标题
    						+ "<h5></h5>"
    						//图形内容区域
    						+"<div class='ey-chartsContent'></div>"    						
    						+"</div>");
    	this.widgetName = "eyMixCharts";
    	this._lineCount = 10;
    	this.barColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}]
    };
    //继承组件基类
    ey.extendFun(EyMixCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyMixCharts,{
    	//每个图形必须重写此方法
    	getOption : function(){
			//清除无用数据只保留样式 非常重要-------------
			//数据根据实际选择的数据源类型进行数据驱动
			var returnOption = JSON.stringify(this.option);
			returnOption = JSON.parse(returnOption);
			returnOption.xAxis[0].data = "data";
			returnOption.data = "";
			returnOption.series[0].data = "";
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
    	},
    	//设置图例类型
    	setLegendType : function(legendType){
    		this.legendType = legendType;
    		if(legendType == 'hollow'){
    			$.each(this.option.series,function(i,value){
					value.symbol = 'circle';
					value.itemStyle.normal.borderColor = "#fff";
					value.itemStyle.normal.color = this.lineColor;
				})
//  			this.option.series[0].symbol = 'circle';
//  			this.option.series[0].itemStyle.normal.borderColor = "#fff";
//  			this.option.series[0].itemStyle.normal.color = this.lineColor;
    			
    		}else{
    			$.each(this.option.series,function(i,value){
	    			value.symbol = legendType;
	    			value.itemStyle.normal.borderColor = this.lineColor;
	    		})
//  			this.option.series[0].symbol = legendType;
//  			this.option.series[0].itemStyle.normal.borderColor = this.lineColor;
    		}
    		
    	},
    	getLegendType : function(){
    		return this.legendType;
    	},
    	//设置图例位置
    	setLegendLocation : function(legendLocation){
    		this.legendLocation = legendLocation;
    		switch(legendLocation){
    			case 'up':
    				delete this.option.legend.bottom;
    				$.extend(true, this.option.legend, {'top':10,'left':'center','orient':'horizontal'});
    				$.extend(true, this.option.grid, {'right':'30','top':40,'bottom':20});
    				break;
    			case 'right':
    				$.extend(true, this.option.legend, {'left':"right",'top':'center','orient':'vertical'});
    				$.extend(true, this.option.grid, {'right':"100",'top':'20','bottom':20});
    				break;
    			case 'down':
    				$.extend(true, this.option.legend, {'bottom':10,'left':'center','top':'','orient':'horizontal'});
    				$.extend(true, this.option.grid, {'right':'30','top':'20','bottom':40});
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
//  		this.option.series[0].symbolSize = symbolSize;
    	},
    	getSymbolSize:function(){
    		return this.symbolSize;
    	},
    	
    	setLineType : function(lineType){
    		this.lineType = lineType;
    		switch(lineType){
    			case 'smooth':
    				this.option.series[0].smooth = true;
    				this.option.series[0].step = false;
    				break;
    			case 'straight':
    				this.option.series[0].smooth = false;
    				this.option.series[0].step = false;
    				break;
    			case 'trapezoid':
    				this.option.series[0].smooth = false;
    				this.option.series[0] = true;
    				break;
    		}
    	},
    	getLineType : function(){
    		return this.lineType;
    	},
    	setBarType : function(barType){
    		this.barType = barType;
    		var that = this;
    		switch(barType){
    			case 'full':
    				this.option.series[1].itemStyle.normal.color = that.barColor[0].full;
    				this.option.series[1].itemStyle.normal.borderColor = that.barColor[0].empty;
    				break;
    			case 'empty':
					this.option.series[1].itemStyle.normal.color = that.barColor[0].empty;
					this.option.series[1].itemStyle.normal.borderColor = that.barColor[0].full;
    				break;
    		}
    	},
    	getBarType : function(){
    		return this.barType;
    	},
    	
    	setLineColor : function(lineColor){
    		this.lineColor = lineColor;
			this.option.series[0].lineStyle.normal.color = lineColor[0].full;
			this.option.series[0].itemStyle.normal.color = lineColor[0].full;
    	},
    	getLineColor : function(){
    		return this.lineColor;
    	},
    	
    	setBarColor : function(barColor){
    		this.barColor = barColor;
    		switch(this.barType){
    			case 'full':
					this.option.series[1].itemStyle.normal.color = barColor[0].full;
					this.option.series[1].itemStyle.normal.borderColor = barColor[0].full;
    				break;
    			case 'empty':
    				this.option.series[1].itemStyle.normal.color = barColor[0].empty;
    				this.option.series[1].itemStyle.normal.borderColor = barColor[0].full;
    				break;
    			default:
    				this.option.series[1].itemStyle.normal.color = barColor[0].full;
    				this.option.series[1].itemStyle.normal.borderColor = barColor[0].full;
    		}
    	},
    	getBarColor : function(){
    		return this.barColor;
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
    	
    	setBarWidth:function(barWidth){
    		this.barWidth = barWidth;
    		this.option.series[1].barWidth = barWidth;
    	},
    	getBarWidth:function(){
    		return this.barWidth;
    	},
    	
//  	设置数据点标签是否显示
    	setIsLabelShowLine:function(isLabelShowLine){
    		this.isLabelShowLine = isLabelShowLine;
			this.option.series[0].label.normal.show = isLabelShowLine;
    	},
    	getIsLabelShowLine:function(){
    		return this.isLabelShowLine;
    	},
    	
//  	设置数据点标签位置
    	setLabelPositionLine:function(labelPositionLine){
    		this.labelPositionLine = labelPositionLine;
			this.option.series[0].label.normal.position = labelPositionLine;
    	},
    	getLabelPositionLine:function(){
    		return this.labelPositionLine;
    	},
    	
//  	设置数据点文字大小
    	setLabelFontSizeLine:function(labelFontSizeLine){
    		this.labelFontSizeLine = labelFontSizeLine;
			this.option.series[0].label.normal.textStyle.fontSize = labelFontSizeLine;
    	},
    	getLabelFontSizeLine:function(){
    		return this.labelFontSizeLine;
    	},
//  	设置数据点文字颜色
    	setLabelFontColorLine:function(labelFontColorLine){
    		this.labelFontColorLine = labelFontColorLine;
			this.option.series[0].label.normal.textStyle.color = labelFontColorLine[0].full;
    	},
    	getLabelFontColorLine:function(){
    		return this.labelFontColorLine;
    	},
    	
    	
    	//  	设置数据点标签是否显示
    	setIsLabelShowBar:function(isLabelShowBar){
    		this.isLabelShowBar = isLabelShowBar;
    		this.option.series[1].label.normal.show = isLabelShowBar;
    	},
    	getIsLabelShowBar:function(){
    		return this.isLabelShowBar;
    	},
    	
//  	设置数据点标签位置
    	setLabelPositionBar:function(labelPositionBar){
    		this.labelPositionBar = labelPositionBar;
			this.option.series[1].label.normal.position = labelPositionBar;
    	},
    	getLabelPositionBar:function(){
    		return this.labelPositionBar;
    	},
    	
//  	设置数据点文字大小
    	setLabelFontSizeBar:function(labelFontSizeBar){
    		this.labelFontSizeBar = labelFontSizeBar;
			this.option.series[1].label.normal.textStyle.fontSize = labelFontSizeBar;
    	},
    	getLabelFontSizeBar:function(){
    		return this.labelFontSizeBar;
    	},
//  	设置数据点文字颜色
    	setLabelFontColorBar:function(labelFontColorBar){
    		this.labelFontColorBar = labelFontColorBar;
			this.option.series[1].label.normal.textStyle.color = labelFontColorBar[0].full;
    	},
    	getLabelFontColorBar:function(){
    		return this.labelFontColorBar;
    	},
    	
    	
//  	设置坐标轴是否显示
    	setIsAxisLineShow:function(isAxisLineShow){
    		this.isAxisLineShow = isAxisLineShow;
    		this.option.xAxis[0].axisLine.show = isAxisLineShow;
    		this.option.yAxis[0].axisLine.show = isAxisLineShow;
    		this.option.yAxis[1].axisLine.show = isAxisLineShow;
    	},
    	getIsAxisLineShow:function(){
    		return this.isAxisLineShow;
    	},
    	
//  	设置坐标轴分割线是否显示
    	setIsSplitLineShow:function(isSplitLineShow){
    		this.isSplitLineShow = isSplitLineShow;
    		this.option.xAxis[0].splitLine.show = isSplitLineShow;
    		this.option.yAxis[0].splitLine.show = isSplitLineShow;
    		this.option.yAxis[1].splitLine.show = isSplitLineShow;
    	},
    	getIsSplitLineShow:function(){
    		return this.isSplitLineShow;
    	},
    	
//  	设置坐标轴类型
    	setAxisLineType:function(axisLineType){
    		this.axisLineType = axisLineType;
    		this.option.xAxis[0].axisLine.lineStyle.type = axisLineType;
    		this.option.yAxis[0].axisLine.lineStyle.type = axisLineType;
    		this.option.yAxis[1].axisLine.lineStyle.type = axisLineType;
    	},
    	getAxisLineType:function(){
    		return this.axisLineType;
    	},
    	
    	setAxisLineColor:function(axisLineColor){
    		this.axisLineColor = axisLineColor;
    		this.option.xAxis[0].axisLine.lineStyle.color = axisLineColor[0].full;
    		this.option.yAxis[0].axisLine.lineStyle.color = axisLineColor[0].full;
    		this.option.yAxis[1].axisLine.lineStyle.color = axisLineColor[0].full;
    	},
    	getAxisLineColor:function(){
    		return this.axisLineColor;
    	},
    	
    	setAxisLabelColor:function(axisLabelColor){
    		this.axisLabelColor = axisLabelColor;
    		this.option.xAxis[0].axisLabel.textStyle.color = axisLabelColor[0].full;
    		this.option.yAxis[0].axisLabel.textStyle.color = axisLabelColor[0].full;
    		this.option.yAxis[1].axisLabel.textStyle.color = axisLabelColor[0].full;
    	},
    	getAxisLabelColor:function(){
    		return this.axisLabelColor;
    	},
//  	设置坐标轴分割线类型
    	setSplitLineType:function(splitLineType){
    		this.splitLineType = splitLineType;
    		this.option.yAxis[0].splitLine.lineStyle.type = splitLineType;
    		this.option.yAxis[1].splitLine.lineStyle.type = splitLineType;
    		if(splitLineType != 'square'){
    			this.option.xAxis[0].splitLine.show = true;
    			this.option.xAxis[0].splitLine.lineStyle.type = splitLineType;
    		}else{
    			this.option.xAxis[0].splitLine.show = false;
    		}
    	},
    	getSplitLineType:function(){
    		return this.splitLineType;
    	},
    	
//  	设置坐标轴分割线宽度
    	setSplitLineWidth:function(splitLineWidth){
    		this.splitLineWidth = splitLineWidth;
    		this.option.yAxis[0].splitLine.lineStyle.width = splitLineWidth;
    		this.option.yAxis[1].splitLine.lineStyle.width = splitLineWidth;
    		this.option.xAxis[0].splitLine.lineStyle.width = splitLineWidth;
    	},
    	getSplitLineWidth:function(){
    		return this.splitLineWidth;
    	},
    	
    	setAxisLineWidth:function(axisLineWidth){
    		this.axisLineWidth = axisLineWidth;
    		this.option.yAxis[0].axisLine.lineStyle.width = axisLineWidth;
    		this.option.yAxis[1].axisLine.lineStyle.width = axisLineWidth;
    		this.option.xAxis[0].axisLine.lineStyle.width = axisLineWidth;
    	},
    	getAxisLineWidth:function(){
    		return this.axisLineWidth;
    	},
    	
//  	设置坐标轴分割线颜色
    	setSplitLineColor:function(splitLineColor){
    		this.splitLineColor = splitLineColor;
    		this.option.yAxis[0].splitLine.lineStyle.color = splitLineColor[0].full;
    		this.option.yAxis[1].splitLine.lineStyle.color = splitLineColor[0].full;
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
    		this.option.yAxis[1].axisLabel.textStyle.fontSize = axisFontSize;
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
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
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
				this.option.xAxis[0].data = dataXValue;
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
    	//设置数据
    	_setSeries:function (series){
			this.option.series.length = 0;
			for(var i = 0, len = series.length ; i < len ; i++){
				var seriesItem = series[i];
				if(i ==0){
				var min =0;
				var max = 0;
				for(var k = 0, lenA = seriesItem.data.length; k < lenA ; k ++){
					var dataA = seriesItem.data[k];
					min = min <= dataA ? min : dataA;
					max = max >= dataA ? max : dataA;
				}
//				this.option.yAxis[0].min = min;
//				this.option.yAxis[0].max = max;
				this.option.yAxis[0].name = seriesItem.name;
				var	item = {
				        "name": seriesItem.name,
				        "type": "line",
				        "stack": "总量",
			            "label": {
			                "normal": {
			                    "show":  this.isLabelShow,
			                    "textStyle":{
			                    	"fontSize":12,
			                    	"color":"#fff"
			                    },
			                    "position": "top"
			                }
			            },
			            "smooth":this.lineType,
				        "lineStyle": {
			                "normal": {
			                    "width": this.lineWidth,
			                    "color":this.lineColor[0].full
			                }
			            },
			            "itemStyle": {
			                "normal": {
			                    "color":this.lineColor[0].full
			                }
			            },
				        "data": seriesItem.data
				    }
				}
				else if ( i==1){
					var min =0;
					var max = 0;
					for(var k = 0, lenA = seriesItem.data.length; k < lenA ; k ++){
						var dataA = seriesItem.data[k];
						min = min <= dataA ? min : dataA;
						max = max >= dataA ? max : dataA;
					}
//					this.option.yAxis[0].min = min;
//					this.option.yAxis[0].max = max;
					this.option.yAxis[1].name = seriesItem.name;
					var	item = {
				        "name": seriesItem.name,
				        "type": "bar",
				        "barWidth":this.barWidth,
				        "yAxisIndex": 1,
				        "stack": "总量",
			            "label": {
			                "normal": {
			                    "show": this.isLabelShow,
			                    "textStyle":{
			                    	"fontSize":12,
			                    	"color":"#fff"
			                    },
			                    "position": "top"
			                }
			            },
			            "lineStyle": {
			                "normal": {
			                    "color":""
			                }
			            },
			            "itemStyle": {
			                "normal": {
			                    "color":this.barColor[0].full
			                }
			            },
				        "data": seriesItem.data
				    }
				}
				this.option.series.push(item);
			}
    	}
    	
    });
    
    ey.widget.eyMixCharts = function (args){
    	return new EyMixCharts (args);
    };
       
})($,ey,echarts);