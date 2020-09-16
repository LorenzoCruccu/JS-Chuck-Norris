
//randomJoke send the user to the result page with a random joke
function randomJoke(){
	fetch('http://api.icndb.com/jokes/random') //get random joke json file with fetch API
  .then(response => response.json())
  .then(data => {console.log(data);
  		window.location.href = "./result.html?"+data.value.id;
  });
}

//filter() will output a string useful for limiting the query by category.
//See http://www.icndb.com/api "Limiting Categories" for more info
function filter(){
		console.log("hello");
		var Nerdy = document.getElementById('nerdy');
		var Explicit = document.getElementById('explicit');
		var filter = "?limitTo=[";
		 if (Nerdy.checked==true && Explicit.checked==true) {
		 	console.log(filter.concat(Explicit.value ,",",Nerdy.value,"]"));
			return filter.concat(Explicit.value ,",",Nerdy.value,"]");
		}
		else if (Nerdy.checked) {
			console.log(filter.concat(Nerdy.value,"]"));
			return filter.concat(Nerdy.value,"]");

		}
		else if (Explicit.checked) {
			console.log(filter.concat(Explicit.value,"]"));
			return filter.concat(Explicit.value,"]");
		}

}

//createTable will create the table by reading the json file outputted from the query
function createTable(){
fetch('http://api.icndb.com/jokes'+filter()) //get json file with fetch API
  .then(response => response.json())
  .then(data => {console.log(data);

  	document.getElementById('table').innerHTML = ''; //cancella la vecchia tabella, ripristinando un tbody vuoto

		for (var key in data.value) { 
    		var table = document.getElementById("table");
			var row = table.insertRow(-1);
			var content = row.insertCell();
			
			content.outerHTML = "<b> <a href=\"result.html?"+data.value[key].id+"\">"+"<div>"+ data.value[key].id+ 
			"</div> </a> </b>"; //it prints the id of the jokes, adding in the cells the <a> tag
			var content2 = row.insertCell();
			if (data.value[key].categories[0]!= undefined){ //even if categories is an array,
				//each joke contains just one category, so i can use [0] instead of cycle it
				content2.innerHTML = data.value[key].categories[0]; 
			}
			else content2.innerHTML ="no cateogory for this joke";
			
		}
	});
}

