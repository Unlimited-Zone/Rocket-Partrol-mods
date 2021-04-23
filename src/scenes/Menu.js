class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('hit_target', './assets/hit.mp3')
        this.load.audio('sfx_rocket', './assets/arrow_sound.wav');
        this.load.image('menu','./assets/menu.png');
    }

    create(){
        //this.scene.start("PlayScene");
        ///this.add.text(20, 20, "Rocket Patrol Menu");
      
        // menu
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '80px',
            backgroundColor: '#C275CF',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        //change scenes
        this.menu = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0,0);
        
        // define keys
        this.add.text(game.config.width/2, game.config.height/2 - 64 - 30, 'Archer', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '26px';
        menuConfig.backgroundColor = '#900C3F';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 , 'Press 1 for 1 player', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#4892B4';
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press 2 for 2 player', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#12672F';
        this.add.text(game.config.width/2, game.config.height/2+ 64*2, 'P1：mouse and left click', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+ 64*3, 'P2：<-, -> to move, press F to shoot', menuConfig).setOrigin(0.5);


        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(key1)) {

          // 1p mode
          game.settings = {
            player: 1,
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('hit_target');
          this.scene.start('PlayScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(key2)) {
          // 2p mode
          game.settings = {
            player: 2,
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('hit_target');
          this.scene.start('PlayScene');    
        }
      }
}