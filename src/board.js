//board 상태 update 해서 export

import {score_total} from "./score.js"
import { possiblePositions_pawn } from "./pawn.js";
import { possiblePositions_bishop } from "./bishop.js";
import { possiblePositions_rook } from "./rook.js";
import { possiblePositions_queen } from "./queen.js";
import { possiblePositions_knight } from "./knight.js";

const types = {'rook':'0x265C', 'knight':'0x265E', 'bishop':'0x265D', 'queen':'0x265B', 'queen_':'0x2655','bishop_':'0x2656', 'knight_':'0x2658', 'rook_':'0x2657', 'pawn':'0x265F', 'pawn_': '0x2659'};

export const board_init = () =>{
    let board_init = [['0x31','0x265C' , '0x265E', '0x265D', '0x265A', '0x265B', '0x265D', '0x265E', '0x265C'], //'0x265C'
                ['0x32', '0x265F', '0x265F', '0x265F','0x265F','0x265F','0x265F','0x265F','0x265F'],
                ['0x33', '0x2573', '0x2573','0x2573','0x2573','0x2573','0x2573','0x2573','0x2573'],
                ['0x34', '0x2573', '0x2573','0x2573','0x2573','0x2573','0x2573','0x2573','0x2573'],
                ['0x35', '0x2573', '0x2573','0x2573','0x2573','0x2573','0x2573','0x2573','0x2573'],
                ['0x36', '0x2573', '0x2573','0x2573','0x2573','0x2573','0x2573','0x2573','0x2573'],
                ['0x37', '0x2659', '0x2659', '0x2659','0x2659','0x2659','0x2659','0x2659','0x2659'],
                ['0x38', '0x2656', '0x2658', '0x2657', '0x2654', '0x2655', '0x2657', '0x2658', '0x2656']];
    return board_init
}
//0x2573

export class program {
  constructor(){
    this.col = {'A':1, 'B':2, 'C':3, 'D':4, 'E':5, 'F':6, 'G':7, 'H':8}
    this.boards = board_init();
    this.white = ['0x2656','0x2658','0x2657','0x2659', '0x2655'];
    this.black = ['0x265C', '0x265E' ,'0x265D', '0x265B', '0x265F'];
  }

  

  board_put = (type, position, color) => { //just 말 하나 두기
    
    let col = this.col[String(position[0])];
    let row = parseInt(position[1]) - 1;
    if (color === 'none'){
      if (row > 5){ //백색말
      let mal = types[String(type+"_")]
      this.boards[row][col] = mal
      }
      else{ //흑색말
      let mal = types[String(type)];
      this.boards[row][col] = mal
      }
    }
    else{
      if (color === 'white'){
        let mal = types[String(type+"_")]
        this.boards[row][col] = mal
      }
      else{
        let mal = types[String(type)];
        this.boards[row][col] = mal
      }
    }
    return this.boards
  }


  initPiece(type, position){ //{'rook', A1}
    let col = this.col[String(position[0])];
    let row =  parseInt(position[1]);
    let type_check = {1:'rook', 2:'knight', 3:'bishop',5:'queen',6:'bishop', 7:'knight', 8:'rook'};
    if (type =="pawn"){ 
      if (row > 5){ //백말
        this.boards[6].forEach((i, index) => {
          if (i === "0x2573" && index !== 4){
            if (type_check[index] == type && col == index -1)
              {this.board_put(type, position, 'none');
               } // 말 두기
          }
        })
      }
      else{ //흑말
        this.boards[1].forEach((i, index) => {
          if (i === "0x2573" && index !== 4){
            if (type_check[index] == type && col == index -1)
              {this.board_put(type, position, 'none');
                }
          }
        })
      }
    }
    else{
      if (row>5){ //백말

        this.boards[7].forEach((i, index) => {
          if (i === "0x2573" && index !== 4){
            if (type_check[index] == type && col == index -1)
              {this.board_put(type, position, 'none');}
                //return this.boards}
          }
        })
      }
      else{ //흑말
        this.boards[0].forEach((i, index) => {
          if (i === "0x2573" && index !== 4){
            if (type_check[index] == type && col == index -1)
              {
                this.board_put(type, position, 'none');
              }
          }
        })
      }
    }
    return this.boards
  }
  
  display(){
    return this.boards
  }

  setPiece(type, position, color){
    let col = this.col[String(position[0])];
    let row =  parseInt(position[1])-1;
    
    if (this.boards[row][col] === "0x2573"){ //비어있을때만 생성
      this.boards = this.board_put(type, position, color)
      return this.boards
    }
    else{
      console.log("이곳에 말을 둘 수 없습니다")
      return this.boards
    }
    }
  
  move(from, to, color){
      let from_col = this.col[String(from[0])];
      let from_row =  parseInt(from[1])-1;
      let to_col = this.col[String(to[0])];
      let to_row =  parseInt(to[1])-1;

      if (color === 'white'){
        let origin = this.boards[to_row][to_col];
        let chess_key = this.boards[from_row][from_col];
        
        if (origin === "0x2573") { // 이동하려는 곳이 빈 공간이면 true 반환 & 이동
          if (chess_key === "0x2659" && to_row === 0){ ////pawn이 0행에 도달시 queen으로
            chess_key = "0x2655"
          }
          else if (chess_key === "0x2659" && Math.abs(to_row-from_row) + Math.abs(to_col - from_col) == 2 && to_row !== 0){
            return false;
          }
          this.boards[to_row][to_col] = chess_key;
          this.boards[from_row][from_col] = "0x2573";
          
          return true
        }
        else if (this.white.includes(origin)){ //같은 색 말이 있는 경우 false 반환, 이동X
          return false
        }
        else { //다른 색 말이 있는 경우 true 반환, 이동 O + score
          if (chess_key === "0x2659" && to_row === 0){ //pawn이 0행에 도달시 queen으로
            chess_key = "0x2655"
          }
          
          let removekey = this.boards[to_row][to_col];
          this.boards[to_row][to_col] = chess_key;
          this.boards[from_row][from_col] = "0x2573";
          
          //let app = document.querySelector('#app');
          //app.insertAdjacentHTML("beforeend", '[SCORE] : '+score_total(this.boards)+'<br>')
          console.log('[SCORE]')
          console.log(score_total(this.boards, removekey))
          console.log(" ")
          return true
        }
      }

      else if (color === 'black'){
        let origin = this.boards[to_row][to_col];
        let chess_key = this.boards[from_row][from_col];
        if (origin === "0x2573") { // 이동하려는 곳이 빈 공간이면 true 반환 & 이동
          if (chess_key === "0x265F" && to_row === 7){ //pawn이 0행에 도달시 queen으로
            chess_key = "0x265B"
          }
          else if (chess_key === "0x265F" && Math.abs(to_row-from_row) + Math.abs(to_col - from_col) == 2 && to_row !== 0){
            return false;
          }

          this.boards[to_row][to_col] = chess_key;
          this.boards[from_row][from_col] = "0x2573";
          return true
        }
        else if (this.black.includes(origin)){ //같은 색 말이 있는 경우 false 반환, 이동X
          return false
        }
        else { //다른 색 말이 있는 경우 true 반환, 이동 O + score
          if (chess_key === "0x265F" && to_row === 7){ //pawn이 0행에 도달시 queen으로
            chess_key = "0x265B"
          }

          // else if (chess_key === "0x265F" && to_row !== 7){
          //   //상대 pawn 먹기
            
          // }
          let removekey = this.boards[to_row][to_col];
          this.boards[to_row][to_col] = chess_key;
          this.boards[from_row][from_col] = "0x2573";
          console.log('[SCORE]')
          console.log(score_total(this.boards, removekey))
          console.log(" ")
          return true
        }
      }
    }

  check_what(pst) {
    let col = this.col[String(pst[0])];
    let row =  parseInt(pst[1])-1;
    let ii = this.boards[row][col];
    
    if (this.white.includes(ii)){ //흰색말이면
      if (ii === "0x2656"){
        let str = possiblePositions_rook(pst);
        return str
      }
      else if (ii === "0x2658"){
        let str = possiblePositions_knight(pst);
        return str
      }
      else if (ii === "0x2657"){
        let str = possiblePositions_bishop(pst);
        return str
      }
      else if (ii === "0x2655"){
        let str = possiblePositions_queen(pst);
        return str
      }
      else if (ii === "0x2659"){
        let str = possiblePositions_pawn(pst, 'white');
        return str
      }
    }
    else if (this.black.includes(ii)){
      if (ii === "0x265C"){
        let str = possiblePositions_rook(pst);
        return str
      }
      else if (ii === "0x265E"){
        let str = possiblePositions_knight(pst);
        return str
      }
      else if (ii === "0x265D"){
        let str = possiblePositions_bishop(pst);
        return str;
      }
      else if (ii === "0x265B"){
        let str = possiblePositions_queen(pst);
        return str;
      }
      else if (ii === "0x265F"){
        let str = possiblePositions_pawn(pst, 'black');
        return str
      }
    }
    }

    check_next(pst, next){
      let col = this.col[String(pst[0])];
      let row =  parseInt(pst[1])-1;
      let ii = this.boards[row][col];
      if (this.white.includes(ii) && next == "w"){
        return true
      }
      else if (this.black.includes(ii) && next == "b"){
        return true
      }
      else{
        console.log(ii, next, row, col);
        return false
      }
    }

  
} 









/* Test */
// const chess = new program();
// let boards = chess.setPiece('rook', 'B3', 'black')

// boards.forEach(i => {
//   let str = "";
// 	i.forEach((ii, index) =>{
//     str += (String.fromCharCode(parseInt(ii,16))+" ");
//     if (index === 8){
//       console.log(str)
//     }
//   })
// });

// boards = chess.initPiece('rook', 'D1')
// boards.forEach(i => {
//   let str = "";
// 	i.forEach((ii, index) =>{
//     str += (String.fromCharCode(parseInt(ii,16))+" ");
//     if (index === 8){
//       console.log(str)
//     }
//   })
// });
// let checking =  chess.move('B3', 'B7', 'black')
// if (checking){
//   boards.forEach(i => {
//   let str = "";
// 	i.forEach((ii, index) =>{
//     str += (String.fromCharCode(parseInt(ii,16))+" ");
//     if (index === 8){
//       console.log(str)
//     }
//   })
// });
// }

// console.log(chess.check_what('E1'))
