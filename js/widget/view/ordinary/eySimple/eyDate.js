/*!
* Instruction :文本框组件
* 
* Author : 吴文周
* 
* Date: 2017-03-20
*/
(function($,ey){
	"use strict";
	
    var EyDate = function(args){
    	ey.extendProperty(this,"view","widget",[args]);
    	//dom模板
//    	this._domTemplate = $("<div class='ey-label ey-widget'><div class ='ey-chartsLayer'></div><a href='javascript:;' class='ey-labelContent'>我是标题</a></div>");
    	this._domTemplate = $("<div class='ey-dayRange'>"
				+"<div class='date_select'><span>开始日期</span><input type='text' onClick='WdatePicker()' class='date'>"
				+"<span>结束日期</span><input type='text' onClick='WdatePicker()' class='date'></div>"
				+"<p>默认显示范围</p>"
				+"<ul class='clearfix'><li>今天</li><li>昨天</li><li>最近一周</li><li>最近一个月</li>"
				+"<li>本周</li><li>本月</li></ul><div class='customRange'>"
				+"<div><span>T</span><span>-</span><span class='self_day'>0</span><span>天</span><span class='dayUp'></span><span class='dayDown'></span></div>"
				+"<div class='wave'>~</div>"
				+"<div><span>T</span><span>-</span><span class='self_day'>0</span><span>天</span><span class='dayUp'></span><span class='dayDown'></span></div></div>"
				+"<div class='tips'>说明：T 代表今天，T-1 代表昨天</div></div>");
    	//组件名
    	this.widgetName = "eyDate";
    	this.isTheme = true;
    };
    //继承组件基类
    ey.extendFun(EyDate,"view","widget");
    //扩展当前组件
    ey.expandPrototype(EyDate,{

		//设置文本框高度
		setDomHeight : function(height){
			//调用基类设置
			ey.callFunction(this,"view","widget","setDomHeight",height);
			this._domTemplate.find(".ey-labelContent").css({
				"line-height":height + 'px',
			});			
		},
		domInit:function(){
			ey.callFunction(this,"view","widget","domInit");
			var that = this;
			var dateInput = that._domTemplate.find('input');
			var li = that._domTemplate.find('li');
			li.click(function(){
				li.removeClass('active');
				$(this).addClass('active');
			})
			dateInput.focus(function(){
				li.removeClass('active');
			})
			
//			今天
			li.eq(0).click(function(){
				dateInput.eq(0).val(that.getToday());
				dateInput.eq(1).val(that.getToday());
			})
			
//			昨天
			li.eq(1).click(function(){
				dateInput.eq(0).val(that.getYesterday());
				dateInput.eq(1).val(that.getYesterday());
			})
			
//			最近一周
			li.eq(2).click(function(){
				dateInput.eq(0).val(that.getLastWeek()[0]);
				dateInput.eq(1).val(that.getLastWeek()[1]);
			})
			
//			最近一个月
			li.eq(3).click(function(){
				dateInput.eq(0).val(that.getLastMonth()[0]);
				dateInput.eq(1).val(that.getLastMonth()[1]);
			})
			
//			本周
			li.eq(4).click(function(){
				dateInput.eq(0).val(that.getThisWeek()[0]);
				dateInput.eq(1).val(that.getThisWeek()[1]);
			})
			
//			本月
			li.eq(5).click(function(){
				dateInput.eq(0).val(that.getThisMonth()[0]);
				dateInput.eq(1).val(that.getThisMonth()[1]);
			})
			
//			自定义日期
			this._domTemplate.find('.dayUp').eq(0).click(function(){
				var val = that._domTemplate.find('.self_day').eq(0).text();
				val++;
				that._domTemplate.find('.self_day').eq(0).text(val);
				var today = new Date();
				var today_date = today.getDate();
				today.setDate(today_date - val);
				var month = today.getMonth();
				var year = today.getFullYear();
				var newday = today.getDate();
				dateInput.eq(0).val(year + "-" + (month+1) + "-" + newday);
				
			})
			this._domTemplate.find('.dayUp').eq(1).click(function(){
				var val = that._domTemplate.find('.self_day').eq(1).text();
				val++;
				that._domTemplate.find('.self_day').eq(1).text(val);
				var today = new Date();
				var today_date = today.getDate();
				today.setDate(today_date - val);
				var month = today.getMonth();
				var year = today.getFullYear();
				var newday = today.getDate();
				dateInput.eq(1).val(year + "-" + (month+1) + "-" + newday);
			})
			this._domTemplate.find('.dayDown').eq(0).click(function(){
				var val = that._domTemplate.find('.self_day').eq(0).text();
				if(val == '0'){
					val = 0;
				}else{
					val--;
				}
				that._domTemplate.find('.self_day').eq(0).text(val);
				var today = new Date();
				var today_date = today.getDate();
				today.setDate(today_date + val);
				var month = today.getMonth();
				var year = today.getFullYear();
				var newday = today.getDate();
				dateInput.eq(0).val(year + "-" + (month+1) + "-" + newday);
			})
			this._domTemplate.find('.dayDown').eq(1).click(function(){
				var val = that._domTemplate.find('.self_day').eq(1).text();
				if(val == '0'){
					val = 0;
				}else{
					val--;
				}
				that._domTemplate.find('.self_day').eq(1).text(val);
				var today = new Date();
				var today_date = today.getDate();
				today.setDate(today_date + val);
				var month = today.getMonth();
				var year = today.getFullYear();
				var newday = today.getDate();
				dateInput.eq(1).val(year + "-" + (month+1) + "-" + newday);
			})
			
			dateInput.on('change',function(){
			})
			//设置默认值为昨天
			dateInput.eq(0).val(that.getYesterday());
			dateInput.eq(1).val(that.getYesterday());
		},
		getToday:function(){
			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth();
			var day = today.getDate();
			this._domTemplate.find('.self_day').eq(0).text('0');
			this._domTemplate.find('.self_day').eq(1).text('0');
			var time = new Date(year,month,day).toLocaleDateString();
			return this.addZero(time);
//			return year + '-' + this.addZero(month+1) + '-' + this.addZero(day);
		},
		getYesterday:function(){
			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth();
			var day = today.getDate();
			this._domTemplate.find('.self_day').eq(0).text('1');
			this._domTemplate.find('.self_day').eq(1).text('1');
			var time = new Date(year,month,day-1).toLocaleDateString();
			return this.addZero(time);
//			return year + '-' + this.addZero(month+1) + '-' + this.addZero(day-1);
		},
		getLastWeek:function(){
			var section = []
			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth();
			var day = today.getDate();
			var end = new Date(year,month,day).toLocaleDateString();
			var begin = new Date(year,month,day-6).toLocaleDateString();
			this._domTemplate.find('.self_day').eq(0).text('6');
			this._domTemplate.find('.self_day').eq(1).text('0');
			section.push(this.addZero(begin),this.addZero(end));
			return section;
		},
		getLastMonth:function(){
			var section = []
			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth();
			var day = today.getDate();
			var end =  new Date(year,month,day).toLocaleDateString();
//			if(month == 0){
//				month = 12;
//				year--;
//			}
			var begin = new Date(year,month-1,day).toLocaleDateString();
			var lastMonthDay = new Date(year,month,0).getDate();
			this._domTemplate.find('.self_day').eq(0).text(lastMonthDay);
			this._domTemplate.find('.self_day').eq(1).text('0');
			section.push(this.addZero(begin),this.addZero(end));
			return section;
		},
		getThisWeek:function(){
			var section = []
			var today = new Date;
			var year = today.getFullYear();
			var month = today.getMonth();
			var today_day = today.getDate();
			var day = today.getDay();
			var week = "0123456";
			var end = new Date(year,month,today_day).toLocaleDateString();
			var first = 0 - week.indexOf (day);
			var begin = new Date(year,month,today.getDate () + first).toLocaleDateString();
			section.push(this.addZero(begin),this.addZero(end));
			this._domTemplate.find('.self_day').eq(0).text(day);
			this._domTemplate.find('.self_day').eq(1).text('0');
			return section;
		},
		getThisMonth:function(){
			var section = []
			var today = new Date;
			var year = today.getFullYear();
			var month = today.getMonth();
			var day = today.getDate();
			var begin = new Date(year,month,1).toLocaleDateString();
			var end = new Date(year,month,day).toLocaleDateString();
			section.push(this.addZero(begin),this.addZero(end));
			this._domTemplate.find('.self_day').eq(0).text(day-1);
			this._domTemplate.find('.self_day').eq(1).text('0');
			return section;
		},
		addZero:function(num){
			var arr = num.split("-");
			var arr_time = [];
			var str = "";
			$.each(arr,function(index,value){
				if(value < 10){
					value = "0" + value;
				}else{
					value = value;
				}
				arr_time.push(value);
			})
			for(var i = 0;i < arr_time.length - 1;i++){
				str += arr_time[i] + "-";
			}
			str += arr_time[arr_time.length - 1];
			return str;
		},
		// 获取当前组件的值
		getValue: function(){
			var resultArry = [];
			var dateInput = this._domTemplate.find('input');
			var valueStart = this._formart(dateInput.eq(0).val());
			var valueEnd = this._formart(dateInput.eq(1).val());
			resultArry[0] = valueStart;
			resultArry[1] = valueEnd;
			return  resultArry;
		},
		//状态值回读设置
		setValue:function(value){
			if(value.length > 0){
				var dateInput = this._domTemplate.find('input');
				var valueStart = this._formartBack(value[0]);
				var valueEnd = this._formartBack(value[1]);
				dateInput.eq(0).val(valueStart);
				dateInput.eq(1).val(valueEnd);
				
				
			}
		},
		_formartBack:function(value){
			var valueArry = value.split("");
			var stringYear = "" + valueArry[0] + valueArry[1] + valueArry[2] +valueArry[3];
			var stringMounth  = "" + valueArry[4] + valueArry[5];
			var stringDay  = "" + valueArry[6] + valueArry[7];
			var resultValue = stringYear + "-" + stringMounth + "-" + stringDay;
			return  resultValue;
		},
		//时间格式化
		_formart : function(value){
		   var  valueArry = 	value.split("-");
//		   if(valueArry[1] < 10){
//			   valueArry[1]  = "0" + valueArry[1];
//		   };
//		   if(valueArry[2] < 10){
//			   valueArry[2]  = "0" + valueArry[2];
//		   };
		   var  resultString = valueArry.join("") + "000000";
		   
		   return resultString;
		   
		}
    });
    ey.widget.eyDate = function(arg){
    	
    	return new EyDate(arg);
    };
       
})($,ey);