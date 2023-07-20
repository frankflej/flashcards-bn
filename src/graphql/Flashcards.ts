import { extendType, nonNull, objectType, stringArg } from "nexus";   
import { NexusGenObjects } from "../../nexus-typegen";  

export const Flashcards = objectType({
    name: "Flashcards", 
    definition(t) {  
        t.nonNull.int("id"); 
        t.nonNull.string("title");
        t.nonNull.string("details");  
    },
});

export const FlashcardsQuery = extendType({ 
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

export const FlashcardsMutation = extendType({  
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", {  
            type: "Flashcards",  
            args: {  
                title: nonNull(stringArg()),
                details: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) {    
                const newFlashcard = context.prisma.flashCard.create({   // 2
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

