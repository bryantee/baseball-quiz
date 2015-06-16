$(document).ready(function() {

	updateQuestion();

	$('button').on('click', function() {
		evaluateAnswer();
		updateBases();
		questionCount++;
		updateQuestion();
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

var Question = function (questionNumber, question, answer1, answer2, answer3, answer4, correctAnswer) {
	this.questionNumber = questionNumber;
	this.question = question;
	this.answers = [answer1, answer2, answer3, answer4];
	this.correctAnswer = correctAnswer;
	if (DEBUG_MODE == true) {
		console.log("Question number " + this.questionNumber + " instantiated.");
	};
};

// Instantiated objects

var question1 = new Question(1, 'Who has played the most consecutive games of baseball?', 'Cal Ripken, Jr.', 'Barry Bonds', 'Lou Gehrig', 'Ken Griffey', 1);
var question2 = new Question(2, 'What is season record for most stolen bases?', '165', '130', '122', '95', 2);
var question3 = new Question(3, 'Which team has NOT won a World Series', 'Pittsburgh Pirates', 'Baltimore Orioles', 'Texas Rangers', 'LA Angels', 3);
var question4 = new Question(4, 'Who is the only player to win 3 consecutive World Series on 3 different teams?', 'Babe Ruth', 'Herb Pennock', 'Eddie Collins', 'Don Baylor', 4);
var question5 = new Question(5, 'Who was the first batter to win a triple crown?', 'Ty Cobb', 'Paul Hines', 'Tip O\'Neil', 'Roger Hornsby', 2);
var question6 = new Question(6, 'What was the first team mascot?', 'Paws', 'Slider', 'Phanatic', 'Mr. Met', 4);

var questionsArray = [question1, question2, question3, question4, question5, question6];

// Functions

function evaluateAnswer (answer) {
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
	if (hits == 4) {
		console.log('WIN!');
	} else if (outs == 3) {
		console.log('Inning Over!');
	} else {
		console.log('Keep Going');
	}
};


function updateBases () {
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

	// append count
	qcount.empty().append(questionCount + 1);

	//append actualy question
	qmsg.empty().append(questionsArray[questionCount].question);

	// and the possible answers
	label1.empty().append(questionsArray[questionCount].answers[0]);
	label2.empty().append(questionsArray[questionCount].answers[1]);
	label3.empty().append(questionsArray[questionCount].answers[2]);
	label4.empty().append(questionsArray[questionCount].answers[3]);
};