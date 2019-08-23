var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var happyClear;
(function (happyClear) {
    //资源
    var source_key = "hc_animal_%d_png";
    var BlockView = (function (_super) {
        __extends(BlockView, _super);
        function BlockView(line, col, status) {
            var _this = _super.call(this) || this;
            //1为左滑，2，为右滑
            _this.downStatus = 0;
            _this.position = {
                x: null,
                y: null
            };
            //初始的方块
            if (status == 1) {
                _this.position.x = 145 + 50 * col;
                _this.position.y = 825 - 50 * line;
            }
            else if (status == 0) {
                _this.position.x = 145 + 50 * col;
                _this.position.y = 825 - 50 * 12;
                _this.visible = false;
            }
            else {
                //直接给值
                _this.position.x = line;
                _this.position.y = col;
            }
            _this._status = status;
            _this.row = line;
            _this.column = col;
            _this.order = col * 10 + line;
            _this.touchChildren = false;
            _this.touchEnabled = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initBlock, _this);
            return _this;
        }
        Object.defineProperty(BlockView.prototype, "Value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
                this.displayByValue(value);
            },
            enumerable: true,
            configurable: true
        });
        BlockView.prototype.initBlock = function () {
            this.lockImg = new egret.Bitmap();
            this._block = new egret.Bitmap();
            this.lineClearIce = new egret.Bitmap();
            this.lockImg.texture = RES.getRes("hc_ice_png");
            this.lineClearIce.texture = RES.getRes("hc_lock_png");
            this.width = 50;
            this.height = 50;
            // if(status==3)
            this.x = this.position.x;
            this.y = this.position.y;
            this.addChild(this._block);
            this.addChild(this.lineClearIce);
            this.addChild(this.lockImg);
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
            }
            else {
                this._block.width = 48;
                this._block.height = 48;
            }
        };
        BlockView.prototype.displayByValue = function (value) {
            // this.text_1= new egret.TextField();
            //  this.text_1.size  =15;
            //  this.text_1.height = 20;
            //  this.text_1.width = 40;
            //  this.text_1.textColor = 0x000000;
            //  this.text_1.text = ""+value;
            //  this.addChild(this.text_1);
            this._block.texture = RES.getRes(source_key.replace("%d", value));
        };
        return BlockView;
    }(egret.DisplayObjectContainer));
    happyClear.BlockView = BlockView;
    __reflect(BlockView.prototype, "happyClear.BlockView");
})(happyClear || (happyClear = {}));
//# sourceMappingURL=BlockView.js.map