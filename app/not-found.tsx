import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        <p className="text-gray-600 mt-4">Page is not existed.</p>
        <p className="text-gray-600 mt-2">You can go back to <Link href="/" className='text-red-400 font-bold'>home</Link> or try searching for other things.</p>
      </div>
    </div>
  );
};
