export const URL_REGEX =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
export const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

// Folder names for cloudinary
export const RESUMES_FOLDER = "hey-dev-resumes";
export const PROFILE_PICTURES_FOLDER = "hey-dev-profile-picture";
export const POST_IMAGES_FOLDER = "hey-dev-post-images";
export const POST_VIDEOS_FOLDER = "hey-dev-post-videos";
export const COMPANY_LOGO_FOLDER = "hey-dev-company-logo";
export const COMMUNITY_LOGO = "hey-dev-community-logo";
export const MESSAGE_IMAGES_FOLDER = "hey-dev-message-image-folder"