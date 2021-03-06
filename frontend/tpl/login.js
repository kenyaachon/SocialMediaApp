module.exports = {
  v: 4,
  t: [
    { t: 7, e: "header", f: [{ t: 7, e: "navigation" }] },
    " ",
    {
      t: 7,
      e: "div",
      a: { class: "hero" },
      f: [{ t: 7, e: "h1", f: ["Login"] }],
    },
    " ",
    {
      t: 7,
      e: "form",
      f: [
        {
          t: 4,
          n: 50,
          x: { r: ["error"], s: '_0&&_0!=""' },
          f: [
            {
              t: 7,
              e: "div",
              a: { class: "error" },
              f: [{ t: 2, r: "error" }],
            },
          ],
        },
        " ",
        {
          t: 4,
          n: 50,
          x: { r: ["success"], s: '_0&&_0!=""' },
          f: [
            {
              t: 7,
              e: "div",
              a: { class: "success" },
              f: [{ t: 3, r: "success" }],
            },
          ],
        },
        {
          t: 4,
          n: 51,
          f: [
            { t: 7, e: "label", a: { for: "email" }, f: ["Email"] },
            " ",
            {
              t: 7,
              e: "input",
              a: { type: "text", id: "email", value: [{ t: 2, r: "email" }] },
            },
            " ",
            { t: 7, e: "label", a: { for: "password" }, f: ["Password"] },
            " ",
            {
              t: 7,
              e: "input",
              a: {
                type: "password",
                id: "password",
                value: [{ t: 2, r: "password" }],
              },
            },
            // " ",
            // {
            //   t: 7,
            //   e: "input",
            //   a: { type: "button", value: "login" },
            //   v: { click: "login" },
            // },
            "",
            {
              t: 7,
              e: "button",
              a: { class: "green-button", type: "button", value: "login" },
              v: { click: "login" },
            },
          ],
          x: { r: ["success"], s: '_0&&_0!=""' },
        },
      ],
    },
    " ",
    { t: 7, e: "appfooter" },
  ],
};
