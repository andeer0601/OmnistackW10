const Dev = require('../models/dev')
const parseStringAsArray = require('../models/utils/parseStringAsArray')

module.exports = {

    async index(request, response) {
        // Buscar todos os Devs num raio de 10Km
        // Filtro por Tecnologia

        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });

    }
}