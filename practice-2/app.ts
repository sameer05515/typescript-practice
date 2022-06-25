let hello: string = 'Hellow Premendra!!';

const lastYrBalance = 193872 - 19872;
const interest = 7872;
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



const calculateNYear = (lastYrBalance, interest, noOfYears, baseYear) => {
    const interestPercentage = (interest / lastYrBalance);
    let nextBal = lastYrBalance + interest;
    const months = ['Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

    for (let i = 0; i < noOfYears; i++) {
        for (const mon of months) {
            nextBal = nextBal + 12000;
        }
        const nextYrInterest = nextBal * (interestPercentage);

        console.log(`-------------------\ninterestPercentage : ${interestPercentage}
    nextBal : ${nextBal}
    nextYrInterest : ${nextYrInterest}
    totalBalance : ${nextBal+nextYrInterest}
    `)
    }

}



console.log(`total elapsed service years ${1986+60-2022}`)

calculateNYear(lastYrBalance,interest,24,2021);