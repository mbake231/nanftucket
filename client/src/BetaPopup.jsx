import React, { useState,useRef } from "react";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function BetaPopup(props) {
    const [show, setShow] = useState(true);
    function handleClose(){
        setShow(false);
    }
    const target = useRef(null);
        return (

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Nanftucket is under development</Modal.Title>
            </Modal.Header>
            <Modal.Body>Thanks for visting, we too are excited to bring Nantucket into the metaverse. NFTs are currently being worked on via the Solana Devnet and should be making their debut on Mainnet soon!</Modal.Body>
            <Modal.Footer>

            <Button variant="primary" onClick={handleClose}>
            Understood!
            </Button>
            </Modal.Footer>
            </Modal>
              
            );
          }
