import React from 'react'
import CodeEditor from './../assets/CodeEditor.svg'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img src={CodeEditor} alt="FusionCode Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-semibold text-blue-400 tracking-tight">
          FusionCode
        </h1>
      </div>

      {/* Auth Buttons */}
      <div className="flex space-x-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-transparent border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  )
}

export default Header
