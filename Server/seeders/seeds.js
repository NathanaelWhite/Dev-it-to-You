const faker = require("faker");

const db = require("../config/connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 25; i += 1) {
    const firstName = faker.internet.firstName();
    const lastName = faker.internet.lastName();
    const email = faker.internet.email(firstName);
    const password = faker.internet.password();
    const description = faker.lorem.words(
      math.randomUserIndex(Math.random() * 20) + 1
    );

    userData.push({ firstName, lastName, email, password, description });
  }

  const createdUsers = await User.collection.insertMany(userData);

  console.log("all done!");
  process.exit(0);
});
