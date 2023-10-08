import { NgModule, Pipe, PipeTransform } from '@angular/core';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
} from '@ngx-translate/core';

@Pipe({
  name: 'translate',
})
export class TranslatePipeMock implements PipeTransform {
  name = 'translate';

  transform(query: string): string {
    return query;
  }
}

@NgModule({
  declarations: [TranslatePipeMock],
  providers: [{ provide: TranslatePipe, useClass: TranslatePipeMock }],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateFakeLoader,
      },
    }),
  ],
  exports: [TranslatePipeMock, TranslateModule],
})
export class TranslateTestingModule {}
