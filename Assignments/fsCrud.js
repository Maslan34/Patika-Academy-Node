const fs = require('fs');


setTimeout(() => {
    fs.writeFile('example.json', '{"name": "Employee 1 Name", "salary": 2000}', 'utf8', (err) => {
        console.log("Creating!");  
        if (err) console.log(err);
        console.log("Creating Completed!");  
    });
}, 1000);

 
setTimeout(() => {
    fs.readFile('example.json', 'utf8', (err, data) => { 
        console.log("Reading!"); 
        if (err) console.log(err);                         
        console.log(data);
        console.log("Reading Completed!");                                
    });
}, 3000);


setTimeout(() => {
    fs.writeFile('example.json', '{"name": "Employee 1 Name", "salary": 3000}', 'utf8', (err) => {
        console.log("Updating!");  
        if (err) console.log(err);
        console.log("Updating Completed!");  
    });
}, 5000);




setTimeout(() => {
    fs.readFile('example.json', 'utf8', (err, data) => { 
        console.log("Reading!");  
        if (err) console.log(err);                         
        console.log(data);
        console.log("Reading Completed!");                                
    });
}, 7000);


setTimeout(() => {
    fs.unlink('example.json', (err) => {
        console.log("Deleting!");  
        if (err) console.log(err);
        console.log("Deleted!"); 
    });
}, 9000);
