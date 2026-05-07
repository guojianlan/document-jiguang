const COLORS = {
  pageBg: "#EEE7DD",
  shellBg: "#F7F4EC",
  shellBorder: "#E2D7C8",
  dark: "#1F2A25",
  muted: "#5A655E",
  warmDeep: "#9A4A22",
  warm: "#B75C2C",
  warmSoft: "#FFF1E7",
  warmBorder: "#E8BE9E",
  cool: "#2F7B69",
  coolDeep: "#1F5A4D",
  coolSoft: "#EEF7F2",
  coolBorder: "#9CC7B7",
  innerLayerBg: "#FFF1E7",
  outerLayerBg: "#EEF7F2",
  cardBg: "#FFFDF8",
  cellBorder: "#E0D6C5",
  diskBg: "#1F2A25",
};

function boxShadow(opacity) {
  return `0 14px 34px rgba(31, 42, 36, ${opacity})`;
}

function componentCard(h, item, layerColor, chipBg) {
  return h(
    "div",
    {
      key: `comp-${item.id}`,
      style: {
        width: 178,
        minHeight: 130,
        display: "flex",
        flexDirection: "column",
        background: COLORS.cardBg,
        border: `1.5px solid ${COLORS.cellBorder}`,
        borderRadius: 14,
        padding: "12px 12px",
        boxSizing: "border-box",
      },
    },
    [
      h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
          },
        },
        [
          h(
            "div",
            {
              style: {
                minWidth: 38,
                height: 24,
                padding: "0 8px",
                borderRadius: 6,
                background: chipBg,
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
              },
            },
            item.id
          ),
          h(
            "div",
            {
              style: {
                fontSize: 16,
                fontWeight: 700,
                color: COLORS.dark,
                lineHeight: 1.2,
                flex: 1,
              },
            },
            item.title
          ),
        ]
      ),
      h(
        "div",
        {
          style: {
            marginTop: 8,
            fontSize: 13,
            lineHeight: 1.4,
            color: COLORS.muted,
          },
        },
        item.note
      ),
    ]
  );
}

function layerHeader(h, badge, badgeBg, title, subtitle, judgement, judgementColor) {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 16,
      },
    },
    [
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
          },
        },
        [
          h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
              },
            },
            [
              h(
                "div",
                {
                  style: {
                    height: 30,
                    padding: "0 14px",
                    borderRadius: 15,
                    background: badgeBg,
                    color: "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: 1,
                  },
                },
                badge
              ),
              h(
                "div",
                {
                  style: {
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.dark,
                    lineHeight: 1.2,
                  },
                },
                title
              ),
            ]
          ),
          h(
            "div",
            {
              style: {
                marginTop: 6,
                fontSize: 16,
                color: COLORS.muted,
                lineHeight: 1.4,
              },
            },
            subtitle
          ),
        ]
      ),
      h(
        "div",
        {
          style: {
            maxWidth: 360,
            padding: "10px 16px",
            borderRadius: 12,
            background: "#FFF",
            border: `1.5px solid ${judgementColor}`,
            fontSize: 15,
            lineHeight: 1.45,
            color: judgementColor,
            fontWeight: 700,
          },
        },
        judgement
      ),
    ]
  );
}

module.exports = {
  size: {
    width: 1600,
    height: 1280,
  },
  render({ React, data }) {
    const h = React.createElement;

    return h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          background: COLORS.pageBg,
          padding: 40,
          boxSizing: "border-box",
          fontFamily: "Arial Unicode",
        },
      },
      [
        h(
          "div",
          {
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: COLORS.shellBg,
              border: `1px solid ${COLORS.shellBorder}`,
              borderRadius: 28,
              padding: "30px 32px 26px 32px",
              boxShadow: boxShadow(0.08),
              boxSizing: "border-box",
            },
          },
          [
            // Eyebrow + title block
            h(
              "div",
              {
                style: {
                  width: 360,
                  height: 34,
                  borderRadius: 17,
                  background: COLORS.dark,
                  color: "#F7F4EC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 1,
                },
              },
              data.eyebrow
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 14,
                  fontSize: 42,
                  fontWeight: 700,
                  lineHeight: 1.18,
                  color: COLORS.dark,
                  maxWidth: 1440,
                },
              },
              data.title
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 8,
                  fontSize: 18,
                  lineHeight: 1.5,
                  color: COLORS.muted,
                  maxWidth: 1440,
                },
              },
              data.subtitle
            ),

            // Inner layer block (s01-s05)
            h(
              "div",
              {
                style: {
                  marginTop: 22,
                  display: "flex",
                  flexDirection: "column",
                  background: COLORS.innerLayerBg,
                  border: `2px solid ${COLORS.warmBorder}`,
                  borderRadius: 22,
                  padding: "20px 22px",
                },
              },
              [
                layerHeader(
                  h,
                  "INNER · 单 agent loop",
                  COLORS.warm,
                  data.innerLayer.title,
                  data.innerLayer.subtitle,
                  data.innerLayer.judgement,
                  COLORS.warmDeep
                ),
                h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: 12,
                      justifyContent: "space-between",
                    },
                  },
                  data.innerLayer.components.map((c) =>
                    componentCard(h, c, COLORS.warm, COLORS.warm)
                  )
                ),
              ]
            ),

            // Disk bar (the "axis")
            h(
              "div",
              {
                style: {
                  marginTop: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  padding: "10px 20px",
                  borderRadius: 14,
                  background: COLORS.diskBg,
                  color: "#F7F4EC",
                },
              },
              [
                h(
                  "div",
                  {
                    style: {
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: 1,
                    },
                  },
                  data.diskLabel
                ),
                h(
                  "div",
                  {
                    style: {
                      fontSize: 14,
                      color: "#C8BFA9",
                      lineHeight: 1.4,
                    },
                  },
                  data.diskNote
                ),
              ]
            ),

            // Outer layer block (s06-s12)
            h(
              "div",
              {
                style: {
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  background: COLORS.outerLayerBg,
                  border: `2px solid ${COLORS.coolBorder}`,
                  borderRadius: 22,
                  padding: "20px 22px",
                },
              },
              [
                layerHeader(
                  h,
                  "OUTER · 多 agent 协调底座",
                  COLORS.cool,
                  data.outerLayer.title,
                  data.outerLayer.subtitle,
                  data.outerLayer.judgement,
                  COLORS.coolDeep
                ),
                h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: 10,
                      justifyContent: "space-between",
                    },
                  },
                  data.outerLayer.components.map((c) =>
                    componentCard(h, c, COLORS.cool, COLORS.cool)
                  )
                ),
              ]
            ),

            // Footer
            h(
              "div",
              {
                style: {
                  marginTop: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 22px",
                  borderRadius: 16,
                  background: COLORS.warmSoft,
                  border: `2px solid ${COLORS.warmBorder}`,
                },
              },
              [
                h(
                  "div",
                  {
                    style: {
                      fontSize: 20,
                      fontWeight: 700,
                      color: COLORS.warmDeep,
                      lineHeight: 1.4,
                    },
                  },
                  data.footer
                ),
              ]
            ),
          ]
        ),
      ]
    );
  },
};
