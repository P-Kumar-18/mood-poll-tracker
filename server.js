const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const moodCountPath = path.join(__dirname, 'data', 'moodCount.json');

if (!fs.existsSync(path.dirname(moodCountPath))) {
	fs.mkdirSync(path.dirname(moodCountPath), { recursive: true });
}

if (!fs.existsSync(moodCountPath)) {
	fs.writeFileSync(moodCountPath, JSON.stringify([], null, 2), 'utf-8');
	console.log('moodCount.json was not found, so a new one was created.');
}

app.use(express.json());
app.use(express.static(`public`));

function getMoodCount() {
	try {
		const moodCount = fs.readFileSync(moodCountPath, 'utf-8');
		console.log(`moodCount.json loaded Successfully`);
		return JSON.parse(moodCount);
	} catch(err) {
		console.error(`Error fetching moodCount.json: ${err}`);
		return [];
	}
}

function saveMoodCount(moodCount) {
	try{
		fs.writeFileSync(moodCountPath, JSON.stringify(moodCount, null , 2), 'utf-8');
		console.log(`moodCount.json saved Successfully`);
	} catch(err) {
		console.error(`Error saving moodCount.json: ${err}`);
	}
}

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

app.get('/mood', (req, res) => {
	const mood = getMoodCount();
	res.json(mood);
});

app.post('/mood', (req, res) => {
	const newMood = req.body;
	const mood = newMood.title;
	const moodCount = getMoodCount();
	try {
		const moodExists = moodCount.find(item => item.title === mood);
		
		if(moodExists){
			moodExists.count += 1;
		} else {
			newMood.count = 1;
			moodCount.push(newMood);
		}
		console.log('Successfully added count');
		saveMoodCount(moodCount);
		res.status(200).send({success: true, message: 'Mood was updated successfully. :)'});
	} catch(err) {
		console.error(`Error adding count: ${err}`);
		res.status(500).send({success: false, message: 'Mood updated failed. :('});
	}
});

console.log('Server has started Successfully :)');
app.listen(PORT);