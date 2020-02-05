const Server = require("../models/serverManager");

exports.createServer = async (req, res) => {
  const { servername, publicDNS, ipv4, country } = req.body.serverDetail;

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

    return res.json({ success: true, data: allServers });
  });
};

exports.getAllServer = async (req, res) => {
  const allServers = await Server.find();

  return res.json({ success: true, data: allServers });
};

exports.deleteServer = async (req, res) => {
  try {
    await res.server.remove();
    const allServers = await Server.find();
    return res.json({ success: true, data: allServers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateServer = async (req, res) => {
  const { servername, publicDNS, ipv4, country } = req.body.serverDetail;

  if (servername === "") {
    res.server.servername = servername;
  }

  if (publicDNS === "") {
    res.server.publicDNS = publicDNS;
  }

  if (ipv4 === "") {
    res.server.ipv4 = ipv4;
  }

  if (country === "") {
    res.server.country = country;
  }

  try {
    await res.sever.save();
    const updatedServer = await Server.find();
    return res.json({ success: true, data: updatedServer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
