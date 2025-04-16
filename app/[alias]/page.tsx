// import FullPost from '@/components/full-post';
import getUrlFromAlias from "@/lib/get-url-from-alias"
import {redirect} from "next/navigation"

export default async function RedirectionPage({params, }: {params: Promise<{aliasFromUrl: string}>}) {
    const {aliasFromUrl} = await params;

    try {
        // const url = await
        const currAlias = await getUrlFromAlias(aliasFromUrl);
        if (!currAlias) {
            redirect(`/error`);
        }
        return redirect(currAlias.url);
    } catch(err) {
        console.error(err);
        return redirect("/");
    }

}