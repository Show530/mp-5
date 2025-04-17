import getUrlFromAlias from "@/lib/get-url-from-alias"
import {redirect} from "next/navigation"

export default async function RedirectionPage({params, }: {params: Promise<{alias: string}>}) {
    const {alias} = await params;
    let redirectUrl = "/"

    try {
        const currAlias = await getUrlFromAlias(alias);

        if (currAlias != null) {
            redirectUrl = currAlias.url;
        }

    } catch(err) {
        console.error(err);
    }
    redirect(redirectUrl);
}