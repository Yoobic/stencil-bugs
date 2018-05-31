import { Colors } from '@shared/common';

import { isNaN } from 'lodash-es';

export function exists(value: any): boolean {
    if (value === null || value === undefined || value === '') {
        return false;
    } else {
        return true;
    }
}

export class CellRendererBase {

    public static colors = [
        { name: 'finished', value: Colors.dark, class: 'dark', index: 0, textValue: Colors.light },
        { name: 'booked', value: Colors.positive, class: 'positive', index: 1, textValue: Colors.dark },
        { name: 'available', value: Colors.energized, class: 'energized', index: 2, textValue: Colors.dark },
        { name: 'visited', value: Colors.dark, class: 'dark', index: 3, textValue: Colors.light },
        { name: 'notvisited', value: Colors.energized, class: 'energized', index: 4, textValue: Colors.dark },
        { name: 'analyzed', value: Colors.balanced, class: 'balanced', index: 5, textValue: Colors.dark },
        { name: 'validated', value: Colors.balanced, class: 'balanced', index: 6, textValue: Colors.dark },
        { name: 'tobevalidated', value: Colors.royal, class: 'royal', index: 7, textValue: Colors.light },
        { name: 'rejected', value: Colors.assertive, class: 'assertive', index: 8, textValue: Colors.light },
        { name: 'progress', value: Colors.stable, class: 'stable', index: 9, textValue: Colors.dark },
        { name: 'validationprogress', value: Colors.stable, class: 'stable', index: 10, textValue: Colors.dark },
        { name: 'conformityprogress', value: Colors.stable, class: 'stable', index: 11, textValue: Colors.dark },
        { name: 'conformityrelativeprogress', value: Colors.stable, class: 'stable', index: 12, textValue: Colors.dark },
        { name: 'ontime', value: Colors.balanced, class: 'balanced', index: 13, textValue: Colors.balanced },
        { name: 'late', value: Colors.assertive, class: 'assertive', index: 14, textValue: Colors.assertive },
        { name: 'satisfactory', value: Colors.balanced, class: 'balanced', index: 15, textValue: Colors.balanced },
        { name: 'unsatisfactory', value: Colors.assertive, class: 'assertive', index: 16, textValue: Colors.assertive },
        { name: 'nonapplicable', value: Colors.assertive, class: 'dark', index: 17, textValue: Colors.dark }
    ];

    public static getColor(key) {
        function isSameColor(color) {
            return color.name === key;
        }

        return this.colors.find(isSameColor);
    }

    public static getKeyTemplate(key: string, count: number | string, translate: any, suffix = '', useCircle = false, hideKey = false) {
        let color = this.getColor(key);
        let displayName = key;
        if (color) {
            displayName = translate.get(key.toUpperCase());
        }
        if (isNaN(count)) {
            count = '?';
            suffix = '';
        }
        if (useCircle) {
            let circleColor = 'balanced';
            if (count === '?') {
                circleColor = 'dark';
            } else if (count < 33) {
                circleColor = 'assertive';
            } else if (count < 75) {
                circleColor = 'energized';
            }
            return '<span class="badge light margin-right minwidth"><span class="badge-circle bg-' + circleColor + '"></span>' + (hideKey ? '' : (displayName + ':')) + '<b>' + count + suffix + '</b></span>';
        } else {
            return '<span class="badge ' + 'light minwidth' + ' margin-right">' + (hideKey ? '' : (displayName + ':')) + '<b>' + count + suffix + '</b></span>';
        }
    }

    public static defaultComparator(valueA: any, valueB: any): number {
        const valueAMissing = valueA === null || valueA === undefined;
        const valueBMissing = valueB === null || valueB === undefined;
        if (valueAMissing && valueBMissing) {
            return 0;
        }
        if (valueAMissing) {
            return -1;
        }
        if (valueBMissing) {
            return 1;
        }

        if (typeof valueA === 'string') {
            try {
                // using local compare also allows chinese comparisons
                return valueA.localeCompare(valueB);
            } catch (e) {
                // if something wrong with localeCompare, eg not supported
                // by browser, then just continue without using it
            }
        }

        if (valueA < valueB) {
            return -1;
        } else if (valueA > valueB) {
            return 1;
        } else {
            return 0;
        }
    }

    public static coreGroupComparator(valueA: any, valueB: any, nodeA: any, nodeB: any): number {
        const nodeAIsGroup = exists(nodeA) && nodeA.group;
        const nodeBIsGroup = exists(nodeB) && nodeB.group;

        const bothAreGroups = nodeAIsGroup && nodeBIsGroup;
        const bothAreNormal = !nodeAIsGroup && !nodeBIsGroup;

        if (bothAreGroups) {
            return this.defaultComparator(nodeA.key, nodeB.key);
        } else if (bothAreNormal) {
            return this.defaultComparator(valueA, valueB);
        } else if (nodeAIsGroup) {
            return 1;
        } else {
            return -1;
        }
    }

}