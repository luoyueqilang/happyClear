namespace happyClear{
    //
    export class DrawTable extends egret.DisplayObjectContainer{
        //
        constructor(){
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawTable,this);
        }

        private drawTable():void{
            let shp:egret.Shape = new egret.Shape();
            shp.graphics.lineStyle(	1,0x1E90FF);
            shp.graphics.moveTo(120,250);
            shp.graphics.lineTo(620,250);
            shp.graphics.lineTo(620,850);
            shp.graphics.lineTo(120,850);
            shp.graphics.lineTo(120,250);
            shp.graphics.endFill();
            this.addChild(shp);
        }
    }
}