/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            gridTemplateColumns: {
                // Simple 16 column grid
                'auto': ' repeat(auto-fit, minmax(250px, 1fr))',
            },
            colors: {
                'first-color': '#6A9512',
                'gray-color': '#a4a4a4',
                'hover-color': '#efefef',
                'overlay-color': 'rgba(0, 0, 0, .4)',
            },
            animation: {
                'slide': 'slide .75s ease-in-out',
                'delete': 'delete .75s ease-in-out'
            },
            keyframes: {
                slide: {
                    '0%': { transform: 'translateY(-50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0px)', opacity: '1' },
                },
                delete: {
                    '20%': {
                        opacity: 1,
                        transform: 'translate3d(20px, 0, 0)',
                    },
                    '100%': {
                        opacity: 0,
                        transform: 'translate3d(-2000px, 0, 0)',
                    }
                }
            }
        },
        screens: {
            // => @media (min-width: 350px) { ... }
            'xxs': '370px',
            // => @media (min-width: 420px) { ... }
            'xs': '480px',
            // => @media (min-width: 640px) { ... }
            'sm': '640px',
            // => @media (min-width: 768px) { ... }
            'md': '768px',
            // => @media (min-width: 820px) { ... }
            'bs': '900px',
            // => @media (min-width: 1024px) { ... }
            'lg': '1124px',
            // => @media (min-width: 1280px) { ... }
            'xl': '1280px',
            // => @media (min-width: 1536px) { ... }
            '2xl': '1536px',
            // => @media (min-height: 500px) { ... }
            'tall': { 'raw': '(min-height: 500px)' },
        }
	},
	plugins: [],
}
