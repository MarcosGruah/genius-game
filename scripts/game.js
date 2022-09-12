const colors = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let highestScore = 0;
let gameLevel = 0;
let gameStarted = false;
let buttonsActive = false;

$(".btn").click(function () {
  if (gameStarted && buttonsActive) {
    clickAnimation(this.id);
    userPattern.push(this.id);
    checkAnswer(this.id, userPattern.length - 1);
  }
});

$("#level-title").click(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

function nextSequence() {
  gameLevel++;
  userPattern = [];
  $("#level-title").text(`Game Level: ${gameLevel}`);
  footerText("Computer Turn");
  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);
  gamePattern.forEach((color, index) => {
    setTimeout(() => {
      playSound(color);
      selectedAnimation(color);
      if (index === gamePattern.length - 1) {
        setTimeout(() => {
          buttonsActive = true;
          footerText("Player Turn");
        }, 500);
      }
    }, 500 * (index + 1));
  });
}

function checkAnswer(id, index) {
  if (gamePattern[index] === userPattern[index]) {
    playSound(id);
    if (gamePattern.length === userPattern.length) {
      buttonsActive = false;
      nextSequence();
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  if (gameLevel > highestScore) {
    highestScore = gameLevel - 1;
    $("#footer-highestScore").text(`Highest Score: ${highestScore}`);
  }
  gamePattern = [];
  gameLevel = 0;
  buttonsActive = false;
  gameStarted = false;
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Click Here to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  footerText("GAME OVER");
}

function clickAnimation(id) {
  $(`#${id}`).addClass("pressed");
  setTimeout(() => {
    $(`#${id}`).removeClass("pressed");
  }, 100);
}

function selectedAnimation(id) {
  $(`#${id}`).fadeOut(200).fadeIn(200);
}

function playSound(id) {
  let audio = new Audio(`./sounds/${id}.mp3`);
  audio.play();
}

function footerText(text) {
  $("#footer-title").text(text);
}
