export default function AllSpacesLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col h-full">
        {/* Header or Sidebar for All Spaces */}
        <header className="bg-gray-100 p-4">
          <h2 className="font-bold text-lg">All Spaces</h2>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
  }
  