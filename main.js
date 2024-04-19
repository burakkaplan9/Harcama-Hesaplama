const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector(".total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let total = 0;

function updateTotal(price) {
  total += Number(price);
  totalInfo.textContent = total;
}

function addExpense(e) {
  e.preventDefault();

  if (!priceInput.value || !spendingInput.value) {
    alert("Değer Giriniz..!");
    return;
  }

  const spendingDiv = document.createElement("div");

  spendingDiv.classList.add("spending");

  if (statusCheck.checked) {
    spendingDiv.classList.add("payed");
  }

  spendingDiv.innerHTML = `<h2>${spendingInput.value} =</h2>
    <h2 id="value">${priceInput.value}</h2>
    <div class="buttons">
        <img id="payment" src="image/payment.png" alt="">
        <img id="remove" src="image/delete.png" alt="">`;

  list.appendChild(spendingDiv);

  updateTotal(priceInput.value);

  spendingInput.value = "";
  priceInput.value = "";
}

function handleClick(e) {
  const element = e.target;

  if (element.id === "remove") {
    const wrapper = element.parentElement.parentElement;

    const deletePrice = wrapper.querySelector("#value").innerText;
    Number(deletePrice.innerText);

    updateTotal(-Number(deletePrice));

    wrapper.remove();
  }
}

function handleFilter(e) {
  const items = list.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
