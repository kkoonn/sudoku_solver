// 数独生成とcsv生成
const sudokuDiv = document.getElementById('sudoku');
const initButton = document.getElementById('init');
const fieldToTextButton = document.getElementById('field-to-text')
const sudokuOutputText = document.getElementById('sudoku-output-text');
const textToFieldButton = document.getElementById('text-to-field')
const sudokuInputText = document.getElementById('sudoku-input-text')

var field = new Array();

/**
 * 指定した要素の子どもをすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {  // 子どもの要素がある限り削除
    element.removeChild(element.firstChild);
  }
}

// 数独のパズル初期化
function initField() {
  // id=sudoku に描画されているfieldを消去
  removeAllChildren(sudokuDiv);

  // 新たなfield配列を生成
  let retField = new Array(81);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // cellオブジェクトを生成
      let cell = {
        num: 0,   // そのマスに入る数字
        button: null        // HTML出力用変数
      }
      cell.button = document.createElement('button');
      cell.button.setAttribute("id", "cell-" + (i * 9 + j));
      cell.button.classList.add("cell");
      cell.button.innerText = cell.num;
      retField[i * 9 + j] = cell
    }
  }
  return retField;
}

// Consoleでfieldを出力する
function displayFieldWithConsole() {
  for (let i = 0; i < 9; i++) {
    let string = "";
    for (let j = 0; j < 9; j++) {
      pos = i * 9 + j;
      string = string + field[pos].num;
    }
    console.log(string);
  }
}

// jsからHTMLに出力する
function displayFieldWithHTML() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      pos = i * 9 + j;
      field[pos].button.innerText = field[pos].num;
      sudokuDiv.appendChild(field[pos].button);
    }
    let br = document.createElement('br');
    sudokuDiv.appendChild(br);
  }
}

// マスのクリック処理を設定する
function bindClickEvent() {
  for (let i = 0; i < 81; i++) {
    let cell = field[i];
    // 左クリック
    cell.button.onclick = () => {
      console.log('left-click: ' + cell.button.id);
      cell.num = (cell.num + 1) % 10;
      cell.button.innerText = cell.num;
    }
    // 右クリック
    cell.button.oncontextmenu = () => {
      console.log('right-click: ' + cell.button.id);
      cell.num = (cell.num - 1 + 10) % 10;
      cell.button.innerText = cell.num;
      return false;   // contextmenuは表示させない
    }
  }
}

// ゲームの初期化
initButton.onclick = () => {
  console.log('ゲームを初期化します');
  // field初期化
  field = initField();
  displayFieldWithConsole();
  displayFieldWithHTML();
  // マスのクリック処理
  bindClickEvent();
}

fieldToTextButton.onclick = () => {
  console.log('数独→テキスト生成');
  let string = "";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      pos = i * 9 + j;
      string += field[pos].num;
    }
  }
  sudokuOutputText.innerText = string;
}

textToFieldButton.onclick = () => {
  console.log('テキスト→数独生成');
  let string = sudokuInputText.value;
  console.log(string)
  field = initField();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      pos = i * 9 + j;
      field[pos].num = parseInt(string[pos]);
    }
  }
  displayFieldWithConsole();
  displayFieldWithHTML();
  // マスのクリック処理
  bindClickEvent();
}