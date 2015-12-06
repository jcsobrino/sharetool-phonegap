'use strict';

var sharetoolApp = angular.module("sharetoolApp");

sharetoolApp.factory('apiService', ['$cordovaSQLite', '$cordovaGeolocation', function ($cordovaSQLite, $cordovaGeolocation) {
	
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
	
	var descriptionTool = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et odio id libero condimentum dapibus non non neque. Sed congue auctor nibh, eget congue arcu vehicula in. Suspendisse potenti. Integer ac neque est. Donec sit amet aliquam nisl, vitae convallis leo. Vivamus vitae neque libero. Sed sodales hendrerit massa, eget dictum nibh molestie at.";

	var numTools = 50;
	
 	var service = {
		
		init: function(){

			service.createUser("Wayne Holmes", "wholmes@host.com", "password1");
			service.createUser("Tammy Harris", "tharris@host.com", "password2");
			service.createUser("Mario Brady", "mbrady@host.com", "password3");
		
			for(var i=0; i<numTools; i++){
				
				service.createTool(toolNames[Math.floor(Math.random() * toolNames.length)],
						           10.2, 
						           userRepository[Math.floor(Math.random() * userRepository.length)],
						           descriptionTool,
						           212.21,129,2);
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
	    	
	    	var user = { id: ++userId, name:name, email:email, password:password };
	    	
	    	userRepository.push(user);
	    	
	    	return user;
	    },
	    createTool: function (name, pricePerDay, user, description, lat, lng){
	    	
	    	var tool = { id: ++toolId, name:name, pricePerDay:pricePerDay, user:user, description:description, lat:lat, lng:lng };
	    	
	    	toolRepository.push(tool);
	    	
	    	return user;
	    },
	    findTools: function (name, maxPrice, maxKilometers, lat, lng, toolOrder){
	    	
	    	return toolRepository;
	    },
	    getToolById: function(id){

	    	for(var i=0; i<toolRepository.length; i++){
	    		
	    		if(toolRepository[i].id == id)
	    			return toolRepository[i]
	    	}
	    	
	    	return null;
	    }
	  }
	
	return service;
}]);