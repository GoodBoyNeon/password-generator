// Element variables
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const clipboardBtn = document.getElementById("clipboard");


const functionNames = {
	lower: getLower,
	upper: getUpper,
	number: getNumber,
	symbol: getSymbol,
};

// Functions
function getLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol() {
	const symbols = "!@#$%^&*(){}[]=<>/,.";
	return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(lower, upper, number, symbol, length) {
	let rawPassword = "";
	const types = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
		type => Object.values(type)[0]
	);

	if (types === 0) {
		alert("Please select at least one option!");
	}

	for (let i = 0; i < length; i += types) {
		typesArr.forEach(type => {
			const functionName = Object.keys(type)[0];
			rawPassword += functionNames[functionName]();
		});
	}

	return rawPassword.slice(0, length);
}

// Executive Events
clipboardBtn.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultEl.innerText;

	if (!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();
	alert("Password copied to clipboard");
});

generateBtn.addEventListener("click", () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		length
	);
});

