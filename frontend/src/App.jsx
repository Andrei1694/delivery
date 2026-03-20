import { Outlet } from '@tanstack/react-router';

function App() {
  return (
    <main className="min-h-screen bg-background">
      <Outlet />
    </main>
  );
}

export default App;
