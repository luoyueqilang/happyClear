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
    //
    var GameStartView = (function (_super) {
        __extends(GameStartView, _super);
        function GameStartView() {
            var _this = _super.call(this) || this;
            //每一步结束保存的数据，作为撤回功能用
            _this.saveColorVec = [];
            // public saveLockMap: BlockView[][] = [];
            _this.saveLockVec = [];
            //锁定的方块的数据源
            _this.lockVec = [];
            //剩余步数
            _this.stepCount = 0;
            _this.saveStepCount = [];
            //游戏分数
            _this.gameScore = 0;
            //保存分数
            _this.saveGameScore = [];
            _this.firstFlag = true;
            //要消除的方块的个数
            _this.clearLength = 0;
            //通关需要消除的个数
            _this.clearCount = 0;
            _this.saveClearCount = [];
            //判别是不是锤子的特效
            _this.touchStatus = 1;
            //返回次数
            _this.backCount = 0;
            //存放选择得两个交换的方块
            _this._selectBlock = [null, null];
            _this.touchEnabled = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
            return _this;
        }
        GameStartView.prototype.init = function () {
            this.uiView = new happyClear.UIView(this);
            this.addChild(this.uiView);
            var table = new happyClear.DrawTable();
            this.addChild(table);
            this.animalContainer = new egret.DisplayObjectContainer();
            this.lockContainer = new egret.DisplayObjectContainer();
            this.addChild(this.animalContainer);
            this.addChild(this.lockContainer);
            this.gameData = new happyClear.GameData(this);
            this.addChild(this.gameData);
            this.gameLogic = new happyClear.GameLogic(this);
            this.downLogic = new happyClear.DownLogic(this);
            this.addChild(this.gameLogic);
            this.addWatch();
        };
        //添加监听
        GameStartView.prototype.addWatch = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        //游戏界面初始化入口
        GameStartView.prototype.onStart = function (valueVec) {
            this.colorVec = valueVec;
            this.blockMap = [];
            this.lockMap = [];
            var lockVec_1 = happyClear.deepCopy(happyClear.LOCK_CONF[main_round]);
            this.lockVec = lockVec_1;
            this.saveLockVec.push(lockVec_1);
            for (var i = 0; i < 10; i++) {
                this.blockMap[i] = [];
                this.lockMap[i] = [];
                for (var j = 0; j < 12; j++) {
                    if (happyClear.Block_Conf[main_round][i][j] > 0) {
                        var animal = new happyClear.BlockView(j, i, 1);
                        this.blockMap[i].push(animal);
                        this.lockMap[i].push(null);
                        this.animalContainer.addChild(animal);
                        animal.Value = valueVec[i][j];
                    }
                    else if (happyClear.Block_Conf[main_round][i][j] == 0) {
                        var animal = new happyClear.BlockView(j, i, 1);
                        this.animalContainer.addChild(animal);
                        animal.Value = valueVec[i][j];
                        this.blockMap[i].push(animal);
                        this.lockMap[i].push(null);
                    }
                    else {
                        this.blockMap[i].push(null);
                        this.lockMap[i].push(null);
                    }
                }
            }
            //保存数据
            this.saveColorVec.push(happyClear.deepCopy(this.colorVec));
            this.uiView.score.text = '' + this.gameScore;
            this.uiView.roundInfo.text = '' + main_round;
            //过关信息
            if (happyClear.OVER_CONF[main_round] == 0) {
                this.clearColor = 0;
                this.stepCount = happyClear.STEP_SCORE[main_round][0];
                this.uiView.target_score.visible = true;
                this.uiView.colorCount.text = "" + happyClear.STEP_SCORE[main_round][1];
            }
            else if (happyClear.OVER_CONF[main_round] == 1) {
                this.clearColor = Math.ceil(Math.random() * 6);
                this.animalInfo = new happyClear.BlockView(500, 160, 3);
                this.animalContainer.addChild(this.animalInfo);
                this.animalInfo.Value = this.clearColor;
                //步数
                this.stepCount = happyClear.STEP_SCORE[main_round][0];
                //要消多少个
                this.clearCount = happyClear.COLOR_NUM[main_round];
                this.uiView.target_score.visible = false;
                this.uiView.colorCount.text = "剩" + this.clearCount;
            }
            else {
                //不用知道颜色
                this.clearColor = 0;
                //步数
                this.stepCount = happyClear.STEP_SCORE[main_round][0];
                this.uiView.target_score.visible = false;
                this.animalInfo = new happyClear.BlockView(500, 160, 3);
                this.animalContainer.addChild(this.animalInfo);
                this.animalInfo.lockImg.visible = true;
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 12; j++) {
                        if (happyClear.LOCK_CONF[main_round][i][j] == 1) {
                            //显示冰块
                            var animal = new happyClear.BlockView(j, i, 1);
                            animal.touchEnabled = false;
                            animal.touchChildren = false;
                            this.lockContainer.addChild(animal);
                            this.lockMap[i][j] = animal;
                            animal.lockImg.visible = true;
                            animal.alpha = 0.9;
                            //记录冰块的数目
                            this.clearCount++;
                        }
                        else {
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
        };
        GameStartView.prototype.onTouchBegin = function (evt) {
            this._selectBlock = [null, null];
            if (happyClear.bBlock(evt.target)) {
                //不能是障碍
                if (evt.target.Value) {
                    this._selectBlock[0] = evt.target;
                }
            }
        };
        GameStartView.prototype.onTouchEnd = function (evt) {
            var _this = this;
            if (this.touchStatus == 1) {
                if (happyClear.bBlock(evt.target) && this._selectBlock[0] != null) {
                    if (evt.target.Value) {
                        var block_1 = happyClear.bBlock(evt.target);
                        if (block_1.row == this._selectBlock[0].row || block_1.column == this._selectBlock[0].column) {
                            if (Math.abs(block_1.row - this._selectBlock[0].row) == 1 || Math.abs(block_1.column - this._selectBlock[0].column) == 1) {
                                this._selectBlock[1] = block_1;
                                if (block_1.column == this._selectBlock[0].column) {
                                    //列相同
                                    var row_1_1 = this._selectBlock[0].row;
                                    var row_2_1 = block_1.row;
                                    egret.Tween.get(this._selectBlock[0]).to({ y: 825 - row_2_1 * 50 }, 100);
                                    egret.Tween.get(this._selectBlock[1]).to({ y: 825 - row_1_1 * 50 }, 100);
                                    this._selectBlock[0].row = row_2_1;
                                    this._selectBlock[1].row = row_1_1;
                                    //改变row的值都要改变order 后面排序用到
                                    this._selectBlock[0].order = this._selectBlock[0].column * 10 + this._selectBlock[0].row;
                                    this._selectBlock[1].order = this._selectBlock[1].column * 10 + this._selectBlock[1].row;
                                    this.colorVec[block_1.column][row_1_1] = this._selectBlock[1].Value;
                                    this.colorVec[block_1.column][row_2_1] = this._selectBlock[0].Value;
                                    var flag_1 = this.gameLogic.canClear(row_1_1, block_1.column);
                                    //row2是第二个
                                    var flag_2 = this.gameLogic.canClear(row_2_1, block_1.column);
                                    if (flag_1 == 0 && flag_2 == 0) {
                                        //不能消除，还原为之前的位置
                                        //setTimeout 也能实现  非循环可以不用set timeout
                                        setTimeout(function () {
                                            _this._selectBlock[0].row = row_1_1;
                                            _this._selectBlock[1].row = row_2_1;
                                            _this._selectBlock[0].order = _this._selectBlock[0].column * 10 + _this._selectBlock[0].row;
                                            _this._selectBlock[1].order = _this._selectBlock[1].column * 10 + _this._selectBlock[1].row;
                                            _this.colorVec[block_1.column][row_1_1] = _this._selectBlock[0].Value;
                                            _this.colorVec[block_1.column][row_2_1] = _this._selectBlock[1].Value;
                                            egret.Tween.get(_this._selectBlock[0]).to({ y: 825 - row_1_1 * 50 }, 100);
                                            egret.Tween.get(_this._selectBlock[1]).to({ y: 825 - row_2_1 * 50 }, 100);
                                        }, 100);
                                    }
                                    else {
                                        //列相同
                                        this.blockMap[block_1.column][row_1_1] = this._selectBlock[1];
                                        this.blockMap[block_1.column][row_2_1] = this._selectBlock[0];
                                        //获取可以消除的方块对象
                                        var clearList = this.gameLogic.getClearList(flag_1, row_1_1, block_1.column);
                                        var clearList_1 = this.gameLogic.getClearList(flag_2, row_2_1, block_1.column);
                                        var clearList_3 = [];
                                        //道具
                                        if (this._selectBlock[0].lineClearIce.visible == true && flag_2) {
                                            for (var k = 0; k < 12; k++) {
                                                if (this.colorVec[block_1.column][k]) {
                                                    clearList_3.push(this.blockMap[block_1.column][k]);
                                                }
                                            }
                                        }
                                        if (this._selectBlock[1].lineClearIce.visible == true && flag_1) {
                                            for (var k = 0; k < 12; k++) {
                                                if (this.colorVec[block_1.column][k]) {
                                                    clearList_3.push(this.blockMap[block_1.column][k]);
                                                }
                                            }
                                        }
                                        var clearList_final = [];
                                        var clearList_4 = clearList.concat(clearList_1).concat(clearList_3);
                                        //去重
                                        for (var k = 0; k < clearList_4.length; k++) {
                                            if (clearList_final.indexOf(clearList_4[k]) == -1 && (clearList_4[k] instanceof happyClear.BlockView)) {
                                                clearList_final.push(clearList_4[k]);
                                            }
                                        }
                                        if (happyClear.DOWN_ROUND[main_round] == 0) {
                                            clearList_final.sort(function (a, b) {
                                                return a.order - b.order;
                                            });
                                        }
                                        if (clearList_final.length) {
                                            this.stepCount--;
                                            for (var i = clearList_final.length - 1; i >= 0; i--) {
                                                this.clearLength++;
                                                this.clearAnimation(clearList_final[i], i);
                                            }
                                        }
                                    }
                                }
                                else {
                                    //行相同的情况
                                    var col_1_1 = this._selectBlock[0].column;
                                    var col_2_1 = block_1.column;
                                    egret.Tween.get(this._selectBlock[0]).to({ x: col_2_1 * 50 + 145 }, 100);
                                    egret.Tween.get(this._selectBlock[1]).to({ x: col_1_1 * 50 + 145 }, 100);
                                    this._selectBlock[0].column = col_2_1;
                                    this._selectBlock[1].column = col_1_1;
                                    //每改变col,row的值都要改变order
                                    this._selectBlock[0].order = this._selectBlock[0].column * 10 + this._selectBlock[0].row;
                                    this._selectBlock[1].order = this._selectBlock[1].column * 10 + this._selectBlock[1].row;
                                    this.colorVec[col_1_1][block_1.row] = this._selectBlock[1].Value;
                                    this.colorVec[col_2_1][block_1.row] = this._selectBlock[0].Value;
                                    var flag_1 = this.gameLogic.canClear(block_1.row, col_1_1);
                                    //col_2是第二个
                                    var flag_2 = this.gameLogic.canClear(block_1.row, col_2_1);
                                    //方块对象层面处理
                                    if (flag_1 == 0 && flag_2 == 0) {
                                        setTimeout(function () {
                                            _this._selectBlock[0].column = col_1_1;
                                            _this._selectBlock[1].column = col_2_1;
                                            _this._selectBlock[0].order = _this._selectBlock[0].column * 10 + _this._selectBlock[0].row;
                                            _this._selectBlock[1].order = _this._selectBlock[1].column * 10 + _this._selectBlock[1].row;
                                            _this.colorVec[col_1_1][block_1.row] = _this._selectBlock[0].Value;
                                            _this.colorVec[col_2_1][block_1.row] = _this._selectBlock[1].Value;
                                            egret.Tween.get(_this._selectBlock[0]).to({ x: col_1_1 * 50 + 145 }, 100);
                                            egret.Tween.get(_this._selectBlock[1]).to({ x: col_2_1 * 50 + 145 }, 100);
                                        }, 101);
                                    }
                                    else {
                                        this.blockMap[col_1_1][block_1.row] = this._selectBlock[1];
                                        this.blockMap[col_2_1][block_1.row] = this._selectBlock[0];
                                        var clearList = this.gameLogic.getClearList(flag_1, block_1.row, col_1_1);
                                        var clearList_1 = this.gameLogic.getClearList(flag_2, block_1.row, col_2_1);
                                        var clearList_2 = [];
                                        //道具行消除
                                        if (this._selectBlock[0].lineClearIce.visible == true && flag_2) {
                                            for (var k = 0; k < 10; k++) {
                                                if (this.colorVec[k][block_1.row]) {
                                                    clearList_2.push(this.blockMap[k][block_1.row]);
                                                }
                                            }
                                        }
                                        if (this._selectBlock[1].lineClearIce.visible == true && flag_1) {
                                            for (var k = 0; k < 10; k++) {
                                                if (this.colorVec[k][block_1.row]) {
                                                    clearList_2.push(this.blockMap[k][block_1.row]);
                                                }
                                            }
                                        }
                                        //得到最后要消除的方块列表
                                        var clearList_final = [];
                                        var clearList_4 = clearList.concat(clearList_1).concat(clearList_2);
                                        //去重
                                        for (var k = 0; k < clearList_4.length; k++) {
                                            if (clearList_final.indexOf(clearList_4[k]) == -1 && (clearList_4[k] instanceof happyClear.BlockView)) {
                                                clearList_final.push(clearList_4[k]);
                                            }
                                        }
                                        //拼接两个数组，避免最后一个执行两次导致bug!!
                                        if (happyClear.DOWN_ROUND[main_round] == 0) {
                                            clearList_final.sort(function (a, b) {
                                                return a.order - b.order;
                                            });
                                        }
                                        if (clearList_final.length) {
                                            this.stepCount--;
                                            //一个一个消除
                                            for (var i = clearList_final.length - 1; i >= 0; i--) {
                                                this.clearLength++;
                                                this.clearAnimation(clearList_final[i], i);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    this._selectBlock = [null, null];
                }
            }
            else if (this.touchStatus == 0) {
                if (happyClear.bBlock(evt.target)) {
                    var block = evt.target;
                    this.alpha = 1;
                    this.uiView.tip_text.text = "";
                    var animal = evt.target;
                    // animal.alpha = 0.8;
                    var clearList_2 = [];
                    //道具行消除 道具重合的时候
                    if (animal.lineClearIce.visible == true) {
                        this.clearLength = 0;
                        for (var k = 0; k < 10; k++) {
                            if (this.colorVec[k][block.row]) {
                                this.clearLength++;
                                clearList_2.push(this.blockMap[k][block.row]);
                            }
                        }
                        for (var i = clearList_2.length - 1; i >= 0; i--) {
                            this.clearAnimation(clearList_2[i], i);
                        }
                    }
                    else {
                        this.clearLength = 1;
                        this.clearAnimation(animal, 0);
                    }
                    this.touchStatus = 1;
                }
            }
            else {
                if (happyClear.bBlock(evt.target)) {
                    this.alpha = 1;
                    this.uiView.tip_text.text = "";
                    var animal = evt.target;
                    // animal.alpha = 0.8;
                    animal.lineClearIce.visible = true;
                    this.touchStatus = 1;
                }
            }
        };
        //清除一个
        GameStartView.prototype.clearAnimation = function (animal, loop) {
            var _this = this;
            console.log(this.clearLength);
            if (animal instanceof happyClear.BlockView) {
                var line_1 = animal.row;
                var col_3 = animal.column;
                console.log("clearAnimation");
                //下落方式变
                if (happyClear.DOWN_ROUND[main_round] == 0) {
                    this.blockMap[col_3].splice(line_1, 1);
                    this.colorVec[col_3].splice(line_1, 1);
                }
                else {
                    this.blockMap[col_3][line_1] = null;
                    //-1代表空
                    this.colorVec[col_3][line_1] = -1;
                }
                this.touchEnabled = false;
                this.touchChildren = false;
                egret.Tween.get(animal).to({ scaleX: 0, scaleY: 0 }, 800).call(function () {
                    if (happyClear.OVER_CONF[main_round] == 1) {
                        if (animal.Value == _this.clearColor) {
                            _this.clearCount--;
                        }
                        if (_this.clearCount < 0) {
                            _this.clearCount = 0;
                        }
                    }
                    else if (happyClear.OVER_CONF[main_round] == 2) {
                        //消除冰块
                        if (_this.lockVec[col_3][line_1]) {
                            _this.clearCount--;
                            //0代表没有冰块
                            _this.lockVec[col_3][line_1] = 0;
                            // this.lockContainer.removeChild(this.lockMap[col][line]);
                            _this.lockMap[col_3][line_1].visible = false;
                        }
                        if (_this.clearCount < 0) {
                            _this.clearCount = 0;
                        }
                    }
                    _this.animalContainer.removeChild(animal);
                    _this.gameScore++;
                    _this.uiView.score.text = '' + _this.gameScore;
                    _this.uiView.stepCount.text = "" + _this.stepCount;
                    if (happyClear.OVER_CONF[main_round] == 1 || happyClear.OVER_CONF[main_round] == 2) {
                        _this.uiView.colorCount.text = "剩" + _this.clearCount;
                    }
                    //最后一个消除后下落
                    if (loop == 0) {
                        console.log("loop");
                        var self_1 = _this;
                        if (happyClear.DOWN_ROUND[main_round] == 3) {
                            setTimeout(function () {
                                self_1.downLogic.downSkew();
                            }, 150);
                        }
                        else {
                            setTimeout(function () {
                                self_1.downLogic.downAnimal();
                            }, 150);
                        }
                    }
                });
            }
        };
        GameStartView.prototype.createAnimal = function () {
            //第一关生成方式
            this.touchEnabled = false;
            this.touchChildren = true;
            if (happyClear.DOWN_ROUND[main_round] == 0) {
                for (var i = 0; i < 10; i++) {
                    var distance = 12 - this.colorVec[i].length;
                    if (distance != 0) {
                        var _loop_1 = function (k) {
                            var j = this_1.colorVec[i].length;
                            if (happyClear.Block_Conf[main_round][i][j] == 1) {
                                //生成方块
                                var animal_1 = new happyClear.BlockView(j, i, 0);
                                var down_num_1 = 11 + k;
                                this_1.animalContainer.addChild(animal_1);
                                this_1.clearLength--;
                                var setTime_1 = setInterval(function () {
                                    if (down_num_1 >= j) {
                                        if (down_num_1 <= 11) {
                                            animal_1.visible = true;
                                        }
                                        animal_1.y = 825 - 50 * down_num_1;
                                        down_num_1--;
                                    }
                                    else {
                                        clearInterval(setTime_1);
                                    }
                                }, 200);
                                var colorNum = Math.ceil(Math.random() * 6);
                                this_1.colorVec[i][j] = colorNum;
                                animal_1.Value = colorNum;
                                this_1.blockMap[i].push(animal_1);
                            }
                        };
                        var this_1 = this;
                        for (var k = 0; k < distance; k++) {
                            _loop_1(k);
                        }
                    }
                }
            }
            else if (happyClear.DOWN_ROUND[main_round] == 1) {
                for (var i = 0; i < 10; i++) {
                    var clearNum = 0;
                    for (var j = 0; j < 12; j++) {
                        if (this.colorVec[i][j] == -1) {
                            //生成的方块的个数
                            clearNum++;
                        }
                    }
                    var _loop_2 = function (j) {
                        if (this_2.colorVec[i][j] == -1) {
                            if (clearNum > 0) {
                                clearNum--;
                                var animal_2 = new happyClear.BlockView(j, i, 0);
                                var down_num_2 = 11 + clearNum;
                                this_2.animalContainer.addChild(animal_2);
                                this_2.clearLength--;
                                this_2.colorVec[i][j] = Math.ceil(Math.random() * 6);
                                this_2.blockMap[i][j] = animal_2;
                                animal_2.Value = this_2.colorVec[i][j];
                                var setTime_2 = setInterval(function () {
                                    if (down_num_2 >= j) {
                                        if (down_num_2 <= 11) {
                                            animal_2.visible = true;
                                        }
                                        animal_2.y = 825 - 50 * down_num_2;
                                        down_num_2--;
                                    }
                                    else {
                                        clearInterval(setTime_2);
                                    }
                                }, 200);
                            }
                        }
                    };
                    var this_2 = this;
                    for (var j = 11; j > 0; j--) {
                        _loop_2(j);
                    }
                }
            }
            else if (happyClear.DOWN_ROUND[main_round] == 2) {
                //斜对角下落
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 12; j++) {
                        if (this.colorVec[i][j] == -1) {
                            var animal = new happyClear.BlockView(j, i, 1);
                            this.animalContainer.addChild(animal);
                            this.clearLength--;
                            animal.scaleX = 0;
                            animal.scaleY = 0;
                            var colorNum = Math.ceil(Math.random() * 6);
                            this.colorVec[i][j] = colorNum;
                            animal.Value = colorNum;
                            this.blockMap[i][j] = animal;
                            egret.Tween.get(animal).to({ scaleX: 1, scaleY: 1 }, 200);
                        }
                    }
                }
            }
            // console.log(this.colorVec);
        };
        //入口生成函数
        GameStartView.prototype.createAnimalEntry = function () {
            console.log("2->方块生成");
            // this.time--;
            var from = happyClear.DOWN_CONF[main_round].beginIndex;
            var end = happyClear.DOWN_CONF[main_round].endIndex;
            var count = 0;
            for (var i = from; i <= end; i++) {
                if (this.colorVec[i][11] == -1) {
                    count++;
                    console.log("new");
                    var animal = new happyClear.BlockView(11, i, 1);
                    this.animalContainer.addChild(animal);
                    this.blockMap[i][11] = animal;
                    var colorNum = Math.ceil(Math.random() * 6);
                    this.colorVec[i][11] = colorNum;
                    this.blockMap[i][11].Value = colorNum;
                    this.clearLength--;
                }
            }
            if (this.clearLength) {
                console.log("this.clearLength", this.clearLength);
                var self_2 = this;
                self_2.downLogic.createAnimalPlus();
            }
            else {
                var self_3 = this;
                setTimeout(function () {
                    var clearAnimalList_1;
                    clearAnimalList_1 = self_3.gameLogic.globalClear();
                    self_3.clearLength = clearAnimalList_1.length;
                    if (clearAnimalList_1.length) {
                        self_3.gameLogic.clearAll(clearAnimalList_1);
                    }
                    else {
                        //保存数据
                        //检测是否达到通关要求
                        var colorArr = happyClear.deepCopy(self_3.colorVec);
                        //保存数据  还要保存步数，分数，消除的方块个数
                        self_3.saveColorVec.push(colorArr);
                        var lockVec_2 = happyClear.deepCopy(self_3.lockVec);
                        self_3.saveLockVec.push(lockVec_2);
                        //保存分数,步数，消除个数
                        self_3.saveGameScore.push(self_3.gameScore);
                        self_3.saveStepCount.push(self_3.stepCount);
                        self_3.saveClearCount.push(self_3.clearCount);
                        self_3.gameLogic.DeafCheck(colorArr);
                        self_3.touchEnabled = true;
                        self_3.touchChildren = true;
                        self_3.gameLogic.bOver();
                    }
                }, 120);
            }
        };
        //撤回操作，保存每一次操作的数据
        GameStartView.prototype.turnBack = function () {
            if (this.saveColorVec.length > 1 && this.backCount < 5) {
                this.backCount++;
                var len = this.saveColorVec.length;
                var len_1 = this.saveLockVec.length;
                var colorArr = this.saveColorVec[len - 2];
                var lockVec_1 = this.saveLockVec[len_1 - 2];
                this.gameScore = this.saveGameScore[this.saveGameScore.length - 2];
                this.clearCount = this.saveClearCount[this.saveGameScore.length - 2];
                this.stepCount = this.saveStepCount[this.saveStepCount.length - 2];
                this.saveLockVec.splice(len_1 - 2, 1);
                this.saveColorVec.splice(len - 2, 1);
                this.saveGameScore.splice(this.saveGameScore.length - 2, 1);
                // this.saveStepCount.splice(this.saveStepCount.length - 2, 1)
                if (happyClear.OVER_CONF[main_round] > 0) {
                    this.saveClearCount.splice(this.saveClearCount.length - 2, 1);
                }
                this.saveStepCount.splice(this.saveStepCount.length - 2, 1);
                if (happyClear.OVER_CONF[main_round] > 0) {
                    this.uiView.colorCount.text = "剩" + this.clearCount;
                }
                this.uiView.score.text = '' + this.gameScore;
                this.uiView.stepCount.text = "" + this.stepCount;
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 12; j++) {
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
            }
            else {
                //提示
                alert("不能后退了");
            }
        };
        return GameStartView;
    }(egret.DisplayObjectContainer));
    happyClear.GameStartView = GameStartView;
    __reflect(GameStartView.prototype, "happyClear.GameStartView", ["happyClear.IGameStartView"]);
})(happyClear || (happyClear = {}));
//# sourceMappingURL=GameStartView.js.map