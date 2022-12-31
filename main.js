// cardholder
const nameCard = document.querySelector(".card__details-name");
const nameInput = document.querySelector("#cardholder");
const nameErrorDiv = document.querySelector(".form__cardholder--error");

// card number
const numCard = document.querySelector(".card__number");
const numInput = document.querySelector("#cardNumber");
const numberErrorDiv = document.querySelector(".form__inputnumber--error");

// MM
const monthCard = document.querySelector(".card__month");
const monthInput = document.querySelector("#cardMonth");
const monthErrorDiv = document.querySelector(".form__input-mm--error");

// YY
const yearCard = document.querySelector(".card__year");
const yearInput = document.querySelector("#cardYear");
const yearErrorDiv = document.querySelector(".form__input-yy--error");

// CVC
const cvcCard = document.querySelector(".card-back__cvc");
const cvcInput = document.querySelector("#cardCvc");
const cvcErrorDiv = document.querySelector(".form__input-cvc--error");

// Dinamical name
nameInput.addEventListener("input", () => {
  if (nameInput.value == "") {
    nameCard.innerText = "JANE APPLESEED";
  } else {
    nameCard.innerText = nameInput.value;
  }
});

// Dinamical number
numInput.addEventListener("input", (e) => {
  let inputValue = e.target.value;

  numCard.innerText = numInput.value;

  let regExp = /[A-z]/g;
  if (regExp.test(numInput.value)) {
    showError(numInput, numberErrorDiv, "Wrong format, numbers only");
  } else {
    numInput.value = inputValue
      .replace(/\s/g, "")
      .replace(/([0-9]{4})/g, "$1 ")
      .trim();
    hideError(numInput, numberErrorDiv);
  }

  if (numInput.value == "") {
    numCard.innerText = "0000 0000 0000 0000";
  } else {
    numCard.innerText = numInput.value;
  }
});

// Dinamical month
monthInput.addEventListener("input", () => {
  monthCard.innerText = monthInput.value;
  verifyLetters(monthInput, monthErrorDiv);
});

// Dinamical year
yearInput.addEventListener("input", () => {
  yearCard.innerText = yearInput.value;
  verifyLetters(yearInput, yearErrorDiv);
});

// Dinamical cvc
cvcInput.addEventListener("input", () => {
  cvcCard.innerText = cvcInput.value;
  verifyLetters(cvcInput, cvcErrorDiv);
});

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

const formSection = document.querySelector(".form");
const thanksSection = document.querySelector(".thanks-section");

// Button confirm
const confirmBtn = document.querySelector(".form__submit");

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Verify name
  if (verifyIsFilled(nameInput, nameErrorDiv)) {
    nameValidation = true;
  } else {
    nameValidation = false;
  }

  // Verify number
  if (verifyIsFilled(numInput, numberErrorDiv)) {
    if (numInput.value.length == 19) {
      hideError(numInput, numberErrorDiv);
      numberValidation = true;
    } else {
      showError(numInput, numberErrorDiv, "Wrong number");
      numberValidation = false;
    }
  }

  // Verify month
  if (verifyIsFilled(monthInput, monthErrorDiv)) {
    if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
      hideError(monthInput, monthErrorDiv);
      monthValidation = true;
    } else {
      showError(monthInput, monthErrorDiv, "Month incorrect");
      monthValidation = false;
    }
  }
  // Verify year
  if (verifyIsFilled(yearInput, yearErrorDiv)) {
    if (parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27) {
      hideError(yearInput, yearErrorDiv);
      yearValidation = true;
    } else {
      showError(yearInput, yearErrorDiv, "Wrong year");
      yearValidation = false;
    }
  }

  // Verify cvc
  if (verifyIsFilled(cvcInput, cvcErrorDiv)) {
    if (cvcInput.value.length == 3) {
      hideError(cvcInput, cvcErrorDiv);
      cvcValidation = true;
    } else {
      showError(cvcInput, cvcErrorDiv, "Wrong CVC");
      cvcValidation = false;
    }
  }

  if (
    nameValidation &&
    numberValidation &&
    monthValidation &&
    yearValidation &&
    cvcValidation
  ) {
    formSection.style.display = "none";
    thanksSection.style.display = "block";
  }
});

const showError = (divInput, divError, msgError) => {
  divError.innerText = msgError;
  divInput.style.borderColor = "#ff0000";
};

const hideError = (divInput, divError) => {
  divError.innerText = "";
  divInput.style.borderColor = "hsl(270, 3%, 87%)";
};

const verifyIsFilled = (divInput, divError) => {
  if (divInput.value.length > 0) {
    hideError(divInput, divError);
    return true;
  } else {
    showError(divInput, divError, "Can't be blank");
    return false;
  }
};

const verifyLetters = (input, errorDiv) => {
  let regExp = /[A-z]/g;
  if (regExp.test(input.value)) {
    showError(input, errorDiv, "Wrong format, numbers only");
  } else {
    hideError(input, errorDiv);
  }
};
