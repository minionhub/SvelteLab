export const global_css = `:root {
	--sk-back-h: 206;
	--sk-back-3-hsl: ;
	--sk-back-1: hsl(0, 0%, 100%);
	--sk-back-2: hsl(0, 0%, 100%);
	--sk-back-3: hsl(206, 64%, 98%);
	--sk-back-4: hsl(206, 44%, 93%);
	--sk-back-5: hsl(206, 20%, 80%);
	--sk-text-1: hsl(0, 0%, 13%);
	--sk-text-2: hsl(0, 0%, 27%);
	--sk-text-3: hsl(240, 8%, 44%);
	--sk-font: "Overpass", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	  Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
	  sans-serif;
	--sk-font-mono: "Fira Mono", monospace;
 }
 
 @media (prefers-color-scheme: dark) {
	:root {
	  --sk-back-1: hsl(0, 0%, 10%);
	  --sk-back-2: hsl(0, 0%, 18%);
	  --sk-back-3: hsl(0, 0%, 14%);
	  --sk-back-4: hsl(0, 0%, 22%);
	  --sk-back-5: hsl(0, 0%, 40%);
	  --sk-text-1: hsl(0, 0%, 90%);
	  --sk-text-2: hsl(0, 0%, 80%);
	  --sk-text-3: hsl(0, 0%, 65%);
	}
 }
 body {
	background-color: var(--sk-back-2);
	color: var(--sk-text-1);
	margin: 0.75em;
	font-family: var(--sk-font);
 }`;
