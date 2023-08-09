/* eslint-disable */
import React from 'react';

const MmShare = (imageURL) => {
  const WEBHOOK_URL = 'https://meeting.ssafy.com/hooks/q1x16pxcp3d1jm8sy11bsx8oue'; // Replace with your Mattermost webhook URL
  const CHANNEL = 'o1kxapqfrjgqded5etqxex494h'; // Replace with the target channel name

  const POST_DATA = {
    channel: CHANNEL,
    username: "test",
    text: "Here is the image:",
    attachments: [
      {
        fallback: "Image",
        image_url: 	
        'https://via.placeholder.com/300',
      },
    ],
  };

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(POST_DATA),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Image sent successfully:", data);
    })
    .catch((error) => {
      console.error("Error sending image:", error);
    });
};
