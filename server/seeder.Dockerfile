FROM mongo

COPY src/utils/seedData/products.json /collections/products.json

ADD src/utils/seedData/seeder.sh /seeder.sh

RUN chmod +x /seeder.sh

CMD ./seeder.sh

