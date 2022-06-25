import { SIPDataType } from "./types/SIPDataType";


export class SIPCalculator {

    private static input: SIPDataType[] = [
        {
            quantity: 4975.154,
            rate: 100.0,
            description: 'SBI Blue chip fund Reg-Plan-G'
        },
        {
            quantity: 835.242,
            rate: 50,
            description: 'SBI Corp bond fund - Dir MIDCW'
        },
        {
            quantity: 1042.972,
            rate: 250.0,
            description: 'SBI Blue chip fund Reg-Plan-G'
        }
    ]

    public static calculate(input: SIPDataType[] = SIPCalculator.input) {
        for (let inp of input) {
            console.log(` ${inp.description} will be ${inp.rate * inp.quantity} with rate ${inp.rate}`)
        }
        let total = input.reduce((result, inp) => {
            return result + inp.rate * inp.quantity;
        }, 0)

        console.log(`Total : ${total}`);
        return total;
    }

}


