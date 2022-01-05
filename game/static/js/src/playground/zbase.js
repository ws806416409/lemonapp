class LemonGamePlayground {
    constructor(root){
        this.root = root;
        this.$playground = $('<div>游戏界面</div>');

        this.hide();
        this.root.$lemon_game.append(this.$playground);

        this.start();
    }

    start(){
    }

    show(){     //打开游戏界面
        this.$playground.show();
    }

    hide(){     //关闭游戏界面
        this.$playground.hide();
    }
}
