#!/bin/bash

source .dev.env

mongoimport --drop --host mongodb --username "$MONGO_INITDB_ROOT_USERNAME" --password "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --db shopping-cart-db --collection products --type json --jsonArray --file /collections/products.json
