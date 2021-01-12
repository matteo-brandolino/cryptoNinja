//configure game
//height, width, game loop


//Global Var
let cursors;
let ninja;
let crates;

let coinTimer;
let score = 0;
let scoreText;
let secondsLeft= 60;
let secondsLeftText;
let timeLeftTimer;

let gameOver = false //when game is over

//Pump Talisman
let COIN_GENERATION_INTERVAL = 3000;

//Super Boots
let PLAYER_SPEED = 200;

//Time warp cape
let GAME_SECOND = 1000;

const config = {
    width:1250,
    height:625,
    type: Phaser.AUTO,

    scene: {
        preload: gamePreload, //function to preload assets
        create: gameCreate, 
        update: gameUpdate
    },
    physics: {
        default: "arcade", //apporx the collision
        arcade: {
            gravity: { y:800 },
            debug:false
        }
    }
}

let game;

getUserItems(() => {
    game = new Phaser.Game(config)
})

function gamePreload() {
    //loading assets //run only once
    this.load.image("ninja", "assets/ninja.png" ) //set the image with name "ninja"
    this.load.image("crate", "assets/crate.png" )
    this.load.image("background", "assets/background.png" )
    this.load.image("ethereum", "assets/ethereum.png" )

    //load the idle animation

    this.load.image("idle_frame_0", "assets/idle/Idle__000.png")
    this.load.image("idle_frame_1", "assets/idle/Idle__001.png")
    this.load.image("idle_frame_2", "assets/idle/Idle__002.png")
    this.load.image("idle_frame_3", "assets/idle/Idle__003.png")
    this.load.image("idle_frame_4", "assets/idle/Idle__004.png")
    this.load.image("idle_frame_5", "assets/idle/Idle__005.png")
    this.load.image("idle_frame_6", "assets/idle/Idle__006.png")
    this.load.image("idle_frame_7", "assets/idle/Idle__007.png")
    this.load.image("idle_frame_8", "assets/idle/Idle__008.png")
    this.load.image("idle_frame_9", "assets/idle/Idle__009.png")

    //load the run animation

    this.load.image("run_frame_0", "assets/run/Run__000.png")
    this.load.image("run_frame_1", "assets/run/Run__001.png")
    this.load.image("run_frame_2", "assets/run/Run__002.png")
    this.load.image("run_frame_3", "assets/run/Run__003.png")
    this.load.image("run_frame_4", "assets/run/Run__004.png")
    this.load.image("run_frame_5", "assets/run/Run__005.png")
    this.load.image("run_frame_6", "assets/run/Run__006.png")
    this.load.image("run_frame_7", "assets/run/Run__007.png")
    this.load.image("run_frame_8", "assets/run/Run__008.png")
    this.load.image("run_frame_9", "assets/run/Run__009.png")

    //load the jump animation

    this.load.image("jump_frame_0", "assets/jump/Jump__000.png")
    this.load.image("jump_frame_1", "assets/jump/Jump__001.png")
    this.load.image("jump_frame_2", "assets/jump/Jump__002.png")
    this.load.image("jump_frame_3", "assets/jump/Jump__003.png")
    this.load.image("jump_frame_4", "assets/jump/Jump__004.png")
    this.load.image("jump_frame_5", "assets/jump/Jump__005.png")
    this.load.image("jump_frame_6", "assets/jump/Jump__006.png")
    this.load.image("jump_frame_7", "assets/jump/Jump__007.png")
    this.load.image("jump_frame_8", "assets/jump/Jump__008.png")
    this.load.image("jump_frame_9", "assets/jump/Jump__009.png")
}

function gameCreate() {
    //intiial setup logic //run only once
    
    //initialize cursor
    
    cursors = this.input.keyboard.createCursorKeys()
    
    //create bakcground

    this.add.image(300, 350, "background")

    ninja = this.physics.add.sprite(100, 400, "ninja")

    //ninja.body.setSize(200,200,0,0) //to fix collision box in case
    
    //create ninja
    ninja.scaleX = ninja.scaleY = 0.20

    //create floor
    crates = this.physics.add.staticGroup()

    crates.create(40, 590, "crate")
    crates.create(120, 590, "crate")
    crates.create(200, 590, "crate")
    crates.create(360, 590, "crate")
    crates.create(440, 590, "crate")
    crates.create(520, 590, "crate")
    crates.create(600, 590, "crate")
    crates.create(680, 590, "crate")
    crates.create(1210, 520, "crate")

    
    //crates in the air

    crates.create(280, 450, "crate")
    crates.create(440, 380, "crate")
    crates.create(140, 340, "crate")
    crates.create(700, 280, "crate")
    crates.create(840, 310, "crate")
    crates.create(1100, 430, "crate")
    crates.create(980, 350, "crate")
    crates.create(580, 350, "crate")
    
    this.physics.add.collider(crates, ninja)
    
    //create animations
    //idle
    this.anims.create({
        key: "ninja_idle",
        frames: [
            {key: "idle_frame_0"},
            {key: "idle_frame_1"},
            {key: "idle_frame_2"},
            {key: "idle_frame_3"},
            {key: "idle_frame_4"},
            {key: "idle_frame_5"},
            {key: "idle_frame_6"},
            {key: "idle_frame_7"},
            {key: "idle_frame_8"},
            {key: "idle_frame_9"},
        ],
        framerate: 10,
        repeat:1
    })
    //run
    this.anims.create({
        key: "ninja_run",
        frames: [
            {key: "run_frame_0"},
            {key: "run_frame_1"},
            {key: "run_frame_2"},
            {key: "run_frame_3"},
            {key: "run_frame_4"},
            {key: "run_frame_5"},
            {key: "run_frame_6"},
            {key: "run_frame_7"},
            {key: "run_frame_8"},
            {key: "run_frame_9"},
        ],
        framerate: 10,
        repeat:1
    })
    //jump
    this.anims.create({
        key: "ninja_jump",
        frames: [
            {key: "jump_frame_0"},
            {key: "jump_frame_1"},
            {key: "jump_frame_2"},
            {key: "jump_frame_3"},
            {key: "jump_frame_4"},
            {key: "jump_frame_5"},
            {key: "jump_frame_6"},
            {key: "jump_frame_7"},
            {key: "jump_frame_8"},
            {key: "jump_frame_9"},
        ],
        framerate: 10,
        repeat:1
    })

    //Text on screen

    scoreText = this.add.text(16,16, "Ethreum bag: 0", {fontSize:"32px", fill: "#fff"})

    secondsLeftText = this.add.text(16,66, "Seconds Left:" + secondsLeft, {fontSize:"32px", fill: "#fff"})

    //CoinTimer

    coinTimer= this.time.addEvent({
        delay:Phaser.Math.Between(0, COIN_GENERATION_INTERVAL), //each between 1/3 seconds trigger callback
        callback: generateCoins,
        callbackScope:this, //looking callback in this scope
        repeat:-1, //undefined

    })

    
    timeLeftTimer= this.time.addEvent({
        delay: GAME_SECOND, //each 1 second decrease time
        callback: updateTimeLeft,
        callbackScope:this, 
        repeat:-1, 
        
    })
    
    function updateTimeLeft() {
        if(gameOver) {
            return;
        }
        secondsLeft -= 1
        secondsLeftText.setText(secondsLeft + " seconds left")
        if(secondsLeft<=0) {
            this.physics.pause()
            gameOver=true
        }

    }

    function generateCoins(){
        const coins = this.physics.add.group({
            key: "ethereum",
            repeat:1,
            setXY: { //where gonna drop
                x: Phaser.Math.Between(0,800),
                y: -100,
                stepX: Phaser.Math.Between(30, 100)
            }
        })
    
        coins.children.iterate((child) => {
            //code to execute on each coin
            child.setBounceY(Phaser.Math.FloatBetween(0.3,.9))
        })
    
        this.physics.add.collider(coins,crates)
        this.physics.add.overlap(ninja,coins, collectCoin, null, this) //when ninja pick the coin
    
        function collectCoin(ninja , coin) {
            coin.disableBody(true, true) //double true => disable and diseapper
            score++
            scoreText.setText("Ethereum bag:" + score)
        }
    }
}



function gameUpdate() {
    //monitoring inputs and set how to update the game

    //controls inputs
    switch (true) {
        case cursors.left.isDown:
            ninja.setVelocityX(-PLAYER_SPEED);
            ninja.play("ninja_run", true) //true => finish the animation and play again
            ninja.flipX = true
            break;
        case cursors.right.isDown:
            ninja.setVelocityX(PLAYER_SPEED);
            ninja.play("ninja_run", true)
            ninja.flipX = false
            break;
        case cursors.up.isDown && ninja.body.touching.down:
            ninja.setVelocityY(-480);
            break;
        //in the air
        case cursors.up.isDown:
            ninja.play("ninja_jump", true)
            break;
        default:
            ninja.setVelocityX(0)
            ninja.play("ninja_idle", true)
            break;
    }
}

