const express = require('express');
const NaiveBayes = require('node-naive-bayes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const naiveBayes = new NaiveBayes();

const test_data = naiveBayes.trainFromFile('./test.txt');

// console.log('quick rabbit: ', naiveBayes.classify('allow this', 'unknown'));

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/forward', (req, res) => {
	const text = req.body.text;
	const out = naiveBayes.classify(text, 'unknown');
	res.render('ok', { out: out });
});

app.listen(PORT, () => {
	console.log('Server has started');
});
