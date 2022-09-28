// knight UTF-16 : 0x265E (흑색), 0x2658 (백색)
// console.log(String.fromCharCode(parseInt('0x265E',16)))
// console.log(String.fromCharCode(parseInt('0x2658',16)))

const colss = {'A':1, 'B':2, 'C':3, 'D':4, 'E':5, 'F':6, 'G':7, 'H':8};
const re_colss = {1 : 'A', 2:'B', 3:'C', 4:'D', 5:'E', 6:'F', 7:'G', 8:'H'};
const positions = (position) => {
  let col = colss[String(position[0])];
  let row =  parseInt(position[1])-1;
  return [row, col]
}

export const possiblePositions_knight = (pst) => {
  let posit = positions(pst);
  let strs = [];
  const dx = [2, 2, -2, -2];
  const dy = [-1, 1, -1, 1];

  for (let i = 0 ; i < 4; i++){
    let ds_row = 0;
    let ds_col = 1;
    let ori_col = posit[1];
    let ori_row = posit[0];
    while (ds_row <= 7 && ds_col <= 7 && 0 <=ds_row && 1<=ds_col){
      ds_row = ori_row + dx[i]
      ds_col = ori_col + dy[i]
      if (ds_row < 0 || ds_col < 1 || ds_row > 7 ||ds_col > 8){
        continue
      }
      else{
        let des_row = ds_row+1; 
        let des_col = re_colss[ds_col];
        let str = des_col+des_row;
        strs.push(str);
        ori_row = ds_row;
        ori_col = ds_col;
      }
      
    }
  }
  if (strs.length === 0){
    console.log("움직일 수 있는 곳이 없습니다.")
  }
  else{
    return strs
  }
}

//console.log(possiblePositions_knight('E3'));