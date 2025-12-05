import Navbar from '../components/shared/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />
      <>
        {children}
      </>
    </div>
  );
}