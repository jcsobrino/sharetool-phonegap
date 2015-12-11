'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.factory('apiService', ['$timeout', '$ionicLoading', function ($timeout, $ionicLoading) {
	
	var userId = 0;
	var toolId = 0;
	var userRepository = [];
	var toolRepository = [];
	
	var toolNames = [
            "Taladro Percutor 500W",
            "Mini sierra circular",
            "Cepillo de carpintero",
            "Maletín de herramientas neumáticas",
            "Mesa de trabajo para taller bricolaje",
            "Taladro sin cable, cabezal extraíble",
            "Juego de llaves hexagonales",
            "Pie de cabra 340mm",
            "Banco de trabajo plegable",
            "Crimpadora (24,1 cm)",
            "Medidor láser/detector",
            "Sierra circular, 1200 W, 185 mm",
            "Atornillador angular de 90°",
            "Pinzas de bricolaje",
            "Kit de puntas y brocas para bricolaje",
            "Fresas de muelle",
            "Juego de brocas de impacto",
            "Amoladora angular",
            "Taladradora de percusión",
            "Sierra de calar de carrera pendular",
            "Pistola de pegar",
            "Atornillador a batería de litio",
            "Aspirador en seco-húmedo",
            "Taladro inalámbrico, 12 V",
            "Sierra de vaivén con maletín",
            "Afiladora doble, 150 W",
            "Martillo perforador, 36 V"];
	
	var descriptionTool = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et odio id libero condimentum dapibus non non neque. Sed congue auctor nibh, eget congue arcu vehicula in.";

	var NUM_TOOLS = 50;
	var PRICE_MIN = 1.0;
    var PRICE_MAX = 100.0;
    var LAT_MAX = 41.47;
    var LAT_MIN = 41.31;
    var LNG_MAX = 2.27;
    var LNG_MIN = 2.02;
	
    function getRandomArbitrary(min, max) {
    	 return (Math.random() * (max - min) + min);
    }
    
    
 	var service = {
		
		init: function(){

			service.createUser("Wayne Holmes", "wholmes@host.com", "password1");
			service.createUser("Tammy Harris", "tharris@host.com", "password2");
			service.createUser("Mario Brady", "mbrady@host.com", "password3");
		
			for(var i=0; i<NUM_TOOLS; i++){
				
				service.createTool(toolNames[Math.floor(Math.random() * toolNames.length)],
								   getRandomArbitrary(PRICE_MIN,PRICE_MAX).toFixed(2), 
						           userRepository[Math.floor(Math.random() * userRepository.length)],
						           descriptionTool,
						           getRandomArbitrary(LAT_MIN,LAT_MAX),getRandomArbitrary(LNG_MIN,LNG_MAX));
			}
		
		},
		login: function(email, password){
			
			for(var i=0; i<userRepository.length; i++){

				if(userRepository[i].email == email && userRepository[i].password == password)
	    			return userRepository[i]
	    	}
	    	
	    	return null;
		},
	    userExistsByEmail: function(email){
	    	
	    	var result  = userRepository.filter(function(o){return o.email == email;} );

	    	return result ? result[0] : null;
	    },
	    createUser: function (name, email, password){
	    	
	    	var user = { id: ++userId, name:name, email:email, password:password, numTools:0 };
	    	
	    	userRepository.push(user);
	    	
	    	return user;
	    },
	    createTool: function (name, pricePerDay, user, description, lat, lng){
	    	
	    	var tool = { id: ++toolId, name:name, pricePerDay:pricePerDay, user:user, description:description, lat:lat, lng:lng };
	    	user.numTools++;
	    	
	    	toolRepository.push(tool);
	    	
	    	return user;
	    },
	    findTools: function (name, maxPrice, maxKilometers, lat, lng, toolOrder){
	    	
	    	var name = name != null ? name.toLowerCase() : null; 
	    	
	    	var filteredTools = toolRepository.filter(function (el) {

	    		if(name != null && el.name.toLowerCase().indexOf(name) == -1){
	    			return false;
	    		}
	    		
	    		if(maxPrice != null && el.pricePerDay > Number(maxPrice)){
	    			return false;
	    		}
	    		
	    		if(lat != null && lng != null){
	    			
	    			el.distance = (geolib.getDistance(
		    						{latitude: lat, longitude: lng},
		    						{latitude: el.lat, longitude: el.lng}
		    					  ) / 1000.0).toFixed(2);
	    			if(maxKilometers != null && el.distance > Number(maxKilometers)){
	    				return false;
	    			}
	    		}
	    		return true;
		    });
	    	
	    	if(toolOrder != null){ 
	    	 
	    		if(toolOrder == service.toolsOrder.MIN_PRICE){
	    		
	    			filteredTools.sort(function(a,b){
	    				
	    				return a.pricePerDay - b.pricePerDay;
	    			})
	    			
	    		} else if(toolOrder == service.toolsOrder.NEAR_TOOL && lat != null && lng != null){
	    			
	    			filteredTools.sort(function(a,b){
	    				
	    				return a.distance - b.distance;
	    			})
	    		}
	    	}
	    	
	    	return filteredTools;
	    	
	    },
	    getToolById: function(id){

	    	for(var i=0; i<toolRepository.length; i++){
	    		
	    		if(toolRepository[i].id == id)
	    			return toolRepository[i]
	    	}
	    	
	    	return null;
	    },
	    toolsOrder: {
	    	MIN_PRICE: 0,
	    	NEAR_TOOL: 1
	    },
	    simulateDelay: function(codeToExecute){
	    	$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner>'});
			$timeout(function(){
				codeToExecute();
				$ionicLoading.hide();
			}, getRandomArbitrary(500,1500));
	    }
	    
	  }
	
	return service;
}]);