import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// eslint-disable-next-line import/extensions
import '@cds/core/checkbox/register.js';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
