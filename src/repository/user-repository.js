const db = require('../models/index.js');
const users = db.User;


class UserRepository {

     async create(data) {
        try {
            const user = await users.create(data);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getUser(id) {
        try {
            const user = await users.findByPk(id);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async destroy(id) {
        try {
            const user = await users.destroy({
                where:{id : id}
            });
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getAllUser() {
        try {
            const users = await users.findAll();
            return users;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async signIn(Email) {
        try {
            const user = await users.findOne({
                where:{ email: Email }
            });
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

}

module.exports = {
    UserRepository
}