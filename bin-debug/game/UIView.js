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
    var UIView = (function (_super) {
        __extends(UIView, _super);
        function UIView(game) {
            var _this = _super.call(this) || this;
            _this._gameStartView = game;
            _this.skinName = "HC_TableViewSkin";
            _this.front_round.touchEnabled = true;
            _this.next_round.touchEnabled = true;
            _this.refresh_btn.touchEnabled = true;
            _this.hammer_btn.touchEnabled = true;
            _this.addStepCount_btn.touchEnabled = true;
            _this.magicWand_btn.touchEnabled = true;
            _this.back_btn.touchEnabled = true;
            _this.front_round.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnFront, _this);
            _this.next_round.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.turnNext, _this);
            _this.refresh_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onRefresh, _this);
            _this.addStepCount_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onAddStepCount, _this);
            _this.hammer_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickHammer, _this);
            //魔法棒
            _this.magicWand_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickMagicWand, _this);
            _this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBack, _this);
            return _this;
        }
        UIView.prototype.turnFront = function () {
            if (main_round <= 1) {
                main_round = 7;
            }
            else {
                main_round--;
            }
            this._gameStartView.gameLogic.gameOver();
        };
        UIView.prototype.turnNext = function () {
            if (main_round >= 7) {
                main_round = 1;
            }
            else {
                main_round++;
            }
            this._gameStartView.gameLogic.gameOver();
        };
        //刷新
        UIView.prototype.onRefresh = function () {
            var colorVec = this._gameStartView.colorVec;
            var blockMap = this._gameStartView.blockMap;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 12; j++) {
                    if (colorVec[i][j]) {
                        colorVec[i][j] = Math.ceil(Math.random() * 6);
                    }
                }
            }
            colorVec = this._gameStartView.gameData.flashValue(colorVec);
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 12; j++) {
                    if (colorVec[i][j]) {
                        blockMap[i][j].Value = colorVec[i][j];
                    }
                }
            }
            //刷新侯看是否能消
            var self = this._gameStartView;
            var clearAnimalList_1;
            clearAnimalList_1 = self.gameLogic.globalClear();
            self.clearLength = clearAnimalList_1.length;
            if (clearAnimalList_1.length) {
                self.gameLogic.clearAll(clearAnimalList_1);
            }
            else {
                //检测是否达到通关要求
                var colorArr = happyClear.deepCopy(self.colorVec);
                var lockvec = happyClear.deepCopy(self.lockVec);
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
        };
        //加步数
        UIView.prototype.onAddStepCount = function () {
            this._gameStartView.stepCount += 5;
            this.stepCount.text = "" + this._gameStartView.stepCount;
        };
        //c锤子
        UIView.prototype.onClickHammer = function () {
            // alert("请点击要消除的动物");
            this.tip_text.text = "请点击要消除的动物";
            this._gameStartView.alpha = 0.9;
            this._gameStartView.touchStatus = 0;
        };
        //魔法棒
        UIView.prototype.onClickMagicWand = function () {
            // alert("请点击要行列消除特效的动物");
            this.tip_text.text = "请点击要行列消除特效的动物";
            this._gameStartView.alpha = 0.8;
            this._gameStartView.touchStatus = 2;
        };
        //撤回
        UIView.prototype.onBack = function () {
            this._gameStartView.turnBack();
        };
        UIView.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        UIView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return UIView;
    }(eui.Component));
    happyClear.UIView = UIView;
    __reflect(UIView.prototype, "happyClear.UIView", ["eui.UIComponent", "egret.DisplayObject"]);
})(happyClear || (happyClear = {}));
//# sourceMappingURL=UIView.js.map