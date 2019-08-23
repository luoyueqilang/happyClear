namespace happyClear {

	export class UIView extends eui.Component implements eui.UIComponent {

		public score: eui.Label;
		public roundInfo: eui.Label;
		public stepCount: eui.Label;
		public colorCount: eui.Label;
		public target_score: eui.Label;
		//  提示文本
		public tip_text: eui.Label;
		private _gameStartView: GameStartView;
		private front_round: eui.Label;
		private next_round: eui.Label;
		private refresh_btn: eui.Label;
		private addStepCount_btn: eui.Label;
		private hammer_btn: eui.Label;
		//魔法棒
		private magicWand_btn: eui.Label;
		//撤回按钮
		private back_btn: eui.Label;

		constructor(game) {
			super();
			this._gameStartView = game;
			this.skinName = "HC_TableViewSkin";
			this.front_round.touchEnabled = true;
			this.next_round.touchEnabled = true;
			this.refresh_btn.touchEnabled = true;
			this.hammer_btn.touchEnabled = true;
			this.addStepCount_btn.touchEnabled = true;
			this.magicWand_btn.touchEnabled = true;
			this.back_btn.touchEnabled = true;
			this.front_round.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnFront, this);
			this.next_round.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnNext, this);
			this.refresh_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRefresh, this);
			this.addStepCount_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddStepCount, this);
			this.hammer_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHammer, this);
			//魔法棒
			this.magicWand_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMagicWand, this);
			this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
		}

		private turnFront(): void {
			if (main_round <= 1) {
				main_round = 7;
			} else {
				main_round--;
			}
			this._gameStartView.gameLogic.gameOver();
		}

		private turnNext(): void {
			if (main_round >= 7) {
				main_round = 1;
			} else {
				main_round++;
			}
			this._gameStartView.gameLogic.gameOver();
		}

		//刷新
		private onRefresh(): void {
			let colorVec = this._gameStartView.colorVec;
			let blockMap = this._gameStartView.blockMap;
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 12; j++) {
					if (colorVec[i][j]) {
						colorVec[i][j] = Math.ceil(Math.random() * 6);
					}
				}
			}
			colorVec = this._gameStartView.gameData.flashValue(colorVec);
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 12; j++) {
					if (colorVec[i][j]) {
						blockMap[i][j].Value = colorVec[i][j];
					}
				}
			}
			//刷新侯看是否能消
			let self = this._gameStartView;
			let clearAnimalList_1: BlockView[];
			clearAnimalList_1 = self.gameLogic.globalClear();
			self.clearLength = clearAnimalList_1.length;
			if (clearAnimalList_1.length) {
				self.gameLogic.clearAll(clearAnimalList_1);
			} else {
				//检测是否达到通关要求
				let colorArr = deepCopy(self.colorVec);
				let lockvec = deepCopy(self.lockVec);
				self.saveColorVec.push(colorArr);
				self.saveLockVec.push(lockvec);
				//保存分数,步数，消除个数
				self.saveGameScore.push(self.gameScore);
				self.saveStepCount.push(self.stepCount);
				self.saveClearCount.push(self.clearCount);
				self.gameLogic.DeafCheck(colorArr);
				self.touchEnabled = true;
				self.touchChildren = true;
				self.gameLogic.bOver();
			}
		}

		//加步数
		private onAddStepCount(): void {
			this._gameStartView.stepCount += 5;
			this.stepCount.text = "" + this._gameStartView.stepCount;
		}

		//c锤子
		private onClickHammer(): void {
			// alert("请点击要消除的动物");
			this.tip_text.text = "请点击要消除的动物";
			this._gameStartView.alpha = 0.9;
			this._gameStartView.touchStatus = 0;
		}

		//魔法棒
		private onClickMagicWand(): void {
			// alert("请点击要行列消除特效的动物");
			this.tip_text.text = "请点击要行列消除特效的动物";
			this._gameStartView.alpha = 0.8;
			this._gameStartView.touchStatus = 2;
		}
		//撤回
		private onBack(): void {
			this._gameStartView.turnBack();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}
}