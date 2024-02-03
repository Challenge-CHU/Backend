"use client";
import Image from "next/image";
import { Modal, Button } from "react-daisyui";
import { useRef, useCallback } from "react";

export default function Home() {
    const ref = useRef(null);
    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button color="primary" onClick={handleShow}>
                Open Modal
            </Button>
            <Modal ref={ref} className="">
                <Modal.Header className="font-bold">Hello!</Modal.Header>
                <Modal.Body>
                    Press ESC key or click the button below to close
                </Modal.Body>
                <Modal.Actions>
                    <form method="dialog">
                        <Button color="secondary">Close</Button>
                    </form>
                </Modal.Actions>
            </Modal>
            <p>test</p>
        </main>
    );
}
