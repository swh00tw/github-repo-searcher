# Usage

## Run at local

1. clone the repo

2. setup
```
cd github-repo-searcher && yarn
touch .env
```
3. fill your Github token in .env
4. run on localhost port 3000
```
yarn run dev
```

# Stucture

Powered by NextJS, ChakraUI

```jsx
$PROJECT_ROOT
│   // Page files
├── pages
│     │     // Static Generation
│     ├── index 
│     │     // Server side rendering
│     ├── users/[username]/repos
│     │     // Server side rendering
│     ├── users/[username]/repos/[repo] 
│     
│   // React component files
├── components
│   // Layout wrapper of website
├── layout
│   // theme config of website
├── theme
│   // Some helper function and API
└── utils
```

# API call

Open ```utils/githubAPI``` for more details
