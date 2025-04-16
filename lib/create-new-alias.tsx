"use server";
import getCollection, {ALIAS_COLLECTION} from "@/db";
import {AliasProps} from "@/types";


export default async function createNewAlias( url:string, alias:string): Promise<AliasProps> {
    const isValidUrl = (url:string) => {
        let urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(url);
        //     return !!urlPattern.test(url);
    }

    // throw error is url is not valid
    if(!isValidUrl(url)) {
        throw new Error(`Invalid URL: ${url}`);
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
        throw new Error("Alias already exists!");
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