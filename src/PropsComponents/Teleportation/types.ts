
export type TeleportationDirection = 'source' | 'target' | 'bidir';

export interface TeleportationItem {
    direction: TeleportationDirection;
    dn: string;
}

export interface TeleportationProps {
    config: TeleportationItem[];
}