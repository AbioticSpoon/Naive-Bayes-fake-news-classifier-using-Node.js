// Importting required modules
const express = require('express');
const natural = require('natural');
const NaiveBayes = require('node-naive-bayes');
const aposToLexForm = require('apos-to-lex-form');
const SW = require('stopword');

var SpellCorrector = require('spelling-corrector');
var spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Naive-Bayes-classifier
const naiveBayes = new NaiveBayes();
const test_data = naiveBayes.trainFromFile('./test.txt');

// Home-Get-Route
app.get('/', (req, res) => {
	res.render('home');
});

// Post-Route
app.post('/forward', (req, res) => {
	const text = req.body.text;

	// Text pre-processing starts here

	const lexedReview = aposToLexForm(text); // Turn words like didn't into did not.
	const casedReview = lexedReview.toLowerCase(); // turn words to lowercase
	const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, ''); //omit special characters

	const { WordTokenizer } = natural;
	const tokenizer = new WordTokenizer();
	const tokenizedReview = tokenizer.tokenize(alphaOnlyReview); // Tokenized each word

	tokenizedReview.forEach((word, index) => {
		tokenizedReview[index] = spellCorrector.correct(word); //spell correction
	});

	const filteredReview = SW.removeStopwords(tokenizedReview); // remove stop words
	const stringText = filteredReview.toString();

	const finalText = stringText.replace(',', ' ');

	// text pre processing ends here

	// console.log(finalText);
	const out = naiveBayes.classify(finalText, 'unknown');
	res.render('ok', { out: out });
});

// Listen-Route
app.listen(PORT, () => {
	console.log('Server has started');
});
