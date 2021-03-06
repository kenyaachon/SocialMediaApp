module.exports = {
  v: 4,
  t: [
    { t: 7, e: "header", f: [{ t: 7, e: "navigation" }] },
    " ",
    {
      t: 7,
      e: "div",
      a: { class: "hero" },
      f: [{ t: 7, e: "h1", f: ["Find friends"] }],
    },
    " ",
    {
      t: 7,
      e: "form",
      a: { onsubmit: "return false;" },
      f: [
        {
          t: 4,
          n: 50,
          r: "loading",
          f: [{ t: 7, e: "p", f: ["Loading. Please wait."] }],
        },
        {
          t: 4,
          n: 51,
          f: [
            {
              t: 7,
              e: "label",
              a: { for: "friend-name" },
              f: ["Please, type the name of your friend:"],
            },
            " ",
            {
              t: 7,
              e: "input",
              a: {
                type: "text",
                id: "friend-name",
                value: [{ t: 2, r: "friendName" }],
              },
            },
            " ",
            {
              t: 7,
              e: "input",
              a: { type: "button", value: "Find" },
              v: { click: "find" },
            },
          ],
          r: "loading",
        },
      ],
    },
    " ",
    {
      t: 4,
      n: 50,
      x: { r: ["foundFriends"], s: "_0!==null" },
      f: [
        {
          t: 7,
          e: "div",
          a: { class: "friends-list" },
          f: [
            {
              t: 4,
              n: 52,
              r: "foundFriends",
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
                        { t: 2, r: "firstName" },
                        " ",
                        { t: 2, r: "lastName" },
                      ],
                    },
                    " ",
                    {
                      t: 7,
                      e: "input",
                      a: { type: "button", value: "Add as a friend" },
                      v: { click: { n: "add", d: [{ t: 2, r: "id" }] } },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      t: 4,
      n: 50,
      x: { r: ["message"], s: '_0!==""' },
      f: [
        {
          t: 7,
          e: "div",
          a: { class: "friends-list" },
          f: [{ t: 7, e: "p", f: [{ t: 3, r: "message" }] }],
        },
      ],
    },
    { t: 7, e: "appfooter" },
  ],
};
