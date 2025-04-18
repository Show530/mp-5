"use server";
import getCollection, {ALIAS_COLLECTION} from "@/db";
import {AliasProps} from "@/types";


export default async function createNewAlias( url:string, alias:string): Promise<AliasProps|string> {

    // Checking url using a try-catch: request/response
    let responseStatus = 0;
    try {
        const response = await fetch(url);
        responseStatus = response.status;

        if (responseStatus < 200 && responseStatus >= 399){
            return "BAD RESPONSE";
        }
    }
    catch(error) {
        return "INVALID URL" + error;
    }

    const a ={
        url: url,
        alias:alias,
    }

    // insert into DB
    const aliasCollection = await getCollection(ALIAS_COLLECTION);

    // check if alias exists
    const aliasIsHere = await aliasCollection.findOne({alias});
    if(aliasIsHere) {
        return "ALIAS EXISTS";
    }

    // ... is a shorthand to append at end of posts
    const res = await aliasCollection.insertOne({ ...a});

    if (!res.acknowledged) {
        return "DB FAILED";
    }
    // // ... is a shorthand to append at end of posts
    // return{...a, id:"NewId"}
    return {...a, id: res.insertedId.toHexString()};
}