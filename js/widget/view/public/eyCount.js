/*!
* Instruction : 计数复杂组件
* 
* Author : 吴文周
* 
* Date: 2017-04-19
*/
(function($,ey){
	"use strict";
	
    var EyCount = function(args){
    	//dom模板
    	this._domTemplate = $("<footer>"
    						+"<div class='ey-backLayer'></div>"
							+"<div class='ey-contLayer ey-searchTooltip'>"
							+"<h5 class='ey-tooltipTitle'>"
							+"<span>常规</span><span></span>"
							+"</h5>"
							+"<div class='ey-searchContent'>"
							+"<div class='ey-searchOrdinary'>"
							+"<div class='ey-searchOrdinaryHeader'><span class='ey-countChecked ey-countSpan' value = 'BETWEEN'>值范围</span><span class='ey-countSpan ey-countCheck' value = 'LTE'>最大值</span><span class='ey-countSpan ey-countCheck' value ='GTE'>最小值</span></div>"
							+"<div class='ey-countOrdinaryContent'>"
							+"<div class='ey-countContentBetween'></div>"
							+"<div class='ey-countContentLTE' style='display:none'></div>"
							+"<div class='ey-countContentGTE' style='display:none'></div>"
							+"</div>"
							+"</div>"
							+"<p id='ey-tooltipButtonLine'><button class='ey-commitBtn ey-btn'>确定</button><button class='ey-cancelBtn ey-btn'>取消</button></p>"							
							+"</div>"
							+"</div>"
							+"</footer>")
    	//弹出框样式
    	this._eyTooltipClass = args.className;
    	this.dataProces = args.dataProces;
		//确定取消回调
    	this._commitCallback = args['commit'];
		this._cancleCallback = args['cancel'];
		this.param =  args['param'];
		//默认值
		this._value = args['value'];
    	this.init();
    };
    //扩展当前组件
    EyCount.prototype = {
    	
    	awake:function(){
    		var currentObj = this;
    		var eyCountDom = this._domTemplate;
			eyCountDom.find('.ey-contLayer').addClass(this._eyTooltipClass);
			eyCountDom.find('.ey-countSpan').each(function(){
				$(this).bind("click",function(){
					$(this).addClass("ey-countChecked");
					$(this).removeClass("ey-countCheck");
					$(this).siblings().addClass("ey-countCheck");
					$(this).siblings().removeClass("ey-countChecked");
					var  operateType = $(this).attr("value");
					switch (operateType){
						case "BETWEEN":
							eyCountDom.find(".ey-countContentBetween").show();
							eyCountDom.find(".ey-countContentLTE").hide();
							eyCountDom.find(".ey-countContentGTE").hide();
							break;
						case "LTE":
							eyCountDom.find(".ey-countContentBetween").hide();
							eyCountDom.find(".ey-countContentLTE").show();
							eyCountDom.find(".ey-countContentGTE").hide();
							break;
						case "GTE":
							eyCountDom.find(".ey-countContentBetween").hide();
							eyCountDom.find(".ey-countContentLTE").hide();
							eyCountDom.find(".ey-countContentGTE").show();
							break;	
						default:
							break;
						}
				});
			});
			//取消确定 绑定
			eyCountDom.find(".ey-cancelBtn").on("click",function(){
				currentObj._cancleCallback();
			});
			eyCountDom.find(".ey-commitBtn").on("click",function(){
				currentObj._commitCallback();
			});
			this._appendToBody(eyCountDom);
		},
		//取值
		getValue : function(){
//			var value = this._domTemplate.find("input[type=range]").val();
			var result = [];
			var operateType = this.getOperateType();
			switch (operateType){
				case "BETWEEN":
					var valueF = this._domTemplate.find(".ey-countContentBetween").find(".time1").eq(0).text();
				 	var valueE = this._domTemplate.find(".ey-countContentBetween").find(".time2").eq(0).text();
				 	result[0] = valueF;
				 	result[1] = valueE;
					break;
				case "LTE":
					var valueF = this._domTemplate.find(".ey-countContentLTE").find(".time1").eq(0).text();
				 	result[0] = valueF;
					break;
				case "GTE":
					var valueF = this._domTemplate.find(".ey-countContentGTE").find(".time1").eq(0).text();
				 	result[0] = valueF;
					break;	
				default:
					break;
			}
			return result;
		},
		//获取数据库操作类型
		getOperateType : function(){
			var operateType = "";
			this._domTemplate.find('.ey-countSpan').each(function(){
				if($(this).hasClass("ey-countChecked")){
					operateType = $(this).attr("value");
				}
			});
			return operateType;
		},
		close:function(){
			 this._domTemplate.remove();
		},
		init:function (){
			var config =  {};
			var currentObj  = this;
			config["result"] = this.param;
			config["successCallback"] = function(data) {
				currentObj._addDOM (data)
			};
			this.dataProces.queryDimData(config);
		},
		_addDOM:function(dataObj){
			console.log(dataObj);
			var betweenDom = this._domTemplate.find(".ey-countContentBetween");
			var betweenChild =	$("<div class='progressBar'>"
					+"<span>"+dataObj.colMinValue+"</span>"
					+"<span></span>"
					+"<span>"+dataObj.colMaxValue+"</span>"
					+"</div>"
					+"<div class='circle1 circle'></div>"
					+"<div class='circle2 circle'></div>"
					+"<div class='progress'></div>"
					+"<div class='time1'>"+dataObj.colMinValue+"</div>"
					+"<div class='time2'>"+dataObj.colMaxValue+"</div>"
				);
			betweenDom.append(betweenChild);
			var currentObj  = this; 
			betweenDom.find('.circle').mousedown(function(e){
				var that = $(this);
				var disL = e.clientX - $(this).position().left;
				currentObj._domTemplate.mousemove(function(e){
					e.preventDefault();
					var l = e.clientX - disL;
					if(l < 40){
						l = 40;
					}else if(l > 322){
						l = 322;
					}
					setWidth();
					that.css('left',l + "px");
					that.left = l;
				})
				currentObj._domTemplate.mouseup(function(e){
					
					currentObj._domTemplate.unbind();
				})
			});
			function setWidth(){
				var l1 = betweenDom.find('.circle').eq(0).position().left;
				var l2 = betweenDom.find('.circle').eq(1).position().left;
				var width = Math.abs(l1 - l2);
				var min = Math.min(l1,l2);
				//var max = Math.max(l1,l2);
				var minT = Math.ceil((l1 - 40)/282*(dataObj.colMaxValue - dataObj.colMinValue) + dataObj.colMinValue);
				var maxT = Math.ceil((l2 - 40)/282*(dataObj.colMaxValue - dataObj.colMinValue) + dataObj.colMinValue);
				betweenDom.find('.time1').css('left',l1 - 8 +'px').text(minT);
				betweenDom.find('.time2').css('left',l2 - 8 +'px').text(maxT);
				betweenDom.find('.progress').css({'width':width + 'px','left':min + 8 + 'px'});
			};			
			var LTEDom = this._domTemplate.find(".ey-countContentLTE");
			var LTEChild =	$("<div class='progressBar'>"
					+"<span>"+dataObj.colMinValue+"</span>"
					+"<span></span>"
					+"<span>"+dataObj.colMaxValue+"</span>"
					+"</div>"
					+"<div class='circle1 circle'></div>"
					+"<div class='progress'></div>"
					+"<div class='time1'>"+dataObj.colMinValue+"</div>"
				);
			LTEDom.append(LTEChild);			
			LTEDom.find('.circle').mousedown(function(e){
				var that = $(this);
				var disL = e.clientX - $(this).position().left;
				currentObj._domTemplate.mousemove(function(e){
					e.preventDefault();
					var l = e.clientX - disL;
					if(l < 40){
						l = 40;
					}else if(l > 322){
						l = 322;
					}
					setLTEWidth();
					that.css('left',l + "px");
				})
				currentObj._domTemplate.mouseup(function(e){
					currentObj._domTemplate.unbind();
				})
			});
			function setLTEWidth(){
				var l1 = LTEDom.find('.circle').eq(0).position().left;
				var width = Math.abs(l1);
				var min = Math.min(l1);
				var minT = Math.ceil((l1 - 40)/282*(dataObj.colMaxValue - dataObj.colMinValue) + dataObj.colMinValue);
				LTEDom.find('.time1').css('left',l1 - 8 +'px').text(minT);
				LTEDom.find('.progress').css({'width':l1 - 32 + 'px','left':'40px'});
			}
			var GTEDom = this._domTemplate.find(".ey-countContentGTE");
			var GTEChild =	$("<div class='progressBar'>"
					+"<span>"+dataObj.colMinValue+"</span>"
					+"<span></span>"
					+"<span>"+dataObj.colMaxValue+"</span>"
					+"</div>"
					+"<div class='circle1 circle'></div>"
					+"<div class='progress'></div>"
					+"<div class='time1'>"+dataObj.colMinValue+"</div>"
				);
			GTEDom.append(GTEChild);			
			GTEDom.find('.circle').mousedown(function(e){
				var that = $(this);
				var disL = e.clientX - $(this).position().left;
				currentObj._domTemplate.mousemove(function(e){
					e.preventDefault();
					var l = e.clientX - disL;
					if(l < 40){
						l = 40;
					}else if(l > 322){
						l = 322;
					}
					setGTEWidth();
					that.css('left',l + "px");
					that.left = l;
				});
				currentObj._domTemplate.mouseup(function(e){
					currentObj._domTemplate.unbind();
				});
			});
			function setGTEWidth(){
				var l1 = GTEDom.find('.circle').eq(0).position().left;
				var width = Math.abs(l1);
				var min = Math.min(l1);
				var minT = Math.ceil((l1 - 40)/282*(dataObj.colMaxValue - dataObj.colMinValue) + dataObj.colMinValue);
				GTEDom.find('.time1').css('left',l1 - 8 +'px').text(minT);
				GTEDom.find('.progress').css({'width':331 - width + 'px','left':min + 8 + 'px'});
			}
			//值回显
			if( this._value && "colId"  in  this._value  &&  this._value.value){
				var value = this._value.colValue;
				switch (this._value.operateType){
				//第一个Dom
				case "BETWEEN":
					this._domTemplate.find(".ey-searchOrdinaryHeader span").eq(0).addClass("ey-countChecked").removeClass("ey-countCheck").siblings().removeClass("ey-countChecked").addClass("ey-countCheck");
					this._domTemplate.find(".ey-countContentBetween").show();
					this._domTemplate.find(".ey-countContentBetween").siblings().hide();
					this._domTemplate.find(".ey-countContentBetween").find('.circle').eq(0).css("left", value[0]/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 40 + "px");
				 	this._domTemplate.find(".ey-countContentBetween").find('.circle').eq(1).css("left", value[1]/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 40 + "px");
				 	this._domTemplate.find(".ey-countContentBetween").find(".time1").eq(0).text(value[0]).css('left',value[0]/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 32 + 'px');
				 	this._domTemplate.find(".ey-countContentBetween").find(".time2").eq(0).text(value[1]).css('left',value[1]/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 32 +'px'); 
				 	this._domTemplate.find('.ey-countContentBetween .progress').css({'width': (value[1] - value[0])/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 'px','left':value[0]/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 48 + 'px'});
				 	break;
				//第二个Dom
				case "LTE":
					this._domTemplate.find(".ey-searchOrdinaryHeader span").eq(1).addClass("ey-countChecked").removeClass("ey-countCheck").siblings().removeClass("ey-countChecked").addClass("ey-countCheck");
					this._domTemplate.find(".ey-countContentLTE").show();
					this._domTemplate.find(".ey-countContentLTE").siblings().hide();
					this._domTemplate.find(".ey-countContentLTE").find('.circle').eq(0).css("left", (value[0] - dataObj.colMinValue)/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 40 + "px");
					this._domTemplate.find(".ey-countContentLTE").find(".time1").eq(0).text(value[0]).css('left',value[0]/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 32 + 'px');
					this._domTemplate.find('.ey-countContentLTE .progress').css({'width': value[0]/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 'px','left':'40px'});
					break;
				//第三个Dom
				case "GTE":
					this._domTemplate.find(".ey-searchOrdinaryHeader span").eq(2).addClass("ey-countChecked").removeClass("ey-countCheck").siblings().removeClass("ey-countChecked").addClass("ey-countCheck");
					this._domTemplate.find(".ey-countContentGTE").show();
					this._domTemplate.find(".ey-countContentGTE").siblings().hide();
					this._domTemplate.find(".ey-countContentGTE").find('.circle').eq(0).css("left", (value[0] - dataObj.colMinValue)/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 40 + "px");
					this._domTemplate.find(".ey-countContentGTE").find(".time1").eq(0).text(value[0]).css('left',(value[0] - dataObj.colMinValue)/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 32 + 'px');;
					this._domTemplate.find('.ey-countContentGTE .progress').css({'width': 292 - value[0]/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 'px','left':value[0]/(dataObj.colMaxValue - dataObj.colMinValue) * 282 + 48 + 'px'});
					break;	
				default:
					break;
			}
				
			}
			
		},
		//添加蒙层的私有方法
		_appendToBody:function(eyTooltip){
			$("body").append(eyTooltip);	
		}, 
		  		 
    };
    ey.widget.eyCount = function(args){
    	
    	return new EyCount(args);
    };
       
})($,ey);