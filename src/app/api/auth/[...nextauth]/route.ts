import { UserModel } from '@/models/User';
import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                name: {
                    label: 'Name',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '********',
                },
            },
            async authorize(credentials) {
                const name = credentials?.name;
                const password = credentials?.password;

                if (typeof name !== 'string' || typeof password !== 'string') {
                    return null;
                }

                const user = await UserModel.findOne({ name: name });

                if (user !== null && user !== undefined) {
                    if (await compare(password, user.passwordHash)) {
                        return user;
                    }
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
