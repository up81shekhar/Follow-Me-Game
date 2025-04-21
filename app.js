let userRecord = [];
let gameRecord =[];
let choice = ["yellow","red","blue","green"];
let start = false;
let level = 0;
let highScore = 0;

h2 = document.querySelector("h2");

document.addEventListener("keypress",()=>{
    if (start == false) {
        start = true;
        levelUp();
    }
});

function levelUp(){
    userRecord = [];
    level++;
    h2.innerText = `LEVEL ${level}`;

    if (highScore < level) {
        highScore = level;
    } 

    let rdmIdx = Math.floor(Math.random()*4);
    let rdmCol = choice[rdmIdx];
    let rdmBtn = document.querySelector(`.${rdmCol}`);

    gameRecord.push(rdmCol);
    gameFlash(rdmBtn);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 200);
}

let btns = document.querySelectorAll('.A1');
for(btn of btns){
    btn.addEventListener("click",btnPress);
}

function btnPress(){
    let btn = this;
    userflash(btn);

    userCol = btn.getAttribute('id');
    userRecord.push(userCol);
    
    checkAns(userRecord.length-1);
}

function userflash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
    btn.classList.remove("userFlash");
    },200);
}

function checkAns(idx){
    if(userRecord[idx] === gameRecord[idx]){
        if(userRecord.length === gameRecord.length){
            setTimeout(levelUp,800);
        }
    }else{
        h2.innerHTML = `Game Over! <br> Your Score was <b> ${level} </b> <br> Highest Score is ${highScore} <br> Press any key to Start.`;
        document.querySelector("body").classList.add('over');
        setTimeout(function(){
            document.querySelector("body").classList.remove('over'); 
        },200);
        reset();
    }
}

function reset(){
    start = false;
    level = 0;
    userRecord = [];
    gameRecord = [];
}