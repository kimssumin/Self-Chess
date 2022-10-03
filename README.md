# Self-Chess-game


## Browser support

<img src="https://img.shields.io/badge/Chrome-4285F4?style=flat-square&logo=Google Chrome&logoColor=white" width="100" height="32"/> <img src="https://img.shields.io/badge/Microsoft Edge-0078D7?style=flat-square&logo=Microsoft Edge&logoColor=white" width="150" height="32"/> <img src="https://img.shields.io/badge/Firefox-FF7139?style=flat-square&logo=Firefox&logoColor=white" width="100" height="32"/>

## Directory Structure

<details open="true">
  <summary>Click to toggle</summary>
  <pre>📦 /
┣ 📂public
┃ ┣ 📜index.html
┃ ┗ 📜style.css
┣ 📂src
┃ ┣ 📜bishop.js
┃ ┣ 📜board.js
┃ ┣ 📜knight.js
┃ ┣ 📜pawn.js
┃ ┣ 📜queen.js
┃ ┣ 📜rook.js
┃ ┣ 📜score.js
┃ ┗ 📜main.js
┣ 📜package-lock.json
┣ 📜package.json
┗ 📜README.md</pre>
</details>

## Function Structure

**`board.js`**

- board_init → 무조건 초기화하는 함수
- program class
    - constructor 안에 변경할 boards (초기값은 board_init), 말이 흰색인지 검은색인지 확인할 배열 넣어줌
    - board_put (type, position, color) → initPiece와 setPiece 에 사용된 함수
        - initPiece 는 둘 수 있는 색깔이 정해져있어서 ‘none’ 으로
        - setPiece 는 색을 지정할 수 있게
    - initPiece(type, position) - 초기화된 자리에 원래 말이 있어야되는데 빈칸이 들어가있는 경우 그 자리에 채워두는 용도라고 생각함
    - setPiece (type, position, color) - 비어있을때만 원하는 piece를 둘 수 있도록
    - display() - 저장된 boards를 return
    - move(from, to, color) - color 값을 기준으로 일단 나눈 후, 각각의 것에서 세 케이스로 나눌 수 있음(이동하려는 곳이 빈 공간인 경우, 같은색 말이 있는 경우, 다른 색 말이 있는 경우)
        - 이때 다른색 말이 있는 경우 score() 를 호출해서 score 계산한 후 출력되도록 작성
    - chess_what(position) - 각 position 별로 그 위치에 놓인 말이 무엇인지 판단한 후, 이동가능한 곳들에 대한 정보를 return
    - chess_next (position, next) - 여기서 next 는 program.js 에서 받아오는 변수로, 현재 백색 말의 턴인지 흑색 말의 턴인지를 알게해줌
        - 이 next 를 기준으로 지금 들어온 위치의 말이 지금 턴 색의 말이 맞는지 check 해주는 함수

**`rook.js 외 각 말의 js 파일`**

- position 에 대한 함수를 따로 작성하여 A1 처럼 문자열로 들어온 위치정보를 2차원 배열의 index로 변경
- possiblePositions_(’말의 type’) - 퀸(8번)과 폰(1번)을 제외하고는 움직일 수 있는 방향의 갯수가 4개라서 반복문을 4번 돌도록 하였고, 체스판을 벗어나지 않는 선에서 움직일 수 있는 모든 경우의 수를 str에 push해 최종적으로 return

**`score.js`**

- check 함수를 통해 들어온 말이 몇 점짜리 말인지 check
- score_total 에는 scores 라는 객체를 넣어뒀는데, 이 black 과 white를 키 삼아서 점수를 더하는 식
    - 점수를 산정할때는 문제에서 현재 놓여있는 말의 점수라고 적혀있으므로 체스판위에 존재하는 각 말의 점수 합을 구함
