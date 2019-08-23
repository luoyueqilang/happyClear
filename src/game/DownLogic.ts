namespace happyClear {
	//方块下落逻辑
	export class DownLogic extends egret.DisplayObjectContainer {
		//传入得主舞台对象
		private _gameView: GameStartView;

		constructor(game) {
			super();
			this._gameView = game;
		}

		//有三种下落方式
		public downAnimal(): void {
			this.touchEnabled = false;
			this.touchChildren = true;
			let maxLength: number = 0;
			//删除数组
			if (DOWN_ROUND[main_round] == 0) {
				for (let i = 0; i < 10; i++) {
					let length = this._gameView.colorVec[i].length;
					for (let j = 0; j < length; j++) {
						let index = this._gameView.blockMap[i].indexOf(this._gameView.blockMap[i][j]);
						if (index != this._gameView.blockMap[i][j].row) {
							let distance = this._gameView.blockMap[i][j].row - index;
							if (distance >= maxLength) {
								maxLength = distance;
							}
							//let down_row = this._gameView.blockMap[i][j].row;
							this._gameView.blockMap[i][j].row = index;
							this._gameView.blockMap[i][j].order = this._gameView.blockMap[i][j].column * 10 + this._gameView.blockMap[i][j].row;
							this._gameView.blockMap[i][j].y = 825 - 50 * index;
						}
					}
				}
			}
			else if (DOWN_ROUND[main_round] == 1) {
				//实心方块上方的会掉下来
				for (let i1 = 0; i1 < 10; i1++) {
					for (let j1 = 1; j1 < 12; j1++) {
						if (this._gameView.colorVec[i1][j1] > 0 && (this._gameView.colorVec[i1][j1 - 1] == - 1 || this._gameView.colorVec[i1][j1 - 1] == 0)) {
							let countLength: number = 0;
							for (let k = j1 - 1; k >= 0; k--) {
								if (this._gameView.colorVec[i1][k] == - 1) {
									countLength++;
								} else if (this._gameView.colorVec[i1][k] == 0 && this._gameView.colorVec[i1][k - 1] == - 1) {
									k--;
									countLength += 2;
								} else {
									break;
								}
							}
							if (countLength) {
								this._gameView.blockMap[i1][j1].row = j1 - countLength;
								this._gameView.blockMap[i1][j1].y = 825 - 50 * (j1 - countLength);
								this._gameView.colorVec[i1][j1 - countLength] = this._gameView.colorVec[i1][j1];
								this._gameView.blockMap[i1][j1 - countLength] = this._gameView.blockMap[i1][j1];
								this._gameView.colorVec[i1][j1] = - 1;
								this._gameView.blockMap[i1][j1] = null;
							}
							if (maxLength < countLength) {
								maxLength = countLength;
							}
						}
					}
				}
			} else if (DOWN_ROUND[main_round] == 2) {
				//检测一个方块下一个是否为空方块  实心方块不会下落且上方的不会掉下来   //垂直下落
				for (let i = 0; i < 10; i++) {
					for (let j = 1; j < 12; j++) {
						if (this._gameView.colorVec[i][j] > 0 && this._gameView.colorVec[i][j - 1] == - 1) {
							let countLength: number = 0;
							for (let k = j - 1; k >= 0; k--) {
								if (this._gameView.colorVec[i][k] == - 1) {
									countLength++;
								} else {
									break;
								}
							}
							this._gameView.blockMap[i][j].row = j - countLength;
							this._gameView.blockMap[i][j].y = 825 - 50 * (j - countLength);
							this._gameView.colorVec[i][j - countLength] = this._gameView.colorVec[i][j];
							this._gameView.blockMap[i][j - countLength] = this._gameView.blockMap[i][j];
							this._gameView.colorVec[i][j] = - 1;
							this._gameView.blockMap[i][j] = null;
						}
					}
				}
			}
			let time: number;
			time = (maxLength + 1) * 250;
			console.log('2');
			if (main_round == 1) {
				time = (maxLength + 1) * 250;
			}
			let self = this;
			setTimeout(function () {
				self._gameView.createAnimal();
			}, 20);
			setTimeout(function () {
				let clearAnimalList_1: BlockView[];
				clearAnimalList_1 = self._gameView.gameLogic.globalClear();
				self._gameView.clearLength = clearAnimalList_1.length;
				if (clearAnimalList_1.length) {
					self._gameView.gameLogic.clearAll(clearAnimalList_1);
				} else {
					//拷贝二维数组
					let colorArr = deepCopy(self._gameView.colorVec);
					//保存数据，方块跟冰块的数据源
					self._gameView.saveColorVec.push(colorArr);
					let lockVec_2 = deepCopy(self._gameView.lockVec);
					self._gameView.saveLockVec.push(lockVec_2);
					self._gameView.gameLogic.DeafCheck(colorArr);
					//保存分数,步数，消除个数
					self._gameView.saveGameScore.push(self._gameView.gameScore);
					self._gameView.saveStepCount.push(self._gameView.stepCount);
					self._gameView.saveClearCount.push(self._gameView.clearCount);
					console.log(self._gameView.colorVec);
					self.touchEnabled = true;
					self.touchChildren = true;
					self._gameView.gameLogic.bOver();
				}
			}, time);
		}

		//斜下落专属全局下落
		public downSkew(): void {
			//检测一个方块下一个是否为空方块  实心方块不会下落且上方的不会掉下来   //垂直下落    斜对角
			console.log("4");
			//let clearLength: number = 0;
			for (let i = 0; i < 10; i++) {
				for (let j = 1; j < 12; j++) {
					if (this._gameView.colorVec[i][j] > 0 && this._gameView.colorVec[i][j - 1] == - 1) {
						let countLength: number = 0;
						for (let k = j - 1; k >= 0; k--) {
							if (this._gameView.colorVec[i][k] == - 1) {
								countLength++;
							} else {
								break;
							}
						}
						this._gameView.blockMap[i][j].row = j - countLength;
						this._gameView.blockMap[i][j].downStatus = 0;
						this._gameView.blockMap[i][j].y = 825 - 50 * (j - countLength);
						this._gameView.colorVec[i][j - countLength] = this._gameView.colorVec[i][j];
						this._gameView.blockMap[i][j - countLength] = this._gameView.blockMap[i][j];
						this._gameView.colorVec[i][j] = - 1;
						this._gameView.blockMap[i][j] = null;
					}
				}
			}
			this.createAnimalPlus();
		}

		//斜对角下落专属生成方块函数
		public createAnimalPlus(): void {
			this._gameView.touchEnabled = false;
			this._gameView.touchChildren = false;
			let num: number = 0;
			//let createFlag: boolean = false;
			if (this._gameView.clearLength) {
				console.log("1->方块斜滑");
				for (let i = 0; i < 10; i++) {
					for (let j = 1; j < 12; j++) {
						//如果有方块
						if (this._gameView.colorVec[i][j] > 0 && this._gameView.blockMap[i][j]) {
							//下方是否有方块
							if (this._gameView.colorVec[i][j - 1] == - 1) {
								this._gameView.colorVec[i][j - 1] = this._gameView.colorVec[i][j];
								this._gameView.blockMap[i][j].row = j - 1;
								this._gameView.blockMap[i][j].column = i;
								//加动画
								egret.Tween.get(this._gameView.blockMap[i][j]).to({
									x: 145 + 50 * this._gameView.blockMap[i][j].column,
									y: 825 - 50 * this._gameView.blockMap[i][j].row
								}, 80).call(() => {
									console.log("原" + j + "行" + i + "列" + "方块");
									this._gameView.blockMap[i][j - 1] = this._gameView.blockMap[i][j];
									this._gameView.blockMap[i][j] = null;
									this._gameView.colorVec[i][j] = - 1;
									console.log("数组赋值成功 下滑");
								});
								num++;
							} else {
								//判断是否是下落的方块，如果是，就判断左边或者右边是否有  1为左滑，2为右滑
								if (this._gameView.blockMap[i][j].downStatus) {
									if (i > 0 && i < 9) {
										if (this._gameView.blockMap[i][j].downStatus == 1 && this._gameView.colorVec[i - 1][j] == - 1) {
											this._gameView.colorVec[i - 1][j] = this._gameView.colorVec[i][j];
											this._gameView.blockMap[i][j].column = i - 1;
											egret.Tween.get(this._gameView.blockMap[i][j]).to(
												{ x: 145 + 50 * (i - 1) }, 80).call(() => {
													console.log("原" + j + "行" + i + "列" + "方块");
													console.log(this._gameView.blockMap[i][j]);
													this._gameView.blockMap[i - 1][j] = this._gameView.blockMap[i][j];
													this._gameView.blockMap[i][j] = null;
													this._gameView.colorVec[i][j] = - 1;
													console.log("数组赋值成功 左滑");
												});
											num++;
										} else if (this._gameView.blockMap[i][j].downStatus == 2 && this._gameView.colorVec[i + 1][j] == - 1) {
											this._gameView.colorVec[i + 1][j] = this._gameView.colorVec[i][j];
											this._gameView.blockMap[i][j].column = i + 1;
											egret.Tween.get(this._gameView.blockMap[i][j]).to(
												{ x: 145 + 50 * (i + 1) }, 80).call(() => {
													console.log("原" + j + "行" + i + "列" + "方块");
													console.log(this._gameView.blockMap[i][j]);
													this._gameView.blockMap[i + 1][j] = this._gameView.blockMap[i][j];
													this._gameView.blockMap[i][j] = null;
													this._gameView.colorVec[i][j] = - 1;
													console.log("数组赋值成功 右滑");
												});
											num++;
										} else {
											this._gameView.blockMap[i][j].downStatus = 0;
											//this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
										}
									}
								} else {
									//是否满足左滑条件
									if (i > 0 && i < 9) {
										//正下方有方块，检测左边下滑 正上方是否是障碍
										if ((this._gameView.colorVec[i - 1][j] == 0 || this._gameView.colorVec[i - 1][j] == null) && this._gameView.colorVec[i - 1][j - 1] == - 1) {
											this._gameView.colorVec[i - 1][j - 1] = this._gameView.colorVec[i][j];
											this._gameView.blockMap[i][j].row = j - 1;
											this._gameView.blockMap[i][j].column = i - 1;
											//给侧滑的方块一个属性
											egret.Tween.get(this._gameView.blockMap[i][j]).to({
												x: 145 + 50 * this._gameView.blockMap[i][j].column,
												y: 825 - 50 * this._gameView.blockMap[i][j].row
											}, 80).call(() => {
												console.log("原" + j + "行" + i + "列" + "方块");
												this._gameView.blockMap[i][j].downStatus = 1;
												this._gameView.blockMap[i - 1][j - 1] = this._gameView.blockMap[i][j];
												//this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
												this._gameView.blockMap[i][j] = null;
												this._gameView.colorVec[i][j] = - 1;
												console.log("数组赋值成功，+ 状态左滑");
											});
											num++;
										}
										//右边下滑
										else if ((this._gameView.colorVec[i + 1][j] == 0 || this._gameView.colorVec[i + 1][j] == null) && this._gameView.colorVec[i + 1][j - 1] == - 1) {
											this._gameView.colorVec[i + 1][j - 1] = this._gameView.colorVec[i][j];
											this._gameView.blockMap[i][j].row = j - 1;
											this._gameView.blockMap[i][j].column = i + 1;
											//加动画
											egret.Tween.get(this._gameView.blockMap[i][j]).to({
												x: 145 + 50 * this._gameView.blockMap[i][j].column,
												y: 825 - 50 * this._gameView.blockMap[i][j].row
											}, 80).call(() => {
												console.log("原" + j + "行" + i + "列" + "方块");
												this._gameView.blockMap[i][j].downStatus = 2;
												this._gameView.blockMap[i + 1][j - 1] = this._gameView.blockMap[i][j];
												//this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
												this._gameView.blockMap[i][j] = null;
												this._gameView.colorVec[i][j] = - 1;
												console.log("数组赋值成功+状态右滑");
											});
											//不加动画
											num++;
										}
									} else {
										if (i == 0) {
											if ((this._gameView.colorVec[i + 1][j] == 0 || this._gameView.colorVec[i + 1][j] == null) && this._gameView.colorVec[i + 1][j - 1] == - 1) {
												this._gameView.colorVec[i + 1][j - 1] = this._gameView.colorVec[i][j];
												this._gameView.blockMap[i][j].row = j - 1;
												this._gameView.blockMap[i][j].column = i + 1;
												//加动画
												egret.Tween.get(this._gameView.blockMap[i][j]).to({
													x: 145 + 50 * this._gameView.blockMap[i][j].column,
													y: 825 - 50 * this._gameView.blockMap[i][j].row
												}, 80).call(() => {
													console.log("原" + j + "行" + i + "列" + "方块");
													this._gameView.blockMap[i][j].downStatus = 2;
													this._gameView.blockMap[i + 1][j - 1] = this._gameView.blockMap[i][j];
													//this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
													this._gameView.blockMap[i][j] = null;
													this._gameView.colorVec[i][j] = - 1;
													console.log("数组赋值成功");
												});
												num++;
											}
										} else {
											//i=9时左边侧滑  入口生成特殊情况
											if ((this._gameView.colorVec[i - 1][j] == 0 || this._gameView.colorVec[i - 1][j] == null) && this._gameView.colorVec[i - 1][j - 1] == - 1) {
												this._gameView.colorVec[i - 1][j - 1] = this._gameView.colorVec[i][j];
												this._gameView.blockMap[i][j].row = j - 1;
												this._gameView.blockMap[i][j].column = i - 1;
												//给侧滑的方块一个属性
												egret.Tween.get(this._gameView.blockMap[i][j]).to({
													x: 145 + 50 * this._gameView.blockMap[i][j].column,
													y: 825 - 50 * this._gameView.blockMap[i][j].row
												}, 80).call(() => {
													console.log("原" + j + "行" + i + "列" + "方块");
													this._gameView.blockMap[i][j].downStatus = 1;
													this._gameView.blockMap[i - 1][j - 1] = this._gameView.blockMap[i][j];
													//this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
													this._gameView.blockMap[i][j] = null;
													this._gameView.colorVec[i][j] = - 1;
													console.log("数组赋值成功,方块左滑");
												});
												num++;
											}
										}
									}
								}
							}
						}
					}
				}
			}
			//特殊情况判定
			if (this._gameView.clearLength && num == 0) {
				//此处写左边左滑，右边右滑，可加 右面左滑，左边右滑 保证条件互斥即可
				for (let i = 1; i < 7; i++) {
					for (let j = 1; j < 11; j++) {
						if (this._gameView.colorVec[i][j] && this._gameView.blockMap[i][j]) {
							//左下侧滑
							if ((this._gameView.colorVec[i][j + 1] == 0 || this._gameView.colorVec[i][j + 1] == null) && (this._gameView.colorVec[i - 1][j + 1] == 0 || this._gameView.colorVec[i - 1][j + 1] == null)) {
								if (this._gameView.colorVec[i - 1][j - 1] == - 1) {
									this._gameView.colorVec[i - 1][j - 1] = this._gameView.colorVec[i][j];
									this._gameView.blockMap[i][j].row = j - 1;
									this._gameView.blockMap[i][j].column = i - 1;
									egret.Tween.get(this._gameView.blockMap[i][j]).to({
										x: 145 + 50 * this._gameView.blockMap[i][j].column,
										y: 825 - 50 * this._gameView.blockMap[i][j].row
									}, 80).call(() => {
										console.log("原" + j + "行" + i + "列" + "方块");
										this._gameView.blockMap[i][j].downStatus = 1;
										this._gameView.blockMap[i - 1][j - 1] = this._gameView.blockMap[i][j];
										//this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
										this._gameView.blockMap[i][j] = null;
										this._gameView.colorVec[i][j] = - 1;
										console.log("数组赋值成功，左下滑");
									});
									num++;
								} else if (this._gameView.colorVec[i - 1][j] == - 1) {
									this._gameView.colorVec[i - 1][j] = this._gameView.colorVec[i][j];
									this._gameView.blockMap[i][j].column = i - 1;
									egret.Tween.get(this._gameView.blockMap[i][j]).to({ x: 145 + 50 * (i - 1) },
										80).call(() => {
											console.log("原" + j + "行" + i + "列" + "方块");
											this._gameView.blockMap[i][j].downStatus = 1;
											this._gameView.blockMap[i - 1][j] = this._gameView.blockMap[i][j];
											this._gameView.blockMap[i][j] = null;
											this._gameView.colorVec[i][j] = - 1;
											console.log("数组赋值成功，左滑");
										});
									num++;
								}
							}
						}
					}
				}
				for (let i = 3; i < 9; i++) {
					for (let j = 1; j < 11; j++) {
						if (this._gameView.colorVec[i][j] && this._gameView.blockMap[i][j]) {
							//左下侧滑
							if ((this._gameView.colorVec[i][j + 1] == 0 || this._gameView.colorVec[i][j + 1] == null) && (this._gameView.colorVec[i + 1][j + 1] == 0 || this._gameView.colorVec[i + 1][j + 1] == null)) {
								if (this._gameView.colorVec[i + 1][j - 1] == - 1) {
									this._gameView.colorVec[i + 1][j - 1] = this._gameView.colorVec[i][j];
									this._gameView.blockMap[i][j].row = j - 1;
									this._gameView.blockMap[i][j].column = i + 1;
									egret.Tween.get(this._gameView.blockMap[i][j]).to({
										x: 145 + 50 * this._gameView.blockMap[i][j].column,
										y: 825 - 50 * this._gameView.blockMap[i][j].row
									}, 80).call(() => {
										console.log("原" + j + "行" + i + "列" + "方块");
										this._gameView.blockMap[i][j].downStatus = 2;
										this._gameView.blockMap[i + 1][j - 1] = this._gameView.blockMap[i][j];
										//this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
										this._gameView.blockMap[i][j] = null;
										this._gameView.colorVec[i][j] = - 1;
										console.log("数组赋值成功，右下滑");
									});
									num++;
								} else if (this._gameView.colorVec[i + 1][j] == - 1) {
									this._gameView.colorVec[i + 1][j] = this._gameView.colorVec[i][j];
									this._gameView.blockMap[i][j].column = i + 1;
									egret.Tween.get(this._gameView.blockMap[i][j]).to({ x: 145 + 50 * (i + 1) },
										80).call(() => {
											console.log("原" + j + "行" + i + "列" + "方块");
											this._gameView.blockMap[i][j].downStatus = 2;
											this._gameView.blockMap[i + 1][j] = this._gameView.blockMap[i][j];
											this._gameView.blockMap[i][j] = null;
											this._gameView.colorVec[i][j] = - 1;
											console.log("数组赋值成功，右滑");
										});
									num++;
								}
							}
						}
					}
				}
			}
			if (this._gameView.clearLength) {
				//说明是特殊情况
				let self = this;
				setTimeout(function () {
					console.log(num + "->num");
					self._gameView.createAnimalEntry();
				}, 90);
			}
		}
	}
}