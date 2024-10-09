const arguments = process.argv.slice(2); // getting arguments


const radius = Number(arguments); // casting to number


const result  = Math.PI * radius * radius;

console.log("Not rounded result: ", result);

console.log("Rounded  result: ", Math.round(result*100)  / 100); // Rounding to the 2nd digit



