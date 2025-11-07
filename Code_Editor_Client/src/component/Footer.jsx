import React from 'react'

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 right-0 bg-gray-900 text-gray-400 border-t border-gray-800 py-4 z-50">
      <div className="max-w-3xl mx-auto text-center">
        {/* Brand */}
        <h2 className="text-xl font-semibold text-blue-400 mb-1">
          FusionCode
        </h2>
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} FusionCode. All rights reserved.
          Built with <span className="text-blue-400">❤️</span> for developers worldwide.
        </p>
      </div>
    </footer>
  )
}

export default Footer