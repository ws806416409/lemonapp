export class LemonGame {
    constructor(id, LemonOS) {
        this.id = id;
        this.$lemon_game=$('#' + id);
        this.LemonOS = LemonOS;

        this.settings = new Settings(this);
        this.menu = new LemonGameMenu(this);
        this.playground = new LemonGamePlayground(this);

        this.start();
    }

    start(){
    }
}
