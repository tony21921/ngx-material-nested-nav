export interface NavData {
    type?: 'item' | 'divider',
    displayName?: string,
    iconType?: 'svg' | 'font' | 'material',
    iconName?: string,
    fontSet?: string,
    svgUrl?: string,
    route?: string,
    keepQueryParams?: boolean,
    url?: string,
    children?: NavData[],
    expanded?: boolean,
  }
  