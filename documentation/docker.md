# Docker Notes

https://docs.docker.com/engine/reference/commandline/docker/

## Containers

Examples of run container command

### Run a container

##### Basic syntax
This uses the standard syntax and is as short as possible
```
docker container run -d nginx
```

#### Specify a name for the container
This uses the standard syntax including setting a name for the container
```
docker container run -d --name nginx nginx
```

#### Specify port mapping for the container
In this example, a port is specified. The host port is on the left, the container port on the right
```
docker container run -d -p 80:80 nginx
```

The choice for local (host) port may be chosen by convention or for some other reason; the port chosen for the container must match the requirements for that container - refer to the image documentation for the container, it may be based on the FROM image in the Dockerfile, or with the image pulled run `docker image inspect` and look for Config/ExposedPorts 

Ports only need to be specified if there is requirement to call from outside the network, from a web browser or postman for example, or another docker network; a db container in the same network as another container will not usually require post specification as they will talk to each other based on the default ports

#### Specify an environment variable
This demonstrates the `-e` flag for specifying an environment variable

In this example the password may remain empty
```
docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True mysql
```

In this example, the generated root password will be printed to stdout (GENERATED ROOT PASSWORD: .....)
```
docker container run -d --name mysql -e MYSQL_RANDOM_ROOT_PASSWORD=True mysql
```

#### Bind mount a container

A bind mount is specified using the volumes `-v` flag so that files updated locally are updated in the container

The left side `$(pwd)` is the location on the host (local), the right side `/usr/share/nginx/html` is the location within the container
```
docker container run -d -p 80:80 -v $(pwd):/usr/share/nginx/html nginx
```

### Remove a container

Remove a stopped container by container_id (id as 08a7c71592e7)

Note - if another container shares the first three chars this will fail, 4+ chars or the full id can be specified for uniqueness

```
docker container rm 08a
```

Remove a stopped container by name (name as nginx)

```
docker container rm nginx
```

Remove a running container using --force (-f for short)
```
docker container rm -f nginx 
```

### Volumes

Volumes are useful for persisted data, a database for example.

They can be specified in the Dockerfile with the `VOLUME` command, eg:

```
VOLUME /var/lib/mysql
```

When a container is run this volume will be mapped to something like:

```
/var/lib/docker/volumes/12342c8a30bee87c9f5570c7c9af008ba909509862d1c947684f8de56bb47002/_data
```

Or with a named volume:

```
/var/lib/docker/volumes/mysql-data/_data
```

### Logs

See the logs for a container

```
docker container logs my_container
```

Follow the logs for a container with the `-f` follow flag

```
docker container logs -f my_container
```

### Exec

Enter an interactive terminal for a running container

Note that the shell type must be specified at the end and the specified shell must be available in the container - alpine for example does not include bash, so `sh` can be used in place of `bash`

```
docker container exec -it my_container bash
```
