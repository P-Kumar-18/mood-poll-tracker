const formElement = document.querySelector('#moodInput');
const openingbtn = document.querySelector('#formShow');
const closingbtn = document.querySelector('#formClose');

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

