(function renderPalette() {
  const paletteRoot = document.querySelector("#palette-root");
  const templateNode = document.querySelector("#palette-template");
  if (!paletteRoot || !templateNode || typeof Handlebars === "undefined")
    return;

  const colors = [
    {
      name: "Pacific Cyan",
      base: "--color-pacific-cyan-500",
      shades: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      darkFrom: 600,
    },
    {
      name: "Bubblegum Pink",
      base: "--color-bubblegum-pink-500",
      shades: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      darkFrom: 600,
    },
    {
      name: "Amber Gold",
      base: "--color-amber-gold-500",
      shades: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      darkFrom: 500,
    },
    {
      name: "Deep Space Blue",
      base: "--color-deep-space-blue-500",
      shades: ["", "", "300", "400", "500", "600", "700", "800", "900"],
      darkFrom: 600,
    },
    {
      name: "Tropical Mint",
      base: "--color-tropical-mint-500",
      shades: ["100", "200", "300", "400", "500", "600", "700", "", ""],
      darkFrom: 500,
    },
  ];

  const getVarValue = (cssVar) =>
    getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();

  const textColorForTone = (tone, darkFrom) =>
    Number(tone) >= Number(darkFrom)
      ? "var(--color-black)"
      : "var(--color-white)";

  const paletteData = colors.map(({ name, shades, darkFrom }) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    return {
      name,
      shades: shades.map((tone) => {
        if (!tone) return { isSpacer: true };

        const cssVar = `--color-${slug}-${tone}`;
        const background = getVarValue(cssVar);
        const isBase = tone === "500";

        return {
          isSpacer: false,
          label: isBase ? name : null,
          tone,
          cssVar,
          displayHex: background.toUpperCase(),
          textColor: textColorForTone(tone, darkFrom),
          classes: isBase ? "shade shade--base" : "shade",
        };
      }),
    };
  });

  const template = Handlebars.compile(templateNode.innerHTML.trim());
  paletteRoot.innerHTML = template({ palettes: paletteData });
})();
