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








let btn = document.getElementById("calculateNShowBtn") as HTMLButtonElement;
btn.addEventListener("click", calculateNShow);
let btn2 = document.getElementById("calculateRangeNShowBtn") as HTMLButtonElement;
btn2.addEventListener("click", calculateRangeNShow);
postiveWorksData();
drawGPTable()


