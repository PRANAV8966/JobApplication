const { AdminRepository } = require('../repository/admin-repository.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/server-config.js');

class AdminService {

     constructor() {
        this.adminService =  new AdminRepository();
    }

     async create(data) {
        try {
            const admin = await this.adminService.create(data);
            return admin;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getAdmin(id) {
        try {
            const admin = await this.adminService.getUser(id);
            return admin;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async destroy(id) {
        try {
            const admin = await this.adminService.destroy(id);
            return admin;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getAllAdmins() {
        try {
            const admins = await this.adminService.getAllUser();
            return admins;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async signIn(data) {
        try {
            const admin = await this.adminService.signIn(data.email);
            if (!admin) {
                throw {error:'404:user not found!!'}
            }
            const status = await this.#checkPassword(data.password, admin.password);

            if(!status) {
                throw {error:'incorrect user details'};
            }

            const newToken = await this.createToken({email:admin.email, id:admin.id});
            return {...admin, newToken};
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

    createToken(user) {
        try {
            const token = jwt.sign(user, jwtKey, {expiresIn: '1h'});
            return token;
        } catch (error) {
            console.log("failed to create token");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, jwtKey);
            return response;
        } catch (error) {
            console.log("failed to validate token",);
            throw error;
        }
    }

    #checkPassword(adminPlainInputPassword, encryptedPassword) {
        try {
            const response = bcrypt.compareSync(adminPlainInputPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log('password validation failed');
            throw error;
        }
    }
}

module.exports = {
    AdminService
}