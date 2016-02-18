(function() {
    'use strict';

    function TrafficService($http) {
        var service = {};

        service.time = "";

        service.getTravelDuration = function(){
            return $http.get("http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0="+START_TRIP+"&wp.1="+END_TRIP+"&avoid=minimizeTolls&key="+BING_MAPS_API_KEY).
                then(function(response){
                  var duration = moment.duration(response.data.resourceSets[0].resources[0].travelDuration, 'seconds');
                  var hours = Math.floor(duration.asHours());
                  var mins = Math.floor(duration.asMinutes()) - hours * 60;
                  var durationTraffic = moment.duration(response.data.resourceSets[0].resources[0].travelDurationTraffic, 'seconds');
                  var hoursTraffic = Math.floor(durationTraffic.asHours());
                  var minsTraffic = Math.floor(durationTraffic.asMinutes()) - hours * 60;
                  var time = "";
                  if (hoursTraffic > 0) {
                    time += hoursTraffic + "h ";
                  }
                  if (minsTraffic > 0) {
                    time += minsTraffic + "mins ";
                  }
                  time += "(";
                  if (hours > 0 && hoursTraffic > 0 && hoursTraffic > hours) {
                    time += hoursTraffic - hours + "h ";
                  }
                  if (mins > 0 && minsTraffic > 0 && minsTraffic > mins) {
                    time += minsTraffic - mins + "mins";
                  }
                  time += " extra)";
                  return service.time = time;
                });
        };

        service.getCurrentTime = function() {
          return service.time;
        }

        return service;
    }

    angular.module('SmartMirror')
        .factory('TrafficService', TrafficService);

}());
