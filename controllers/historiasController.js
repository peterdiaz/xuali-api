var Boom = require('boom');
var Joi = require('joi')

var repos = require('../repositories');

module.exports = [{
  method: 'GET',
  path: '/api/historias',
  config: {
    auth: 'simple',
    handler: (req, reply) => {
      repos.historias.findAll()
        .then(data => {
          reply(data);
        }).catch(err => {
          console.log(err);
          Boom.badImplementation('terrible implementation');
        });
    }
  }
}, {
  method: 'GET',
  path: '/api/test',
  config: {
    handler: (req, reply) => {
      reply({'message': 'Esta funcionando la API' });
    }
  }
}];