const express = require('express')
const app = express()
const port = 3000
const path = require('path')

// Static Files 

app.use(express.static(path.join(__dirname, 'public')))

// Static Files


app.get('/', (req, res) => {
  res.sendFile("index.html",{root:path.join(__dirname)}, function (err) {
    if (err) {
        console.error('Error sending file:', err);
    } else {
        console.log('Sent:', "index.html");
    }
});
})

app.listen(port, () => {
  console.log(`Misfit App Listening on Port ${port}`)
})