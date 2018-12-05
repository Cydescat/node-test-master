const admin = require('firebase-admin')

const UserService = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            admin.database().ref('users').once('value',
                snapshot => {
                    resolve(snapshot.val())
                }, error => {
                    reject(error)
                })
        })
    },
    persistUser: (user) => {
        return admin.database().ref('users').push(user);
    },
    updateUser: (userId, user) =>
    {
        return admin.database().ref('users').child(userId).set(user);
    },
    resetUsers: async (users) => {
        await admin.database().ref('users').set(null) // Supprimer les users
        let promises = []
        for (let user of users) {
            promises.push(UserService.persistUser(user))
        }
        return Promise.all(promises)
    },
}

module.exports = UserService