// letters 
const letters = "abcdefghijklmnopqrstuvwxyz"
// arr
let lettersArr = Array.from(letters)
// letters container
let lettersContainer = document.querySelector(".letters");
// generate letters 
lettersArr.forEach(letter => {
let span = document.createElement("span")
span.className = "letter-box"
span.textContent = letter
lettersContainer.append(span)
})
// object of word + categories
const words = {
programming: ["html", "javascript", "php", "python", "Angular"],
movies: ["Interstellar", "avengers", "End Game", "infinity war"],
people: ["eva", "nagy", "amr", "rana", "youssef" , "Elzero" , "Eljoker"],
countries: ["egypt" , "syria" , "palestine" , "yemen" , "Qatar"],
};
// radome property
  // كل الاقسام في مصفوفة
  let allKeys = Object.keys(words);
  // اختيار رقم عشوائي من اندكس المصفوفة
  let randomePropNumber = Math.floor(Math.random() * allKeys.length);
  // اختيار اسم عشوائي من الاقسام
  let randomePropName = allKeys[randomePropNumber];
  // جلب عناصر القسم العشوائي
  let randomPropValue = words[randomePropName];
  // اختيار رقم عشوائي من عناصر القسم
  let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
  // جلب قيمة الرقم العشوائي من عناصر القسم
  // chosen word
  let randomValue = randomPropValue[randomValueNumber];

// set categories info 
document.querySelector(".game-info .category span").innerHTML = randomePropName;

// select letter guess element
let letterGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValue);
lettersAndSpace.forEach(letter => {
let span = document.createElement("span")
// لو مسافه حط كلاس معين
if(letter == " ") {
   span.className = "with-Space"
}
letterGuessContainer.append(span)
})
// عدد الاخطاء
let wrongNumber = 0 
// مصفوفة فيها الرسمه كلها
let Draw = Array.from(document.querySelectorAll(".Draw div"));
//اضافة الجزء السفلي من الرسمة
Draw.unshift(document.querySelector(".Draw"));
// click letters
document.addEventListener("click" , (e)=> {
// set chose status
//عملتها جوا الكليك علشان مع كل ضغطة ترجع غلط  و تتحول ترو في حاله ان الحرف صح بس و ترجع تاني غلط مع الكليك الجديد
let theStatus = false;
if (e.target.className == "letter-box") {
   e.target.classList.add("clicked");
   // get clicked letter
   let theClickedLetter = e.target.innerHTML.toLowerCase();
   // Chosen word
   let theChosenWord = Array.from(randomValue.toLowerCase());
   theChosenWord.forEach((wordletter, index) => {
   // set chose status
   // الحرف موجود في الكلمة ولا لا
   if (theClickedLetter == wordletter) {
      theStatus = true;
      let spanLetters = document.querySelectorAll(".letters-guess span");
      // وضع الحرف المختار في المكان المناسب حسب الاندكس
      spanLetters[index].textContent = theClickedLetter;
      document.getElementById("success").play();
      let wordGuess = document.querySelector(".letters-guess").textContent;
      if (wordGuess == randomValue.replace(/\s/g, "")) {
      success();
      lettersContainer.classList.add("endGame");
      }
   }
   });
   if(!theStatus) {
   wrongNumber++
   for(let i = 0 ; i< wrongNumber ; i++) {
      Draw[i].style.display = "block";
   }
   document.getElementById("fail").play();
   if(wrongNumber == 8 ) {
      endGame()
      lettersContainer.classList.add("endGame")
   }
   }
}
})
// زر لاعادة اللعب
let reGameBtn = document.createElement("button")
reGameBtn.className = "Re-Game"
reGameBtn.textContent = "Play Again"
document.addEventListener("click" , (e) => {
   if(e.target.className == "Re-Game"){
      window.location.reload()
   }
})
// end game fun
function endGame() {
   let div = document.createElement("div")
   div.className = "popup"
   div.textContent = `Game Over , The Word is ${randomValue}`
   div.append(reGameBtn)
   document.body.append(div)
}
function success() {
   let div = document.createElement("div")
   div.className = "popup"
   div.textContent = `You won , number of your mistakes is ${wrongNumber}`;
      div.append(reGameBtn)
   document.body.append(div)
}