import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

// Membuat schema
// const "nama model" = db.define("nama tabel", {isi tabel}, {parameter tambahan})
const User = db.define('users', {
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  /* command di bawah ini untuk membuat relasi */

  // role_id: {
  //   allowNull: false,
  //   type: DataTypes.INTEGER,
  //   foreignKey: true
  // },
  refresh_token: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
});

/* command di bawah ini untuk membuat relasi */

// Role.hasMany(User, {
//   foreignKey: 'role_id'
// })
// User.belongsTo(Role)

export default User;