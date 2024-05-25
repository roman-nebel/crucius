figma.showUI(__html__, {
  width: 680,
  height: 600,
});

figma.ui.onmessage = async (msg: { type: string; count: number }) => {
  if (msg.type === "catch") {
    const frame = figma.currentPage.selection[0];

    if (frame) {
      const svg = await frame.exportAsync({ format: "SVG_STRING" });
      figma.ui.postMessage(svg);
    }
  }
};
