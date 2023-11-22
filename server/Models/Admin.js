const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    Branch: {
      type: String,
      required: true,
      enum: ["Buyer", "Buying Agency", "Factory", "QC Agency"],
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      value: {
        type: String,
        required: true,
      },
      verify: {
        type: Boolean,
        required: true,
      },
    },
    PNumber: {
      type: Number,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
