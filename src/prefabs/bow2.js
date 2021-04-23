

// bow2 (player) prefab
class bow2 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to the existing scene
        scene.add.existing(this);

        this.isFiring = false;      //track bow firing status
        this.moveSpeed = 5;
        this.firingSpeed = 2;

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add bow sfx
    }

    update(){
        //left/right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width - 100){
                this.x -= this.moveSpeed;
            }else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width + 100){
                this.x += this.moveSpeed;
            }

        }
        

        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
            this.setTexture('rocket');
            this.sfxRocket.play();  // play sfx
        }

        //if fired, move the rocket up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding ){
            
            this.y -= this.firingSpeed;
            
        }

        //reset on miss
        if(this.y <= borderUISize *3 + borderPadding){
            this.reset();
        }
    }


    // reset bow to "ground"
    reset(){
        this.setTexture('bow1');
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding - 20;
    }
}
