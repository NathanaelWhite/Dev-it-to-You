const { AuthenticationError } = require('apollo-server-express');
const { User, Tags } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('connections');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id })
        .select('-__v -password')
        .populate('connections');
    },
    allUsers: async (_, args, context) => {
      const currentUser = await User.findOne({ _id: context.user._id }).select(
        'connections'
      );
      const connectionsArry = currentUser.connections.map((user) => {
        return user._id;
      });

      const usersData = await User.find({
        $and: [
          { _id: { $ne: context.user._id } },
          { _id: { $nin: connectionsArry } },
        ],
      }).populate('connections');
      return usersData;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);

        console.log(user);
        return { token, user };
      } catch (err) {
        console.log(err);
      }
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
    removeConnection: async (parent, { connectionId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { connections: connectionId } },
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
