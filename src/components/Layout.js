import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <div className="nft-store-inner d-flex">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
