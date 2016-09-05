// modules

import mappr from './core';
import * as plugins from './plugins';
import { toPairs } from './utils';

// load plugins

for (const [pluginName, plugin] of toPairs(plugins)) {
  mappr.load(pluginName, plugin);
}

// exports

export default mappr;
