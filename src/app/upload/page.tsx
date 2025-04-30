"use client";

import { MediaUpload } from "@/src/once-ui/media/MediaUpload";
import toast from "react-hot-toast";

const handleFileUploadToServer = async (file: File) => {
  const toastId = toast.loading("Uploading...");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Upload failed");

    toast.success("Upload successful!", { id: toastId });

    console.log("Image uploaded to:", data.url);
  } catch (err) {
    console.error(err);
    toast.error("Upload failed.", { id: toastId });
  }
};

export default function Accommodations() {
  return (
    <>
      <div className="pt-24 sm:pt-32 md:pt-36 lg:pt-40">
        {/* Spinner */}
        <div className="app-spinner-container websiteSpinner" />

        {/* Internal background image */}
        <style jsx>{`
          .websiteDecoration--internal {
            background-image: url("/images/wedding/floral1.png");
          }
        `}</style>
        <div className="websiteDecoration websiteDecoration--internal" />

        {/* Page container */}
        <div className="app-contrast-color websiteContainer" data-color="">
          {/* Page content wrapper */}
          <div
            className="app-website-page-content websiteFont__body"
            id="scrollMobile"
          >
            <div className="pure-u-1 websites-section">
              {/* Section header */}
              <div className="app-website-render-wrapper sectionRender sectionRender__wrapperHeader">
                <div className="websiteContainerSection">
                  <h1 className="app-contrast-color websiteFont__headingHero mb20">
                    Upload your Photos
                  </h1>
                  <div className="websiteFont__hero websiteLinkChilds websiteLinkChilds--underline">
                    <p>We are so excited to celebrate with you!</p>
                  </div>
                </div>
              </div>

              <hr className="hrSection" />

              {/* Media Upload */}
              <div
                className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto px-4"
                style={{
                  display: "inline-block",
                  outline: "2px dashed #444",
                  outlineOffset: "6px",
                  padding: "4px", // Optional spacing between image and outline
                  borderRadius: "8px",
                }}
              >
                <MediaUpload
                  compress={true}
                  quality={0.8}
                  loading={false}
                  aspectRatio="auto"
                  initialPreviewImage="/images/upload/Upload-image.png"
                  onFileUpload={handleFileUploadToServer}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom background decoration */}
        <style jsx>{`
          .websiteDecoration--bottom {
            background-image: url("/images/wedding/floral2.png");
          }
        `}</style>
        <div className="websiteDecoration websiteDecoration--bottom" />
      </div>
    </>
  );
}
