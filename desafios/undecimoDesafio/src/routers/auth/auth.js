const authRouter = require("express").Router();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { UserDAO } = require("../../DAOS");
const createHash = require("../../utils/createHash");
const isValidPassword = require("../../utils/isValidPassword.js");


authRouter.get("/", (req, res) => {
    res.redirect("/home")
});

authRouter.get("/login", (req, res) => {
    const name = req.session?.name

    name ? res.redirect("/") : res.redirect("/login");
});

authRouter.get("/logout", (req, res) => {
    const name = req.session?.name

    name
        ? req.session.destroy(error => {
            !error
                ? res.redirect("/logout")
                : res.redirect("/");
        }) : res.redirect("/");
});

authRouter.get("/faillogin", (req, res) => {
    res.send("fail-login");
});

authRouter.get("/failsignup", (req, res) => {
    res.send("fail-signup");
});

authRouter.post("/login", (req, res) => {
    req.session.name = req.body.name;
    res.redirect("/home");
})

passport.use("login", new LocalStrategy((username, password, done) => {
    console.log(username)

    UserDAO.findOne({ email: username }, (error, user) => {
        console.log({ user });

        if (error) return done(error);

        if (!user) {
            console.log(`User not found: ${username}`);
            return done(null, false);
        }

        // if (!isValidPassword(user, password)) {
        //     console.log("Invalid Password");
        //     return done(null, false);
        // }

        console.log({ error, user });
        return done(null, {});
    });
}));

passport.use("signup", new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
        UserDAO.findOne({ email: username }, (err, user) => {

            if (err) {
                console.log(`Error in Sign Up: ${err}`);
                return done(err);
            }

            if (user) {
                console.log("User already exists");
                return done(null, false);
            }

            const newUser = {
                username: username,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: createHash(password),
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            UserDAO.create(newUser, (error, userCreated) => {
                if (error) {
                    console.log(`Error in saving user: ${error}`);
                    return done(err);
                }
                console.log(user);
                console.log(`User created succesfully: ${userCreated}`);
                return done(null, userCreated);
            });
        });
    })
);

authRouter.post("/auth/local",
    passport.authenticate("login",
        { failureRedirect: "/faillogin", session: false }),
    (req, res) => {
        res.redirect("/");
    }
);

authRouter.post("/signup/local",
    passport.authenticate("signup",
        { failureRedirect: "/failsignup", session: false }),
    (req, res) => {
        res.redirect("/")
    }
);

module.exports = authRouter