#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin
docker build -t climatetree:front-end .
docker tag climatetree:front-end patelvp/climatetree:front-end
docker push patelvp/climatetree:front-end