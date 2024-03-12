import CredentialsProvider from "next-auth/providers/credentials";
import * as jose from 'jose';

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

                const user = {
                    id: 1,
                    name: process.env.ADMIN_USERNAME,
                    email: ""
                }
                console.log('user defini ====>', user);

                return user;
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.jwt = await new jose.SignJWT(
                { id: token.id, name: token.name },
            ).setIssuedAt().setProtectedHeader({ alg: 'HS256' }).sign(new TextEncoder().encode(process.env.JWT_SECRET))
            return session
        },
    },
    pages: {
        signIn: "/connexion",
    },
}

export default AuthOptions;
