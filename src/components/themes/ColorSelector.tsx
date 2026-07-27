import React, { useRef } from 'react';
import {
  useAccentColor,
  accentColors,
  useBackgroundEffect,
} from '../../hooks/useTheme';

export const ColorSelector: React.FC = () => {
  const [accentColor, setAccentColor] = useAccentColor();
  const [backgroundEnabled, setBackgroundEnabled] = useBackgroundEffect();
  const selectedIndex = accentColors.indexOf(accentColor);
  const row = Math.floor(selectedIndex / 7);
  const col = selectedIndex % 7;
  const gridRef = useRef<HTMLDivElement>(null);

  // Get computed color values from CSS variables
  const getColorValue = (colorName: string): string => {
    if (typeof window === 'undefined') return '#000';
    const root = document.documentElement;
    // Try both --color-{name} and --catppuccin-color-{name}
    let color = getComputedStyle(root)
      .getPropertyValue(`--color-${colorName}`)
      .trim();
    if (!color) {
      color = getComputedStyle(root)
        .getPropertyValue(`--catppuccin-color-${colorName}`)
        .trim();
    }
    return color || '#000';
  };

  return (
    <>
      <div
        ref={gridRef}
        className="relative grid grid-cols-7 gap-2.5 md:gap-1.5"
      >
        {accentColors.map((color) => {
          const isSelected = accentColor === color;
          const colorValue = getColorValue(color);

          return (
            <button
              key={color}
              aria-label={`Select ${color} accent color`}
              title={color.charAt(0).toUpperCase() + color.slice(1)}
              onClick={() => setAccentColor(color)}
              className={`aspect-square min-h-5 w-full min-w-5 cursor-pointer rounded-md shadow-sm transition-all duration-150 ${
                isSelected
                  ? 'scale-105'
                  : 'opacity-80 hover:scale-110 hover:opacity-100'
              }`}
              style={{
                backgroundColor: colorValue,
              }}
            >
              <span className="sr-only">{color}</span>
            </button>
          );
        })}

        {/* Animated ring */}
        <div
          className="pointer-events-none absolute aspect-square min-h-5 min-w-5 rounded-md transition-all duration-300 ease-out"
          style={{
            transform: `translate(calc(${col} * (100% + 0.625rem)), calc(${row} * (100% + 0.625rem)))`,
            width: 'calc((100% - 6 * 0.625rem) / 7)',
            color: `var(--color-${accentColor})`,
            ['--tw-ring-color' as any]: 'currentColor',
          }}
        />
      </div>

      <div className="mt-4 flex items-center">
        <label className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={backgroundEnabled}
            onChange={(e) => setBackgroundEnabled(e.target.checked)}
            className="form-checkbox h-4 w-4 rounded text-current"
            aria-label="Toggle the colorful background on/off"
          />
          <span className="text-subtext0 ml-2 text-sm">
            Background effect:{' '}
            <span className="text-accent">
              {backgroundEnabled ? 'on' : 'off'}
            </span>
          </span>
        </label>
      </div>
    </>
  );
};
