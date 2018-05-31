import { Models } from '../../services/models/models.service';

export function Mapping(className: string, config: { order: number }) {

    return function decoratorFactory(target: Object, decoratedPropertyName: string): void {
        if (Models) {
            Models.addMappingField(className, decoratedPropertyName, config.order);
        }
    };
}
