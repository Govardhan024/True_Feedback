This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev# True Feedback

True Feedback is a Next.js-based application designed to facilitate anonymous feedback and question-asking. It offers a seamless and private way for users to collect feedback without compromising the anonymity of the respondents. 

## Key Features

- **Anonymous Feedback:** Respondents can give feedback or answer questions without the need to log in.
- **Role-Based Access Control:**
  - Users who want to generate feedback links are required to create an account.
  - Respondents filling out feedback forms do not need to log in.
- **Authentication and Authorization:** Implemented using NextAuth for secure account creation and login.
- **OTP Verification:** Integrated via the Resend API for enhanced security during account creation.
- **Smart Message Suggestions:** Powered by ChatGPT to provide intelligent suggestions for feedback content.
- **Modern UI Design:** Developed with ShadCN for a clean and user-friendly interface.

## What is True Feedback?

True Feedback is a platform dedicated to maintaining the anonymity of respondents, making it ideal for environments where privacy is crucial. It allows users to create feedback forms and share them with others without requiring the respondents to log in or reveal their identity. The application ensures that feedback is candid and unbiased.

## How to Execute the Code

Follow these steps to set up and run the True Feedback application:

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn
- MongoDB Atlas account for the database
- Docker (optional, if containerizing the app)

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/true-feedback.git
   cd true-feedback
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_mongoDB_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   RESEND_API_KEY=your_resend_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser:
   Navigate to `http://localhost:3000`.

### Using Docker (Optional)

1. Build the Docker image:
   ```bash
   docker build -t true-feedback .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env true-feedback
   ```

3. Access the application at `http://localhost:3000`.

## How It Works

1. **User Registration:**
   - Users must create an account to generate feedback links.
   - Authentication is secured using NextAuth with OTP verification.

2. **Feedback Link Generation:**
   - Logged-in users can generate unique feedback links to share.

3. **Anonymous Feedback:**
   - Recipients of the feedback link can fill out the form without logging in, ensuring their anonymity.

4. **Role-Based Access Control:**
   - Only authenticated users can manage feedback forms (e.g., create, view, or delete).
   - Respondents only have access to the specific forms they are invited to.

## Technologies Used

- **Frontend:** Next.js, ShadCN
- **Backend:** Node.js, MongoDB
- **Authentication:** NextAuth, Resend API for OTP verification
- **Suggestions:** ChatGPT integration

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For any issues or contributions, feel free to raise a pull request or open an issue in the repository.

# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
