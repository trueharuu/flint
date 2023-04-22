"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const detritus_client_1 = require("detritus-client");
const constants_1 = require("detritus-client/lib/constants");
const matrix_bot_sdk_1 = require("matrix-bot-sdk");
(async () => {
    const auth = new matrix_bot_sdk_1.MatrixAuth(process.env.homeserver);
    const discordClient = new detritus_client_1.ShardClient(process.env.discord, { isBot: true, gateway: { intents: 'all' } });
    const matrixClient = await auth.passwordLogin(process.env.matrix_user, process.env.matrix_pwd, 'bot');
    const channel = await discordClient.rest.fetchChannel(process.env.channel_id);
    await matrixClient.joinRoom(process.env.room_id);
    const marker = Date.now();
    const selfId = await matrixClient.getUserId();
    matrixClient.on('room.event', async (roomId, event) => {
        if (marker > event.origin_server_ts ||
            roomId !== process.env.room_id ||
            event.sender === selfId) {
            return;
        }
        console.log(event);
        await channel.createMessage(`[${event.sender}] ${event.content.body}`);
    });
    discordClient.on(constants_1.ClientEvents.MESSAGE_CREATE, async (payload) => {
        console.log(payload.message.content);
        if (payload.message.fromWebhook ||
            payload.message.fromMe ||
            payload.message.channelId !== process.env.channel_id) {
            return void 0;
        }
        void await matrixClient.sendMessage(process.env.room_id, {
            body: `[${payload.message.author.tag}]: ${payload.message.content}`,
            msgtype: 'm.text'
        });
    });
    await discordClient.run();
    matrixClient
        .start()
        .then(() => {
        console.log('ok!');
    })
        .catch(console.error);
})();
