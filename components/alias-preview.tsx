import { AliasProps } from '@/types';

export default function AliasPreview({alias}:{alias:AliasProps}) {
    return(
        <div>
            <h4 className="font-bold text-3xl">You have used: {alias.url}</h4>
            <h4 className="font-bold text-3xl">To create the alias: {alias.alias}</h4>
            <h4 className="font-bold text-3xl">To access this url, go to <a target="_blank" href={`${window.location.origin}/${alias.alias}`}>{window.location.origin}/{alias.alias}</a></h4>
        </div>
    );
}