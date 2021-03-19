"use strict";

const expect = require("chai").expect;
const init = require("../steps/init").init;
const dispose = require("../steps/dispose").dispose;

describe("Search Restaurants Tests", () => {
  beforeEach(async () => {
    await init();
  });

  afterEach(() => {
    dispose();
  });

  describe("When we invoke the POST /restaurants/search endpoint", () => {
    it("Should return 8 restaurants", function (done) {
      const APP_ROOT = "../../";
      let when_we_invoke_search_restaurants = require(`${APP_ROOT}/functions/search-restaurants`)
        .handler;

      var testBlah = {
        theme: "netflix",
      };

      var testEvent = {
        body: JSON.stringify(testBlah),
      };

      when_we_invoke_search_restaurants(testEvent, {})
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.not.be.null;

          console.log("SEE ME", res);

          var responseBody = JSON.parse(res.body);

          expect(responseBody.length).to.equal(8);
        })
        .then(done, done)
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });
});
