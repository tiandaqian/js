/*
返回指定的参数
*/
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
/*
change to specify page div
*/
function toPage(x){
	$(".page").hide();
	if((x | 0) === x){
		// if the param x is a number, It's the index of page
		$(".page").eq(x).show();
		$("body").css("background",$(".page").eq(x).attr("color"));
	}else{
		// if the param x is a String, It's the id of page
		$("#" + x).show();
		$("body").css("background",$("#" + x).attr("color"));
	}
}

function popBox(x){
	$(".box").hide();
	$(".box").eq(x).show();
}

function commoninit(x){
	$(".page").each(function(obj){
		$(this).css("background","url(" + $(this).attr("bg") + ")");
		$(this).css("background-size","100% auto");
		$(this).css("background-repeat","no-repeat");
		$(this).css("height", "100vh");
	});
	
	$(".box").each(function(obj){
		$(this).css("background","url(" + $(this).attr("bg") + ")");
		$(this).css("background-size","100% auto");
		$(this).css("background-repeat","no-repeat");
		$(this).css("height", "100vh");
	});
	
	$(".close").each(function(){
		$(this).css("top", ( $(this).attr("_top") / 32 ) + "vw");
		$(this).css("left", ( $(this).attr("_left") / 32 ) + "vw");
		$(this).css("width", ( $(this).attr("_width") / 32 ) + "vw");
		$(this).css("height", ( $(this).attr("_height") / 32 ) + "vw");
	});
	
	$(".close").click(function(){
		$(this).parent().hide();
	});
	
	$(".image").each(function(obj){
		$(this).css("position", "absolute");
		$(this).css("top", ( $(this).attr("_top") / 32 ) + "vw");
		$(this).css("left", ( $(this).attr("_left") / 32 ) + "vw");
		$(this).css("width", ( $(this).attr("_width") / 32 ) + "vw");
		if($(this).data("page")!=null){
			$(this).click(function(){
				toPage($(this).data("page"));
			});
		}
		
	});
	
	$(".txt").each(function(obj){
		$(this).css("position", "absolute");
		$(this).css("top", ( $(this).attr("_top") / 32 ) + "vw");
		$(this).css("left", ( $(this).attr("_left") / 32 ) + "vw");
		$(this).css("width", ( $(this).attr("_width") / 32 ) + "vw");
		if($(this).attr("_height")!=null){
			$(this).css("height", ( $(this).attr("_height") / 32 ) + "vw");
		};
		$(this).css("font-size", ( $(this).attr("_size") / 32 ) + "vw");
		$(this).css("color", $(this).attr("_color"));
	});
	
	$(".ipt").each(function(obj){
		$(this).css("position", "absolute");
		$(this).css("font-size", ( $(this).attr("_size") / 32 ) + "vw");
		$(this).css("color", $(this).attr("_color"));

		$(this).val($(this).attr("_tip"));
		$(this).css("top", ( $(this).attr("_top") / 32 ) + "vw");
		$(this).css("left", ( $(this).attr("_left") / 32 ) + "vw");
		$(this).css("width", ( $(this).attr("_width") / 32 ) + "vw"); 
		$(this).css("height", ( $(this).attr("_height") / 32 ) + "vw");
		$(this).css("border", 0);
		$(this).css("padding", "0.3vw");
		$(this).css("font-size", ( $(this).attr("_size") / 32 ) + "vw");
		$(this).css("border-radius", 0);
		$(this).focus(function(){
			if($(this).val() == $(this).attr("_tip")){
				$(this).val("");
			}
		});
		$(this).blur(function(){
			if($(this).val() == ""){
				$(this).val($(this).attr("_tip"));
			}
		});
	});

	$(".ipts").each(function(obj){
		$(this).css("position", "absolute");
		$(this).css("font-size", ( $(this).attr("_size") / 32 ) + "vw");
		$(this).css("color", $(this).attr("_color"));

		$(this).val($(this).attr("_tip"));
		$(this).css("top", ( $(this).attr("_top") / 32 ) + "vw");
		$(this).css("left", ( $(this).attr("_left") / 32 ) + "vw");
		$(this).css("width", ( $(this).attr("_width") / 32 ) + "vw"); 
		$(this).css("height", ( $(this).attr("_height") / 32 ) + "vw");
		$(this).css("border", 0);
		$(this).css("padding", "0.3vw");
		$(this).css("font-size", "1vw");
		$(this).css("border-radius", 0);
		$(this).focus(function(){
			if($(this).val() == $(this).attr("_tip")){
				$(this).val("");
			}
		});
		$(this).blur(function(){
			if($(this).val() == ""){
				$(this).val($(this).attr("_tip"));
			}
		});
	});
	
	toPage(x);
}

function toggle_img_src(selector,img1,img2){
	var d = new Date();
	if(d.getMilliseconds()>500){
		$(selector).attr("src",img1)
	}else{
		$(selector).attr("src",img2)
	}
	setTimeout("toggle_img_src('" + selector + "','" + img1 + "','" + img2 + "')",100);
}

function closeMe(obj){
	$(obj).parent().hide();
}

function valid(obj){
	var ok = true;
	$(obj).find("input").each(function(){
		if("string" == $(this).attr("_valid")){
			if("" == $(this).val() || $(this).attr("_tip") == $(this).val()){
				alert("\"" + $(this).attr("_tip") + "\"不能为空");
				$(this).focus();
				ok = false;
				return false;
			}
		}else if("ident" == $(this).attr("_valid")){
			var check = /(^\d{15}$)|(^\d{17}(\d|x|X)$)/i.test($(this).val());
			if(!check){
				alert("\"" + $(this).attr("_tip") + "\"不是身份证");
				$(this).focus();
				ok = false;
				return false;
			}
		}else if("tel" == $(this).attr("_valid")){
			var check = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/.test($(this).val());
			var check2 = /^1\d{10}$/.test($(this).val());
			if((!check) && (!check2)){
				alert("\"" + $(this).attr("_tip") + "\"不是电话号");
				$(this).focus();
				ok = false;
				return false;
			}
		}
	});
	if(ok){
		$(obj).find("textarea").each(function(){
			if("string" == $(this).attr("_valid")){
				if("" == $(this).val() || $(this).attr("_tip") == $(this).val()){
					alert("\"" + $(this).attr("_tip") + "\"不能为空");
					$(this).focus();
					ok = false;
					return false;
				}
			}
		});
	}
	if(ok){
		$(obj).submit();
	}
	return ok;
}
