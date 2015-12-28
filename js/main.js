$(document).ready(function() {

	updateQuestion();

	$('.swing').on('click', function() {
		evaluateAnswer();
		updateBases();
		questionCount++;
		updateQuestion();
		checkWinOrLose();
	});

}); // End Ready

////////////////////////////////////
//-- Some global things in here --//
///////////////////////////////////

var hits = 0;
var outs = 0;
var questionCount = 0;
var questionsArray = '';
var DEBUG_MODE = true;

// Question class constructor

var Question = function (questionNumber, question, answer1, answer2, answer3, answer4, correctAnswer, fact) {
	this.questionNumber = questionNumber;
	this.question = question;
	this.answers = [answer1, answer2, answer3, answer4];
	this.correctAnswer = correctAnswer;
	this.fact = fact;
	if (DEBUG_MODE == true) {
		console.log("Question number " + this.questionNumber + " instantiated.");
	};
};

// Instantiated objects

var question1 = new Question(1, 'Who has played the most consecutive games of baseball?', 'Cal Ripken, Jr.', 'Barry Bonds', 'Lou Gehrig', 'Ken Griffey', 1, 'Cal played in 2,632 consecutive games!');
var question2 = new Question(2, 'What is the single season record for most stolen bases?', '165', '130', '122', '95', 2, 'Rickey Henderson did it in 1982.');
var question3 = new Question(3, 'Which team has NOT won a World Series', 'Pittsburgh Pirates', 'Baltimore Orioles', 'Texas Rangers', 'LA Angels', 3, 'The Yankees have won 27 WS.');
var question4 = new Question(4, 'Who is the only player to win 3 consecutive World Series on 3 different teams?', 'Babe Ruth', 'Herb Pennock', 'Eddie Collins', 'Don Baylor', 4, 'Don Baylor won with Red Sox (\'87), Twins and Athletics');
var question5 = new Question(5, 'Who was the first batter to win a triple crown?', 'Ty Cobb', 'Paul Hines', 'Tip O\'Neil', 'Roger Hornsby', 2, 'In 1878 Paul Hines batted .358, hit 4 HRs and had 50 RBIs.');
var question6 = new Question(6, 'What was the first team mascot?', 'Paws', 'Slider', 'Phanatic', 'Mr. Met', 4, 'Mr. Met, Phanatic and Slider have all been inducted in the hall of fame.');

var questionsArray = [question1, question2, question3, question4, question5, question6];

// Functions

function evaluateAnswer (answer) {
	// evaluates whether a submitted answer is correct
	// increments hits or outs accordingly
	var answer = $("input[type='radio']:checked").val();
	if (answer == questionsArray[questionCount].correctAnswer) {
		hits++;
		$('.hits').empty().append(hits);
		// placeholder for changing bases image
		if (DEBUG_MODE == true) {
			console.log("Correct!");
			console.log("current hits: " + hits);
			} //end debug

	} else {
		outs++;
		$('.outs').empty().append(outs);
		if (DEBUG_MODE == true) {
			console.log("Got an out.");
			console.log("Out # " + outs);
		}
	}
};


function updateBases () {
	// changes out the images of the bases to the correct case
	// based on # of hits
	var image = $('.diamond-box img');
	switch(hits) {
		case 1:
			image.attr("src", "images/1hit.png");
			break;
		case 2:
			image.attr("src", "images/2hit.png");
			break;
		case 3:
			image.attr("src", "images/3hit.png");
			break;
		case 4:
			image.attr("src", "images/4hit.png");
			break;
		default:
			image.attr("src", "images/field.png");
	}
};

function updateQuestion () {
	// updates question material on page with quesitons and answers

	// setup some variables to make it easier to use
	var label1 = $('#label1');
	var label2 = $('#label2');
	var label3 = $('#label3');
	var label4 = $('#label4');
	var qmsg = $('.question');
	var qcount = $('.question-count');
	var factoid = $('.fact');

	// append count
	qcount.empty().append(questionCount + 1);

	//append actualy question
	qmsg.empty().append(questionsArray[questionCount].question);

	// and the possible answers
	label1.empty().append(questionsArray[questionCount].answers[0]);
	label2.empty().append(questionsArray[questionCount].answers[1]);
	label3.empty().append(questionsArray[questionCount].answers[2]);
	label4.empty().append(questionsArray[questionCount].answers[3]);

	// append fact
	if (questionCount > 0) {
		factoid.empty().append(questionsArray[questionCount - 1].fact);
	}
};

function checkWinOrLose () {
	// self explanatory
	if (hits == 4) {
		console.log('WIN!');
		$('.header').empty().append('<h1>You Win the Game!</h1> <span><button class="new-game">New Game</button>');
		$('.new-game').on('click', function() {
			console.log('New game button clicked') //sanity check
			newGame();
		});
	} else if (outs == 3) {
		console.log('Inning Over!');
		$('.header').empty().append('<h1>Inning Over! You Lose...</h1> <span><button class="new-game">New Game</button>');
		$('.new-game').on('click', function() {
			console.log('New game button clicked') //sanity check
			newGame();
		});
	} else {
		console.log('Keep Going');
	}
};

function newGame () {
	// resets game, not working.
	console.log('function newGame called...')
	hits = 0;
	outs = 0;
	questionCount = 0;
	updateQuestion();
	updateBases();
	$('.header').empty().append('<h1>Play Ball!</h1>')
	$('.hits').empty().append('0');
	$('.outs').empty().append('0');
};
