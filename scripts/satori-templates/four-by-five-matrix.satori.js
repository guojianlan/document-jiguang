const COLORS = {
  pageBg: "#ECE5DB",
  shellBg: "#F7F4EC",
  shellBorder: "#E2D7C8",
  dark: "#1F2A25",
  muted: "#5A655E",
  warm: "#B75C2C",
  warmSoft: "#FFF1E7",
  cool: "#2F7B69",
  coolSoft: "#EEF7F2",
  rowBg: "#FFFDF8",
  rowAlt: "#F4EFE4",
  headerBg: "#1F2A25",
  cellBorder: "#E0D6C5",
};

function boxShadow(opacity) {
  return `0 14px 34px rgba(31, 42, 36, ${opacity})`;
}

function colHeader(h, label, sublabel) {
  return h(
    "div",
    {
      key: `colh-${label}`,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 10px",
        background: COLORS.headerBg,
        color: "#F7F4EC",
        borderRight: `1px solid #2C3A33`,
      },
    },
    [
      h(
        "div",
        {
          style: {
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.15,
          },
        },
        label
      ),
      h(
        "div",
        {
          style: {
            marginTop: 6,
            fontSize: 16,
            color: "#C8BFA9",
            lineHeight: 1.3,
          },
        },
        sublabel
      ),
    ]
  );
}

function rowLabel(h, index, title, subtitle) {
  return h(
    "div",
    {
      key: `rowl-${index}`,
      style: {
        width: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "18px 18px",
        background: COLORS.headerBg,
        color: "#F7F4EC",
        borderTop: "1px solid #2C3A33",
      },
    },
    [
      h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
          },
        },
        [
          h(
            "div",
            {
              style: {
                width: 30,
                height: 30,
                borderRadius: 15,
                background: COLORS.warm,
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
              },
            },
            String(index)
          ),
          h(
            "div",
            {
              style: {
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#F7F4EC",
                width: 168,
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
            marginTop: 8,
            fontSize: 14,
            lineHeight: 1.4,
            color: "#C8BFA9",
          },
        },
        subtitle
      ),
    ]
  );
}

function cell(h, index, text, alt) {
  return h(
    "div",
    {
      key: `cell-${index}`,
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "16px 16px",
        background: alt ? COLORS.rowAlt : COLORS.rowBg,
        borderTop: `1px solid ${COLORS.cellBorder}`,
        borderRight: `1px solid ${COLORS.cellBorder}`,
        fontSize: 18,
        lineHeight: 1.45,
        color: COLORS.dark,
      },
    },
    text
  );
}

module.exports = {
  size: {
    width: 1600,
    height: 1180,
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
          padding: 44,
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
              borderRadius: 30,
              padding: "32px 32px 28px 32px",
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
                  marginTop: 18,
                  fontSize: 48,
                  fontWeight: 700,
                  lineHeight: 1.16,
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
                  marginTop: 10,
                  fontSize: 20,
                  lineHeight: 1.5,
                  color: COLORS.muted,
                  maxWidth: 1440,
                },
              },
              data.subtitle
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 26,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 22,
                  overflow: "hidden",
                  border: `1px solid ${COLORS.cellBorder}`,
                  background: COLORS.rowBg,
                },
              },
              [
                // header row
                h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "stretch",
                    },
                  },
                  [
                    h(
                      "div",
                      {
                        style: {
                          width: 240,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: COLORS.headerBg,
                          color: "#C8BFA9",
                          fontSize: 16,
                          fontWeight: 700,
                          padding: "16px 10px",
                          letterSpacing: 1,
                        },
                      },
                      "共性 \\ 工具"
                    ),
                    ...data.columns.map((c) => colHeader(h, c.label, c.sublabel)),
                  ]
                ),
                // rows
                ...data.rows.map((row, rIdx) =>
                  h(
                    "div",
                    {
                      key: `row-${rIdx}`,
                      style: {
                        display: "flex",
                        alignItems: "stretch",
                      },
                    },
                    [
                      rowLabel(h, rIdx + 1, row.title, row.subtitle),
                      ...row.cells.map((c, cIdx) =>
                        cell(h, `${rIdx}-${cIdx}`, c, rIdx % 2 === 1)
                      ),
                    ]
                  )
                ),
              ]
            ),
            h(
              "div",
              {
                style: {
                  marginTop: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 22px",
                  borderRadius: 18,
                  background: COLORS.warmSoft,
                  border: `2px solid #E8BE9E`,
                },
              },
              [
                h(
                  "div",
                  {
                    style: {
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#A55325",
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
