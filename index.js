// const route = require('./route');
const connectToMongo = require('./db');
connectToMongo();

// Node server configuration
const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

// app.use('/route', route);

// route
app.use('/location', require('./route/location_process'))
app.use('/technology', require('./route/technology_process'))
app.use('/service', require('./route/service_process'))
app.use('/experience', require('./route/experience_process'))
app.use('/salary', require('./route/salary_process'))
app.use('/companydetails', require('./route/comdetails_process'))
app.use('/training', require('./route/Training_process'))




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})