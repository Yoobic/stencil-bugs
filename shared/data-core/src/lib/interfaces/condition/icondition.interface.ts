export const CONDITION_TYPES = ['field', 'tags', 'groups'];
export const CONDITION_ALL_OPERATORS = ['equals', 'notequals', 'in', 'notin', 'greaterthan', 'lessthan'];
export const SIMPLE_FIELD_TYPES = ['text', 'email', 'number', 'date', 'tel', 'time', 'range', 'starrating'];
export const WITH_VALUES_FIELD_TYPES = ['checkbox', 'toggle', 'select', 'selectmulti', 'selectbuttons', 'selectbuttonsmulti', 'autocomplete'];

export interface ICondition {
    _id?: string;
    type?: string;
    operator?: string;
    title?: string;
    field?: any;
    tags?: Array<string>;
    group?: Array<string>;
    values?: Array<any>;
    value?: any;
    key?: string;
}

export const ROLES = [
    'dashboard', 'admin', 'manager', 'team', 'teamplus', 'creator', 'service', 'supervisor', 'quora', 'kiosk', 'score', 'nochat', 'anonymous', 'stat', 'todo',
    'serviceuser', 'polluser', 'newsuser', 'newscreator', 'documentsuser', 'calendaruser', 'store', 'clientadmin', 'missionanalysis', 'missionviewer', 'followup', 'followupnouser', 'profilenoedit',
    'workplace', 'trial', 'videocall', 'academy', 'pharmaone', 'instagram'
];

export const ROLES_ASK = [
    'manager', 'creator', 'quora', 'academy', 'academyplus'
];

export const ROLES_CONDITIONS = {
    isAdmin: { type: 'roles', operator: 'in', group: ['admin'] },
    isClientAdmin: { type: 'roles', operator: 'in', group: ['clientadmin'] },
    isAdminOrClientAdmin: { type: 'roles', operator: 'in', group: ['admin', 'clientadmin'] },
    isNotAdmin: { type: 'roles', operator: 'nin', group: ['admin'] },
    isNeitherAdminNorClientAdmin: { type: 'roles', operator: 'nin', group: ['admin', 'clientadmin'] },
    isManager: { type: 'roles', operator: 'in', group: ['manager'] },
    isTeam: { type: 'roles', operator: 'in', group: ['team'] },
    isWorkplace: { type: 'roles', operator: 'in', group: ['admin', 'workplace'] },
    isTrial: { type: 'roles', operator: 'in', group: ['trial'] },
    isNotTrial: { type: 'roles', operator: 'nin', group: ['trial'] },
    hasTodo: { type: 'roles', operator: 'in', group: ['todo'] },
    hasService: { type: 'roles', operator: 'in', group: ['admin', 'service'] }
};
