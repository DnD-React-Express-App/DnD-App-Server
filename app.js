// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
const cors = require("cors");

const FRONTEND_URL= process.env.ORIGIN;

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

app.use(
    cors({
      origin: [FRONTEND_URL],
      credentials: true
    })
  );

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const characterRoutes = require("./routes/character.routes");
app.use("/api/characters", characterRoutes);

const itemRoutes = require('./routes/item.routes');
app.use('/api/items', itemRoutes);

const spellRoutes = require('./routes/spell.routes');
app.use('/api/spells', spellRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);



module.exports = app;
