"use strict";

let disposed = false;

let dispose = function () {
  // if (disposed) {
  //   console.log("Already disposed...");
  //   return;
  // }

  console.log("(Not actually) disposing... (atm)");

  // delete process.env.restaurants_api;

  // delete process.env.cognito_user_pool_id;

  // delete process.env.cognito_client_id;

  // delete process.env.restaurants_table;

  // delete process.env.AWS_REGION;

  // delete process.env.BIG_MOUTH_API_KEY;

  // disposed = true;

  // console.log("ALL DISPOSE");
};

module.exports = {
  dispose,
};
