import localFont from "next/font/local";
import "./globals.css";
import { Amplify } from 'aws-amplify';
import awsmobile from '../aws-exports.js';

//Amplify.configure(awsmobile);

Amplify.configure({
  Auth: {
    Cognito: {
      identityPoolId: 'us-east-1:bb82e961-df6d-4d7c-a5e3-16e674f1dc47', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-east-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'us-east-1_1H5lUh7Af', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId:'69ciph84eapoafm8tu1sebfm38'
      }
    }
  });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
