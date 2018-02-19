'use strict'



const GameStatus = {
  INIT: 0,
  CONTINUE: 1,
  END: 2,
};

const BlockStatus = {
  NORMAL: 0,
  FALLING: 1,
  FINISH: 2,
};

const Direction = {
  // init: 初始值, left: 左移, right: 右移, next: 下移, down: 快速下移
  INIT: 'init',
  LEFT: 'left',
  RIGHT: 'rgiht',
  NEXT: 'next',
  DOWN: 'down',
  ROTATE: 'rotate',
};

class Block {
  constructor() {
    this.blocks = {
      0: [
        [
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ],
        [
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ],
        
      ],
      1: [
        [
          [1, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 1, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 1, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
        ],
      ],
      2: [
        [
          [1, 1, 1, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 0, 1, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
        ],

      ],
      3: [
        [
          [1, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
      ],
      4: [
        [
          [0, 1, 1, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 0, 0, 0],
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 1, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 0, 0, 0],
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
      ],
      5: [
        [
          [1, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
        ],
      ],
      6: [
        [
          [0, 1, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],

      ],
    }
  }

  static cloneBlock(block) {
    let tmps = [];
    for(let i = 0; i < block.length; i++) {
      let tmp = [];
      for(let j = 0; j < block[i].length; j++) {
        tmp.push(block[i][j]);
      }
      tmps.push(tmp);
    }
    return tmps;
  }

  rotate(type, direction) {
    const next = (direction + 1) % 4;
    return { type, direction: next, shape: this.blocks[type][next] };
  }

  create() {
    const type = Math.floor((Math.random() * 10) % 7);
    const direction = 0;
    return { type, direction, shape: this.blocks[type][direction] };
  }
}

class Tetris {
  constructor() {
    this.gameStatus = GameStatus.INIT;
    this.speed = 1000;
    // 定时器
    this.timer = null;
    // 得分
    this.score = null;
    // 用于存储game
    this.gameBlock = [];
    // 用于存储下落方块的形状和方向
    this.fallBlock = {
      type: '',
      shape: '',
      direction: '',
    };
    // 用于存储preview区域中方块的形状和方向
    this.previewBlock = {
      type: '',
      shape: '',
      direction: '',
    };
    // game与preview的初始值
    this.initial = {
      game: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],      
      ],
      preview: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    };
    // 方块左上角位置
    this.position = [0, 3];
    // 方块坐标（以二维数组而为x-y轴坐标系为参考）
    this.coordinates = [];
  }

  static _isValid(direction) {
    if ([Direction.INIT, Direction.LEFT, Direction.RIGHT, Direction.NEXT, Direction.DOWN, Direction.ROTATE].indexOf(direction) < 0) throw new Error('不存在的移动方向！');
    let coordinates = [];

    if (direction === Direction.INIT) {
      this.coordinates.forEach(coordinate => {
        let tmp = {};
        tmp.i = coordinate.i;
        tmp.j = coordinate.j;
        coordinates.push(tmp);
      });
    } else if (direction === Direction.LEFT) {
      this.coordinates.forEach(coordinate => {
        let tmp = {};
        tmp.i = coordinate.i;
        tmp.j = parseInt(coordinate.j) - 1;
        coordinates.push(tmp);
      });
    } else if (direction === Direction.RIGHT) {
      this.coordinates.forEach(coordinate => {
        let tmp = {};
        tmp.i = coordinate.i;
        tmp.j = parseInt(coordinate.j) + 1;
        coordinates.push(tmp);
      });
    } else if (direction === Direction.NEXT) {
      this.coordinates.forEach(coordinate => {
        let tmp = {};
        tmp.i = parseInt(coordinate.i) + 1;
        tmp.j = coordinate.j;
        coordinates.push(tmp);
      });
    } else if (direction === Direction.ROTATE) {
      const block = new Block();
      const rotateBlock = block.rotate(this.fallBlock.type, this.fallBlock.direction);
      coordinates = Tetris._coordinate.call(this, rotateBlock.shape);
    }
    const width = this.gameBlock[0].length;
    const height = this.gameBlock.length;
    for(let item of coordinates) {
      // 注意此处的两个if语句顺序不能乱，先判断i和j的值是否正确，再判断gameBlock[i][j]的值是否为GameStatus.FINISH
      if(item.i < 0 || item.i >= height || item.j < 0 || item.j >= width) return false;
      if(this.gameBlock[item.i][item.j] === BlockStatus.FINISH) return false;
    }    
    return true;
  }

  // 消行
  static _handleScore() {
    let line = 0;
    const height = this.gameBlock.length;
    const width = this.gameBlock[0].length;
    for(let i = 0; i < height; i++) {
      let count = 0;
      for (let j = 0; j < width; j++) {
        if (this.gameBlock[i][j] === BlockStatus.FINISH) count++
      }
      // 记分并消行
      if (count === width) {
        line++;
        this.gameBlock.splice(i, 1);
        let tmp = [];
        while(tmp.length < width) tmp.push(0);
        this.gameBlock.unshift(tmp);
      }
    }
    if (line === 0) return 0;
    else if (line === 1) return 10;
    else if (line === 2) return 20;
    else if (line === 3) return 50;
    else if (line === 4) return 100;
  }

  static _moveLeft(container) {
    const isValid = Tetris._isValid.call(this, Direction.LEFT);
    if (isValid) {
      Tetris._eraseBlock(container, this.coordinates);
      Tetris._updateCoordinate.call(this, Direction.LEFT);
      Tetris._drawBlock(container, this.coordinates);
    }
  }

  static _moveRight(container) {
    const isValid = Tetris._isValid.call(this, Direction.RIGHT);
    if (isValid) {
      Tetris._eraseBlock(container, this.coordinates);
      Tetris._updateCoordinate.call(this, Direction.RIGHT);
      Tetris._drawBlock(container, this.coordinates);
    }
  }

  static _moveNext(container1, container2, scoreDom) {
    const isValid = Tetris._isValid.call(this, Direction.NEXT);
    // 触底
    if (!isValid) {
      clearInterval(this.timer);
      // 更新gameBlock
      this.coordinates.forEach(coordinate => this.gameBlock[coordinate.i][coordinate.j] = BlockStatus.FINISH);
      // 判断是否能消行，以及其得分
      const score = Tetris._handleScore.call(this);
      if (score > 0) {
        this.score = this.score + score;
        scoreDom.innerHTML = this.score;
        Tetris._drawBoard(container1, this.gameBlock);
      }
      // 初始化下落方块的位置
      this.position = [0, 3];
      // preview区域中方块赋值给fallBlock
      this.fallBlock = Object.assign({}, this.previewBlock);
      this.coordinates = Tetris._coordinate.call(this, this.fallBlock.shape);
      const fallBlockIsValid = Tetris._isValid.call(this, Direction.INIT);
      // 判断下落方块的坐标是否合法，不合法则证明游戏结束了
      if (!fallBlockIsValid) {
        console.log('游戏结束了');
        clearInterval(this.timer)
        return this.timer = null;
      }
      Tetris._drawBlock(container1, this.coordinates);
      // 合法则继续生成新的方块存放到preview中
      const block = new Block();
      this.previewBlock = block.create()
      Tetris._drawBoard(container2, this.previewBlock.shape);
      this.timer = setInterval(() => {
        Tetris._moveNext.call(this, container1, container2, scoreDom);
      }, this.speed);
      return false;
    }
    Tetris._eraseBlock(container1, this.coordinates);
    Tetris._updateCoordinate.call(this, Direction.NEXT);
    Tetris._drawBlock(container1, this.coordinates);
  }
  static _moveDown(container1, container2, scoreDom) {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      Tetris._moveNext.call(this, container1, container2, scoreDom);
    }, 10);
  }

  static _rotate(container) {
    // 判断
    if (this.fallBlock.shape.length !== 4) throw new Error('不合法的方块，请检查方块大小是否为4*4格子！');
    const isValid = Tetris._isValid.call(this, Direction.ROTATE);
    if (isValid) {
      const block = new Block();
      const rotateBlock = block.rotate(this.fallBlock.type, this.fallBlock.direction);
      this.fallBlock.shape = rotateBlock.shape;
      this.fallBlock.direction = rotateBlock.direction;
      Tetris._eraseBlock(container, this.coordinates);
      Tetris._updateCoordinate.call(this, Direction.ROTATE);
      Tetris._drawBlock(container, this.coordinates);
    }
  }

  static _init(container, matrix) {
    let table = document.createElement('table');
    for(let i = 0; i < matrix.length; i++) {
      let tr = document.createElement('tr');
      for(let j = 0; j < matrix[i].length; j++) {
        let td = document.createElement('td');
        td.setAttribute('status', BlockStatus.NORMAL);
        tr.appendChild(td);
      };
      table.appendChild(tr);
    }
    container.appendChild(table);
  }

  // 清除画板上原有的样式
  static _eraseBoard(container) {
    const table = container.getElementsByTagName('table')[0];
    const trs= table.getElementsByTagName('tr');
    for(let i = 0; i < trs.length; i++) {
      let tds = trs[i].getElementsByTagName('td');
      for(let j = 0; j < tds.length; j++) {
        tds[j].setAttribute('status', BlockStatus.NORMAL);
      }
    }
  }

  // 清除方块上原有的样式
  static _eraseBlock(container, matrix) {
    const table = container.getElementsByTagName('table')[0];
    matrix.forEach(item => table.rows[item.i].cells[item.j].setAttribute('status',GameStatus.INIT));
  }

  // 根据矩阵中的数据重新设置td中的状态
  static _drawBoard(container, matrix) {
    const table = container.getElementsByTagName('table')[0];
    const trs= table.getElementsByTagName('tr');
    for(let i = 0; i < trs.length; i++) {
      let tds = trs[i].getElementsByTagName('td');
      for(let j = 0; j < tds.length; j++) {
        if (matrix[i][j] === BlockStatus.NORMAL) tds[j].setAttribute('status', BlockStatus.NORMAL);
        if (matrix[i][j] === BlockStatus.FALLING) tds[j].setAttribute('status', BlockStatus.FALLING);
        if (matrix[i][j] === BlockStatus.FINISH) tds[j].setAttribute('status', BlockStatus.FINISH);
      }
    }
  }

  static _drawBlock(container, matrix) {
    const table = container.getElementsByTagName('table')[0];
    matrix.forEach(item => table.rows[item.i].cells[item.j].setAttribute('status',BlockStatus.FALLING));
    matrix.forEach(item => table.rows[item.i].cells[item.j].setAttribute('statu1',123));
  }

  // 获取方块坐标信息
  static _coordinate(matrix) {
    const coordinates = [];
    for(let i = 0; i <matrix.length; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 1) {
          coordinates.push({
            i: this.position[0] + i,
            j: this.position[1] + j,
          });
        }
      }
    }
    return coordinates;
  }

  static _updateCoordinate(direction) {
    if ([Direction.LEFT, Direction.RIGHT, Direction.NEXT, Direction.DOWN, Direction.ROTATE].indexOf(direction) < 0) throw new Error('不存在的移动方向！');
    if (direction === Direction.NEXT) {
      this.coordinates.forEach(item => item.i = parseInt(item.i) + 1);
      this.position[0] = parseInt(this.position[0]) + 1;
    } else if (direction === Direction.LEFT) {
      this.coordinates.forEach(item => item.j = parseInt(item.j) - 1);
      this.position[1] = parseInt(this.position[1]) - 1;
    } else if (direction === Direction.RIGHT) {
      this.coordinates.forEach(item => item.j = parseInt(item.j) + 1);
      this.position[1] = parseInt(this.position[1]) + 1;
    } else if (direction === Direction.ROTATE) {
      this.coordinates = Tetris._coordinate.call(this, this.fallBlock.shape);
    }
  }

  // 初始化game和preview区域节点
  init() {
    const gameDom = document.getElementById('game-board');
    const previewDom = document.getElementById('preview-board');
    Tetris._init(gameDom, this.initial.game);
    Tetris._init(previewDom, this.initial.preview);
  }

  keyControl(event, container1, container2, scoreDom) {
    const keyCode = event.keyCode;
    const gameStatus = tetris.GameStatus;
    if (gameStatus !== GameStatus.FALLING) return;
    if (keyCode === 37) Tetris._moveLeft.call(this, container1);
    else if (keyCode === 38) Tetris._rotate.call(this, container1);
    else if (keyCode === 39) Tetris._moveRight.call(this, container1);
    else if (keyCode === 40) Tetris._moveDown.call(this, container1, container2, scoreDom);
  }

  start(container1, container2, scoreDom) {
    const that = this;
    if(this.timer) clearInterval(this.timer);
    this.position = [0, 3];
    this.gameBlock = Block.cloneBlock(this.initial.game);
    // 初始化game与preview区域
    Tetris._eraseBoard(container1);
    Tetris._eraseBoard(container2);
    // 获取下落方块与preview区域中的方块与其方向
    const block = new Block();
    this.fallBlock = block.create();
    this.previewBlock = block.create();
    // 绘制preview区域中的方块
    Tetris._drawBoard(container2, this.previewBlock.shape);
    // 确定下落方块的坐标并绘制方块
    this.coordinates = Tetris._coordinate.call(this, this.fallBlock.shape);
    Tetris._drawBlock(container1, this.coordinates);
    // 绑定键盘事件
    document.onkeydown = (event) => tetris.keyControl.call(that, event, container1, container2, scoreDom);

    // 游戏正式开始
    that.timer = setInterval(() => {
      Tetris._moveNext.call(that, container1, container2, scoreDom);
    }, this.speed);
  }
}

const startGame = document.getElementById('start-game');
const scoreDom = document.getElementById('game-score');
const gameDom = document.getElementById('game-board');
const previewDom = document.getElementById('preview-board');

const tetris = new Tetris();
tetris.init(gameDom, previewDom);

startGame.onclick = function() {
  tetris.start(gameDom, previewDom, scoreDom);
  startGame.innerHTML = '重新开始';
}