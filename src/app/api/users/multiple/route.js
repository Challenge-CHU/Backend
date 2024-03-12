import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
	// retrieve an array of users from the request body to create in the database if don't exist
	const users = await req.json();
	console.log(users);
	const usersToCreate = users.map((user) => {
		return {
			identifier: user,
			pseudo: user,
		};
	});
	console.log(usersToCreate);

	try {
		// create the users in the database
		const createdUsers = await prisma.user.createMany({
			data: usersToCreate,
			skipDuplicates: true,
		});
		// return the created users
		return NextResponse.json({ data: createdUsers }, { status: 201 });
	} catch (error) {
		// return an error if something went wrong
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}

}
