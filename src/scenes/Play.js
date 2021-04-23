
class Play extends Phaser.Scene {
    constructor(){
        super("PlayScene");
        
       
    }

    preload(){
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('bow','./assets/bow.png');
        this.load.image('bow1','./assets/bow1.png');
        this.load.image('grass','./assets/grass.png');
        this.load.image('sky','./assets/sky.png');
        this.load.image('cloud','./assets/cloud.png');
        this.load.image('sun','./assets/sun.png');
        this.load.image('drone','./assets/drone.png');
        this.load.image('target','./assets/target1.png');
        this.load.image('target2','./assets/target2.png');
        this.load.image('UI', './assets/UI.png')

        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('target_3', './assets/arrow_3.png',{
            frameWidth: 64,
            frameHeight: 87,
            startFrame: 0,
            endFrame: 9
        })
    }



    create(){

        // place starfield
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);
        this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud').setOrigin(0,0);
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'grass').setOrigin(0,0);
        this.sun = this.add.tileSprite(0, 0, 640, 480, 'sun').setOrigin(0,0);
        
        
          // add spaceship(x3)
          this.drone = new drone(this, 0,
            borderUISize*4, 'drone', 0, 30).setOrigin(0, 0);
       this.ship02 = new Spaceship(this, game.config.width + borderUISize*3,
            borderUISize*5 + 13, 'target', 0, 20).setOrigin(0, 0);
       this.ship03 = new Spaceship(this, game.config.width,
            borderUISize*6 + 33, 'target', 0, 10).setOrigin(0, 0);     
        
        //white borders
        this.UI = this.add.tileSprite(0, 0, 640, 480, 'UI').setOrigin(0,0);
        
        /*
        this.add.rectangle( 0, 0, game.config.width,
             borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle( 0, game.config.height - borderUISize,
             game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);

        this.add.rectangle( 0, 0, borderUISize,
             game.config.height, 0xFFFFFF).setOrigin(0,0);
             
        this.add.rectangle( game.config.width - borderUISize, 0,
             borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 , 0);

            */
        if(game.settings.player == 1){
            // add rocket player 1
        this.p1Rocket = new Rocket(this, game.config.width/2,
             game.config.height - borderUISize - borderPadding- 20, 'bow1').setOrigin(0.5, 0);
        
        }
        if(game.settings.player == 2){
            // add rocket player 1
        this.p1Rocket = new Rocket(this, game.config.width/2,
             game.config.height - borderUISize - borderPadding - 20, 'bow1').setOrigin(0.5, 0);
        //add bow2
        this.p2bow = new bow2(this, game.config.width/2,
            game.config.height - borderUISize - borderPadding - 20, 'bow1').setOrigin(0.5, 0);
        }
        
      

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //mouse
        //pointer down input
        this.input.on('pointerdown', function (pointer) {
            if(pointer.leftButtonDown()) {
                mouseclick = true;
            }
        }, this);
        //pointer up input
        this.input.on('pointerup', function (pointer) {
            if(pointer.event.button === 0) {
                mouseclick = false;
            }
        });
        //mouse x and y
        this.input.on('pointermove', function (pointer) {
            mouseX = pointer.x;
            mouseY = pointer.y;
        }, this);
        



        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        // score
        this.p1Score = 0;
        if(game.settings.player == 2){
            this.p2Score = 0;
        }
        
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding*2, 'P1:'+this.p1Score, scoreConfig);
        
        if(game.settings.player == 2){
            this.score2Left = this.add.text(borderUISize + borderPadding + 100, 
                borderUISize + borderPadding*2, 'P2:' + this.p1Score, scoreConfig);
        }
       

        
        // GAME OVER flag
        this.gameOver = false;
        

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if(game.settings.player == 1){
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            }else{
                if(this.p1Score > this.p2Score){
                    this.add.text(game.config.width/2, game.config.height/2, 'P1 WIN', scoreConfig).setOrigin(0.5);
                }else if(this.p1Score == this.p2Score){
                    this.add.text(game.config.width/2, game.config.height/2, 'Draw', scoreConfig).setOrigin(0.5);
                }else{
                    this.add.text(game.config.width/2, game.config.height/2, 'P2 WIN', scoreConfig).setOrigin(0.5);
                }
            }
        
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ESC for Menu', scoreConfig).setOrigin(0.5);

        this.gameOver = true;
        }, null, this);

         // display time
         this.timeLeft = this.clock.getElapsed();
         this.timeDisplay = this.add.text(game.config.width - borderUISize - borderPadding - 220, 
             borderUISize + borderPadding*2, this.timeLeft, scoreConfig).setOrigin(0);
    }

    update(){

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= starSpeed;
        this.sky.tilePositionX -= starSpeed - 1.5;
        this.cloud.tilePositionX -= starSpeed - 1;
        

        if (!this.gameOver) {               
            this.p1Rocket.update();
            if(game.settings.player == 2){
                this.p2bow.update();
            } 
            
                   // update rocket sprite
            this.drone.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 

        //check collision
        if( this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if( this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if( this.checkCollision(this.p1Rocket, this.drone)){
           this.p1Rocket.reset();
           this.droneExplode(this.drone);
        }

        
        //p2 check collision
        //check collision
        if(game.settings.player == 2){
            if( this.checkCollision(this.p2bow, this.ship03)){
                this.p2bow.reset();
                this.shipExplode2(this.ship03);
            }
            if( this.checkCollision(this.p2bow, this.ship02)){
                this.p2bow.reset();
                this.shipExplode2(this.ship02);
            }
            if( this.checkCollision(this.p2bow, this.drone)){
               this.p2bow.reset();
               this.droneExplode2(this.drone);
            }
        }
        


        this.timeLeft = game.settings.gameTimer / 1000 - Math.floor(this.clock.getElapsed() / 1000);
        this.timeDisplay.text = "Time Left: " + this.timeLeft;
    }

    //p1 check ship
    checkCollision(rocket, ship){
        if( rocket.x < ship.x + ship.width +100 && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height  &&
            rocket.y + rocket.height > ship.y ){
            return true;
        }else{
            return false;
        }
    }

    //p1 check drone
    checkCollision(rocket, drone){
        if( rocket.x < drone.x + drone.width && 
            rocket.x + rocket.width > drone.x &&
            rocket.y < drone.y + drone.height &&
            rocket.y + rocket.height > drone.y ){
            return true;
        }else{
            return false;
        }
    }




    //p2 check
    checkCollision(bow2, ship){
        if( bow2.x < ship.x + ship.width - 40 && 
            bow2.x + bow2.width > ship.x + 20 &&
            bow2.y < ship.y + ship.height - 20 &&
            bow2.y + bow2.height > ship.y + 20 ){
            return true;
        }else{
            return false;
        }
    }
    //p2 check drone
    checkCollision(bow2, drone){
        if( bow2.x < drone.x + drone.width && 
            bow2.x + bow2.width > drone.x &&
            bow2.y < drone.y + drone.height &&
            bow2.y + bow2.height > drone.y ){
            return true;
        }else{
            return false;
        }
    }
    

    //p1 score
    shipExplode(ship){
        // temporarily hide ship
        ship.alpha = 0;
        //creat explosion sprite at ship's position

            let boom = this.add.sprite(ship.x, ship.y, 'target2').setOrigin(0,0);
            
            
            this.time.delayedCall(500, ()=>{
                
                boom.destroy();
                ship.reset();
                ship.alpha = 1;
            }, null, this);
            
        
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = 'P1:'+ this.p1Score;

        this.sound.play('hit_target');
    }
   

    droneExplode(drone){
        // temporarily hide drone
        drone.alpha = 0;
        //creat explosion sprite at drone's position
        let boom = this.add.sprite(drone.x, drone.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            drone.reset();
            drone.alpha = 1;
            boom.destroy();
        })

        // score add and repaint
        this.p1Score += drone.points;
        this.scoreLeft.text = 'P1:' + this.p1Score;
        this.sound.play('sfx_explosion');
    }


    //p2 score
    shipExplode2(ship){
        // temporarily hide ship
        ship.alpha = 0;
        //creat explosion sprite at ship's position

            let boom = this.add.sprite(ship.x, ship.y, 'target2').setOrigin(0,0);
            
            
            this.time.delayedCall(500, ()=>{
                
                boom.destroy();
                ship.reset();
                ship.alpha = 1;
            }, null, this);
            
        
        // score add and repaint
        this.p2Score += ship.points;
        this.score2Left.text = 'P2:'+ this.p2Score;

        this.sound.play('hit_target');
    }
   

    droneExplode2(drone){
        // temporarily hide drone
        drone.alpha = 0;
        //creat explosion sprite at drone's position
        let boom = this.add.sprite(drone.x, drone.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            drone.reset();
            drone.alpha = 1;
            boom.destroy();
        })

        // score add and repaint
         this.p2Score += drone.points;
         this.score2Left.text = 'P2:'+ this.p2Score;
        this.sound.play('sfx_explosion');
    }


    addBow(){
        const centerX = this.cameras.main.width / 2;
        const bottom  = this.cameras.main.height -90;
        this.bow = this.add.image(game.config.width/2,
            game.config.height - borderUISize - borderPadding, 'bow');
    }

    addEvents(){
        // mouse
		    this.input.on('pointermove', (pointer) => {
                if(pointer.x >= borderUISize + this.bow.width - 100 && pointer.x <= game.config.width - borderUISize - this.bow.width + 100){
                    this.bow.x = pointer.x;
                }
            
		    });
        
    
    }


}