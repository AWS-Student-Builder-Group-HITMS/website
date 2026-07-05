/**
 * Cloudinary Image Utility
 * Generates optimized Cloudinary URLs for fast image delivery
 * Supports responsive images, formats, and transformations
 */

export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "crop" | "thumb";
  gravity?: "auto" | "face" | "center";
  quality?: "auto" | number;
  format?: "auto" | "webp" | "png" | "jpg";
  radius?: "max" | number;
  background?: string;
}

/**
 * Generate optimized Cloudinary URL
 * @param publicId - Cloudinary public ID (path in your cloud storage)
 * @param options - Transformation options
 * @returns Optimized Cloudinary URL
 */
export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn("VITE_CLOUDINARY_CLOUD_NAME is not set. Returning original publicId.");
    return publicId;
  }

  const {
    width,
    height,
    crop = "fill",
    gravity = "auto",
    quality = "auto",
    format = "auto",
    radius,
    background,
  } = options;

  let transformations = [];

  // Add dimensions
  if (width || height) {
    const dim = `w_${width || "auto"},h_${height || "auto"},c_${crop},g_${gravity}`;
    transformations.push(dim);
  }

  // Add quality and format
  transformations.push(`q_${quality},f_${format}`);

  // Add radius if specified
  if (radius) {
    transformations.push(`r_${radius}`);
  }

  // Add background if specified
  if (background) {
    transformations.push(`b_${background}`);
  }

  const transformationString = transformations.join("/");
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  return transformationString
    ? `${baseUrl}/${transformationString}/${publicId}`
    : `${baseUrl}/${publicId}`;
}

/**
 * Get responsive image with srcset for different screen sizes
 * @param publicId - Cloudinary public ID
 * @param baseSizes - Base width (default: 800)
 * @returns Object with src and srcset
 */
export function getResponsiveImage(
  publicId: string,
  baseSizes: number = 800,
  options: CloudinaryOptions = {}
) {
  const sizes = [320, 640, 960, 1280, baseSizes];

  return {
    src: getCloudinaryUrl(publicId, { width: baseSizes, ...options }),
    srcSet: sizes
      .map((size) => `${getCloudinaryUrl(publicId, { width: size, ...options })} ${size}w`)
      .join(", "),
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 75vw",
  };
}

/**
 * Image URL mappings - Replace your local image paths with Cloudinary IDs
 * Example: "aws-sbg-hitms/whatsapp-qr" for a file uploaded as "whatsapp-qr" in "aws-sbg-hitms" folder
 */
export const CLOUDINARY_IMAGES = {
  whatsappQR: "aws-sbg-hitms/whatsapp-qr",
  // Team member photos
  team: {
    captain: "aws-sbg-hitms/team/captain",
    creative: "aws-sbg-hitms/team/creative",
    technical: "aws-sbg-hitms/team/technical",
    marketing: "aws-sbg-hitms/team/marketing",
    events: "aws-sbg-hitms/team/events",
    media: "aws-sbg-hitms/team/media",
  },
  // Event images
  events: {
    banner: "aws-sbg-hitms/events/banner",
    carousel1: "aws-sbg-hitms/events/carousel-1",
    carousel2: "aws-sbg-hitms/events/carousel-2",
  },
  // Brand assets
  brand: {
    logo: "aws-sbg-hitms/logo",
    logoSquare: "aws-sbg-hitms/logo-square",
    heroBackground: "aws-sbg-hitms/hero-background",
  },
};
