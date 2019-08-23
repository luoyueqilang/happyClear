namespace happyClear {
	//动物方块位置设置
	export const Block_Conf = {
		//0表示障碍，1表示动物方块，2表示入口生成，-2表示空
		1 : [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		2 : [
			[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2]
		],
		3 : [
			[1, 1, 1, 0, 1, 1, 1, 1, 1, - 2, - 2, - 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, - 2, - 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, - 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, - 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, - 2, - 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, - 2, - 2, - 2]
		],
		4 : [
			[- 2, 1, 1, 0, 1, 1, 1, 1, 1, - 2, - 2, - 2],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, - 2, - 2],
			[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, - 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, - 2],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, - 2, - 2],
			[- 2, 1, 1, 0, 1, 1, 1, 1, 1, - 2, - 2, - 2]
		],
		5 : [
			[- 2, 1, 1, 1, 0, 1, 1, 1, 1, - 2, - 2, 2],
			[- 2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, - 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, - 2],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, - 2],
			[- 2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, - 2],
			[- 2, 1, 1, 1, 0, 1, 1, 1, 1, - 2, - 2, 2]
		],
		6 : [
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 2],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2]
		],
		7 : [
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2],
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 2],
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2],
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 2],
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2],
			[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0]
		]
	};
	//下落方式 0为直接下，1为有障碍跳过障碍，2为对角下，当前位置生成，3入口生成
	export const DOWN_ROUND = {
		1 : 0,
		2 : 1,
		3 : 2,
		4 : 3,
		5 : 3,
		6 : 3,
		7 : 3
	};
	//下落入口配置
	export const DOWN_CONF = {
		1 : {
			beginIndex : 0,
			endIndex : 9
		},
		2 : {
			beginIndex : 0,
			endIndex : 9
		},
		3 : {
			beginIndex : 3,
			endIndex : 6
		},
		4 : {
			beginIndex : 3,
			endIndex : 6
		},
		5 : {
			beginIndex : 0,
			endIndex : 9
		},
		6 : {
			beginIndex : 0,
			endIndex : 9
		},
		7 : {
			beginIndex : 0,
			endIndex : 9
		}
	};
	
	export class GameData extends egret.DisplayObjectContainer implements IGameData {
		private _blockValue: number[][];
		private _gameStartView: GameStartView;
		public colorVec: number[][];
		
		constructor (game) {
			super ();
			this._gameStartView = game;
			this.addEventListener (egret.Event.ADDED_TO_STAGE, this.init, this);
		}
		
		public init (): void {
			this._blockValue = this.getValue ();
			this.colorVec = this._blockValue;
			this.colorVec = this.flashValue (this.colorVec);
			this._gameStartView.onStart (this.colorVec);
		}
		
		public getValue (): number[][] {
			let colorVec = [];
			for (let i = 0; i < 10; i ++) {
				colorVec[i] = [];
				for (let j = 0; j < 12; j ++) {
					if (Block_Conf[main_round][i][j] > 0) {
						let colorNum = Math.ceil (Math.random () * 6);
						colorVec[i].push (colorNum);
					}
					else if (Block_Conf[main_round][i][j] == 0) {
						colorVec[i].push (0);
					} else {
						colorVec[i].push (null);
					}
				}
			}
			return colorVec;
		}
		
		public flashValue (colorVec): number[][] {
			let numCount = 0;
			for (let i = 0; i < 10; i ++) {
				for (let j = 0; j < 12; j ++) {
					if (this.colorVec[i][j]) {
						let flag = this.canClear (colorVec, j, i);
						if (flag) {
							numCount ++;
							let num = Math.ceil (Math.random () * 6);
							if (num != this.colorVec[i][j]) {
								colorVec[i][j] = num;
							}
						}
					}
				}
			}
			if (numCount != 0) {
				this.flashValue (colorVec);
			}
			return colorVec;
		}
		
		private canClear (colorVec, row, col): number {
			//水平是否可消
			let clearLength_1 = 1;
			for (let j = col + 1; j < 10; j ++) {
				if (colorVec[j][row] == colorVec[col][row]) {
					clearLength_1 ++;
				} else {
					break;
				}
			}
			for (let j = col - 1; j >= 0; j --) {
				if (colorVec[j][row] == colorVec[col][row]) {
					clearLength_1 ++;
				} else {
					break;
				}
			}
			//垂直是否可消
			let clearLength_2 = 1;
			for (let i = row + 1; i < 12; i ++) {
				if (colorVec[col][i] == colorVec[col][row]) {
					clearLength_2 ++;
				} else {
					break;
				}
			}
			for (let i = row - 1; i >= 0; i --) {
				if (colorVec[col][i] == colorVec[col][row]) {
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
						//  console.log("当前可以消除");
						//水平可以消除
						return 1;
					}
					if (clearLength_2 >= 3) {
						//   console.log("当前可以消除");
						//垂直
						return 2;
					}
				}
			} else {
				return 0;
			}
		}
	}
}