namespace happyClear {
    
    export interface IPosition {
        x: number,
        y: number
    }

    export interface IGameStartView {
        //数组数据源
        colorVec: number[][];
        //方块对象存放处
        blockMap: any[];
        //记录步数
        stepCount: number;
        //用于类之间的调用
        gameData: IGameData;
        gameLogic: IGameLogic;
        //游戏开始，对象创建入口
        onStart(valueVec): void;
        onTouchBegin(evt: egret.TouchEvent): void;
        //触摸结束交换数据
        onTouchEnd(evt: egret.TouchEvent): void;
        //消除一个方块
        clearAnimation(animal, loop): void;
        //方块生成
        createAnimal(): void;
    }

    export interface IGameLogic {
        //死局检测
        DeafCheck(valueVec): void;
        //判断是否可以消除
        canClear(row, col): number;
        //获取可以消除的方块列表
        getClearList(kind: number, line, column): any[];
        //全局刷新  获取全局可以消除的方块列表
        globalClear(): BlockView[];
        //消除全局可消的方块
        clearAll(clearList_5: BlockView[]): void;
    }

    export interface IGameData {
        init(): void;
        //获取数组数据源
        getValue(): number[][];
    }
}