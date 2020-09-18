const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');

const userRouter = require('./users.js');

const orderRouter = require('./orders.js');

const reviewsRouter = require('./Reviews.js');

const authRouter = require('./Auth');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/reviews', reviewsRouter);

router.use('/products', productRouter);

router.use('/users', userRouter);

router.use('/orders', orderRouter);

router.use('/auth', authRouter);


module.exports = router;
