import { Models } from '../../services/models/models.service';

export function Searchable(className: string) {

    return function decoratorFactory(target: Object, decoratedPropertyName: string): void {
        if (Models) {
            Models.addSearchableField(className, decoratedPropertyName);
        }
    };
}
