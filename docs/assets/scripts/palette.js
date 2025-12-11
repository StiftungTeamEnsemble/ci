(function renderPalette() {
  const paletteRoot = document.querySelector("#palette-root");
  if (!paletteRoot) return;

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

  const buildColumn = ({ name, base, shades, darkFrom }) => {
    const article = document.createElement("article");
    article.className = "palette-column";

    const list = document.createElement("div");
    list.className = "palette-shades";

    shades.forEach((tone) => {
      if (!tone) {
        const spacer = document.createElement("div");
        spacer.className = "shade shade--spacer";
        spacer.setAttribute("aria-hidden", "true");
        list.append(spacer);
        return;
      }

      const cssVar = `--color-${name
        .toLowerCase()
        .replace(/\s+/g, "-")}-${tone}`;
      const hex = getVarValue(cssVar);
      const row = document.createElement("div");
      row.className = tone === "500" ? "shade shade--base" : "shade";
      row.style.backgroundColor = hex;
      row.style.color = textColorForTone(tone, darkFrom);

      const spanTone = document.createElement("span");
      spanTone.textContent = tone === "500" ? name : tone;
      const spanHex = document.createElement("span");
      spanHex.textContent = hex.toUpperCase();

      row.append(spanTone, spanHex);
      list.append(row);
    });

    article.append(list);
    return article;
  };

  paletteRoot.innerHTML = "";
  colors.forEach((c) => {
    paletteRoot.append(buildColumn(c));
  });
})();
