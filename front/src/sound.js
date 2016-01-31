require('file?name=soundtrack.wav!./asset/sound/soundtrack.wav')
const soundtrack = new Audio('soundtrack.wav')

require('file?name=explosion.wav!./asset/sound/explosion.wav')
const explosion = new Audio('explosion.wav')

export var startSoundtrack = function() {
    soundtrack.loop = true
    soundtrack.volume = 0.2
    soundtrack.play()
}

export var playExplosion = function() {
    explosion.play()
}