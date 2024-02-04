"use client";
import { Modal, Button } from "react-daisyui";
import { useRef, useCallback } from "react";

const ModalChallenge = () => {
    const ref = useRef(null);
    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    return (
        <>
            <Button color="primary" size="sm" onClick={handleShow}>
                Nouveau challenge
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
        </>
    );
};

export default ModalChallenge;
