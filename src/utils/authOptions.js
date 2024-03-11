import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import { sign as jwtSign } from 'jsonwebtoken';

const AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"},
            },
            authorize: async (credentials) => {
                if (!credentials?.password || !credentials?.username) {
                    throw new Error("Invalid email or password");
                }
                console.log("credentials ===> ", credentials)
                console.log("process.env.ADMIN_USERNAME ===> ", process.env.ADMIN_USERNAME)

                if(credentials.username !== process.env.ADMIN_USERNAME || credentials.password !== process.env.ADMIN_PASSWORD) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: 1,
                    name: process.env.ADMIN_USERNAME,
                };
            }
        }),
        {
            id: "credentialsMobile",
            name: "CredentialsMobile",
            type: "credentials",
            credentials: {
                identifier: {label: "Identifier", type: "text"},
                challenge_password: {label: "Challenge Password", type: "password"},
            },
            authorize: async (credentials) => {
                if (!credentials?.challenge_password || !credentials?.identifier) {
                    throw new Error("Invalid identifier or challenge password");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        identifier: credentials.identifier,
                    }
                });

                //TODO: possible modifications
                const challenge = await prisma.challenge.findUnique({
                    where: {
                        password: credentials.challenge_password,
                    }
                })

                if (!user) {
                    throw new Error("Invalid identifier or challenge password");
                }

                if (!challenge) {
                    throw new Error("Invalid identifier or challenge password");
                }

                return user;


            }
        }
    ],
    database: process.env.DATABASE_URL,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                const encodedToken = jwtSign(
                    {
                        id: user.id,
                        name: user.name,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );
                token.jwt = encodedToken;
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session(session) {
            console.log("session ===> ", session);
            session.session.jwt = session.token.jwt;
            return session.session;
        },
    },
    pages: {
        signIn: "/connexion",
    },
}

export default AuthOptions;
