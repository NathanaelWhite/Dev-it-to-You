const { AuthenticationError } = require('apollo-server-express');
const { User, Tags } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('tags');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async (parent, args, context) => {
      let page = args.page;
      if (context.user) {
        const usersData = await User.paginate({}, { page: page, limit: 10 })
          .select('-__v -password')
          .populate('tags');
        return usersData;
      }
      throw new AuthenticationError('Not logged in');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('tags');
    },
    allUsers: async () => {
      const usersData = await User.find().populate('tags');
      return usersData;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addConnection: async (parent, { connectionId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { connections: connectionId } },
          { new: true }
        ).populate('connections');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          args,
          { new: true }
        ).populate('connections');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
