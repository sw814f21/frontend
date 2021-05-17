# FindSmiley frontend


## Setup guide
### 0. Install node.js `15.10`  
Use [nvm](https://github.com/nvm-sh/nvm) to install it
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash 
```
***IMPORTANT***: Use node.js version 15.10
### 1. Install expo
```
npm install --global expo-cli
```
### 2. Change to dir `frontend/`
```bash
cd frontend/
```
### 3. Install rest of the packages
```
npm install
```

### 4. Start the app in tunnel mode (For external possibilities)
```
expo start --host tunnel
```

## Production
For using the app in production mode, set `useSampledata` to `false` (Default is `true`).
```json
"extra": {
  "useSampledata": false,
  "apiUrl": "https://edufinder.dk"
},
```