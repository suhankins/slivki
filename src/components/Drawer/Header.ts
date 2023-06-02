export interface Header {
    name: string;
    /**
     * Element id to scroll to
     */
    id: string;
    depth?: number;
    children?: Header[];
}
