const generateToken = require('../helpers/generateToken');
const userRepo = require('../repositories/UserRepository');
const hashPassword = require('../helpers/hashPassword');
const checkPassword = require('../helpers/checkPassword');

class AuthService {
  async register({ username, password, name, email, address, phone_number }) {
    const user = await userRepo.findByUsernameIncludePassword({ username });
    if (user) {
      return {
        status: 400,
        error: 1,
        message: 'username_is_existed',
        data: null,
      };
    }
    const hashPass = hashPassword(password);

    let newUserRegister = await userRepo.register({
      username,
      password: hashPass,
      name,
      email: email ? email : null,
      address: address ? address : null,
      phone_number: phone_number ? phone_number : null,
    });
    if (!newUserRegister) {
      return {
        status: 400,
        error: 2,
        message: 'user_is_not found',
        data: null,
      };
    }

    return {
      status: 200,
      error: 0,
      message: 'register_success',
      data: {
        id: newUserRegister._id,
        username: newUserRegister.username,
        email: newUserRegister.email,
        name: newUserRegister.name,
        address: newUserRegister.address,
        phone_number: newUserRegister.phone_number,
        dob: newUserRegister.dob,
        created_at: newUserRegister.created_at,
        updated_at: newUserRegister.updated_at,
      },
    };

    // return {
    //   id: newUserRegister._id,
    //   username: newUserRegister.username,
    //   email: newUserRegister.email,
    //   name: newUserRegister.name,
    //   address: newUserRegister.address,
    //   phone_number: newUserRegister.phone_number,
    //   dob: newUserRegister.dob,
    //   created_at: newUserRegister.created_at,
    //   updated_at: newUserRegister.updated_at,
    // };
  }

  async login({ username, password }) {
    const user = await userRepo.findByUsernameIncludePassword({ username });
    if (!user)
      return {
        status: 400,
        error: 1,
        message: 'username_not_found_or_password_incorrect',
        data: null,
      };
    if (!checkPassword({ password, hash: user.password })) {
      return {
        status: 400,
        error: 1,
        message: 'username_not_found_or_password_incorrect',
        data: null,
      };
    }

    const token = generateToken.accessToken(user);
    const refreshToken = generateToken.refreshToken(user);

    return {
      status: 200,
      error: 0,
      message: 'login_success',
      data: {
        access_token: token,
        refresh_token: refreshToken,
      },
    };

    // return {
    //   access_token: token,
    //   refresh_token: refreshToken,
    // };
  }

  async refreshToken({ user }) {
    const token = generateToken.accessToken(user);

    // return {
    //   status: 200,
    //   error: 0,
    //   message: "refresh_token_success",
    //   data: {
    //     access_token: token,
    //   },
    // }

    return {
      access_token: token,
    };
  }

  async profile({ payload }) {
    const user = await userRepo.findByUsername({
      username: payload.username,
    });

    if (!user)
      return {
        status: 400,
        error: 1,
        message: 'user_not_found',
        data: null,
      };

    // return {
    //   status: 200,
    //   error: 0,
    //   message: "get_profile_success",
    //   data: user,
    // }

    return user ? user : {};
  }

  async updateProfile({ user, newInfo }) {
    const userUpdate = await userRepo.findByUsernameIncludePassword({
      username: user.username,
    });

    if (!userUpdate)
      return {
        status: 400,
        error: 1,
        message: 'user_not_found',
        data: null,
      };

    if (newInfo.avatar) {
    }

    (userUpdate.name = newInfo.name ? newInfo.name : userUpdate.name),
      (userUpdate.address = newInfo.address
        ? newInfo.address
        : userUpdate.address),
      (userUpdate.email = newInfo.email ? newInfo.email : userUpdate.email),
      (userUpdate.phone_number = newInfo.phone_number
        ? newInfo.phone_number
        : userUpdate.phone_number),
      (userUpdate.dob = newInfo.dob ? newInfo.dob : userUpdate.dob),
      (userUpdate.updated_at = new Date());

    await userUpdate.save();

    // return {
    //   status: 200,
    //   error: 0,
    //   message: "update_profile_success",
    //   data: userUpdate,
    // }

    return userUpdate ? userUpdate : {};
  }
}

module.exports = new AuthService();
