# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.231.3/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

ARG CLI_VERSION="1.43.0"
WORKDIR /tmp
RUN apt-get update\
  && apt-get install -y wget unzip bash-completion\
  && wget https://github.com/aws/aws-sam-cli/releases/download/v${CLI_VERSION}/aws-sam-cli-linux-x86_64.zip\
  && unzip aws-sam-cli-linux-x86_64.zip -d sam-installer\
  && ./sam-installer/install\
  && apt-get purge -y --auto-remove wget unzip\
  && rm -rf sam-installer aws-sam-cli-linux-x86_64.zip
