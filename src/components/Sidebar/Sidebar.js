import Image from "next/image";
import { Divider } from "react-daisyui";

const Sidebar = () => {
    return (
        <nav className="bg-neutral w-[200px]">
            <div className="py-8 px-4 flex flex-col items-center gap-4">
                <Image
                    src="/logo-chu.png"
                    width={149}
                    height={72}
                    alt="Logo CHU Rouen"
                />
                <h1 className="font-bold text-base">Challenge 10000 pas</h1>
            </div>
        </nav>
    );
};

export default Sidebar;
