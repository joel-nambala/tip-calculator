'use strict';

// Select DOM Elements
const billInput = document.querySelector('.bill-input');
const tipValue = document.querySelectorAll('.tip-percentage');
const customInput = document.querySelector('.custom-input');
const tipAmount = document.querySelector('.tip-amount-value');
const totalAmount = document.querySelector('.total-amount-value');
const btnReset = document.querySelector('.btn-reset');

// State variables
let billValue;
let val;

// Global funcntions
// Formart the number
const numberFormat = function (num) {
  return new Intl.NumberFormat('en-US').format(num);
};

// Init function
const init = function () {
  billInput.value = '0.00';
  customInput.value = '';
  tipAmount.textContent = '$0.00';
  totalAmount.textContent = '$0.00';
  billValue = 0;
  val = 0;
};

init();

const calculateTip = function (tip, bill) {
  tipAmount.innerHTML = '';
  totalAmount.innerHTML = '';
  const tips = (tip / 100) * bill;
  const totalTip = `$${numberFormat(tips)}`;
  const amount = `$${numberFormat(bill + tips)}`;

  tipAmount.insertAdjacentHTML('beforeend', totalTip);
  totalAmount.insertAdjacentHTML('beforeend', amount);
};

const setBill = () => (billValue = Number(billInput.value));

// Add event listeners
tipValue.forEach(function (value) {
  value.addEventListener('click', function (e) {
    val = +e.target.dataset.percent;
    setBill();
    if (billValue <= 0) return;
    calculateTip(val, billValue);
  });
});

customInput.addEventListener('keyup', function () {
  const customTip = +customInput.value;
  setBill();
  if (customTip <= 0) {
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
    return;
  } else calculateTip(customTip, billValue);
});

btnReset.addEventListener('click', init);
