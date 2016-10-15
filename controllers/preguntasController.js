var Boom = require('boom');
var Joi = require('joi')

var repos = require('../repositories');

module.exports = [{
    method: 'GET',
    path: '/api/preguntas',
    config: {
      auth: 'simple',
      handler: (req, reply) => {
        repos.preguntas.findAll()
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
    path: '/api/preguntas/{id}',
    config: {
      auth: 'simple',
      handler: (req, reply) => {
        repos.preguntas.findById(req.params.id)
          .then(data => {
            reply(data);
          }).catch(err => {
            console.log(err);
            Boom.badImplementation('terrible implementation');
          });
      }
    }
  }, 
	{
    method: 'POST',
    path: '/api/preguntas',
    config: {
      validate: {
        payload: {
          userId: Joi.string().required(),
          titulo: Joi.string().required(),
          pregunta: Joi.string().required()
        }
      },
      handler: function (request, reply) {
        var Pregunta = {
          userId: request.payload.userId,
          titulo: request.payload.titulo,
          pregunta: request.payload.pregunta
        };
        repos.preguntas.save(Pregunta)
          .then(function (res) {
            reply({
              id: res.insertId
            });
          })
          .catch(function (err) {
            reply(Boom.badRequest(err));
          });
      }

    }
  }
];