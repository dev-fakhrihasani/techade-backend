import User from '../models/UserModel.js';
import argon2 from 'argon2';

export const getUser = async (req, res) => {
  try {
    // Ambil semua data
    const users = await User.findAll({
      attributes: ['id', 'name', 'email']
    });
    return res.status(200).json(users);
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export const getUserById = async (req, res) => {
  try {
    // Ambil data berdasarkan id
    const id = req.params.id
    const users = await User.findOne({
      attributes: ['id', 'name', 'email'],
      where: { id: id }
    });
    return res.json(users || { message: 'Data tidak ditemukan' });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body
  if (password !== confPassword) return res.status(400).json({ message: "Password tidak cocok!" })
  const hashPassword = await argon2.hash(password)
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role
    })
    res.status(201).json({ message: "Registrasi Berhasil" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id)
  if (!user) return res.status(401).json({ message: "User tidak ditemukan" })

  const { name, email, password, confPassword, role } = req.body
  let hashPassword
  if (password == "" || password == null) {
    hashPassword = user.password
  } else {
    hashPassword = await argon2.hash(password)
  }
  if (password !== confPassword) return res.status(400).json({ message: "Password tidak cocok!" })

  try {
    await User.update({
      name: name,
      email: email,
      password: hashPassword,
      role: role
    }, {
      where: {
        id: user.id
      }
    })
    res.status(200).json({ message: "Update berhasil" })
  }
  catch (error) {
    res.status(400).json({ message: error })
  }
}

export const deleteUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id)
  if (!user) return res.status(401).json({ message: "User tidak ditemukan" })

  try {
    await User.destroy({
      where: {
        id: user.id
      }
    })
    res.status(200).json({ message: "Delete User Berhasil" })
  }
  catch (error) {
    res.status(400).json({ message: error })
  }
}