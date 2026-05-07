const COLORS = {
  pageBg: "#EFE8DC",
  shellBg: "#F6F1E8",
  shellBorder: "#E4DACB",
  dark: "#1F2A24",
  muted: "#5C665F",
  warm: "#C76128",
  warmSoft: "#FFF4E8",
  cool: "#2E7A5C",
  coolSoft: "#F2FAF5",
  neutral: "#5E574E",
  neutralSoft: "#F7F4EC",
};

function boxShadow(opacity) {
  return `0 14px 32px rgba(31, 42, 36, ${opacity})`;
}

function makeStepCard(h, step, index) {
  const accent = step.accent || COLORS.neutral;
  const cardBg = step.cardBg || COLORS.neutralSoft;
  const circleText = step.circleText || "#FFFFFF";

  return h(
    "div",
    {
      key: `step-${index}`,
      style: {
        width: 232,
        minHeight: 148,
        display: "flex",
        flexDirection: "column",
        padding: "18px 18px 16px 18px",
        borderRadius: 22,
        background: cardBg,
        boxShadow: boxShadow(0.06),
        position: "relative",
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
            marginBottom: 14,
          },
        },
        [
          h(
            "div",
            {
              style: {
                width: 34,
                height: 34,
                borderRadius: 17,
                background: accent,
                color: circleText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
              },
            },
            String(step.index || index + 1)
          ),
          h(
            "div",
            {
              style: {
                fontSize: 23,
                fontWeight: 700,
                color: COLORS.dark,
                lineHeight: 1.2,
                width: 150,
              },
            },
            step.title
          ),
        ]
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 16,
            lineHeight: 1.45,
            color: COLORS.muted,
          },
        },
        step.lines.map((line, lineIndex) =>
          h(
            "div",
            {
              key: `step-${index}-line-${lineIndex}`,
            },
            line
          )
        )
      ),
    ]
  );
}

function makePanelItem(h, item, index, palette) {
  return h(
    "div",
    {
      key: `${palette.kind}-${index}`,
      style: {
        display: "flex",
        flexDirection: "column",
        padding: "14px 18px",
        borderRadius: 22,
        background: palette.itemBg,
        boxShadow: boxShadow(0.04),
      },
    },
    [
      h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 10,
          },
        },
        [
          h(
            "div",
            {
              style: {
                minWidth: 72,
                height: 30,
                padding: "0 14px",
                borderRadius: 15,
                background: palette.accent,
                color: palette.chipText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
              },
            },
            item.label
          ),
          h(
            "div",
            {
              style: {
                fontSize: 22,
                fontWeight: 700,
                lineHeight: 1.2,
                color: palette.title,
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
            fontSize: 17,
            lineHeight: 1.45,
            color: COLORS.muted,
            paddingLeft: 88,
          },
        },
        item.body
      ),
    ]
  );
}

module.exports = {
  size: {
    width: 1600,
    height: 1200,
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
          flexDirection: "column",
          background: COLORS.pageBg,
          padding: 48,
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
              borderRadius: 34,
              background: COLORS.shellBg,
              border: `1px solid ${COLORS.shellBorder}`,
              padding: "34px 34px 22px 34px",
              boxShadow: boxShadow(0.08),
            },
          },
          [
            h(
              "div",
              {
                style: {
                  width: 242,
                  height: 38,
                  borderRadius: 19,
                  background: COLORS.dark,
                  color: "#F8F4EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: 2,
                  marginBottom: 24,
                },
              },
              data.eyebrow
            ),
            h(
              "div",
              {
                style: {
                  fontSize: 56,
                  fontWeight: 700,
                  color: COLORS.dark,
                  lineHeight: 1.16,
                  marginBottom: 10,
                  maxWidth: 1320,
                },
              },
              data.title
            ),
            h(
              "div",
              {
                style: {
                  fontSize: 22,
                  color: COLORS.muted,
                  lineHeight: 1.45,
                  marginBottom: 28,
                  maxWidth: 1320,
                },
              },
              data.subtitle
            ),
            h(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 30,
                  border: `2px solid ${COLORS.shellBorder}`,
                  background: "#FBF8F1",
                  padding: "22px 24px 26px 24px",
                  marginBottom: 36,
                },
              },
              [
                h(
                  "div",
                  {
                    style: {
                      fontSize: 28,
                      fontWeight: 700,
                      color: COLORS.dark,
                      marginBottom: 18,
                    },
                  },
                  data.stepsTitle
                ),
                h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "stretch",
                      justifyContent: "space-between",
                      gap: 16,
                    },
                  },
                  data.steps.flatMap((step, index) => {
                    const items = [makeStepCard(h, step, index)];
                    if (index < data.steps.length - 1) {
                      items.push(
                        h("div", {
                          key: `connector-${index}`,
                          style: {
                            width: 22,
                            height: 4,
                            borderRadius: 2,
                            background: index < 2 ? "#C7B7A1" : "#9EB7A9",
                            alignSelf: "center",
                          },
                        })
                      );
                    }
                    return items;
                  })
                ),
              ]
            ),
            h(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 28,
                  marginBottom: 24,
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
                      borderRadius: 30,
                      background: "#FFF7EE",
                      border: "2px solid #E4B285",
                      padding: "20px 20px 24px 20px",
                    },
                  },
                  [
                    h(
                      "div",
                      {
                        style: {
                          fontSize: 28,
                          fontWeight: 700,
                          color: "#A65419",
                          marginBottom: 18,
                        },
                      },
                      data.misunderstandingsTitle
                    ),
                    h(
                      "div",
                      {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: 16,
                        },
                      },
                      data.misunderstandings.map((item, index) =>
                        makePanelItem(h, item, index, {
                          kind: "mistake",
                          accent: COLORS.warm,
                          chipText: "#FFF8F3",
                          title: "#C76128",
                          itemBg: COLORS.warmSoft,
                        })
                      )
                    ),
                  ]
                ),
                h(
                  "div",
                  {
                    style: {
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 30,
                      background: "#F3FBF7",
                      border: "2px solid #9AC3AF",
                      padding: "20px 20px 24px 20px",
                    },
                  },
                  [
                    h(
                      "div",
                      {
                        style: {
                          fontSize: 28,
                          fontWeight: 700,
                          color: "#235E49",
                          marginBottom: 18,
                        },
                      },
                      data.beginnersTitle
                    ),
                    h(
                      "div",
                      {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: 16,
                        },
                      },
                      data.beginners.map((item, index) =>
                        makePanelItem(h, item, index, {
                          kind: "beginner",
                          accent: COLORS.cool,
                          chipText: "#F7FFFA",
                          title: "#235E49",
                          itemBg: COLORS.coolSoft,
                        })
                      )
                    ),
                  ]
                ),
              ]
            ),
            h(
              "div",
              {
                style: {
                  height: 40,
                  borderRadius: 20,
                  background: COLORS.dark,
                  color: "#F7F5EE",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 20px",
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: 1.2,
                },
              },
              data.summary
            ),
          ]
        ),
      ]
    );
  },
};
