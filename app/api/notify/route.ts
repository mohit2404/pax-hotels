import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "Email is required!" },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE!,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASSWORD!,
      },
    });

    await transporter.sendMail({
      from: `"Pax Hotels × Satybook" <${process.env.EMAIL_USER!}>`,
      to: process.env.EMAIL_USER!,
      subject: "Welcome to Pax Hotels × Satybook!",
      text: "Welcome to Pax Hotels × Satybook!",
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>HTML Email Template</title>
          </head>
          <body
            style="
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            background-color: #ffffff;
            "
          >
            <center
              style="
                margin: 0;
                padding: 0;
                width: 100%;
                table-layout: fixed;
                padding-bottom: 60px;
              "
            >
              <table
                width="100%"
                style="
                margin: 0 auto;
                padding: 16px;
                border-spacing: 0;
                width: 100%;
                max-width: 600px;
                color: #333;
                border: 1px solid #ccc;
                border-radius: 8px;
                "
              >
                <tr>
                  <td style="padding: 16px; margin: 0">
                    <p><strong>Dear Mohit,</strong></p>
                    <p>Welcome to Pax Hotels × Satybook!</p>
                    <p>User has shown interest in our product.</p>
                    <p>User Eamil: <strong>${email}</strong></p>
                  </td>
                </tr>
              </table>
              </center>
          </body>
          </html>`,
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error?.message || error);
    return NextResponse.json(
      { message: "Email sending failed!" },
      { status: 500 }
    );
  }
}
