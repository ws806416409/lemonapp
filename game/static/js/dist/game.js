export class LemonGame {
    constructor(id) {
        this.id = id;
        this.$lemon_game=$('#' + id);
        //this.menu = new LemonGameMenu(this);
        this.playground = new LemonGamePlayground(this);

        this.start();
    }

    start(){
    }
}
class LemonGamePlayground {
    constructor(root){
        this.root = root;
        this.$playground = $(`<div class="lemon-game-playground"></div>`);

        //this.hide();
        this.root.$lemon_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);

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
let LEMON_GAME_OBJECTS = [];

class LemonGameObject {
    constructor(){
        LEMON_GAME_OBJECTS.push(this);

        this.has_called_start =  false;     //是否执行过start函数
        this.timedelta = 0;     //当前帧距离上一帧的时间间隔
    }

    start(){        //只会在第一帧执行一次
    }

    update(){       //每一帧执行一次
    }

    on_destroy(){   //在被销毁之前执行一次
    }

    destroy(){      //删除该物体
        this.on_destroy();

        for (let i = 0; i < LEMON_GAME_OBJECTS.length; i++) {
            if(LEMON_GAME_OBJECTS[i] = this) {
                LEMON_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}
let last_timestamp;
let LEMON_GAME_ANIMATION = function(timestamp){

    for(let i = 0; i < LEMON_GAME_OBJECTS.length; i++) {
        let obj = LEMON_GAME_OBJECTS[i];
        if(!obj.has_called_start){
            obj.start();
            obj.has_called_start = true;
        }else{
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(LEMON_GAME_ANIMATION); 
}


requestAnimationFrame(LEMON_GAME_ANIMATION);
class GameMap extends LemonGameObject {
    constructor(playground){
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start(){
    }

    update(){
    }

}
class LemonGameMenu{
    constructor(root){
        this.root = root;
        this.$menu = $(`
<div class = "lemon-game-menu">
    <div class="lemon-game-menu-field">
        <div class="lemon-game-menu-field-item lemon-game-menu-field-item-single-mode" >
            单人模式
        </div>
        <br>
        <div class="lemon-game-menu-field-item lemon-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <br>
        <div class="lemon-game-menu-field-item lemon-game-menu-field-item-settings">
            设置
        </div>
        <br>
    </div>
</div>
`);
        this.root.$lemon_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.lemon-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.lemon-game-menu-field-item-multi-mode');
        this.$settings = this.$menu.find('.lemon-game-menu-field-item-settings');

        this.start();
    }

    start(){
        this.add_listening_events();
    }
    add_listening_events() {
        let outer = this;
        this.$single_mode.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function(){
            console.log("click multi mode");
        });
        this.$settings.click(function(){
            console.log("click settings");
        });
    }

    show(){     //显示menu界面
        this.$menu.show();
    }

    hide(){     //关闭menu界面
        this.$menu.hide();
    }
}

