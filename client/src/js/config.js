/**
 * Base config object
 */

(function () {
  'use strict';
  if (!window.cfg) {
    window.cfg = {
      hostAndPort: function () {
        return '//' + window.location.host;
      }
      ,host: function () {
        return 'http://' + window.location.host.replace(/:[0-9]+$/, '');
      }
	  ,apiBaseUrl_set:''
	  ,apiBaseUrl: function(){
			if(this.apiBaseUrl_set) return this.apiBaseUrl_set;

			if( this.hostAndPort().match(/isleofravens.com/) ){
				this.server='http://app.isleofravens.com';
				this.basehref="/";
			}else if( this.hostAndPort().match(/:8888/) || this.host().match(/(localh|127.0.0|0.0.0)/)) {
                this.server='http://localhost:8888/isleofravens/server/';
                this.basehref="/isleofravens/client/";
			}

			this.apiBaseUrl_set = this.server;
			return this.apiBaseUrl_set;
	  }
	 
    };
  }


})();


