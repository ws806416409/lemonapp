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
