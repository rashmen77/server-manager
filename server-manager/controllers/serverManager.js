const Server = require("../models/serverManager");

exports.createServer = async (req, res) => {
  const { servername, publicDNS, ipv4, country } = req.body;

  const server = new Server({
    servername: servername,
    publicDNS: publicDNS,
    ipv4: ipv4,
    country: country
  });

  server.save(async err => {
    if (err) {
      return res.status(422).send({ success: false, message: "Bad data!" });
    }
    const allServers = await Server.find();

    return res.json({ success: false, payload: allServers });
  });
};

exports.getAllServer = async (req, res) => {
  const allServers = await Server.find();
  console.log("server", allServers);
  return res.json({ success: false, data: allServers });
};
