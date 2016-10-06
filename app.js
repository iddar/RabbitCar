
/* global Phaser */

const width = 800
const height = 600

const LANES = 4

function getBar (lanes) {
  let lines = lanes
  if (lines < 3) lines = 3
  let base_up = [1, 2, 3]
  let base_down = [5, 6, 7]

  let center = new Array(lines - 2).fill(4)
  return base_up.concat(center, base_down)
}

function drawBar (game, group, bar, x, y) {
  for (let position = y, i = 0; position < (y + (32 * bar.length)); position += 32, i++) {
    let groundBlock = game.add.sprite(x, position, 'ground', `ground_${bar[i]}`)

    if (bar[i] < 3 || bar[i] > 5) {
      game.physics.enable(groundBlock, Phaser.Physics.ARCADE)
      groundBlock.body.collideWorldBounds = true
      groundBlock.body.checkCollision.right = false
      groundBlock.body.checkCollision.left = false
      groundBlock.body.immovable = true
      group.add(groundBlock)
    }
  }
}

class RabbitCar {
  constructor (game) {
    this.game = game
  }

  preload () {
    this.game.load.spritesheet('car', '/car.png', 32, 32, 8)
    // this.game.load.spritesheet('ground', '/ground.png', 32, 32, 8)
    game.load.atlasJSONHash('ground', '/ground.png', '/ground.json')
  }

  create () {
    // world style
    this.game.stage.backgroundColor = 0x4488cc
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 32 * 200, height)
    // load background

    this.border = game.add.group()
    for (let x = 0; x < (32 * 200); x += 32) {
      drawBar(this.game, this.border, getBar(10), x, 100)
    }

    // load assets
    this.car = this.game.add.sprite(300, 200, 'car')
    this.walk = this.car.animations.add('walk')
    this.car.animations.play('walk', 10, true)
    this.game.camera.follow(this.car)
    this.game.physics.arcade.enable(this.car)
    this.car.body.collideWorldBounds = true
    this.game.physics.enable(this.car)

    // Make player collide with world boundaries so he doesn't leave the stage

    // Events
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update () {
    let velocity = 8
    if (this.game.physics.arcade.collide(this.border, this.car)) {
      velocity = 2
    } else {
      velocity = 8
    }

    if (this.cursors.left.isDown) {
      this.car.x -= velocity
      this.game.camera.follow(this.car, Phaser.Camera.FOLLOW_PLATFORMER)
    }
    if (this.cursors.right.isDown) {
      this.car.x += velocity
    }
    if (this.cursors.up.isDown) {
      this.car.y -= 8
    }
    if (this.cursors.down.isDown) {
      this.car.y += 8
    }
  }

}

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game')
game.state.add('game', RabbitCar, true)
