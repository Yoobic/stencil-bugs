import { platforms } from './platform-config';
/* USAGE in Stencil component
*
*  import { platformConfig }
*
*  console.log('log', platformConfig.currentPlatforms);
*/
class PlatformConfigurator {
    constructor() {
        this.initialize();
    }
    static getInstance() {
        if (PlatformConfigurator.instance === null) {
            PlatformConfigurator.instance = new PlatformConfigurator();
        }
        return PlatformConfigurator.instance;
    }
    initialize() {
        this.currentPlatforms = platforms.filter(platform => platform.isMatch()).map(platform => {
            return platform.name;
        });
    }
}
PlatformConfigurator.instance = null;
export const platformConfig = PlatformConfigurator.getInstance();
