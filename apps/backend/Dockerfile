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
# START: Builder stage
# ##########
FROM labourize-api-dev as labourize-api-builder

COPY ./tsconfig.json ./tsconfig.build.json ./

COPY ./src ./src

RUN set -x && \
  npm run build

# ##########

# ##########
# START: Production image instructions stage
# ##########
FROM node:20 as labourize-api-prod

ENV NODE_ENV=production

# YARN & NPM config

WORKDIR /backend

COPY ./package.json ./

CMD [ "pwd" ]
# COPY /opt/app/yarn.lock ./
RUN set -x && \
  yarn install --pure-lockfile

# COPY ./dist ./dist
COPY ./secrets ./secrets

# Copy the entrypoint script and make it executable
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
COPY --from=labourize-api-builder /opt/app/apps/backend/dist/ ./src
# COPY ./ ./

ENTRYPOINT ["sh", "/entrypoint.sh"]
