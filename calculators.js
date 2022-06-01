let count = 0;
function mortgage(value) {
    console.log("Value: ", value);
    if(value > 0) {
        const interest = (value * 0.025) / 12;
        console.log("Interest month " + count + ": ", interest);
        count++;
        mortgage((value - 1000) + (interest))
    }
}

let totalInterestSL = 0
function tailRecSL(value, runningTotal = 0) {
    console.log("***** MONTH: " + runningTotal);
    if(value < 0) {
        return runningTotal;
    }
    else {
        const rate = 0.0425
        const interest = (value * rate) / 12;
        totalInterestSL += interest;
        console.log("Interest rate: ", rate);
        console.log("Interest: ", interest);
        console.log("Running total interest: ", totalInterestSL);
        console.log("Value before interest: ", value);
        console.log("Value after interest: ", value + interest);
        return tailRecSL(
            (value - 312.50) + (interest),
            runningTotal + 1
        )
    }
}

let totalInterest = 0
let mortgageValues = []
function tailRecMortgage(value, runningTotal = 0, sidePot = 11000, monthlyPayment = 1923.06, sidePotPayment = 300) {
    mortgageMonthValues = {}
    mortgageMonthValues['month'] = runningTotal;
    value = (runningTotal % 12 == 0 && runningTotal > 0) ? value - 7500 : value
    if(value < sidePot) {
        return runningTotal;
    }
    else {
        const rate = runningTotal > 4 ? 0.0129 : 0.0262
        const interest = (value * rate) / 12; //~2.62% atm
        totalInterest += interest;
        mortgageMonthValues['rate'] = rate;
        mortgageMonthValues['interest'] = interest;
        mortgageMonthValues['runningTotalInterest'] = totalInterest;
        mortgageMonthValues['valueBeforeInterest'] = value;
        mortgageMonthValues['valueAfterInterest'] = parseInt(value) + interest;
        mortgageMonthValues['sidePot'] = sidePot
        mortgageValues.push(mortgageMonthValues);
        return tailRecMortgage(
            (value - monthlyPayment) + (interest),
            runningTotal + 1,
            sidePot + sidePotPayment,
            monthlyPayment,
            sidePotPayment
        )
    }
}

function createNewParaLine(string, removeMargin = true) {
    const para = document.createElement("p");
    if(removeMargin) {
        para.style.margin = "0px";
    }
    const node = document.createTextNode(string);
    para.appendChild(node);
    return para;
}

function reset() {
    const outputContainer = document.getElementById("mortgageOutputContainer");
    const outputDiv = document.getElementById("mortgage_output");
    outputDiv.remove();

    const div = document.createElement("div");
    div.id = "mortgage_output";
    outputContainer.appendChild(div);
}

function calculateMortgage() {
    const outputDiv = document.getElementById("mortgage_output");
    let val = document.getElementById('value').value;
    let mortgagePaymentsVal = parseFloat(document.getElementById('mortgagePaymentValue').value);
    let sidePotPaymentsVal = parseFloat(document.getElementById('sidePotPaymentValue').value);
    totalInterest = 0;
    mortgageValues = [];

    let formatter = new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP'
    });

    const total = tailRecMortgage(val, 0, 11000, mortgagePaymentsVal, sidePotPaymentsVal);

    let i;
    for (i = 0; i < mortgageValues.length; i++) {
        const month = createNewParaLine("***** MONTH: " + mortgageValues[i].month, false);
        month.style.textDecoration = "underline";
        outputDiv.appendChild(month);
        outputDiv.appendChild(createNewParaLine("Interest rate: " + mortgageValues[i].rate + "%"));
        outputDiv.appendChild(createNewParaLine("Interest: " + formatter.format(mortgageValues[i].interest)));
        outputDiv.appendChild(createNewParaLine("Running total interest: " + formatter.format(mortgageValues[i].runningTotalInterest)));
        outputDiv.appendChild(createNewParaLine("Value before interest: " + formatter.format(mortgageValues[i].valueBeforeInterest)));
        outputDiv.appendChild(createNewParaLine("Value after interest: " + formatter.format(mortgageValues[i].valueAfterInterest)));
        outputDiv.appendChild(createNewParaLine("Side pot: " + formatter.format(mortgageValues[i].sidePot)));
    }
    outputDiv.appendChild(createNewParaLine("***** TOTALS", false));
    outputDiv.appendChild(createNewParaLine("Total months: " + total));
    outputDiv.appendChild(createNewParaLine("Total years: " + (total / 12)));
    outputDiv.appendChild(createNewParaLine("Total interest: " + formatter.format(totalInterest)));
}

function validate(input) {
    if(isNaN(input.value) || input.value == "") {
        input.value = "0.00";
    } else {
        input.value = parseFloat(input.value).toFixed(2);
    }
}

function openAdminPrompt() {
    let password = prompt("Enter password");
    if(password == "1") {
        document.getElementById('value').value = "65789.53";
        document.getElementById('mortgagePaymentValue').value = "1923.06";
        document.getElementById('sidePotPaymentValue').value = "300.00";
        document.getElementById('original').style.display = "block";
    } else {
        alert("Wrong password");
    }
}

// mortgage(80800);
// console.log("Months: ", count);
// console.log("Years: ", count / 12);

// const total = tailRecMortgage(68007.68 + 46949.64);
// console.log("Tail Months: ", total);
// console.log("Tail Years: ", total / 12);
// console.log("Total Interest: ", totalInterest);

// const totalSL = tailRecSL(46949.64);
// console.log("Tail Months: ", totalSL);
// console.log("Tail Years: ", totalSL / 12);
// console.log("Total Interest: ", totalInterestSL);