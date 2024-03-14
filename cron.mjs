import { PrismaClient } from "@prisma/client";
import { Expo } from 'expo-server-sdk';

const prisma = new PrismaClient();
const expo = new Expo();

async function sendNotification() {
    try {
        const users = await prisma.user.findMany();
        const usersFirebaseToken = users.map(user => user.firebase_device_token);
        const filteredUsersFirebaseToken = usersFirebaseToken.filter(token => !!token);

        let messages = [];
        filteredUsersFirebaseToken.forEach(token => {
            console.log(token)
            messages.push({
                to: `ExponentPushToken[${token}]`,
                sound: 'default',
                body: 'Veuillez vous connecter afin de synchroniser vos pas',
                data: {
                    'content-available': 1,
                },
            });
        });

        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        await (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                    // NOTE: If a ticket contains an error code in ticket.details.error, you
                    // must handle it appropriately. The error codes are listed in the Expo
                    // documentation:
                    // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    } catch (error) {
        console.log(error);
    }
}

sendNotification();