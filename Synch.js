const UserService = require('./services/user-service')

exports.synchUsers = async function() {
    const users = require('./assets/users.json');
    const usersdb = await UserService.getUsers();

    for (let key in users) {
        let user = users[key];
        let check = 0;
        for (let keydb in usersdb) {
            if (usersdb[keydb]["id_ext"] === user["id"]) {
                check = keydb;
                break;
            }
        }
        let userpush =
            {
                firstName: user["prenom"],
                lastName: user["nom"],
                email: user["adresses"]["email"],
                id_ext: user["id"],
            };
        if (user["adresses"]["domicile"] !== "--")
            userpush["domicile"] = user["adresses"]["domicile"];
        if (check !== 0)
            UserService.updateUser(check, userpush);
        else
            UserService.persistUser(userpush);
    }
}