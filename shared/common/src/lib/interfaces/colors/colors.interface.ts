export class Colors {
    private static _isDarkTheme: boolean = false;

    public static balanced = Colors.getCssColor('balanced', '#32d2b6');
    public static assertive = Colors.getCssColor('assertive', '#f76c6c');
    public static positive = Colors.getCssColor('positive', '#abd2ff');
    public static dark = Colors.getCssColor('dark', '#3e4666');
    public static energized = Colors.getCssColor('energized', '#ffe377');
    public static calm = Colors.getCssColor('calm', '#1695FF');
    public static royal = Colors.getCssColor('royal', '#877def');
    public static stable = Colors.getCssColor('stable', '#f1f5f7');
    public static light = Colors.getCssColor('light', '#ffffff');
    public static transparent = Colors.getCssColor('transparent', 'transparent');
    public static border = Colors.getCssColor('border-color', '#E1E8EE');
    public static text = Colors.getCssColor('text-color', '#505A6D');
    public static balanceddark = Colors.getCssColor('balanceddark', '#2d8578');
    public static assertivedark = Colors.getCssColor('assertivedark', '#d54444');
    public static darkdark = Colors.getCssColor('darkdark', '#1F2533');
    public static energizeddark = Colors.getCssColor('energizeddark', '#ee892b');
    public static royaldark = Colors.getCssColor('royaldark', '#41307c');

    public static hexToRgb(hex: string, opacity = 1) {
        let bigint = parseInt(hex.replace('#', ''), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    }

    public static getKeys() {
        return ['balanced', 'assertive', 'positive', 'dark', 'energized', 'royal', 'balanceddark', 'assertivedark', 'darkdark', 'energizeddark', 'royaldark', 'stable', 'light'];
    }

    public static getCssColor(color: string, defaultValue?: string) {
        if (document) {
            return document.documentElement.style.getPropertyValue('--' + color) || defaultValue || Colors[color.replace('-color', '')];
        }
        return defaultValue || Colors[color];
    }

    public static lightenDarkenColor(color: string, amount: number) {
        let usePound = false;
        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }

        let num = parseInt(color, 16);

        let r = (num >> 16) + amount;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }

        let b = ((num >> 8) & 0x00FF) + amount;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }

        let g = (num & 0x0000FF) + amount;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    }

    public static isDarkTheme() {
        return Colors._isDarkTheme;
    }

    public static setDarkTheme(enabled) {
        Colors._isDarkTheme = enabled;
        if (document) {
            if (enabled) {
                document.body.classList.add('dark-theme');
                document.documentElement.style.setProperty('--light', '#292C39'); //Colors.dark);
                document.documentElement.style.setProperty('--stable', '#181C28'); // Colors.darkdark);
                document.documentElement.style.setProperty('--stable2', '#181C28'); // Colors.darkdark);
                document.documentElement.style.setProperty('--selected', Colors.darkdark);
                document.documentElement.style.setProperty('--selectedtext', Colors.light);
                document.documentElement.style.setProperty('--body-background', '#181C28'); // Colors.darkdark);
                document.documentElement.style.setProperty('--dark', Colors.light);
                document.documentElement.style.setProperty('--darker', Colors.light);
                document.documentElement.style.setProperty('--darkdark', Colors.stable);
                document.documentElement.style.setProperty('--text-color', Colors.stable);
                document.documentElement.style.setProperty('--placeholder-color', Colors.stable);
                document.documentElement.style.setProperty('--text-color-light', Colors.light);
                document.documentElement.style.setProperty('--text-color-dark', Colors.stable);
                document.documentElement.style.setProperty('--text-header', Colors.light);
                document.documentElement.style.setProperty('--border-color', Colors.darkdark);
                document.documentElement.style.setProperty('--border-color-dark', Colors.darkdark);
            } else {
                document.body.classList.remove('dark-theme');
                document.documentElement.style.removeProperty('--light');
                document.documentElement.style.removeProperty('--stable');
                document.documentElement.style.removeProperty('--stable2');
                document.documentElement.style.removeProperty('--selected');
                document.documentElement.style.removeProperty('--selectedtext');
                document.documentElement.style.removeProperty('--body-background');
                document.documentElement.style.removeProperty('--dark');
                document.documentElement.style.removeProperty('--darker');
                document.documentElement.style.removeProperty('--darkdark');
                document.documentElement.style.removeProperty('--text-color');
                document.documentElement.style.removeProperty('--placeholder-color');
                document.documentElement.style.removeProperty('--text-color-light');
                document.documentElement.style.removeProperty('--text-color-dark');
                document.documentElement.style.removeProperty('--text-header');
                document.documentElement.style.removeProperty('--border-color');
                document.documentElement.style.removeProperty('--border-color-dark');
            }
            Colors.balanced = Colors.getCssColor('balanced');
            Colors.assertive = Colors.getCssColor('assertive');
            Colors.positive = Colors.getCssColor('positive');
            Colors.dark = Colors.getCssColor('dark');
            Colors.energized = Colors.getCssColor('energized');
            Colors.calm = Colors.getCssColor('calm');
            Colors.royal = Colors.getCssColor('royal');
            Colors.stable = Colors.getCssColor('stable');
            Colors.light = Colors.getCssColor('light');
            Colors.transparent = Colors.getCssColor('transparent');
            Colors.border = Colors.getCssColor('border-color');
            Colors.text = Colors.getCssColor('text-color');
            Colors.balanceddark = Colors.getCssColor('balanceddark');
            Colors.assertivedark = Colors.getCssColor('assertivedark');
            Colors.darkdark = Colors.getCssColor('darkdark');
            Colors.energizeddark = Colors.getCssColor('energizeddark');
            Colors.royaldark = Colors.getCssColor('royaldark');
        }

    }

    public static setBigFonts(enabled) {
        if (document) {
            if (enabled) {
                document.body.classList.add('big-fonts');
                document.documentElement.style.setProperty('--font-xxlarge', '32px');
                document.documentElement.style.setProperty('--font-xlarge', '22px');
                document.documentElement.style.setProperty('--font-large', '20px');
                document.documentElement.style.setProperty('--font-medium', '18px');
                document.documentElement.style.setProperty('--font-small', '16px');
                document.documentElement.style.setProperty('--font-xsmall', '14px');
            } else {
                document.body.classList.remove('big-fonts');
                document.documentElement.style.removeProperty('--font-xxlarge');
                document.documentElement.style.removeProperty('--font-xlarge');
                document.documentElement.style.removeProperty('--font-large');
                document.documentElement.style.removeProperty('--font-medium');
                document.documentElement.style.removeProperty('--font-small');
                document.documentElement.style.removeProperty('--font-xsmall');
            }
        }
    }
}
