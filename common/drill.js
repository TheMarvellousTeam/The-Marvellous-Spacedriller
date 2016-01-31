export const minerals = ['a', 'b', 'c', 'd']

const prob = ['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd']

export var randomDrill = function() {
    return prob[Math.floor(Math.random()*prob.length)]
}