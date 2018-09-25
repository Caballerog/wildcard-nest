const feathers = require("@feathersjs/feathers");
const socketio = require("@feathersjs/socketio-client");
const auth = require("@feathersjs/authentication-client");
const io = require("socket.io-client");

export default () => {
  // Notify
  window.notify("FeathersJS backend implemented");

  // Connect to server
  const socket = io("127.0.0.1:3030");
  const server = feathers();
  server.configure(socketio(socket, { timeout: 5000 }));
  server.configure(
    auth({
      storage: window.localStorage
    })
  );

  // Set Global Handlers
  window.login = async (loginData: LoginData) => {
    const response = await server.authenticate({
      strategy: "local",
      user: loginData.user,
      pass: loginData.pass
    });

    window.notify("Logged In");
    loadUsers();
    loadTweets();
  };
  window.logout = async () => {
    throw "not implemented";
  };
  window.register = async (loginData: LoginData) => {
    const res = await server.service("users").create(loginData);
    window.notify(`User ${res.user} created`);
  };

  // Find all users and fill the UI
  async function loadUsers() {
    const users = await server.service("users").find({});
    users.data.forEach(user => {
      window._createUser({
        name: user.user,
        age: "",
        company: ""
      });
    });
  }

  // Load tweet listener
  async function loadTweets() {
    server.service("tweets").on("created", t => {
      window._createTweet({
        id: t.id,
        name: t.name,
        text: t.text,
        created_at: t.created_at,
        image: t.image,
        username: t.username,
        verified: t.verified
      });
    });
  }
};
