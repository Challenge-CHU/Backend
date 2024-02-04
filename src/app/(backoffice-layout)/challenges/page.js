import ModalChallenge from "@/components/Challenge/ModalChallenge";

export const metadata = {
    title: "Challenges",
    description: "Liste et gestion des challenges",
};

export default function Challenges() {
    return (
        <>
            <div className="page-header flex justify-between items-center mb-10 ">
                <h1 className="text-3xl font-bold">Challenges</h1>
                <ModalChallenge />
            </div>

            <p>test</p>
        </>
    );
}
