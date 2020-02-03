#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t climatetree:front-end .
docker tag climatetree:front-end patelvp/climatetree:front-end
docker push patelvp/climatetree