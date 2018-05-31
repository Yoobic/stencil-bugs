import { NgModule, Provider, ModuleWithProviders } from '@angular/core';

@NgModule({
})
export class InterfacesModule {
  static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
    return {
      ngModule: InterfacesModule
    };
  }
}
