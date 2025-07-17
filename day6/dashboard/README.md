## Features

- Built with **Redux Toolkit** for centralized and predictable state management across the app.
- Implemented **custom middleware** to log all dispatched actions (action type, payload, timestamp).
- These logs are stored in an **`audits` slice**, helping with debugging.
- Used **redux-persist** to persist the Redux store and audit logs across refreshes.
- Integrated **createEntityAdapter** to efficiently manage normalized collections (e.g., products/users).
- API data fetching is handled using **Redux Thunks**, keeping async logic out of components.
- The app is **offline-first**, with audit logs stored in **IndexedDB** for persistence without a network.
