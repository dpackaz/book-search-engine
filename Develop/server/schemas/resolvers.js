// import user model
const { User, Book } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
// import authentication error function from Apollo server package
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne(
                    {_id: context.user.id}
                )
                .select("-__v -password")
                .populate("books");
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
    },
    Mutation: {
        login:
        addUser:
        saveBook:
        removeBook:
    }
};

module.exports = resolvers;