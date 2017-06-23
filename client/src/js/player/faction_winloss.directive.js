app.directive('factionWinloss',
    ['Api', 'ColorManager', function (Api,ColorManager) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/player/faction_winloss.html',
            scope: {
                player: '=',
                mode: '&'
            }, 
            link : function(scope, elem, attrs){
            	
            	scope.loadFactionWinLoss = function(player){
            		Api.loadFactionWinLoss(player).then(function(res){
            			scope.faction_data = res.data.faction_win_loss;
            			scope.agenda_data = res.data.faction_agenda_win;
            			scope.buildChart();
            			scope.buildPieChart();
            		})
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
            		
            		var dataPack1 = [];
            		var dataPack2 = [];
            		var labels = [];
            		var colors = [];
            		var colors2 = [];
            		
            		angular.forEach(scope.faction_data, function(value, key) {
            			dataPack1.push(value.wins);
            			dataPack2.push(value.losses);
            			labels.push(value.faction);
            			colors.push(ColorManager.getBGColor(value.faction));
            			colors2.push(scope.hexToRGB(ColorManager.getBGColor(value.faction), .4));
            		});
            		
            		var data = {
                  		  type: 'horizontalBar',
                		  data: {
                		      labels: labels,
                		      datasets: [
                		      {
                		          label: 'Wins',
                		          data: dataPack1,
                								backgroundColor: colors,
                								hoverBackgroundColor: colors,
                								hoverBorderWidth: 2,
                								hoverBorderColor: 'lightgrey'
                		      },
                		      {
                		          label: 'Losses',
                		          data: dataPack2,
                								backgroundColor: colors2,
                								hoverBackgroundColor: colors2,
                								hoverBorderWidth: 2,
                								hoverBorderColor: 'lightgrey'
                		      },
                		      ]
                		  },
                		  options: {
                		   		animation: {
                		      	duration: 10,
                		      },
                		      tooltips: {
                							mode: 'label',
                		        callbacks: {
                		        label: function(tooltipItem, data) { 
                		        	return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.xLabel;
                		        }
                		        }
                		       },
                		      scales: {
                		        xAxes: [{ 
                		        	stacked: true, 
                		          gridLines: { display: false },
                		          }],
                		        yAxes: [{ 
                		        	stacked: true, 
                		          ticks: {
                		      			callback: function(value) { return value; },
                		   				}, 
                		          }],
                		      }, // scales
                		      legend: {display: false},
                		      responsive: true
                		  }
                		 };

            		//Chart.defaults.global.elements.rectangle.backgroundColor = '#FF0000';

            		var bar_ctx = document.getElementById('fwl-'+scope.player);
            		var bar_chart = new Chart(bar_ctx, data);
            		
            	}
            	
            	
            	scope.buildPieChart = function(){
            		
            		
            		var dataset = [];
            		var colors = [];
            		var labels = [];
            		var fontColor = [];
            		
            		var dataset2 = [];
            		var colors2 = [];
            		var labels2 = [];
            		var fontColor2 = [];
            		
            		angular.forEach(scope.faction_data, function(value, key) {
            			labels.push(ColorManager.getDisplayText(value.faction));
            			dataset.push(value.wins);
            			colors.push(ColorManager.getBGColor(value.faction));
            			fontColor.push(ColorManager.getTextColor(value.faction));
            		});
            		
            		
            		angular.forEach(scope.agenda_data, function(value, key) {
            			if(value.agenda == ''){
            				labels2.push('Unknown');
            				colors2.push('#f442f4');
                			fontColor2.push('#000');
            			}else{
            				labels2.push(ColorManager.getDisplayText(value.faction)+ ' '+ColorManager.getDisplayText(value.agenda));
            				colors2.push(ColorManager.getBGColor(value.agenda));
                			fontColor2.push(ColorManager.getTextColor(value.agenda));
            			}
            			
            			dataset2.push(value.wins);
            			
            		});
            		
            		
            		
            		/* chart 1 */
            		var ctx = document.getElementById('wd-'+scope.player).getContext('2d');
            		var myChart = new Chart(ctx, {
            		  type: 'pie',
            		  data: {
            		    labels: labels,
            		    datasets: [{
            		      backgroundColor: colors,
            		      data: dataset,
            		      fontColors: fontColor,
            		    }]
            		  },
            		  options : {
	            		  legend: {display: false},
	        		      responsive: false,
	        		      tooltips : {
	        		    	  enabled : false,
	        		    	  custom : getCustomTooltipFunction(0, 'wd-'+scope.player+'-tooltip') 
	        		      },
	        		      pieceLabel: {
	        		    	    mode: 'label',
	        		    	    tocenter: true,
	        		    	    fontSize: 14,
	        		    	  }
            		  }
            		});
            		
            		
            		var ctx2 = document.getElementById('wd-outter-'+scope.player).getContext('2d');
            		var myChart2 = new Chart(ctx2, {
              		  type: 'doughnut',
              		  data: {
              		    labels: labels2,
              		    datasets: [{
              		      backgroundColor: colors2,
              		      data: dataset2,
              		      fontColors: fontColor2,
              		    }]
              		  },
              		  options : {
              			  cutoutPercentage: 90,
  	            		  legend: {display: false},
  	        		      responsive: false,
  	        		      tooltips : {
  	        		    	  enabled : false,
  	        		    	  custom : getCustomTooltipFunction(0, 'wd-'+scope.player+'-tooltip') 
  	        		      }
              		  }
              		});
            	}
            	
            	
            	scope.loadFactionWinLoss(scope.player);
            	
            }
        }
    }]);


