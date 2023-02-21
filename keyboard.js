var buttons = document.getElementsByClassName("buttons");
var typingSection = document.getElementsByClassName("typingSection");
var typedWord = document.getElementsByClassName("typedWord");
var currentTime = document.getElementsByClassName("currentTime");
var selected = 0;
var startSetTimeOut = 1;

document.addEventListener("keydown", (event) => {
  // console.log("event ", event);
  let i = 0;
  for (; i < buttons.length; i++) {
    if (buttons[i].id == event.code || buttons[i].textContent == event.code) {
      buttons[i].classList.toggle("afterPress");
      selected = i; // after clicking button we toggles the class.
      return;
    } else {
      for (let i = 0; i < buttons.length; i++) {
        buttons[selected].className = "buttons";
      }
      // selected = -1;
    }
  }
});

document.addEventListener("keyup", () => {
  // console.log(selected);
  buttons[selected].className = "buttons";

});

function updateTypingCount() {
  typedWord[0].innerHTML = "Typed Character : " + typingSection[0].value.length;

  if (typingSection[0].value.length == startSetTimeOut) {
    startSetTimeOut = -1;
    var second = 0;

    var intervalId = setInterval(() => {
      currentTime[0].innerHTML = 60 - ++second;
      if (second == 60) {
        clearInterval(intervalId);
        checWPM();
      }
    }, 1000);

    console.log(intervalId);
  }
}

function checWPM() {
  let spaceCount = 1;
  let typedWord = typingSection[0].value;
  console.log(typingSection[0].value);

  for (let i = 0; i < typedWord.length; i++) {
    if (typedWord[i] === " ") spaceCount++;
  }

  alert("Typed Words per minute : " + spaceCount + " Words");
}

function getParagraph() {
  location.reload();
}
