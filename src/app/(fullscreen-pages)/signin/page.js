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
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <h1>SIGNIN</h1>
        </main>
    );
}
