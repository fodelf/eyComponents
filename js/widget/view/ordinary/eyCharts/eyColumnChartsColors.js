/*!
* Instruction : 单柱多彩图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyColumnChartsColors = function(args){
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
    	this.widgetName = "eyColumnChartsColors";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,146,.4)"}];
    };
    //继承组件基类
    ey.extendFun(EyColumnChartsColors,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyColumnChartsColors,{
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
    				if(this.option.series.length > 1){
						this.option.series[1].data = [];
					}
    				$.extend(true,this.option.series[0].itemStyle.normal,{
						'color':function(params) {
		                    return that.lineColor[params.dataIndex % 10].full
		              }
					})
    				break;
    			case 'empty':
    				if(this.option.series.length > 1){
						this.option.series[1].data = [];
					}
    				$.extend(true, this.option.series[0].itemStyle.normal,
						{'color':function(params) {return that.lineColor[params.dataIndex % 10].empty}
						});
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
			                normal: {
			                	color: function(params) {
			                		return that.lineColor[params.dataIndex % 10].full
						        }
			                }
			            },
			            symbolRepeat: true,
					    symbolSize: [this.barWidth, 4],
					    symbolMargin: 1,
					    zlevel: 20,
			            data: this.option.series[0].data.map(function(d){
			                return d;
			            })
				    };
    				
    				break;
    			case 'capsule' :
					var list = Math.max.apply(null, this.option.series[0].data) * 1.1;
					$.extend(true, this.option.series[0].itemStyle.normal, {
						'color':function(params) {
		                    return that.lineColor[params.dataIndex % 10].full
		              	},
						'barBorderRadius': 3});
//					option.series.each(function(index,n){
//						$.extend(true, index.itemStyle.normal, {'color':this._lineColor,'borderColor':this._lineColor,'opacity':1});
//					})
					this.option.series[1] = { // For shadow
			            type: 'bar', 
			            silent:true,
			            itemStyle: {
			                normal: {
			                	color: 'rgba(0, 0, 0, 0.2)',
			                	barBorderRadius: 3,
			                },
			                
			            },
			            zlevel:'1',
			            barWidth:"20",
			            barGap:'-100%',
			            data: this.option.series[0].data.map(function(d){
			                return list
			            })
				    }
    		}
    	},
    	getLineType : function(){
    		return this.lineType;
    	},
    	setLineColor : function(lineColor){
    		var that = this;
    		this.lineColor = lineColor;
//  		this.option.series[0].itemStyle.normal.color = lineColor[0].full;
    		switch(this.lineType){
    			case 'full':
    				$.extend(true,this.option.series[0].itemStyle.normal,{
						'color':function(params) {
		                    return that.lineColor[params.dataIndex % 10].full
		              }
					})
    				break;
    			case 'empty':
    				$.extend(true, this.option.series[0].itemStyle.normal,
						{'color':function(params) {
		                    return that.lineColor[params.dataIndex % 10].empty
		                }
						});
    				break;
    			case 'zebra':
    				this.option.series.each(function(index,n){
						this.option.series[1] = { // For shadow
							            type: 'pictorialBar', 
							            symbol: 'rect',
							            silent:true,
							            itemStyle: {
							                normal: {
							                	color: function(params) {
							                		return that.lineColor[params.dataIndex % 10].full
										        }
							                }
							            },
							            symbolRepeat: true,
										    symbolSize: [this.barWidth, 4],
										    symbolMargin: 1,
										    zlevel: 20,
								            data: that.option.series[0].data.map(function(d){
								                return d;
								            })
							    };
						
						$.extend(true, that.option.series[0].itemStyle.normal, {'color':'transparent','borderColor':'transparent'});
					});
					break;
				case 'capsule' :
					var list = Math.max.apply(null, this.option.series[0].data) * 1.1;
					$.extend(true,  this.option.series[0].itemStyle.normal, {
						'color':function(params) {
		                    return that.lineColor[params.dataIndex % 10].full
		              	},
						'barBorderRadius': 3});
					 this.option.series[1] = { // For shadow
							            type: 'bar', 
							            silent:true,
							            itemStyle: {
							                normal: {
							                	color: 'rgba(0, 0, 0, 0.2)',
							                	barBorderRadius: 3,
							                },
							                
							            },
							            zlevel:'1',
							            barWidth:this,barWidth,
							            barGap:'-100%',
							            data:  this.option.series[0].data.map(function(d){
							                return list
							            })
							     }
    		}
    		
    	},
    	getLineColor : function(){
//  		alert(this.lineColor);
    		return this.lineColor;
    	},
    	
    	setBarWidth:function(barWidth){
    		this.barWidth = barWidth;
    		this.option.series[0].barWidth = barWidth;
    		if(this.option.series[1]){
    			this.option.series[1].barWidth = barWidth;
    		}
    		
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
    	
    	setOption : function(option){
			var options = JSON.stringify(option);			
			this.option = JSON.parse(options);
			this.option.series[0].itemStyle.normal.color = function(params) {
                var colorList = ['#26C0C0',
                    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                ];
                return colorList[params.dataIndex]
            }
		},
    	//设置数据
    	_setSeries:function (series){
				this.option.series[0].name = series[0].name;
				this.option.series[0].data = series[0].data;
    	}
    	
    });
    
    ey.widget.eyColumnChartsColors = function (args){
    	return new EyColumnChartsColors (args);
    };
       
})($,ey,echarts);