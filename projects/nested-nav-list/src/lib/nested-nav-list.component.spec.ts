import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavData } from './nav-data';
import { NestedNavListComponent } from './nested-nav-list.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';

describe('NestedNavListComponent', () => {
  let component: NestedNavListComponent;
  let fixture: ComponentFixture<NestedNavListComponent>;
  let matIconRegistry: MatIconRegistry;
  let sanitizer: DomSanitizer;
  let router: Router;
  let mockEvent: UIEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NestedNavListComponent],
      providers: [
        provideRouter([]),
        { provide: MatIconRegistry, useValue: { addSvgIcon: jest.fn() } },
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: jest
              .fn()
              .mockReturnValue('home.svg'),
          },
        },
      ],
    }).compileComponents();

    matIconRegistry = TestBed.inject(MatIconRegistry);
    sanitizer = TestBed.inject(DomSanitizer);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NestedNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    jest.spyOn(mockEvent, 'stopPropagation');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call registerSvgIcons on navData change', () => {
    const navData: NavData[] = [
      { displayName: 'Home', iconType: 'svg', svgUrl: 'home.svg' },
    ];
    jest.spyOn(component, 'registerSvgIcons');
    component.navData = navData;
    component.ngOnChanges({
      navData: {
        previousValue: null,
        currentValue: navData,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.registerSvgIcons).toHaveBeenCalledWith(navData);
  });

  it('should register SVG icons', () => {
    const navData: NavData[] = [
      {
        displayName: 'test',
        children: [
          { displayName: 'Home', iconType: 'svg', svgUrl: 'home.svg' },
        ],
      },
    ];
    component.registerSvgIcons(navData);
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      'home.svg',
    );
    expect(matIconRegistry.addSvgIcon).toHaveBeenCalledWith(
      'home.svg',
      expect.anything(),
    );
  });

  it('should navigate to route on click', () => {
    const navItem: NavData = { displayName: 'Home', route: '/home' };

    jest.spyOn(router, 'navigate');
    component.onClickNavItem(navItem, mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home'], {
      queryParamsHandling: '',
    });
  });

  it('should open URL in new tab on click', () => {
    const navItem: NavData = {
      displayName: 'External',
      url: 'http://example.com',
    };

    jest.spyOn(window, 'open').mockImplementation(() => null);
    component.onClickNavItem(navItem, mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith('http://example.com', '_blank');
  });

  it('should toggle expanded flag on click', () => {
    const navItem: NavData = {
      displayName: 'Parent',
      children: [{ displayName: 'Child' }],
    };

    component.onClickNavItem(navItem, mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(navItem.expanded).toBe(true);
    component.onClickNavItem(navItem, mockEvent);
    expect(navItem.expanded).toBe(false);
  });
});
