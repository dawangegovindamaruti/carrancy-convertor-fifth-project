const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Convert currency
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amountInput = document.querySelector(".amount input");
  let amtVal = parseFloat(amountInput.value);

  if (isNaN(amtVal) || amtVal < 1) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();
  const url = `${BASE_URL}/${from}.json`;

  const response = await fetch(url);
  const data = await response.json();
  const rate = data[from][to];

  const convertedAmount = (amtVal * rate).toFixed(2);
  document.querySelector(".result").innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
});
