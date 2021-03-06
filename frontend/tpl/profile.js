module.exports = {
  v: 4,
  t: [
    { t: 7, e: "header", f: [{ t: 7, e: "navigation" }] },
    " ",
    {
      t: 7,
      e: "div",
      a: { class: "hero" },
      f: [{ t: 7, e: "h1", f: ["Profile"] }],
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
              f: [{ t: 3, r: "error" }],
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
        " ",
        { t: 7, e: "label", a: { for: "first-name" }, f: ["First name"] },
        " ",
        {
          t: 7,
          e: "input",
          a: {
            type: "text",
            id: "first-name",
            value: [{ t: 2, r: "firstName" }],
          },
        },
        " ",
        { t: 7, e: "label", a: { for: "last-name" }, f: ["Last name"] },
        " ",
        {
          t: 7,
          e: "input",
          a: {
            type: "text",
            id: "last-name",
            value: [{ t: 2, r: "lastName" }],
          },
        },
        " ",
        { t: 7, e: "label", a: { for: "password" }, f: ["Change password"] },
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
        " ",
        {
          t: 7,
          e: "input",
          a: { type: "button", value: "update" },
          v: { click: "updateProfile" },
        },
        " ",
        {
          t: 7,
          e: "input",
          a: {
            type: "button",
            value: "delete account",
            class: "right attention",
          },
          v: { click: "deleteProfile" },
        },
      ],
    },
    " ",
    {
      t: 4,
      n: 50,
      x: { r: ["friends.length"], s: "_0>0" },
      f: [
        {
          t: 7,
          e: "div",
          a: { class: "hero" },
          f: [{ t: 7, e: "h1", f: ["Friends"] }],
        },
        " ",
        {
          t: 7,
          e: "div",
          a: { class: "friends-list" },
          f: [
            {
              t: 4,
              n: 52,
              r: "friends",
              i: "index",
              f: [
                {
                  t: 7,
                  e: "div",
                  a: { class: "friend-list-item" },
                  f: [
                    {
                      t: 7,
                      e: "h2",
                      f: [
                        {
                          t: 2,
                          rx: {
                            r: "friends",
                            m: [{ t: 30, n: "index" }, "firstName"],
                          },
                        },
                        " ",
                        {
                          t: 2,
                          rx: {
                            r: "friends",
                            m: [{ t: 30, n: "index" }, "lastName"],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { t: 7, e: "appfooter" },
  ],
};
