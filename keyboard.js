// by class
var buttons = document.getElementsByClassName("buttons");
var typingSection = document.getElementsByClassName("typingSection");
var typedWord = document.getElementsByClassName("typedWord");
var currentTime = document.getElementsByClassName("currentTime");
var wordsCount = document.getElementsByClassName("wordsCount");
var characterCount = document.getElementsByClassName("characterCount");
var percentage = document.getElementsByClassName("percentage");

var outputDiv = document.getElementsByClassName("output-div");
var typingArea = document.getElementsByClassName("typingArea-div");
var keyboardDiv = document.getElementsByClassName("keyboard-div");

// by id
var textForTyping = document.getElementById("textForTyping");
var correctText = document.getElementById("correctText");
var remaningText = document.getElementById("remaningText");
var wrongText = document.getElementById("wrongText");
var output = document.getElementById("output");

var selected = 0;
var startSetTimeOut = 1;
var isBackspaceClicked = false;

const paragraphs = [
  "India is a great country having different cultures, castes, creed, religions but still, they live together. India is known for its heritage, spices, and of course, for people who live here. That's the reasons India is famous for the common saying of “unity in diversity”.",
  "So if on advanced addition absolute received replying throwing he. Delighted consisted newspaper of unfeeling as neglected so. Tell size come hard mrs and four fond are.In commanded earnestly resources it. At quitting in strictly up wandered of relation answered felicity.",
  "The Indian Army is the land-based branch of the Indian Armed Forces. It is the world's second-largest standing army and the largest army. The President of India is the Supreme Commander of the Indian Army, and it is commanded by the Chief of Army Staff (COAS), who is a four-star general.",
  "Electric Vehicles are means of transport that consume eclectic energy as fuel instead of traditional fuels such as petrol, diesel, and CNG. These vehicles may be powered through a collector system by electricity from off-vehicle sources or maybe inbuilt with a battery, solar panels, fuel cells",
  "Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving",
  "What is machine learning? Machine learning is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy.such as Netflix’s recommendation engine and self-driving cars.",
  "Since deep learning and machine learning tend to be used interchangeably, it’s worth noting the nuances between the two. Machine learning, deep learning, and neural networks are all sub-fields of artificial intelligence. However, neural networks is actually a sub-field of machine learning.",
  "Where the railway was first introduced in India in 1853. As of today, its operations include 29 states and 7 union territories. Along with this, it also provides international services to its neighboring countries Nepal, Bangladesh and Pakistan. Indian Railways is one of the busiest rail networks in the world.",
  "Villages have either tiny hamlets of thatched huts or large settlements of tiled roofs, stones, and brick homes. An impression has been created by artists and filmmakers that an Indian village is a simple cluster of mud-plastered walls, shaded by trees, overlooking the large expanses of green fields.",
  "The introduction of electric power in the 19th century led to the rise of electrical and hybrid electro-mechanical devices to carry out both digital (Hollerith punch-card machine) and analog (Bush’s differential analyzer) calculation. Telephone switching came to be based on this technology.",
  "Doctors all over the world are given the stature next to God. It happens so mostly because they are lifesavers who work tirelessly for mankind. Moreover, being a doctor is considered one of the most sought-after professions. People want their kids to become doctors and they instill this dream in them from an early age.",
];

let number = Math.floor(Math.random() * paragraphs.length);

remaningText.innerHTML = paragraphs[number];
var splitedArr = paragraphs[number].split("");

document.addEventListener("keydown", (event) => {
  // console.log(event);
  let i = 0;
  for (; i < buttons.length; i++) {
    if (event.key === "Backspace") {
      // console.log("backspace clicked");
      isBackspaceClicked = true;

      // console.log(output.innerHTML.split('  ').splice(-2,-1));
      // output.innerHTML = output.innerHTML.split('<span',output.innerHTML.length-1).pop();
      // console.log('clicked');
      break;
    } else if (
      buttons[i].id == event.code ||
      buttons[i].textContent == event.code
    ) {
      buttons[i].classList.toggle("afterPress");
      selected = i; // after clicking button we toggles the class.
      console.log("button clicked");
      return;
    } else {
      for (let i = 0; i < buttons.length; i++) {
        buttons[selected].className = "buttons";
      }
    }
  }
});

document.addEventListener("keyup", () => {
  buttons[selected].className = "buttons";
});

function updateTypingCount(e) {
  typedWord[0].innerHTML = "Typed Character : " + typingSection[0].value.length;

  // checkCharacter();     // important dont remove
  checkChar();
  // console.log(e);

  if (typingSection[0].value.length == startSetTimeOut) {
    startSetTimeOut = -1;
    var second = 0;

    var intervalId = setInterval(() => {
      currentTime[0].innerHTML = 10 - ++second;
      if (second == 10) {
        clearInterval(intervalId);
        checWPM();
      }
    }, 1000);
  }
}

function checkChar() {
  if (isBackspaceClicked === false) {
    if (
      typingSection[0].value[typingSection[0].value.length - 1] ===
      splitedArr[typingSection[0].value.length - 1]
    ) {
      output.innerHTML += `<span class='correctText' style="color:green">${
        splitedArr[typingSection[0].value.length - 1]
      }</span>`;
      remaningText.innerHTML = paragraphs[number].substring(
        typingSection[0].value.length,
        paragraphs[number].length
      );
    } else {
      output.innerHTML += `<span class='correctText' style="color:red" >${
        typingSection[0].value[typingSection[0].value.length - 1]
      }</span>`;
      remaningText.innerHTML = paragraphs[number].substring(
        typingSection[0].value.length,
        paragraphs[number].length
      );
    }
  } else {
    isBackspaceClicked = false;
    document.getElementsByClassName('correctText')[ document.getElementsByClassName('correctText').length-1].remove()       // remove last element from html collection arrname[index].remove()
    console.log(remaningText.innerHTML.length);
    console.log(document.getElementsByClassName('correctText').length);

    remaningText.innerHTML = paragraphs[number].substring(document.getElementsByClassName('correctText').length);
  }
}
function checkCharacter() {
  if (
    typingSection[0].value[typingSection[0].value.length - 1] ===
    paragraphs[number][typingSection[0].value.length - 1]
  ) {
    correctText.innerHTML = paragraphs[number].substring(
      0,
      typingSection[0].value.length
    );
    wrongText.innerHTML = "";
    remaningText.innerHTML = paragraphs[number].substring(
      typingSection[0].value.length,
      paragraphs[number].length
    );
  } else {
    wrongText.innerHTML = remaningText.innerHTML.substring(0, 1);
  }
}

function checWPM() {
  let spaceCount = 1;
  let typedWord = typingSection[0].value;

  // for (let i = 0; i < typedWord.length; i++) {
  //   if (typedWord[i] === " ") spaceCount++;
  // }
  spaceCount = typingSection[0].value.split(" ").length;

  typingArea[0].classList.add("displayNone");
  keyboardDiv[0].classList.add("displayNone");
  outputDiv[0].classList.add("displayBlock");
  if (typedWord.length == 0) spaceCount = 0;

  wordsCount[0].innerHTML = "Typed Words per minute : " + spaceCount + " Words";
  characterCount[0].innerHTML =
    "Typed Character in one minute :  " +
    typingSection[0].value.length +
    " Character";

  percentage[0].innerHTML =
    "Completed : " +
    Math.round(
      (document.getElementsByClassName('correctText').length /
        (document.getElementsByClassName('correctText').length + remaningText.innerHTML.length)) *
        100
    ) +
    "%";

    // console.log(document.getElementsByClassName('correctText').length);
    // console.log(remaningText.innerHTML.length);
}

function resetPage() {
  location.reload();
}


