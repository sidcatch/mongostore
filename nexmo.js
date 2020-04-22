const Nexmo = require("nexmo");
const config = require("config");

let NEXMO_API_KEY = config.get("nexmoKey");
let NEXMO_API_SECRET = config.get("nexmoSecret");

const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET
});

module.exports = sendSMS = (to, text) => {
  nexmo.message.sendSms("Nexmo", to, text, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      if (res.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${res.messages[0]["error-text"]}`
        );
      }
    }
  });
};
