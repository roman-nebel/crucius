figma.showUI(__html__, {
  width: 320,
  height: 640,
});

figma.ui.onmessage = async (msg: { type: string; image: string }) => {
  if (msg.type === "catch") {
    const frame = figma.currentPage.selection[0];

    if (frame) {
      const svg = await frame.exportAsync({ format: "SVG_STRING" });
      figma.ui.postMessage({
        svg,
        params: {
          width: frame.width,
          height: frame.height,
        },
      });
    }
  }
  if (msg.type === "insert") {
    figma.createImageAsync(msg.image).then(async (image: Image) => {
      // Create a rectangle that's the same dimensions as the image.
      const node = figma.createRectangle();

      const { width, height } = await image.getSizeAsync();
      node.resize(width, height);

      // Render the image by filling the rectangle.
      node.fills = [
        {
          type: "IMAGE",
          imageHash: image.hash,
          scaleMode: "FILL",
        },
      ];
    });
  }
};
