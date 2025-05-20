const IMAGE_URL = import.meta.env.VITE_BACKEND_URL_IMAGE;

export const getImagePath = (imageName) => {
  return `${IMAGE_URL}/${imageName}`;
};
