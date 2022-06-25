import { expect } from 'chai';
import {SIPCalculator} from '../../src/SIPCalulator';
import { SIPDataType } from '../../src/types/SIPDataType';

describe('\n======================\nSIPCalulator tests\n=================\n', () => { // the tests container
    const calculate = SIPCalculator.calculate;
    const add = (a:number,b:number)=> {return a+b};

    const inputTestData1: SIPDataType[] = [
        {
            quantity: 4975.154,
            rate: 60.0,
            description: 'SBI Blue chip fund Reg-Plan-G'
        },
        {
            quantity: 835.242,
            rate: 20,
            description: 'SBI Corp bond fund - Dir MIDCW'
        },
        {
            quantity: 1042.972,
            rate: 135.0,
            description: 'SBI Blue chip fund Reg-Plan-G'
        }
    ]

    it('checking default options', () => { // the single test
        expect(add(1,2)).to.equal(3);
    });

    it('checking with default data', () =>{
        expect(calculate()).to.equal(800020.5);
    })

    it('checking with custom data', () =>{
        expect(calculate(inputTestData1)).to.equal(456015.30000000005);
    })

    
});