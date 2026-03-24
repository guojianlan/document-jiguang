const COLORS = {
  pageBg: "#EEE7DD",
  shellBg: "#F7F4EC",
  shellBorder: "#E3D8C8",
  dark: "#1F2A25",
  muted: "#5B665F",
  warm: "#B75C2C",
  warmSoft: "#FFF1E6",
  neutralSoft: "#FFF8F1",
  cool: "#2F7B67",
  coolSoft: "#EEF7F2",
  inkSoft: "#F7F4EC",
  deepSoft: "#F7F3EC",
};

function boxShadow(opacity) {
  return `0 14px 34px rgba(31, 42, 36, ${opacity})`;
}

function chip(h, label, bg, fg) {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 28,
        padding: "0 14px",
        borderRadius: 14,
        background: bg,
        color: fg,
        fontSize: 18,
        fontWeight: 700,
      },
    },
    label
  );
}

function makeStepCard(h, step) {
  return h(
    "div",
    {
      key: step.title,
      style: {
        width: 176,
        minHeight: 190,
        display: "flex",
        flexDirection: "column",
        borderRadius: 24,
        padding: "18px 18px 18px 18px",
        background: step.bg,
        border: `2px solid ${step.border}`,
        boxSizing: "border-box",
      },
    },
    [
      chip(h, step.stepLabel, step.chipBg, step.chipText),
      h(
        "div",
        {
          style: {
            marginTop: 16,
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.3,
            color: COLORS.dark,
          },
        },
        step.title
      ),
      h(
        "div",
        {
          style: {
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 15,
            lineHeight: 1.5,
            color: COLORS.muted,
          },
        },
        step.lines.map((line, index) =>
          h(
            "div",
            {
              key: `${step.title}-${index}`,
            },
            line
          )
        )
      ),
    ]
  );
}

module.exports = {
  size: {
    width: 1600,
    height: 960,
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
          padding: 52,
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
              borderRadius: 34,
              padding: "34px 34px 30px 34px",
              boxShadow: boxShadow(0.08),
              boxSizing: "border-box",
            },
          },
          [
            h(
              "div",
              {
                style: {
                  width: 236,
                  height: 38,
                  borderRadius: 19,
                  background: COLORS.dark,
                  color: COLORS.inkSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: 2,
                },
              },
              data.eyebrow
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 24,
                  fontSize: 58,
                  fontWeight: 700,
                  lineHeight: 1.14,
                  color: COLORS.dark,
                  maxWidth: 1280,
                },
              },
              data.title
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 12,
                  fontSize: 22,
                  lineHeight: 1.5,
                  color: COLORS.muted,
                },
              },
              data.subtitle
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                },
              },
              data.steps.flatMap((step, index) => {
                const items = [makeStepCard(h, step)];
                if (index < data.steps.length - 1) {
                  items.push(
                    h(
                      "div",
                      {
                        key: `arrow-${index}`,
                        style: {
                          width: 18,
                          height: 6,
                          borderRadius: 3,
                          background: index === 0 ? "#B18866" : "#7AA292",
                        },
                      },
                      null
                    )
                  );
                }
                return items;
              })
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 72,
                  alignSelf: "center",
                  width: 1048,
                  minHeight: 164,
                  borderRadius: 28,
                  background: COLORS.dark,
                  color: COLORS.inkSoft,
                  padding: "32px 40px",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                },
              },
              [
                h(
                  "div",
                  {
                    style: {
                      fontSize: 26,
                      fontWeight: 700,
                      lineHeight: 1.35,
                    },
                  },
                  data.conclusionTitle
                ),
                h(
                  "div",
                  {
                    style: {
                      marginTop: 18,
                      fontSize: 18,
                      lineHeight: 1.65,
                      color: "#F4EEE4",
                    },
                  },
                  data.conclusionBody
                ),
              ]
            ),
          ]
        ),
      ]
    );
  },
};
