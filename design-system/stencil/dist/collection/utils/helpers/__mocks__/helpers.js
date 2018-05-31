export function loadScript(url) {
    return Promise.resolve(url);
}
export function getProtocol() {
    return 'https';
}
export function cloudinary() {
    return 'https://cloudinary.com/console/media_library/asset/image/upload/srgyz3etgxqv9vjsz6lv';
}
export function resizeObserve(target, callback) {
    return {};
}
export function intersectionObserve(target, callback, options) {
    return { observe: () => true };
}
export function getBackImageStyle(url) {
    url = url.replace('http://', 'https://');
    return {
        'background-repeat': 'no-repeat',
        'background-attachment': 'center',
        'background-size': 'cover',
        'background-position-x': '5;0%',
        'background-image': 'url("' + url + '")'
    };
}
