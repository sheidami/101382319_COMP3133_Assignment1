const bcrypt = require('bcrypt');
const Employee = require("../models/Employee");
const User = require("../models/User");

const resolvers = {
  Query: {
    getEmployees: async () => {
      return await Employee.find({});
    },
    getEmployeeByID: async (parent, args) => {
      return await Employee.findById(args._id);
    },
    login: async (parent, args) => {
      const { username, password } = args;
      const user = await User.findOne(
          { username: username },
       );
      

      if (!user) {
        throw new Error("User not found");
      }

      if (password !== user.password) {
        throw new Error("Invalid password");
      }

      return user;
    }
  },
  Mutation: {
    signup: async (parent, args) => {
      const { username, email, password } = args;
      const newUser = await User.create({
        username: username,
        email: email,
        password: password
      });

      return newUser;
    },
    addEmployee: async (parent, args) => {
      const { first_name, last_name, email, gender, salary } = args;
      
      const newEmployee = new Employee({
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        salary: salary
      });

      return await newEmployee.save();
    },
    updateEmployee: async (parent, args) => {
      const { _id, first_name, last_name, email, gender, salary } = args;
      
      const existingEmployee = await Employee.findById(_id);
      if (!existingEmployee) {
        throw new Error("Employee not found");
      }
      
      return await Employee.findByIdAndUpdate(
        _id,
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          gender: gender,
          salary: salary
        },
        { new: true }
      );
    },
    deleteEmployee: async (parent, args) => {
      const { _id } = args;

      const existingEmployee = await Employee.findById(_id);
      if (!existingEmployee) {
        throw new Error("Employee not found");
      }

      return await Employee.findByIdAndDelete(_id);
    }
  }
};
module.exports = resolvers;