const express = require('express')
const app = express()
const cors = require('cors')
const admin = require('firebase-admin')
const serviceAccount = require("./secret/serviceAccountKey.json");

const Synch = require('./Synch.js');
const UserService = require('./services/user-service')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-test-3d575.firebaseio.com"
})

app.use(cors())

app.get('/users', async (req, res) => {
    const users = await UserService.getUsers()
    res.status(200).json(users)
})

app.get('/simulatedApi/users', (req, res) => {
    const users = require('./assets/users.json')
    res.status(200).json(users)
})

app.get('/reset', async (req, res) => {
    const users = require('./assets/reset-users.json')
    await UserService.resetUsers(users)
    res.status(200).json({ message: "Successfully reseted database" })
})


app.get('/synchro', async (req, res) =>
{
    Synch.synchUsers();
    res.status(200).json({message: "Successfully updated database !"});

})


app.listen(8080, 'localhost', () => {
    console.log('Listening on http://localhost:8080')
})