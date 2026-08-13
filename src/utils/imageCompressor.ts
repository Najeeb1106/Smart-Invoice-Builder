const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export interface ProcessedImageResult {
  dataUrl: string;
  width: number;
  height: number;
}

export const processLogoFile = (file: File): Promise<ProcessedImageResult> => {
  return new Promise((resolve, reject) => {
    // 1. Validate file type
    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      return reject(new Error('Please upload a PNG, JPG, JPEG, or WebP image.'));
    }

    // 2. Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return reject(new Error('Logo must be smaller than 5 MB.'));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        // Resize proportionally if dimensions exceed max
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width / height > MAX_WIDTH / MAX_HEIGHT) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Unable to process image.'));
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as WebP or JPEG
        const compressedDataUrl = canvas.toDataURL('image/webp', 0.85);
        resolve({
          dataUrl: compressedDataUrl,
          width,
          height,
        });
      };
      img.onerror = () => reject(new Error('Failed to load image file.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read logo file.'));
    reader.readAsDataURL(file);
  });
};
