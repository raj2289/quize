const highscoreList=document.getElementById("highscoreList");
const highscore=JSON.parse(localStorage.getItem('highscore')) ||[];
console.log(highscore);

highscoreList.innerHTML=highscore.map(score=>{
  console.log(score.name);
  console.log(score.scr);
  return `<li class="high-score">${score.name}-${ score.scr}</li>`;
}).join("");
