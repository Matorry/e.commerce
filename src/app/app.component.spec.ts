import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

describe('Given the component AppComponent', () => {
  describe('When i instance it ', () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, CoreModule],
        declarations: [AppComponent],
      })
    );

    it('Then, the component should be created.', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`Then, should have as title 'e-commerce'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('e-commerce');
    });
  });
});
