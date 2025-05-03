// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: NextRequest) {
//   try {
//     const { subId } = await req.json();

//     const instance = new Razorpay({
//       key_id: process.env.RAZORPAY_LIVE_KEY!, // ✅ Make sure it's defined in `.env` file
//       key_secret: process.env.RAZORPAY_SECRET_KEY!,
//     });

//     const result = await instance.subscriptions.cancel(subId);

//     return NextResponse.json(
//       { success: true, result },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Cancel subscription error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
