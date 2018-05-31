import { platforms } from './platform-config';

/* USAGE in Stencil component
*
*  import { platformConfig }
*
*  console.log('log', platformConfig.currentPlatforms);
*/

class PlatformConfigurator {

    private static instance: PlatformConfigurator = null;

    currentPlatforms: string[];

    static getInstance(): PlatformConfigurator {
        if ( PlatformConfigurator.instance === null) {
            PlatformConfigurator.instance = new PlatformConfigurator();
        }
        return PlatformConfigurator.instance;
    }

    constructor() {
        this.initialize();
    }

    private initialize() {
        this.currentPlatforms = platforms.filter(platform => platform.isMatch()).map(platform => {
            return platform.name;
        });
    }

}

export const platformConfig = PlatformConfigurator.getInstance();