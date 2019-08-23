namespace happyClear {
	//判断是否为方块对象
	export function bBlock (object): BlockView {
		if (object instanceof BlockView) {
			return object;
		} else {
			return null;
		}
	}
	
	export function deepCopy (obj) {
		if (typeof obj != "object") {
			return obj;
		}
		let newObj = {};
		for (let key in obj) {
			newObj[key] = deepCopy (obj[key]);
		}
		return newObj;
	}
	
	export function copy (obJ) {
		let back = {};
		for (let key in obJ) {
			back[key] = obJ[key];
		}
		return back;
	}
	
	export function checkClear (valueVec): boolean {
		for (let i = 0; i < 10; i ++) {
			for (let j = 0; j < 12; j ++) {
				if (i < 8) {
					//同一行可以消除
					if (valueVec[i][j] == valueVec[i + 1][j] && valueVec[i][j] == valueVec[i + 2][j]) {
						//表示没有死局
						return false;
					}
				}
				//竖可以消除
				if (j < 10) {
					if (valueVec[i][j] == valueVec[i][j + 1] && valueVec[i][j + 1] == valueVec[i][j + 2]) {
						return false;
					}
				}
			}
		}
		//死局
		return true;
	}
	
	export class GameLogic extends egret.DisplayObjectContainer implements IGameLogic {
		private _gameView: GameStartView;
		
		constructor (game: GameStartView) {
			super ();
			this._gameView = game;
		}
		
		//死局检测
		public DeafCheck (valueVec): void {
			//死局标志
			let flag: Boolean;
			//横向交换
			loop: for (let i = 0; i < 9; i ++) {
				for (let j = 0; j < 11; j ++) {
					let temp = valueVec[i][j];
					valueVec[i][j] = valueVec[i][j + 1];
					valueVec[i][j + 1] = temp;
					let flag1 = checkClear (valueVec);
					//如果竖向换牌死局，横向换牌
					if (flag1) {
						valueVec[i][j + 1] = valueVec[i][j];
						valueVec[i][j] = temp;
						valueVec[i][j] = valueVec[i + 1][j];
						valueVec[i + 1][j] = temp;
						let flag2 = checkClear (valueVec);
						//横向换牌没死局
						if (! flag2) {
							valueVec[i + 1][j] = valueVec[i][j];
							valueVec[i][j] = temp;
							flag = false;
							break loop;
						} else {
							valueVec[i + 1][j] = valueVec[i][j];
							valueVec[i][j] = temp;
						}
					} else {
						valueVec[i][j + 1] = valueVec[i][j];
						valueVec[i][j] = temp;
						flag = false;
						break loop;
					}
				}
				flag = true;
			}
			if (flag) {
				alert ("当前没有可以消的，游戏结束");
			}
			//    console.log(valueVec);
		}
		
		//判断是否可以消除
		public canClear (row, col): number {
			//水平是否可消
			let clearLength_1 = 1;
			for (let j = col + 1; j < 10; j ++) {
				if (this._gameView.colorVec[j][row] == this._gameView.colorVec[col][row] && this._gameView.colorVec[j][row] != 0 && this._gameView.colorVec[j][row] != null) {
					clearLength_1 ++;
				} else {
					break;
				}
			}
			for (let j = col - 1; j >= 0; j --) {
				if (this._gameView.colorVec[j][row] == this._gameView.colorVec[col][row] && this._gameView.colorVec[j][row] != 0 && this._gameView.colorVec[j][row] != null) {
					clearLength_1 ++;
				} else {
					break;
				}
			}
			//垂直是否可消
			let clearLength_2 = 1;
			for (let i = row + 1; i < 12; i ++) {
				if (this._gameView.colorVec[col][i] == this._gameView.colorVec[col][row] && this._gameView.colorVec[col][i] != 0 && this._gameView.colorVec[col][i] != null) {
					clearLength_2 ++;
				} else {
					break;
				}
			}
			for (let i = row - 1; i >= 0; i --) {
				if (this._gameView.colorVec[col][i] == this._gameView.colorVec[col][row] && this._gameView.colorVec[col][i] != 0 && this._gameView.colorVec[col][i] != null) {
					clearLength_2 ++;
				} else {
					break;
				}
			}
			if (clearLength_1 >= 3 || clearLength_2 >= 3) {
				//先判断两个是否都满足
				if (clearLength_1 >= 3 && clearLength_2 >= 3) {
					//两个方向可以消除
					return 3;
				} else {
					if (clearLength_1 >= 3) {
						// console.log("当前可以消除");
						//水平可以消除
						return 1;
					}
					if (clearLength_2 >= 3) {
						//    console.log("当前可以消除");
						//垂直
						return 2;
					}
				}
			} else {
				return 0;
			}
		}
		
		//获取整个可以消除的方块
		public getClearList (kind: number, line, column): any[] {
			switch (kind) {
				case 1:
					let animalList = [];
					for (let j = column - 1; j >= 0; j --) {
						if (this._gameView.colorVec[column][line] == this._gameView.colorVec[j][line]) {
							animalList.unshift (this._gameView.blockMap[j][line]);
						} else {
							break;
						}
					}
					animalList.push (this._gameView.blockMap[column][line]);
					for (let j = column + 1; j < 10; j ++) {
						if (this._gameView.colorVec[column][line] == this._gameView.colorVec[j][line]) {
							animalList.push (this._gameView.blockMap[j][line]);
						} else {
							break;
						}
					}
					//获取最后一个消除的行数
					return animalList;
				case 2:
					let animalList_1 = [];
					for (let i = line - 1; i >= 0; i --) {
						if (this._gameView.colorVec[column][i] == this._gameView.colorVec[column][line]) {
							animalList_1.unshift (this._gameView.blockMap[column][i]);
						} else {
							break;
						}
					}
					animalList_1.push (this._gameView.blockMap[column][line]);
					for (let i = line + 1; i <= 12; i ++) {
						if (this._gameView.colorVec[column][i] == this._gameView.colorVec[column][line]) {
							animalList_1.push (this._gameView.blockMap[column][i]);
						} else {
							break;
						}
					}
					return animalList_1;
				case 3:
					//行列都可以消除的时候
					let animalList_2 = [];
					for (let j = column - 1; j >= 0; j --) {
						if (this._gameView.colorVec[column][line] == this._gameView.colorVec[j][line]) {
							animalList_2.unshift (this._gameView.blockMap[j][line]);
						} else {
							break;
						}
					}
					animalList_2.push (this._gameView.blockMap[column][line]);
					for (let j = column + 1; j < 10; j ++) {
						if (this._gameView.colorVec[column][line] == this._gameView.colorVec[j][line]) {
							animalList_2.push (this._gameView.blockMap[j][line]);
						} else {
							break;
						}
					}
					//列消除
					let animalList_3 = [];
					for (let i = line - 1; i >= 0; i --) {
						if (this._gameView.colorVec[column][i] == this._gameView.colorVec[column][line]) {
							animalList_3.unshift (this._gameView.blockMap[column][i]);
						} else {
							break;
						}
					}
					// animalList_3.push(this._gameView.blockMap[column][line]);
					for (let i = line + 1; i <= 12; i ++) {
						if (this._gameView.colorVec[column][i] == this._gameView.colorVec[column][line]) {
							animalList_3.push (this._gameView.blockMap[column][i]);
						} else {
							break;
						}
					}
					let animalList_4 = animalList_2.concat (animalList_3);
					if (DOWN_ROUND[main_round] == 0) {
						animalList_4.sort ((a, b) => {
							return a.order - b.order;
						});
					}
					return animalList_4;
				case 0:
					return [];
			}
		}
		
		//全局刷新
		public globalClear (): BlockView[] {
			let clearList: BlockView[] = [];
			for (let i = 0; i < 10; i ++) {
				for (let j = 0; j < 12; j ++) {
					let flag = this.canClear (j, i);
					let clearAnimalList: BlockView[] = [];
					clearAnimalList = this.getClearList (flag, j, i);
					for (let k = 0; k < clearAnimalList.length; k ++) {
						if (clearList.indexOf (
								clearAnimalList[k]) == - 1 && (clearAnimalList[k] instanceof BlockView)) {
							clearList.push (clearAnimalList[k]);
						}
					}
				}
			}
			if (DOWN_ROUND[main_round] == 0) {
				clearList.sort ((a, b) => {
					return a.order - b.order;
				});
			}
			this._gameView.firstFlag = false;
			return clearList;
		}
		
		//消除动物
		public clearAll (clearList_5: BlockView[]): void {
			for (let i = clearList_5.length - 1; i >= 0; i --) {
				this._gameView.clearAnimation (clearList_5[i], i);
			}
		}
		
		//游戏结束  下一关，上一关
		public gameOver (): void {
			for (let i = 0; i < 10; i ++) {
				for (let j = 0; j < 12; j ++) {
					if (this._gameView.blockMap[i][j] instanceof BlockView) {
						this._gameView.animalContainer.removeChild (this._gameView.blockMap[i][j]);
					}
					if (this._gameView.lockMap[i][j]) {
						this._gameView.lockContainer.removeChild (this._gameView.lockMap[i][j]);
					}
				}
			}
			this._gameView.blockMap = [];
			this._gameView.colorVec = [];
			this._gameView.lockMap = [];
			this._gameView.saveColorVec = [];
			this._gameView.saveLockVec = [];
			this._gameView.saveStepCount=[];
			this._gameView.saveGameScore =[];
			this._gameView.saveClearCount=[];
			this._gameView.backCount = 0;
			this._gameView.gameScore = 0;
			this._gameView.clearLength = 0;
			this._gameView.clearCount = 0;
			this._gameView.uiView.colorCount.text = "";
			if (OVER_CONF[main_round] == 1) {
				this._gameView.uiView.target_score.visible = true;
			}
			if (this._gameView.animalInfo) {
				this._gameView.animalContainer.removeChild (this._gameView.animalInfo);
				this._gameView.animalInfo = null;
			}
			this._gameView.gameData.init ();
		}
		
		//过关判定
		public bOver (): void {
			if (OVER_CONF[main_round] == 1 || (OVER_CONF[main_round] == 2)) {
				if (this._gameView.stepCount <= 0 && this._gameView.clearCount > 0) {
					alert ("游戏结束");
					this.gameOver ();
				} else if (this._gameView.stepCount >= 0 && this._gameView.clearCount <= 0) {
					alert ("恭喜过关");
					if (main_round >= 7) {
						main_round = 1;
					} else {
						main_round ++;
					}
					this.gameOver ();
				}
			} else if (OVER_CONF[main_round] == 0) {
				console.log ("目前分数", this._gameView.gameScore, '通关分数', STEP_SCORE[main_round][1]);
				if (this._gameView.stepCount <= 0 && this._gameView.gameScore < STEP_SCORE[main_round][1]) {
					alert ("游戏结束");
					this.gameOver();
				} else if (this._gameView.stepCount >= 0 && this._gameView.gameScore >= STEP_SCORE[main_round][1]) {
					alert ("恭喜通关");
					if (main_round >= 7) {
						main_round = 1;
					} else {
						main_round ++;
					}
					this.gameOver ();
				}
			}
		}
	}
}