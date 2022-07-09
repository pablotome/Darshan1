const { mongo } = require("mongoose");
const Product = require("../models/productModel");
const errorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

//Update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findOne({ _id: ObjectId(req.params.id) });

  if (!product) {
    return next(new errorHandler("Producto no encontrado", 404));
  }

  product = await Product.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFinfAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Update product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findOne({
    _id: new mongo.ObjectId(req.params.id),
  });

  //console.log(`Producto a eliminar: ${req.params.id} - ${product}`);

  if (!product) {
    return next(new errorHandler("Producto no encontrado", 404));
  }

  await Product.findOneAndRemove({ _id: req.params.id });

  //console.log(`Producto ${req.params.id} eliminado`);

  res.status(200).json({
    success: true,
    message: "El producto fue eliminado",
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;

  res.status(200).json({ success: true, products, productCount });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findOne({
    _id: new mongo.ObjectId(req.params.id),
  });

  if (!product) {
    return next(new errorHandler("Producto no encontrado", 404));
  }

  res.status(200).json({ success: true, product, productCount });
});

//Create product review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id)
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.numOfReviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new errorHandler("Producto no encontrado", 404));
  }

  res.status(200).json({ success: true, reviews: product.reviews });
});

//Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new errorHandler("Producto no encontrado", 404));
  }

  const review = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  await product.findOneAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
});
