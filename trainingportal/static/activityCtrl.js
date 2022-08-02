app.controller("activityCtrl", function($scope, _$http) {
    
    $scope.fetchActivity();

    $scope.toLocaleDate = (ts) => {
        if(ts!==null){
            ts = new Date(ts).toLocaleString();
        }
        else{
            ts = "";
        }
        return ts;
    }
});
