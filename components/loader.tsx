import Image from "next/image"
import "./loader.css"

export const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="border-t-8 border-t-blue-500 border-b-8 border-b-blue-200 rounded-full w-20 h-20 animate-spin">
                <div className="relative w-full h-full">
                    <Image src="/logo.png" alt="Generating..." layout="fill" objectFit="contain" />
                </div>
            </div>
            <p className="mt-2 text-center text-lg font-semibold ellipsis">Generating Response</p>
        </div>
    )
}