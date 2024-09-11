import {PrismaClient} from '@prisma/client'


//This is a global declaration file for prisma client
//This is used to make prisma client available globally
//It is used to avoid multiple instances of prisma client
declare global {
    var prisma: PrismaClient | undefined;
};


const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;