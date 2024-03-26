import Image from "next/image";

interface EmptyProps {
  label: string;
}
const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center">
      <div className="relative h-72 w-72">
      
        <p className="text-lg text-gray-500 mt-4">{label}</p>
      </div>
    </div>
  );
};

export default Empty;
