"use client";
import LoadUrlForm from "@/components/load-url-form"
import {useState} from "react";
import {AliasProps} from "@/types"
import AliasPreview from "@/components/alias-preview"

export default function Home() {
    const [alias, setAlias] = useState<AliasProps[]>([]);

    function append(newAlias: AliasProps ) {
        setAlias([newAlias]);
    }

    return(
      <>
        <main>
          <div className="min-h-screen bg-blue-200">
            <div className="flex flex-col items-center p-4">
              <h1 className="text-4xl">URL Shortener</h1>
              <p className="text-xl">Shorten your URLs into shorter links!</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <LoadUrlForm append={append}/>

               {alias.map((a) => (
                    // must have a key for mapping
                    <AliasPreview key={a.id} alias={a} />
                ))}
            </div>
          </div>
        </main>
      </>
  );
}