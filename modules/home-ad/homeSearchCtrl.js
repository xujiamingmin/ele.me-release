define(['router','css!modules/home-ad/home_search.css'], function (app,css) {
    //angular会自动根据controller函数的参数名，导入相应的服务

    return app.controller('homeSearchCtrl',['$scope', function ($scope) {
		 $scope.backHome = function () {
            window.location.href = window.location.href.split('#')[0]+'#/home';
        }
		$scope.clear = function(){
		 	$('#historyList').empty();
		 	var liObj = $('<li class="addLi">无历史记录</li>')
		 	$('#historyList').append(liObj);
		 	$('.addLi').css('font-size','0.18rem')
		};
		$scope.aa = '';
		$scope.kind = function(e){
			if(e.target.getAttribute('myt')==1){
				$('.kind a').css({
				'color':'#333',
				'border':'1px solid #ccc'
				});
				$scope.aa = e.target.innerHTML;
				$(e.target).css({
					'color':'#3290e9',
					'border':'1px solid #3290e9'
				})
			}
		};
		$scope.his = function(e){
			if(e.target.getAttribute('zt')==1){
				$('#historyList a').css({ 'color':'#333' });
				$('.kind a').css({ 'color':'#333', 'border':'1px solid #ccc'});
				$scope.aa = e.target.childNodes[1].innerHTML;
				$(e.target).css({ 'color':'#3290e9' })
			}
		}
	}])
});