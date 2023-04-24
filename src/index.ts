// load .env
import 'dotenv/config';

import { ShardClient } from 'detritus-client';
import type { BaseCollection } from 'detritus-client/lib/collections';
import { ClientEvents } from 'detritus-client/lib/constants';
import type { Channel, Webhook } from 'detritus-client/lib/structures';
import type { MatrixClient, RoomEvent } from 'matrix-bot-sdk';
import { MatrixAuth } from 'matrix-bot-sdk';
(async (): Promise<void> => {
  const auth: MatrixAuth = new MatrixAuth(process.env.homeserver as string);

  const discordClient: ShardClient = new ShardClient(
    process.env.discord as string,
    { isBot: true, gateway: { intents: 3276799 } }
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

  let wh: Webhook | undefined = undefined;
  let last_sent: string | undefined = undefined;
  let last_edited: string | undefined = undefined;
  // let mc: MatrixClient | undefined = undefined;

  // discord user => matrix user
  // const userLinker: Map<string, MatrixClient> = new Map<string, MatrixClient>();

  matrixClient.on('room.event', async (roomId: string, event: RoomEvent) => {
    console.log(event);
    if (
      // @ts-expect-error(2023): nope
      marker > event.origin_server_ts ||
      roomId !== process.env.room_id ||
      event.sender === selfId
    ) {
      return;
    }

    // add editing later
    // if (event.content['m.new_content'])

    // console.log(event);

    if (wh === undefined) {
      const whs: BaseCollection<string, Webhook> =
        await channel.fetchWebhooks();

      const zwh: Webhook | undefined = whs.find(
        (v) => v.user?.id === discordClient.userId
      );

      if (zwh !== undefined) {
        wh = zwh;
      } else {
        const nwh: Webhook = await channel.createWebhook({
          name: event.sender
        });

        wh = nwh;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const profile: any = await matrixClient.getUserProfile(event.sender);
    const dataUrl: string = profile.avatar_url as string;

    const realUrl: Buffer = (await matrixClient.downloadContent(dataUrl)).data;

    if (last_sent !== event.sender) {
      try {
        await wh.edit({
          name: `${profile.displayname} (${event.sender})`,
          avatar: realUrl
        });
        last_edited = event.sender;
      } catch {}
    }

    last_sent = event.sender;

    if (last_edited !== event.sender) {
      await wh.createMessage({
        content: `${profile.displayname} (${event.sender}):\n${event.content.body}`,
        allowedMentions: { users: [], roles: [] }
      });
    } else {
      await wh.createMessage({
        content: event.content.body,
        allowedMentions: { users: [], roles: [] }
      });
    }
  });

  discordClient.on(ClientEvents.MESSAGE_CREATE, async (payload) => {
    if (
      payload.message.fromWebhook ||
      payload.message.fromMe ||
      payload.message.channelId !== process.env.channel_id
    ) {
      return void 0;
    }

    const uri: string = await matrixClient.uploadContentFromUrl(
      payload.message.author.avatarUrl
    );

    await matrixClient.setAvatarUrl(uri);
    await matrixClient.setDisplayName(payload.message.author.tag);
    await matrixClient.sendText(
      process.env.room_id as string,
      payload.message.content
    );
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
