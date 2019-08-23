namespace happyClear {
	//资源
	const source_key = "hc_animal_%d_png";
	export class BlockView extends egret.DisplayObjectContainer {
		//行列消除特效
		public lineClearIce: egret.Bitmap;
		public lockImg: egret.Bitmap;
		public position: IPosition;
		//方块对应的行
		public row: number;
		//方块对应的列
		public column: number;
		//用于给方块排序，第一种下落方式用
		public order: number;
		//1为左滑，2，为右滑
		public downStatus: number = 0;
		public text_1: egret.TextField;
		//创建的方式  决定方块在哪里生成
		private _status: number;
		//方块的值，对应动物的图片
		private _value: number;
		//存放动物的位图
		private _block: egret.Bitmap;
		
		constructor (line, col, status: number) {
			super ();
			this.position = {
				x : null,
				y : null
			};
			//初始的方块
			if (status == 1) {
				this.position.x = 145 + 50 * col;
				this.position.y = 825 - 50 * line;
			} else if (status == 0) {
				this.position.x = 145 + 50 * col;
				this.position.y = 825 - 50 * 12;
				this.visible = false;
			} else {
				//直接给值
				this.position.x = line;
				this.position.y = col;
			}
			this._status = status;
			this.row = line;
			this.column = col;
			this.order = col * 10 + line;
			this.touchChildren = false;
			this.touchEnabled = true;
			this.addEventListener (egret.Event.ADDED_TO_STAGE, this.initBlock, this);
		}
		
		public set Value (value) {
			this._value = value;
			this.displayByValue (value);
		}
		
		public get Value (): number {
			return this._value;
		}
		
		private initBlock () {
			this.lockImg = new egret.Bitmap ();
			this._block = new egret.Bitmap ();
			this.lineClearIce = new egret.Bitmap ();
			this.lockImg.texture = RES.getRes ("hc_ice_png");
			this.lineClearIce.texture = RES.getRes ("hc_lock_png");
			this.width = 50;
			this.height = 50;
			// if(status==3)
			this.x = this.position.x;
			this.y = this.position.y;
			this.addChild (this._block);
			this.addChild (this.lineClearIce);
			this.addChild (this.lockImg);
			this.lineClearIce.alpha = 0.7;
			this.lineClearIce.visible = false;
			this.lineClearIce.width = 48;
			this.lineClearIce.height = 48;
			this.lockImg.alpha = 1;
			this.lockImg.visible = false;
			this.lockImg.width = 48;
			this.lockImg.height = 48;
			this.lineClearIce.x = 1;
			this.lineClearIce.y = 1;
			this.lockImg.x = 1;
			this.lockImg.y = 1;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
			this._block.x = 1;
			this._block.y = 1;
			if (this._status == 3) {
				this._block.width = 32;
				this._block.height = 32;
				this.lockImg.width = 32;
				this.lockImg.height = 32;
			} else {
				this._block.width = 48;
				this._block.height = 48;
			}
		}
		
		public displayByValue (value): void {
			   // this.text_1= new egret.TextField();
			   //  this.text_1.size  =15;
			   //  this.text_1.height = 20;
			   //  this.text_1.width = 40;
			   //  this.text_1.textColor = 0x000000;
			   //  this.text_1.text = ""+value;
			   //  this.addChild(this.text_1);
			this._block.texture = RES.getRes (source_key.replace ("%d", value));
		}
	}
}