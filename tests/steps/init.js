"use strict";

const awscred = require("awscred");

let initialised = false;

let init = async function () {
  if (initialised) {
    console.log("Already intialised...");
    return;
  }

  console.log("Intialising");

  process.env.restaurants_api =
    "https://hnfhcs62xf.execute-api.us-east-1.amazonaws.com/dev/restaurants";

  // console.log("setting api root", process.env.restaurants_api);

  process.env.cognito_user_pool_id = "test_cognito_user_pool_id";

  process.env.cognito_client_id = "test_cognito_client_id";

  process.env.restaurants_table = "restaurants";

  process.env.AWS_REGION = "us-east-1";

  process.env.BIG_MOUTH_API_KEY = "W7ZI5sPiLB2vDGOZJxmu0acPC4POyvqs44nq1fUw";

  await awscred.loadCredentials((err, data) => {
    if (err) throw err;

    console.log("AWS creds set");

    process.env.AWS_ACCESS_KEY_ID = data.accessKeyId;

    process.env.AWS_SECRET_ACCESS_KEY = data.secretAccessKey;

    console.log("Initialised...");
  });

  initialised = true;
};

module.exports = {
  init,
};
