# Calcurator

Calcurator in the browser.

## Setting

Build and launch multiple containers based on the configuration described in the ```docker-compose.yml``` file.  
```
docker-compose build
```

Create a React application.
```
docker-compose run node sh -c 'npx create-react-app calcurator --template typescript'
```
or
```
docker-compose run --rm node sh -c 'npx create-react-app calcurator --template typescript'
```

When you add the ```rm``` option, it will destroy the container upon termination.  

Start containers in the background.
```
docker-compose up -d
```

## Access

```
http://localhost:3000
```

## Test

```
npm test
```