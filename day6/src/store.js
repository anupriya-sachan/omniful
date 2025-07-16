import { configureStore } from '@reduxjs/toolkit'
import { quoteReducer } from './pages/Quotes/quoteSlice'
import { bookmarkReducer } from './pages/Bookmark/bookmarkSlice'

export const store = configureStore({
  reducer: {
    quotes:quoteReducer,
    bookmarks:bookmarkReducer
  },
})