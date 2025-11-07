import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EditorPage from './pages/EditorPage.jsx';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Protected route — only accessible when signed in */}
        <Route
          path="/editor/:uuid"
          element={
            <>
              <SignedIn>
                <EditorPage />
              </SignedIn>

              <SignedOut>
                {/* Clerk built-in redirect to sign-in */}
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
