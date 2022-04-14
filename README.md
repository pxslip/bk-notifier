# Twitch EventSub Serverless Application

An AWS Serverless application intended to wire into Twitch's [event sub](https://dev.twitch.tv/docs/eventsub) system, and in the future be a chatbot receiver.

Currently there is one endpoint `/go-live` that handles the `stream.online` event. You will find tooling to subscribe to events in the `utils` folder.

## Parameters for the system

- Use the `.env-template.json` to set your values
- Use `utils/update-params.js` to update the SSM parameters for build and deploy
