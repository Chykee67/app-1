docker rm from-bad-df

docker rmi from-bad-df:v1

docker buildx build -t from-bad-df:v1 -f bad.Dockerfile .