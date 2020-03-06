#  Broadcast Scheduler - server and client

## Server
1. go to `server` directory
2. run `npm i`
3. create `.env` file (use the `.env.example` one) in the `server` directory
4. Set the next variables:
    - PORT=`{any_port}`
    - MONGODB_URI=`{link_to_the_mongodb_service_and_dbname)}`
    - AUTH_SECRET=`{some_loooong_string_with_specific_symbols_like_these_#@$=~?!#^%&^%*}`
    - TOKEN_EXPIRATION=`{time_in_ms}`
5. run `npm run start`

## Client
1. go to `client` directory
2. run `npm i`
3. create `.env` file (use the `.env.example` one) in the `client` directory
4. Set the next variables:
    - REACT_APP_SERVER_URI=`{link_to_the_server_url_and_port}`
    - REACT_APP_TOKEN_KEY=`{token_key_to_store_it_in_local_storage}`
5. run `npm run start`

## Live server
Not provided in free version

## Docker containers
Not provided in free version

## Test coverage
Free version is not covered with tests