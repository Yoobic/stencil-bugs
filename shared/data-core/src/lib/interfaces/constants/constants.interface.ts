export const ADMIN_FILES_TYPE = ['locations', 'user', 'geofilters', 'campaignfilters', 'products'];
export const FORMCREATOR_FILES_TYPE = ['pages'];

export const FORM_FILES_IMAGE_MIME = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp'];
export const FORM_FILES_IMAGE_FILTER = [[
    { field: 'mimeType', operator: { _id: 'inq' }, value: FORM_FILES_IMAGE_MIME }
]];

export const FORM_FILES_GROUP_FILTER = [[
    { field: 'mimeType', operator: { _id: 'inq' }, value: FORM_FILES_IMAGE_MIME },
    { field: 'tags', operator: { _id: 'inq' }, value: ['group'] }
]];
