# Angular API Application Flow Documentation

## High-Level Overview

This is an Angular application built with the modern standalone component architecture and signals-based reactivity. The application is a lyrics search tool that interacts with the LRCLIB API to search for songs, view lyrics, and manage favorites. The application follows a single-page application (SPA) pattern with client-side routing.

### Key Technologies
- **Angular 18+** with standalone components
- **Signals** for reactive state management
- **RxJS** for handling asynchronous API calls
- **HttpClient** for HTTP requests to LRCLIB API
- **LocalStorage** for persistent favorites storage
- **Reactive Forms** for form handling
- **Angular Router** for client-side navigation

### Application Purpose
The application allows users to:
1. Search for songs by artist, title, or album
2. View detailed information about songs including lyrics
3. Add/remove songs to/from favorites
4. View their favorites list
5. Contact the application via a contact form

## Main Components

### 1. Root Component ([`app.ts`](src/app/app.ts))
- **Location**: [`src/app/app.ts`](src/app/app.ts)
- **Purpose**: Main application component that serves as the root of the component tree
- **Key Features**:
  - Uses signals for reactive state management
  - Renders the navigation bar and router outlet
  - Contains the main application layout

### 2. Navigation Component ([`navbar.ts`](src/app/components/navbar/navbar.ts))
- **Location**: [`src/app/components/navbar/navbar.ts`](src/app/components/navbar/navbar.ts)
- **Purpose**: Provides navigation between different pages
- **Key Features**:
  - Uses `RouterLink` for navigation
  - Uses `RouterLinkActive` for active route styling
  - Contains links to Home, Search, Favorites, and Contact pages

### 3. Page Components

#### Home Page ([`home.ts`](src/app/pages/home/home.ts))
- **Location**: [`src/app/pages/home/home.ts`](src/app/pages/home/home.ts)
- **Purpose**: Landing page with welcome message and information
- **Key Features**: Static content with navigation links

#### Search Page ([`search.ts`](src/app/pages/search/search.ts))
- **Location**: [`src/app/pages/search/search.ts`](src/app/pages/search/search.ts)
- **Purpose**: Search functionality for songs
- **Key Features**:
  - Reactive form for search input
  - API integration for song search
  - Display of search results with lyrics toggle
  - Favorites management (add/remove)
  - Loading and error states

#### Details Page ([`details.ts`](src/app/pages/details/details.ts))
- **Location**: [`src/app/pages/details/details.ts`](src/app/pages/details/details.ts)
- **Purpose**: Display detailed information about a specific song
- **Key Features**:
  - Extracts song ID from URL parameters
  - Fetches song details from API
  - Displays full song information
  - Favorites management
  - Loading and error states

#### Favorites Page ([`favorites.ts`](src/app/pages/favorites/favorites.ts))
- **Location**: [`src/app/pages/favorites/favorites.ts`](src/app/pages/favorites/favorites.ts)
- **Purpose**: Display user's favorite songs
- **Key Features**:
  - Reads favorites from reactive signal
  - Displays list of favorite songs
  - Allows removal of favorites
  - Navigation to song details

#### Contact Page ([`contact.ts`](src/app/pages/contact/contact.ts))
- **Location**: [`src/app/pages/contact/contact.ts`](src/app/pages/contact/contact.ts)
- **Purpose**: Contact form for user communication
- **Key Features**:
  - Reactive form with validation
  - Form field validation (name, email, message)
  - Success message display
  - Form reset after submission

### 4. Services

#### API Service ([`api.ts`](src/app/services/api.ts))
- **Location**: [`src/app/services/api.ts`](src/app/services/api.ts)
- **Purpose**: HTTP client for LRCLIB API interactions
- **Key Features**:
  - `search(q: string)`: Search songs by term
  - `getById(id: number)`: Get song details by ID
  - Uses HttpClient for HTTP requests
  - Returns RxJS Observables

#### Favorites Service ([`favorites.ts`](src/app/services/favorites.ts))
- **Location**: [`src/app/services/favorites.ts`](src/app/services/favorites.ts)
- **Purpose**: Manages user's favorite songs
- **Key Features**:
  - Uses signals for reactive state
  - Persists data in localStorage
  - `toggle(song)`: Add/remove song from favorites
  - `remove(id)`: Remove song by ID
  - `isFavorite(id)`: Check if song is in favorites
  - `favorites`: Read-only signal with favorites list

## Control Flow

### Application Startup Flow

1. **Browser loads index.html**
   - Loads the application shell
   - Contains `<app-root>` element

2. **main.ts executes**
   - [`bootstrapApplication(App, appConfig)`](src/main.ts:30) is called
   - Angular platform is initialized
   - Root component is bootstrapped

3. **App Component Initialization**
   - [`app.ts`](src/app/app.ts) component is created
   - Signals are initialized
   - Template is rendered with navbar and router-outlet

4. **Router Initialization**
   - Router is configured with routes from [`app.routes.ts`](src/app/app.routes.ts)
   - Initial route is determined from browser URL

### Navigation Flow

#### Route Configuration ([`app.routes.ts`](src/app/app.routes.ts))
```typescript
[
  { path: '', component: Home },           // Home page
  { path: 'search', component: Search },   // Search page
  { path: 'details/:id', component: Details }, // Song details
  { path: 'contact', component: Contact }, // Contact page
  { path: 'favorites', component: Favorites }, // Favorites page
  { path: '**', redirectTo: '' }           // Wildcard route (404)
]
```

#### Navigation Scenarios

**1. User visits application (root URL)**
```
Browser URL: /
→ Router matches '' path
→ Home component is rendered
→ User sees welcome page
```

**2. User navigates to Search page**
```
User clicks "Search" link
→ RouterLink directive triggers navigation
→ Router matches 'search' path
→ Search component is rendered
→ User sees search form
```

**3. User performs a search**
```
User enters search term and submits form
→ onSubmit() method is called
→ Form validation is performed
→ Api.search(q) is called
→ HTTP GET request to https://lrclib.net/api/search?q={term}
→ Observable subscription handles response
→ Results are displayed in UI
→ User can click on a song to view details
```

**4. User views song details**
```
User clicks on a song from search results
→ RouterLink navigates to /details/{id}
→ Router matches 'details/:id' path
→ Details component is initialized
→ ngOnInit() extracts ID from URL parameters
→ Api.getById(id) is called
→ HTTP GET request to https://lrclib.net/api/get/{id}
→ Song details are displayed
```

**5. User manages favorites**
```
User clicks heart icon on a song
→ toggleFavorite() method is called
→ FavoritesService.toggle(song) is executed
→ Song is added to/removed from favorites signal
→ Data is persisted to localStorage
→ UI updates reactively via signals
```

**6. User views favorites**
```
User clicks "Favorites" link
→ Router navigates to /favorites
→ Favorites component is rendered
→ FavoritesService.favorites signal is read
→ List of favorite songs is displayed
```

**7. User contacts via form**
```
User fills contact form and submits
→ onSubmit() method is called
→ Form validation is performed
→ If valid: alert message is shown
→ Form is reset
→ submitted flag is set
→ After 3 seconds, form is shown again
```

### Data Flow Patterns

#### 1. API Data Flow (Search/Details)
```
Component → Api Service → HttpClient → LRCLIB API
     ↑           ↓
     └─── Observable subscription
           ↓
     Component state update
           ↓
     Template re-rendering
```

#### 2. Favorites Data Flow
```
Component → FavoritesService → Signal → localStorage
     ↑           ↓
     └─── Reactive updates
           ↓
     Template re-rendering (automatic via signals)
```

#### 3. Form Data Flow (Search/Contact)
```
User Input → Reactive Form → Form Group → Component Method
     ↓
Validation
     ↓
API Call / Action
     ↓
State Update
     ↓
UI Update
```

## Important Functions

### API Service Functions

#### [`search(q: string): Observable<Song[]>`](src/app/services/api.ts:70)
- **Purpose**: Search songs by term
- **Parameters**: `q` - search query string
- **Returns**: Observable of array of Song objects
- **HTTP Method**: GET
- **Endpoint**: `https://lrclib.net/api/search?q={q}`
- **Usage**: Called from Search component when user submits search form

#### [`getById(id: number): Observable<Song>`](src/app/services/api.ts:83)
- **Purpose**: Get detailed information about a specific song
- **Parameters**: `id` - song identifier
- **Returns**: Observable of Song object
- **HTTP Method**: GET
- **Endpoint**: `https://lrclib.net/api/get/{id}`
- **Usage**: Called from Details component when viewing song details

### Favorites Service Functions

#### [`toggle(s: Song): void`](src/app/services/favorites.ts:55)
- **Purpose**: Add or remove a song from favorites
- **Parameters**: `s` - Song object to toggle
- **Logic**: 
  - If song exists in favorites → remove it
  - If song doesn't exist → add it
- **Side Effects**: Updates localStorage
- **Reactivity**: Updates signal that triggers UI updates

#### [`remove(id: number): void`](src/app/services/favorites.ts:72)
- **Purpose**: Remove a song from favorites by ID
- **Parameters**: `id` - song identifier
- **Logic**: Filters out song with matching ID
- **Side Effects**: Updates localStorage
- **Reactivity**: Updates signal that triggers UI updates

#### [`isFavorite(id: number): boolean`](src/app/services/favorites.ts:46)
- **Purpose**: Check if a song is in favorites
- **Parameters**: `id` - song identifier
- **Returns**: boolean indicating if song is in favorites
- **Usage**: Used in templates to show/hide favorite icons

### Search Component Functions

#### [`onSubmit(): void`](src/app/pages/search/search.ts:88)
- **Purpose**: Handle search form submission
- **Logic**:
  1. Validates search term
  2. Sets loading state
  3. Calls API service
  4. Handles success/error responses
  5. Updates component state
- **Error Handling**: Shows error message if API call fails

#### [`toggleLyrics(s: any, e: Event): void`](src/app/pages/search/search.ts:123)
- **Purpose**: Toggle lyrics visibility for a song
- **Parameters**: `s` - song object, `e` - click event
- **Logic**: Flips `showLyrics` property on song object
- **Event Handling**: Stops event propagation

#### [`toggleFavorite(s: Song, e: Event): void`](src/app/pages/search/search.ts:134)
- **Purpose**: Add/remove song from favorites
- **Parameters**: `s` - song object, `e` - click event
- **Logic**: Calls FavoritesService.toggle()
- **Event Handling**: Stops event propagation

### Details Component Functions

#### [`ngOnInit(): void`](src/app/pages/details/details.ts:85)
- **Purpose**: Initialize component and load song data
- **Logic**:
  1. Extract song ID from URL parameters
  2. Validate ID exists
  3. Call API service to get song details
  4. Handle success/error responses
  5. Update component state
- **Lifecycle**: Called automatically by Angular when component is initialized

#### [`toggleFavorite(): void`](src/app/pages/details/details.ts:117)
- **Purpose**: Toggle song in favorites
- **Logic**: Only executes if song is loaded
- **Usage**: Called from template when user clicks favorite button

### Favorites Component Functions

#### [`remove(id: number, event: Event): void`](src/app/pages/favorites/favorites.ts:70)
- **Purpose**: Remove song from favorites
- **Parameters**: `id` - song identifier, `event` - click event
- **Logic**: Calls FavoritesService.remove()
- **Event Handling**: Stops propagation and prevents default

### Contact Component Functions

#### [`onSubmit(): void`](src/app/pages/contact/contact.ts:78)
- **Purpose**: Handle contact form submission
- **Logic**:
  1. Validates form
  2. Shows success alert
  3. Resets form
  4. Sets submitted flag
  5. Resets submitted flag after 3 seconds
- **Validation**: Checks required fields, email format, minimum message length

## State Management

### Reactive Signals
The application uses Angular Signals for state management:

1. **App Component**
   - `title`: Signal for application title

2. **Favorites Service**
   - `sig`: Private signal storing favorites array
   - `favorites`: Public read-only signal for UI consumption

3. **Search Component**
   - `songs`: Array of search results
   - `searched`: Boolean flag for search state
   - `loading`: Boolean flag for loading state
   - `error`: String for error messages

4. **Details Component**
   - `song`: Current song details
   - `loading`: Boolean flag for loading state
   - `error`: String for error messages

5. **Contact Component**
   - `submitted`: Boolean flag for form submission state

### Local Storage Persistence
- Favorites are persisted in localStorage using key `'angular-api-favorites'`
- Data is automatically saved when favorites are modified
- Data is loaded on application startup

## Error Handling

### API Errors
- **Search Component**: Shows "Error al buscar." message
- **Details Component**: Shows "Error." message
- **Console Logging**: All errors are logged to console for debugging

### Form Validation
- **Search Form**: Validates that search term is not empty
- **Contact Form**: Validates name (required), email (required + format), message (required + min 10 chars)

### Route Errors
- **Wildcard Route**: Redirects to home page for any undefined route

## Performance Considerations

### 1. Signal-Based Reactivity
- Uses signals instead of traditional change detection
- More efficient updates (only affected components re-render)
- Better performance than Zone.js-based change detection

### 2. Lazy Loading
- Components are loaded on-demand via routing
- No initial bundle bloat

### 3. HTTP Caching
- Browser may cache API responses
- No additional caching layer implemented

### 4. LocalStorage
- Minimal storage operations
- Synchronous but fast for small data sets

## Development Workflow

### Adding a New Feature
1. Create new component in appropriate directory
2. Add route to [`app.routes.ts`](src/app/app.routes.ts) if needed
3. Update navigation in [`navbar.html`](src/app/components/navbar/navbar.html)
4. Implement component logic
5. Add styles in corresponding CSS file
6. Write tests in spec file

### Testing
- Each component has a corresponding `.spec.ts` file
- Tests use Angular testing utilities
- Run tests with `ng test` or `npm test`

### Building for Production
- Use `ng build` for production build
- Output is optimized and minified
- Ready for deployment to static hosting

## API Integration

### LRCLIB API
- **Base URL**: `https://lrclib.net/api`
- **Endpoints**:
  - `GET /search?q={query}` - Search songs
  - `GET /get/{id}` - Get song details
- **Rate Limiting**: Not specified in application (handled by API)
- **Authentication**: Not required for public endpoints

## Browser Compatibility

### Supported Browsers
- Modern browsers with ES6+ support
- Angular 18+ requires:
  - Chrome (last 2 versions)
  - Firefox (last 2 versions)
  - Safari (last 2 versions)
  - Edge (last 2 versions)

### Polyfills
- Angular handles polyfills automatically
- No manual polyfill configuration needed

## Deployment

### Static Hosting
The application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

### Build Output
- `dist/` directory contains production build
- `index.html` is the entry point
- All assets are optimized and bundled

## Summary

This Angular application demonstrates modern Angular development practices:
- **Standalone Components**: No NgModule required
- **Signals**: Reactive state management
- **TypeScript**: Full type safety
- **RxJS**: Observable-based async operations
- **Reactive Forms**: Form handling with validation
- **Client-side Routing**: SPA navigation
- **LocalStorage**: Persistent data storage
- **API Integration**: RESTful service consumption

The application follows a clean architecture with separation of concerns:
- **Components**: UI and user interaction
- **Services**: Business logic and data access
- **Models**: Data structures (interfaces)
- **Routing**: Navigation and URL management

The flow is straightforward: User → Component → Service → API → Component → UI, with reactive updates throughout the application.