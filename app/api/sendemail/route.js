//
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { email } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_TRANSPORTER_HOST,
      port: process.env.EMAIL_TRANSPORTER_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_TRANSPORTER_USERNAME,
        pass: process.env.EMAIL_TRANSPORTER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"TRYKNOWYOURSELF" <${process.env.EMAIL_TRANSPORTER_USERNAME}>`,
      to: email,
      subject: "Subscription",
      html: `<div class="container" style="max-width: 600px; margin: 0 auto; text-align: center;">
      <div class="bg" style="background-color: white; padding-bottom: 10px;">
          <div class="image" style="background-color: #DDFFE7; padding: 10px;">
              <img src="../../../public/assets/image-3.png" alt="" style="max-width: 100%;">
          </div>
          <div class="text" style="padding: 10px;">
              <h1>Your App Access</h1>
              <button
                  style="background-color: black; color: white; padding: 10px 20px; border: none; cursor: pointer; margin-bottom:10px;">TRY
                  KNOWYOURSELF</button>
              <p style="margin: 10px 0;">It is a long established fact that a reader will be distracted by the
                  readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution
                  of letters, as opposed to using 'Content here, content here',</p>
              <h3>We noticed you signed up on our Website
                  for Beta-Access.</h3>
          </div>
          <hr>
          <p>If you have any questions, contact our Website Guides.
              Or, visit our Help Center.</p>
      </div>
      <div class="non-bg" style="padding: 10px;">
          <hr>
          <div class="links">
              <p>About | Blogs | Contact Us</p>
          </div>
      </div>
      <div class="loremipsum">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua
      </div>
      <div class="socials" style="padding-top: 7px;">
          <img src="../../../public/assets/image-2.png" alt="" style="width: 30px; margin-right: 10px;">
          <img src="../../../public/assets/image-1.png" alt="" style="width: 30px;">
      </div>
  </div>`,
    });

    await transporter.sendMail(info);
    return new NextResponse("Email sent successfully.");
  } catch (error) {
    return new NextResponse("Internal Server Error.", { status: 500 });
  }
}
