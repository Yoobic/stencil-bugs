import { cloudinary } from '../../../utils/helpers';

function htmlRenderer(params) {
    return params.value || '';
}
function photoRenderer(params) {
    return '<img class="ag-cell-image" src="' + cloudinary((params.value || ''), 30, 30) + '" />';
}
export function getRenderer(type) {
    switch (type) {
        case 'photo':
            return photoRenderer;
        case 'text':
        case 'textarea':
            return htmlRenderer;
        default:
            return null;

    }
}