'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bucket = sequelize.define('Bucket', {
    bucket: DataTypes.STRING
  }, {});
  Bucket.associate = function (models) {
    // associations can be defined here
    Bucket.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
    Bucket.hasMany(models.Assets, {
      foreignKey: 'bucketId',
      onDelete: 'CASCADE'
    });
  };
  return Bucket;
};