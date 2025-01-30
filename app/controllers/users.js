const {query} = require('../services/db');
const { CustomError } = require('../utility/custom-errors');
const Password = require('../utility/hash-password');
const {encryptPassword, decryptPassword} = require('../utility/hash-password');
const jwt = require('../utility/jwt')

module.exports = class  UserController {

     /**
     * @description  inserts college and admin into database
     * @param {req.body} document - request body 
     * @returns {Promise} - returns success or failure response
     */

     static async signup(document) {
        const { username, password, role } = document || {};
    
        if (!username || !password || !role ) {
            throw new CustomError('INVALID PAYLOAD', 'Required data is missing', 400);
        }

        const hashedPassword = await Password.encryptPassword(password);

        // const haspas = await encryptPassword(password)
        // console.log(haspas)

        const [users] = await query(
            `INSERT INTO users (username ,password, role) 
             VALUES ($1, $2, $3) RETURNING *;`, 
            [username, hashedPassword, role]
        );
    
        return users;
    }

    static async login(document) {
        const {username ,password ,role} = document || {}
        console.log(document)
        if(!username || !password || !role){
            throw new CustomError("INVALID PAYLOAD","required data is missing",400)
        }

        const [user] = await query(`SELECT * FROM users WHERE username = $1 LIMIT 1`,
            [username]);

        if (!user) {
        throw new CustomError("USER NOT FOUND", "user is not registered", 404);
        }


        const isPasswordMatching = await Password.comparePassword(password, user.password)
        if (!isPasswordMatching) {
            throw new CustomError("INVALID_PASSWORD","invalid username or password", 404);
            }


        const token = jwt.generateToken({
            id: user.id,
        });

        user.password=undefined;

        return {
            token,
            user
        };
    }

    static async update_password(document){
        const { username , password , new_password } = document || {}
        if(!username || !password){
            throw new CustomError('INVALID PAYLOAD','missing field is required',400)
        }

    let [user] = await query('select * from users where username=$1',[username])
    

    console.log(user)
    
    if (!user) {
    // throw error
    }

    //lets compare password
    const isPasswordMatching = await Password.comparePassword(password, user.password)
    console.log(new_password)
    if (!isPasswordMatching) {
        throw new CustomError("INVALID_PASSWORD","invalid current password", 404);
        }

        //create a new password
        const hashedPassword = await Password.encryptPassword(new_password) 

        console.log(hashedPassword)

        // await query(`update users SET password = $1,update_password = $2 where id = $3 returning *
        // `, [hashedPassword,true,user.id])

        await query(
            `UPDATE users 
            SET password = $1, 
                update_password = $2 
            WHERE id = $3 
            RETURNING *`, 
            [hashedPassword, true, user.id]
          );
          

        return {
            user
        };
    }
    
}