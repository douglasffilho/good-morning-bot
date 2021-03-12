const axios = require('axios');
const ImageScrapperService = require('./ImageScrapperService');
const { slackToken, api } = require('../config');
const log = require('../utils/Log')('SlackService');

const requests = axios.default.create({
    baseURL: api,
    headers: {
        Authorization: `Bearer ${slackToken}`
    }
});

const listChannels = async (foundChannels, cursor) => {
    if (cursor === null) return { channels: foundChannels, cursor: null };

    return requests
        .get(`/conversations.list?types=public_channel,private_channel&cursor=${cursor || ''}`)
        .then((response) => {
            const { data } = response || { data: null };
            const { ok, channels, response_metadata } = data || {
                ok: false,
                channels: [],
                response_metadata: null
            };
            cursor = response_metadata ? response_metadata.next_cursor : null;
            if (cursor === '') cursor = null;

            if (ok && channels) {
                const simpleChannels = channels.map((channel) => {
                    const { name, id, is_member } = channel;
                    return { name, id, is_member };
                });

                const memberChannels = simpleChannels.filter(
                    (channel) => channel.is_member
                );

                return listChannels(
                    foundChannels.concat(memberChannels),
                    cursor
                );
            }

            return { channels: foundChannels, cursor };
        })
        .catch((error) => {
            log.error('%o', error);
            return { channels: foundChannels, cursor: null };
        });
};

const SlackService = {
    async sayGoodMorning(dayOfWeek) {
        const imageUrl = await ImageScrapperService.getImageUrl(dayOfWeek);

        return listChannels([]).then(response => {
            const { channels } = response;
            log.info('%o', channels);
            const channelTalkRequests = channels.map(channel => {
                return requests.post(`/chat.postMessage?as_user=true&channel=${channel.id}&text=${imageUrl}`);
            });

            return Promise.all(channelTalkRequests);
        });
    }
};

module.exports = SlackService;
