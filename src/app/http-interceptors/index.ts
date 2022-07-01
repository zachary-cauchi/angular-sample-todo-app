import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserAuthInterceptor } from './user-auth.interceptor';

/** Http interceptor providers in outside-in order */
export const HTTP_INTERCEPTORS_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: UserAuthInterceptor, multi: true },
];