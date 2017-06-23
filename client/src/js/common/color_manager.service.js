app.factory('ColorManager', ['Restangular', '$rootScope', '$q', '$location', '$http', 'Api',
	function (Rest, $rootScope, $q, $location, $http, Api) {
		'use strict';
		window.CM = this;
		var CM = this;
		this.cache = {};
		this.colors = [
				/* houses */
				{name: "Lannister", display:'Lannister', colors: {bg: '#C00106', text:'#FE9A9D'}},
				{name: "Stark", display:'Stark', colors: {bg:'#CFCFCF', text:'#333333'}},
				{name: "Targaryen", display:'Targaryen', colors: {bg:'#1C1C1C', text:'#CCCCCC'}},
				{name: "Greyjoy", display:'Greyjoy', colors: {bg:'#1D7A99', text:'#A9DDEF'}},
				{name: "Tyrell", display:'Tyrell', colors: {bg:'#509F16', text:'#C6F3A5'}},
				{name: "Baratheon", display:'Baratheon', colors: {bg:'#E3D852', text:'#5F5911'}},
				{name: "Night's Watch", display:'Night\'s Watch', colors: {bg:'#7A7A7A', text:'#333333'}},
				{name: "Martell", display:'Martell', colors: {bg:'#E89521', text:'#5C3A0A'}},
				
				/* banners */
				{name: "Banner of the Lion", display:'Lion', colors: {bg: '#C00106', text:'#FE9A9D'}},
				{name: "Banner of the Wolf", display:'Wolf', colors: {bg:'#CFCFCF', text:'#333333'}},
				{name: "Banner of the Dragon", display:'Dragon', colors: {bg:'#1C1C1C', text:'#CCCCCC'}},
				{name: "Banner of the Kraken", display:'Kraken', colors: {bg:'#1D7A99', text:'#A9DDEF'}},
				{name: "Banner of the Rose", display:'Rose', colors: {bg:'#509F16', text:'#C6F3A5'}},
				{name: "Banner of the Stag", display:'Stag', colors: {bg:'#E3D852', text:'#5F5911'}},
				{name: "Banner of the Watch", display:'Watch', colors: {bg:'#7A7A7A', text:'#333333'}},
				{name: "Banner of the Sun", display:'Sun', colors: {bg:'#E89521', text:'#5C3A0A'}},
				
				/* agendas */
				{name: "Fealty", display:'Fealty', colors: {bg:'#7B0B20', text:'#F7A1B1'}},
				{name: "No agenda", display:'No agenda', colors: {bg:'#A99560', text:'#5A540F'}},
				{name: "The Lord of the Crossing", display:'Crossing', colors: {bg:'#6692A0', text:'#27393F'}},
				{name: "Kings of Summer", display:'Summer', colors: {bg:'#FCD700', text:'#665700'}},
				{name: "Kings of Winter", display:'Winter', colors: {bg:'#1C88D0', text:'#0C3B5A'}},
				{name: "\"The Rains of Castamere\"", display:'Rains', colors: {bg:'#D75B4D', text:'#5E1F18'}},
				{name: "Alliance", display:'Alliance', colors: {bg:'#845D70', text:'#1C1C1C'}},
				
				/* draft agendas */
				{name: "Protectors of the Realm", display:'Protectors', colors: {bg:'', text:''}},
				{name: "The Power of Wealth", display:'Power of Wealth', colors: {bg:'', text:''}},
				{name: "Treaty", display:'Treaty', colors: {bg:'', text:''}},
				{name: "Uniting the Seven Kingdoms", display:'Uniting', colors: {bg:'', text:''}},
		]


		return {

			getBGColor: function(name){
				if(!CM.cache || CM.cache.name != name){
					CM.cache = _.find(CM.colors, function(o) { return o.name == name; });
				}
				return CM.cache.colors.bg;
			},
			getTextColor: function(name){
				if(!CM.cache || CM.cache.name != name){
					CM.cache = _.find(CM.colors, function(o) { return o.name == name; });
				}
				return CM.cache.colors.text;				
			},
			getDisplayText: function(name){
				if(!CM.cache || CM.cache.name != name){
					CM.cache = _.find(CM.colors, function(o) { return o.name == name; });
				}
				return CM.cache.display;
			},
			
			findObj : function(name){
				var res = {};
				console.log(CM.colors);
				console.log('there were colors...');
				angular.forEach(CM.colors, function(value, key) {
					console.log('check '+value.name+" against "+name);
					if(value.name == name){
						res = value;
					}
				});
				return res;
			}

			

		};
	}
]);
