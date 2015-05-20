// Load required packages
var Client = require('../models/Client');

// Create endpoint /api/client for POST
exports.postClients = function(req, res) {
  // Create a new instance of the Client model
  var client = new Client();
  console.log('postClients');
  // Set the client properties that came from the POST data
  client.name = req.body.name;
  client.id = req.body.client_id;
  client.secret = req.body.client_secret;
  client.userId = req.user._id;

  // Save the client and check for errors
  client.save(function(err) {
    if (err)
      return (err.code && err.code === 11000) ? res.send({ code: err.code, message: 'Client already exists'}) :  res.send(err);

    res.json({ code: 0, message: 'Client added to the locker!', data: client });
  });
};

// Create endpoint /api/clients for GET
exports.getClients = function(req, res) {
  // Use the Client model to find all clients
  Client.find({ userId: req.user._id }, function(err, clients) {
    if (err)
      return res.send(err);

    res.json(clients);
  });
};