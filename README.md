# Setup

Node is required: https://nodejs.org/en/download/
```bash
npm install -g npx
npx degit https://gitlab.8gm.subdns.de/nahlers/react-template
npm install
npm run prepare
touch .env.local
echo VITE_API_BASE=http://10.10.10.57:8100 > .env.local
npm run dev
```

### Husky

Staged files are getting automaticly checked with eslint. Only code with 0 warnings can be commited!

_**Warning:** When errors are present fix those and use `git add .` otherwise the next commit try overrides the changes!_

### Env-Files

```bash
.env                  # loaded in all cases
.env.local            # loaded in all cases, ignored by git
.env.[mode]           # only loaded in specified mode
.env.[mode].local     # only loaded in specified mode, ignored by git
.env.production.local # used in production ( run build ), ignored by git
```

For more information refer to: https://vitejs.dev/guide/env-and-mode.html
