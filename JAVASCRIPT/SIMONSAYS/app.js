let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];   //yh un button ko acess krne ke lie,basicallybunki class hai 

let started = false;        // shuruaat me false mtlb band hai 
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {  //taaki aik hi baar ho ,jab only false ho tab vrna baar baar started true karate rhenge
    console.log("game is started");
    started = true;

    levelUp();  //kuki baar baar yh hoga na to function bnanado
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");  //aik new class add krdi jisse color change ho taki wo flash ho
  setTimeout(function () {
    btn.classList.remove("flash");  //0.5sec ko us class ko remove kardia
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;   
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);  //aik random button un chaaro me se access krlia unki class ki base pe
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");    //kewal uska color , konsa press hua usko track kren ke lie 
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {  //sabko initial value dedi taaki sab reset hojaaye 
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
