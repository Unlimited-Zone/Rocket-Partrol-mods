

// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to the existing scene
        scene.add.existing(this);

        this.isFiring = false;      //track rocket firing status
        this.moveSpeed = 2;
        this.firingSpeed = 2;

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update(){
        
        

        // fire
        if(mouseclick && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); 
            this.setTexture('rocket');  // play sfx
        }
        // movement
        if(!this.isFiring && mouseX >= borderUISize + this.width - 100
            && mouseX <= game.config.width - borderUISize - this.width + 100) {
            this.x = mouseX;
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


    // reset rocket to "ground"
    reset(){
        this.setTexture('bow1');
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding - 20;
    }
}
