"use strict";

const expect = require("chai").expect;
const init = require("../steps/init").init;
const dispose = require("../steps/dispose").dispose;
const cheerio = require("cheerio");

describe("Get Index Tests", () => {
  beforeEach(async () => {
    await init();
  });

  afterEach(() => {
    dispose();
  });

  describe("When we invoke the GET / endpoint", () => {
    it("Should return the index page with 8 restaurants", function (done) {
      const APP_ROOT = "../../";
      let when_we_invoke_get_index = require(`${APP_ROOT}/functions/get-index`)
        .handler;

      when_we_invoke_get_index({}, {})
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.headers["Content-Type"]).to.equal(
            "text/html; charset=UTF-8"
          );
          expect(res.body).to.not.be.null;

          let $ = cheerio.load(res.body);

          let list = Array.from($(".restaurant-name"));
          // let restaurants = $(".restaurants", "#restaurants");

          expect(list.length).to.equal(8);
        })
        .then(done, done)
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });
});
