export class ImageUtils {
  static createPlaceholder(width = 300, height = 300, emoji = '🐱') {
    const svg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="${width}" height="${height}" fill="#F3F4F6"/>
          <text x="${width / 2}" y="${height / 2}" font-size="64" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  static handleImageError(event, fallbackEmoji = '🐱') {
    const img = event.target;
    img.src = ImageUtils.createPlaceholder(300, 300, fallbackEmoji);
    img.onerror = null;
  }
}
