import { betterAuth, Session as BetterAuthSession, Session, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    user: {
        additionalFields: {
            role: {
                type: "string"
            }
        }
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },

},
);




// i made some changes on the schema of the prisma 
// i added the verification status 