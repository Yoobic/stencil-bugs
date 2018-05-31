export interface Aggregation {
    name: string;
    type: string;
}

export const AGGREGATION_TYPES: Array < Aggregation > = [{
    name: 'project',
    type: 'json'
}, {
    name: 'match',
    type: 'json'
}, {
    name: 'redact',
    type: 'text'
}, {
    name: 'limit',
    type: 'number'
}, {
    name: 'skip',
    type: 'number'
}, {
    name: 'unwind',
    type: 'text'
}, {
    name: 'group',
    type: 'json'
}, {
    name: 'sample',
    type: 'json'
}, {
    name: 'sort',
    type: 'json'
}, {
    name: 'geoNear',
    type: 'json'
}, {
    name: 'lookup',
    type: 'json'
}];
