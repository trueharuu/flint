// load .env
import 'dotenv/config';

import { ShardClient } from 'detritus-client';
import { ClientEvents } from 'detritus-client/lib/constants';
import type { Channel } from 'detritus-client/lib/structures';
import type { MatrixClient } from 'matrix-bot-sdk';
import { MatrixAuth } from 'matrix-bot-sdk';

(async (): Promise<void> => {
  const auth: MatrixAuth = new MatrixAuth(process.env.homeserver as string);

  const discordClient: ShardClient = new ShardClient(
    process.env.discord as string,
    { isBot: true, gateway: { intents: 'all' } }
  );

  const matrixClient: MatrixClient = await auth.passwordLogin(
    process.env.matrix_user as string,
    process.env.matrix_pwd as string,
    'bot'
  );

  const channel: Channel = await discordClient.rest.fetchChannel(
    process.env.channel_id as string
  );

  await matrixClient.joinRoom(process.env.room_id as string);

  const marker: number = Date.now();

  const selfId: string = await matrixClient.getUserId();

  matrixClient.on('room.event', async (roomId: string, event: unknown) => {
    if (
      // @ts-expect-error(2023): nope
      marker > event.origin_server_ts ||
      roomId !== process.env.room_id ||
      // @ts-expect-error(2023): nope
      event.sender === selfId
    ) {
      return;
    }

    console.log(event);

    // @ts-expect-error(2023): nope
    await channel.createMessage(`[${event.sender}] ${event.content.body}`);
  });

  discordClient.on(ClientEvents.MESSAGE_CREATE, async (payload) => {
    console.log(payload.message.content);
    if (
      payload.message.fromWebhook ||
      payload.message.fromMe ||
      payload.message.channelId !== process.env.channel_id
    ) {
      return void 0;
    }

    void await matrixClient.sendMessage(process.env.room_id as string, {
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
