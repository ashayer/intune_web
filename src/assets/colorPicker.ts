type Pixel = {
  r: number;
  g: number;
  b: number;
};

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}
export function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const findBiggestColorRange = (rgbValues: Pixel[]) => {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
};

const quantization = (rgbValues: Pixel[], depth: number): Pixel[] => {
  const MAX_DEPTH = 1;

  // Base case
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }

  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1, p2) => {
    return p2[componentToSortBy] - p1[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};

export function loadImage(src: string) {
  const img = new Image();
  img.width = 64;
  img.height = 64;
  img.src = src;
  img.crossOrigin = "Anonymous";
  return img;
}

export function analyzeImage(img: HTMLImageElement) {
  const { width, height } = img;
  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  const context = canvas.getContext?.("2d");
  if (context === null) {
    return;
  }
  context.drawImage(img, 0, 0);
  const imageData = context.getImageData(0, 0, width, height);

  const rgbValues = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    rgbValues.push({
      r: imageData.data[i] as number,
      g: imageData.data[i + 1] as number,
      b: imageData.data[i + 2] as number,
    });
  }

  const colors = quantization(rgbValues, 0);

  return colors;
}
