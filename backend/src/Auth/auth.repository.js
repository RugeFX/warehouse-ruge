const prisma = require("../db");

const firstWhereUsername = async (username) =>{
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        return user
}

module.exports = {
    firstWhereUsername
}