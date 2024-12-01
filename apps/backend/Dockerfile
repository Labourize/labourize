FROM node:20 as labourize-api-dev

WORKDIR /opt/app/apps/backend

COPY ./package.json ./
RUN set -x && \
  yarn install --pure-lockfile

COPY ./entrypoint.dev.sh /bin/entrypoint.dev.sh
RUN chmod +x /bin/entrypoint.dev.sh

COPY ./ ./


# RUN ["npm", "run", "start:debug"]
CMD /bin/entrypoint.dev.sh

