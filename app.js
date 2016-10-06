
/* global Phaser */

const width = 800
const height = 600

class RabbitCar {
  constructor (game) {
    this.game = game
  }

  preload () {
    this.game.load.spritesheet('car', '/car.png', 32, 32, 8)
    this.game.load.spritesheet('ground', '/ground.png', 32, 32, 8)
  }

  create () {
    // world style
    this.game.stage.backgroundColor = 0x4488cc
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    // load background
    // this.tiles = this.game.add.sprite(0, 0, 'ground', 3)
    // this.background = this.add.tileSprite(0, 0, 32, 32, 'ground', 3)
    // this.background.autoScroll(-30, 0)

    this.border = this.game.add.sprite(0, 200 - 32, 'ground', 0)
    // this.game.physics.enable(this.border, Phaser.Physics.ARCADE)
    this.game.physics.arcade.enable(this.border)
    this.border.body.collideWorldBounds = true
    this.border.body.bounce.set(1)

    // for (let x = 0; x < this.game.width; x += 32) {
    //   let groundBlock = this.game.add.sprite(x, 200 - 32, 'ground', 0)
    //   this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE)
    //   groundBlock.body.collideWorldBounds = true
    //   groundBlock.body.immovable = true
    //   this.border.add(groundBlock)
    // }

    this.ground = this.game.add.group()
    for (let y = 200; y < (200 + (3 * 32)); y += 32) {
      for (let x = 0; x < this.game.width; x += 32) {
        let groundBlock = this.game.add.sprite(x, y, 'ground', 3)
        this.ground.add(groundBlock)
      }
    }

    // load assets
    this.car = this.game.add.sprite(300, 200, 'car')
    this.walk = this.car.animations.add('walk')
    this.car.animations.play('walk', 10, true)
    this.game.physics.arcade.enable(this.car)
    // Make player collide with world boundaries so he doesn't leave the stage
    // this.game.physics.enable(this.car, Phaser.Physics.ARCADE)
    this.car.body.collideWorldBounds = true
    this.car.body.bounce.set(1)

    // Events
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update () {
    this.game.physics.arcade.collide(this.border, this.car)
    if (this.cursors.left.isDown) {
      this.car.x -= 8
    } else if (this.cursors.right.isDown) {
      this.car.x += 8
    } else if (this.cursors.up.isDown) {
      this.car.y -= 8
    } else if (this.cursors.down.isDown) {
      this.car.y += 8
    }
  }
}

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game')
game.state.add('game', RabbitCar, true)
