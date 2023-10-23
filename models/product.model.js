import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    posicion: {
      type: String,
      trim: true,
    },
    categoria: {
      type: String,
      trim: true,
    },
    precioCompra: {
      type: String,
      trim: true,
    },
    precioVenta: {
      type: String,
      trim: true,
    },
    imagen: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

//A partir de este esquema vas  atraer de mongoose una
// funcion que se llama model() basado en el product schema

export default mongoose.model("Producto", productSchema);
