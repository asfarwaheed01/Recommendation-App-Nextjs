import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { currentUser } from '@clerk/nextjs';

export async function POST(req) {
  try {
    const { feedback } = await req.json();

    const auth = await currentUser();

    const firstName = auth?.firstName;
    const lastName = auth?.lastName ?? '';
    const email = auth?.emailAddresses?.[0]?.emailAddress;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_TRANSPORTER_HOST,
      port: process.env.EMAIL_TRANSPORTER_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_TRANSPORTER_USERNAME,
        pass: process.env.EMAIL_TRANSPORTER_PASSWORD,
      },
    });

    const selfMailData = {
      from: process.env.EMAIL_TRANSPORTER_USERNAME,
      to: process.env.ADMIN_EMAIL,
      subject: 'Feedback Received from ' + auth ? 'User' : 'Guest User',
      text: feedback,
      html: `<div>
                <p style="font-weight: bold; display: block;">User Details:</p>
                <p>${!auth ? 'Guest User' : 'Email: ' + email}</p>
            </div>
            <div>
                <p style="font-weight: bold; display: block;">Time of Submission:</p>
                <p>${new Date().toLocaleString()}</p>
            </div>
            <div>
                <p style="font-weight: bold; display: block;">Feedback Details:</p>
                <p>${feedback}</p>
            </div>
            <br>           
            <div>
              <p style='font-weight: bold; display: block;'>
                ${auth ? '' : 'DO NOT REPLY TO THIS EMAIL.'}
              </p>
            </div>
            `,
    };

    const userMailData = {
      from: process.env.EMAIL_TRANSPORTER_USERNAME,
      to: email,
      subject: 'Thank You for Your Valuable Feedback!',
      text: 'Thank You for Your Valuable Feedback!',
      html: `<div>
                <p style="font-weight: bold; display: block;">Dear ${
                  firstName ? firstName + ' ' + lastName : email
                },</p>
            </div>
            <div>
                <p>Thank you for reaching out and sharing your thoughts with us. Your feedback is essential in shaping and improving Know Yourself. Please know that our team is carefully considering your input.</p>
            </div>
            <div>
                <p>If you have any more suggestions or need assistance, feel free to contact us.</p>
            </div>
            <br>
            <div style="line-height: 75%;">
                <p>Warm regards,</p>
                <p>Gabriel Gonzalez</p>
                <p>Know Yourself Support Team</p>
            </div>`,
    };

    await transporter.sendMail(selfMailData);
    if (auth) {
      await transporter.sendMail(userMailData);
    }

    return new NextResponse('Feedback sent successfully.');
  } catch (error) {
    return new NextResponse('Internal Server Error.', { status: 500 });
  }
}
