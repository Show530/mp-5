import { AliasProps } from '@/types';

export default function AliasPreview({alias}:{alias:AliasProps}) {
    return(
        <div className="bg-blue-50 p-4 mt-2 justify-center">
            <h4 className="text-center font-bold text-2xl">You have used: {alias.url}</h4>
            <h4 className="text-center font-bold text-3xl">To create the alias: {alias.alias}</h4>
            <h4 className="text-center font-bold text-3xl">To access this url, go to
                    <a className="text-blue-700" target="_blank"
                       href={`${window.location.origin}/${alias.alias}`}>
                         {window.location.origin}/{alias.alias}
                    </a>
            </h4>
        </div>
    );
}