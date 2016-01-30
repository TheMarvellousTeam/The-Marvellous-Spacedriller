export var minerals = ['a', 'b', 'c', 'd']

export var randomDrill = function() {
    return minerals[Math.floor(Math.random()*minerals.length)]
}