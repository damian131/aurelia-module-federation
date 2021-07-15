import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { DialogConfiguration } from "aurelia-dialog";
import Backend from "i18next-xhr-backend";
import * as rwc from "relativity-web-components";
import { I18N } from "aurelia-i18n";

// @ts-ignore
// import { superFunction } from "app2/superFunction";

// superFunction();

import environment from '../config/environment.json';

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
		.developmentLogging(environment.debug ? "debug" : "warn")
    .plugin(PLATFORM.moduleName("aurelia-store"), {initialState: {}})
		.plugin(PLATFORM.moduleName("aurelia-validation"))
		.plugin(PLATFORM.moduleName("aurelia-configuration"))
    .plugin(PLATFORM.moduleName("aurelia-dialog"), (config: DialogConfiguration) => {
			config.useDefaults();
			config.settings.overlayDismiss = true;
		})
    .plugin(PLATFORM.moduleName("aurelia-i18n"), (instance: I18N) => {
			instance.i18next.use(Backend);

			rwc.config.translate = (key, options) => instance.tr(key, { defaultValue: null, ...options });

			return instance.setup({
				backend: {
					loadPath: "./locales/{{lng}}/{{ns}}.json",
				},
				lng: "en",
				fallbackLng: "en",
				lowerCaseLng: true,
				load: "languageOnly",
			});
		})


  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  //Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
