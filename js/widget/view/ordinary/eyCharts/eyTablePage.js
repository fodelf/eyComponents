/*!
* Instruction : 线图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyTablePage = function(args){
    	//继承线图基类
    	ey.extendProperty(this,"eyBridge","widget",[args]);
    	//dom模板
    	this._domTemplate = $("<div class='ey-tableChartsPage ey-widget eyCharts eyCharts-bg-blue'><div style='width:100%;height:100%;box-size:border-box;'>"
    						
							// 标题
    						+ "<h5></h5>"
    						//图形内容区域
    						+"<div class='ey-tableContain'><div class='tableHead'></div><div class='tableBody'></div>"
    						
    						+"</div>"
    						+"<div id='pagation'><div id='pageNum'></div></div>"
    						+"</div>");
    	this.widgetName = "eyTablePage";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    	this._pageNum = 1;
		this._pageSize = 6;
		this.theadFontColor = [{"full":"#fff","empty":"rgba(32,156,145,.3)"}];
		this.tbodyFontColor = [{"full":"#fff","empty":"rgba(32,156,145,.3)"}];
		this.oldPageSize = 6;
    };
    //继承组件基类
    ey.extendFun(EyTablePage,"eyBridge","widget");
    //扩展当前组件
    ey.expandPrototype(EyTablePage,{
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
	   	//获取文本位置
	   	getTitleLocation :function(location){
	   		return this._location;
	   		
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
    	domInit: function(){
			//设置dom元素Id
    		this._domTemplate.attr({
    			"id":this.id
    		});
   		},
   		getOption : function(){
			//清除无用数据只保留样式 非常重要-------------
			//数据根据实际选择的数据源类型进行数据驱动
			var returnOption = JSON.stringify(this.option);
			returnOption = JSON.parse(returnOption);
			returnOption.metaData ={"X":[],"Y":[]};
			returnOption.resultList = [];
			returnOption.totalRecord = 0;
			return returnOption;
		},
    	setOption:function(option){
    		var options = JSON.stringify(option);			
			this.option = JSON.parse(options);
			this.createTable(this.option);
			this.setPagation(this.option);
    	},
    	createTable:function(dataALL){
    		this.dataALL = dataALL;
			this._domTemplate.find(".tableHead").empty();
			this._domTemplate.find(".tableBody").empty();
			this._domTemplate.find(".tableBody span").text("");
			this._domTemplate.find(".tableHead span").text("");
			this.head = dataALL.metaData["X"].concat(dataALL.metaData["Y"]);
			this._headLength = this.head.length;
			var  data = dataALL.resultList;	
			for(var k = 0;k < this.head.length;k++){
				var span  = $("<span class='ey-tdChild'></span>");
				span.text( this.head[k]);
				if(k == 0){
					span.addClass('order');
				}
				this._domTemplate.find(".tableHead").append(span);
			}			
			for(var i = 0;i < data.length;i++){
				var tr = $('<div></div>');
				for( var j = 0;j < this.head.length;j++){
					var td = $("<span class='ey-tdChild'></span>");
					td.text(data[i][j]);
					tr.append(td);
					if(j == 0){
						td.addClass('order');
					}
				}
				this._domTemplate.find(".tableBody").append(tr);
			}
			if(data.length != 0){
				for(var i = 0;i < this._pageSize - data.length;i++){
					var tr = $('<div></div>');
					for( var j = 0;j < this.head.length;j++){
						var td = $("<span></span>");
						tr.append(td);
						if(j == 0){
							td.addClass('order');
						}
					}
					this._domTemplate.find(".tableBody").append(tr);
				}
			}
			
			this._domTemplate.find(".ey-tdChild").css({'box-sizing':'border-box','width':this.toPercent(1/this.head.length)});
		},
		
		toPercent:function(point){
		    var str = point*100;
		    str+="%";
		    return str;
		},
		setPagation:function(dataALL){
			var that = this;
			this._totalPage = Math.ceil(dataALL.totalRecord/this._pageSize)
			this._domTemplate.find("#pageNum").empty();
			
			for (var i = 0;i < this._totalPage;i++ ){
				var span = $('<span></span>');
				span.text(i + 1);
//				if(i == 0){
//					span.addClass('active');
//				}
				span.click(function(e){
					e.stopPropagation();
					$(this).siblings().removeClass('active');
					
					that._pageNum = $(this).text();
//					that.preview();
//					$(this).addClass('active');
					that._request();
					$(this).addClass('active');
				})
				this._domTemplate.find('#pageNum').append(span);
			}
			this._domTemplate.find('#pageNum span').eq(that._pageNum - 1).addClass('active');
		},
    	setTableType:function(tableType){
    		this.tableType = tableType;
    		var that = this;
			switch(this.tableType){
				case '1':
					this.changeClass();
					this._domTemplate.addClass('table1');
					break;
				case '2':
					this.changeClass();
					this._domTemplate.addClass('table2');
					break;
				case '3':
					this.changeClass();
					this._domTemplate.addClass('table3');
					break;
				case '4':
					this.changeClass();
					this._domTemplate.addClass('table4');
					break;
				}
    	},
    	getTableType:function(){
    		return this.tableType;
    	},
    	changeClass:function(){
			this._domTemplate.removeClass('table1 table2 table3 table4 table5');
		},
		
		setPageSize:function(pageSize){
			var  data = this.dataALL.resultList;	
			//如果数据长度为0，清空数据表格
			this._pageSize = pageSize;
			if(this._pageSize > this.oldPageSize){
				for(var i = 0;i<this._pageSize - this.oldPageSize;i++){
					var div = $('<div></div>');
					for( var j = 0;j < this.head.length;j++){
						var span = $('<span > </span>');
						div.append(span);
						if(j == 0){
							span.addClass('order')
						};
					}
					this._domTemplate.find(".tableBody").append(div);
				}
			}else{
				for(var i = 0;i< this.oldPageSize - this._pageSize;i++){
					this._domTemplate.find(".tableBody").children("div:last").remove();
				}
			}
			this.setShowOrder(this.showOrder);
			this.setTableType(this.tableType);
    		this.setLineColor(this.lineColor);
    		this.setLineWidth(this.lineWidth);
    		this.setIsTheadShow(this.isTheadShow);
    		this.setTheadPosition(this.theadPosition);
    		this.setTheadFontSize(this.theadFontSize);
    		this.setTheadFontColor(this.theadFontColor);
    		this.setTbodyPosition(this.tbodyPosition);
    		this.setTbodyFontSize(this.tbodyFontSize);
    		this.setTbodyFontColor(this.tbodyFontColor);
			if(this._pageSize !== this.oldPageSize){
				this.oldPageSize = this._pageSize;
			}
		},
		getPageSize:function(){
			return this._pageSize;
		},
    	setLineColor : function(lineColor){
    		this.lineColor = lineColor;
    		this._domTemplate.find('.tableBody span').css({
    			    "border-color":  lineColor[0].full
    		});
    		this._domTemplate.find('.tableHead span').css({
    			    "border-color":  lineColor[0].full
    		})
    		this._domTemplate.find('.tableBody').css({
    			    "border-color":  lineColor[0].full
    		});
    		this._domTemplate.find('.tableHead').css({
    			    "border-color":  lineColor[0].full
    		})
    	},
    	getLineColor : function(){
    		return this.lineColor;
    	},
    	
    	
    	setLineWidth : function(lineWidth){
    		this.lineWidth = lineWidth;
    		this._domTemplate.find('.tableBody span').css({
    			    "border-width":  lineWidth
    		});
    		this._domTemplate.find('.tableHead span').css({
    			    "border-width":  lineWidth
    		})
    		this._domTemplate.find('.tableBody').css({
    			    "border-width":  lineWidth
    		});
    		this._domTemplate.find('.tableHead').css({
    			    "border-width":  lineWidth
    		})
    	},
    	getLineWidth : function(){
    		return this.lineWidth;
    	},
    	
    	setIsTheadShow:function(isTheadShow){
			this.isTheadShow = isTheadShow;
			if(this.isTheadShow == true){
				this._domTemplate.find('.tableHead').show();
				this._domTemplate.find('.tableBody').css({'border-top':'none'});
			}else{
				this._domTemplate.find('.tableHead').hide();
				this._domTemplate.find('.tableBody').css({'border-top': this.lineWidth + "px" + ' solid ' + this.lineColor[0].full});
			}			
		},
		getIsTheadShow:function(){
			return this.isTheadShow;
		},
    	
    	setTheadPosition : function(theadPosition){
    		this.theadPosition = theadPosition;
    		this._domTemplate.find(".tableHead span").css({"text-align":theadPosition})
    	},
    	getTheadPosition : function(){
    		return this.theadPosition;
    	},
    	
    	setTheadFontSize : function(theadFontSize){
    		this.theadFontSize = theadFontSize;
    		this._domTemplate.find(".tableHead span").css({"font-size":theadFontSize + 'px'})
    	},
    	getTheadFontSize : function(){
    		return this.theadFontSize;
    	},
    	
    	setTheadFontColor : function(theadFontColor){
    		this.theadFontColor = theadFontColor;
    		this._domTemplate.find(".tableHead span").css({"color":theadFontColor[0].full})
    	},
    	getTheadFontColor : function(){
    		return this.theadFontColor;
    	},
    	
    	setTbodyPosition : function(tbodyPosition){
    		this.tbodyPosition = tbodyPosition;
    		this._domTemplate.find(".tableBody span").css({"text-align":tbodyPosition})
    	},
    	getTbodyPosition : function(){
    		return this.tbodyPosition;
    	},
    	
    	setTbodyFontSize : function(tbodyFontSize){
    		this.tbodyFontSize = tbodyFontSize;
    		this._domTemplate.find(".tableBody span").css({"font-size":tbodyFontSize + 'px'})
    	},
    	getTbodyFontSize : function(){
    		return this.tbodyFontSize;
    	},
    	
    	setTbodyFontColor : function(tbodyFontColor){
    		this.tbodyFontColor = tbodyFontColor;
    		this._domTemplate.find(".tableBody span").css({"color":tbodyFontColor[0].full})
    	},
    	getTbodyFontColor : function(){
    		return this.tbodyFontColor;
    	},
    	
    	setShowOrder:function(showOrder){
    		this.showOrder = showOrder;
    		var that = this;
    		if(this.showOrder == true){
    			this._domTemplate.find('.order').show();
    			this._domTemplate.find(".order span").css({'box-sizing':'border-box','width':that.toPercent(1/(that._headLength))});
				this._domTemplate.find(".tableHead span").css({'box-sizing':'border-box','width':that.toPercent(1/(that._headLength))});
				this._domTemplate.find(".tableBody span").css({'box-sizing':'border-box','width':that.toPercent(1/(that._headLength))});
			}else{
				this._domTemplate.find('.order').hide();
				this._domTemplate.find(".tableHead span").css({'box-sizing':'border-box','width':that.toPercent(1/(that._headLength - 1))});
				this._domTemplate.find(".tableBody span").css({'box-sizing':'border-box','width':that.toPercent(1/(that._headLength - 1))});
			}			
    	},
    	getShowOrder:function(){
    		return this.showOrder;
    	},
    	createSaticData:function(){
    		var data = this.data;
    		this.createTable(data);
    		this.setPagation(data);
    		this.setTableType(this.tableType);
    		this.setLineColor(this.lineColor);
    		this.setLineWidth(this.lineWidth);
    		this.setIsTheadShow(this.isTheadShow);
    		this.setTheadPosition(this.theadPosition);
    		this.setTheadFontSize(this.theadFontSize);
    		this.setTheadFontColor(this.theadFontColor);
    		this.setTbodyPosition(this.tbodyPosition);
    		this.setTbodyFontSize(this.tbodyFontSize);
    		this.setTbodyFontColor(this.tbodyFontColor);
    	},
    	setPagePosition:function(num,total){
			var width = this._domTemplate.find('#pagation span').eq(0).width();
			this._domTemplate.find('#pageNum').css('width', width * total + total);
			var num = parseFloat(num)
			if(num >= 3 && total > 3 && num < total){
				
				this._domTemplate.find('#pageNum').css('left',(-width - 1) * (num - 2));
			}else if(num == total){
				this._domTemplate.find('#pageNum').css('left',(-width - 1) * (num - 3));
			}else{
				this._domTemplate.find('#pageNum').css('left',0);
			}
			
		},
		removeBg: function(theme){
    		switch (theme){
			case "blue":
			this._domTemplate.removeClass("eyCharts-bg-white");
			this._domTemplate.addClass("eyCharts-bg-blue");
			this._domTemplate.removeClass("eyCharts-bg-black");
			this.color = "#fff";
			this._domTemplate.find(".tableBody span").css({"color":"#fff"});
			this._domTemplate.find(".tableHead span").css({"color":"#fff"});
			if(this._wordColor[0].full == "rgb(102, 102, 102)"){
				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
				this.lineColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
				this.tbodyFontColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
				this.theadFontColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
				this.setTheadFontColor(this.theadFontColor);
				this.setTbodyFontColor (this.tbodyFontColor);
				this.setLineColor(this.lineColor);
				this.setWordColor(this._wordColor);
			};
				break;
			case "white":
			this._domTemplate.removeClass("eyCharts-bg-blue");
			this._domTemplate.addClass("eyCharts-bg-white");
			this._domTemplate.removeClass("eyCharts-bg-black");
			this.color = "rgb(102, 102, 102)";
			this._domTemplate.find(".tableBody span").css({"color":"rgb(102, 102, 102)"});
			this._domTemplate.find(".tableHead span").css({"color":"rgb(102, 102, 102)"});
			if(this._wordColor[0].full == "#fff"){
				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"rgb(102, 102, 102)"}];
				this.lineColor = [{"empty":"rgba(32,156,146,.3)","full":"rgb(102, 102, 102)"}];
				this.tbodyFontColor =  [{"empty":"rgba(32,156,146,.3)","full":"rgb(102, 102, 102)"}];
				this.theadFontColor = [{"empty":"rgba(32,156,146,.3)","full":"rgb(102, 102, 102)"}];
				this.setTheadFontColor(this.theadFontColor);
				this.setTbodyFontColor (this.tbodyFontColor);
				this.setLineColor(this.lineColor);
				this.setWordColor(this._wordColor);
			};
				break;
			case "black":
    			this._domTemplate.removeClass("eyCharts-bg-blue");
    			this._domTemplate.removeClass("eyCharts-bg-white");
    			this._domTemplate.addClass("eyCharts-bg-black");
    			this._domTemplate.find(".tableBody span").css({"color":"#fff"});
    			this._domTemplate.find(".tableHead span").css({"color":"#fff"});
    			this.color = "#fff";
    			if(this._wordColor[0].full == "rgb(102, 102, 102)"){
    				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
    				this.lineColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
    				this.tbodyFontColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
    				this.theadFontColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
    				this.setTheadFontColor(this.theadFontColor);
    				this.setTbodyFontColor (this.tbodyFontColor);
    				this.setLineColor(this.lineColor);
    				this.setWordColor(this._wordColor);
    			};
    			break;
			default:
				break;
		}
    	},
		toPercent:function(point){
		    var str = point*100;
		    str+="%";
		    return str;
		}
    	
    });
    
    ey.widget.eyTablePage = function (args){
    	return new EyTablePage (args);
    };
       
})($,ey,echarts);