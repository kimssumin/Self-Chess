//pawn UTF-16 : 0x265F(흑색), 0x2659(백색)
// console.log(String.fromCharCode(parseInt('0x265F',16)))
// console.log(String.fromCharCode(parseInt('0x2659',16)))


const colss = {'A':1, 'B':2, 'C':3, 'D':4, 'E':5, 'F':6, 'G':7, 'H':8};
const re_colss = {1 : 'A', 2:'B', 3:'C', 4:'D', 5:'E', 6:'F', 7:'G', 8:'H'};
const positions = (position) => {
  let col = colss[String(position[0])];
  let row =  parseInt(position[1])-1;
  return [row, col]
}


export const possiblePositions_pawn = (pst, color) => {
  let posit = positions(pst);
  let ori_col = posit[1];
  let ori_row = posit[0];
  const dx = [-1, -1, 1, 1];
  const dy = [-1, 1, -1, 1];

  if (color == "black"){
    const strs = [];

    if (ori_row + 1 <= 7){
      let des_row = ori_row+2; //2를 더한 이유는 이동의 1 + row 가 1부터 세는 점 감안
      let des_col = re_colss[ori_col];
      let str = des_col+des_row;
      strs.push(str);
      for(let i = 2; i < 4; i++){
        des_row = ori_row + dx[i];
        des_col = ori_col + dy[i];
        if (des_row < 0 || des_col < 1 || des_row > 7 ||des_col > 8){
          continue
        }
        else{
          des_row = des_row+1; 
          des_col = re_colss[des_col];
          str = des_col+des_row;
          strs.push(str);
        }
      }
      return strs
    }
    else{
      console.log("움직일 수 없습니다")
    }
  }

  else {
    const strs = [];
    if (ori_row - 1 >= 0){
      let des_row = ori_row; //+0 인 이유는 이동의 -1 + row가 1부터 세는 점 감안
      let des_col = re_colss[ori_col];
      let str = des_col+des_row;
      strs.push(str);
      for(let i = 0; i < 2; i++){
        des_row = ori_row + dx[i];
        des_col = ori_col + dy[i];
        if (des_row < 0 || des_col < 1 || des_row > 7 ||des_col > 8){
          continue
        }
        else{
          des_row = des_row+1; 
          des_col = re_colss[des_col];
          str = des_col+des_row;
          strs.push(str);
        }
      }
      return strs;
    }
    else{
      console.log("움직일 수 없습니다")
    }
  }
} 
