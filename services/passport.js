const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// create model class for users
const User = mongoose.model('users');

// creates a token from the user for future authentication
passport.serializeUser((user, done) => {
  // user.id is MongoDB's record id
  done(null, user.id);
});

// takes in a user id from a cookie and finds the corresponding user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// tells passport which strategies to use
// arguments: object with clientID, clientSecret args,
// and route; accessToken callback
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    // okays requests from proxies -- i.e. Heroku's load balancer
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    // queries DB for a user with the given googleId
    // this is an async action
    const existingUser = await User.findOne({
      googleId: profile.id
    });
    if (existingUser) {
      // already have record with ID
      // done function tells passport that everything is done
      done(null, existingUser);
    } else {
      // no user record -- create and save new user
      // this is also async
      const user = new User({
        googleId: profile.id
      }).save();
      // done takes an error argument and a user object
      done(null, user);
    }
  }));
