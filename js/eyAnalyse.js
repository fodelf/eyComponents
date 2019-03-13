/*!
 * eyAnalyse JavaScript Library v1
 *
 * Includes jquery.js
 * https://jquery.com
 *
 * Includes echarts.js
 * http://echarts.baidu.com/
 * 
 * Copyright NanJing YT Co
 *
 * Author : 吴文周
 * 
 * Date: 2017-03-13
 */
(function(win){
	"use strict";
	//版本号
	var version = "1.1.1",
	    //基类
	    EyAnalyse = function(){
	    	//UI组件集合，组件里面实现MVC
		    this.widget = {};
		    //事件集合
		    this.eventLibrary = {};
		    //属性集合
		    this.property = {};
		    //数据集合
		    this.data = {};
		    //编辑状态
		    this.development = {};
		    //应用状态
		    this.application = {};
	    };
	//原型扩展    
	EyAnalyse.fn = EyAnalyse.prototype = {
		//构造器斧正
		constructor: EyAnalyse,
		//版本信息
		eyAnalyse: version,
	};
	/**
	 * 继承基类方法
	 * @param {Object} childFun 子对象构造函数
	 * @param {String} baseName 父对象名称
	 * @param {String} parentType 父对象类型
	 * @method extendFun
	 */
	EyAnalyse.extendFun = EyAnalyse.fn.extendFun = function(childFun,baseName,type){
		var baseFun = this[type][baseName];
			if(typeof baseFun ==="function"){
				var baseFunPro = baseFun.prototype;
				this.expandPrototype(childFun,baseFunPro);			
			}
			else{
				console.log("this parent   " + baseName  +" is undefind");
			};		
	};
	/**
	 * 继承基类属性
	 * @param {Object} caller 子对象
	 * @param {String} parentName 父名称 
	 * @param {String} type 父类型
	 * @param {Object} args 参数
	 * @method extendProperty
	 */
	EyAnalyse.extendProperty = EyAnalyse.fn.extendProperty = function(caller,baseName,type,args){
		var parentFun = this[type][baseName];	
		if(typeof parentFun === "function"){
			    parentFun.apply(caller,args||[]);
		}
	};
	/**
	 * 扩展构造函数的原型链
	 * @param {Object} FunClass 扩展构造函数
	 * @param {String} obj 被扩展对象
	 * @method expandPrototype
	 */
	EyAnalyse.expandPrototype = EyAnalyse.fn.expandPrototype = function(FunClass,obj){
		if( typeof FunClass ==="function" && typeof obj === "object"){
			var funpro = FunClass.prototype;
			for(var k in obj){
                funpro[k] = obj[k];
			};					
		}
	};
	/**
	 *使用其他对象方法执行当前操作
	 * @param {Object} caller 执行的对象
	 * @param {String} baseName  执行的基础
	 * @param {String} baseType 执行的类型
	 * @param {String} funName 执行的方法名
	 * @param {Object} args 执行的参数
	 * @param {String} actionType 执行的函数类型是否有返回值
	 * @method callFunction
	 */
	EyAnalyse.callFunction = EyAnalyse.fn.callFunction = function(caller,baseName,baseType,funName,args,actionType){		
		var baseObj =  this[baseType][baseName].prototype;
		var baseFun = baseObj[funName];
		if(typeof baseFun === "function"){
			//根据执行类型是否有返回确定执行操作
			if(!actionType){
				baseFun.call(caller,args||[]);
			}
			else{
				return  baseFun.call(caller,args||[]); 
			}
		};
	};	
	/**
	 * 性能优化之清除属性
	 * @param {Object} obj 扩展对象
	 * @param {Object} attr 被扩展对象
	 */
	EyAnalyse.deletAttr = EyAnalyse.fn.deletAttr= function(obj,attr){
		if(typeof obj === "object" &&  typeof attr === "string" &&  obj.hasOwnProperty(attr)){
			delete obj[attr];
		}	
	};
	/**
	 * 性能优化之清除方法(待选)
	 * @param {Object} obj 扩展对象
	 * @param {Object} fun 被扩展对象
	 */
	EyAnalyse.deletFun = EyAnalyse.fn.deletFun= function(obj,fun){
		if(typeof obj === "object" &&  typeof fun === "string"){
			//delete obj.__proto__[fun];
			//ie不支持，后续优化
		}	
	};
	//基类对象实例
	var ey = new EyAnalyse();
	//抛出全局变量
    win.ey = ey;
})(window);
//(function(d){var a=function(){this.widget={};this.eventLibrary={};this.property={};this.data={};this.development={};this.application={}};a.fn=a.prototype={constructor:a,eyAnalyse:"1.1.1"};a.extendFun=a.fn.extendFun=function(a,b,c){c=this[c][b];var g=c.prototype;c?this.expandPrototype(a,g):console.log("this parent   "+b+" is undefind")};a.extendProperty=a.fn.extendProperty=function(a,b,c,e){this[c][b].apply(a,e||[])};a.expandPrototype=a.fn.expandPrototype=function(a,b){if("function"===typeof a&&"object"===
//typeof b){a=a.prototype;for(var c in b)a[c]=b[c]}};a.callFunction=a.fn.callFunction=function(a,b,c,e,f,d){b=this[c][b].prototype[e];if("function"===typeof b){if(d)return b.call(a,f||[]);b.call(a,f)}};a.deletAttr=a.fn.deletAttr=function(a,b){"object"===typeof a&&"string"===typeof b&&delete a[b]};a.deletFun=a.fn.deletFun=function(a,b){"object"===typeof a&&"string"===typeof b&&delete a.__proto__[b]};a=new a;d.ey=a})(window);