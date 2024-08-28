import websocketConnection from "./websocketConnection";

let backend_canister_id = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
let gateway_address = "ws://127.0.0.1:8080";
let url = "http://127.0.0.1:4943";
let local_test = true;
//let url = "https://ic0.app";
//let local_test = false;

let ws = new websocketConnection(
  backend_canister_id,
  gateway_address,
  url,
  local_test
);

// Send message handler
let sendMessage = () => {
  let message = document.getElementById("message").value;
  let message_to_send = ws.make_message(message);
  ws.sendMessage(message_to_send);
};

// Bind the send button
document.getElementById("send_button").addEventListener("click", sendMessage);

// Bind the enter key
document.getElementById("message").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Show notifications inside the notifications div
let showNotification = (message) => {
  let notifications = document.getElementById("notifications");
  let notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerText = message;
  notifications.appendChild(notification);
};

// Websocket message handler
ws.onMessage = (message) => {
  let message_to_show = ws.parse_message(message);
  showNotification(message_to_show);
};

// Websocket close handler
ws.onClose = () => {
  showNotification("Connection closed");
};
