var Cat = (function () {
    function Cat(thing) {
        this.thing = thing;
    }
    Cat.prototype.yo = function () {
        return this.thing;
    };
    return Cat;
})();
;

module.exports = Cat;
