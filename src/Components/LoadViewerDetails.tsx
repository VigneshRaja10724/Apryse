import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useEffect } from "react";

export const LoadViewerDetails = () => {
    const state = useSelector((state: RootState) => state);
    const thumbnailPages = state.ThumbnailPages;
    return (
        <>
            <p>Load Viewer Details</p>
            <p>
                No.of.pages : {thumbnailPages.NumberOfPages}
            </p>
            <p>
                selected Pages : {
                    thumbnailPages.pagesSelected.map((pages) => pages + 1).filter(Number).join(",")
                }
            </p>

        </>
    )
}