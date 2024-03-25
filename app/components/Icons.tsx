import * as React from "react";
import { IconSvgProps } from "@/app/types";

export const Logo: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => (
	<svg
		// fill="none"
		height={size || height}
		// viewBox="0 0 32 32"
		width={size || width}
		{...props}
	
  
  	version="1.1" viewBox="0.0 0.0 251.51968503937007 251.51968503937007" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><clipPath id="p.0"><path d="m0 0l251.51968 0l0 251.51968l-251.51968 0l0 -251.51968z" clip-rule="nonzero"/></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l251.51968 0l0 251.51968l-251.51968 0z" fill-rule="evenodd"/><path fill="#171727" d="m0.005249344 41.9221l0 0c0 -23.152937 18.769163 -41.9221 41.9221 -41.9221l167.68335 0l0 0c11.118439 0 21.781494 4.41678 29.643402 12.278698c7.861923 7.8619194 12.278702 18.52497 12.278702 29.643402l0 169.19518c0 23.152924 -18.769165 41.92209 -41.922104 41.92209l-167.68335 0l0 0c-23.152937 0 -41.9221 -18.769165 -41.9221 -41.92209z" fill-rule="evenodd"/><path fill="#000000" fill-opacity="0.0" d="m2.9440894 62.39606l335.3701 0l0 133.29134l-335.3701 0z" fill-rule="evenodd"/><path fill="#ebb22d" d="m36.428463 95.45356q1.28125 -1.515625 3.1875 -1.515625q1.921875 0 4.640625 1.28125q2.734375 1.265625 4.53125 3.671875q1.8125 2.40625 1.8125 4.109375q0 1.703125 -1.21875 2.953125l-19.874998 22.03125l20.156248 20.750008q1.265625 1.265625 1.265625 2.984375q0 1.703125 -1.875 4.171875q-1.859375 2.46875 -4.546875 3.6875q-2.671875 1.203125 -4.484375 1.203125q-1.796875 0 -3.203125 -1.4375l-24.328123 -26.953125q-2.0625 -2.078125 -2.0625 -4.140625q0 -2.0625076 1.625 -3.6875076l24.374998 -29.109375zm148.43552 -14.75q1.078125 -2.34375 3.53125 -2.34375q2.453125 0 4.578125 0.921875q4.640625 2.125 6.109375 5.1875q0.671875 1.1875 0.671875 2.375q0 1.171875 -0.484375 2.109375l-49.21875 85.46876q-1.265625 2.15625 -3.71875 2.15625q-2.4375 0 -4.46875 -0.9375q-4.703125 -2.234375 -6.1875 -5.21875q-0.546875 -1.09375 -0.546875 -2.25q0 -1.140625 0.609375 -2.15625l49.125 -85.31251zm54.96237 43.859375q1.640625 1.609375 1.640625 3.6875076q0 2.0625 -2.078125 4.140625l-24.328125 26.953125q-1.40625 1.4375 -3.21875 1.4375q-1.796875 0 -4.53125 -1.203125q-2.734375 -1.21875 -4.546875 -3.6875q-1.796875 -2.484375 -1.796875 -4.171875q0 -1.703125 1.25 -2.984375l20.15625 -20.750008l-19.875 -22.03125q-1.21875 -1.25 -1.21875 -2.953125q0 -1.703125 1.8125 -4.109375q1.8125 -2.421875 4.546875 -3.625q2.734375 -1.21875 4.46875 -1.21875q1.75 0 3.234375 1.265625l24.484375 29.25z" fill-rule="nonzero"/><path fill="#000000" fill-opacity="0.0" d="m46.84107 17.25951l57.574802 0l0 188.25197l-57.574802 0z" fill-rule="evenodd"/><path fill="#ffffff" d="m55.356693 191.712q-4.828125 0 -6.71875 -1.90625q-1.90625 -1.890625 -0.890625 -5.875q0.125 -0.703125 1.453125 -6.546875q1.34375 -5.84375 3.328125 -14.15625q1.984375 -8.328125 4.265625 -18.03125q2.28125 -9.703125 4.5 -15.03125q-0.859375 1.0 -3.625 -0.5q-2.765625 -1.515625 -2.59375 -4.515625q0.171875 -3.0 2.40625 -5.140625q2.234375 -2.140625 5.625 -3.3125q0.71875 -0.359375 1.2968788 0.546875q-0.6093788 -1.53125 -0.015625 -4.140625q0.578125 -2.21875 1.171875 -4.703125q0.59375 -2.5 1.171875 -4.859375l10.296875 -43.999996q1.125 -4.328125 3.59375 -6.59375q2.484375 -2.28125 8.28125 -3.640625q4.671875 -1.171875 8.21875 -0.671875q3.546875 0.484375 2.765625 4.5625q-0.46875 1.75 -2.234375 7.9375q-1.765625 6.171871 -4.203125 15.062496q-2.421875 8.890625 -5.21875 19.546875q-2.78125 10.640625 -4.265625 16.53125q4.296875 -0.65625 16.984375 -1.546875q4.921875 -0.59375 9.671875 -0.734375q4.75 -0.15625 6.625 -0.09375q1.421875 -5.5 3.40625 -13.4375q1.984375 -7.953125 3.75 -14.734375q1.78125 -6.78125 3.171875 -12.03125q1.4062424 -5.25 2.1718674 -7.828121q0.953125 -3.0 1.921875 -5.125q0.984375 -2.140625 2.578125 -3.625q1.609375 -1.5 3.53125 -2.078125q1.921875 -0.578125 4.28125 -0.9375q1.109375 0 2.59375 -0.15625q1.265625 0 2.984375 -0.078125q1.734375 -0.078125 7.921875 0.8125q-6.921875 18.562496 -11.6875 33.874996q-4.75 15.3125 -8.96875 27.03125q0.046875 -0.859375 2.125 -0.703125q2.09375 0.15625 3.40625 0.484375q4.671875 0.78125 6.640625 3.5q1.96875 2.703125 -0.921875 7.125l-1.8125 2.28125q-0.921875 1.234375 -2.34375 2.890625q-1.421875 1.640625 -5.015625 5.0q-2.96875 -1.109375 -4.21875 -1.546875q-1.25 -0.453125 -2.328125 -0.859375q-1.453125 -0.421875 -0.9375 -2.15625q1.109375 2.671875 0.234375 5.9375q-0.875 3.25 -1.59375 6.609375q-1.7656174 7.203125 -3.3749924 14.78125q-1.3125 6.5625 -2.703125 14.5q-1.375 7.953125 -2.28125 17.359375q-3.109375 1.53125 -4.515625 1.796875q-1.40625 0.28125 -2.34375 0.4375q-1.078125 0.15625 -2.328125 0.328125l-0.359375 0l-0.296875 0l-0.296875 0q-0.59375 0 -1.546875 0q-0.953125 0 -1.828125 -0.4375q-0.609375 -0.109375 -1.625 -0.53125q-0.640625 -0.25 -1.421875 -0.515625q-0.765625 -0.25 -3.78125 -2.046875q1.703125 -6.96875 2.328125 -11.125q0.640625 -4.140625 0.9375 -7.328125q0.453125 -3.765625 0.578125 -6.578125q0.125 -3.421875 -0.75 -7.625q-0.875 -4.21875 -2.71875 -8.3125q-1.84375 -4.109375 -4.484375 -7.59375q-2.625 -3.5 -5.875 -5.84375q-3.140625 -2.140625 -5.921875 -2.765625q-2.78125 -0.625 -3.4375 -0.5625q-0.515625 2.1875 -1.390625 6.25q-0.859375 4.046875 -1.4375 7.84375q-1.625 8.578125 -3.09375 16.640625q-1.171875 6.875 -2.421875 14.265625q-1.234375 7.390625 -2.0 14.28125q-4.09375 2.0625 -6.375004 2.796875q-2.265625 0.734375 -3.984375 1.03125q-2.03125 0.515625 -4.03125 0.515625zm58.062504 -65.328125q-5.15625 -0.59375 -9.703125 -0.65625q-4.546875 -0.078125 -4.703125 -2.34375q1.59375 -1.71875 4.09375 1.1875q2.5 2.90625 5.0625 6.375q2.609375 3.40625 4.171875 7.34375q1.578125 3.9375 -0.546875 4.71875q-1.6875 -3.171875 -0.359375 -9.078125q1.34375 -5.921875 4.515625 -9.6875q-0.25 2.25 -0.921875 2.203125q-0.671875 -0.0625 -1.609375 -0.0625z" fill-rule="nonzero"/></g></svg>

);

export const DiscordIcon: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<path
				d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<path
				d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const GithubIcon: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<path
				clipRule="evenodd"
				d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	);
};

export const MoonFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}
	>
		<path
			d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
			fill="currentColor"
		/>
	</svg>
);

export const SunFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}
	>
		<g fill="currentColor">
			<path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
			<path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
		</g>
	</svg>
);

export const HeartFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}
	>
		<path
			d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
			fill="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
	</svg>
);

export const SearchIcon = (props: IconSvgProps) => (
	<svg
		aria-hidden="true"
		fill="none"
		focusable="false"
		height="1em"
		role="presentation"
		viewBox="0 0 24 24"
		width="1em"
		{...props}
	>
		<path
			d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
		<path
			d="M22 22L20 20"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
	</svg>
);

export const NextUILogo: React.FC<IconSvgProps> = (props) => {
  const { width, height = 40 } = props;

  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 161 32"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-black dark:fill-white"
        d="M55.6827 5V26.6275H53.7794L41.1235 8.51665H40.9563V26.6275H39V5H40.89L53.5911 23.1323H53.7555V5H55.6827ZM67.4831 26.9663C66.1109 27.0019 64.7581 26.6329 63.5903 25.9044C62.4852 25.185 61.6054 24.1633 61.0537 22.9582C60.4354 21.5961 60.1298 20.1106 60.1598 18.6126C60.132 17.1113 60.4375 15.6228 61.0537 14.2563C61.5954 13.0511 62.4525 12.0179 63.5326 11.268C64.6166 10.5379 65.8958 10.16 67.1986 10.1852C68.0611 10.1837 68.9162 10.3468 69.7187 10.666C70.5398 10.9946 71.2829 11.4948 71.8992 12.1337C72.5764 12.8435 73.0985 13.6889 73.4318 14.6152C73.8311 15.7483 74.0226 16.9455 73.9968 18.1479V19.0773H63.2262V17.4194H72.0935C72.1083 16.4456 71.8952 15.4821 71.4714 14.6072C71.083 13.803 70.4874 13.1191 69.7472 12.6272C68.9887 12.1348 68.1022 11.8812 67.2006 11.8987C66.2411 11.8807 65.3005 12.1689 64.5128 12.7223C63.7332 13.2783 63.1083 14.0275 62.6984 14.8978C62.2582 15.8199 62.0314 16.831 62.0352 17.8546V18.8476C62.009 20.0078 62.2354 21.1595 62.6984 22.2217C63.1005 23.1349 63.7564 23.9108 64.5864 24.4554C65.4554 24.9973 66.4621 25.2717 67.4831 25.2448C68.1676 25.2588 68.848 25.1368 69.4859 24.8859C70.0301 24.6666 70.5242 24.3376 70.9382 23.919C71.3183 23.5345 71.6217 23.0799 71.8322 22.5799L73.5995 23.1604C73.3388 23.8697 72.9304 24.5143 72.4019 25.0506C71.8132 25.6529 71.1086 26.1269 70.3314 26.4434C69.4258 26.8068 68.4575 26.9846 67.4831 26.9663V26.9663ZM78.8233 10.4075L82.9655 17.325L87.1076 10.4075H89.2683L84.1008 18.5175L89.2683 26.6275H87.103L82.9608 19.9317L78.8193 26.6275H76.6647L81.7711 18.5169L76.6647 10.4062L78.8233 10.4075ZM99.5142 10.4075V12.0447H91.8413V10.4075H99.5142ZM94.2427 6.52397H96.1148V22.3931C96.086 22.9446 96.2051 23.4938 96.4597 23.9827C96.6652 24.344 96.9805 24.629 97.3589 24.7955C97.7328 24.9548 98.1349 25.0357 98.5407 25.0332C98.7508 25.0359 98.9607 25.02 99.168 24.9857C99.3422 24.954 99.4956 24.9205 99.6283 24.8853L100.026 26.5853C99.8062 26.6672 99.5805 26.7327 99.3511 26.7815C99.0274 26.847 98.6977 26.8771 98.3676 26.8712C97.6854 26.871 97.0119 26.7156 96.3973 26.4166C95.7683 26.1156 95.2317 25.6485 94.8442 25.0647C94.4214 24.4018 94.2097 23.6242 94.2374 22.8363L94.2427 6.52397ZM118.398 5H120.354V19.3204C120.376 20.7052 120.022 22.0697 119.328 23.2649C118.644 24.4235 117.658 25.3698 116.477 26.0001C115.168 26.6879 113.708 27.0311 112.232 26.9978C110.759 27.029 109.302 26.6835 107.996 25.9934C106.815 25.362 105.827 24.4161 105.141 23.2582C104.447 22.0651 104.092 20.7022 104.115 19.319V5H106.08V19.1831C106.061 20.2559 106.324 21.3147 106.843 22.2511C107.349 23.1459 108.094 23.8795 108.992 24.3683C109.993 24.9011 111.111 25.1664 112.242 25.139C113.373 25.1656 114.493 24.9003 115.495 24.3683C116.395 23.8815 117.14 23.1475 117.644 22.2511C118.16 21.3136 118.421 20.2553 118.402 19.1831L118.398 5ZM128 5V26.6275H126.041V5H128Z"
      />
      <path
        className="fill-black dark:fill-white"
        d="M23.5294 0H8.47059C3.79241 0 0 3.79241 0 8.47059V23.5294C0 28.2076 3.79241 32 8.47059 32H23.5294C28.2076 32 32 28.2076 32 23.5294V8.47059C32 3.79241 28.2076 0 23.5294 0Z"
      />
      <path
        className="fill-white dark:fill-black"
        d="M17.5667 9.21729H18.8111V18.2403C18.8255 19.1128 18.6 19.9726 18.159 20.7256C17.7241 21.4555 17.0968 22.0518 16.3458 22.4491C15.5717 22.8683 14.6722 23.0779 13.6473 23.0779C12.627 23.0779 11.7286 22.8672 10.9521 22.4457C10.2007 22.0478 9.5727 21.4518 9.13602 20.7223C8.6948 19.9705 8.4692 19.1118 8.48396 18.2403V9.21729H9.72854V18.1538C9.71656 18.8298 9.88417 19.4968 10.2143 20.0868C10.5362 20.6506 11.0099 21.1129 11.5814 21.421C12.1689 21.7448 12.8576 21.9067 13.6475 21.9067C14.4374 21.9067 15.1272 21.7448 15.7169 21.421C16.2895 21.1142 16.7635 20.6516 17.0844 20.0868C17.4124 19.4961 17.5788 18.8293 17.5667 18.1538V9.21729ZM23.6753 9.21729V22.845H22.4309V9.21729H23.6753Z"
      />
    </svg>
  );
};
