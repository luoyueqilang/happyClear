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
    //动物方块位置设置
    happyClear.Block_Conf = {
        //0表示障碍，1表示动物方块，2表示入口生成，-2表示空
        1: [
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
        2: [
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
        3: [
            [1, 1, 1, 0, 1, 1, 1, 1, 1, -2, -2, -2],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, -2, -2],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, -2],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, -2],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, -2, -2],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, -2, -2, -2]
        ],
        4: [
            [-2, 1, 1, 0, 1, 1, 1, 1, 1, -2, -2, -2],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, -2, -2],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, -2],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, -2],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, -2, -2],
            [-2, 1, 1, 0, 1, 1, 1, 1, 1, -2, -2, -2]
        ],
        5: [
            [-2, 1, 1, 1, 0, 1, 1, 1, 1, -2, -2, 2],
            [-2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, -2],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, -2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, -2],
            [-2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, -2],
            [-2, 1, 1, 1, 0, 1, 1, 1, 1, -2, -2, 2]
        ],
        6: [
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
        7: [
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
    happyClear.DOWN_ROUND = {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 3,
        6: 3,
        7: 3
    };
    //下落入口配置
    happyClear.DOWN_CONF = {
        1: {
            beginIndex: 0,
            endIndex: 9
        },
        2: {
            beginIndex: 0,
            endIndex: 9
        },
        3: {
            beginIndex: 3,
            endIndex: 6
        },
        4: {
            beginIndex: 3,
            endIndex: 6
        },
        5: {
            beginIndex: 0,
            endIndex: 9
        },
        6: {
            beginIndex: 0,
            endIndex: 9
        },
        7: {
            beginIndex: 0,
            endIndex: 9
        }
    };
    var GameData = (function (_super) {
        __extends(GameData, _super);
        function GameData(game) {
            var _this = _super.call(this) || this;
            _this._gameStartView = game;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
            return _this;
        }
        GameData.prototype.init = function () {
            this._blockValue = this.getValue();
            this.colorVec = this._blockValue;
            this.colorVec = this.flashValue(this.colorVec);
            this._gameStartView.onStart(this.colorVec);
        };
        GameData.prototype.getValue = function () {
            var colorVec = [];
            for (var i = 0; i < 10; i++) {
                colorVec[i] = [];
                for (var j = 0; j < 12; j++) {
                    if (happyClear.Block_Conf[main_round][i][j] > 0) {
                        var colorNum = Math.ceil(Math.random() * 6);
                        colorVec[i].push(colorNum);
                    }
                    else if (happyClear.Block_Conf[main_round][i][j] == 0) {
                        colorVec[i].push(0);
                    }
                    else {
                        colorVec[i].push(null);
                    }
                }
            }
            return colorVec;
        };
        GameData.prototype.flashValue = function (colorVec) {
            var numCount = 0;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 12; j++) {
                    if (this.colorVec[i][j]) {
                        var flag = this.canClear(colorVec, j, i);
                        if (flag) {
                            numCount++;
                            var num = Math.ceil(Math.random() * 6);
                            if (num != this.colorVec[i][j]) {
                                colorVec[i][j] = num;
                            }
                        }
                    }
                }
            }
            if (numCount != 0) {
                this.flashValue(colorVec);
            }
            return colorVec;
        };
        GameData.prototype.canClear = function (colorVec, row, col) {
            //水平是否可消
            var clearLength_1 = 1;
            for (var j = col + 1; j < 10; j++) {
                if (colorVec[j][row] == colorVec[col][row]) {
                    clearLength_1++;
                }
                else {
                    break;
                }
            }
            for (var j = col - 1; j >= 0; j--) {
                if (colorVec[j][row] == colorVec[col][row]) {
                    clearLength_1++;
                }
                else {
                    break;
                }
            }
            //垂直是否可消
            var clearLength_2 = 1;
            for (var i = row + 1; i < 12; i++) {
                if (colorVec[col][i] == colorVec[col][row]) {
                    clearLength_2++;
                }
                else {
                    break;
                }
            }
            for (var i = row - 1; i >= 0; i--) {
                if (colorVec[col][i] == colorVec[col][row]) {
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
            }
            else {
                return 0;
            }
        };
        return GameData;
    }(egret.DisplayObjectContainer));
    happyClear.GameData = GameData;
    __reflect(GameData.prototype, "happyClear.GameData", ["happyClear.IGameData"]);
})(happyClear || (happyClear = {}));
//# sourceMappingURL=GameData.js.map