const formElement = document.querySelector('#moodInput');
const openingbtn = document.querySelector('#formShow');
const closingbtn = document.querySelector('#formClose');

function loadingMoodResult(){
	fetch('/mood')
		.then(res => res.json())
		.then(data => {
			data.forEach(moodObj => {
				const moodTitle = moodObj.title;
				const moodCount = moodObj.count;				
				const moodDiv = document.querySelector(`#${moodTitle} .count`);
				
				if(moodDiv) {
					moodDiv.textContent = moodCount;
				}
			})
		})
		.catch(err => {
			console.error(`Error fetching data: ${err}`);
		})
}

loadingMoodResult();

openingbtn.addEventListener('click', () => {
	formElement.style.display = 'block';
	setTimeout(() => {
		formElement.style.opacity = '1'; 
	}, 10);
});

closingbtn.addEventListener('click', (e) => {
	e.preventDefault();
	formElement.style.opacity = '0';
	setTimeout(() => {
		formElement.style.display = 'none';
	}, 850);
});

formElement.addEventListener('submit', (e) => {
	e.preventDefault();
	
	const moodSelection = document.querySelector('input[name="moodSelection"]:checked');
	const moodValue = moodSelection.value;
	
	if(!moodSelection) {
		alert(`Please select a mood.`);
		return;
	}
	
	fetch('/mood', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({title: moodValue})		
	})
		.then(res => res.json())
		.then(data => {
			console.log(`Mood submited successfully`);
			formElement.reset();
			closingbtn.click();
			loadingMoodResult();
		})
		.catch(err => {
			console.error(`Error submiting mood: ${err}`);
		});
});