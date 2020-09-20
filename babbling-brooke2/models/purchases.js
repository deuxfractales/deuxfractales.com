module.exports = (sequelize, DataTypes) => {
  const Purchases = sequelize.define(
    'Purchases',
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      tableName: 'purchases',
      timestamps: false,
    }
  );

  return Purchases;
};
