'use strict';

var sharetoolApp = angular.module('sharetoolApp', ['ui.router', 'ngCordova', 'ionic', 'jcs-autoValidate']);

//sharetoolApp.run([
//    'defaultErrorMessageResolver',
//    function (defaultErrorMessageResolver) {
//       
//        defaultErrorMessageResolver.setI18nFileRootPath('js/lang');
//        defaultErrorMessageResolver.setCulture('es-ES');
//    }
//]);

sharetoolApp.config(function($stateProvider, $urlRouterProvider) {
	 
	  $urlRouterProvider.otherwise("/toolList");
	 
	  $stateProvider.state('login', {
			url : '/login',
			templateUrl : 'login.html'
	  }).state('createUser', {
			url : '/createUser',
			templateUrl : 'create-user.html'
	  }).state('toolList', {
			url : '/toolList',
			templateUrl : 'tool-list.html'
	  }).state('toolDetail', {
			url : '/toolDetail',
			templateUrl : 'tool-detail.html'
	  })
	  
});


sharetoolApp.run(function($ionicPlatform, $cordovaSQLite) {
  
	$ionicPlatform.ready(function() {
		
		console.log('sdfdss1');
		
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        
        db = $cordovaSQLite.openDB("sharetool.db");
        
        db.transaction(function(tx) {
    		
    		console.log('sdfdss');
    	    tx.executeSql('DROP TABLE IF EXISTS test_table');
    	    tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

    	    // demonstrate PRAGMA:
    	    db.executeSql("pragma table_info (test_table);", [], function(res) {
    	      console.log("PRAGMA res: " + JSON.stringify(res));
    	    });

    	    tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
    	      console.log("insertId: " + res.insertId + " -- probably 1");
    	      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

    	      db.transaction(function(tx) {
    	        tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
    	          console.log("res.rows.length: " + res.rows.length + " -- should be 1");
    	          console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
    	        });
    	      });

    	    }, function(e) {
    	      console.log("ERROR: " + e.message);
    	    });
    	});  
        
        
        
        
    });
});