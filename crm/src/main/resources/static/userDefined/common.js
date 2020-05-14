/**
 * @name:   系统通用方法
 * @author: djw
 * 依赖 jquery layer
 */
;(function ($,window,document){
	var aesKey="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmivtfjv2P5dJ37N8EuvKPnItAHGP12cy"
        +"VvMmlD+fvbTBzD6cCDm74LaxB7/lQP5m0n75Y7lM93auyX9GfmbXEjN9kNY56w1R31s0lo68xFoj"
        +"ys/JwFg3q429nn5abZsx9kRHXowP1o70YCwyIomt09+VBHcmBNWLmuQrqYO3QNfIsYg2SzxdsJfZ"
        +"O0R5qrXiYGZrDdx2rgDEoXB6GnZPZnlQkYL4HtSkGYfLgYHVGLdk9w6sVPq6KfRuhvp4IPG0mwcV"
        +"1VYpJMt0FI6BPoYVNQgDqEAnW5ZlJJuqwq1mIe+rG6bO7ItCPcivAY0kRX3ziwUZ6cyODJwy7Qro"
        +"2qKb2wIDAQAB";
	/*表单验证的正则和方法*/
	var formReg={
			match:function(el,type,msg){
				var val=$(el).val();
				switch(type){
					case "=":
						if(!(this==val)){return msg;}
						break;
					case ">":
						if(!(this>val)){return msg;}
						break;
					case "<":
						if(!(this<val)){return msg;}
						break;
					case ">=":
						if(!(this>=val)){return msg;}
						break;
					case "<=":
						if(!(this<=val)){return msg;}
						break;			
				}
				
			},
			custom:function(fn){
				return eval('window.'+fn+'("'+this+'")');
			},
			notBlank:function(){
					var str=this.trim();
					if(str.length==0){
						return '不能为空';
					}
				},
			maxLen:function(maxlen){
				var str=this;
				if(str.length>maxlen-0){
					return '长度不能超过'+maxlen;
				}
			},
			minLen:function(minlen){
				var str=this;
				if(str.length<minlen-0){
					return '长度不能小于'+minlen;
				}
			}
			,code:{reg:/^[a-zA-Z0-9_\-\$]*$/,msg:'只能英文,数字或-_$'}
			,email:{reg:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,msg:'邮件格式不对'}
		 	,date:{reg:/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/,msg:'必须为yyyy-MM-dd'}
		 	,datetime:{reg:/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/,msg:'必须为yyyy-MM-dd HH:mm:ss'}
		 	,time:{reg:/^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/,msg:'必须为HH:mm:ss'}
		 	,integer:{reg:/^[-+]?\d+$/,msg:'必须为整数'}
		 	,double:{reg:/^[-\+]?\d+(\.\d+)?$/,msg:'必须为小数'}
		 	,chinese:{reg:/^[\u0391-\uFFE5]+$/,msg:'必须为中文'}
		 	,number:{reg:/^[+-]?(\d|([1-9]\d+))(\.\d+)?$/,msg:'必须为数字'}
		 	,max:function(maxVal){
		 		
		 		 var reg=/^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;     
		         if(reg.test(this)){
		             if(this>maxVal-0) 
		             {     
		            	 return '不能大于'+maxVal;
		             }
		         }else{
		        	 return '必须为数字';
		         }
		 	}
		 	,min:function(minVal){
		 		 reg=/^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;     
		         if(reg.test(this)){
		             if(this<minVal-0) 
		             {     
		            	 return '不能小于'+minVal;
		             }
		         }else{
		        	 return '必须为数字';
		         }
		 	}
		 	,rang:function(minVal,maxVal){
		 		 reg=/^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;     
		         if(reg.test(this)){
		             if(this<minVal-0 || this>maxVal-0) 
		             {     
		            	 return '在'+minVal+'~'+maxVal+'之间';
		             }
		         }else{
		        	 return '必须为数字';
		         }
		 	}
	};
	window.sys= {
/*封装ajax*/
    	ajaxDo:function (obj){
    		obj.shade===undefined?obj.shade=true:0;
    		obj.showErr===undefined?obj.showErr=true:0;
    		if(obj.shade){
    			var _index = layer.load(1, {
    				shade: [0.3,'#fff'] //0.1透明度的白色背景
    			});
    			}
    		var df={
    			type:'post',
    			async:true,
    			dataType:'json',
    			contentType:'application/x-www-form-urlencoded; charset=utf-8',
    			timeout:0,
    			error:function(XMLHttpRequest,status){
         			 
         			 if(!obj.showErr){return;}
         			   if(status=='timeout'){
         				   layer.alert("等待超时,请刷新重试!");
         				}else if(XMLHttpRequest.status=="404"){
         					 layer.alert("系统错误:404,找不到路径:"+obj.url);
         			   }else if(XMLHttpRequest.status=="500"){
         				   layer.open({
         					   type: 1,
         					   title: "系统错误:500", 
         					   content: XMLHttpRequest.responseText
         					 });
         			   }else if(XMLHttpRequest.status=="401"){
         				   
         				   layer.open({
         					   type: 1,
         					   title: "请求失败", 
         					   content: '<div style="padding:20px;">'+XMLHttpRequest.responseText+'</div>',
         					   btn:["确定"],
         					   yes:function(){
         						  window.location.reload();
         					   }
         					 });
         					
         			   }else{
         				   layer.alert("系统错误,请联系管理员以解决问题。错误代码："+XMLHttpRequest.status+"\n错误信息:"+XMLHttpRequest.responseText);
         			   }
         		   }
    		};
    		$.extend(df,obj);
    		df.complete=function(XHR, TS){
    			if(obj.shade){layer.close(_index);}
    		}
    	
    		var data=df.data;
    		var pList=[];
    		var str="";
    		for(var p in data){
    			pList.push(p);
    			str+=data[p];
    		}
    
    		df.headers={"Res-Sign":hex_md5(str),"Res-Para":pList.join(",")};
    		
      		$.ajax(df);
          }
/*日期格式化*/
    ,dateFormat:function(str,format){
		if(typeof str=="string"){str=str.replace(/-/g,"/");} //ie8只接受 2018/01/02
		var date=new Date(str);
	    var paddNum = function(num){
	      return num<10?("0"+num):num;
	    };
	    //指定格式字符
	    var cfg = {
	       yyyy : date.getFullYear() //年 : 4位
	      ,yy : date.getFullYear().toString().substring(2)//年 : 2位
	      ,M  : date.getMonth() + 1  //月 : 如果1位的时候不补0
	      ,MM : paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
	      ,d  : date.getDate()   //日 : 如果1位的时候不补0
	      ,dd : paddNum(date.getDate())//日 : 如果1位的时候补0
	      ,hh : date.getHours()  //时
	      ,mm : date.getMinutes() //分
	      ,ss : date.getSeconds() //秒
	    };
	    format || (format = "yyyy-MM-dd hh:mm:ss");
	    return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m]||m;});
	}
/*日期加减函数*/
	,dateAdd:function(str,num,type){
		if(typeof str=="string"){str=str.replace(/-/g,"/");}
		var date=new Date(str);
		var n=num-0;
		switch(type){
			case 'yy' : 
				var y=date.getFullYear()+n;
				date.setYear(y);
				return date;
			case 'MM' : 
				var y=date.getFullYear();
				var m=date.getMonth()+1;
				var temp=y*12+m+n;
				date.setYear(Math.floor(temp/12));
				date.setMonth(temp%12-1);
				return date;
			case 'dd' : 
				var ms=date.getTime()+n*3600*24*1000;
				date.setTime(ms);
				return date;
			case 'hh' : 
				var ms=date.getTime()+n*3600*1000;
				date.setTime(ms);
				return date;
			case 'mm' : 
				var ms=date.getTime()+n*60*1000;
				date.setTime(ms);
				return date;
			case 'ss' : 
				var ms=date.getTime()+n*1000;
				date.setTime(ms);
				return date;
		}
	}
	,getUUID:function() {  
	    var today = new Date();
	    var id=today.getTime().toString(32)+Math.round(Math.random()*10000).toString(32);
	    return id;  
	}
	,obj2Str:function(obj){ 
		switch(typeof(obj)){ 
		case 'object':
			var ret = [];
			if (obj instanceof Array){
			 for (var i = 0, len = obj.length; i < len; i++){
			  ret.push(obj2Str(obj[i]));
			 }
			 return '[' + ret.join(',') + ']';
			}
			else if (obj instanceof RegExp){
			 return obj.toString();
			}
			else{  
			 for (var a in obj){
			  ret.push('"'+a+'"'+':' + obj2Str(obj[a]));
			 }
			 return '{' + ret.join(',') + '}';
			}
		case 'function':
			return obj.toString();
		case 'number':
			return obj.toString();
		case 'string':
			return '"' + obj.replace(/(\\|\"|\n|\r|\t)/g,function(a) {
				return ("\n"==a)?"\\n":("\r"==a)?"\\r":("\t"==a)?"\\t":("\""==a)?"\\\"":("\\"==a)?"\\\\":"";}) + '"';  
		case 'boolean':
			return obj.toString();
		case 'undefined':
			return '""';
		default:  
			return alert('对象转字符串错误'+typeof(obj));
		}  
	}
	,loadingShow:function(obj){
		if(obj){
			var el="";
			if(typeof obj=="string"){el=obj;}
			else if(typeof obj=="object"){el=obj.el;}
			  $(el).addClass("message-container");
			  $(el).append('<div class="message-shade"><div style="position: absolute;top: 40%;left: 0px;right: 0px;text-align: center;"><img src="/assets/img/loading.gif"/>'
			  			+(obj.text?'<span style="font-weight:bold;font-size:16px;color:#555;vertical-align: middle;text-shadow: 2px 2px 2px #fff;">'+obj.text+'</span>':'')+'</div></div>');
			  return;
			 
			}
		}
	,loadingHide:function(obj){
			if(obj){
				var el="";
				if(typeof obj=="string"){el=obj;}
				else if(typeof obj=="object"){el=obj.el;}
				if(el){$(el).removeClass("message-container").children(".message-shade").remove();}
			}
			
		}
	,getForm:function(el){
		var obj={};
		//不支持checkbox 与 radio
		$(el).find("input,select,textarea").each(function(i,n){
			if(n.name){
				obj[n.name]=$(n).val();
			}
		});
		return obj;
	}
	,setForm:function(el,obj){
		$(el).find("input,select,textarea").each(function(i,n){
			if(obj[n.name]!==undefined){
				$(n).val(obj[n.name]);
			}
		})
	}
	,checkForm:function(el){
		var rt=true;
		
		$(el).find("input,select,textarea").each(function(i,n){
			var $n=$(n);
			var attr=$n.attr("data-reg");
			if(attr){
				var regs=attr.split(/\s/);
				var val=$n.val();
				for(var k=0;k<regs.length;k++){
					var params=null;
					if(/^\w+\(\S+\)$/.test(regs[k])){
						params=/\(\S+\)/.exec(regs[k]);
						regs[k]=regs[k].replace(params[0],'');
						params=params[0].substr(1,params[0].length-2);
						params=params.split(",");
					}
					var fm=formReg[regs[k]];
					//$n.removeAttr('style');
					var msg;
					if(typeof(fm)=='function'){
						msg=fm.apply(val,params);
						
					}else{
						if(!fm.reg.test(val)){
							msg=fm.msg;
						}
					}
					if(msg){
						rt=false;
						layer.tips(msg, $n,{tipsMore: true});
						//$n.attr('style','box-shadow: 0 0 10px #f00');
						break;
					}
					
				}
			}
			
		})
		return rt;
	}
	// type:RSA
	, encrypt:function(type,word){
        var encrypt=new JSEncrypt();
        encrypt.setPublicKey(aesKey);
        var cc=encrypt.encrypt(word);
        return cc;
    },funDownload:function (content, filename) {
            // 创建隐藏的可下载链接
            var eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';
            // 字符内容转变成blob地址
           // var blob = new Blob([content]);
           // eleLink.href = URL.createObjectURL(blob,{content: 'text/csv;charset=UTF-8'});
            var csv = "\uFEFF" + content;
            var  blob = new Blob([csv], {type: 'text/plain'});
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            URL.revokeObjectURL(eleLink.href);
            document.body.removeChild(eleLink);
        }
};
    

})(jQuery,window,document);


