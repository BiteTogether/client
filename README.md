# BiteTogether - Food Social Network App

[![React Native](https://img.shields.io/badge/React%20Native-0.74+-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2053+-black.svg)](https://expo.dev/)

A social network application focused on food experiences, connecting users through their culinary interests within their social circles. Built with React Native, TypeScript, and Expo.

## 🚀 Features

- **Authentication & User Management**: Secure login/register, profile customization
- **Feed Module**: Share food posts and experiences
- **Matching & Swiping**: Swipe to choose restaurants, match with friends
- **Favorites**: Manage favorite places and dining suggestions
- **Real-time Chat**: 1-on-1 and group messaging with Swipe Battle integration
- **Swipe Battle**: Group voting to choose dining locations
- **Place Details**: Detailed restaurant information
- **Map Integration**: Google Maps search and location services
- **AI Recommendations**: Personalized suggestions based on preferences
- **Settings & Preferences**: Customizable notifications and app settings

## 🛠 Tech Stack

### Core Framework
- **React Native** with **Expo CLI** (SDK 53+)
- **TypeScript** for type safety
- **React Navigation 6** for navigation

### State Management & Data
- **Redux Toolkit** for state management
- **Axios** for API communication
- **AsyncStorage** for local data persistence

### UI & Styling
- **React Native Elements** for UI components
- **React Native Vector Icons** for iconography
- **React Native Reanimated** & **Gesture Handler** for animations

### Real-time & Communication
- **Socket.IO Client** for real-time features
- **React Native Gifted Chat** for chat interface

### Maps & Location
- **React Native Maps** for map display
- **Expo Location** for location services

### Form & Validation
- **Formik** for form handling
- **Yup** for validation schemas

### Media & Notifications
- **Expo Image Picker** for image selection
- **Expo Notifications** for push notifications

### Development Tools
- **ESLint** & **Prettier** for code quality
- **TypeScript** for type checking

## 📱 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio & Emulator (for Android development)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BiteTogether
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI globally (if not already installed)**
   ```bash
   npm install -g expo-cli
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on specific platforms**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🏗 Project Structure

```
BiteTogether/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/         # Common UI components
│   │   ├── authentication/ # Auth-specific components
│   │   ├── chat/           # Chat components
│   │   └── swiping/        # Swipe components
│   ├── screens/            # Main application screens
│   │   ├── Authentication/
│   │   ├── Chat/
│   │   ├── Swiping/
│   │   ├── Feed/
│   │   ├── Favorites/
│   │   ├── PlaceDetail/
│   │   └── Settings/
│   ├── services/           # API and business logic
│   │   ├── api/           # API service and endpoints
│   │   └── websocket/     # Socket.IO configuration
│   ├── store/             # Redux store and slices
│   │   └── slices/        # Redux slices
│   ├── navigation/        # Navigation configuration
│   ├── utils/            # Helper functions and constants
│   │   ├── constants/    # App constants
│   │   └── helpers/      # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── hooks/            # Custom hooks
├── assets/               # Static assets
│   ├── images/
│   ├── fonts/
│   └── animations/
└── docs/                # Documentation
```

## 🔧 Development Commands

```bash
# Start development server
npm start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check

# Build for production
npm run build

# Build for specific platforms
npm run build:android
npm run build:ios
```

## 🌐 Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
API_BASE_URL=http://localhost:8080
API_TIMEOUT=10000

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Socket.IO
WEBSOCKET_URL=ws://localhost:8080

# App Configuration
APP_ENV=development
```

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow ESLint and Prettier configurations
- Use meaningful component and variable names
- Write JSDoc comments for complex functions

### Git Workflow
- Create feature branches from `develop`
- Use conventional commit messages
- Submit PRs for code review
- Ensure all tests pass before merging

### Component Guidelines
- Use functional components with hooks
- Implement proper error handling
- Follow the established folder structure
- Create reusable components when possible

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📦 Build & Deployment

### Development Build
```bash
expo start
```

### Production Build
```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Build for both platforms
eas build --platform all
```

### App Store Deployment
```bash
# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer**: React Native, TypeScript, UI/UX
- **Backend Developer**: Java Spring Boot, PostgreSQL, WebSocket
- **QA Engineer**: Testing, Quality Assurance

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in the `docs/` folder

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Project setup and architecture
- ✅ Authentication system
- 🔄 Basic navigation and UI components
- 🔄 API integration

### Phase 2
- 📋 Core features implementation
- 📋 Real-time chat functionality
- 📋 Swipe and matching system

### Phase 3
- 📋 Advanced features (AI recommendations)
- 📋 Performance optimization
- 📋 Testing and deployment

---

**BiteTogether** - Connecting people through food experiences 🍽️
