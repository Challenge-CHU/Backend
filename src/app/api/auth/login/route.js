import prisma from "@/utils/db";
import dayjs from "dayjs";
import * as jose from 'jose';
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(
	process.env.JWT_SECRET
)

const authenticateUser = async (identifier, challenge_id, firebase_device_token) => {
	try {
		const user = await prisma.user.findUnique({
			where: {identifier},
		});

		if (!user) {
			return null;
		}

		const challenge = await prisma.challenge.findUnique({
			where: { id: challenge_id }
		})
		console.log(challenge);
		const isBetweenDates = new Date() >= new Date(challenge.start_date) && new Date() <= new Date(challenge.end_date);

		if(!isBetweenDates) {
			return null;
		}

		await prisma.user.update({
			where: { identifier },
			data: {
				firebase_device_token
			}
		})

		return user;
	} catch (error) {
		console.log(error);
		return null;

	}
}

export async function POST(req, res) {
	const { identifier, challenge_id, firebase_device_token } = await req.json();

	try {
		const user = await authenticateUser(identifier, challenge_id, firebase_device_token);

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const token = jose.SignJWT(
			{ id: user.id, identifier: user.identifier },
		).setIssuedAt().setProtectedHeader({ alg: 'HS256' }).sign(secret);

		return NextResponse.json({ token }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
