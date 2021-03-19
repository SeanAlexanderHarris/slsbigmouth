"use strict";

const _ = require("lodash");

const APP_ROOT = "../../";

function we_invoke_my_way() {
  return require(`${APP_ROOT}/functions/get-index`).handler;
}

let we_invoke_get_index = () => {
  let handler = require(`${APP_ROOT}/functions/get-index`).handler;

  return new Promise((resolve, reject) => {
    let context = {};

    let callback = function (err, response) {
      console.log("WHEN 3");
      if (err) {
        reject(err);
      } else {
        let contentType = _.get(
          response,
          "headers.Content-Type",
          "application/json"
        );

        if (response.body && contentType === "application/json") {
          response.body = JSON.parse(response.body);
        }

        resolve(response);
      }
    };

    handler({}, context, callback);
  });
};

module.exports = {
  we_invoke_get_index,
  we_invoke_my_way,
};
