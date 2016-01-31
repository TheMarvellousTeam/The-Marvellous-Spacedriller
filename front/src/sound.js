require('file?name=soundtrack.wav!./asset/sound/soundtrack.wav')
const soundtrack = new Audio('soundtrack.wav')
soundtrack.volume = 0.6

require('file?name=explosion.wav!./asset/sound/explosion.wav')
const explosion = new Audio('explosion.wav')
explosion.volume = 0.25

require('file?name=dropbomb.wav!./asset/sound/dropbomb.wav')
const dropbomb = new Audio('dropbomb.wav')
dropbomb.volume = 0.2

export var startSoundtrack = function() {
    soundtrack.loop = true
    soundtrack.play()
}

export var playExplosion = function() {
    explosion.play()
}

export var playDropbomb = function() {
    dropbomb.play()
}