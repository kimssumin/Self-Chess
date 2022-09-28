// import {program} from "./board.js"

// const score_board = new program();
// const boards = score_board.boards;
const white = ['0x2656','0x2658','0x2657','0x2659', '0x2655'];
const black = ['0x265C', '0x265E' ,'0x265D', '0x265B', '0x265F'];




const check = (key) => {
  if (key === "0x265F" || key === "0x2659"){
    return 1
  }
  else if (key === "0x265E" || key === "0x2658" || key === "0x265D" || key === "0x2657"){
    return 3
  }
  else if (key === "0x265C" || key === "0x2656"){
    return 5
  }
  else if (key === "0x265B" || key === "0x2655"){
    return 9
  }
  else{
    return 0
  }
}

export const score_total = (board) => {
  let scores = {'black' : 0, 'white' : 0 };
  board.forEach(i => {
    i.forEach((ii, index) =>{
      if (white.includes(ii)){ //흰색말이면
        scores['white'] += check(ii)
      }
      else if (black.includes(ii)){
        scores['black'] += check(ii)
      }
    }) 
  });
  return scores
}