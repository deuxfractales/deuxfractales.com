module.exports = (sequelize, DataTypes) => {
  const Artists = sequelize.define(
    'Artists',
    {
      artist_name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      subgenre: DataTypes.STRING,
      ig_handle: DataTypes.STRING,
      clicks: DataTypes.INTEGER,
    },
    {
      tableName: 'artists',
      timestamps: false,
    }
  );

  return Artists;
};
