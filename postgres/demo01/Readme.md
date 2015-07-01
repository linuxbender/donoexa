# docker.io commands
```bash
docker create -v /var/lib/postgresql/data --name postgresData busybox

docker run --name postgresImport -e POSTGRES_PASSWORD=tcuser -d --volumes-from postgresData -p 5432:5432 postgres

psql -h localhost -p 5432 -U postgres -f booktown.sql

docker stop postgresImport

docker run -it --rm --name postgresDB --volumes-from postgresData -e POSTGRES_PASSWORD=tcuser postgres

docker run -it --rm --name appExpress -v "$PWD":/home/docker/git/appExpress -w /home/docker/git/appExpress -p 80:3000 --link postgresDB node:0.12.5 node app.js

```
