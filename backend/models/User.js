module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  
    isAdmin: 
    {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
   
  });

  return User;
}