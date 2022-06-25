var hello = 'Hellow Premendra!!';
var lastYrBalance = 193872 - 19872;
var interest = 7872;
// const interestPercentage = (interest / lastYrBalance);
// let nextBal = lastYrBalance + interest;
// const months = ['Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
// for (const mon of months) {
//     nextBal = nextBal + 12000;
// }
// const nextYrInterest = nextBal * (interestPercentage);
// console.log(`interestPercentage : ${interestPercentage}
// nextBal : ${nextBal}
// nextYrInterest : ${nextYrInterest}
// `)
// const outputData = {
//     lastYrBalance: lastYrBalance,
//     interest: interest,
//     baseYear: 2022
// }
var calculateNYear = function (lastYrBalance, interest, noOfYears, baseYear) {
    var interestPercentage = (interest / lastYrBalance);
    var nextBal = lastYrBalance + interest;
    var months = ['Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    for (var i = 0; i < noOfYears; i++) {
        for (var _i = 0, months_1 = months; _i < months_1.length; _i++) {
            var mon = months_1[_i];
            nextBal = nextBal + 12000;
        }
        var nextYrInterest = nextBal * (interestPercentage);
        console.log("-------------------\ninterestPercentage : ".concat(interestPercentage, "\n    nextBal : ").concat(nextBal, "\n    nextYrInterest : ").concat(nextYrInterest, "\n    totalBalance : ").concat(nextBal + nextYrInterest, "\n    "));
    }
};
console.log("total elapsed service years ".concat(1986 + 60 - 2022));
calculateNYear(lastYrBalance, interest, 24, 2021);
