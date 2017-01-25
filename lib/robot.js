'use strict';

function Robot() {
  this.bearing = null
  this.coordinates = []
}

Robot.prototype.orient = function(direction){
  switch(direction){
    case 'north':
    case 'east':
    case 'south':
    case 'west':
      this.bearing = direction
      break
    default:
      var error = new Error('Invalid Robot Bearing')
      throw error
  }
}

Robot.prototype.turnRight = function(){
  var position = this.bearing
  if(position === 'north'){
    this.bearing = 'east'
  } else if(position === 'east') {
    this.bearing = 'south'
  } else if(position === 'south') {
    this.bearing = 'west'
  } else {
    this.bearing = 'north'
  }
}

Robot.prototype.turnLeft = function(){
  var position = this.bearing
  if(position === 'north'){
    this.bearing = 'west'
  } else if(position === 'east') {
    this.bearing = 'north'
  } else if(position === 'south') {
    this.bearing = 'east'
  } else {
    this.bearing = 'south'
  }
}

Robot.prototype.at = function(x, y){
  this.coordinates = [x, y]
}

Robot.prototype.advance = function(){
  var position = this.bearing

  switch(position){
    case 'north':
      this.coordinates[1] += 1
      break
    case 'east':
      this.coordinates[0] += 1
      break
    case 'south':
      this.coordinates[1] -= 1
      break
    case 'west':
      this.coordinates[0] -= 1
      break
  }
}

Robot.prototype.instructions = function(char){
  var newInstructions = []
  var instructions = char.split('')

  instructions.forEach((instruction, idx, instructions) => {
    switch(instruction){
      case 'L':
        newInstructions.push('turnLeft')
        break
      case 'R':
        newInstructions.push('turnRight')
        break
      case 'A':
        newInstructions.push('advance')
        break
    }
  })

  return newInstructions
}

Robot.prototype.place = function(location){
  this.at(location['x'], location['y'])
  this.bearing = location['direction']
}

Robot.prototype.evaluate = function(factoryDirections){
  var directions = this.instructions(factoryDirections)

  directions.forEach((direction, idx, directions) => {
    switch (direction) {
      case 'turnLeft':
        this.turnLeft()
        break;
      case 'turnRight':
        this.turnRight()
        break
      case 'advance':
        this.advance()
        break
    }
  })
}
