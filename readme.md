# FusionCode 

A real-time collaborative code editor built with React, Socket.IO, and modern web technologies. Write, share, and execute JavaScript code together in synchronized rooms.

![FusionCode](https://img.shields.io/badge/FusionCode-Collaborative%20Editor-blue)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-010101?logo=socket.io)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?logo=tailwind-css)

##  Features

###  Real-Time Collaboration
- **Live Code Synchronization**: See changes as other users type in real-time
- **Multi-User Support**: Multiple developers can work in the same room simultaneously
- **User Presence**: See who's currently in your coding session with avatars

###  Code Editor
- **Syntax Highlighting**: Powered by CodeMirror with JavaScript/JSX support
- **Dark Theme**: Eye-friendly One Dark theme
- **Code Execution**: Run JavaScript code directly in the browser
- **Terminal Output**: View execution results and errors in a dedicated terminal

###  Authentication & Security
- **Clerk Authentication**: Secure sign-in with multiple providers
- **Session Management**: Persistent user sessions with localStorage
- **Protected Routes**: Editor pages accessible only to authenticated users

###  Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Smooth Animations**: Framer Motion powered transitions
- **Split Panels**: Resizable editor and terminal views
- **Toast Notifications**: Real-time feedback for user actions

##  Project Structure

```
Code_Editor/
├── Code_Editor_Client/          # Frontend React application
│   ├── src/
│   │   ├── component/           # Reusable UI components
│   │   │   ├── CodeEditor.jsx   # Monaco-based code editor
│   │   │   ├── Terminal.jsx     # Output display terminal
│   │   │   ├── LeftSideBar.jsx  # User list sidebar
│   │   │   ├── RightSideBar.jsx # Editor & terminal container
│   │   │   ├── Header.jsx       # App header with auth
│   │   │   └── Footer.jsx       # App footer
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page with room creation
│   │   │   └── EditorPage.jsx   # Main collaborative editor
│   │   ├── context/
│   │   │   └── UserContext.jsx  # Global user state management
│   │   ├── Action.js            # Socket.IO action constants
│   │   ├── Socket.js            # Socket.IO client initialization
│   │   ├── App.jsx              # Main app component with routing
│   │   └── main.jsx             # Application entry point
│   ├── public/                  # Static assets
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Frontend dependencies
│
└── Code_Editor_Server/          # Backend Node.js server
    ├── Server.js                # Express + Socket.IO server
    ├── Action.js                # Socket action constants
    └── package.json             # Backend dependencies
```

##  Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Clerk Account** (for authentication)

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd Code_Editor
```

#### 2. Setup Backend Server

```bash
cd Code_Editor_Server
npm install
npm start
```

The server will start on `http://localhost:3000`

#### 3. Setup Frontend Client

```bash
cd Code_Editor_Client
npm install
```

#### 4. Configure Environment Variables

Create a `.env` file in `Code_Editor_Client/`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

Get your Clerk publishable key from [Clerk Dashboard](https://dashboard.clerk.com/)

#### 5. Start the Development Server

```bash
npm run dev
```

The client will start on `http://localhost:5173`

##  Usage

### Creating a Room

1. **Sign In**: Click the "Login" button and authenticate via Clerk
2. **Create Room**: On the home page, click "Create One" to generate a unique room ID
3. **Share ID**: Copy the room ID and share it with collaborators
4. **Join Room**: Enter your name and click "Join Room"

### Collaborating

1. **Write Code**: Type in the CodeMirror editor
2. **See Changes**: All users in the room see updates in real-time
3. **Run Code**: Click the "Run" button to execute JavaScript
4. **View Output**: Check the terminal below for results or errors
5. **End Session**: Click "End Room" to leave

##  Technical Stack

### Frontend
- **React 19.1.1**: Modern UI library
- **Vite 7.1.7**: Fast build tool and dev server
- **TailwindCSS 4.1.14**: Utility-first styling
- **CodeMirror 6**: Advanced code editor
- **Socket.IO Client 4.8.1**: Real-time communication
- **Clerk**: Authentication and user management
- **React Router 7.9.4**: Client-side routing
- **Framer Motion 12.23.24**: Animation library
- **React Split 2.0.14**: Resizable split panels
- **React Toastify 11.0.5**: Toast notifications
- **UUID 13.0.0**: Unique ID generation

### Backend
- **Node.js**: Runtime environment
- **Express 5.1.0**: Web server framework
- **Socket.IO 4.8.1**: WebSocket communication
- **CORS 2.8.5**: Cross-origin resource sharing

##  Socket.IO Events

### Client → Server
- `JOIN`: User joins a room with username and room ID
- `CODE_CHANGE`: User edits code, broadcast to room
- `SYNC_CODE`: Request full code sync for new user
- `LEAVE`: User leaves the room

### Server → Client
- `JOINED`: Notify all users when someone joins
- `DISCONNECTED`: Notify when a user leaves
- `CODE_CHANGE`: Broadcast code changes to all users
- `SYNC_CODE`: Send full code to newly joined user

##  Security Features

- **Protected Routes**: Editor accessible only to authenticated users
- **Secure WebSocket**: Socket.IO with proper CORS configuration
- **Session Persistence**: User data stored in localStorage
- **Authentication State**: Managed by Clerk with secure tokens

##  UI Components

### CodeEditor
- Syntax highlighting for JavaScript/JSX
- Dark theme with line numbers
- Auto-completion and bracket matching
- Real-time collaborative editing

### Terminal
- Displays code execution output
- Shows compilation errors
- Clearable output view
- Styled like a real terminal

### LeftSideBar
- Lists all connected users
- Shows user avatars (from Clerk)
- Highlights current user
- Real-time user presence updates

### RightSideBar
- Houses the code editor
- Contains the terminal
- Resizable split view
- Run and End Room controls

##  State Management

- **UserContext**: Global state for username and room ID
- **localStorage**: Persists user data across sessions
- **Socket.IO**: Real-time state synchronization across clients

##  Build & Deployment

### Build for Production

```bash
cd Code_Editor_Client
npm run build
```

Output will be in `dist/` folder

### Deploy Backend

```bash
cd Code_Editor_Server
# Deploy to your preferred hosting (Heroku, Railway, etc.)
```

Update [`Socket.js`](Code_Editor_Client/src/Socket.js) with your production server URL:

```js
return io('https://your-production-server.com', options);
```

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the ISC License.

##  Acknowledgments

- [CodeMirror](https://codemirror.net/) for the excellent code editor
- [Socket.IO](https://socket.io/) for real-time communication
- [Clerk](https://clerk.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

##  Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with  by developers, for developers** 🚀
```

