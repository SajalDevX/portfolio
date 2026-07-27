import { useState, useEffect } from 'react';

export type PaletteType = 'latte' | 'frappe' | 'macchiato' | 'mocha' | 'nord' | 'dracula';
export type AccentColor = 'rosewater' | 'flamingo' | 'pink' | 'mauve' | 'red' | 'maroon' | 'peach' | 'yellow' | 'green' | 'teal' | 'sky' | 'sapphire' | 'blue' | 'lavender' | 'coral' | 'lime' | 'violet' | 'indigo' | 'rose' | 'mint' | 'amber' | 'crimson';

export const paletteNames: PaletteType[] = ['latte', 'frappe', 'macchiato', 'mocha', 'nord', 'dracula'];
export const accentColors: AccentColor[] = ['rosewater', 'flamingo', 'pink', 'mauve', 'red', 'maroon', 'peach', 'yellow', 'green', 'teal', 'sky', 'sapphire', 'blue', 'lavender', 'coral', 'lime', 'violet', 'indigo', 'rose', 'mint', 'amber', 'crimson'];

function getStoredValue<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;

    try {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
    }
}

function setStoredValue<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
    }
}

export function usePalette() {
    const [palette, setPaletteState] = useState<PaletteType>(() =>
        getStoredValue<PaletteType>('palette', 'mocha')
    );

    useEffect(() => {
        // Remove all theme classes
        document.documentElement.classList.remove('latte', 'frappe', 'macchiato', 'mocha', 'nord', 'dracula');
        // Add the selected theme class
        document.documentElement.classList.add(palette);
        setStoredValue('palette', palette);
    }, [palette]);

    return [palette, setPaletteState] as const;
}

export function useAccentColor() {
    const [accentColor, setAccentColorState] = useState<AccentColor>(() =>
        getStoredValue<AccentColor>('accent-color', 'peach')
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Use a small delay to ensure CSS variables are loaded
        const applyColor = () => {
            const root = document.documentElement;

            // Try to get the catppuccin-color variable directly
            let computedColor = getComputedStyle(root).getPropertyValue(`--catppuccin-color-${accentColor}`).trim();

            // If not found, try the --color- prefix
            if (!computedColor) {
                computedColor = getComputedStyle(root).getPropertyValue(`--color-${accentColor}`).trim();
            }

            if (computedColor && !computedColor.startsWith('var(')) {
                // Set the actual color value
                root.style.setProperty('--current-accent-color', computedColor);
            } else {
                // Fallback: use variable reference
                root.style.setProperty('--current-accent-color', `var(--catppuccin-color-${accentColor})`);
            }
        };

        // Apply immediately
        applyColor();

        // Also apply after a short delay to ensure all styles are loaded
        const timeoutId = setTimeout(applyColor, 50);

        setStoredValue('accent-color', accentColor);

        return () => clearTimeout(timeoutId);
    }, [accentColor]);

    return [accentColor, setAccentColorState] as const;
}

export function useBackgroundEffect() {
    const [enabled, setEnabledState] = useState<boolean>(() =>
        getStoredValue<boolean>('background-effect', true)
    );

    useEffect(() => {
        setStoredValue('background-effect', enabled);
    }, [enabled]);

    return [enabled, setEnabledState] as const;
}

export function useTotalTimeOnSite() {
    const [totalTime, setTotalTime] = useState<number>(() =>
        getStoredValue<number>('total-time-on-site', 0)
    );

    useEffect(() => {
        setStoredValue('total-time-on-site', totalTime);
    }, [totalTime]);

    return [totalTime, setTotalTime] as const;
}
