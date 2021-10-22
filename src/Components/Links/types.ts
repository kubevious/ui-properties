

export interface LinkInfo 
{
    dn: string,
    path?: string;
    unresolved?: boolean;
}

export type LinksConfig = { [ kind : string ] : LinkInfo[] };

export interface LinksProps {
    config: LinksConfig;
}