const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: "Email debe estar en un formato válido!",
      },
    },

    phone: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: "El numero de teléfono debe tener 8 dígitos!",
      },
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
