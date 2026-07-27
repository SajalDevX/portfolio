/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				// Catppuccin colors will be defined in CSS
				base: 'var(--color-base)',
				mantle: 'var(--color-mantle)',
				crust: 'var(--color-crust)',
				text: 'var(--color-text)',
				subtext0: 'var(--color-subtext0)',
				subtext1: 'var(--color-subtext1)',
				surface0: 'var(--color-surface0)',
				surface1: 'var(--color-surface1)',
				surface2: 'var(--color-surface2)',
				overlay0: 'var(--color-overlay0)',
				overlay1: 'var(--color-overlay1)',
				accent: 'var(--color-accent)',
				green: 'var(--color-green)',
				red: 'var(--color-red)',
				peach: 'var(--color-peach)'
			},
			fontFamily: {
				'jetbrains-mono': ['JetBrains Mono', 'monospace']
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out infinite'
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
