import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "@/db/db";
import { sendEmail } from "@/lib/email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  // Email and password authentication with email verification
  emailAndPassword: {
    enabled: true,
    // autoSignIn: false,
    requireEmailVerification: true,
    // Reset Password
    sendResetPassword: async ({ user, url, token }, _request) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Your password reset link is ${url}?token=${token}`,
      });
    },
    onPasswordReset: async ({ user }, _request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, _request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Your email verification link is ${url}?token=${token}`,
      });
    },
  },
  plugins: [openAPI()],
});
