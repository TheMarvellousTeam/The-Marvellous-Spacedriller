

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
        return this._list
    }

}
