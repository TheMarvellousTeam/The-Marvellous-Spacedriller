import {init as initComm, sendReady} from './comm'
const io = require('socket.io-client')


require('file?name=index.html!./app.html')


window.onload = () => {

    var container = document.createElement('div')
    container.setAttribute('style', 'width:100%; height:100%; display:flex; align-items:center; justify-content: center')

    var input_name = document.createElement('input')
    input_name.setAttribute('type', 'text')
    input_name.setAttribute('value', 'nickname')
    input_name.setAttribute('style', 'padding:10px; margin: 20px')
    container.appendChild(input_name)

    var go = document.createElement('input')
    go.setAttribute('type', 'button')
    go.setAttribute('value', 'go')
    go.setAttribute('style', 'padding:10px')
    go.onclick = function(){
        initComm()
        sendReady(input_name.value)

        document.body.removeChild( container )
    }
    container.appendChild(go)
    document.body.appendChild( container )


}
