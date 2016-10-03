/**
 * Created by Administrator on 2016/9/22.
 */
define(['router','css!modules/submit-order/submit-order.css','css!modules/submit-order/iconfont.css'], function (app, css1, css2) {
    //angular会自动根据controller函数的参数名，导入相应的服务
    return app.controller('submit-orderController',['$scope', function ($scope) {
			$scope.forward = function () {
				window.history.back();
			};
//==================================================================================================
			//确认订单返回键实现功能
			//点击选择收货地址，出现收货地址页面（滑动也能返回）
			$scope.order_lj_consigneeAddress = function(){
	            $('#order_lj_consigneeAddress').animate({
	                left:'0'
	            },function(){
	                $(this).on('swipeRight',function(){
	                    $(this).animate({
	                        left:'100%'
	                    });
	                });
	            })
	        }
			//收货地址返回键实现功能
			$scope.order_lj_consigneeAddress_back = function(){
	            $('#order_lj_consigneeAddress').animate({
	                left:'100%'
	            })
	        }

			//点击选择新增地址，出现新增地址页面
			$scope.order_lj_consigneeAddress2 = function(){
	            $('#order_lj_newAddress').animate({
	                left:'0'
	            })
			}
			//新增地址返回键实现功能
			$scope.order_lj_consigneeAddress_back2 = function(){
	            $('#order_lj_newAddress').animate({
	                left:'100%'
	            })
	        }
			
			//新增地址button点击返回收货地址
				$scope.order_lj_consigneeAddress_back3 = function(){
					//判断一下input的value是否有值，没有不跳转
					var name = $('#order_lj_name').val();
					var phone = $('#order_lj_phone').val();
					var address = $('#order_lj_address').val();

					if (!(name.length==0||phone.length==0||address.length==0) && checkAddress()&& checkName() && checkPhone()) {
		//					console.log($(".newAddress_main1 input").val());
						$('#order_lj_newAddress').animate({
							left:'100%'
				})
				//动态创建地址信息
				var newAddress = $('<li><p><span></span>&nbsp;<span></span>&nbsp;&nbsp;<span></span></p><p class="newAddress"></p></li>');
				
					newAddress.find('span').eq(0).text($('.newAddress_main1 input').eq(0).val());//联系人信息
										
//					newAddress.find('span').eq(1).text($('.order_lj_sex').text());//性别信息
					
					newAddress.find('span').eq(2).text($('.newAddress_main1 input').eq(1).val());//联系电话信息
					
					newAddress.find('p').eq(1).text($('#order_lj_address').val());//收货地址信息
									
					$('#newAddress_lj_dtcj').append(newAddress);
				//input的value没有值，不跳转		
				}else{
					alert("错误：您输入的信息有误");
				}
				//联系人验证
				function checkName() {
					var name = $('#order_lj_name').val();
					if (name.length==0) {
						alert('请输入姓名');
						return false;
					}
					else {
						return true;
					}
				}
				checkName();


				//电话正则验证
				function checkPhone(){
					var phone = $('#order_lj_phone').val();
					if(! (/^1[34578]\d{9}$/.test(phone)) ){
						alert("请输入正确的/有效的电话号码,以便我们联系您");
						$('#order_lj_phone').val("");
						return false;
					}else {
						return true;
					}

				}
				checkPhone();



				//地址验证
				function checkAddress() {
					var address = $('#order_lj_address').val();
					if (address.length==0) {
						alert('请输入地址');
						return false;
					}else{
						return true;
					}
				}
				checkAddress();
				
				
	       }
			window.addEventListener('message',function (ev) {
				$("#num").html(ev.data.num);
				$("#total").html(ev.data.totalMoney);
				$("#pay").html(ev.data.totalMoney+9);
				$("#needPay1").html(ev.data.totalMoney-3);
				$("#needPay2").html(ev.data.totalMoney-3);
			});
			$scope.payment=function(){
				if($('.order_lj_main_1_div p:nth-child(2)').html() == '请选择一个收货地址'){
					alert('请选择一个收货地址！');
				}else{
					$('#success_order').show();
				}
			};
			//添加地址,并且收起当前页面
			$scope.addAddress = function () {
				$('.order_lj_main_1_div p:nth-child(2)').html($('.newAddress').html());
				$('#order_lj_consigneeAddress').hide();
			};
			$scope.jumpToHome = function () {
				window.location.href = window.location.href.split('#')[0]+'#/home';
			};
			//选择性别改变
			$scope.order_lj_newAddress_sex1 = function () {
				
				$('#order_lj_men span').css({
					color:'#4DC060'	
				})
				//
				$('#order_lj_women span').css({
					color:'#DDDDDD'	
				})
			};
			$scope.order_lj_newAddress_sex2 = function () {
				
				$('#order_lj_women span').css({
					color:'#4DC060'	
				})
				$('#order_lj_men span').css({
					color:'#DDDDDD'	
				})
			}
    }])
});