# docker.io commands
> create volume for postgres Data
```bash
docker create -v /var/lib/postgresql/data --name postgresData busybox
```
> Run Postgres and use the new volume
```bash
docker run --name postgresImport -e POSTGRES_PASSWORD=tcuser -d --volumes-from postgresData -p 5432:5432 postgres
```
> Import booktwon example data
```bash
psql -h localhost -p 5432 -U postgres -f booktown.sql
```
> Stop postgres import
```bash
docker stop postgresImport
```
> run postgresDB
```bash
docker run -it --rm --name postgresDB --volumes-from postgresData -e POSTGRES_PASSWORD=tcuser postgres
```
> link nodejs app with your postgres DB
```bash
docker run -it --rm --name appExpress -v "$PWD":/home/docker/git/appExpress -w /home/docker/git/appExpress -p 80:3000 --link postgresDB node:0.12.5 node app.js
```
