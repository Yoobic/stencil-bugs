import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, ICurrency } from '@shared/interfaces';
import { Translate } from '@shared/translate';

@Model({
    className: 'Currency',
    collectionName: 'currencies',
    fields: ['*'],
    include: []
})

export class Currency extends ICurrency {

    @Editable('Currency', { required: true, type: FormFieldType.autocomplete, title: 'LANGUAGE', translate: true, values: Translate.availablesLanguage, clearable: false })
    @Searchable('Currency') currency: string;

    @Editable('Currency', { required: true, type: FormFieldType.text })
    @Searchable('Currency') symbol: string;

    @Editable('Currency', { required: true, type: FormFieldType.number, title: 'RATE1' })
    @Searchable('Currency') rate: number;

}
