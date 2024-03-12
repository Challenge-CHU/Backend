import { NextResponse } from "next/server";
import prisma from "../../../utils/db";

import { Expo } from 'expo-server-sdk';

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo();
export async function GET(req, res) {
    try {

        let messages = [];
        messages.push({
            to: "ExponentPushToken[WuDPMrAxyHUiA_bo3GAcUU]",
            sound: 'default',
            body: 'This is a test notification',
            data: {
                'content-available': 1,
            },
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
        return NextResponse.json({ data: tickets }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
