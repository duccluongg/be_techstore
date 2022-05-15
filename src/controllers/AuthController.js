const authService = require('../services/AuthService');

class AuthController {
  async register(req, res) {
    try {
      const { username, password, name, email, address, phone_number } =
        req.body;
      const response = await authService.register({
        username,
        password,
        name,
        email,
        address,
        phone_number,
      });
      return res.status(response.status).json(response.data);
    } catch (err) {
      console.log({ err });
      return res.status(500).json({
        status: 500,
        error: 1,
        message: err.message,
        data: null,
      });
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    const response = await authService.login({ username, password });

    return res.status(response.status).json(response.data);
  }

  async refreshToken(req, res, next) {
    const user = req.payload;
    const response = await authService.refreshToken({ user });

    return res.status(200).json(response);
  }

  async profile(req, res, next) {
    const response = await authService.profile({ payload: req.payload });

    return res.status(200).json(response);
  }

  async updateProfile(req, res, next) {
    const response = await authService.updateProfile({
      user: req.payload,
      newInfo: req.body,
    });

    return res.status(200).json(response);
  }
}

module.exports = new AuthController();
