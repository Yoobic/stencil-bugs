import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { IFormField, FormFieldType, ITodo, ITodoTask, ITodoTaskSimple } from '@shared/interfaces';
import { User } from '../user/user.interface';

export function onUserMeActionHandler() {
    this.selectMatch(this.session.user);
}

@Model({ className: 'Todo' })
export class Todo extends ITodo {

    @Editable('Todo', { type: FormFieldType.text, name: 'title', required: true })
    title: string;

    @Editable('Todo', {
        title: 'ASSIGNTO', name: 'user', type: FormFieldType.autocomplete, collectionName: 'user',
        queryFields: User.getSimpleFields(), multiple: false, clearable: true, required: true,
        extraButton: { title: 'ASSIGNTO', buttons: [{ text: 'ME', handler: onUserMeActionHandler }] }
    })
    user: any;

    @Editable('Todo', { title: 'DUEDATE', type: FormFieldType.date, required: false, clearable: true, minDate: new Date() })
    duedate: Date;

    @Editable('Todo', { title: 'NOTIFICATIONEMAILS', type: FormFieldType.emailreport, showUsers: true, tab: 'INFORMATION', exportOrder: 11, advanced: true })
    notificationemail?: Array<string>;

    @Editable('Todo', { title: 'REMINDER', type: FormFieldType.datetime, required: false, clearable: true, advanced: true })
    reminderdate?: Date;

    @Editable('Todo', { type: FormFieldType.starrating, advanced: true })
    priority?: string;

    field?: IFormField;
}

@Model({ className: 'TodoTask' })
export class TodoTask extends ITodoTask {
    @Editable('TodoTask', { type: FormFieldType.text, title: 'TITLE', required: true })
    text: { value: string };

    @Editable('TodoTask', { type: FormFieldType.textarea, required: false })
    comments?: { value: string };

    @Editable('TodoTask', { type: FormFieldType.date, required: false, clearable: true, minDate: new Date() })
    duedate?: { value: Date };

    @Editable('TodoTask', { type: FormFieldType.toggle, required: false, title: 'PHOTO', flex: 50 })
    hasphoto?: { value: boolean };

    @Editable('TodoTask', { type: FormFieldType.toggle, required: false, title: 'MANDATORYPHOTO', flex: 50, condition: 'hasphoto.value==1' })
    isphotorequired?: { value: boolean };

    @Editable('TodoTask', { type: FormFieldType.toggle, required: false, title: 'ALLOWLIBRARY', flex: 50, condition: 'hasphoto.value==1' })
    allowLibrary?: { value: boolean };

    field?: IFormField;
}

@Model({ className: 'TodoTaskSimple' })
export class TodoTaskSimple extends ITodoTaskSimple {
    @Editable('TodoTaskSimple', { type: FormFieldType.textarea, title: 'DESCRIPTION', required: true })
    text: { value: string };

    @Editable('TodoTaskSimple', {
        title: 'ASSIGNTO', name: 'user', type: FormFieldType.autocomplete,
        queryFields: User.getSimpleFields(),
        collectionName: 'user', multiple: false, clearable: true, required: true,
        extraButton: { title: 'ASSIGNTO', buttons: [{ text: 'ME', handler: onUserMeActionHandler }] }
    })
    user: any;

    @Editable('TodoTaskSimple', { type: FormFieldType.date, required: false, clearable: true, minDate: new Date() })
    duedate?: { value: Date };

    @Editable('TodoTaskSimple', { type: FormFieldType.toggle, required: false, title: 'ASKFORPHOTO', flex: 50 })
    hasphoto?: { value: boolean };

    @Editable('TodoTaskSimple', { type: FormFieldType.toggle, required: false, title: 'MANDATORYPHOTO', flex: 50, condition: 'hasphoto.value==1' })
    isphotorequired?: { value: boolean };

    @Editable('TodoTaskSimple', { type: FormFieldType.toggle, required: false, title: 'ALLOWLIBRARY', flex: 50, condition: 'hasphoto.value==1' })
    allowLibrary?: { value: boolean };
    field?: IFormField;

}
