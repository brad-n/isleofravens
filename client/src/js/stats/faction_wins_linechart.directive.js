app.directive('factionWinsLinechart',
    ['Api', 'ColorManager', function (Api,ColorManager) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/stats/faction_wins_linechart.html',
            scope: {
                player: '=',
                mode: '&'
            }, 
            link : function(scope, elem, attrs){
            	
            	scope.loadFactionEntryCounts = function(player){
            		
            		scope.processed_data = {};

            		Api.loadFactionWins().then(function(result){
            			var res = result.data;
            			
            			console.log('got them!');
            			console.log(res);
            			
            			//we have to process all our data into arrays for each faction
            			scope.processed_data['date_keys'] = Array();
            			scope.processed_data['dates'] = Array();
            			
            			for(var i = 0; i < res.length; i++){
            				if(!scope.processed_data[res[i].faction]){
            					scope.processed_data[res[i].faction] = Array();
            				}
            				scope.processed_data[res[i].faction].push(res[i].wins);
            				
            				//we have many date duplicates, so we keep track of what
            				//to push to the unique list.
            				if(!scope.processed_data['date_keys'][res[i].mdate]){
            					scope.processed_data['date_keys'][res[i].mdate] = res[i].date_stamp;
            					scope.processed_data['dates'].push(res[i].date_stamp);
            				}
            				
            				
            			}
            			console.log(scope.processed_data);
            			scope.buildChart();
            		});
            	}
            	
            	scope.hexToRGB = function(hex, alpha) {
            	    var r = parseInt(hex.slice(1, 3), 16),
                    g = parseInt(hex.slice(3, 5), 16),
                    b = parseInt(hex.slice(5, 7), 16);

	                if (alpha) {
	                    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
	                } else {
	                    return "rgb(" + r + ", " + g + ", " + b + ")";
	                }
	            }
            	
            	scope.buildChart = function(){
            		
            		
            		var config = {
            	            type: 'line',
            	            data: {
            	                labels: scope.processed_data['dates'],
            	                datasets: [{
            	                    label: "Lannister",
            	                    backgroundColor: ColorManager.getBGColor('Lannister'),
            	                    borderColor: ColorManager.getBGColor('Lannister'),
            	                    data: scope.processed_data['Lannister'],
            	                    fill: false,
            	                },
            	                {
            	                    label: "Baratheon",
            	                    fill: false,
            	                    backgroundColor: ColorManager.getBGColor('Baratheon'),
            	                    borderColor: ColorManager.getBGColor('Baratheon'),
            	                    data: scope.processed_data['Baratheon'],
            	                },
            	                {
            	                    label: "Greyjoy",
            	                    fill: false,
            	                    backgroundColor: ColorManager.getBGColor('Greyjoy'),
            	                    borderColor: ColorManager.getBGColor('Greyjoy'),
            	                    data: scope.processed_data['Greyjoy'],
            	                },
            	                {
            	                    label: "Tyrell",
            	                    fill: false,
            	                    backgroundColor: ColorManager.getBGColor('Tyrell'),
            	                    borderColor: ColorManager.getBGColor('Tyrell'),
            	                    data: scope.processed_data['Tyrell'],
            	                },
            	                {
            	                    label: "Stark",
            	                    fill: false,
            	                    backgroundColor: ColorManager.getBGColor('Stark'),
            	                    borderColor: ColorManager.getBGColor('Stark'),
            	                    data: scope.processed_data['Stark'],
            	                },
            	                {
            	                    label: "Martell",
            	                    fill: false,
            	                    backgroundColor: ColorManager.getBGColor('Martell'),
            	                    borderColor: ColorManager.getBGColor('Martell'),
            	                    data: scope.processed_data['Martell'],
            	                },
            	                {
            	                    label: "Night's Watch",
            	                    fill: false,
            	                    backgroundColor: ColorManager.getBGColor("Night's Watch"),
            	                    borderColor: ColorManager.getBGColor("Night's Watch"),
            	                    data: scope.processed_data["Night's Watch"],
            	                },
            	                {
            	                    label: "Targaryen",
            	                    fill: false,
            	                    backgroundColor: ColorManager.getBGColor("Targaryen"),
            	                    borderColor: ColorManager.getBGColor("Targaryen"),
            	                    data: scope.processed_data["Targaryen"],
            	                }]
            	            },
            	            options: {
            	                responsive: true,
            	                tooltips: {
            	                    mode: 'index',
            	                    intersect: false,
            	                },
            	                hover: {
            	                    mode: 'nearest',
            	                    intersect: true
            	                },
            	                scales: {
            	                    xAxes: [{
            	                        display: true,
            	                        scaleLabel: {
            	                            display: true,
            	                            labelString: 'Month'
            	                        }
            	                    }],
            	                    yAxes: [{
            	                        display: true,
            	                        scaleLabel: {
            	                            display: true,
            	                            labelString: 'Value'
            	                        }
            	                    }]
            	                }
            	            }
            	        };

            			var ctx = document.getElementById("fwin-ytd");
            			var bar_chart = new Chart(ctx, config);
            		
            	}
            	
            	
            	scope.loadFactionEntryCounts();
            	
            }
        }
    }]);


