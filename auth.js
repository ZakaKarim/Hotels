const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Person = require("./Model/Person");

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    //authentication
    try {
      // console.log("Recieved Credentials:", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Invalid Username" });

      const isPasswordMatch = await user.comparedPassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid Password." });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
