import {Cube} from '../../common/cube'
import {init as initComm, sendReady} from './comm'
const io = require('socket.io-client')


require('file?name=index.html!./app.html')


window.onload = () => {

    var input_name = document.createElement('input')
    input_name.setAttribute('type', 'text')
    input_name.setAttribute('value', 'nickname')
    document.body.appendChild(input_name)
    
    var go = document.createElement('input')
    go.setAttribute('type', 'button')
    go.setAttribute('value', 'go')
    go.onclick = function(){
        initComm()
        sendReady(input_name.value)

        

        document.body.removeChild(input_name)
        document.body.removeChild(go)
    }
    document.body.appendChild(go)

    
}
