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

let flashcards: NexusGenObjects["Flashcards"][]= [   
    {
        id: 1,
        title: "www.howtographql.com",
        details: "Fullstack tutorial for GraphQL",
    },
    {
        id: 2,
        title: "graphql.org",
        details: "GraphQL official website",
    },
];

export const FlashcardsQuery = extendType({ 
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {   
            type: "Flashcards",
            resolve(parent, args, context, info) {    
                return flashcards;
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
                const { title, details } = args; 
                
                let idCount = flashcards.length + 1;  
                const flashcard = {
                    id: idCount,
                    details: details,
                    title: title,
                };
                flashcards.push(flashcard);
                return flashcard;
            },
        });
    },
});

