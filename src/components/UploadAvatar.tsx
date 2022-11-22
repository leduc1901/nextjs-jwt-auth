import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { authService } from "../services";

type Props = {
  avatarUrl: string;
  userId: string;
  cancelEdit: () => void;
  refetchUser: (userId: string) => Promise<void>;
};

export const UploadAvatar: React.FC<Props> = ({
  avatarUrl,
  userId,
  cancelEdit,
  refetchUser,
}) => {
  const [cropper, setCropper] = useState<any>();

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "newAvatar.png", { type: "image/png" });
        });
      if (file) {
        authService
          .uploadAvatar(userId, file)
          .then(() => {
            refetchUser(userId);
            cancelEdit();
          })
          .catch((e) => alert(e));
      }
    }
  };

  return (
    <>
      <Cropper
        src={avatarUrl}
        style={{ height: 400, width: 400 }}
        initialAspectRatio={4 / 3}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        guides={false}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      <button
        className="mt-2 border border-solid border-black py-2 px-4 rounded cursor-pointer"
        onClick={getCropData}
      >
        Crop Image
      </button>
    </>
  );
};
