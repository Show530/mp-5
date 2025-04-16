import getCollection, {ALIAS_COLLECTION} from "@/db";
// import {ObjectId} from "mongodb";
import {AliasProps} from "@/types"

export default async function getUrlFromAlias(aliasFromUrl: string): Promise<AliasProps | null> {
    // don't use id!

    // const postId = ObjectId.createFromHexString(id);

    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const data = await aliasCollection.findOne({aliasFromUrl});

    if(data == null) {
        return null;
    }

    const actualAlias = {
        id: data.id,
        url: data.url,
        alias: data.alias,
    };

    return actualAlias;
}