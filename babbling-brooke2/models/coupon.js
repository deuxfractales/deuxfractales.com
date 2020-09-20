module.exports = (sequelize, DataTypes) => {
  const Coupons = sequelize.define(
    'Coupons',
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      discountAmount: DataTypes.TINYINT,
    },
    {
      tableName: 'coupon',
      timestamps: false,
    }
  );

  return Coupons;
};
