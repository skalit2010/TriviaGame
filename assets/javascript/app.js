<<<<<<< HEAD
$(document).ready(function() {

	var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
	var selecterAnswer;
	var questionArray = [
		{ 	
			question: " Which built-in method calls a function for each element in the array?",
			answers: [
				{text: "forEach", isCorrect: true},
				{text: "loop()", isCorrect: false},
				{text: "while()", isCorrect: false},
				{text: "none of the above", isCorrect: false}
			]
		},
		{	
			question: "JavaScript a case-sensitive language",
			answers: [
				{text: "False", isCorrect: false},
				{text: "True", isCorrect: true}
			]
		},
		{
			question: "How can you get the type of arguments passed to a function?",
			answers: [
				{text: "using getType function", isCorrect: false},
				{text: "using typeof operator", isCorrect: true},
                {text: "Both of the above", isCorrect: false},
                {text: "None of the above", isCorrect: false}
			]
		},
		{ 
			question: "Which of the following function of Number object returns a string value version of the current number?",
			answers: [
				{text: "toFixed()", isCorrect: false},
				{text: "toLocaleString()", isCorrect: false},
				{text: "toPrecision()", isCorrect: false},
				{text: "toString()", isCorrect: true}
			]
		},
		{
			question: "Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
			answers: [
                {text: "concat()", isCorrect: false},
                {text: "search()", isCorrect: true},
                {text: "match()", isCorrect: false},
                {text: "replace()", isCorrect: false}
			]
		},
		{
			question: "Which of the following function of String object creates a string to be displayed as bold as if it were in a <b> tag?",
			answers: [
				{text: "anchor()", isCorrect: false},
				{text: "big()", isCorrect: false},
				{text: "bold()", isCorrect: true},
				{text: "blink()", isCorrect: false}
			]
		},
		{ 
			question: "Which of the following function of String object causes a string to be displayed as struck-out text, as if it were in a <strike> tag?",
			answers: [
				{text: "sup()", isCorrect: false},
				{text: "strike()", isCorrect: true},
				{text: "smalll()", isCorrect: false},
				{text: "sub()", isCorrect: false}
			]	
		},
		{
			question: "Which of the following function of Array object creates a new array with the results of calling a provided function on every element in this array?",
			answers: [
				{text: "map()", isCorrect: true},
				{text: "push()", isCorrect: false},
				{text: "join()", isCorrect: false},
				{text: "pop()", isCorrect: false}
			]
		},
		{
			question: "Which of the following function of Array object adds one or more elements to the front of an array and returns the new length of the array?",
			answers: [
				{text: "splice()", isCorrect: false},
				{text: "sort()", isCorrect: false},
				{text: "unshift()", isCorrect: true},
				{text: "toString()", isCorrect: false}
			]
		},
		{
			question: "Which built-in method sorts the elements of an array?",
			answers: [
			 {text: "changeOrder(order)", isCorrect: false},
			 {text: "sort()", isCorrect: true},
			 {text: "order()", isCorrect: false},
			 {text: "None of the above", isCorrect: false}
			]
		}
	];

	
	function generateHTML() {
		var timeRemainingText = "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
		var questionText = "<p class='questionText text-center'>" + questionArray[questionCounter].question + "</p>";
		gameHTML = timeRemainingText + questionText;
		$(".mainArea").html(gameHTML);
		for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-block text-center");
			answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
			answerButton.html(questionArray[questionCounter].answers[i].text);
			$(".mainArea").append(answerButton);
		}
	}

	function generateWin() {
		correct++;
		var correctAnswerText = "<p class='correctText text-center'>CORRECT!</p>";
		var imgHTML = "<img class='center-block imgCorrect' src='assets/images/mark.png'>";
		gameHTML = correctAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/button.png'>";
		gameHTML = wrongAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000); 
	}

	function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/bell.png'>";
		gameHTML =  timeOutText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function timer() {
		clock = setInterval(twentySeconds, 1000);
		function twentySeconds() {
			if (counter === 0) {
				clearInterval(clock);
				generateLossAtTimeOut();
			} else if (counter > 0) {
				counter--;
			}
			$("#timer").html(counter);
		}
	}

	// function that generates html for the next screen, increments the question counter, and resets timer
	function nextDisplay() {
		if (questionCounter < questionArray.length - 1) {
			questionCounter++;
			generateHTML();
			counter = 20;
			timer();
		} else {
			finalScreen();
		}
	}

	function finalScreen() {
		var finishedText = "<p class='finishedText text-center'>Here Are Your Results!</p>";
		var summaryCorrectHTML = "<p class='summaryCorrect text-center'>Correct Answers: " + correct + "</p>";
		var summaryWrongHTML = "<p class='summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>";
		var summaryUnansweredHTML = "<p class='summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>";
		var resetButtonHTML = "<button class='resetButton btn btn-primary btn-lg btn-block text-center' type='button'>WANNA PLAY AGAIN?</button>";
		gameHTML = finishedText + summaryCorrectHTML + summaryWrongHTML + summaryUnansweredHTML + resetButtonHTML;
		$(".mainArea").html(gameHTML);
	}

	function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 20;
		generateHTML();
		timer();
	}

	// Function that creates the start button and initial screen
	function initialScreen() {
		var initialText = "<p class='initialText text-center'>Do you know JavaScript? Take this quiz to find out.</p> <p class='initialText text-center'>There are 10 questions total and you will have 20 seconds to answer each one. Good luck!</p>";
		var startButtonHTML = "<button class='startButton btn btn-light btn-lg btn-block text-center' type='button'>Start Quiz</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
	}

	// When the start button is clicked:
	$("body").on("click", ".startButton", function(event){ 
		generateHTML();
		timer();
	});

	// When an answer is clicked:
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).attr("isCorrect");
		console.log(selectedAnswer);

		if (selectedAnswer === "true") { // evaluates if this is the correct answer
			clearInterval(clock);
		 	generateWin();
		} else { 	// then it's the wrong answer
			clearInterval(clock);
			generateLoss();
		}

	}); 

	// When the Play Again button is clicked:
	$("body").on("click", ".resetButton", function(event){
		resetGame();
	}); 

	initialScreen();

});  

=======
$(document).ready(function() {

	var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
	var selecterAnswer;
	var questionArray = [
		{ 	
			question: "What song did EXO debut with?",
			answers: [
				{text: "MAMA", isCorrect: true},
				{text: "Call Me Baby", isCorrect: false},
				{text: "Growl", isCorrect: false},
				{text: "Wolf", isCorrect: false}
			]
		},
		{	
			question: "Which past member left EXO first?",
			answers: [
				{text: "Tao", isCorrect: false},
				{text: "Kris", isCorrect: true},
				{text: "Luhan", isCorrect: false},
			]
		},
		{
			question: "How many Daesang awards has EXO accumulated?",
			answers: [
				{text: "8", isCorrect: false},
				{text: "23", isCorrect: true},
                {text: "151", isCorrect: false},
                {text: "70", isCorrect: false}
			]
		},
		{ 
			question: "What company is EXO under?",
			answers: [
				{text: "YG", isCorrect: false},
				{text: "Big Hit", isCorrect: false},
				{text: "JYP", isCorrect: false},
				{text: "SM", isCorrect: true}
			]
		},
		{
			question: "When did EXO Debut?",
			answers: [
                {text: "2013", isCorrect: false},
                {text: "2012", isCorrect: true},
                {text: "2011", isCorrect: false},
                {text: "2014", isCorrect: false}
			]
		},
		{
			question: "Who is EXO's leader?",
			answers: [
				{text: "Sehun", isCorrect: false},
				{text: "Chen", isCorrect: false},
				{text: "Suho", isCorrect: true},
				{text: "D.O.", isCorrect: false}
			]
		},
		{ 
			question: "Which of their music videos has the most views on Youtube?",
			answers: [
				{text: "MAMA", isCorrect: false},
				{text: "Call Me Baby", isCorrect: true},
				{text: "Power", isCorrect: false},
				{text: "Ko Ko Bop", isCorrect: false}
			]	
		},
		{
			question: "Who is the last Chinese member to remain in EXO?",
			answers: [
				{text: "Lay", isCorrect: true},
				{text: "Xiumin", isCorrect: false},
				{text: "Luhan", isCorrect: false}
			]
		},
		{
			question: "Who is NOT part of the vocal line?",
			answers: [
				{text: "Chen", isCorrect: false},
				{text: "Baekhyun", isCorrect: false},
				{text: "Sehun", isCorrect: true},
				{text: "D.O.", isCorrect: false}
			]
		},
		{
			question: "What is their most recent song as of November 2018?",
			answers: [
			 {text: "Blooming Days", isCorrect: false},
			 {text: "Ko Ko Bop", isCorrect: false},
			 {text: "Power", isCorrect: false},
			 {text: "Don't Mess Up My Tempo", isCorrect: true}
			]
		}
	];

	
	function generateHTML() {
		var timeRemainingText = "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
		var questionText = "<p class='questionText text-center'>" + questionArray[questionCounter].question + "</p>";
		gameHTML = timeRemainingText + questionText;
		$(".mainArea").html(gameHTML);
		for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-block text-center");
			answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
			answerButton.html(questionArray[questionCounter].answers[i].text);
			$(".mainArea").append(answerButton);
		}
	}

	function generateWin() {
		correct++;
		var correctAnswerText = "<p class='correctText text-center'>CORRECT!</p>";
		var imgHTML = "<img class='center-block imgCorrect' src='assets/images/thumbsup.gif'>";
		gameHTML = correctAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/no.gif'>";
		gameHTML = wrongAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000); 
	}

	function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/x.png'>";
		gameHTML =  timeOutText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function timer() {
		clock = setInterval(twentySeconds, 1000);
		function twentySeconds() {
			if (counter === 0) {
				clearInterval(clock);
				generateLossAtTimeOut();
			} else if (counter > 0) {
				counter--;
			}
			$("#timer").html(counter);
		}
	}

	// function that generates html for the next screen, increments the question counter, and resets timer
	function nextDisplay() {
		if (questionCounter < questionArray.length - 1) {
			questionCounter++;
			generateHTML();
			counter = 20;
			timer();
		} else {
			finalScreen();
		}
	}

	function finalScreen() {
		var finishedText = "<p class='finishedText text-center'>Here Are Your Results!</p>";
		var summaryCorrectHTML = "<p class='summaryCorrect text-center'>Correct Answers: " + correct + "</p>";
		var summaryWrongHTML = "<p class='summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>";
		var summaryUnansweredHTML = "<p class='summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>";
		var resetButtonHTML = "<button class='resetButton btn btn-primary btn-lg btn-block text-center' type='button'>WANNA PLAY AGAIN?</button>";
		gameHTML = finishedText + summaryCorrectHTML + summaryWrongHTML + summaryUnansweredHTML + resetButtonHTML;
		$(".mainArea").html(gameHTML);
	}

	function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 20;
		generateHTML();
		timer();
	}

	// Function that creates the start button and initial screen
	function initialScreen() {
		var initialText = "<p class='initialText text-center'>How much do you know about EXO?</p> <p class='initialText text-center'>There are 10 questions total and you will have 20 seconds to answer each one. Good luck!</p>";
		var startButtonHTML = "<button class='startButton btn btn-light btn-lg btn-block text-center' type='button'>Start Quiz</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
	}

	// When the start button is clicked:
	$("body").on("click", ".startButton", function(event){ 
		generateHTML();
		timer();
	});

	// When an answer is clicked:
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).attr("isCorrect");
		console.log(selectedAnswer);

		if (selectedAnswer === "true") { // evaluates if this is the correct answer
			clearInterval(clock);
		 	generateWin();
		} else { 	// then it's the wrong answer
			clearInterval(clock);
			generateLoss();
		}

	}); 

	// When the Play Again button is clicked:
	$("body").on("click", ".resetButton", function(event){
		resetGame();
	}); 

	initialScreen();

});  

>>>>>>> c2650142d86227c190a38a9097728b4fea993cc5
