import Image from "next/image";

export default function DesktopBlockedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-3 text-black">🚫 Access Restricted</h1>
      <p className="text-gray-700 text-sm">
        This app is only available on mobile devices.
        <br />
        Please scan the QR code below or open it on your phone.
      </p>
    </div>
  );
}