import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();
    const challenges = await prisma.challenge.findFirst({
      where: {
        start_date: {
          lte: now,
        },
        end_date: {
          gte: now,
        },
      },
    });

    if (!challenges) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ data: challenges }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
