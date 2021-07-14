module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [2,40]
    },

    firstName : {
      type: DataTypes.STRING,
      allowNull: false,
      len: [2,40]
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true,
      len: [2,40]
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

  User.associate = function(models) {
    models.User.hasMany(models.Post) // On associe les posts faits par le user
  };
  return User;
};

