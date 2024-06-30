 document 
	.getElementById("surveyForm") 
	.addEventListener( 
		"submit", 
		function (event) { 
			
			event.preventDefault(); 

			let nameField = 
				document.getElementById( 
					"name"
				); 
			let ageField = 
				document.getElementById( 
					"age"
				); 
			let errorText = 
				document.getElementById( 
					"errorText"
				); 

			let name = nameField.value; 
			let age = ageField.value; 

			
			let Regex = /^[A-Za-z ]+$/; 

			
			if (!name.match(Regex)) { 
				nameField.classList.add( 
					"error"
				); 
				errorText.innerHTML = 
					`Name field should only contain 
					English alphabets and spaces`; 
				errorText.classList.add( 
					"errorText"
				); 
				return; 
			} 

			
			else if ( 
				isNaN(age) || 
				age < 1 || 
				age > 150 
			) { 
				ageField.classList.add( 
					"error"
				); 
				errorText.innerHTML = 
					`Age should only contain valid 
					values ( 1 - 150 )`; 
				errorText.classList.add( 
					"errorText"
				); 
				return; 
			} 

			
			if ( 
				nameField.classList.contains( 
					"error"
				) 
			) 
				nameField.classList.remove( 
					"error"
				); 

			 
			if ( 
				ageField.classList.contains( 
					"error"
				) 
			) 
				ageField.classList.remove( 
					"error"
				); 

			
			errorText.innerHTML = 
				"Submitted Successfully"; 
			errorText.classList.add( 
				"successText"
			); 

			const formData = 
				new FormData( 
					event.target 
				); 
			const formValues = {}; 

			
			formData.forEach( 
				(value, key) => { 
					formValues[key] = 
						value; 
				} 
			); 

			
			const csvContent = 
				convertToCSV( 
					formValues 
				); 
			const blob = new Blob( 
				[csvContent], 
				{ type: "text/csv" } 
			); 

			
			const link = 
				document.createElement( 
					"a"
				); 
			link.href = 
				window.URL.createObjectURL( 
					blob 
				); 
			link.download = 
				"survey_data.csv"; 
			link.click(); 

			
			setTimeout( 
				document 
					.getElementById( 
						"surveyForm"
					) 
					.reset(), 
				2000 
			); 
		} 
	); 


function convertToCSV(objArr) { 
	const array = 
		typeof objArr !== "object"
			? JSON.parse(objArr) 
			: objArr; 
	let result = ""; 

	
	const header = 
		Object.keys(array).join(",") + 
		"\n"; 
	result += header; 

	for (const item in array) { 
		if ( 
			array.hasOwnProperty(item) 
		) { 
			result += array[item] + ","; 
		} 
	} 
	result = result.slice(0, -1); 
	result += "\n"; 

	return result; 
}
