interface KeyValuePair {
    [key: string]: string;
}
export interface LobidGndQueryOptions {
    query?: string;
    field?: string;
    filter?: KeyValuePair;
    size?: number;
    from?: number;
    format?: string;
}
export declare const lobidDefaultGndQueryOptions: LobidGndQueryOptions;
export declare const allowedLobidGndFormats: string[];
export default LobidGndQueryOptions;
