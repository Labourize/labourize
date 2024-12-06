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


# ##########
# START: Production image instructions stage
# ##########
FROM node:20 as labourize-api-prod

ENV NODE_ENV=production

# YARN & NPM config

WORKDIR /backend

COPY ./package.json ./
# COPY /opt/app/yarn.lock ./
RUN set -x && \
  yarn install --pure-lockfile

COPY ./dist ./dist

# Copy the entrypoint script and make it executable
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./ ./

ENTRYPOINT ["sh", "/entrypoint.sh"]
