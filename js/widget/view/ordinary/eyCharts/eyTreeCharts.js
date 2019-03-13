/*!
* Instruction : 线图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyTreeCharts = function(args){
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
    	this.widgetName = "eyTreeCharts";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyTreeCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyTreeCharts,{
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
    	},
    	getSymbolSize:function(){
    		return this.symbolSize;
    	},
    	setLineType : function(lineType){
    		this.lineType = lineType;
    		this.option.series[0].funnelAlign = lineType;
    	},
    	getLineType : function(){
    		return this.lineType;
    	},
    	setLineColor : function(lineColor){
    		this.lineColor = lineColor;
    		var arr = [];
    		$.each(lineColor,function(index,value){
    			arr.push(value.full)
    		})
//  		this.option.color = arr;
    		$.each(this.option.series[0].data,function(index,value){
    			var child = value;
    			$.each(child.children,function(b,a){
    				a.itemStyle.normal.color = arr[index];
    			})
    		})

    		
    	},
    	getLineColor : function(){
//  		alert(this.lineColor);
    		return this.lineColor;
    	},
    	
    	setDirection:function(direction){
    		this.direction = direction;
    		this.option.series[0].sort = direction
    	},
    	getDirection:function(){
    		return this.direction;
    	},
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
    	},
    	
    	setLeft:function(left){
    		this.left = left;
    		this.option.series[0].left = left;
    	},
    	getLeft:function(){
    		return this.left;
    	},
    	
    	setTop:function(top){
    		this.top = top;
    		this.option.series[0].top = top;
    	},
    	getTop:function(){
    		return this.top;
    	},
    	
    	setRight:function(right){
    		this.right = right;
    		this.option.series[0].right = right;
    	},
    	getRight:function(){
    		return this.right;
    	},
    	
    	setBottom:function(bottom){
    		this.bottom = bottom;
    		this.option.series[0].bottom = bottom;
    	},
    	getBottom:function(){
    		return this.bottom;
    	},
    	setOption : function(option){
			var options = JSON.stringify(option);			
			this.option = JSON.parse(options);
			this.option.series[0].label.normal.formatter = function (params) {
					                        return params.name + " " + params.value + "%";
					                    };
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
			var series = [];
			//二维数组遍历处理
			for(var i =0,len = dataArry.length;i<len;i++){
				var childArry = dataArry[i];
				var  newSeries = {};
				for(var k = 0 ,childLen = childArry.length;k <childLen;k++ ){
					if(k == 0){
						newSeries["name"] = childArry[k];
					}
					else{
						newSeries["data"] = childArry[k];					
					}
				}
				series.push(newSeries);
			};
			//暂时没有不设置
			this._setSeries(series);
			this.repaint();	
		},	
    	//设置数据
    	_setSeries:function (series){
			this.option.series[0].data = [];
			var childData = { "value": 8};
			childData["children"] = [];
				for(var i = 0, len = series.length ; i < len ; i++){
					var seriesItem = series[i];
					var item = {
						name:seriesItem.name +"\n\n" + seriesItem.data,
						value:10,
			            itemStyle:{
				            normal: {
				                color: "#80cbc4"
				            }
						}
					}
					childData["children"].push(item);
				}
				this.option.series[0].data.push(childData);
    	},
    	
    });
    
    ey.widget.eyTreeCharts = function (args){
    	return new EyTreeCharts (args);
    };
       
})($,ey,echarts);