import ModalChallenge from "@/components/Challenge/ModalChallenge";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Challenges",
    description: "Liste et gestion des challenges",
};

export default function Home() {
    redirect("/challenges");

    return <></>;
}
