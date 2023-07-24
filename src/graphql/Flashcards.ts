import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";   
import { NexusGenObjects } from "../../nexus-typegen";  

export const Flashcards = objectType({
    name: "Flashcards", 
    definition(t) {  
        t.nonNull.int("id"); 
        t.nonNull.string("title");
        t.nonNull.string("details");  
    },
});

export const FlashcardsAll = extendType({ 
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {   
            type: "Flashcards",
            resolve(parent, args, context, info) {    
                return context.prisma.flashCard.findMany();
            },
        });
    },
});

export const FlashcardsCreate = extendType({  
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", {  
            type: "Flashcards",  
            args: {  
                title: nonNull(stringArg()),
                details: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) {    
                const newFlashcard = context.prisma.flashCard.create({   
                    data: {
                        title: args.title,
                        details: args.details,
                    },
                });
                return newFlashcard;
            },
        });
    },
});

export const FlashcardsDelete = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("deleteFlashcard", {
            type: "Flashcards",
            args: {
              id: nonNull(intArg()),
            },
            resolve(parent, args, context) {
                const { id } = args;
              return context.prisma.flashCard.delete({
                where: { id },
              });
            },
        });
    },
})

export const FlashcardsUpdate = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("updateFlashcard", {
            type: "Flashcards",
            args: {
              id: nonNull(intArg()),
              title: nonNull(stringArg()),
              details: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
              return context.prisma.flashCard.update({
                where: { id: args.id },
                data: {
                  title: args.title,
                  details: args.details,
                },
              });
            },
        });
    },
})



