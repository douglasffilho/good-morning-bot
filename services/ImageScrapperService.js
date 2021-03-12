const axios = require('axios');
const cheerio = require('cheerio');
const { imagesBaseUrl, defaultImageUrl, imagesStorageUrl } = require('../config');
const log = require('../utils/Log')('ImageScrapperService');

const requests = axios.default.create({
    baseURL: imagesBaseUrl
});

const getImageFromWebPage = (response) => {
    const $ = cheerio.load(response.data);
    const images = [];

    $('img').each((idx, element) => {
        const image = $(element).attr()['data-src'];

        if (image && !image.includes('logo') && image.includes(imagesStorageUrl))
            images.push(image);
    });

    if (images.length > 0) {
        const index = Math.floor(Math.random() * images.length + 1);
        return images[index];
    }

    return defaultImageUrl;
};

const ImageScrapperService = {
    async getImageUrl(dayOfWeek) {
        const searchLocation =
            {
                FRI: 'sexta-feira'
            }[dayOfWeek] || '';

        return requests
            .get(`/${searchLocation}`)
            .then(getImageFromWebPage)
            .catch((error) => {
                log.error('%o', error);
                return defaultImageUrl;
            });
    }
};

module.exports = ImageScrapperService;
