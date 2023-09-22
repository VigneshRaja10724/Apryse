import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { selectedThumbnails, totalThumbailPages } from '../Store/Reducers/ThumbnailPages';
import { LoadViewerDetails } from '../components/LoadViewerDetails';

export const Viewer = () => {
    const viewer = useRef(null);
    const path = "/assets/multiPage.pdf";
    const dispatch = useDispatch();

    useEffect(() => {
        if (viewer.current) {
            WebViewer({
                path: "/lib",
                initialDoc: path,
                disabledElements: ['viewControlsButton', 'menuButton', 'ribbons', 'panToolButton', 'selectToolButton', 'toolsHeader', 'toggleNotesButton', 'searchButton', 'documentControl'],
            },
                viewer.current
            ).then((instance) => {
                const { UI, Core } = instance;
                const { documentViewer, annotationManager, Tools, Annotations, Document } = Core;
                const rotation = instance.Core.PageRotation;


                const UIEvents = UI.Events;
                const DocumentViewerEvents = Core.DocumentViewer.Events;
                UI.addEventListener(UIEvents.DOCUMENT_LOADED, () => {
                    dispatch(totalThumbailPages(+documentViewer.getPageCount()));
                })
                UI.addEventListener(UIEvents.SELECTED_THUMBNAIL_CHANGED, e => {
                   dispatch(selectedThumbnails([... e.detail]))
                })
                UI.setHeaderItems(header => {
                    header.update([
                        {
                            type: 'toggleElementButton',
                            img: 'icon-header-sidebar-line',
                            element: 'leftPanel',
                            dataElement: 'leftPanelButton',
                            title: 'component.leftPanel'
                        },
                        {
                            type: 'customElement',
                            render: () => {
                                const clockwise = document.createElement('img');
                                clockwise.src = '/icons/arrow-clockwise.svg';
                                clockwise.style.width = '25px';
                                clockwise.style.marginLeft = '10px';
                                clockwise.style.cursor = 'pointer';
                                clockwise.onclick = () => {
                                    const doc = documentViewer.getDocument();
                                    doc.rotatePages(UI.ThumbnailsPanel.getSelectedPageNumbers(), rotation.E_90)
                                }
                                return clockwise;
                            },
                            title: 'clockwise'
                        },
                        {
                            type: 'customElement',
                            render: () => {
                                const counterclockwise = document.createElement('img');
                                counterclockwise.src = '/icons/arrow-counterclockwise.svg';
                                counterclockwise.style.width = '25px';
                                counterclockwise.style.marginLeft = '10px';
                                counterclockwise.style.cursor = 'pointer';
                                counterclockwise.onclick = () => {
                                    const doc = documentViewer.getDocument();
                                    doc.rotatePages(UI.ThumbnailsPanel.getSelectedPageNumbers(), rotation.E_270)
                                }
                                return counterclockwise;
                            },
                            title: 'counterclockwise'
                        }
                    ])
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