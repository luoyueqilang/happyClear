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
    //判断是否为方块对象
    function bBlock(object) {
        if (object instanceof happyClear.BlockView) {
            return object;
        }
        else {
            return null;
        }
    }
    happyClear.bBlock = bBlock;
    function deepCopy(obj) {
        if (typeof obj != "object") {
            return obj;
        }
        var newObj = {};
        for (var key in obj) {
            newObj[key] = deepCopy(obj[key]);
        }
        return newObj;
    }
    happyClear.deepCopy = deepCopy;
    function copy(obJ) {
        var back = {};
        for (var key in obJ) {
            back[key] = obJ[key];
        }
        return back;
    }
    happyClear.copy = copy;
    function checkClear(valueVec) {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 12; j++) {
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
    happyClear.checkClear = checkClear;
    var GameLogic = (function (_super) {
        __extends(GameLogic, _super);
        function GameLogic(game) {
            var _this = _super.call(this) || this;
            _this._gameView = game;
            return _this;
        }
        //死局检测
        GameLogic.prototype.DeafCheck = function (valueVec) {
            //死局标志
            var flag;
            //横向交换
            loop: for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 11; j++) {
                    var temp = valueVec[i][j];
                    valueVec[i][j] = valueVec[i][j + 1];
                    valueVec[i][j + 1] = temp;
                    var flag1 = checkClear(valueVec);
                    //如果竖向换牌死局，横向换牌
                    if (flag1) {
                        valueVec[i][j + 1] = valueVec[i][j];
                        valueVec[i][j] = temp;
                        valueVec[i][j] = valueVec[i + 1][j];
                        valueVec[i + 1][j] = temp;
                        var flag2 = checkClear(valueVec);
                        //横向换牌没死局
                        if (!flag2) {
                            valueVec[i + 1][j] = valueVec[i][j];
                            valueVec[i][j] = temp;
                            flag = false;
                            break loop;
                        }
                        else {
                            valueVec[i + 1][j] = valueVec[i][j];
                            valueVec[i][j] = temp;
                        }
                    }
                    else {
                        valueVec[i][j + 1] = valueVec[i][j];
                        valueVec[i][j] = temp;
                        flag = false;
                        break loop;
                    }
                }
                flag = true;
            }
            if (flag) {
                alert("当前没有可以消的，游戏结束");
            }
            //    console.log(valueVec);
        };
        //判断是否可以消除
        GameLogic.prototype.canClear = function (row, col) {
            //水平是否可消
            var clearLength_1 = 1;
            for (var j = col + 1; j < 10; j++) {
                if (this._gameView.colorVec[j][row] == this._gameView.colorVec[col][row] && this._gameView.colorVec[j][row] != 0 && this._gameView.colorVec[j][row] != null) {
                    clearLength_1++;
                }
                else {
                    break;
                }
            }
            for (var j = col - 1; j >= 0; j--) {
                if (this._gameView.colorVec[j][row] == this._gameView.colorVec[col][row] && this._gameView.colorVec[j][row] != 0 && this._gameView.colorVec[j][row] != null) {
                    clearLength_1++;
                }
                else {
                    break;
                }
            }
            //垂直是否可消
            var clearLength_2 = 1;
            for (var i = row + 1; i < 12; i++) {
                if (this._gameView.colorVec[col][i] == this._gameView.colorVec[col][row] && this._gameView.colorVec[col][i] != 0 && this._gameView.colorVec[col][i] != null) {
                    clearLength_2++;
                }
                else {
                    break;
                }
            }
            for (var i = row - 1; i >= 0; i--) {
                if (this._gameView.colorVec[col][i] == this._gameView.colorVec[col][row] && this._gameView.colorVec[col][i] != 0 && this._gameView.colorVec[col][i] != null) {
                    clearLength_2++;
                }
                else {
                    break;
                }
            }
            if (clearLength_1 >= 3 || clearLength_2 >= 3) {
                //先判断两个是否都满足
                if (clearLength_1 >= 3 && clearLength_2 >= 3) {
                    //两个方向可以消除
                    return 3;
                }
                else {
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
            }
            else {
                return 0;
            }
        };
        //获取整个可以消除的方块
        GameLogic.prototype.getClearList = function (kind, line, column) {
            switch (kind) {
                case 1:
                    var animalList = [];
                    for (var j = column - 1; j >= 0; j--) {
                        if (this._gameView.colorVec[column][line] == this._gameView.colorVec[j][line]) {
                            animalList.unshift(this._gameView.blockMap[j][line]);
                        }
                        else {
                            break;
                        }
                    }
                    animalList.push(this._gameView.blockMap[column][line]);
                    for (var j = column + 1; j < 10; j++) {
                        if (this._gameView.colorVec[column][line] == this._gameView.colorVec[j][line]) {
                            animalList.push(this._gameView.blockMap[j][line]);
                        }
                        else {
                            break;
                        }
                    }
                    //获取最后一个消除的行数
                    return animalList;
                case 2:
                    var animalList_1 = [];
                    for (var i = line - 1; i >= 0; i--) {
                        if (this._gameView.colorVec[column][i] == this._gameView.colorVec[column][line]) {
                            animalList_1.unshift(this._gameView.blockMap[column][i]);
                        }
                        else {
                            break;
                        }
                    }
                    animalList_1.push(this._gameView.blockMap[column][line]);
                    for (var i = line + 1; i <= 12; i++) {
                        if (this._gameView.colorVec[column][i] == this._gameView.colorVec[column][line]) {
                            animalList_1.push(this._gameView.blockMap[column][i]);
                        }
                        else {
                            break;
                        }
                    }
                    return animalList_1;
                case 3:
                    //行列都可以消除的时候
                    var animalList_2 = [];
                    for (var j = column - 1; j >= 0; j--) {
                        if (this._gameView.colorVec[column][line] == this._gameView.colorVec[j][line]) {
                            animalList_2.unshift(this._gameView.blockMap[j][line]);
                        }
                        else {
                            break;
                        }
                    }
                    animalList_2.push(this._gameView.blockMap[column][line]);
                    for (var j = column + 1; j < 10; j++) {
                        if (this._gameView.colorVec[column][line] == this._gameView.colorVec[j][line]) {
                            animalList_2.push(this._gameView.blockMap[j][line]);
                        }
                        else {
                            break;
                        }
                    }
                    //列消除
                    var animalList_3 = [];
                    for (var i = line - 1; i >= 0; i--) {
                        if (this._gameView.colorVec[column][i] == this._gameView.colorVec[column][line]) {
                            animalList_3.unshift(this._gameView.blockMap[column][i]);
                        }
                        else {
                            break;
                        }
                    }
                    // animalList_3.push(this._gameView.blockMap[column][line]);
                    for (var i = line + 1; i <= 12; i++) {
                        if (this._gameView.colorVec[column][i] == this._gameView.colorVec[column][line]) {
                            animalList_3.push(this._gameView.blockMap[column][i]);
                        }
                        else {
                            break;
                        }
                    }
                    var animalList_4 = animalList_2.concat(animalList_3);
                    if (happyClear.DOWN_ROUND[main_round] == 0) {
                        animalList_4.sort(function (a, b) {
                            return a.order - b.order;
                        });
                    }
                    return animalList_4;
                case 0:
                    return [];
            }
        };
        //全局刷新
        GameLogic.prototype.globalClear = function () {
            var clearList = [];
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 12; j++) {
                    var flag = this.canClear(j, i);
                    var clearAnimalList = [];
                    clearAnimalList = this.getClearList(flag, j, i);
                    for (var k = 0; k < clearAnimalList.length; k++) {
                        if (clearList.indexOf(clearAnimalList[k]) == -1 && (clearAnimalList[k] instanceof happyClear.BlockView)) {
                            clearList.push(clearAnimalList[k]);
                        }
                    }
                }
            }
            if (happyClear.DOWN_ROUND[main_round] == 0) {
                clearList.sort(function (a, b) {
                    return a.order - b.order;
                });
            }
            this._gameView.firstFlag = false;
            return clearList;
        };
        //消除动物
        GameLogic.prototype.clearAll = function (clearList_5) {
            for (var i = clearList_5.length - 1; i >= 0; i--) {
                this._gameView.clearAnimation(clearList_5[i], i);
            }
        };
        //游戏结束  下一关，上一关
        GameLogic.prototype.gameOver = function () {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 12; j++) {
                    if (this._gameView.blockMap[i][j] instanceof happyClear.BlockView) {
                        this._gameView.animalContainer.removeChild(this._gameView.blockMap[i][j]);
                    }
                    if (this._gameView.lockMap[i][j]) {
                        this._gameView.lockContainer.removeChild(this._gameView.lockMap[i][j]);
                    }
                }
            }
            this._gameView.blockMap = [];
            this._gameView.colorVec = [];
            this._gameView.lockMap = [];
            this._gameView.saveColorVec = [];
            this._gameView.saveLockVec = [];
            this._gameView.saveStepCount = [];
            this._gameView.saveGameScore = [];
            this._gameView.saveClearCount = [];
            this._gameView.backCount = 0;
            this._gameView.gameScore = 0;
            this._gameView.clearLength = 0;
            this._gameView.clearCount = 0;
            this._gameView.uiView.colorCount.text = "";
            if (happyClear.OVER_CONF[main_round] == 1) {
                this._gameView.uiView.target_score.visible = true;
            }
            if (this._gameView.animalInfo) {
                this._gameView.animalContainer.removeChild(this._gameView.animalInfo);
                this._gameView.animalInfo = null;
            }
            this._gameView.gameData.init();
        };
        //过关判定
        GameLogic.prototype.bOver = function () {
            if (happyClear.OVER_CONF[main_round] == 1 || (happyClear.OVER_CONF[main_round] == 2)) {
                if (this._gameView.stepCount <= 0 && this._gameView.clearCount > 0) {
                    alert("游戏结束");
                    this.gameOver();
                }
                else if (this._gameView.stepCount >= 0 && this._gameView.clearCount <= 0) {
                    alert("恭喜过关");
                    if (main_round >= 7) {
                        main_round = 1;
                    }
                    else {
                        main_round++;
                    }
                    this.gameOver();
                }
            }
            else if (happyClear.OVER_CONF[main_round] == 0) {
                console.log("目前分数", this._gameView.gameScore, '通关分数', happyClear.STEP_SCORE[main_round][1]);
                if (this._gameView.stepCount <= 0 && this._gameView.gameScore < happyClear.STEP_SCORE[main_round][1]) {
                    alert("游戏结束");
                    this.gameOver();
                }
                else if (this._gameView.stepCount >= 0 && this._gameView.gameScore >= happyClear.STEP_SCORE[main_round][1]) {
                    alert("恭喜通关");
                    if (main_round >= 7) {
                        main_round = 1;
                    }
                    else {
                        main_round++;
                    }
                    this.gameOver();
                }
            }
        };
        return GameLogic;
    }(egret.DisplayObjectContainer));
    happyClear.GameLogic = GameLogic;
    __reflect(GameLogic.prototype, "happyClear.GameLogic", ["happyClear.IGameLogic"]);
})(happyClear || (happyClear = {}));
//# sourceMappingURL=GameLogic.js.map