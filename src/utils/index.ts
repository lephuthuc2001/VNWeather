const images = require.context("../assets", false, /\.(png|jpe?g|svg)$/);

const imageImports: { [key: string]: string } = {};
images.keys().forEach((key: string) => {
  imageImports[key] = images(key);
});

const weatherNames: string[] = Object.keys(imageImports).map((key: string) =>
  key.slice(key.indexOf("/") + 1, key.indexOf(".png"))
);

export const getIcons = (description: string) => {
  for (let i = 0; i < weatherNames.length; i++) {
    if (description.toLowerCase().includes(weatherNames[i])) {
      return Object.values(imageImports)[i];
    }
  }
};

export const getDayOfWeek = (date: string) => {
  const d = new Date(date);
  const dow = d.toLocaleDateString("en-US", { weekday: "long" });

  return dow;
};
