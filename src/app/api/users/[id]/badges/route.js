import prisma from "@/utils/db";
import { NextResponse } from "next/server";

function removeSpacesAndAccent(str) {
	const strNoAccents = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	const strCapitalized = strNoAccents.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
	return strCapitalized.replace(/\s+/g, '');
}

export async function GET(req, { params }) {
	const userId = params.id;

	if (!userId) {
		return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
	}

	try {
		const badges = await prisma.badge.findMany({
			include: {
				BadgeCategory: true,
				BadgeFamily: true
			}
		});

		const userBadges = await prisma.userBadge.findMany({
			where: {
				user_id: userId
			}
		});

		const allBadges = badges.map(badge => {
			const userBadge = userBadges.find(userBadge => userBadge.badge_id === badge.id);
			return {
				...badge,
				labelImage: removeSpacesAndAccent(badge.name),
				earned: !!userBadge
			}
		});



		console.log(allBadges)
		return NextResponse.json({ data: allBadges }, { status: 200 });
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error }, { status: 500 });
	}
	//get all badges from a user
}

