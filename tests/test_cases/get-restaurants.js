"use strict";

const expect = require("chai").expect;
const init = require("../steps/init").init;
const dispose = require("../steps/dispose").dispose;

describe("Get Restaurants Tests", () => {
  beforeEach(async () => {
    await init();
  });

  afterEach(() => {
    dispose();
  });

  describe("When we invoke the GET /restaurants endpoint", () => {
    it("Should return 8 restaurants", function (done) {
      const APP_ROOT = "../../";
      let when_we_invoke_get_restaurants = require(`${APP_ROOT}/functions/get-restaurants`)
        .handler;

      when_we_invoke_get_restaurants({}, {})
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.not.be.null;

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
