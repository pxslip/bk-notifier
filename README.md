# Twitch EventSub Serverless Application

An AWS Serverless application intended to wire into Twitch's [event sub](https://dev.twitch.tv/docs/eventsub) system, and in the future be a chatbot receiver.

Currently there is one endpoint `/go-live` that handles the `stream.online` event. You will find tooling to subscribe to events in the `utils` folder.

## Parameters for the system

- `GoLiveWebhookUrl` is the discord webhook url to send a message to when the event is triggered
- `GoLiveMessage` is the message to send to the discord webhook
