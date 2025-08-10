# 🎬 Movie Recommendation Web App

A modern, responsive movie recommendation web application built with Next.js, TypeScript, and the TMDB API. Discover trending movies, explore recommendations, and save your favorites with a beautiful, interactive interface.

![Movie App Screenshot](https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=1200&h=600&fit=crop)

## ✨ Features

### 🎯 Core Functionality
- **Trending Movies**: Discover what's popular this week
- **Movie Recommendations**: Explore popular movies you might enjoy
- **Movie Details**: View comprehensive information including ratings, genres, runtime, and overview
- **Favorites System**: Save and manage your favorite movies with localStorage persistence
- **Dynamic Routing**: Individual pages for each movie with detailed information

### 🎨 User Experience
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Interactive UI**: Smooth hover effects and animations on movie cards
- **Loading States**: Beautiful skeleton loaders while fetching data
- **Error Handling**: Comprehensive error messages with retry functionality
- **Heart Icon Favorites**: Visual feedback when adding/removing favorites

### 🛠 Technical Features
- **Server-Side Rendering**: Built with Next.js App Router for optimal performance
- **TypeScript**: Full type safety throughout the application
- **Image Optimization**: Next.js Image component for optimized loading
- **API Integration**: TMDB API with proper error handling and loading states
- **Local Storage**: Persistent favorites across browser sessions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd movie-recommendation-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   # Create .env.local file
   echo "NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here" > .env.local
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting Your TMDB API Key

1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Copy your API key to the `.env.local` file

## 📁 Project Structure

\`\`\`
movie-recommendation-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Homepage with trending & recommended movies
│   ├── globals.css              # Global styles and Tailwind CSS
│   └── movie/
│       └── [id]/
│           ├── page.tsx         # Movie detail page wrapper
│           └── MovieDetailContent.tsx  # Movie detail content
├── components/                   # Reusable UI components
│   ├── Header.tsx               # Application header
│   ├── MovieCard.tsx            # Individual movie card component
│   ├── MovieGrid.tsx            # Grid layout for movie cards
│   ├── LoadingSkeleton.tsx      # Loading state components
│   ├── ErrorMessage.tsx         # Error handling component
│   └── Section.tsx              # Section wrapper component
├── hooks/                       # Custom React hooks
│   └── use-favorites.ts         # Favorites management hook
├── lib/                         # Utility functions and types
│   ├── api.ts                   # TMDB API integration
│   └── types.ts                 # TypeScript type definitions
├── .env.local                   # Environment variables (create this)
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
\`\`\`

## 🎯 Pages & Routes

### Homepage (`/`)
- **Trending Movies**: Weekly trending movies from TMDB
- **Recommended Movies**: Popular movies you might enjoy
- **Your Favorites**: Saved movies from localStorage

### Movie Details (`/movie/[id]`)
- **Movie Information**: Title, release date, runtime, rating
- **Visual Elements**: Poster, backdrop image, genre tags
- **Interactive Features**: Add/remove from favorites
- **Navigation**: Back to homepage

## 🔧 API Integration

### TMDB Endpoints Used
- `/trending/movie/week` - Weekly trending movies
- `/movie/popular` - Popular movie recommendations
- `/movie/{id}` - Individual movie details

### Error Handling
- Network error recovery with retry buttons
- API key validation and helpful error messages
- Graceful fallbacks for missing data

## 💾 Data Management

### Favorites System
- **Storage**: Browser localStorage for persistence
- **Features**: Add, remove, and toggle favorite status
- **UI Feedback**: Heart icon with visual state changes
- **Data Structure**: Full movie objects stored for offline access

### State Management
- React hooks for local state management
- Custom `useFavorites` hook for favorites logic
- Proper loading and error states throughout

## 🎨 Styling & Design

### Design System
- **Colors**: Modern gradient header with clean white cards
- **Typography**: Responsive font sizes with proper hierarchy
- **Spacing**: Consistent padding and margins throughout
- **Shadows**: Subtle box shadows for depth and elevation

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tablet and desktop optimizations
- **Grid System**: CSS Grid for flexible movie card layouts
- **Touch Friendly**: Appropriate button sizes for mobile

### Animations
- **Hover Effects**: Smooth card elevation and color transitions
- **Loading States**: Shimmer animations for skeleton loaders
- **Micro Interactions**: Button hover states and favorite toggles

## 🛠 Development

### Available Scripts
\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
\`\`\`

### Code Quality
- **TypeScript**: Full type safety with strict mode
- **ESLint**: Code linting with Next.js recommended rules
- **File Organization**: Logical component and utility separation
- **Error Boundaries**: Comprehensive error handling

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `NEXT_PUBLIC_TMDB_API_KEY` in Vercel environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Add build command `npm run build` and publish directory `out`
- **Railway**: Connect GitHub repo and add environment variables
- **Docker**: Use the included Dockerfile for containerized deployment

## 🔍 Troubleshooting

### Common Issues

**API Key Not Working**
- Ensure your API key is correctly set in `.env.local`
- Restart the development server after adding environment variables
- Check that your TMDB API key is active and has the correct permissions

**Movies Not Loading**
- Verify your internet connection
- Check browser console for network errors
- Ensure TMDB API is accessible from your location

**Favorites Not Persisting**
- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Ensure you're not in incognito/private browsing mode

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB**: For providing the comprehensive movie database API
- **Next.js**: For the excellent React framework
- **Lucide React**: For the beautiful icon library
- **Vercel**: For seamless deployment and hosting

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/your-username/movie-recommendation-app/issues)
3. Create a new issue with detailed information about your problem

---

**Built with ❤️ using Next.js, TypeScript, and the TMDB API**

*Happy movie browsing! 🍿*
