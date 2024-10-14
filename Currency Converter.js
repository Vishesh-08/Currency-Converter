import { countryList } from './codes.js';
const BASE_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExhangeRate();
})

let i=0;
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExhangeRate();
})

const updateExhangeRate= async ()=>{
    let amount=document.querySelector(".amount input");
    let Finamount=document.querySelector(".finalamount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    
    let finalAmount=amtval*rate;
    Finamount.value=finalAmount;
    //msg.innerText=`${amtval} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;


}
