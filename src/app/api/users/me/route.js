import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import * as jose from 'jose';


const secret = new TextEncoder().encode(
	process.env.JWT_SECRET
)

export async function GET(req){
	const authorization = req.headers.get('authorization');
	const token = authorization.replace('Bearer ', '');

	const decoded = await jose.jwtVerify(token, secret);
	const userId = decoded.payload.id;

	const user = await prisma.user.findUnique({
		where: { id: userId }
	});

	const steps = await prisma.step.findMany({
		where: {
			user_id: userId
		},
		orderBy: {
			date: 'desc'
		},
		take: 1
	});

	user.lastStep = steps[0];



	return NextResponse.json({data: user}, {status: 200});
}
