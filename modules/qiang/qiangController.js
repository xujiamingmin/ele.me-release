/**
 * Created by Administrator on 2016/9/22.
 */
define(['router', 'css!modules/qiang/qiang.css', 'css!modules/qiang/iconfont.css'], function(app, css1, css2) {
	//angular会自动根据controller函数的参数名，导入相应的服务
	return app.controller('qiangController', ['$scope', '$http', function($scope, $http) {
		//返回
		$scope.forward = function() {
				window.history.back();
			}
		//解析list	
		$http.get('data/shopDetail-qiang.json').success(function(res) {
			$scope.qiang_data = res;
		});

		//添加事件(事件委托不能用，因为结构问题)
		$('.qiang_lj_mian_nav li').on('touchstart', function(e) {

			$(this).css({ //自己背景
				'background': "#FCD800"
			})
			$(this).children().css({ //自己的子节点
				'color': 'red'
			})

			$(this).siblings().css({ //自己的兄弟节点
				'background': '#3A3A3A'
			})
			$(this).siblings().children().css({ //自己的兄弟节点的子节点
				'color': '#9F9F9F'
			})

		})

	}]);
});