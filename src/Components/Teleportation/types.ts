
export type TeleportationDirection = 'source' | 'target';

export interface TeleportationItem {
    direction: TeleportationDirection;
    dn: string;
}

export interface TeleportationProps {
    config: TeleportationItem[];
}