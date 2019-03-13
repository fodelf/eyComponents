/*!
* Instruction : 堆积线图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyStackAreaCharts = function(args){
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
    	this.widgetName = "eyStackAreaCharts";
    	this._lineCount = 10;
    };
    //继承组件基类
    ey.extendFun(EyStackAreaCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyStackAreaCharts,{
    	//每个图形必须重写此方法
    	getOption : function(){
			//清除无用数据只保留样式 非常重要-------------
			//数据根据实际选择的数据源类型进行数据驱动
			var returnOption = JSON.stringify(this.option);
			returnOption = JSON.parse(returnOption);
			return returnOption;
		},
		setOption  : function(option){
			this.option = option;
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
    				$.each(this.option.series,function(i,value){
    					value.smooth = true;
    					value.step = false;
    				})
    				break;
    			case 'straight':
    				$.each(this.option.series,function(i,value){
    					value.smooth = false;
    					value.step = false;
    				})
    				break;
    			case 'trapezoid':
    				$.each(this.option.series,function(i,value){
    					value.smooth = false;
    					value.step = true;
    				})
    				break;
    		}
    	},
    	getLineType : function(){
    		return this.lineType;
    	},
    	setLineColor : function(lineColor){
    		this.lineColor = lineColor;
    		$.each(this.option.series,function(i,value){
				value.lineStyle.normal.color = lineColor[i].full;
			})
    		switch(this.legendType){
    			case 'hollow':
	    			$.each(this.option.series,function(i,value){
						value.itemStyle.normal.color = lineColor[i].full;
						value.itemStyle.normal.borderColor = "#fff";
						value.areaStyle.normal.color = lineColor[i].empty;
					})
    				break;
    			case 'circle':
    				$.each(this.option.series,function(i,value){
						value.itemStyle.normal.color = lineColor[i].full;
						value.itemStyle.normal.borderColor = lineColor[i].full;
						value.areaStyle.normal.color = lineColor[i].empty;
					})
    				break;
    			default:
    				$.each(this.option.series,function(i,value){
						value.itemStyle.normal.color = lineColor[i].full;
						value.itemStyle.normal.borderColor = lineColor[i].full;
						value.areaStyle.normal.color = lineColor[i].empty;
					})
    		}
    		
    	},
    	getLineColor : function(){
//  		alert(this.lineColor);
    		return this.lineColor;
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
    	
//  	设置数据点文字大小
    	setLabelFontSize:function(labelFontSize){
    		this.labelFontSize = labelFontSize;
    		$.each(this.option.series,function(i,value){
    			if(value.label.normal.textStyle){
    				value.label.normal.textStyle.fontSize = labelFontSize;
    			};
				
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
//  	设置坐标轴分割线类型
    	setSplitLineType:function(splitLineType){
    		this.splitLineType = splitLineType;
    		this.option.yAxis[0].splitLine.lineStyle.type = splitLineType;
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
    	//设置数据
    	_setSeries:function (series){
				this.option.series.length = 0;
				for(var i = 0, len = series.length ; i < len ; i++){
					var seriesItem = series[i];
					var k =  i%(this._lineCount);
					var item = {
						name:seriesItem.name,
						type:'line',
						data:seriesItem.data,
			            symbol:'circle',
			            symbolSize:'10',
			            smooth:true,
			            stack:"总量",
			            itemStyle: {
			            	normal: {
			            		color:this.lineColor[k].full,
		            			borderColor:'#fff',
		            			borderWidth:1
			            	}
						},
						lineStyle:{
							normal:{
								width:2
							}
						},
			            label:{
							normal:{
								show:false,
								formatter:'{c}',
								 textStyle:{
				                    	"fontSize":this.labelFontSize 
				                },
							}
						},
						areaStyle: {
			                normal: {
			                    color: this.lineColor[k].empty,
			                }
			            },
					    "step": false         
					}
					this.option.series.push(item);
				}
    	},
    	
    });
    
    ey.widget.eyStackAreaCharts = function (args){
    	return new EyStackAreaCharts (args);
    };
       
})($,ey,echarts);