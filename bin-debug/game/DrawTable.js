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
    var DrawTable = (function (_super) {
        __extends(DrawTable, _super);
        //
        function DrawTable() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawTable, _this);
            return _this;
        }
        DrawTable.prototype.drawTable = function () {
            var shp = new egret.Shape();
            shp.graphics.lineStyle(1, 0x1E90FF);
            shp.graphics.moveTo(120, 250);
            shp.graphics.lineTo(620, 250);
            shp.graphics.lineTo(620, 850);
            shp.graphics.lineTo(120, 850);
            shp.graphics.lineTo(120, 250);
            shp.graphics.endFill();
            this.addChild(shp);
        };
        return DrawTable;
    }(egret.DisplayObjectContainer));
    happyClear.DrawTable = DrawTable;
    __reflect(DrawTable.prototype, "happyClear.DrawTable");
})(happyClear || (happyClear = {}));
//# sourceMappingURL=DrawTable.js.map