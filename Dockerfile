FROM node:6-onbuild

RUN apt-get update && apt-get upgrade -y && apt-get install -y libcairo2
CMD node server.js
