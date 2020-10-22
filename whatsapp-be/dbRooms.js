import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
  name: String,
});

// collection
export default mongoose.model("rooms", whatsappSchema);
