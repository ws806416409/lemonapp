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
        this.$menu.hide();
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

