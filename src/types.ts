export type DnOptions = {
    relativeTo?: string;
};

export type Alert = {
    source: {
        id: string;
        kind: string;
    };
    msg: string;
    severity: string;
    id?: string;
    dn?: string;
};

export type Dn = {
    dn?: string;
    alertCount?: AlertCount;
    title?: string;
    alert?: Alert;
    unit?: string;
    value?: number;
    targets?: string[];
};

export type AlertCount = {
    error?: number;
    warn?: number;
};
