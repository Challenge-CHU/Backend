import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";

const AuthOptions = {
    pages: {
        signIn: "/connexion",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.password || !credentials?.username) {
                    throw new Error("Invalid email or password");
                }
                console.log("credentials ===> ", credentials);
                console.log(
                    "process.env.ADMIN_USERNAME ===> ",
                    process.env.ADMIN_USERNAME
                );

                if (
                    credentials.username !== process.env.ADMIN_USERNAME ||
                    credentials.password !== process.env.ADMIN_PASSWORD
                ) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: 1,
                    username: process.env.ADMIN_USERNAME,
                };
            },
        }),
    ],
    database: process.env.DATABASE_URL,
};

export default AuthOptions;
