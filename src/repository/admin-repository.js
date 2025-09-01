const db = require('../models/index.js');
const admin = db.Admin;

class AdminRepository {

     async create(data) {
        try {
            const user = await admin.create(data);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getUser(id) {
        try {
            const user = await admin.findByPk(id);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async destroy(id) {
        try {
            const user = await admin.destroy({
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
            const users = await admin.findAll();
            return users;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async signIn(Email) {
        try {
            const user = await admin.findOne({
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
    AdminRepository
}