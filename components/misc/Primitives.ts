import { tv } from "tailwind-variants";

export const title = tv({
	base: "tracking-tight inline",
	variants: {
		color: {
			violet: "from-[#FF1CF7] to-[#b249f8]",
			yellow: "from-[#FF705B] to-[#FFB457]",
			blue: "from-[#5EA2EF] to-[#0072F5]",
			cyan: "from-[#00b7fa] to-[#01cfea]",
			green: "from-[#6FEE8D] to-[#17c964]",
			pink: "from-[#FF72E1] to-[#F54C7A]",
			foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
		},
		size: {
			xs: "text-xl md:text-2xl",
			sm: "text-3xl md:text-4xl",
			md: "text-[2.3rem] md:text-5xl leading-9",
			lg: "text-4xl md:text-6xl",
			xl: "text-5xl md:text-8xl",
		},
		bold: {
			reg: "font-normal",
			semi: "font-semibold",
			bold: "font-bold",
			extra: "font-extrabold",
		},
		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		size: "md",
		bold: "semi",
	},
	compoundVariants: [
		{
			color: [
				"violet",
				"yellow",
				"blue",
				"cyan",
				"green",
				"pink",
				"foreground",
			],
			class: "bg-clip-text text-transparent bg-gradient-to-b",
		},
	],
});

export const subtitle = tv({
	base: "my-2 text-default-600 inline max-w-full font-normal leading-9",
	variants: {
		color: {
			violet: "from-[#FF1CF7] to-[#b249f8]",
			yellow: "from-[#FF705B] to-[#FFB457]",
			blue: "from-[#5EA2EF] to-[#0072F5]",
			cyan: "from-[#00b7fa] to-[#01cfea]",
			green: "from-[#6FEE8D] to-[#17c964]",
			pink: "from-[#FF72E1] to-[#F54C7A]",
			foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
		},
		fullWidth: {
			true: "w-full block",
		},
		bold: {
			reg: "font-normal",
			semi: "font-semibold",
			bold: "font-bold",
			extra: "font-extrabold",
		},
		size: {
			sm: "text-xl md:text-2xl",
			md: "text-2xl md:text-3xl",
			lg: "text-3xl md:text-4xl",
		},
	},
	defaultVariants:{
		fullWidth: false,
		size: 'md',
		bold: "reg",
	},
	compoundVariants: [
		{
			color: [
				"violet",
				"yellow",
				"blue",
				"cyan",
				"green",
				"pink",
				"foreground",
			],
			class: "bg-clip-text text-transparent bg-gradient-to-b",
		},
	],
});
