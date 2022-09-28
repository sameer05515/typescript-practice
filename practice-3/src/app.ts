import { Calculator } from './EquivalentRupeeCalculator';
import { positiveWorksData } from './util/positiveWorksData';
import {referenceData as goldPriceReferenceData} from './util/GoldPriceReferenceData'

const calculate = Calculator.calculate;
const calculateRange = Calculator.calculateRange;

export function drawGPTable(){
    goldPriceReferenceData.forEach(item=>{
        (document.getElementById('GPUL') as HTMLUListElement).innerHTML +=
            `
            <tr>
                    <td><b>${item.year}</b></td>
                    <td>${item.pricePer10gm}</td>
            </tr>            
            `;
    })
}

export function postiveWorksData() {
    for (const pos of positiveWorksData) {
        (document.getElementById('positiveWorksUL') as HTMLUListElement).innerHTML +=
            `<li>
        <p> 
            <strong><span style="color: #000000;"> ${pos.title} </span></strong> : 
            <italic><span style="color: #000000;"> ${pos.description} </span></italic>
        </p>          
    </li>`;
    }
}

export function calculateNShow() {
    const refYrInp = +(document.getElementById('refYrInp') as HTMLInputElement).value;
    const tarYrInp = +(document.getElementById('tarYrInp') as HTMLInputElement).value;
    const amtInp = +(document.getElementById('amtInp') as HTMLInputElement).value;

    const tarAmt = calculate(refYrInp, tarYrInp, amtInp);
    (document.getElementById('result') as HTMLDivElement).innerHTML =
        `
    <p>
    <span style="color: #00ff00;">
        <strong>'Rs. ${amtInp}'</strong>
    </span> of
    <strong><span style="color: #000000;">'${refYrInp}'</span></strong>
    is equivalent of
    <span style="color: #000000;"><strong>
            'Rs. ${tarAmt}'
        </strong></span>
    of <span style="color: #000000;"><strong>
            '${tarYrInp}'
        </strong></span>
    </p>
    `;
}

export function calculateRangeNShow(){
    const refYrInp = +(document.getElementById('refYrInp') as HTMLInputElement).value;
    const tarYrInp = +(document.getElementById('tarYrInp') as HTMLInputElement).value;
    const amtInp = +(document.getElementById('amtInp') as HTMLInputElement).value;

    const tarAmt = calculateRange(refYrInp, tarYrInp, amtInp, false);
    (document.getElementById('result') as HTMLDivElement).innerHTML =
        `
    <p>
    <span style="color: #00ff00;">
        <strong>'Rs. ${amtInp}'</strong>
    </span> from
    <strong><span style="color: #000000;">'${refYrInp}' </span></strong>
    to <span style="color: #000000;"><strong>
        '${tarYrInp}'
    </strong></span>
    is equivalent of
    <span style="color: #000000;"><strong>
            'Rs. ${tarAmt}'
        </strong></span>
    
    </p>
    `;
}


/////////////////////
/**Find unique characters in a string and the count of their occurrences*/
function count_occurrence(text = "") {
    const array_from_text = text.split("");
    const result = {};
    Array.from(new Set(array_from_text)).forEach(word => {
        const { length } = array_from_text.filter(w => w === word);
        result[word] = length;
    });
    return result;
}
const occurrences = count_occurrence("PremendraKumarSameerRaj");
console.log(occurrences); // { P: 1, r: 4, e: 4, m: 3, n: 1, d: 1, a: 4, K: 1, u: 1, S: 1, R: 1, j: 1 }
/////////////////////////







let btn = document.getElementById("calculateNShowBtn") as HTMLButtonElement;
btn.addEventListener("click", calculateNShow);
let btn2 = document.getElementById("calculateRangeNShowBtn") as HTMLButtonElement;
btn2.addEventListener("click", calculateRangeNShow);
postiveWorksData();
drawGPTable()


