import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

describe('Given the component AppComponent', () => {
  describe('When the component is instantiated', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, CoreModule, HttpClientTestingModule],
        declarations: [AppComponent],
      })
    );

    it('Then the component should be created', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it('Then should have the title set to "e-commerce"', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('e-commerce');
    });
  });
});
