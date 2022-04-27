export type Config = {
    title?: string;
    value:
        | number
        | {
              value: string;
          };
    unit?: string;
}[];
