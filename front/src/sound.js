require('file?name=soundtrack.wav!./asset/sound/soundtrack.wav')

export var startSoundtrack = function() {
    var soundtrack = new Audio('soundtrack.wav')
    soundtrack.loop = true
    soundtrack.play()
}