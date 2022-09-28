import { expect } from 'chai';
import {Calculator} from '../../src/EquivalentRupeeCalculator';

describe('\n======================\nEquivalentRupeeCalculator tests\n=================\n', () => { // the tests container
    const calculate = Calculator.calculate;
    const calculateRange = Calculator.calculateRange;
    const add = (a:number,b:number)=> {return a+b};

    it('checking default options', () => { // the single test
        expect(add(1,2)).to.equal(3);
    });

    it('checking 1964 reference data', () =>{
        expect(calculate(1964, 1964, 1)).to.equal(1);
    })

    it('checking 1964 reference data with 2000', () =>{
        expect(calculate(1964, 2000, 1)).to.equal(69.56521739130434);
    })

    it('checking invalid referenceYear', () =>{
        expect(calculate(1962, 1964, 1)).to.equal(-1);
    })

    it('checking invalid targetYear', () =>{
        expect(calculate(1964, 2050, 1)).to.equal(-1);
    })

    it('checking invalid amount', () =>{
        expect(calculate(1964, 1964, -1)).to.equal(-1);
    })

    it('checking range amount', () =>{
        expect(calculateRange(2002, 2020, 6)).to.equal(383.9485827717382);
    })
});