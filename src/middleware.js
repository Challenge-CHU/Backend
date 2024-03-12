import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import * as jose from 'jose'

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
)

export async function middleware(req, res) {
    if (req.nextUrl.pathname.startsWith('/api/auth') ||req.nextUrl.pathname.startsWith('/api/challenges/actual')) {
        return NextResponse.next();
    } else if (req.nextUrl.pathname.startsWith('/api')) {
        let token = req.headers.get('authorization');
        if (token) {
            try {
                token = token.replace('Bearer ', '');
                const decoded = await jose.jwtVerify(token, secret);
                req.user = decoded;

                return NextResponse.next();
            } catch (error) {
                return NextResponse.json({error: "Unauthorized"}, {status: 401});
            }
        } else {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});

        }

        return NextResponse.next();
    } else {
        return withAuth({
            pages: {
                signIn: "/connexion",
            },
        })(req, res);
    }
}



