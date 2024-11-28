#!/bin/sh

# DB_SERVICE="chainscribe-db"

# if [ "$NODE_ENV" == "test" ]; then
#   DB_SERVICE="inv-test-db"
# fi
ls -lrt
npm run labourize:migration:run \
  && npm run start:debug
ls -lrt
  # && sh /bin/wait-for $DB_SERVICE:5432 -- npm run chainscribe:seeds:run \
# npm run start:debug