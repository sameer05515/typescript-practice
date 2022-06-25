import {referenceData} from './util/GoldPriceReferenceData';


export class Calculator {

    public static calculate(referenceYear: number,
        targetYear: number,
        amount: number, showLog:boolean=true) {
        if (referenceYear < 1964 || referenceYear > 2022) {
            console.log(`invalid referenceYear : ${referenceYear}`);
            return -1;
        }
        if (targetYear < 1964 || targetYear > 2022) {
            console.log(`invalid targetYear : ${targetYear}`);
            return -1;
        }
        if (amount <= 0) {
            console.log(`invalid amount : ${amount}`);
            return -1;
        }

        const referenceYGoldPrice = referenceData.find(el => el.year === referenceYear);
        const targetYGoldPrice = referenceData.find(el => el.year === targetYear);
        let targetAmount = 0;
        if (referenceYGoldPrice && targetYGoldPrice) {
            targetAmount = amount * (targetYGoldPrice.pricePer10gm / referenceYGoldPrice.pricePer10gm);
        } 
        if(showLog)       
        console.log(`'Rs.${amount}' of '${referenceYear}' is equivalent of 'Rs.${targetAmount}' of '${targetYear}'`)
        return targetAmount;
    }

    public static calculateRange(referenceYear: number,
        targetYear: number,
        amount: number, showLog:boolean=true){
            let targetAmount = 0;

            for(let i=referenceYear;i<=targetYear;i++){
                targetAmount+= Calculator.calculate(i,targetYear,amount,false);
            }

            if(showLog)       
        console.log(`'Rs.${amount}' per year from '${referenceYear}'  to '${targetYear}' is equivalent of 'Rs.${targetAmount}'`)
            return targetAmount;
        }
}
