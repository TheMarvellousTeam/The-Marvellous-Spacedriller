export class StateMachine {
    constructor() {
        this.started = false
        this.fire_received = 0
    }

    start() {
        this._started = true
    }

    newFire() {
        this.fire_received++
    }

    isFireOver( nb_players ) {
        if ( this.fire_received == nb_players ){
            return true
            this.fire_received == 0
        }
        return false
    }

    isStarted() {
        return this._started
    }
}