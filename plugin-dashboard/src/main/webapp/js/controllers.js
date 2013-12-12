//############################################
// PLUGINS CONTROLLER LOADER
//############################################
var _PROVIDER_QUEUE = 0;
app.controller('pluginLoaderCtrl', function ($scope, $sce, $log, $rootScope, $http, MyHttpInterceptor) {

    /*
     *  method: "POST",
     data: JSON.stringify({}),
     headers: {'Content-Type': 'application/json'}
    //{"payload":{"values":{"entry":[{"key":"foo2","value":"bar"},{"key":"foo","value":"bar"}]}}}
     * */
});


app.controller('toolCtrl', function ($scope, $sce, $log, $rootScope, $http, MyHttpInterceptor) {
    // hack
    $rootScope.packsInstalled = true;

    $scope.resultMessages = null;
    $scope.runBeanWriter = function () {
        $http({
            method: 'POST',
            url: $rootScope.REST.beanwriter
        }).success(function (data) {
                    $scope.resultMessages = data;
                });

    };
});
// loads plugin list
app.controller('pluginCtrl', function ($scope, $location, $sce, $log, $rootScope, $http, MyHttpInterceptor) {
    // hack
    $rootScope.packsInstalled = true;

    $scope.tabs = [
        {name: "Installed Plugins", link: "/plugins"},
        {name: "Find additional", link: "/find-plugins"}
    ];
    $scope.isPageSelected = function (path) {
        return $location.path() == path;
    };
    //plugin list
    $scope.init = function () {
        $http({
            method: 'GET',
            url: $rootScope.REST.plugins
        }).success(function (data) {
                    $scope.plugins = data;
                });

    };
    $scope.init();

});

/*
 //############################################
 // ON LOAD CONTROLLER
 //############################################
 */
app.controller('homeCtrl', function ($scope, $sce, $log, $rootScope, $http, MyHttpInterceptor) {
    $scope.init = function () {
        $log.info("...Essentials loaded...");
    };
    $scope.init();

});

/*
 //############################################
 // MENU CONTROLLER
 //############################################
 */
app.controller('mainMenuCtrl', function ($scope, $log, $location, $rootScope, $http, MyHttpInterceptor) {


    $scope.menu = [
        {name: "Plugins", link: "#/plugins"},
        {name: "Tools", link: "#/tools"}
    ];

    $scope.isPageSelected = function (path) {
        var myPath = $location.path();
        // stay in plugins for all /plugin paths
        if (myPath == "/find-plugins" || myPath.indexOf("/plugins") != -1) {
            myPath = '/plugins';
        }
        return  '#' + myPath == path;
    };
    $scope.onMenuClick = function (menuItem) {
        $log.info(menuItem);
    };


});