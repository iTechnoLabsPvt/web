import config from 'config';
import item from './models/item';
import logger from './utilities/logger';
const mysqlDb = config.get('mysqlDb');
const { Sequelize } = require('sequelize');
const UserModel = require('./models/user');
const VendorModel = require('./models/vendors');
const CategoriesModel = require('./models/categories');
const AnyoneHelpModel = require('./models/anyone_help');
const SubCategoriesModel = require('./models/subcategories');
const ProductModel = require('./models/products');
const CartModel = require('./models/cart');
const WishlistModel = require('./models/wishlist');
const OrderModel = require('./models/order');
const ItemModel = require('./models/item');
const PaymentModel = require('./models/payments');
const MockupsModel = require('./models/mockups');
const FaqsModel = require('./models/faqs');
const PagesModel = require('./models/staticPages');
let Users,
  Vendors,
  AnyoneHelpSchema,
  CategoriesSchema,
  SubCategoriesSchema,
  ProductsSchema,
  CartSchema,
  WishlistSchema,
  OrderSchema,
  ItemSchema,
  PaymentSchema,
  MockupsSchema,
  FaqsSchema,
  PagesSchema;

const sequelize = new Sequelize(mysqlDb.name, mysqlDb.username, mysqlDb.password, {
  host: mysqlDb.host,
  port: mysqlDb.port,
  dialect: mysqlDb.dialect
});

//models
Users = UserModel(sequelize, Sequelize);
Vendors = VendorModel(sequelize, Sequelize);
CategoriesSchema = CategoriesModel(sequelize, Sequelize);
AnyoneHelpSchema = AnyoneHelpModel(sequelize, Sequelize);
SubCategoriesSchema = SubCategoriesModel(sequelize, Sequelize);
ProductsSchema = ProductModel(sequelize, Sequelize);
CartSchema = CartModel(sequelize, Sequelize);
WishlistSchema = WishlistModel(sequelize, Sequelize);
OrderSchema = OrderModel(sequelize, Sequelize);
ItemSchema = ItemModel(sequelize, Sequelize);
PaymentSchema = PaymentModel(sequelize, Sequelize);
MockupsSchema = MockupsModel(sequelize, Sequelize);
FaqsSchema = FaqsModel(sequelize, Sequelize);
PagesSchema = PagesModel(sequelize, Sequelize);

export default async cb => {
  try {
    await sequelize.authenticate();

    //associations
    CategoriesSchema.hasMany(SubCategoriesSchema, {
      as: 'sub_categories',
      foreignKey: 'category_id'
    });
    SubCategoriesSchema.belongsTo(CategoriesSchema, { foreignKey: 'category_id' });
    ProductsSchema.belongsTo(Vendors, { foreignKey: 'vendor_id' });
    CartSchema.belongsTo(Users, { foreignKey: 'user_id' });
    CartSchema.belongsTo(ProductsSchema, { foreignKey: 'product_id' });
    WishlistSchema.belongsTo(Users, { foreignKey: 'user_id' });
    WishlistSchema.belongsTo(ProductsSchema, { foreignKey: 'product_id' });
    OrderSchema.hasMany(ItemSchema, {
      as: 'items',
      foreignKey: 'order_id'
    });

    ItemSchema.belongsTo(OrderSchema, { foreignKey: 'order_id' });
    PaymentSchema.belongsTo(OrderSchema, { foreignKey: 'order_id' });
    MockupsSchema.belongsTo(Users, { foreignKey: 'user_id' });
    OrderSchema.belongsTo(Users, { foreignKey: 'user_id' });
    OrderSchema.belongsTo(ItemSchema, { foreignKey: 'user_id' });
    MockupsSchema.belongsTo(ProductsSchema, { foreignKey: 'product_id' });
    FaqsSchema.belongsTo(Users, { foreignKey: 'user_id' });
    logger.info('MYSQL Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
  /* Force sync all models 
    It will drop the table first  
    and re-create it afterwards */

  // sequelize.sync({ force: true })
  // .then(() => {
  //     cb(true);
  //     console.log(`Database & tables created!`)
  // });

  /* Sync all models that are not 
    already in the database  */

  sequelize.sync().then(() => {
    console.log(`Database & tables Synced!`);
    cb(true);
  });
};

export const sequelizeConnection = sequelize;
export const User = Users;
export const Vendor = Vendors;
export const Categories = CategoriesSchema;
export const AnyoneHelp = AnyoneHelpSchema;
export const SubCategories = SubCategoriesSchema;
export const Products = ProductsSchema;
export const Cart = CartSchema;
export const Wishlist = WishlistSchema;
export const Order = OrderSchema;
export const Item = ItemSchema;
export const Payment = PaymentSchema;
export const Mockup = MockupsSchema;
export const Faq = FaqsSchema;
export const Page = PagesSchema;
