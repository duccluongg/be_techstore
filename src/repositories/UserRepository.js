const Models = require('../models');

class UserRepository {
  async findById({ _id }) {
    const user = await Models.User.findOne({ _id });
    user.password = null;

    return user;
  }

  async findByUsername({ username }) {
    const user = await Models.User.findOne({ username });
    user.password = null;

    return user;
  }

  async findByUsernameIncludePassword({ username }) {
    const user = await Models.User.findOne({ username });

    return user;
  }

  async register({ username, password, name, email, address, phone_number }) {
    let newUser = new Models.User({
      username,
      password,
      name,
      email,
      address,
      phone_number,
    });
    newUser.save();

    return newUser;
  }

  async getListPaginate() {
    const users = await Models.User.paginate().then((result) => {
      return result;
    });

    return {
      links: {
        next: users.nextPage,
        previous: users.prevPage,
      },
      total: users.totalDocs,
      page: users.page,
      page_size: users.limit,
      results: users.docs,
    };
  }

  async deleteUser({ _id }) {
    const user = await Models.User.findOne({ _id });
    if (!user) return 'Error, user not found';

    await Models.User.deleteOne({ _id });

    return true;
  }
}

module.exports = new UserRepository();
