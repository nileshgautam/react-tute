/**
 * accept children() what to render and portalid(where to render) 
 * create or find the portal container
 * use useRef to persist the container reference
 * clean up when the componenet unmounts
 * use React's Create Potal to do actual rendering
 * 
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, portalId = 'portal-root' }) => {

    const portalRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    // Check if potal container already exists
    // if not, create one and add it to the DOM
    // store the container reference
    // clean up when component unmounts

    useEffect(() => {
        let portalContainer = document.getElementById(portalId);

        if (!portalContainer) {
            portalContainer = document.createElement('div');
            portalContainer.id = portalId;
            document.body.appendChild(portalContainer);
        }
        portalRef.current = portalContainer;

        // force re-render
        setMounted(true);


        return () => {
            if (portalContainer && portalContainer.children.length === 0) {
                document.body.removeChild(portalContainer);
            }
        }
    }, [portalId]);

    if (!mounted || !portalRef.current) return null;

    return createPortal(children, portalRef.current);
}

export default Portal;