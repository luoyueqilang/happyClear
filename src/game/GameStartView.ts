namespace happyClear {
	//
	export class GameStartView extends egret.DisplayObjectContainer implements IGameStartView {
		//
		public colorVec: number[][];
		//每一步结束保存的数据，作为撤回功能用
		public saveColorVec: number[][][] = [];
		// public saveLockMap: BlockView[][] = [];
		public saveLockVec: number[][][] = [];
		//锁定的方块的数据源
		public lockVec: number[][] = [];
		public blockMap: BlockView[][];
		//存放冰块
		public lockMap: BlockView[][];
		//剩余步数
		public stepCount: number = 0;
		public saveStepCount: number[] = [];
		//游戏分数
		public gameScore: number = 0;
		//保存分数
		public saveGameScore: number[] = [];
		public gameData: GameData;
		public gameLogic: GameLogic;
		public downLogic: DownLogic;
		public firstFlag: boolean = true;
		//要消除的方块的个数
		public clearLength: number = 0;
		public animalContainer: egret.DisplayObjectContainer;
		public lockContainer: egret.DisplayObjectContainer;
		//需要消除的方块颜色
		public clearColor: number;
		//通关需要消除的个数
		public clearCount: number = 0;
		public saveClearCount: number[] = [];
		public animalInfo: BlockView;
		public uiView: UIView;
		//判别是不是锤子的特效
		public touchStatus: number = 1;
		//返回次数
		public backCount: number = 0;
		//存放选择得两个交换的方块
		private _selectBlock: BlockView[] = [null, null];

		constructor() {
			super();
			this.touchEnabled = true;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		}

		private init(): void {
			this.uiView = new UIView(this);
			this.addChild(this.uiView);
			let table = new DrawTable();
			this.addChild(table);
			this.animalContainer = new egret.DisplayObjectContainer();
			this.lockContainer = new egret.DisplayObjectContainer();
			this.addChild(this.animalContainer);
			this.addChild(this.lockContainer);
			this.gameData = new GameData(this);
			this.addChild(this.gameData);
			this.gameLogic = new GameLogic(this);
			this.downLogic = new DownLogic(this);
			this.addChild(this.gameLogic);
			this.addWatch();
		}

		//添加监听
		private addWatch(): void {
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			// this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		}

		//游戏界面初始化入口
		public onStart(valueVec): void {
			this.colorVec = valueVec;
			this.blockMap = [];
			this.lockMap = [];
			let lockVec_1 = deepCopy(LOCK_CONF[main_round]);
			this.lockVec = lockVec_1;
			this.saveLockVec.push(lockVec_1);
			for (let i = 0; i < 10; i++) {
				this.blockMap[i] = [];
				this.lockMap[i] = [];
				for (let j = 0; j < 12; j++) {
					if (Block_Conf[main_round][i][j] > 0) {
						let animal = new BlockView(j, i, 1);
						this.blockMap[i].push(animal);
						this.lockMap[i].push(null);
						this.animalContainer.addChild(animal);
						animal.Value = valueVec[i][j];
					} else if (Block_Conf[main_round][i][j] == 0) {
						let animal = new BlockView(j, i, 1);
						this.animalContainer.addChild(animal);
						animal.Value = valueVec[i][j];
						this.blockMap[i].push(animal);
						this.lockMap[i].push(null);
					} else {
						this.blockMap[i].push(null);
						this.lockMap[i].push(null);
					}
				}
			}
			//保存数据
			this.saveColorVec.push(deepCopy(this.colorVec));
			this.uiView.score.text = '' + this.gameScore;
			this.uiView.roundInfo.text = '' + main_round;
			//过关信息
			if (OVER_CONF[main_round] == 0) {
				this.clearColor = 0;
				this.stepCount = STEP_SCORE[main_round][0];
				this.uiView.target_score.visible = true;
				this.uiView.colorCount.text = "" + STEP_SCORE[main_round][1];
			} else if (OVER_CONF[main_round] == 1) {
				this.clearColor = Math.ceil(Math.random() * 6);
				this.animalInfo = new BlockView(500, 160, 3);
				this.animalContainer.addChild(this.animalInfo);
				this.animalInfo.Value = this.clearColor;
				//步数
				this.stepCount = STEP_SCORE[main_round][0];
				//要消多少个
				this.clearCount = COLOR_NUM[main_round];
				this.uiView.target_score.visible = false;
				this.uiView.colorCount.text = "剩" + this.clearCount;
			} else {
				//不用知道颜色
				this.clearColor = 0;
				//步数
				this.stepCount = STEP_SCORE[main_round][0];
				this.uiView.target_score.visible = false;
				this.animalInfo = new BlockView(500, 160, 3);
				this.animalContainer.addChild(this.animalInfo);
				this.animalInfo.lockImg.visible = true;
				for (let i = 0; i < 10; i++) {
					for (let j = 0; j < 12; j++) {
						if (LOCK_CONF[main_round][i][j] == 1) {
							//显示冰块
							let animal = new BlockView(j, i, 1);
							animal.touchEnabled = false;
							animal.touchChildren = false;
							this.lockContainer.addChild(animal);
							this.lockMap[i][j] = animal;
							animal.lockImg.visible = true;
							animal.alpha = 0.9;
							//记录冰块的数目
							this.clearCount++;
						} else {
							this.lockMap[i][j] = null;
						}
					}
				}
				this.uiView.colorCount.text = "剩" + this.clearCount;
			}
			this.uiView.stepCount.text = "" + this.stepCount;
			//保存作为第一个数据
			this.saveClearCount.push(this.clearCount);
			this.saveStepCount.push(this.stepCount);
			this.saveGameScore.push(this.gameScore);
		}

		public onTouchBegin(evt: egret.TouchEvent): void {
			this._selectBlock = [null, null];
			if (happyClear.bBlock(evt.target)) {
				//不能是障碍
				if (evt.target.Value) {
					this._selectBlock[0] = evt.target;
				}
			}
		}

		public onTouchEnd(evt: egret.TouchEvent): void {
			if (this.touchStatus == 1) {
				if (bBlock(evt.target) && this._selectBlock[0] != null) {
					if (evt.target.Value) {
						let block = bBlock(evt.target);
						if (block.row == this._selectBlock[0].row || block.column == this._selectBlock[0].column) {
							if (Math.abs(block.row - this._selectBlock[0].row) == 1 || Math.abs(block.column - this._selectBlock[0].column) == 1) {
								this._selectBlock[1] = block;
								if (block.column == this._selectBlock[0].column) {
									//列相同
									let row_1 = this._selectBlock[0].row;
									let row_2 = block.row;
									egret.Tween.get(this._selectBlock[0]).to({ y: 825 - row_2 * 50 }, 100);
									egret.Tween.get(this._selectBlock[1]).to({ y: 825 - row_1 * 50 }, 100);
									this._selectBlock[0].row = row_2;
									this._selectBlock[1].row = row_1;
									//改变row的值都要改变order 后面排序用到
									this._selectBlock[0].order = this._selectBlock[0].column * 10 + this._selectBlock[0].row;
									this._selectBlock[1].order = this._selectBlock[1].column * 10 + this._selectBlock[1].row;
									this.colorVec[block.column][row_1] = this._selectBlock[1].Value;
									this.colorVec[block.column][row_2] = this._selectBlock[0].Value;
									let flag_1 = this.gameLogic.canClear(row_1, block.column);
									//row2是第二个
									let flag_2 = this.gameLogic.canClear(row_2, block.column);
									if (flag_1 == 0 && flag_2 == 0) {
										//不能消除，还原为之前的位置
										//setTimeout 也能实现  非循环可以不用set timeout
										setTimeout(() => {
											this._selectBlock[0].row = row_1;
											this._selectBlock[1].row = row_2;
											this._selectBlock[0].order = this._selectBlock[0].column * 10 + this._selectBlock[0].row;
											this._selectBlock[1].order = this._selectBlock[1].column * 10 + this._selectBlock[1].row;
											this.colorVec[block.column][row_1] = this._selectBlock[0].Value;
											this.colorVec[block.column][row_2] = this._selectBlock[1].Value;
											egret.Tween.get(this._selectBlock[0]).to({ y: 825 - row_1 * 50 }, 100);
											egret.Tween.get(this._selectBlock[1]).to({ y: 825 - row_2 * 50 }, 100);
										}, 100);
									} else {
										//列相同
										this.blockMap[block.column][row_1] = this._selectBlock[1];
										this.blockMap[block.column][row_2] = this._selectBlock[0];
										//获取可以消除的方块对象
										let clearList = this.gameLogic.getClearList(flag_1, row_1, block.column);
										let clearList_1 = this.gameLogic.getClearList(flag_2, row_2, block.column);
										let clearList_3 = [];
										//道具
										if (this._selectBlock[0].lineClearIce.visible == true && flag_2) {
											for (let k = 0; k < 12; k++) {
												if (this.colorVec[block.column][k]) {
													clearList_3.push(this.blockMap[block.column][k]);
												}
											}
										}
										if (this._selectBlock[1].lineClearIce.visible == true && flag_1) {
											for (let k = 0; k < 12; k++) {
												if (this.colorVec[block.column][k]) {
													clearList_3.push(this.blockMap[block.column][k]);
												}
											}
										}
										let clearList_final = [];
										let clearList_4 = clearList.concat(clearList_1).concat(clearList_3);
										//去重
										for (let k = 0; k < clearList_4.length; k++) {
											if (clearList_final.indexOf(
												clearList_4[k]) == - 1 && (clearList_4[k] instanceof BlockView)) {
												clearList_final.push(clearList_4[k]);
											}
										}
										if (DOWN_ROUND[main_round] == 0) {
											clearList_final.sort((a, b) => {
												return a.order - b.order;
											});
										}
										if (clearList_final.length) {
											this.stepCount--;
											for (let i = clearList_final.length - 1; i >= 0; i--) {
												this.clearLength++;
												this.clearAnimation(clearList_final[i], i);
											}
										}
									}
								} else {
									//行相同的情况
									let col_1 = this._selectBlock[0].column;
									let col_2 = block.column;
									egret.Tween.get(this._selectBlock[0]).to({ x: col_2 * 50 + 145 }, 100);
									egret.Tween.get(this._selectBlock[1]).to({ x: col_1 * 50 + 145 }, 100);
									this._selectBlock[0].column = col_2;
									this._selectBlock[1].column = col_1;
									//每改变col,row的值都要改变order
									this._selectBlock[0].order = this._selectBlock[0].column * 10 + this._selectBlock[0].row;
									this._selectBlock[1].order = this._selectBlock[1].column * 10 + this._selectBlock[1].row;
									this.colorVec[col_1][block.row] = this._selectBlock[1].Value;
									this.colorVec[col_2][block.row] = this._selectBlock[0].Value;
									let flag_1 = this.gameLogic.canClear(block.row, col_1);
									//col_2是第二个
									let flag_2 = this.gameLogic.canClear(block.row, col_2);
									//方块对象层面处理
									if (flag_1 == 0 && flag_2 == 0) {
										setTimeout(() => {
											this._selectBlock[0].column = col_1;
											this._selectBlock[1].column = col_2;
											this._selectBlock[0].order = this._selectBlock[0].column * 10 + this._selectBlock[0].row;
											this._selectBlock[1].order = this._selectBlock[1].column * 10 + this._selectBlock[1].row;
											this.colorVec[col_1][block.row] = this._selectBlock[0].Value;
											this.colorVec[col_2][block.row] = this._selectBlock[1].Value;
											egret.Tween.get(this._selectBlock[0]).to({ x: col_1 * 50 + 145 }, 100);
											egret.Tween.get(this._selectBlock[1]).to({ x: col_2 * 50 + 145 }, 100);
										}, 101);
									} else {
										this.blockMap[col_1][block.row] = this._selectBlock[1];
										this.blockMap[col_2][block.row] = this._selectBlock[0];
										let clearList: BlockView[] = this.gameLogic.getClearList(flag_1, block.row,
											col_1);
										let clearList_1: BlockView[] = this.gameLogic.getClearList(flag_2, block.row,
											col_2);
										let clearList_2: BlockView[] = [];
										//道具行消除
										if (this._selectBlock[0].lineClearIce.visible == true && flag_2) {
											for (let k = 0; k < 10; k++) {
												if (this.colorVec[k][block.row]) {
													clearList_2.push(this.blockMap[k][block.row]);
												}
											}
										}
										if (this._selectBlock[1].lineClearIce.visible == true && flag_1) {
											for (let k = 0; k < 10; k++) {
												if (this.colorVec[k][block.row]) {
													clearList_2.push(this.blockMap[k][block.row]);
												}
											}
										}
										//得到最后要消除的方块列表
										let clearList_final: BlockView[] = [];
										let clearList_4 = clearList.concat(clearList_1).concat(clearList_2);
										//去重
										for (let k = 0; k < clearList_4.length; k++) {
											if (clearList_final.indexOf(
												clearList_4[k]) == - 1 && (clearList_4[k] instanceof BlockView)) {
												clearList_final.push(clearList_4[k]);
											}
										}
										//拼接两个数组，避免最后一个执行两次导致bug!!
										if (DOWN_ROUND[main_round] == 0) {
											clearList_final.sort((a, b) => {
												return a.order - b.order;
											});
										}
										if (clearList_final.length) {
											this.stepCount--;
											//一个一个消除
											for (let i = clearList_final.length - 1; i >= 0; i--) {
												this.clearLength++;
												this.clearAnimation(clearList_final[i], i);
											}
										}
									}
								}
							}
						}
					}
				} else {
					this._selectBlock = [null, null];
				}
			} else if (this.touchStatus == 0) {
				if (bBlock(evt.target)) {
					let block = evt.target;
					this.alpha = 1;
					this.uiView.tip_text.text = "";
					let animal = evt.target;
					// animal.alpha = 0.8;
					let clearList_2 = [];
					//道具行消除 道具重合的时候
					if (animal.lineClearIce.visible == true) {
						this.clearLength = 0;
						for (let k = 0; k < 10; k++) {
							if (this.colorVec[k][block.row]) {
								this.clearLength++;
								clearList_2.push(this.blockMap[k][block.row]);
							}
						}
						for (let i = clearList_2.length - 1; i >= 0; i--) {
							this.clearAnimation(clearList_2[i], i);
						}
					} else {
						this.clearLength = 1;
						this.clearAnimation(animal, 0);
					}
					this.touchStatus = 1;
				}
			} else {
				if (bBlock(evt.target)) {
					this.alpha = 1;
					this.uiView.tip_text.text = "";
					let animal = evt.target;
					// animal.alpha = 0.8;
					animal.lineClearIce.visible = true;
					this.touchStatus = 1;
				}
			}
		}

		//清除一个
		public clearAnimation(animal, loop): void {
			console.log(this.clearLength);
			if (animal instanceof BlockView) {
				let line = animal.row;
				let col = animal.column;
				console.log("clearAnimation");
				//下落方式变
				if (DOWN_ROUND[main_round] == 0) {
					this.blockMap[col].splice(line, 1);
					this.colorVec[col].splice(line, 1);
				} else {
					this.blockMap[col][line] = null;
					//-1代表空
					this.colorVec[col][line] = - 1;
				}
				this.touchEnabled = false;
				this.touchChildren = false;
				egret.Tween.get(animal).to({ scaleX: 0, scaleY: 0 }, 800).call(() => {
					if (OVER_CONF[main_round] == 1) {
						if (animal.Value == this.clearColor) {
							this.clearCount--;
						}
						if (this.clearCount < 0) {
							this.clearCount = 0;
						}
					} else if (OVER_CONF[main_round] == 2) {
						//消除冰块
						if (this.lockVec[col][line]) {
							this.clearCount--;
							//0代表没有冰块
							this.lockVec[col][line] = 0;
							// this.lockContainer.removeChild(this.lockMap[col][line]);
							this.lockMap[col][line].visible = false;
						}
						if (this.clearCount < 0) {
							this.clearCount = 0;
						}
					}
					this.animalContainer.removeChild(animal);
					this.gameScore++;
					this.uiView.score.text = '' + this.gameScore;
					this.uiView.stepCount.text = "" + this.stepCount;
					if (OVER_CONF[main_round] == 1 || OVER_CONF[main_round] == 2) {
						this.uiView.colorCount.text = "剩" + this.clearCount;
					}
					//最后一个消除后下落
					if (loop == 0) {
						console.log("loop");
						let self = this;
						if (DOWN_ROUND[main_round] == 3) {
							setTimeout(function () {
								self.downLogic.downSkew();
							}, 150);
						} else {
							setTimeout(function () {
								self.downLogic.downAnimal();
							}, 150);
						}
					}
				});
			}
		}

		public createAnimal(): void {
			//第一关生成方式
			this.touchEnabled = false;
			this.touchChildren = true;
			if (DOWN_ROUND[main_round] == 0) {
				for (let i = 0; i < 10; i++) {
					let distance = 12 - this.colorVec[i].length;
					if (distance != 0) {
						for (let k = 0; k < distance; k++) {
							let j = this.colorVec[i].length;
							if (Block_Conf[main_round][i][j] == 1) {
								//生成方块
								let animal = new BlockView(j, i, 0);
								let down_num = 11 + k;
								this.animalContainer.addChild(animal);
								this.clearLength--;
								let setTime = setInterval(() => {
									if (down_num >= j) {
										if (down_num <= 11) {
											animal.visible = true;
										}
										animal.y = 825 - 50 * down_num;
										down_num--;
									} else {
										clearInterval(setTime);
									}
								}, 200);
								let colorNum = Math.ceil(Math.random() * 6);
								this.colorVec[i][j] = colorNum;
								animal.Value = colorNum;
								this.blockMap[i].push(animal);
							}
						}
					}
				}
			} else if (DOWN_ROUND[main_round] == 1) {
				for (let i = 0; i < 10; i++) {
					let clearNum: number = 0;
					for (let j = 0; j < 12; j++) {
						if (this.colorVec[i][j] == - 1) {
							//生成的方块的个数
							clearNum++;
						}
					}
					for (let j = 11; j > 0; j--) {
						if (this.colorVec[i][j] == - 1) {
							if (clearNum > 0) {
								clearNum--;
								let animal = new BlockView(j, i, 0);
								let down_num = 11 + clearNum;
								this.animalContainer.addChild(animal);
								this.clearLength--;
								this.colorVec[i][j] = Math.ceil(Math.random() * 6);
								this.blockMap[i][j] = animal;
								animal.Value = this.colorVec[i][j];
								let setTime = setInterval(() => {
									if (down_num >= j) {
										if (down_num <= 11) {
											animal.visible = true;
										}
										animal.y = 825 - 50 * down_num;
										down_num--;
									} else {
										clearInterval(setTime);
									}
								}, 200);
							}
						}
					}
				}
			} else if (DOWN_ROUND[main_round] == 2) {
				//斜对角下落
				for (let i = 0; i < 10; i++) {
					for (let j = 0; j < 12; j++) {
						if (this.colorVec[i][j] == - 1) {
							let animal = new BlockView(j, i, 1);
							this.animalContainer.addChild(animal);
							this.clearLength--;
							animal.scaleX = 0;
							animal.scaleY = 0;
							let colorNum = Math.ceil(Math.random() * 6);
							this.colorVec[i][j] = colorNum;
							animal.Value = colorNum;
							this.blockMap[i][j] = animal;
							egret.Tween.get(animal).to({ scaleX: 1, scaleY: 1 }, 200);
						}
					}
				}
			}
			// console.log(this.colorVec);
		}

		//入口生成函数
		public createAnimalEntry(): void {
			console.log("2->方块生成");
			// this.time--;
			let from = DOWN_CONF[main_round].beginIndex;
			let end = DOWN_CONF[main_round].endIndex;
			let count: number = 0;
			for (let i = from; i <= end; i++) {
				if (this.colorVec[i][11] == - 1) {
					count++;
					console.log("new");
					let animal = new BlockView(11, i, 1);
					this.animalContainer.addChild(animal);
					this.blockMap[i][11] = animal;
					let colorNum = Math.ceil(Math.random() * 6);
					this.colorVec[i][11] = colorNum;
					this.blockMap[i][11].Value = colorNum;
					this.clearLength--;
				}
			}
			if (this.clearLength) {
				console.log("this.clearLength", this.clearLength);
				let self = this;
				self.downLogic.createAnimalPlus();
			} else {
				let self = this;
				setTimeout(function () {
					let clearAnimalList_1: BlockView[];
					clearAnimalList_1 = self.gameLogic.globalClear();
					self.clearLength = clearAnimalList_1.length;
					if (clearAnimalList_1.length) {
						self.gameLogic.clearAll(clearAnimalList_1);
					} else {
						//保存数据
						//检测是否达到通关要求
						let colorArr = deepCopy(self.colorVec);
						//保存数据  还要保存步数，分数，消除的方块个数
						self.saveColorVec.push(colorArr);
						let lockVec_2 = deepCopy(self.lockVec);
						self.saveLockVec.push(lockVec_2);
						//保存分数,步数，消除个数
						self.saveGameScore.push(self.gameScore);
						self.saveStepCount.push(self.stepCount);
						self.saveClearCount.push(self.clearCount);
						self.gameLogic.DeafCheck(colorArr);
						self.touchEnabled = true;
						self.touchChildren = true;
						self.gameLogic.bOver();
					}
				}, 120);
			}
		}
		//撤回操作，保存每一次操作的数据
		public turnBack(): void {
			if (this.saveColorVec.length > 1 && this.backCount < 5) {
				this.backCount++;
				let len = this.saveColorVec.length;
				let len_1 = this.saveLockVec.length;
				let colorArr = this.saveColorVec[len - 2];
				let lockVec_1 = this.saveLockVec[len_1 - 2];
				this.gameScore = this.saveGameScore[this.saveGameScore.length - 2];
				this.clearCount = this.saveClearCount[this.saveGameScore.length - 2];
				this.stepCount = this.saveStepCount[this.saveStepCount.length - 2];
				this.saveLockVec.splice(len_1 - 2, 1);
				this.saveColorVec.splice(len - 2, 1);
				this.saveGameScore.splice(this.saveGameScore.length - 2, 1);
				// this.saveStepCount.splice(this.saveStepCount.length - 2, 1)
				if (OVER_CONF[main_round] > 0) {
					this.saveClearCount.splice(this.saveClearCount.length - 2, 1);
				}
				this.saveStepCount.splice(this.saveStepCount.length - 2, 1);
				if (OVER_CONF[main_round] > 0) {
					this.uiView.colorCount.text = "剩" + this.clearCount;
				}
				this.uiView.score.text = '' + this.gameScore;
				this.uiView.stepCount.text = "" + this.stepCount;
				for (let i = 0; i < 10; i++) {
					for (let j = 0; j < 12; j++) {
						//还原动物
						if (colorArr[i][j] > 0) {
							this.blockMap[i][j].Value = colorArr[i][j];
						}
						//还原冰块
						if (lockVec_1[i][j]) {
							this.lockMap[i][j].visible = true;
						}
					}
				}
				this.lockVec = lockVec_1;
				this.colorVec = colorArr;
			} else {
				//提示
				alert("不能后退了");
			}
		}
	}
}