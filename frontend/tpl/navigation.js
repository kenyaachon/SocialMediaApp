module.exports = {
  v: 4,
  t: [
    {
      t: 7,
      e: "nav",
      f: [
        {
          t: 7,
          e: "ul",
          f: [
            {
              t: 7,
              e: "li",
              f: [
                {
                  t: 7,
                  e: "a",
                  v: { click: { n: "goto", a: "home" } },
                  f: ["Home"],
                },
              ],
            },
            " ",
            {
              t: 4,
              n: 50,
              x: { r: ["isLogged"], s: "!_0" },
              f: [
                {
                  t: 7,
                  e: "li",
                  f: [
                    {
                      t: 7,
                      e: "a",
                      v: { click: { n: "goto", a: "register" } },
                      f: ["Register"],
                    },
                  ],
                },
                " ",
                {
                  t: 7,
                  e: "li",
                  f: [
                    {
                      t: 7,
                      e: "a",
                      v: { click: { n: "goto", a: "login" } },
                      f: ["Login"],
                    },
                  ],
                },
              ],
            },
            {
              t: 4,
              n: 51,
              f: [
                {
                  t: 7,
                  e: "li",
                  a: { class: "right" },
                  f: [
                    {
                      t: 7,
                      e: "a",
                      v: { click: { n: "goto", a: "logout" } },
                      f: ["Logout"],
                    },
                  ],
                },
                " ",
                {
                  t: 7,
                  e: "li",
                  a: { class: "right" },
                  f: [
                    {
                      t: 7,
                      e: "a",
                      v: { click: { n: "goto", a: "profile" } },
                      f: ["Profile"],
                    },
                  ],
                },
              ],
              x: { r: ["isLogged"], s: "!_0" },
            },
          ],
        },
      ],
    },
  ],
};
