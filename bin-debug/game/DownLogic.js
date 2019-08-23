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
    //方块下落逻辑
    var DownLogic = (function (_super) {
        __extends(DownLogic, _super);
        function DownLogic(game) {
            var _this = _super.call(this) || this;
            _this._gameView = game;
            return _this;
        }
        //有三种下落方式
        DownLogic.prototype.downAnimal = function () {
            this.touchEnabled = false;
            this.touchChildren = true;
            var maxLength = 0;
            //删除数组
            if (happyClear.DOWN_ROUND[main_round] == 0) {
                for (var i = 0; i < 10; i++) {
                    var length_1 = this._gameView.colorVec[i].length;
                    for (var j = 0; j < length_1; j++) {
                        var index = this._gameView.blockMap[i].indexOf(this._gameView.blockMap[i][j]);
                        if (index != this._gameView.blockMap[i][j].row) {
                            var distance = this._gameView.blockMap[i][j].row - index;
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
            else if (happyClear.DOWN_ROUND[main_round] == 1) {
                //实心方块上方的会掉下来
                for (var i1 = 0; i1 < 10; i1++) {
                    for (var j1 = 1; j1 < 12; j1++) {
                        if (this._gameView.colorVec[i1][j1] > 0 && (this._gameView.colorVec[i1][j1 - 1] == -1 || this._gameView.colorVec[i1][j1 - 1] == 0)) {
                            var countLength = 0;
                            for (var k = j1 - 1; k >= 0; k--) {
                                if (this._gameView.colorVec[i1][k] == -1) {
                                    countLength++;
                                }
                                else if (this._gameView.colorVec[i1][k] == 0 && this._gameView.colorVec[i1][k - 1] == -1) {
                                    k--;
                                    countLength += 2;
                                }
                                else {
                                    break;
                                }
                            }
                            if (countLength) {
                                this._gameView.blockMap[i1][j1].row = j1 - countLength;
                                this._gameView.blockMap[i1][j1].y = 825 - 50 * (j1 - countLength);
                                this._gameView.colorVec[i1][j1 - countLength] = this._gameView.colorVec[i1][j1];
                                this._gameView.blockMap[i1][j1 - countLength] = this._gameView.blockMap[i1][j1];
                                this._gameView.colorVec[i1][j1] = -1;
                                this._gameView.blockMap[i1][j1] = null;
                            }
                            if (maxLength < countLength) {
                                maxLength = countLength;
                            }
                        }
                    }
                }
            }
            else if (happyClear.DOWN_ROUND[main_round] == 2) {
                //检测一个方块下一个是否为空方块  实心方块不会下落且上方的不会掉下来   //垂直下落
                for (var i = 0; i < 10; i++) {
                    for (var j = 1; j < 12; j++) {
                        if (this._gameView.colorVec[i][j] > 0 && this._gameView.colorVec[i][j - 1] == -1) {
                            var countLength = 0;
                            for (var k = j - 1; k >= 0; k--) {
                                if (this._gameView.colorVec[i][k] == -1) {
                                    countLength++;
                                }
                                else {
                                    break;
                                }
                            }
                            this._gameView.blockMap[i][j].row = j - countLength;
                            this._gameView.blockMap[i][j].y = 825 - 50 * (j - countLength);
                            this._gameView.colorVec[i][j - countLength] = this._gameView.colorVec[i][j];
                            this._gameView.blockMap[i][j - countLength] = this._gameView.blockMap[i][j];
                            this._gameView.colorVec[i][j] = -1;
                            this._gameView.blockMap[i][j] = null;
                        }
                    }
                }
            }
            var time;
            time = (maxLength + 1) * 250;
            console.log('2');
            if (main_round == 1) {
                time = (maxLength + 1) * 250;
            }
            var self = this;
            setTimeout(function () {
                self._gameView.createAnimal();
            }, 20);
            setTimeout(function () {
                var clearAnimalList_1;
                clearAnimalList_1 = self._gameView.gameLogic.globalClear();
                self._gameView.clearLength = clearAnimalList_1.length;
                if (clearAnimalList_1.length) {
                    self._gameView.gameLogic.clearAll(clearAnimalList_1);
                }
                else {
                    //拷贝二维数组
                    var colorArr = happyClear.deepCopy(self._gameView.colorVec);
                    //保存数据，方块跟冰块的数据源
                    self._gameView.saveColorVec.push(colorArr);
                    var lockVec_2 = happyClear.deepCopy(self._gameView.lockVec);
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
        };
        //斜下落专属全局下落
        DownLogic.prototype.downSkew = function () {
            //检测一个方块下一个是否为空方块  实心方块不会下落且上方的不会掉下来   //垂直下落    斜对角
            console.log("4");
            //let clearLength: number = 0;
            for (var i = 0; i < 10; i++) {
                for (var j = 1; j < 12; j++) {
                    if (this._gameView.colorVec[i][j] > 0 && this._gameView.colorVec[i][j - 1] == -1) {
                        var countLength = 0;
                        for (var k = j - 1; k >= 0; k--) {
                            if (this._gameView.colorVec[i][k] == -1) {
                                countLength++;
                            }
                            else {
                                break;
                            }
                        }
                        this._gameView.blockMap[i][j].row = j - countLength;
                        this._gameView.blockMap[i][j].downStatus = 0;
                        this._gameView.blockMap[i][j].y = 825 - 50 * (j - countLength);
                        this._gameView.colorVec[i][j - countLength] = this._gameView.colorVec[i][j];
                        this._gameView.blockMap[i][j - countLength] = this._gameView.blockMap[i][j];
                        this._gameView.colorVec[i][j] = -1;
                        this._gameView.blockMap[i][j] = null;
                    }
                }
            }
            this.createAnimalPlus();
        };
        //斜对角下落专属生成方块函数
        DownLogic.prototype.createAnimalPlus = function () {
            var _this = this;
            this._gameView.touchEnabled = false;
            this._gameView.touchChildren = false;
            var num = 0;
            //let createFlag: boolean = false;
            if (this._gameView.clearLength) {
                console.log("1->方块斜滑");
                var _loop_1 = function (i) {
                    var _loop_2 = function (j) {
                        //如果有方块
                        if (this_1._gameView.colorVec[i][j] > 0 && this_1._gameView.blockMap[i][j]) {
                            //下方是否有方块
                            if (this_1._gameView.colorVec[i][j - 1] == -1) {
                                this_1._gameView.colorVec[i][j - 1] = this_1._gameView.colorVec[i][j];
                                this_1._gameView.blockMap[i][j].row = j - 1;
                                this_1._gameView.blockMap[i][j].column = i;
                                //加动画
                                egret.Tween.get(this_1._gameView.blockMap[i][j]).to({
                                    x: 145 + 50 * this_1._gameView.blockMap[i][j].column,
                                    y: 825 - 50 * this_1._gameView.blockMap[i][j].row
                                }, 80).call(function () {
                                    console.log("原" + j + "行" + i + "列" + "方块");
                                    _this._gameView.blockMap[i][j - 1] = _this._gameView.blockMap[i][j];
                                    _this._gameView.blockMap[i][j] = null;
                                    _this._gameView.colorVec[i][j] = -1;
                                    console.log("数组赋值成功 下滑");
                                });
                                num++;
                            }
                            else {
                                //判断是否是下落的方块，如果是，就判断左边或者右边是否有  1为左滑，2为右滑
                                if (this_1._gameView.blockMap[i][j].downStatus) {
                                    if (i > 0 && i < 9) {
                                        if (this_1._gameView.blockMap[i][j].downStatus == 1 && this_1._gameView.colorVec[i - 1][j] == -1) {
                                            this_1._gameView.colorVec[i - 1][j] = this_1._gameView.colorVec[i][j];
                                            this_1._gameView.blockMap[i][j].column = i - 1;
                                            egret.Tween.get(this_1._gameView.blockMap[i][j]).to({ x: 145 + 50 * (i - 1) }, 80).call(function () {
                                                console.log("原" + j + "行" + i + "列" + "方块");
                                                console.log(_this._gameView.blockMap[i][j]);
                                                _this._gameView.blockMap[i - 1][j] = _this._gameView.blockMap[i][j];
                                                _this._gameView.blockMap[i][j] = null;
                                                _this._gameView.colorVec[i][j] = -1;
                                                console.log("数组赋值成功 左滑");
                                            });
                                            num++;
                                        }
                                        else if (this_1._gameView.blockMap[i][j].downStatus == 2 && this_1._gameView.colorVec[i + 1][j] == -1) {
                                            this_1._gameView.colorVec[i + 1][j] = this_1._gameView.colorVec[i][j];
                                            this_1._gameView.blockMap[i][j].column = i + 1;
                                            egret.Tween.get(this_1._gameView.blockMap[i][j]).to({ x: 145 + 50 * (i + 1) }, 80).call(function () {
                                                console.log("原" + j + "行" + i + "列" + "方块");
                                                console.log(_this._gameView.blockMap[i][j]);
                                                _this._gameView.blockMap[i + 1][j] = _this._gameView.blockMap[i][j];
                                                _this._gameView.blockMap[i][j] = null;
                                                _this._gameView.colorVec[i][j] = -1;
                                                console.log("数组赋值成功 右滑");
                                            });
                                            num++;
                                        }
                                        else {
                                            this_1._gameView.blockMap[i][j].downStatus = 0;
                                            //this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
                                        }
                                    }
                                }
                                else {
                                    //是否满足左滑条件
                                    if (i > 0 && i < 9) {
                                        //正下方有方块，检测左边下滑 正上方是否是障碍
                                        if ((this_1._gameView.colorVec[i - 1][j] == 0 || this_1._gameView.colorVec[i - 1][j] == null) && this_1._gameView.colorVec[i - 1][j - 1] == -1) {
                                            this_1._gameView.colorVec[i - 1][j - 1] = this_1._gameView.colorVec[i][j];
                                            this_1._gameView.blockMap[i][j].row = j - 1;
                                            this_1._gameView.blockMap[i][j].column = i - 1;
                                            //给侧滑的方块一个属性
                                            egret.Tween.get(this_1._gameView.blockMap[i][j]).to({
                                                x: 145 + 50 * this_1._gameView.blockMap[i][j].column,
                                                y: 825 - 50 * this_1._gameView.blockMap[i][j].row
                                            }, 80).call(function () {
                                                console.log("原" + j + "行" + i + "列" + "方块");
                                                _this._gameView.blockMap[i][j].downStatus = 1;
                                                _this._gameView.blockMap[i - 1][j - 1] = _this._gameView.blockMap[i][j];
                                                //this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
                                                _this._gameView.blockMap[i][j] = null;
                                                _this._gameView.colorVec[i][j] = -1;
                                                console.log("数组赋值成功，+ 状态左滑");
                                            });
                                            num++;
                                        }
                                        else if ((this_1._gameView.colorVec[i + 1][j] == 0 || this_1._gameView.colorVec[i + 1][j] == null) && this_1._gameView.colorVec[i + 1][j - 1] == -1) {
                                            this_1._gameView.colorVec[i + 1][j - 1] = this_1._gameView.colorVec[i][j];
                                            this_1._gameView.blockMap[i][j].row = j - 1;
                                            this_1._gameView.blockMap[i][j].column = i + 1;
                                            //加动画
                                            egret.Tween.get(this_1._gameView.blockMap[i][j]).to({
                                                x: 145 + 50 * this_1._gameView.blockMap[i][j].column,
                                                y: 825 - 50 * this_1._gameView.blockMap[i][j].row
                                            }, 80).call(function () {
                                                console.log("原" + j + "行" + i + "列" + "方块");
                                                _this._gameView.blockMap[i][j].downStatus = 2;
                                                _this._gameView.blockMap[i + 1][j - 1] = _this._gameView.blockMap[i][j];
                                                //this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
                                                _this._gameView.blockMap[i][j] = null;
                                                _this._gameView.colorVec[i][j] = -1;
                                                console.log("数组赋值成功+状态右滑");
                                            });
                                            //不加动画
                                            num++;
                                        }
                                    }
                                    else {
                                        if (i == 0) {
                                            if ((this_1._gameView.colorVec[i + 1][j] == 0 || this_1._gameView.colorVec[i + 1][j] == null) && this_1._gameView.colorVec[i + 1][j - 1] == -1) {
                                                this_1._gameView.colorVec[i + 1][j - 1] = this_1._gameView.colorVec[i][j];
                                                this_1._gameView.blockMap[i][j].row = j - 1;
                                                this_1._gameView.blockMap[i][j].column = i + 1;
                                                //加动画
                                                egret.Tween.get(this_1._gameView.blockMap[i][j]).to({
                                                    x: 145 + 50 * this_1._gameView.blockMap[i][j].column,
                                                    y: 825 - 50 * this_1._gameView.blockMap[i][j].row
                                                }, 80).call(function () {
                                                    console.log("原" + j + "行" + i + "列" + "方块");
                                                    _this._gameView.blockMap[i][j].downStatus = 2;
                                                    _this._gameView.blockMap[i + 1][j - 1] = _this._gameView.blockMap[i][j];
                                                    //this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
                                                    _this._gameView.blockMap[i][j] = null;
                                                    _this._gameView.colorVec[i][j] = -1;
                                                    console.log("数组赋值成功");
                                                });
                                                num++;
                                            }
                                        }
                                        else {
                                            //i=9时左边侧滑  入口生成特殊情况
                                            if ((this_1._gameView.colorVec[i - 1][j] == 0 || this_1._gameView.colorVec[i - 1][j] == null) && this_1._gameView.colorVec[i - 1][j - 1] == -1) {
                                                this_1._gameView.colorVec[i - 1][j - 1] = this_1._gameView.colorVec[i][j];
                                                this_1._gameView.blockMap[i][j].row = j - 1;
                                                this_1._gameView.blockMap[i][j].column = i - 1;
                                                //给侧滑的方块一个属性
                                                egret.Tween.get(this_1._gameView.blockMap[i][j]).to({
                                                    x: 145 + 50 * this_1._gameView.blockMap[i][j].column,
                                                    y: 825 - 50 * this_1._gameView.blockMap[i][j].row
                                                }, 80).call(function () {
                                                    console.log("原" + j + "行" + i + "列" + "方块");
                                                    _this._gameView.blockMap[i][j].downStatus = 1;
                                                    _this._gameView.blockMap[i - 1][j - 1] = _this._gameView.blockMap[i][j];
                                                    //this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
                                                    _this._gameView.blockMap[i][j] = null;
                                                    _this._gameView.colorVec[i][j] = -1;
                                                    console.log("数组赋值成功,方块左滑");
                                                });
                                                num++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };
                    for (var j = 1; j < 12; j++) {
                        _loop_2(j);
                    }
                };
                var this_1 = this;
                for (var i = 0; i < 10; i++) {
                    _loop_1(i);
                }
            }
            //特殊情况判定
            if (this._gameView.clearLength && num == 0) {
                var _loop_3 = function (i) {
                    var _loop_4 = function (j) {
                        if (this_2._gameView.colorVec[i][j] && this_2._gameView.blockMap[i][j]) {
                            //左下侧滑
                            if ((this_2._gameView.colorVec[i][j + 1] == 0 || this_2._gameView.colorVec[i][j + 1] == null) && (this_2._gameView.colorVec[i - 1][j + 1] == 0 || this_2._gameView.colorVec[i - 1][j + 1] == null)) {
                                if (this_2._gameView.colorVec[i - 1][j - 1] == -1) {
                                    this_2._gameView.colorVec[i - 1][j - 1] = this_2._gameView.colorVec[i][j];
                                    this_2._gameView.blockMap[i][j].row = j - 1;
                                    this_2._gameView.blockMap[i][j].column = i - 1;
                                    egret.Tween.get(this_2._gameView.blockMap[i][j]).to({
                                        x: 145 + 50 * this_2._gameView.blockMap[i][j].column,
                                        y: 825 - 50 * this_2._gameView.blockMap[i][j].row
                                    }, 80).call(function () {
                                        console.log("原" + j + "行" + i + "列" + "方块");
                                        _this._gameView.blockMap[i][j].downStatus = 1;
                                        _this._gameView.blockMap[i - 1][j - 1] = _this._gameView.blockMap[i][j];
                                        //this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
                                        _this._gameView.blockMap[i][j] = null;
                                        _this._gameView.colorVec[i][j] = -1;
                                        console.log("数组赋值成功，左下滑");
                                    });
                                    num++;
                                }
                                else if (this_2._gameView.colorVec[i - 1][j] == -1) {
                                    this_2._gameView.colorVec[i - 1][j] = this_2._gameView.colorVec[i][j];
                                    this_2._gameView.blockMap[i][j].column = i - 1;
                                    egret.Tween.get(this_2._gameView.blockMap[i][j]).to({ x: 145 + 50 * (i - 1) }, 80).call(function () {
                                        console.log("原" + j + "行" + i + "列" + "方块");
                                        _this._gameView.blockMap[i][j].downStatus = 1;
                                        _this._gameView.blockMap[i - 1][j] = _this._gameView.blockMap[i][j];
                                        _this._gameView.blockMap[i][j] = null;
                                        _this._gameView.colorVec[i][j] = -1;
                                        console.log("数组赋值成功，左滑");
                                    });
                                    num++;
                                }
                            }
                        }
                    };
                    for (var j = 1; j < 11; j++) {
                        _loop_4(j);
                    }
                };
                var this_2 = this;
                //此处写左边左滑，右边右滑，可加 右面左滑，左边右滑 保证条件互斥即可
                for (var i = 1; i < 7; i++) {
                    _loop_3(i);
                }
                var _loop_5 = function (i) {
                    var _loop_6 = function (j) {
                        if (this_3._gameView.colorVec[i][j] && this_3._gameView.blockMap[i][j]) {
                            //左下侧滑
                            if ((this_3._gameView.colorVec[i][j + 1] == 0 || this_3._gameView.colorVec[i][j + 1] == null) && (this_3._gameView.colorVec[i + 1][j + 1] == 0 || this_3._gameView.colorVec[i + 1][j + 1] == null)) {
                                if (this_3._gameView.colorVec[i + 1][j - 1] == -1) {
                                    this_3._gameView.colorVec[i + 1][j - 1] = this_3._gameView.colorVec[i][j];
                                    this_3._gameView.blockMap[i][j].row = j - 1;
                                    this_3._gameView.blockMap[i][j].column = i + 1;
                                    egret.Tween.get(this_3._gameView.blockMap[i][j]).to({
                                        x: 145 + 50 * this_3._gameView.blockMap[i][j].column,
                                        y: 825 - 50 * this_3._gameView.blockMap[i][j].row
                                    }, 80).call(function () {
                                        console.log("原" + j + "行" + i + "列" + "方块");
                                        _this._gameView.blockMap[i][j].downStatus = 2;
                                        _this._gameView.blockMap[i + 1][j - 1] = _this._gameView.blockMap[i][j];
                                        //this._gameView.blockMap[i][j].text_1.text = "" + this._gameView.blockMap[i][j].Value + this._gameView.blockMap[i][j].downStatus;
                                        _this._gameView.blockMap[i][j] = null;
                                        _this._gameView.colorVec[i][j] = -1;
                                        console.log("数组赋值成功，右下滑");
                                    });
                                    num++;
                                }
                                else if (this_3._gameView.colorVec[i + 1][j] == -1) {
                                    this_3._gameView.colorVec[i + 1][j] = this_3._gameView.colorVec[i][j];
                                    this_3._gameView.blockMap[i][j].column = i + 1;
                                    egret.Tween.get(this_3._gameView.blockMap[i][j]).to({ x: 145 + 50 * (i + 1) }, 80).call(function () {
                                        console.log("原" + j + "行" + i + "列" + "方块");
                                        _this._gameView.blockMap[i][j].downStatus = 2;
                                        _this._gameView.blockMap[i + 1][j] = _this._gameView.blockMap[i][j];
                                        _this._gameView.blockMap[i][j] = null;
                                        _this._gameView.colorVec[i][j] = -1;
                                        console.log("数组赋值成功，右滑");
                                    });
                                    num++;
                                }
                            }
                        }
                    };
                    for (var j = 1; j < 11; j++) {
                        _loop_6(j);
                    }
                };
                var this_3 = this;
                for (var i = 3; i < 9; i++) {
                    _loop_5(i);
                }
            }
            if (this._gameView.clearLength) {
                //说明是特殊情况
                var self_1 = this;
                setTimeout(function () {
                    console.log(num + "->num");
                    self_1._gameView.createAnimalEntry();
                }, 90);
            }
        };
        return DownLogic;
    }(egret.DisplayObjectContainer));
    happyClear.DownLogic = DownLogic;
    __reflect(DownLogic.prototype, "happyClear.DownLogic");
})(happyClear || (happyClear = {}));
//# sourceMappingURL=DownLogic.js.map