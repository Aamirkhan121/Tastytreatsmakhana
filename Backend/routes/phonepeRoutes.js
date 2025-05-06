// // === backend/routes/phonepe.js ===
// import express from "express";
// import crypto from "crypto";
// import axios from "axios";

// const router = express.Router();

// const MERCHANT_ID = "YOUR_MERCHANT_ID";
// const SALT_KEY = "YOUR_SALT_KEY";
// const SALT_INDEX = "YOUR_SALT_INDEX";

// router.post("/pay", async (req, res) => {
//   const { amount, name, email, phone } = req.body;

//   const transactionId = `TXN_${Date.now()}`;
//   const redirectUrl = `http://localhost:5173/payment-success`;
//   const callbackUrl = `http://localhost:5000/api/phonepe/status/${transactionId}`;

//   const payload = {
//     merchantId: MERCHANT_ID,
//     transactionId,
//     amount: amount * 100,
//     merchantUserId: "user_001",
//     redirectUrl,
//     redirectMode: "POST",
//     callbackUrl,
//     mobileNumber: phone,
//     paymentInstrument: {
//       type: "PAY_PAGE"
//     }
//   };

//   const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
//   const stringToSign = base64Payload + "/pg/v1/pay" + SALT_KEY;

//   const xVerify = crypto
//     .createHash("sha256")
//     .update(stringToSign)
//     .digest("hex") + "###" + SALT_INDEX;

//   try {
//     const { data } = await axios.post(
//       "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
//       { request: base64Payload },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-VERIFY": xVerify,
//           "X-MERCHANT-ID": MERCHANT_ID,
//         },
//       }
//     );

//     if (data.success) {
//       const paymentUrl = data.data.instrumentResponse.redirectInfo.url;
//       res.json({ url: paymentUrl });
//     } else {
//       res.status(400).json({ message: "Payment initiation failed", data });
//     }
//   } catch (error) {
//     console.error("PhonePe error:", error.response?.data || error.message);
//     res.status(500).json({ message: "Payment failed" });
//   }
// });

// export default router;
