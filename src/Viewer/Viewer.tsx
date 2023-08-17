import WebViewer, { Core } from '@pdftron/webviewer';
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { LoadViewerDetails } from '../Components/LoadViewerDetails';
import { useDispatch } from 'react-redux';
import { selectedThumbnails, totalThumbailPages } from '../Store/Reducers/ThumbnailPages';

export const Viewer = () => {
    const viewer = useRef(null);
    const path = "/assets/multiPage.pdf";
    const dispatch = useDispatch();
    let [selectedThumbanailPages, setSelectedThumbnailPages] = useState([]);

    useEffect(() => {
        // console.log(selectedThumbanailPages)
        dispatch(selectedThumbnails([...selectedThumbanailPages]))
    }, [selectedThumbanailPages]);

    useEffect(() => {
        if (viewer.current) {
            WebViewer({
                path: "/lib",
                initialDoc: path,
                preloadWorker: `${WebViewer.WorkerTypes.PDF}`
            },
                viewer.current
            ).then((instance) => {
                const { documentViewer } = instance.Core;
                const UIEvents = instance.UI.Events;
                // const keys = instance.UI.AnnotationKeys;
                instance.UI.addEventListener(UIEvents.DOCUMENT_LOADED, e => {
                    dispatch(totalThumbailPages(+documentViewer.getPageCount()));
                })
                instance.UI.addEventListener(UIEvents.SELECTED_THUMBNAIL_CHANGED, e => {
                    setSelectedThumbnailPages(e.detail)
                })
                documentViewer.addEventListener("rotationUpdated", (rotation : any, pageNumber : number) => {
                    console.log(documentViewer.getRotation(2))
                    console.log("rotaion of the page", rotation, pageNumber)
                })
            });
        }
    }, []);

    return (
        <>
            <Container fluid style={{ paddingTop: 20 }}>
                <Row xs={12}>
                    <Col xs={7}>
                        <div className="webviewer" ref={viewer}></div>
                    </Col>
                    <Col xs={5}>
                        <LoadViewerDetails />
                    </Col>
                </Row>
            </Container>

        </>
    );
}