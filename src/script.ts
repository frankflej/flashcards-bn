
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


async function main() {
    const newLink = await prisma.flashCard.create({
        data: {
          title: 'Api',
          details: 'An API, or Application Programming Interface, is a set of rules and protocols that allows different software applications to communicate and interact with each other. It defines the methods and data formats that applications can use to request and exchange information.',
        },
      })

    const allLinks = await prisma.flashCard.findMany();
    console.log(allLinks);
}


main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
});