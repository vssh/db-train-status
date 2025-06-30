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

Alternatively, scripts are also provided to start the project from the main folder.
You will need to run `install-packages.sh` script once before running the project.
Then run the scripts `start-backend.sh` & `start-frontend.sh` in separate terminals.


Just remember to fix fix the permissions to allow the scripts to run.
```
chmod +x install packages.sh
chmod +x start-backend.sh
chmod +x start-frontend.sh
```