import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatIconRegistry } from '@angular/material/icon';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [MatIconRegistry],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'dev-app'`, () => {
    expect(component.title).toEqual('dev-app');
  });

  it('should have keepSvgIconColor as false', () => {
    expect(component.keepSvgIconColor).toBeFalsy();
  });

  it('should have navData defined', () => {
    expect(component.navData).toBeDefined();
    expect(component.navData.length).toBe(4);
  });

  it('should register font class alias', () => {
    const matIconRegistry = TestBed.inject(MatIconRegistry);
    jest.spyOn(matIconRegistry, 'registerFontClassAlias');
    component = new AppComponent(matIconRegistry);
    expect(matIconRegistry.registerFontClassAlias).toHaveBeenCalledWith('fontawesome', 'fa');
  });
});
