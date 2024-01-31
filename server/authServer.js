const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const cors = require("cors");
const setHttpHeaders = require("./setHttpHeaders");
const userModels = require("./userModels");
const bcrypt = require("bcrypt");
const app = express();
const port = process.env.PORT_AUTH_SERVER || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(setHttpHeaders);
app.set("view engine", "ejs");
app.set("views", "views");

let hashCode = null;
const user = {
  email: "",
  username: "",
  password: "",
};

app.post("/auth/verify", (req, res) => {
  const { email, username, password } = req.body;
  user.email = email;
  user.username = username;
  user.password = password;

  hashCode = crypto.randomBytes(3).toString("hex");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "maivanminh.se@gmail.com",
      pass: "alwm vmnw fycr vlta",
    },
  });

  const message = {
    from: "maivanminh.se@gmail.com",
    to: email,
    subject: "[NETFLIX] - [MÃ XÁC NHẬN TÀI KHOẢN CỦA BẠN]",
    html: `
    <html>
      <head>
        <style>
            h1  { 
              color: blue;
            }
            p {
              color: red;
              font-size: 30px;
              font-weight: 500;
              text-align: center;
            }
        </style>
      </head>
      <body>
        <h1>Nhận mã xác thực của bạn tại đây!</h1>
        <p>${hashCode}</p>
      </body>
    </html>
    `,
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log("Error in sending email  " + error);
      return res.json({
        result: false,
      });
    } else {
      return res.json({
        result: true,
      });
    }
  });
});

app.post("/auth/verify-email", (req, res) => {
  const { code } = req.body;
  if (code === hashCode) {
    // Nếu đúng, tạo tài khoản mới.
    bcrypt.hash(user.password, 10, async function (err, hash) {
      // Store hash in your password DB.
      if (err) console.log(err.message);
      else {
        user.password = hash;
        try {
          await userModels.addUser(user);
          return res.json({
            result: true,
          });
        } catch (error) {
          console.log(error.message + " authServer_verify-email");
          return res.json({
            result: false,
          });
        }
      }
    });
  } else {
    //Ngược lại, load lại trang. Chỗ này có thể sử dụng axios để tránh việc load lại hoàn toàn trang.
    console.log("Hash code incorrect!");
    return res.json({
      result: false,
    });
  }
});

app.post("/auth/login", async (req, res) => {
  const { user } = req.body;
  try {
    const result = await userModels.getUser(user.username);
    bcrypt.compare(user.password, result.password, function (err, result) {
      if (err || !result) {
        console.log("authServer_login error!");
        return res.json({
          result: false,
        });
      } else {
        return res.json({
          result: true,
        })
      }
    });
  } catch (error) {
    console.log(error.message + " authServer_login");
    return res.json({
      result: false,
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
