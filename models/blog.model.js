import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  contenido: {
    type: String,
    trim: true,
  },
  image: {
    public_id: String,
    url: String,
  },
  
}, {
    timestamps: true
});

export default mongoose.model("Posts", blogSchema);

