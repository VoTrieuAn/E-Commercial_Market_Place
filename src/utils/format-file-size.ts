export const formatFileSize = (bytes: number) => {
  // Nếu bytes < 1024 => trả về bytes
  if (bytes < 1024) return bytes + " B";

  // Nếu bytes < 1MB => trả về KB
  if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + " KB";
  }

  // Nếu bytes >= 1MB => trả về MB
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};
