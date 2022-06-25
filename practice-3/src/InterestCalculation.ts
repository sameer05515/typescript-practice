const principleAmt=31.0;
const finalAmt=62.5;
const years= 2025-2022;
// const rate= ((finalAmt*100/principleAmt)-100)/years;
const rate = (((finalAmt/principleAmt)*100)-100)/years;

// console.log("principleAmt : "+principleAmt);
// console.log("years : "+years);
// console.log("finalAmt : "+finalAmt);
console.log("rate : "+rate);

console.log("-----------------------------");



const calculateNextAmt = (principleAmt:number, rate:number, years: number) => {
    return principleAmt*(100+rate*years)/100;
}

// for(let i:number=2;i<50;i+=2){
    // console.log("year : "+ (2022+i)+" finalAmt : "+calculateNextAmt(principleAmt,rate,i));
// }

for(let i:number=2;i<50;i+=2){
    
    console.log("year : "+ (2022+i)+" finalAmt : "+calculateNextAmt(principleAmt,rate,i));
}