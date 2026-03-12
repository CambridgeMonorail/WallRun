export interface PlayerAppGeneratorSchema {
  name: string;
  force?: boolean;
  port?: number;
  displayOrientation?:
    | 'landscape'
    | 'portrait-left'
    | 'portrait-right'
    | 'inverted';
  noStatusPage?: boolean;
  tags?: string;
}
