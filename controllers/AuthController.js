import User from "../models/UserModel.js";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    // Cari input user berdasarkan email
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    // cek kesamaan password input dgn database
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    // construct data user untuk akses token
    const userId = user.id;
    const name = user.name;
    const email = user.email;

    // generate access & refresh token
    const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30S'
    });
    const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    // push data refresh token ke dalam database user
    await User.update({ refresh_token: refreshToken }, {
      where: {
        id: userId
      }
    });

    // buat cookie bernama refreshToken
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      /*secure: true*/
    });

    // response berupa access token
    res.json({ accessToken });

  }

  catch (error) {
    res.status(404).json({ message: "Email tidak ditemukan" });
  }
}

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204)
  const user = await User.findOne({
    where: {
      refresh_token: refreshToken
    }
  })

  if (!user) return res.sendStatus(204)
  const userId = user.id
  await User.update({ refresh_token: null }, {
    where: {
      id: userId
    }
  })
  res.clearCookie('refreshToken')
  return res.sendStatus(200)
}