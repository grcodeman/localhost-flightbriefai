# Firebase Authentication Setup

This application uses Firebase Authentication for user management. Follow these steps to configure Firebase:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "aviation-sales-report")
4. Follow the setup wizard

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication method

## 3. Get Your Firebase Configuration

1. Go to Project Settings (gear icon in the left sidebar)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname
5. Copy the Firebase configuration object

## 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Replace the values with your actual Firebase configuration values.

## 5. Test the Authentication

1. Run the development server: `npm run dev`
2. Navigate to `/login`
3. Try creating a new account with the "Sign Up" tab
4. Try signing in with existing credentials
5. Test the logout functionality from the dashboard

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already included in `.gitignore`
- All Firebase configuration values starting with `NEXT_PUBLIC_` are safe to expose in the browser
- Make sure to configure Firebase security rules for production use

## Features Included

- ✅ Email/Password authentication
- ✅ User registration (Sign Up)
- ✅ User login (Sign In)
- ✅ User logout
- ✅ Protected routes (dashboard redirects to login if not authenticated)
- ✅ Loading states and error handling
- ✅ Responsive design with dark mode support
