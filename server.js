require('dotenv/config')
const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to DataBase"))
.catch(err => console.log({
    message: 'Mongodb Connection Failed',
    errorMessage: err.message
}))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening to http://localhost:${port}`))