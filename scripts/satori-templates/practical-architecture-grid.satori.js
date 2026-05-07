const COLORS = {
  pageBg: "#ECE5DB",
  shellBg: "#F7F4EC",
  shellBorder: "#E2D7C8",
  dark: "#1F2A25",
  muted: "#5A655E",
  warm: "#B75C2C",
  warmSoft: "#FFF1E7",
  neutralSoft: "#FFF8F1",
  cool: "#2F7B69",
  coolSoft: "#EEF7F2",
  deepSoft: "#F7F4EC",
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

function makeStageCard(h, stage) {
  return h(
    "div",
    {
      key: stage.title,
      style: {
        width: 314,
        minHeight: 218,
        display: "flex",
        flexDirection: "column",
        borderRadius: 28,
        padding: "22px 22px 20px 22px",
        background: COLORS.neutralSoft,
        border: "2px solid #E1D7C8",
        boxSizing: "border-box",
      },
    },
    [
      chip(h, stage.stepLabel, stage.chipBg, stage.chipText),
      h(
        "div",
        {
          style: {
            marginTop: 18,
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.2,
            color: COLORS.dark,
          },
        },
        stage.title
      ),
      h(
        "div",
        {
          style: {
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 16,
            lineHeight: 1.5,
            color: COLORS.muted,
          },
        },
        stage.lines.map((line, index) =>
          h(
            "div",
            {
              key: `${stage.title}-${index}`,
            },
            line
          )
        )
      ),
    ]
  );
}

function makeBottomCard(h, card) {
  return h(
    "div",
    {
      key: card.title,
      style: {
        width: 480,
        minHeight: 176,
        display: "flex",
        flexDirection: "column",
        borderRadius: 28,
        padding: "30px 36px",
        background: card.bg,
        border: `2px solid ${card.border}`,
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
            lineHeight: 1.3,
            color: card.titleColor,
          },
        },
        card.title
      ),
      h(
        "div",
        {
          style: {
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 18,
            lineHeight: 1.55,
            color: card.bodyColor,
          },
        },
        card.lines.map((line, index) =>
          h(
            "div",
            {
              key: `${card.title}-${index}`,
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
    height: 1080,
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
                  width: 360,
                  height: 36,
                  borderRadius: 18,
                  background: COLORS.dark,
                  color: "#F7F4EC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
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
                  marginTop: 24,
                  fontSize: 56,
                  fontWeight: 700,
                  lineHeight: 1.14,
                  color: COLORS.dark,
                  maxWidth: 1340,
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
                  marginTop: 46,
                  width: "100%",
                  minHeight: 110,
                  borderRadius: 26,
                  padding: "26px 34px",
                  boxSizing: "border-box",
                  background: COLORS.warmSoft,
                  border: "2px solid #E8BE9E",
                  display: "flex",
                  flexDirection: "column",
                },
              },
              [
                h(
                  "div",
                  {
                    style: {
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#A55325",
                    },
                  },
                  data.businessLineTitle
                ),
                h(
                  "div",
                  {
                    style: {
                      marginTop: 10,
                      fontSize: 22,
                      lineHeight: 1.5,
                      color: "#674A32",
                    },
                  },
                  data.businessLineBody
                ),
              ]
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 50,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 24,
                },
              },
              data.stages.map((stage) => makeStageCard(h, stage))
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 54,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 40,
                  padding: "0 110px",
                  boxSizing: "border-box",
                },
              },
              data.bottomCards.map((card) => makeBottomCard(h, card))
            ),
          ]
        ),
      ]
    );
  },
};
