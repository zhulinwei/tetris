<template>
  <div class="tetris">
    <div class="game-wrapper">
      <div id="game-board">
        <table v-for="row in game">
          <tr>
            <td v-for="col in row" :status="col"></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="preview-wrapper">
      <div id="preview-board">
        <table v-for="row in preview">
          <tr>
            <td v-for="col in row" :status="col"></td>
          </tr>
        </table>
      </div>
      <p class="game-score">游戏得分：<span id="game-score">{{this.score}}</span>分</p>
      <button id="start-game" @click="start">开始游戏</button>
    </div>
  <div id="a"></div>
    
  </div>
</template>

<script>
  import _ from 'lodash';
  import vue from 'vue';
  import Block from '@/common/js/block.js';
  import Tetris from '@/common/js/tetris.js';

  const GameStatus = {
    INIT: 0,
    KEEP: 1,
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

  const Initial = {
    Game: [
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
    Preview: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    Position: [0, 3],
  };

  export default {
    data() {
      const speed = 1000;   
      let timer = null;
      let score = 0;
      let gameBlock = [];
      let fallBlock = {
        type: '',
        shape: '',
        direction: '',
      };
      let previewBlock = {
        type: '',
        shape: '',
        direction: '',
      };
      let coordinates = [];
      let gameStatus = GameStatus.INIT;   
      let game = _.cloneDeep(Initial.Game);
      let preview = _.cloneDeep(Initial.Preview);
      let position = _.cloneDeep(Initial.Position);
      return { speed, score, timer, gameStatus, game, preview, position, };
    },
    created() {
      // document.onkeydown = (event) => this.keyControl.call(this, event, this.game)
    },
    methods: {
      start() {
        const block = new Block();
        this.fallBlock = block.create();
        this.previewBlock = block.create();
        this.drawBoard(this.preview, this.previewBlock.shape);
        this.coordinates = this.coordinate(this.fallBlock.shape);
        this.drawBlock(this.game, this.coordinates);
        this.gameStatus = GameStatus.KEEP;
        document.onkeydown = (event) => this.keyControl.call(this, event, this.gmae);
        
        this.timer = setInterval(() => {
          this.moveNext();
        }, this.speed);
      },
      eraseBoard(container) {
        for(let i = 0;i < container.length;i++) {
          for(let j = 0;j < container[i].length;j++) {
            vue.set(container[i], j, BlockStatus.NORMAL);
          }
        }
      },
      drawBoard(container, matrix) {
        for(let i = 0;i < container.length;i++) {
          for(let j = 0;j < container[i].length;j++) {
            if (matrix[i][j] === BlockStatus.NORMAL) vue.set(container[i], j, BlockStatus.NORMAL);
            if (matrix[i][j] === BlockStatus.FALLING) vue.set(container[i], j, BlockStatus.FALLING);
            if (matrix[i][j] === BlockStatus.FINISH) vue.set(container[i], j, BlockStatus.FINISH);
          }
        }
      },
      eraseBlock(container, matrix) {
        matrix.forEach(item => vue.set(container[item.i], item.j, BlockStatus.NORMAL));
      },
      drawBlock(container, matrix) {
        matrix.forEach(item => vue.set(container[item.i], item.j, BlockStatus.FALLING));
      },
      coordinate(matrix) {
        const coordinates = [];
        for(let i = 0; i <matrix.length; i++) {
          for(let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === BlockStatus.FALLING) {
              coordinates.push({
                i: this.position[0] + i,
                j: this.position[1] + j,
              });
            }
          }
        }
        return coordinates;
      },
      updateCoordinate(direction) {
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
          this.coordinates = this.coordinate.call(this, this.fallBlock.shape);
        }
      },
      handleScore() {
        let line = 0;
        const height = this.game.length;
        const width = this.game[0].length;
        for(let i = 0; i < height; i++) {
          let count = 0;
          for (let j = 0; j < width; j++) {
            if (this.game[i][j] === BlockStatus.FINISH) count++
          }
          // 记分并消行
          if (count === width) {
            line++;
            this.game.splice(i, 1);
            let tmp = [];
            while(tmp.length < width) tmp.push(0);
            this.game.unshift(tmp);
          }
        }
        if (line === 0) return 0;
        else if (line === 1) return 10;
        else if (line === 2) return 20;
        else if (line === 3) return 50;
        else if (line === 4) return 100;
      },
      isValid(gameBlock, coordinates ,direction) {
        if ([Direction.INIT, Direction.LEFT, Direction.RIGHT, Direction.NEXT, Direction.DOWN, Direction.ROTATE].indexOf(direction) < 0) throw new Error('不存在的移动方向！');
        let c = [];
        if (direction === Direction.INIT) {
          coordinates.forEach(coordinate => {
            let tmp = {};
            tmp.i = coordinate.i;
            tmp.j = coordinate.j;
            c.push(tmp);
          });
        } else if (direction === Direction.LEFT) {
          coordinates.forEach(coordinate => {
            let tmp = {};
            tmp.i = coordinate.i;
            tmp.j = parseInt(coordinate.j) - 1;
            c.push(tmp);
          });
        } else if (direction === Direction.RIGHT) {
          coordinates.forEach(coordinate => {
            let tmp = {};
            tmp.i = coordinate.i;
            tmp.j = parseInt(coordinate.j) + 1;
            c.push(tmp);
          });
        } else if (direction === Direction.NEXT) {
          coordinates.forEach(coordinate => {
            let tmp = {};
            tmp.i = parseInt(coordinate.i) + 1;
            tmp.j = coordinate.j;
            c.push(tmp);
          });
        } else if (direction === Direction.ROTATE) {
          const block = new Block();
          const rotateBlock = block.rotate(this.fallBlock.type, this.fallBlock.direction);
          c = Tetris._coordinate.call(this, rotateBlock.shape);
        }
        const width = gameBlock[0].length;
        const height = gameBlock.length;
        for(let item of c) {
          // 注意此处的两个if语句顺序不能乱，先判断i和j的值是否正确，再判断game[i][j]的值是否为GameStatus.FINISH
          if(item.i < 0 || item.i >= height || item.j < 0 || item.j >= width) return false;
          if(gameBlock[item.i][item.j] === BlockStatus.FINISH) return false;
        }
        return true;
      },
      moveNext() {
        const isValid = this.isValid(this.game, this.coordinates, Direction.NEXT);
        if (!isValid) {
          clearInterval(this.timer);
          // 更新gameBlock
          this.coordinates.forEach(coordinate => vue.set(this.game[coordinate.i], coordinate.j , BlockStatus.FINISH));
          const score = this.handleScore();
          if (score > 0) {
            this.score = this.score + score;
            this.drawBoard(this.game, this.game);
          }
          // 初始化下落方块的位置
          this.position = _.cloneDeep(Initial.Position);
          this.fallBlock = Object.assign({}, this.previewBlock);
          this.coordinates = this.coordinate(this.fallBlock.shape);
          const fallBlockIsValid = this.isValid(this.game, this.coordinates, Direction.INIT);
          // 判断下落方块的坐标是否合法，不合法则证明游戏结束了
          if (!fallBlockIsValid) {
            alert('游戏结束了');
            clearInterval(this.timer)
            this.gameStatus = GameStatus.END;
            return this.timer = null;
          }
          this.drawBlock(this.game, this.coordinates);
          const block = new Block();
          this.previewBlock = block.create()
          this.drawBoard(this.preview, this.previewBlock.shape);
          this.timer = setInterval(() => {
            this.moveNext(this.game);
          }, this.speed);
          return false;
        }
        this.eraseBlock(this.game, this.coordinates);
        this.updateCoordinate(Direction.NEXT);
        this.drawBlock(this.game, this.coordinates);
      },
      moveLeft() {
        const isValid = this.isValid(this.game, this.coordinates, Direction.LEFT);
        if (isValid) {
          this.eraseBlock(this.game, this.coordinates);
          this.updateCoordinate(Direction.LEFT);
          this.drawBlock(this.game, this.coordinates);  
        }
      },
      moveRight() {
        const isValid = this.isValid(this.game, this.coordinates, Direction.RIGHT);
        if (isValid) {
          this.eraseBlock(this.game, this.coordinates);
          this.updateCoordinate(Direction.RIGHT);
          this.drawBlock(this.game, this.coordinates);  
        }
      },
      moveDown() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.moveNext(this.game);
        }, 10);
      },
      rotate() {
        const isValid = this.isValid(this.game, this.coordinates, Direction.ROTATE);
        if (isValid) {
          const block = new Block();
          const rotateBlock = block.rotate(this.fallBlock.type, this.fallBlock.direction);
          this.fallBlock.shape = rotateBlock.shape;
          this.fallBlock.direction = rotateBlock.direction;
          this.eraseBlock(this.game, this.coordinates);
          this.updateCoordinate(Direction.ROTATE);
          this.drawBlock(this.game, this.coordinates);
        }
      },
      keyControl(event, container) {
        const keyCode = event.keyCode;
        const gameStatus = this.gameStatus;
        if (gameStatus !== GameStatus.KEEP) return;
        if (keyCode === 37) this.moveLeft(container);
        else if (keyCode === 38) this.rotate(container);
        else if (keyCode === 39) this.moveRight(container);
        else if (keyCode === 40) this.moveDown(container);
        else if (keyCode === 40) this.moveDown(container);
      }
    },
  }
</script>

<style>
  .tetris {
    width: 650px;
    margin: 0 auto;
  }
  .game-wrapper {
    float: left;
    margin: 50px;
  }
  #game-board table {
    border: 1px solid #ddd;
  }
  #game-board table td {
    position: relative;
    width: 34px;
    height: 34px;
    border: 1px solid #ddd;
  }
  #game-board table td[status='1'],
  #game-board table td[status='2'] {
    background-color: #c8bfe7;
  }
  .preview-wrapper {
    float: left;
    margin: 50px 0;
    max-width: 200px;
    overflow: hidden;
  }
  #preview-board table {
    width: 130px;
  }
  #preview-board table td {
    position: relative;
    height: 30px;
    width: 30px;
  }
  #preview-board table td[status='1'] {
    background-color: #c8bfe7;
  }
  .preview-wrapper p {
    line-height: 40px;
    font-size: 16px;
    color: #666;
  }
  .preview-wrapper .game-score {
    padding-left: 10px;
  }
  .preview-wrapper #start-game {
    width: 130px;
    height: 40px;
    margin-top: 0px;
    border-radius: 5px;
    background: #80BD01;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    outline: none;
  }
</style>