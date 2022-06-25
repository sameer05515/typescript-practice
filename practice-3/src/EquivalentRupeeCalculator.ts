import {referenceData} from './util/GoldPriceReferenceData';


export class Calculator {

    public static calculate(referenceYear: number,
        targetYear: number,
        amount: number) {
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
        console.log(`'Rs.${amount}' of '${referenceYear}' is equivalent of 'Rs.${targetAmount}' of '${targetYear}'`)
        return targetAmount;
    }
}
