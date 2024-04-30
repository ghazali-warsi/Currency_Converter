const dropdown = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurrEl = document.querySelector(".from select");
const toCurrEl = document.querySelector(".to select");
const msg = document.querySelector('.msg');
const AmountEl = document.querySelector('.amount input');

// For Country Code 

for (let select of dropdown)
{
    // console.log(dropdown);
    for(currcode in countryList)
    {
        // console.log(currcode);
        let newOption = document.createElement('option');
        newOption.innerText = currcode;
        newOption.value = currcode;
        // if(select.names === "from" && currcode === "USD")
        // {
        //     newOption.selected = "Selected";
        // }else if (select.names === "to" && currcode === "PKR")
        // {
        //     newOption.selected= "Selected";
        // }
        select.append(newOption);
    }

    // For Image Change

select.addEventListener("change" , (evt) =>{
    // console.log(evt.target);
    updateFlag(evt.target);
});
}

const updateFlag = (element) =>
{
    // console.log(element);
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
}

const exchangeCurrency = async ()=>{
    let fromcurr = fromCurrEl.value;
    let tocurr = toCurrEl.value;
    const response = await fetch(`https://open.exchangerate-api.com/v6/latest/${fromcurr}`); 
    const data = await response.json();
// console.log(data);
const rate = data.rates[tocurr];
// console.log(rate); 
msg.innerHTML = AmountEl.value * rate.toFixed(2)+tocurr;
};

btn.addEventListener('click' , (evt) =>{
    evt.preventDefault();
    exchangeCurrency();
});

window.addEventListener('load' , ()=>{
    exchangeCurrency();
})