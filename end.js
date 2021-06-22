const hiscore=document.getElementById("hiscore");
const s=localStorage.getItem("mostRecentScore");
hiscore.innerHTML=s;
const username=document.getElementById("user");
const submit=document.getElementById("submit");
username.addEventListener('keyup',()=>
{
submit.disabled = !username.value;
});
const highscore = JSON.parse(localStorage.getItem('highscore')) || [];
console.log(username.value);
storehighsc= (e) =>{
  e.preventDefault();
 const score={
    scr: s,
    name:username.value,
  };
  highscore.push(score);
  highscore.sort((a,b) => b.scr-a.scr);
  highscore.splice(5);
  localStorage.setItem('highscore',JSON.stringify(highscore));
    console.log(highscore);
//  window.location.assign('/');

};
//submit.addEventListener("onclick",storehighsc());
