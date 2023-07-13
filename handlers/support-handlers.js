import { getIntentName, handle, handleAny, handleIntent, handleLaunch, handleSessionEnded, result, } from '../utils/handler-utils'

export const LaunchRequestHandler = {
  canHandle: handleLaunch,
  handle: handle(() => {
    const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?'
    return result(speakOutput, true)
  })
}

export const HelloWorldIntentHandler = {
  canHandle: handleIntent('HelloWorldIntent'),
  handle: handle(() => {
    const speakOutput = 'Hello World!'
    return result(speakOutput)
  })
}

export const HelpIntentHandler = {
  canHandle: handleIntent('AMAZON.HelpIntent'),
  handle: handle(() => {
    const speakOutput = 'You can say hello to me! How can I help?'
    return result(speakOutput, true)
  })
}

export const CancelAndStopIntentHandler = {
  canHandle: handleIntent('AMAZON.CancelIntent', 'AMAZON.StopIntent'),
  handle: handle(() => {
    const speakOutput = 'Goodbye!'
    return result(speakOutput)
  })
}

export const FallbackIntentHandler = {
  canHandle: handleIntent('AMAZON.FallbackIntent'),
  handle: handle(() => {
    const speakOutput = "Sorry, I don't know about that. Please try again."
    return result(speakOutput, true)
  })
}

export const SessionEndedRequestHandler = {
  canHandle: handleSessionEnded,
  handle: handle(() => {
    console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`)
    return result()
  })
}

export const IntentReflectorHandler = {
  canHandle: handleIntent(),
  handle: handle(() => {
    const intentName = getIntentName()
    const speakOutput = `You just triggered ${intentName}`
    return result(speakOutput)
  })
}

export const ErrorHandler = {
  canHandle: handleAny,
  handle: handle((error) => {
    const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.'
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`)
    return result(speakOutput, true)
  })
}
