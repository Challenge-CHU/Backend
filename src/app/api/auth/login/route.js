import prisma from "@/utils/db";
import * as jose from "jose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const authenticateUser = async (
    identifier,
    challenge_id,
    password,
    firebase_device_token
) => {





    try {

        const challenge = await prisma.challenge.findUnique({
            where: { id: challenge_id },
        });

        const match = await bcrypt.compare(password, challenge.password);

        if (!match) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: { identifier },
        });

        if (!user) {
            return null;
        }

        // console.log(challenge);
        const isBetweenDates =
            new Date() >= new Date(challenge.start_date) &&
            new Date() <= new Date(challenge.end_date);

        if (!isBetweenDates) {
            return null;
        }

        await prisma.user.update({
            where: { identifier },
            data: {
                firebase_device_token,
            },
        });

        return user;
    } catch (error) {
        return null;
    }
};

export async function POST(req, res) {
    const { identifier, challenge_id, password, firebase_device_token } =
        await req.json();
    try {
        const user = await authenticateUser(
            identifier,
            challenge_id,
            password,
            firebase_device_token
        );

        if (!user) {
            return NextResponse.json(
                { error: "Bad password or user" },
                { status: 400 }
            );
        }

        const token = await new jose.SignJWT({
            id: user.id,
            identifier: user.identifier,
        })
            .setIssuedAt()
            .setProtectedHeader({ alg: "HS256" })
            .sign(secret);

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
