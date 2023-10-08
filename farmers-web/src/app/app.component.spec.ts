import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgHttpLoaderComponent } from 'ng-http-loader';
import { AppComponent } from './app.component';
import { TranslateTestingModule } from './core/tests/translate-testing.module';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateTestingModule],
      declarations: [AppComponent, NgHttpLoaderComponent],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
