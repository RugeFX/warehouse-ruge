const { firstWhereUsername } = require("./auth.repository")
const bcrypt = require('bcrypt')

const getUser = async(username,password)=>{
        const user = await firstWhereUsername(username)
        if (user === null) {
            throw new Error('User not found');
          }
        const comparePassword = await bcrypt.compare(password,user.password)
        if(comparePassword === false){
            throw new Error ('Password is incorrect !')
        }
        return user
}
module.exports = {
    getUser
}