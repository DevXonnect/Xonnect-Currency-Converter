const FULL_API = 'http://data.fixer.io/api/latest?access_key=88ef31c87c9e8ff361a19b9793ca01c6';
const API_LINK_CONVERSION = 'http://data.fixer.io/api/latest?access_key=';
const API_LINK_DROPDOWN = 'http://data.fixer.io/api/symbols?access_key=';
const API_KEY = '88ef31c87c9e8ff361a19b9793ca01c6';


const selectors = {
  from: 'currFrom',
  to: 'currTo',
  input: 'inputCurr',
  output: 'outputCurr'
};

document.getElementById('inputCurr').value;

const dropdownOne = document.getElementById(selectors.from);
const dropdownTwo = document.getElementById(selectors.to);
const input = document.getElementById(selectors.input);
const output = document.getElementById(selectors.output);

// UI code
document.addEventListener('DOMContentLoaded', async () => {
  const rates = await fetchSymbols();


  showDropdown(dropdownOne, rates);
  showDropdown(dropdownTwo, rates);

  input.addEventListener('keyup', e => {
    e.preventDefault();
    convertCurrencies();
  });

  dropdownOne.addEventListener('change', e => {
    convertCurrencies();
  });

  dropdownTwo.addEventListener('change', e => {
    convertCurrencies();
  });

});

// ui functions
async function convertCurrencies() {
  try {
    let from = dropdownOne.value;
    let to = dropdownTwo.value;
    let amt = Number(input.value)

    const currRates = await fetchCurrencies(from, to);
    const currValues = currRates[to]/currRates[from];
    const converted = (currValues * amt).toFixed(2);
    if (!isNaN(converted)) {
      output.innerText = `${converted} ${(to === "Target Currency (ex. EUR)") ? "" : to}`
    } else {
    output.innerText = "Please select target currency";
    }
  }
  catch{
    output.innerText = "Please select target & base currency";
  }

}

async function fetchCurrencies(from, to) {
  output.innerText = "loading";
  const curr = await fetch(
    `${API_LINK_CONVERSION}${API_KEY}&symbols=${from},${to}`
  );
  const { rates } = await curr.json();
  return rates;
}

async function fetchSymbols() {
  const curr = await fetch(`${API_LINK_DROPDOWN}${API_KEY}`);
  const { symbols } = await curr.json();
  console.log(symbols);
  return symbols;
}

function showDropdown(selector, rates) {
  for (let key in rates) {
    option = document.createElement('option');
    option.text = `${key} (${rates[key]})`;
    option.value = key;
    selector.add(option);
  }
}

