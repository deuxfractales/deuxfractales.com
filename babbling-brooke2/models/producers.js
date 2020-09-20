module.exports = (sequelize, DataTypes) => {
  const Producers = sequelize.define(
    'Producers',
    {
      handle: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      tableName: 'producers',
      timestamps: false,
    }
  );

  return Producers;
};
