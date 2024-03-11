import CredentialsProvider from "next-auth/providers/credentials";

const AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: "/connexion",
    // },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                console.log("credentials ===> ", credentials);
                if (!credentials?.password || !credentials?.username) {
                    throw new Error("Invalid email or password");
                }
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
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session(session, token) {
            session.user.id = token.id;
            session.user.email = token.email;
            return session;
        },
    },
};

export default AuthOptions;
