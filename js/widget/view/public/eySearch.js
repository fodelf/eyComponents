/*!
* Instruction : 查询复杂组件
* 
* Author : 吴文周
* 
* Date: 2017-04-13
*/
(function($,ey){
	"use strict";
	
    var EySearch = function(args){
    	//dom模板
    	this._domTemplate = $("<footer>"
    						+"<div class='ey-backLayer'></div>"
							+"<div class='ey-contLayer ey-searchTooltip'>"
							+"<h5 class='ey-tooltipTitle'>"
							+"<span id = 'ey-searchCom' class='ey-searchCheacked'>常规</span><span id = 'ey-searchMap'>通配符</span>"
							+"</h5>"
							+"<div class='ey-searchContent'>"
							+"<div class='ey-searchOrdinary'>"
							+"<div class='ey-searchOrdinaryHeader'><input  id = 'ey-searchInput'/></div>"
							+"<div class='ey-searchOrdinaryContent'></div>"
							+"<div class='ey-searchOrdinaryFooter'><span><input type='checkbox' checked='checked' id= 'ey-searchCheck'/><label>全选</label></span><span><input type='checkbox' id='ey-eliminate'/><label>排除</label></span></div>"
							+"</div>"
							+"<div class='ey-searchOther'>"
							+"<div class='ey-searchOtherOrdinary'>"
							+"<div class='ey-searchOrdinaryHeader'><input  id = 'ey-searchInputOther'/></div>"
							+"<div class='ey-searchOtherContent'>"
							+"<span><input type='radio'name = 'attrSearch' value='LIKE' checked='checked'/><label>包含</label></span>"
							+"<span><input type='radio'name = 'attrSearch' value='LLIKE' /><label>开头为</label></span>"
							+"<span><input type='radio'name = 'attrSearch' value='RLIKE'/><label>结尾为</label></span>"
							+"<span><input type='radio'name = 'attrSearch' value='EQ' /><label>精确匹配</label></span>"
							+"<span><input type='radio'name = 'attrSearch' value='NULL'/><label>为空</label></span>"
							+"</div>"
							+"<div class='ey-searchOrdinaryFooter'></span><span><input type='checkbox' id='ey-otherEliminate'/><label>排除</label></span></div>"
							+"</div>"
							+"</div>"
							+"</div>"
							+"<p id='ey-tooltipButtonLine'><button class='ey-commitBtn ey-btn'>确定</button><button class='ey-cancelBtn ey-btn'>取消</button></p>"							
							+"</div>"
							+"</div>"
							+"</footer>")
    	//弹出框标题
//  	this._eyTooltipTitle = args.title;
    	//弹出框内容
//  	this._eyTooltipContent = args.content;
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
    EySearch.prototype = {
    	
    	awake:function(){
			var eySearchDom = this._domTemplate;
	
			eySearchDom.find("h5 > span").html(this._eyTooltipTitle);
//			eyTooltip.find("h5").after(this._eyTooltipContent);
			eySearchDom.find('.ey-contLayer').addClass(this._eyTooltipClass);
			var currentObj = this;
			//取消确定 绑定
			eySearchDom.find(".ey-cancelBtn").on("click",function(){
				currentObj._cancleCallback();
			});
			eySearchDom.find(".ey-commitBtn").on("click",function(){
				currentObj._commitCallback();
			});
			this._appendToBody(eySearchDom);
		},
		//取值
		getValue : function(){
			var eySearchDom = this._domTemplate;
			var arry = [];
			if(!eySearchDom.find(".ey-searchOrdinary").is(":hidden")){
				eySearchDom.find(".ey-searchOrdinaryContent input").each(function(){
					 if((!$(this).is(":hidden"))&& $(this).is(":checked")){
					 	var value = $(this).val();
					 	arry.push(value);
					 }
				});
			}
			else{
				var value = eySearchDom.find("#ey-searchInputOther").val();
				arry.push(value);
			}
			return arry;
		},
		getIsReversed : function (){
			var isReversed  = false;
			var eySearchDom = this._domTemplate;
			if(!eySearchDom.find(".ey-searchOrdinary").is(":hidden")){
				isReversed = this._domTemplate.find("#ey-eliminate").is(":checked");
			}
			else{
				isReversed = this._domTemplate.find("#ey-otherEliminate").is(":checked");
			}
			return isReversed;
		},
		getOperateType : function(){
			var operateType = "IN";
			var eySearchDom = this._domTemplate;
			if(!eySearchDom.find(".ey-searchOrdinary").is(":hidden")){
				operateType = "IN";
			}
			else{
				eySearchDom.find(".ey-searchOtherContent input").each(function(){
					if($(this).is(":checked")){
						operateType = $(this).val();
					}
				});
			}
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
				currentObj._addDOM (data)};
			this.dataProces.queryDimData(config);
		},
		_addDOM:function(dataObj){
			var dataObj = dataObj.resultList;
			var eySearchDom = this._domTemplate;
			var currentObj = this;
			if(this._value && ( "operateType"  in  this._value ) &&  this._value.operateType != "IN" && this._value.value){
				var dom = this._domTemplate;
				dom.find("#ey-searchInputOther").val(currentObj._value.colValue);
				dom.find(".ey-searchOtherContent input").each(function(){
					if($(this).prop("value") == currentObj._value.operateType){
						$(this).prop("checked",true);
					}
				});
				dom.find("#ey-searchCom").removeClass("ey-searchCheacked");
				dom.find("#ey-searchMap").addClass("ey-searchCheacked");
				dom.find(".ey-searchOrdinary").hide();
				dom.find(".ey-searchOther").show();
				dom.find("#ey-otherEliminate").prop("checked",currentObj._value.isReversed);
			}
			var domConten = this._domTemplate.find(".ey-searchOrdinaryContent");
			for(var i= 0 ,len = dataObj.length; i < len ; i ++ ){
				var divDom = $("<div></div>");
				var inputDom = $("<input type='checkbox'/>"); 
				inputDom.val(dataObj[i].colCode);
				if( this._value && ( "colId"  in  this._value )  && this._value.operateType == "IN" &&  this._value.value){
					var value = this._value.colValue;
					var defaultValue = false;
					for(var k = 0 , klen = value.length ; k < klen; k++ ){
							if(value[k] == dataObj[i].colName){
								defaultValue = true;
								break ;
							}
					}
					if(defaultValue){
						inputDom.prop("checked",true);
					}
					else{
						eySearchDom.find("#ey-searchCheck").prop("checked",false);
						inputDom.prop("checked",false);
					}
					this._domTemplate.find("#ey-eliminate").prop("checked",currentObj._value.isReversed);
				}
				else{
					inputDom.prop("checked",true);
				}
				var labelDom = $("<label></label>"); 
				labelDom.text(dataObj[i].colName);
				divDom.append(inputDom);
				divDom.append(labelDom);
				domConten.append(divDom);
				
			};
			//改变事件绑定				
			eySearchDom.find(".ey-searchOrdinaryContent input").each(function(){
				$(this).bind("change",function(){
					eySearchDom.find(".ey-searchOrdinaryContent input").each(function(){
						//有个不选中改变全选的状态
						if((!$(this).is(":hidden")) && !$(this).is(":checked")){
							eySearchDom.find("#ey-searchCheck").prop("checked",false);
						}
					})
				});
			});
			
			eySearchDom.find("#ey-searchCheck").bind("change",function(){
				if((!$(this).is(":hidden")) && $(this).is(":checked")){
					eySearchDom.find(".ey-searchOrdinaryContent input").each(function(){
						$(this).prop("checked",true);
					});
				}
				else{
					eySearchDom.find(".ey-searchOrdinaryContent input").each(function(){
						$(this).prop("checked",false);
					});
				}
			});
			
			eySearchDom.find("#ey-searchInput").bind("input",function(){
				var value = $(this).val();
				if(!value){
					eySearchDom.find(".ey-searchOrdinaryContent div").show();
				}
				else{
					eySearchDom.find(".ey-searchOrdinaryContent label").each(function(){
						if($(this).text().indexOf(value) >= 0){
							$(this).parent().show();
						}
						else{
							$(this).parent().hide();
						}
					})
				}
			});
			
			eySearchDom.find("#ey-searchCom").bind("click",function(){
				$(this).addClass("ey-searchCheacked");
				$(this).siblings().removeClass("ey-searchCheacked");
				eySearchDom.find(".ey-searchOther").hide();
				eySearchDom.find(".ey-searchOrdinary").show();
			});
			eySearchDom.find("#ey-searchMap").bind("click",function(){
				$(this).addClass("ey-searchCheacked");
				$(this).siblings().removeClass("ey-searchCheacked");
				eySearchDom.find(".ey-searchOrdinary").hide();
				eySearchDom.find(".ey-searchOther").show();
			});
		},
		//添加蒙层的私有方法
		_appendToBody:function(eyTooltip){
			$("body").append(eyTooltip);	
		},
		  		 
    };
    ey.widget.eySearch = function(args){
    	
    	return new EySearch(args);
    };
       
})($,ey);