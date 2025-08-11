const axios = require("axios");

async function onStart({ message, event, args }) {
  const reply = event.messageReply;

  if (!args[0]) return message.reply("[⚜️]➜ Please provide a name");

  if (!reply?.attachments || reply.attachments[0]?.type !== "video") {
    return message.reply("[⚜️]➜ Please reply to a video message.");
  }

  const name = args.join(" ");
  const videoUrl = reply.attachments[0].url;

  try {
    const imgurRes = await axios.get(`https://aryan-nix-apis.vercel.app/api/imgur?url=${encodeURIComponent(videoUrl)}`);
    const uploadedUrl = imgurRes.data.imgur;

    const addRes = await axios.get(`https://nix-random.onrender.com/api/mixadd?name=${encodeURIComponent(name)}&url=${encodeURIComponent(uploadedUrl)}`);
    const res = addRes.data;

    const msg = [
      "✅ VIDEO ADDED SUCCESSFULLY",
      "",
      `📛 Name: ${res.data.name}`,
      `🔗 Link: ${res.data.url}`
    ].join("\n");

    return message.reply(msg);
  } catch (err) {
    console.error(err);
    return message.reply("[⚜️]➜ An error occurred while processing your request.");
  }
}

const config = {
  name: "add",
  aliases: [],
  version: "1.0",
  author: "ArYAN",
  countDown: 5,
  role: 0,
  shortDescription: "Add video to a category",
  longDescription: "Reply to a video and add it to a category using a name",
  category: "media",
  guide: "{pn} <name> (reply to a video)"
};

module.exports = { config, onStart };
