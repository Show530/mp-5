import getCollection, {ALIAS_COLLECTION} from "@/db";
// import {ObjectId} from "mongodb";
import {AliasProps} from "@/types"

export default async function getUrlFromAlias(aliasFromUrl: string): Promise<AliasProps | null> {
    // don't use id!

    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const data = await aliasCollection.findOne({alias: aliasFromUrl});


    if(data === null) {
        return null;
    }

    const hexId = data._id.toHexString();
    const actualAlias = {
        id: hexId,
        url: data.url,
        alias: data.alias,
    };

    return actualAlias;
}