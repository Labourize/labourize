#!/bin/sh

# DB_SERVICE="chainscribe-db"

# if [ "$NODE_ENV" == "test" ]; then
#   DB_SERVICE="inv-test-db"
# fi

# sh /bin/wait-for $DB_SERVICE:5432 -- npm run chainscribe:migration:run \
#   && sh /bin/wait-for $DB_SERVICE:5432 -- npm run chainscribe:seeds:run \
#   && npm run start:debug
ls -lrt
npm run start:debug