# Kraken-Capstone
# Docker commands:
## Creates container and binds for development
 docker run -d -it --name dev --mount type=bind,source="$pwd/",target=/opt/haskell-contracts haskell-test-2:Dockerfile /bin/bash