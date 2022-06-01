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
function tailRecMortgage(value, runningTotal = 0, sidePot = 11000) {
    console.log("***** MONTH: " + runningTotal);
    value = (runningTotal % 12 == 0 && runningTotal > 0) ? value - 7500 : value
    if(value < sidePot) {
        return runningTotal;
    }
    else {
        const rate = runningTotal > 4 ? 0.0129 : 0.0262
        const interest = (value * rate) / 12; //~2.62% atm
        totalInterest += interest;
        console.log("Interest rate: ", rate);
        console.log("Interest: ", interest);
        console.log("Running total interest: ", totalInterest);
        console.log("Value before interest: ", value);
        console.log("Value after interest: ", value + interest);
        console.log("Side pot: ", sidePot);
        return tailRecMortgage(
            (value - 1923.06) + (interest),
            runningTotal + 1,
            sidePot + 300
        )
    }
}

function example(value) {
    return value + 1;
}

function exampler() {
    let val = document.getElementById('value').value

    document.getElementById("mortgage_output").textContent = example(val);
}

// mortgage(80800);
// console.log("Months: ", count);
// console.log("Years: ", count / 12);

// const total = tailRecMortgage(68007.68 + 46949.64);
// console.log("Tail Months: ", total);
// console.log("Tail Years: ", total / 12);
// console.log("Total Interest: ", totalInterest);

const total = tailRecMortgage(65789.53);
console.log("Tail Months: ", total);
console.log("Tail Years: ", total / 12);
console.log("Total Interest: ", totalInterest);

// const totalSL = tailRecSL(46949.64);
// console.log("Tail Months: ", totalSL);
// console.log("Tail Years: ", totalSL / 12);
// console.log("Total Interest: ", totalInterestSL);