import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import aboutRouter from './routes/aboutRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js';
import Razorpay from 'razorpay';
// import cartRouter from './routes/cartRoutes.js';
// import phonepeRouter from './routes/phonepeRoutes.js';


dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: ['http://localhost:5173',  'https://tastycrunchmakhana.onrender.com','https://tastycrunchmakhana.com']
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/about', aboutRouter);
app.use('/api/products', productRouter);
app.use('/api/contact',contactRouter);
app.use('/api/users', userRouter); // Assuming you have a userRouter for authentication
app.use('/api/orders', orderRouter ); // Assuming you have an orderRouter for order operations
app.post("/api/payment/online", async(req,res)=>{
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });


        const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: req.body.receipt,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

  //   const options=req.body
  // const order = await razorpay.orders.create(options);
  // if (!order) {
  //   return res.status(500).json({ error: 'Something went wrong' });
  // }

res.status(200).json(order)
  } catch (error) {
      console.error("Error in /api/payment/order route:", error);
     res.status(500).json({ message: "Internal server error", error: error.message });
    
  }
}); // Assuming you have a paymentRouter for payment operations
// app.use('/api/cart', cartRouter); // Assuming you have a cartRouter for cart operations
// app.use('/api/phonepe', phonepeRouter); // Assuming you have a phonepeRouter for payment operations



app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
