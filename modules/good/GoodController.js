/**
 * Created by Administrator on 2016/9/22.
 */
define(['router','css!modules/good/good.css'], function (app,css) {
    //angular会自动根据controller函数的参数名，导入相应的服务
     
    return app.controller('GoodController',['$scope','$http', function ($scope,$http) {
    	
        $http.get('data/ele_sel.json').success(function(res){
        	
        	$scope.best = res.ele_sel;
        	
        })
    }])
    
    


});