let LEMON_GAME_OBJECTS = [];

class LemonGameObject {
    constructor(){
        LEMON_GAME_OBJECTS.push(this);

        this.has_called_start =  false;     //是否执行过start函数
        this.timedelta = 0;     //当前帧距离上一帧的时间间隔i
        this.uuid = this.create_uuid();

    }

    create_uuid(){
        let res = "";
        for(let i = 0; i < 8; i++){
            let x = parseInt(Math.floor(Math.random()*10));
            res += x;
        }
        return res;
    }

    start(){        //只会在第一帧执行一次
    }

    update(){       //每一帧执行一次
    }

    late_update(){  //每一帧最后执行一次
    }

    on_destroy(){   //在被销毁之前执行一次
    }

    destroy(){      //删除该物体
        this.on_destroy();

        for (let i = 0; i < LEMON_GAME_OBJECTS.length; i++) {
            if(LEMON_GAME_OBJECTS[i] === this) {
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
    for (let i = 0; i < LEMON_GAME_OBJECTS.length; i++) {
        let obj = LEMON_GAME_OBJECTS[i];
        obj.late_update();
    }
    last_timestamp = timestamp;
    requestAnimationFrame(LEMON_GAME_ANIMATION);
}


requestAnimationFrame(LEMON_GAME_ANIMATION);
