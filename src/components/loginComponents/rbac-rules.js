const basicUserRule = [
  "homepage:view",
  "posts:view",
  "home-page:visit",
  "about:view",
  "map-story:view",
  "login:view"
];

const normalUserRule = [
  ...basicUserRule,
  "posts:view",
  "posts:create",
  "posts:like",
  "posts:comment",
  "posts:delete"
];

const moderatorUserRule = [
  ...normalUserRule,
  "posts:blacklist",
  "posts:disapprove",
  "users:view",
  "users:blacklist"
];

const adminUserRole = [...moderatorUserRule, "users:update", "users:delete"];

const rules = {
  "4": {
    static: basicUserRule
  },
  "3": {
    static: normalUserRule
  },
  "2": {
    static: moderatorUserRule
    // static: [
    //   "posts:view",
    //   "posts:create",
    //   "posts:like",
    //   "posts:comment",
    //   "homepage:view",
    //   "posts:view",
    //   "home-page:visit",
    //   "about:view",
    //   "map-story:view",
    //   "login:view",
    //   "posts:blacklist",
    //   "posts:disapprove",
    //   "users:view",
    //   "users:blacklist"
    // ]
  },
  "1": {
    static: adminUserRole
    // static: [
    //   "posts:view",
    //   "posts:create",
    //   "posts:like",
    //   "posts:comment",
    //   "homepage:view",
    //   "posts:view",
    //   "posts:delete",
    //   "home-page:visit",
    //   "about:view",
    //   "map-story:view",
    //   "login:view",
    //   "posts:blacklist",
    //   "posts:disapprove",
    //   "posts:delete",
    //   "users:view",
    //   "users:update",
    //   "users:delete",
    //   "users:blacklist"
    // ]
  }
};

export default rules;
