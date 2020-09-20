module.exports = (sequelize, DataTypes) => {
  const Beats = sequelize.define(
    'Beats',
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      genre: DataTypes.STRING,
      related_artist: DataTypes.STRING,
      k: DataTypes.INTEGER,
      d: DataTypes.INTEGER,
      plays: DataTypes.INTEGER,
      pricing: DataTypes.INTEGER,
      producer: DataTypes.STRING,
    },
    {
      tableName: 'beatz',
      timestamps: false,
    }
  );

  return Beats;
};
