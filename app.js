const cat=document.getElementById("cat");
const ques=document.getElementById("question")
const choices=Array.from(document.getElementsByClassName("input-group-text"));
const queno=document.getElementById("quecnt");
const scr=document.getElementById("scr");
const que1=document.getElementById("game");
const loader=document.getElementById("laod");
const progressfullbar=document.getElementById("progressfullbar")



let currentquestion={};
let acceptingAns=false;
let score=0;
let quecnt=0;
let availque=[];
let link=["https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple",
          "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple",
          "https://opentdb.com/api.php?amount=10&category=19&type=multiple",
          "https://opentdb.com/api.php?amount=10&category=21&type=multiple",
          "https://opentdb.com/api.php?amount=10&category=17&type=multiple",
          "https://opentdb.com/api.php?amount=10&category=9&type=multiple"]

let questions=[];
const ind=Math.floor(Math.random()*6);
console.log(ind);

fetch(link[ind]).then(res=>{
  return res.json();
}).then(loadque=>{
  console.log(loadque.results);
  questions=loadque.results.map(loadq=>{
    const formate={
      question: loadq.question
    };
    cat.innerHTML=loadq.category;
    const anschoices=[... loadq.incorrect_answers];
    formate.answer=Math.floor(Math.random()*3)+1;
    anschoices.splice(
      formate.answer-1,0,loadq.correct_answer
    );
    anschoices.forEach((choice, index) => {
      formate["choice"+(index+1)]=choice;

    });
    return formate;
  });
//  questions=loadque;

  startgame();
})
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
startgame = () =>{
  quecnt=0;
  score=0;
  availque=[...questions];
  //console.log(availque);
  que1.classList.remove("hidden");
 loader.style.display="none";
  getnewque();
};

getnewque = () =>{
  if (availque.length === 0 || quecnt >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign("end.html");
    }
  quecnt++;
  queno.innerHTML="Question "+quecnt+"/"+MAX_QUESTIONS;
  progressfullbar.style.width=(quecnt/MAX_QUESTIONS)*100+"%";
  scr.innerHTML=score;
  const queind=Math.floor(Math.random()*availque.length);
  console.log(queind);
  currque=availque[queind];
  //console.log(currque.question);
  ques.innerHTML=currque.question;
  //console.log(ques);
  choices.forEach((choice) => {
  //  console.log(choice);
        const number = choice.dataset['number'];
        //console.log(number);
        choice.innerHTML = currque['choice' + number];
    });


  availque.splice(queind,1);
  acceptingAns = true;
};
choices.forEach((choice) => {

    choice.addEventListener('click', (e) => {
        if (!acceptingAns) return;

      acceptingAns= false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
      // console.log((selectedAnswer==currque.answer));
        const colortoapply = selectedAnswer==currque.answer ?'green':'red';
        console.log(selectedChoice);
        if(selectedAnswer==currque.answer )
        score+=10;
        //console.log(  selectedChoice.parentElement.classList);
        //  selectedChoice.classList.add(classtoapply);
            selectedChoice.style.background=colortoapply;
        //
        //selectedChoice.parentElement.classList.remove(classtoapply);
      setTimeout(function () {
           selectedChoice.style.background="";

          getnewque();
      }, 1000);


    });
});


//startgame();
