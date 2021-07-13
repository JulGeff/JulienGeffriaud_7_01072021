module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },

  
  });
      
    Post.associate = function (models) { // On ajoute une foreign key liée au User Id
    
        models.Post.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  
    return Post;
  }
