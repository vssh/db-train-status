# db-train-status
Check arrivals and departures for a DB stop

To run the project, do the following:
1. Go to `dto` folder and install packages.
```
cd dto
yarn install --frozen-lockfile
```

2. Go to `server` folder and start backend.
```
cd server
yarn install --frozen-lockfile
yarn start:dev
```

Now, you can access the __Swagger__ documentation at `http://localhost:3000/api`

3. Go to `client` folder and start frontend.
```
cd client
yarn install --frozen-lockfile
yarn dev
```

You can access the frontend at `http://localhost:4000`

Alternatively you can also run the script `start.sh` from the main folder. Just remember to fix fix the permissions to allow the script to run.
```
chmod +x start.sh
```