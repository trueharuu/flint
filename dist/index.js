"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const detritus_client_1 = require("detritus-client");
const constants_1 = require("detritus-client/lib/constants");
const matrix_bot_sdk_1 = require("matrix-bot-sdk");
(async () => {
    const auth = new matrix_bot_sdk_1.MatrixAuth(process.env.homeserver);
    const discordClient = new detritus_client_1.ShardClient(process.env.discord, { isBot: true, gateway: { intents: 3276799 } });
    const matrixClient = await auth.passwordLogin(process.env.matrix_user, process.env.matrix_pwd, 'bot');
    const channel = await discordClient.rest.fetchChannel(process.env.channel_id);
    await matrixClient.joinRoom(process.env.room_id);
    const marker = Date.now();
    const selfId = await matrixClient.getUserId();
    let wh = undefined;
    let last_sent = undefined;
    let last_edited = undefined;
    matrixClient.on('room.event', async (roomId, event) => {
        console.log(event);
        if (marker > event.origin_server_ts ||
            roomId !== process.env.room_id ||
            event.sender === selfId) {
            return;
        }
        if (wh === undefined) {
            const whs = await channel.fetchWebhooks();
            const zwh = whs.find((v) => v.user?.id === discordClient.userId);
            if (zwh !== undefined) {
                wh = zwh;
            }
            else {
                const nwh = await channel.createWebhook({
                    name: event.sender
                });
                wh = nwh;
            }
        }
        const profile = await matrixClient.getUserProfile(event.sender);
        const dataUrl = profile.avatar_url;
        const realUrl = (await matrixClient.downloadContent(dataUrl)).data;
        if (last_sent !== event.sender) {
            try {
                await wh.edit({
                    name: `${profile.displayname} (${event.sender})`,
                    avatar: realUrl
                });
                last_edited = event.sender;
            }
            catch { }
        }
        last_sent = event.sender;
        if (last_edited !== event.sender) {
            await wh.createMessage({
                content: `${profile.displayname} (${event.sender}):\n${event.content.body}`,
                allowedMentions: { users: [], roles: [] }
            });
        }
        else {
            await wh.createMessage({
                content: event.content.body,
                allowedMentions: { users: [], roles: [] }
            });
        }
    });
    discordClient.on(constants_1.ClientEvents.MESSAGE_CREATE, async (payload) => {
        if (payload.message.fromWebhook ||
            payload.message.fromMe ||
            payload.message.channelId !== process.env.channel_id) {
            return void 0;
        }
        const uri = await matrixClient.uploadContentFromUrl(payload.message.author.avatarUrl);
        await matrixClient.setAvatarUrl(uri);
        await matrixClient.setDisplayName(payload.message.author.tag);
        await matrixClient.sendText(process.env.room_id, payload.message.content);
    });
    await discordClient.run().then(() => {
        console.log('ok! 1');
    });
    matrixClient
        .start()
        .then(() => {
        console.log('ok! 2');
    })
        .catch(console.error);
})();
