declare module 'd3-save-pdf' {
  /**
   * Saves an SVG element as a PDF file.
   * @param svgElement The SVG element to save.
   * @param config Optional configuration object.
   */
  export function save(
    svgElement: SVGElement,
    config?: { filename?: string }
  ): void;

  /**
   * A convenience function for converting all referenced raster images in an SVG element to base64 data URI.
   * @param svgElement The SVG element containing images.
   */
  export function embedRasterImages(svgElement: SVGElement): Promise<void>;
}
