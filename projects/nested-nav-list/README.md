# NgxMaterialNestedNav

NgxMaterialNestedNav is an Angular Material component that supports nested navigation lists with multiple types of icons (Material, Font, SVG) and links (route, URL). The SVG icons can either use their original color or be overridden with the theme icon color.

## NestedNavList Component

### Features

- Nested navigation lists with expandable/collapsible items
- Supports different types of icons: Material, Font, SVG
- Route and URL links
- Divider support

### Defining the Data

The data for the navigation list is defined using the `NavData` interface. Here is an example:

```ts
export interface NavData {
  displayName: string;
  iconType?: 'font' | 'svg';
  iconName?: string;
  fontSet?: string;
  svgUrl?: string;
  route?: string;
  url?: string;
  children?: NavData[];
  expanded?: boolean;
  keepQueryParams?: boolean;
  type?: 'divider';
}
```

### Usage of Different Types of Icons

You can use Material, Font, and SVG icons in the navigation list. Here is an example of how to define the data with different types of icons:

```ts
navData: NavData[] = [
  {
    displayName: 'Home',
    iconType: 'font',
    iconName: 'fa-house',
    fontSet: 'fa',
    route: 'home',
  },
  {
    displayName: 'Settings',
    iconName: 'settings',
    children: [
      {
        displayName: 'Profile',
        iconName: 'person',
        route: 'profile',
      },
      {
        displayName: 'Notifications',
        iconName: 'notifications',
        keepQueryParams: true,
        route: 'notifications',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    displayName: 'Repo',
    iconType: 'svg',
    svgUrl: 'github.svg',
  },
];
```

### How to Register Font for Material Icon

To register a font for Material Icon, you can use the `MatIconRegistry` service. Here is an example:

```ts
import { MatIconRegistry } from '@angular/material/icon';

const matIconRegistry = TestBed.inject(MatIconRegistry);
matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
```

### Divider

You can add a divider in the navigation list by setting the `type` property to `divider` in the `NavData` object. Here is an example:

```ts
{
  type: 'divider',
}
```
