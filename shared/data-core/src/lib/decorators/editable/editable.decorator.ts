import { Models } from '../../services/models/models.service';
import { IFormField } from '@shared/interfaces';

export function Editable(className: string, config: IFormField) {

    return function decoratorFactory(target: Object, decoratedPropertyName?: string): void {
        config.name = config.name || decoratedPropertyName;
        config.filterName = config.filterName || config.name;
        if (!config.title) {
            config.title = config.name.toUpperCase();
        }
        if (config.collectionName && !config.tag && config.name !== '_acl.groups.r' && config.collectionName !== 'groups') {
            config.filterName += 'Ref';
        }

        if (Models) {
            Models.addFormField(className, config);
        }
    };
}
