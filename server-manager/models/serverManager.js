const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ServerSchema = new Schema({
  servername: { type: String },
  publicDNS: { type: String },
  ipv4: { type: String },
  country: { type: String }
});

module.exports = mongoose.model("Server", ServerSchema);
