/**
 * Created by Administrator on 2016/9/22.
 */
define(['router','css!modules/mine/mine.css','css!modules/mine/iconfonts.css'], function (app) {
    //angular会自动根据controller函数的参数名，导入相应的服务
    return app.controller('MineController',['$scope', function ($scope) {
        // 账户信息
        $scope.myAccount = function(){
            // 如果未登录
            if($('.nickName').text() == '立即登录'){
                $('.loginPage').animate({
                    top:0
                });
                return;
            }
            // 登录后
            $('.account').animate({
                left:0
            },function(){
                $(this).on('swipeRight',function(){
                    $(this).animate({
                        left:'100%'
                    });
                });
            })
        };
        $scope.closeLoginPage = function(){
            $('.loginPage').animate({
                top:'100%'
            })
        }
        $scope.accountReturn = function(){
            $('.account').animate({
                left:'100%'
            })
        }
        // 设置
        $scope.toSettings = function(){
            // 如果未登录
            if($('.nickName').text() == '立即登录'){
                $('.quitLogin').remove();
            }
            $('.mineSettings').animate({
                left:0
            })
        }
        $scope.backToPage = function(){
            $('.mineSettings').animate({
                left:'100%'
            })
        }
        // 清除图片缓存
        $scope.clearCache = function(){
            $('.picCache').text('0MB');
        }
        // 退出登录
        $scope.quitButton = function(){
            $('.mineSettings').animate({
                left:'100%'
            },function(){
                $('.nickName').text('立即登录');
                $('.userPhone').text('登录后可享受更多特权');
                $('.quitMoney').text('0');
            });
        };
        //发送验证码
        var t = false;
        $scope.vCodeCount = function(){
            if(t) return;
            var n = 11;
            vCodeTimer = setInterval(function(){
                n --;
                $('.vCodeArea button').text('已发送(' + n + 's)').css({
                    background:'#aaa'
                });
                if(n <= 0){
                    $('.vCodeArea button').text('重新获取').css({
                        background:'#2f8fe6'
                    });
                    clearInterval(vCodeTimer);
                }
            },1000);
            t = !t;
        }
    }]);
});
