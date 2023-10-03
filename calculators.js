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
function tailRecMortgage(value, runningTotal = 0, sidePot = 11000, monthlyPayment = 1800, sidePotPayment = 300, rateOverride = -1) {
    mortgageMonthValues = {}
    mortgageMonthValues['month'] = runningTotal;
    value = (runningTotal % 12 == 0 && runningTotal > 0) ? value - 7500 : value
    if(value < sidePot) {
        return runningTotal;
    }
    else {
        let rate;
        if(rateOverride >= 0) {
            rate = rateOverride / 100;
        } else {
            rate = 0.0659;
        }
        const interest = (value * rate) / 12;
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
            sidePotPayment,
            rateOverride
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
    let rateOverrideVal = document.getElementById('rateValue').value;
    rateOverrideVal = rateOverrideVal != "" && !isNaN(rateOverrideVal) ? parseFloat(rateOverrideVal) : -1;
    totalInterest = 0;
    mortgageValues = [];

    let formatter = new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP'
    });

    const total = tailRecMortgage(val, 0, 11000, mortgagePaymentsVal, sidePotPaymentsVal, rateOverrideVal);

    outputDiv.appendChild(createNewParaLine("***** TOTALS", false));
    outputDiv.appendChild(createNewParaLine("Total months: " + total));
    outputDiv.appendChild(createNewParaLine("Total years: " + (total / 12)));
    outputDiv.appendChild(createNewParaLine("Total interest: " + formatter.format(totalInterest)));
    
    let i;
    for (i = 0; i < mortgageValues.length; i++) {
        const month = createNewParaLine("***** MONTH: " + mortgageValues[i].month, false);
        month.style.textDecoration = "underline";
        outputDiv.appendChild(month);
        outputDiv.appendChild(createNewParaLine("Interest rate: " + (mortgageValues[i].rate * 100) + "%"));
        outputDiv.appendChild(createNewParaLine("Interest: " + formatter.format(mortgageValues[i].interest)));
        outputDiv.appendChild(createNewParaLine("Running total interest: " + formatter.format(mortgageValues[i].runningTotalInterest)));
        outputDiv.appendChild(createNewParaLine("Value before interest: " + formatter.format(mortgageValues[i].valueBeforeInterest)));
        outputDiv.appendChild(createNewParaLine("Value after interest: " + formatter.format(mortgageValues[i].valueAfterInterest)));
        outputDiv.appendChild(createNewParaLine("Side pot: " + formatter.format(mortgageValues[i].sidePot)));
    }
}

function validate(input, resetOnFail = true, clearOnFail = false) {
    if(isNaN(input.value) || input.value == "") {
        if(resetOnFail && !clearOnFail) {
            input.value = "0.00";
        } else {
            input.value = "";
        }
    } else {
        input.value = parseFloat(input.value).toFixed(2);
    }
}

function openAdminPrompt() {
    let password = prompt("Enter password");
    if(password == "1") {
        document.getElementById('value').value = "49650.09";
        document.getElementById('mortgagePaymentValue').value = "1800";
        document.getElementById('sidePotPaymentValue').value = "300.00";
        document.getElementById('original').style.display = "block";
    } else {
        alert("Wrong password");
    }
}
