const rules = {
  "4": {
    static: [
      "homepage:view",
      "posts:view",
      "home-page:visit",
      "about:view",
      "map-story:view",
      "login:view"
    ]
  },
  "3": {
    static: [
      "posts:view",
      "posts:create",
      "posts:like",
      "posts:comment",
      "homepage:view",
      "posts:view",
      "posts:delete",
      "home-page:visit",
      "about:view",
      "map-story:view",
      "login:view"
    ]
  },
  "2": {
    static: [
      "posts:view",
      "posts:create",
      "posts:like",
      "posts:comment",
      "homepage:view",
      "posts:view",
      "home-page:visit",
      "about:view",
      "map-story:view",
      "login:view",
      "posts:blacklist",
      "posts:disapprove",
      "users:view",
      "users:blacklist"
    ]
  },
  "1": {
    static: [
      "posts:view",
      "posts:create",
      "posts:like",
      "posts:comment",
      "homepage:view",
      "posts:view",
      "posts:delete",
      "home-page:visit",
      "about:view",
      "map-story:view",
      "login:view",
      "posts:blacklist",
      "posts:disapprove",
      "posts:delete",
      "users:view",
      "users:update",
      "users:delete",
      "users:blacklist"
    ]
  }
};

export default rules;
