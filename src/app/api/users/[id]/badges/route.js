import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	const userId = params.id;

	if (!userId) {
		return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
	}

	try {
		const badges = await prisma.userBadge.findMany({
			where: { user_id: userId },
			include: {
				Badge: true
			}
		});
		return NextResponse.json({ data: badges }, { status: 200 });
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error }, { status: 500 });
	}
	//get all badges from a user
}

