import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: Number,
      required: true,
      trim: true,
    },
    edad: {
      type: String,
      trim: true,
    },
    tipo_documento: {
      type: String,
      required: true,
      trim: true,
    },
    documento: {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyPassword = async function (passwordForm) {
  return (await passwordForm) === this.password;
};

export default mongoose.model("User", userSchema);
