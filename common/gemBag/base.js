

export class GemBag {

    constructor(){

        this._list = []
    }

    add(position, type){
        this._list.push({
            position: position,
            type: type
        })
    }

    getGems(){
        return [
            { position: {x:0, y:0, z:0} , type:'gemA' },
            { position: {x:27, y:27, z:27} , type:'gemB' },
        ]
        return this._list
    }

}
