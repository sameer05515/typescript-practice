var Utility;
(function (Utility) {
    var Calculation = /** @class */ (function () {
        function Calculation() {
        }
        Calculation.prototype.timesTwo = function (n) {
            return n * 2;
        };
        return Calculation;
    }());
    Utility.Calculation = Calculation;
})(Utility || (Utility = {}));
