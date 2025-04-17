"use server";
import getCollection, {ALIAS_COLLECTION} from "@/db";
import {AliasProps} from "@/types";


export default async function createNewAlias( url:string, alias:string): Promise<AliasProps|string> {
    // regexp format validation
    const isValidUrl = (url:string) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!urlPattern.test(url);
        //     return !!urlPattern.test(url);
    }


    // throw error is url is not valid
    if(!isValidUrl(url)) {
        // throw new Error(`Invalid URL: ${url}`);
        console.log("Invalid URL caught in reg ex");
        return "INVALID URL";
    }
    // trying request/response
    let responseStatus = 0;
    try {
        const response = await fetch(url);
        console.log("response.status =", response.status); // response.status = 200
        responseStatus = response.status;

        if (responseStatus < 200 && responseStatus > 400){
            console.log("In if statement for issues: ", responseStatus)
            return "BAD RESPONSE";
        }
    }
    catch(error) {
        console.error("Invalid URL caught in request fetch: ", error);
        return "INVALID URL";
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
        // throw new Error("Alias already exists!");
        return "ALIAS EXISTS";
    }

    // ... is a shorthand to append at end of posts
    const res = await aliasCollection.insertOne({ ...a});

    if (!res.acknowledged) {
        throw new Error("Db insert failed");
    }
    // // ... is a shorthand to append at end of posts
    // return{...a, id:"NewId"}
    return {...a, id: res.insertedId.toHexString()};
}