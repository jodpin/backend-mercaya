import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    image:{
      public_id: String,
      url: String
    }
  },
  {
    timestamps: true,
  }
);

//A partir de este esquema vas  atraer de mongoose una
// funcion que se llama model() basado en el product schema

export default mongoose.model("Product", productSchema);
