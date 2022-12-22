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