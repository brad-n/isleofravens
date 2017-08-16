app.directive('factionMatchups',
    ['Api', 'ColorManager','ModalService', function (Api,ColorManager,ModalService) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            transclude: false,
            templateUrl: 'js/stats/faction_matchups.html',
            scope: {
                player: '=',
                mode: '&'
            }, 
            link : function(scope, elem, attrs){
            	
            	scope.search = {};
            	scope.threshold = 0;
            	
            	scope.show = function(f1,a1,f2,a2) {
            		
            		var params = {
            				"faction":f1,
            				"agenda":a1,
            				"faction_2":f2,
            				"agenda_2":a2,
            				"date":scope.search.date
            		}
                    ModalService.showModal({
                        templateUrl: 'js/stats/match_details.html',
                        controller: "MatchupDetailsController",
                        inputs : {
                        	"params" : params
                        }
                        
                    }).then(function(modal) {
                        modal.element.modal();
                        modal.close.then(function(result) {
                            scope.message = "You said " + result;
                        });
                    });
                };
            	
            	scope.loadFactionMatchups = function(search){
            		
            		Api.loadFactionMatchups(scope.search).then(function(res){
            			
            			scope.search.date = res.data.date;
            			scope.search.faction = res.data.faction;
            			scope.search.agenda = res.data.agenda;
            			
            			scope.matchups = res.data.results;
            			
            		});
            		
            	}
            	
            	scope.loadFactions = function(){
            		
            		Api.loadFactions(scope.search).then(function(res){
            			scope.factions = res.data.factions;
            			scope.agendas = res.data.agendas;
            		});
            		
            	}
            	
            	
            	scope.loadFactions();
            	scope.loadFactionMatchups();
            	
            }
        }
    }]);


