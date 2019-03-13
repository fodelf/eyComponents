/*!
* Instruction : 百分比柱图
* 
* Author : 缪星
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyPerBarCharts = function(args){
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
    	this.widgetName = "eyPerBarCharts";
    	this.lineColor = [
						{"full":"#209c91","empty":"rgba(32,156,145,.3)"},
						{"full":"#ffd538","empty":"rgba(255,213,56,.3)"},
						{"full":"#e85355","empty":"rgba(232,83,85,.3)"}];
    	this._lineCount = 10;
    };
    //继承组件基类
    ey.extendFun(EyPerBarCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyPerBarCharts,{
    	//每个图形必须重写此方法
    	getOption : function(){
			//清除无用数据只保留样式 非常重要-------------
			//数据根据实际选择的数据源类型进行数据驱动
			var returnOption = JSON.stringify(this.option);
			returnOption = JSON.parse(returnOption);
			return returnOption;
		},
		setOption:function(option){
    		var options = JSON.stringify(option);			
			this.option = JSON.parse(options);
			this.option.xAxis[0].axisLabel.formatter = function(value,index) {
                return value + "%";
            }
    	},
    	//设置图例类型
    	setLegendType : function(legendType){
    		this.legendType = legendType;
    		if(legendType == 'rect'){
    			this.option.legend.itemWidth = 30;
    			this.option.legend.itemHeight = 9;
    			
    		}else{
    			this.option.legend.itemWidth = 9;
    			this.option.legend.itemHeight = 9;
    		}
    		
    	},
    	getLegendType : function(){
    		return this.legendType;
    	},
    	
    	
    	setLineType : function(lineType){
    		var that = this;
    		this.lineType = lineType;
    		switch(lineType){
    			case 'full':
    				$.each(this.option.series,function(i,value){
    					value.itemStyle.normal = {'color':that.lineColor[i].full,'borderColor':that.lineColor[i].full,'barBorderRadius':0};
    				})
    				break;
    			case 'empty':
    				$.each(this.option.series,function(i,value){
    					value.itemStyle.normal = {'color':that.lineColor[i].empty,'borderColor':that.lineColor[i].full,'barBorderRadius':0};
    				})
    				
    				break;
    			case 'zebra':
    				$.each(this.option.series,function(i,value){
    					value.itemStyle.normal = {'color':'transparent','borderColor':'transparent'};
    				})
    				this.option.series[1] = { // For shadow
			            type: 'pictorialBar', 
			            symbol: 'rect',
			            silent:true,
			            itemStyle: {
			                normal: {color: that.lineColor[0].full}
			            },
			            symbolRepeat: true,
					    symbolSize: ['100%', 4],
					    symbolMargin: 1,
					    zlevel: 20,
			            data: this.option.series[0].data.map(function(d){
			                return d;
			            })
				    };
    				
    				break;
    		}
    	},
    	getLineType : function(){
    		return this.lineType;
    	},
    	setLineColor : function(lineColor){
    		this.lineColor = lineColor;
    		switch(this.lineType){
    			case 'full':
    				$.each(this.option.series,function(i,value){
    					value.itemStyle.normal.color = lineColor[i].full;
    					value.itemStyle.normal.borderColor = lineColor[i].full;
    				})
    				break;
    			case 'empty':
    				$.each(this.option.series,function(i,value){
	    				value.itemStyle.normal.color = lineColor[i].empty;
	    				value.itemStyle.normal.borderColor = lineColor[i].full;
	    			})
    				break;
    			default:
	    			$.each(this.option.series,function(i,value){
	    				value.itemStyle.normal.color = lineColor[i].full;
						value.itemStyle.normal.borderColor = lineColor[i].full;
					})
    		}
    		
    	},
    	getLineColor : function(){
//  		alert(this.lineColor);
    		return this.lineColor;
    	},
    	
    	setBarWidth:function(barWidth){
    		this.barWidth = barWidth;
    		$.each(this.option.series,function(i,value){
				value.barWidth = barWidth;
    		})
    	},
    	getBarWidth:function(){
    		return this.barWidth;
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
    		var dataArry = {};
    		var lenFirst = series[0].data.length;
    		for(var i = 0; i < lenFirst ; i++){
    			dataArry[i] = [];
     		};
     		for(var i = 0, len = series.length ; i < len ; i++){
     			var childData = series[i];
     			for(var k = 0, lenA =childData.data.length; k <lenA ; k ++){
     				dataArry[k].push(childData.data[k]);
     			}
     		};
     		var sumData = [];
     		for(var i = 0; i < lenFirst ; i++){
    			 var arry =  dataArry[i];
    			 var sum = 0 ;
    			 for(var k = 0,lenB = arry.length; k < lenB; k ++){
    				sum = sum  + arry[k]*1;
    			}
    			 sumData.push(sum);
     		};
			for(var i = 0, len = series.length ; i < len ; i++){
				var seriesItem = series[i];
				var k =  i%(this._lineCount);
				var data = [];
				for(var j = 0,lenC= seriesItem.data.length; j < lenC; j ++){
						var nub =(seriesItem.data[j]/sumData[j])*100 + "";
						var arr = nub.split(".");
						var value = 0;
						if(arr.length >1){
							var aone = arr[1].substr(0, 2);
							value = arr[0] + "." + aone;
						}
						else{
							value = arr[0];
						}
						data.push (value);
				};
				var item = {
					"name":seriesItem.name,
					"type": "bar",
		            "stack": "eySight",
					"data":data,
					"barWidth":this.barWidth,
					"barMaxWidth": "40",
		            "itemStyle": {
		                "normal": {
		                    "color": this.lineColor[k].full,
		                    "borderColor": this.lineColor[k].full,
		                    "opacity": 1
		                }
		            },
		            "lineStyle": {
		                "normal": {
		                    "width": 1
		                }
		            },
		            "label": {
		                "normal": {
		                    "show": false,
		                    "textStyle":{
		                    	"fontSize":12
		                    },
		                    "formatter": "{c}"
		                }
		            }
				}
				this.option.series.push(item);
			}	
    	},
    	
    });
    
    ey.widget.eyPerBarCharts = function (args){
    	return new EyPerBarCharts (args);
    };
       
})($,ey,echarts);