module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: true
      },
     
    });
  
    return Post;
  }