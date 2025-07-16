### 🔗 Deployed Link

**[Live App](https://day5-fck8.onrender.com/)**

---

### 📘 Concepts Covered

1. **React Component Lifecycle**
   React components go through mounting, updating, and unmounting phases, where you can run specific logic at each stage.

2. **Async State Updates**
   State updates in React are batched and asynchronous, so accessing updated state right after calling `setState` may not reflect changes. Usually, callbacks are used to improve this.

3. **Normal Function vs Hook**
   Hooks usually start with `use` while normal functions follow strict camelCase. Hooks have access to closures of React states, whereas normal functions or functional components in React typically just return JSX.

4. **Higher-Order Components (HOCs)**
   HOCs are functions that wrap a component to enhance or modify its behavior without changing its code. They usually add some prop or additional feature like authentication.

5. **Compound Components**
   A pattern where multiple related components share implicit state and behavior via a common parent. You usually create subcomponents that are rendered as children—often more readable than HOCs.

6. **Controlled vs Uncontrolled Components**
   Controlled components rely on React state to manage form inputs, usually for more complex architectures. Uncontrolled components use refs and are suited for simpler use cases (e.g., form elements).

7. **Code Splitting and Lazy Loading**
   Break your app into smaller chunks and load them only when needed to improve performance. `lazy` is used from React to implement this and is wrapped in `Suspense`.
