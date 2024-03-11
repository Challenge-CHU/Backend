import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";

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
                    username: process.env.ADMIN_USERNAME,
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

                return {
                    id: user.id,
                    identifier: user.identifier,

                };


            }
        }
    ],
    database: process.env.DATABASE_URL,
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            console.log("token ===> ", token);
            return token;
        },
        async session(session, token) {
            session.user.id = token.id;
            session.user.email = token.email;
            return session;
        }
    },
    pages: {
        signIn: "/connexion",
    },
}

export default AuthOptions;
