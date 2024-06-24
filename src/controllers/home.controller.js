const Members = require("../models/Members");

const sessions = {};

class HomeController {
   home(req, res, next) {
    const session = sessions[req.cookies.sessionId];

    if (!session) {
      res.render("home", { status: false });
      return;
    }
    
      Members.findOne(session.userId)
       .then((mem) => {
         res.render("home", { name: mem.name, status: true });
       })
       .catch(next);

    
    
  }

  login(req, res, next) {
    res.render("auth/login", {
      layout: "form_layout",
    });
  }

  // [GET]/logout

  logout(req, res, next) {
    res.clearCookie("sessionId");
    res.redirect("/");
  }

  // [POST] auth/me
  me(req, res, next) {
    const { email, password } = req.body;
    Members.findOne({ email, password })
      .then((user) => {
        const sessionId = Date.now().toString();
        sessions[sessionId] = {
          userId: user._id,
        };

        if (user) {
          res
            .setHeader(
              "Set-Cookie",
              `sessionId=${sessionId}; max-age=3600; httpOnly`
            )
            .redirect("/dashboard");
          return;
        }
      })
      .catch(next);
  }
  // [Get] auth/register
  register(req, res, next) {
    res.render("auth/register", {
      layout: "form_layout",
    });
  }

  // [POST] auth/registed
  registed(req, res, next) {
    const member = Members(req.body);

    member
      .save()
      .then(() => res.redirect("/login"))
      .catch(next);
  }

  dashboard(req, res, next) {
    const session = sessions[req.cookies.sessionId];

    const idMem = session.userId;

    if (!session) {
      res.redirect("/");
    }

    Members.findById(idMem)
      .then((data) => {
        if (data.role == 0) {
          res.redirect("/");
        }
        res.render("admin/dashboard", { name: data.name });
      })
      .catch(next);
  }
}

module.exports = new HomeController();
