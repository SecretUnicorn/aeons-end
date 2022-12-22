# Setup

Node is required: https://nodejs.org/en/download/
```
npm install -g npx
npx degit https://gitlab.8gm.subdns.de/nahlers/react-template
npm install
touch .env.local
echo VITE_API_BASE=http://10.10.10.57:8100 > .env.local
npm run dev
```

!Attention! Staged files are getting automaticly checked with eslint. Only code with 0 warnings can be commited! When errors are present fix those and use `git add .` otherwise the next commit try overrides the changes!