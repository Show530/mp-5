"use client";

// import { Textarea } from "@mui/joy";
// Box
import { Button, TextField } from "@mui/material";
import {useState} from "react";
import createNewAlias from "@/lib/create-new-alias";
import {AliasProps} from "@/types";
import AliasPreview from "@/components/alias-preview";


// export default function LoadUrlForm({append,}:{append:(post:AliasProps)=>void;}){
export default function LoadUrlForm(){
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [dataRecord, setDataRecord] = useState<AliasProps>();


    return (
        <>
            <div className="w-full flex flex-col justify-center bg-white m-2">
                <h2 className="text-2xl text-center">Use this form to shorten a URL!</h2>
                <form onSubmit={async (e)=>{
                    e.preventDefault();
                    const result = await createNewAlias(url, alias)
                    if (result === "Alias already here") {
                        setErrorMessage("Alias already exists, please try a new alias.");
                    }
                    else if (result === "URL is invalid") {
                        setErrorMessage("URL is invalid, could not verify, please fix URL.");
                    }
                    else {
                        setErrorMessage("");
                    }

                    if(errorMessage === "" && typeof(result) !=="string"){
                        setDataRecord(result);
                    }
                    // createNewAlias(url, alias)
                    //     .then((newAlias)=>append(newAlias))
                    //     .catch((err=>console.log(err)));
                }}>
                    <div className="flex flex-col items-center">
                        <TextField
                            required
                            sx={{margin: 2}}
                            variant="outlined"
                            label="URL"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            value={url}
                            placeholder="https://www.example.com/extremely/long/url"
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <div className="flex-row">
                            {/*<p>https://cs391-url-shortener.vercel.app/</p>*/}
                            <TextField
                                required
                                sx={{margin: 2}}
                                variant="outlined"
                                label="alias"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                value={alias}
                                placeholder="custom-alias-here"
                                onChange={(e) => setAlias(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <Button
                                sx={{ width: "80px", margin: 2}}
                                variant="contained"
                                type="submit"
                                disabled={url === "" || alias === ""}
                            >
                                Shorten!
                            </Button>
                        </div>
                    </div>
                    {
                        (errorMessage!== "" || !dataRecord )?(<div>{errorMessage}</div>): <AliasPreview alias={dataRecord} />
                    }
                </form>
            </div>
        </>
    );
}