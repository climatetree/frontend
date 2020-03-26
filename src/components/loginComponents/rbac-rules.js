const rules = {
  "4": {
    static: ["homepage:view", "posts:view", "home-page:visit"]
  },
  "3": {
    static: ["posts:like", "home-page:visit"]
  },
  "2": {
    static: [
      "posts:like",
      "posts:create",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ]
  },
  "1": {
    static: [
      "posts:like",
      "posts:create",
      "posts:edit",
      "posts:like",
      "posts:delete",
      "users:get",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ]
  }
};

export default rules;
