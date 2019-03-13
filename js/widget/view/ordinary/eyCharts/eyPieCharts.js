/*!
* Instruction : 饼图
* 
* Author : 缪星
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyPieCharts = function(args){
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
    	this.widgetName = "eyPieCharts";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyPieCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyPieCharts,{
    	getOption : function(){
			//清除无用数据只保留样式 非常重要-------------
			//数据根据实际选择的数据源类型进行数据驱动
			var returnOption = JSON.stringify(this.option);
			returnOption = JSON.parse(returnOption);
			returnOption.series[0].data = "";
			return returnOption;
		},
    	//设置图例类型
    	setLegendType : function(legendType){
    		var that = this;
    		this.legendType = legendType;
    		if(legendType == 'hollow'){
    			$.each(this.option.series, function(i,value) {
    				value.symbol = 'circle';
    				value.itemStyle.normal.borderColor = "#fff";
    				value.itemStyle.normal.color = that.lineColor[i].full;
    			});
    		}else{
    			$.each(this.option.series, function(i,value) {
    				value.symbol = legendType;
    				value.itemStyle.normal.borderColor = that.lineColor[i].full;
    			});
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
    				break;
    			case 'right':
    				$.extend(true, this.option.legend, {'left':"right",'top':'center','orient':'vertical'});
    				break;
    			case 'down':
    				$.extend(true, this.option.legend, {'bottom':10,'left':'center','top':'','orient':'horizontal'});
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
    	
    	setLabelPosition:function(labelPosition){
    		this.labelPosition = labelPosition;
    		$.each(this.option.series,function(i,value){
				$.extend(true, value.label.normal, {"position":labelPosition});
			})
    	},
    	getLabelPosition:function(){
    		return this.labelPosition;
    	},
    	
    	setPieRadius : function(pieRadius){
    		this.pieRadius = pieRadius;
    		this.option.series[0].radius = pieRadius;
    	},
    	getPieRadius : function(){
    		return this.pieRadius;
    	},
    	setLineColor : function(lineColor){
    		this.lineColor = lineColor;
    		var color = [];
			for(var i = 0;i<lineColor.length;i++){
				color.push(lineColor[i].full);
			}
			this.option.color = color;
    		
    	},
    	getLineColor : function(){
//  		alert(this.lineColor);
    		return this.lineColor;
    	},
    	
    	setDataType:function(dataType){
			this.dataType = dataType;
			switch(dataType){
				case "dandv":
					$.extend(true, this.option.series[0].itemStyle.normal.label, {'formatter': '{b} :\n {c}'});
					break;
				case "dandp":
					$.extend(true, this.option.series[0].itemStyle.normal.label, {'formatter': '{b} :\n {d}%'});
					break;
				case "dandvandp":
					$.extend(true, this.option.series[0].itemStyle.normal.label, {'formatter': '{b} :\n {c} ({d}%)'});
					break;
				case "d":
					$.extend(true, this.option.series[0].itemStyle.normal.label, {'formatter': '{b}'});
					break;
				case "v":
					$.extend(true, this.option.series[0].itemStyle.normal.label, {'formatter': '{c}'});
					break;
				case "p":
					$.extend(true, this.option.series[0].itemStyle.normal.label, {'formatter': '{d}%'});
					break;
				case "vandp":
					$.extend(true, this.option.series[0].itemStyle.normal.label, {'formatter': '{c} :\n({d}%)'});
					break;
			}
//			$.extend(true, option, {'color':this._lineColor});
			
		},
		getDataType:function(){
			return this.dataType;
		},
    	
    	setLeft:function(left){
    		this.left = left;
    		this.option.series[0].center[0] = left;
    	},
    	getLeft:function(){
    		return this.left;
    	},
    	
    	setTop:function(top){
    		this.top = top;
    		this.option.series[0].center[1] = top;
    	},
    	getTop:function(){
    		return this.top;
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
			var series = [];
			var yName = [];
			//二维数组遍历处理
			for(var i =0,len= dataArry.length;i<len;i++){
				var childArry = dataArry[i];
				var  newSeries = {};
				for(var k = 0 ,childLen = childArry.length;k <childLen;k++){
					if( k==0){
						newSeries["name"] = childArry[k];	
						yName.push(newSeries["name"]);
					}
					else{
						newSeries["value"] = childArry[k];
					}
				};
				series.push(newSeries);
			};
			
			//重新赋值
			this.option.legend.data = yName;
				
			this.option.series[0].data = series;
			
			this.repaint();			
		},
    	
    });
    
    ey.widget.eyPieCharts = function (args){
    	return new EyPieCharts (args);
    };
       
})($,ey,echarts);