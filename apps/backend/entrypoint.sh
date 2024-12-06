#!/bin/sh

# DB_SERVICE="chainscribe-db"

# if [ "$NODE_ENV" == "test" ]; then
#   DB_SERVICE="inv-test-db"
# fi
ls -lrt
npm run labourize:docker:migration:run \
  && npm run labourize:docker:start
ls -lrt
  # && sh /bin/wait-for $DB_SERVICE:5432 -- npm run chainscribe:seeds:run \
# npm run start:debug