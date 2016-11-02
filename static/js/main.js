$(document).ready(function() {

	$.ajax({
		url: 'http://api.planetos.com/v1/datasets?apikey=019ecd71188a4982a20e1a9717e1ab27',
		type: 'GET',
		dataType: 'json',
		success : function(data){ // code_html contient le HTML renvoyé
			console.log(data);
       }
	})
});