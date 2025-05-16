export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-100 py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
            &copy; {currentYear} Whisprly Chatting App
          </div>
        </footer>
    )
}
