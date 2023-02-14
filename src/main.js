//최종 체스게임 실행코드

import { board_init } from "./board.js";
import {program} from "./board.js";
import { score_total } from "./score.js";
//프로그램 실행 -> 체스보드초기화

const chess = new program(); //객체생성

const board_i = board_init();
let app = document.querySelector('#app');
let scores = document.querySelector("#score");

app.innerHTML = "&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>";
console.log('(프로그램실행)')
console.log("체스 보드를 초기화했습니다")
board_i.forEach((i, idx) => {
  let str = "";
	i.forEach((ii, index) =>{
    
    
    str += (String.fromCharCode(parseInt(ii,16))+" ");
    
    
    if (index === 8){
      app.insertAdjacentHTML("beforeend", str+'<br>')
      //console.log(str)
    }
  })
});
app.insertAdjacentHTML("beforeend", '&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>')
scores.innerHTML =  "";
let score = "<div id = 'score'><p>Black | " + score_total(board_i).black +"<br>";
score += "White | " + score_total(board_i).white + "</p></div>"
scores.insertAdjacentHTML("beforeend", score)
console.log(score_total(board_i))
//console.log("  A B C D E F G H")

let next = "w";

let input = document.getElementById("comm");
input.addEventListener("keyup", function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("enter").click();
      }
    });

document.querySelector('#enter').addEventListener('click', function(event){
  let keyword = document.getElementById('comm').value;
  //console.log(prompt)
  keyword = keyword.toUpperCase();
  console.log(keyword)
  if (keyword == ""){
    alert("명령을 입력하세요") //enter 치면 실행 멈춤
  }

  else if (keyword.toLowerCase().startsWith("init")){
    let c = keyword.split(" ");
    let key = c[1];
    let value = c[2];
    let boards = chess.initPiece(key, value)
    app.innerHTML = "&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>";
    boards.forEach((i,idx) => {
      let str = "";
      i.forEach((ii, index) =>{
        str += (String.fromCharCode(parseInt(ii,16))+" ");
        if (index === 8){
          app.insertAdjacentHTML("beforeend", str+'<br>')
          //console.log(str)
        }
      })
    })
    app.insertAdjacentHTML("beforeend", '&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>')
    scores.innerHTML =  "";
    let score = "<div id = 'score'><p>Black | " + score_total(boards).black +"<br>";
    score += "White | " + score_total(boards).white + "</p></div>"
    scores.insertAdjacentHTML("beforeend", score)
    console.log(score_total(boards))
  }

  else if (keyword.toLowerCase().startsWith("set")){
    let c = keyword.split(" ");
    let key = c[1];
    let value = c[2];
    let color = c[3];
    let boards = chess.setPiece(key, value, color);
    app.innerHTML = ('&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>')
    //console.log("  A B C D E F G H")
    boards.forEach((i,idx) => {
      let str = "";
      i.forEach((ii, index) =>{
        str += (String.fromCharCode(parseInt(ii,16))+" ");
        
        if (index === 8){
          app.insertAdjacentHTML("beforeend", str+'<br>')
          //console.log(str)
        }
      })
    })
    console.log("  A B C D E F G H")
    app.insertAdjacentHTML("beforeend", '&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>')
    scores.innerHTML =  "";
    let score = "<div id = 'score'><p>Black | " + score_total(boards).black +"<br>";
    score += "White | " + score_total(boards).white + "</p></div>"
    scores.insertAdjacentHTML("beforeend", score)
    console.log(score_total(boards))
    
  }



  else if (keyword.toLowerCase().startsWith("display")){
    let boards = chess.display();
    app.innerHTML = "&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>";
    boards.forEach((i,idx) => {
      let str = "";
      i.forEach((ii, index) =>{
        str += (String.fromCharCode(parseInt(ii,16))+" ");
        
        if (index === 8){
          app.insertAdjacentHTML("beforeend", str+'<br>')
          //console.log(str)
        }
      })
    })
    console.log("  A B C D E F G H")
    app.insertAdjacentHTML("beforeend", '&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>')
    scores.innerHTML =  "";
    let score = "<div id = 'score'><p>Black | " + score_total(boards).black +"<br>";
    score += "White | " + score_total(boards).white + "</p></div>"
    scores.insertAdjacentHTML("beforeend", score)
    console.log(score_total(boards))
  }



  else if (keyword.startsWith("?")){
    let c = keyword.split("?")[1];
    if (chess.check_next(c, next)){ //true 일때
      let str_ = chess.check_what(c);
      alert(str_)
      console.log(str_)
    }
    else{
      if (next == "w"){
        alert("백색 체스말의 차례입니다.")
        console.log("백색 체스말의 차례입니다.")
      }
      else{
        alert("흑색 체크말의 차례입니다.")
        console.log("흑색 체크말의 차례입니다.")
      }
    }
  }
  
  else if (keyword.includes("->")){
    let origin = keyword.split("->")[0];
    let destin = keyword.split("->")[1];
    let color = "";
    if (next == "w"){
        color = 'white';
      }
    else{
        color = 'black';
      }
    if (chess.check_next(origin, next)){ //차례가 맞다면 이동해도됨
      let str_ = chess.check_what(origin);
      if (str_.includes(destin)){
        if (chess.move(origin, destin, color)){
          let boards = chess.display();
          app.innerHTML = ('&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>')
          //console.log("  A B C D E F G H")
          boards.forEach((i,idx) => {
            let str = "";
            i.forEach((ii, index) =>{
              str += (String.fromCharCode(parseInt(ii,16))+" ");
              if (index === 8){
                app.insertAdjacentHTML("beforeend", str+'<br>')
                //console.log(str)
              }
            })
          })
          console.log("  A B C D E F G H")
          app.insertAdjacentHTML("beforeend", '&nbsp&nbsp&nbsp;A&nbsp&nbspB&nbsp&nbspC&nbsp&nbspD&nbsp&nbspE&nbsp&nbspF&nbsp&nbspG&nbsp&nbspH<br>')
          scores.innerHTML =  "";
          let score = "<div id = 'score'><p>Black | " + score_total(boards).black +"<br>";
          score += "White | " + score_total(boards).white + "</p></div>"
          scores.insertAdjacentHTML("beforeend", score)
          console.log(score_total(boards))
          if (next === "w"){
            next = "b"
          }
          else{
            next = "w"
          }
        } // 이동 가능한 경우
        else{
          alert("이동하려는 곳에 같은 말이 존재해 이동이 불가능합니다.")
          console.log("이동하려는 곳에 같은 말이 존재해 이동이 불가능합니다.")
          //이동 불가능한 경우
        }
      }
    }
    else{ //차례가 아니면 이동하면안됨
      if (next == "w"){
        alert("백색 체스말의 차례입니다.")
        console.log("백색 체스말의 차례입니다.")
      }
      else{
        alert("흑색 체크말의 차례입니다.")
        console.log("흑색 체크말의 차례입니다.")
      }
    }
  }

  else if (keyword.toLowerCase().startsWith('possible')){
    let c = keyword.split(" ")[1];
    let str_ = chess.check_what(c);
    alert(str_)
    console.log(str_)
  }

});



