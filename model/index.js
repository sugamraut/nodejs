const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// la sequelize yo config haru lag ani database connect gardey vaneko hae 
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port : 3306, 

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files 

db.users = require("./userModel.js")(sequelize, DataTypes);
//db.blogs=require("./blogModel.js")(sequelize,DataTypes);
db.questions= require("./questionModel.js")(sequelize, DataTypes);
db.answers= require("./answerModels.js") (sequelize, DataTypes);
//foregin key refers for question insclude the id 
db.users.hasMany(db.questions)
db.questions.belongsTo(db.users)

// rlation gor answer table to find the answer of the question
db.questions.hasMany(db.answers)
db.answers.belongsTo(db.questions)

db.users.hasMany(db.answers)
db.answers.belongsTo(db.users)

db.sequelize.sync({ force: false}).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;