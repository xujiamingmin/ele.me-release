
/**
 * Created by Administrator on 2016/9/22.
 */
define(['router','css!modules/shops-detail/shops-detail.css','jquery','jqueryFly'], function (app,css,$,jqueryFly) {
    //angular会自动根据controller函数的参数名，导入相应的服务
    return app.controller('DetailController',['$scope','$http', function ($scope,$http) {
        $http.get("data/shopDetail.json").success(function(res) {$scope.data = res;});
        $scope.show = function () {
            $("#second").slideToggle();
        };
        $scope.pay = function () {
            var num = Number($('#num').html());
            var totalMoney = Number($('#money').html().split('￥')[1]);
            if(totalMoney>0){
                var loc = window.location.href.split('#')[0] +'#/submit-order';
                setTimeout(function () {
                    otherWindow.postMessage({
                        'num':num,
                        'totalMoney':totalMoney
                    },loc);
                },100);
                var otherWindow =  window.open(loc,'_self');
            }else{
                alert('请先选择商品！');
            }

        };
        //购物车内容显示
        var t = false;
        $scope.show_car = function () {
            if($('#num').html() == 0){
                return;
            }
            if(!t){
                $("#car-mask").fadeIn(30);
                document.body.style.overflow = 'hidden';
            }else{
                $("#car-mask").fadeOut(30);
                document.body.style.overflow = 'scroll';
            }
            t = !t;
        };
        //购物车中减少东西
        // $scope.plus = function () {
        //     alert(1);
        //     $scope.num = $scope.num -1;
        //     // $(this).parent().find('.num').html(Number($(this).parent().find('.num').html())-1);
        // };

        //往购物车中添加东西
        var offset = $("#num").offset();
        var addcar = $(".addcar");
        var img = 'imgs/new.png';
        $scope.add = function (a) {
            //添加购物车的事件
            var title = a.target.parentNode.parentNode.children[0].innerHTML;
            var price = a.target.parentNode.children[0].innerHTML;
            var num1 = 1;
            var li = $(' <li> <span class="food-name">'+title+'</span><span class="price">'+price+'</span><div class="right"><button class="plus" ng-click="plus()">-</button><span class="num">'+num1+'</span><button class="add">+</button></div></li>');
            if($('#car-mask-list ul li').find('.food-name').length == 0){
                $('#car-mask-list ul').append(li);
            }else{
                $('#car-mask-list ul li').find('.food-name').each(function () {
                    if($(this).html() == title){
                        $(this).parent().find('.num').html(Number($(this).parent().find('.num').html())+1);
                    }else{
                        $('#car-mask-list ul').append(li);
                    }
                });
            }
            //当点击清空按钮时，执行的函数
            $scope.clear = function () {
                $('#car-mask-list ul').empty();
                $("#car-mask").fadeOut();
                document.body.style.overflow = 'scroll';
                $scope.num = 0;
            };


            $('.che').attr('id','che');
            $scope.money += Number(a.target.parentNode.children[0].innerHTML.split('￥')[1]);
            $scope.num++;
            var flyer = $('<img class="u-flyer" src="'+img+'">');
            flyer.fly({
                start: {
                    left: a.clientX, //开始位置（必填）#fly元素会被设置成position: fixed
                    top: a.clientY //开始位置（必填）
                },
                end: {
                    left: offset.left, //结束位置（必填）
                    top: offset.top, //结束位置（必填）
                    width: 0, //结束时宽度
                    height: 0 //结束时高度
                },
                onEnd: function(){ //结束回调
                    this.destroy(); //移除dom
                }
            });
        };
    }]);
});