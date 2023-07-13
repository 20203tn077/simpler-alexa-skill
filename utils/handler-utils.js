import { getIntentName as _getIntentName, getRequestType, getSlotValue } from 'ask-sdk-core'

export const handleLaunch = handlerInput => getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
export const handleIntent = (...intents) => handlerInput => getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && (!intents.length || intents.some(intent => _getIntentName(handlerInput.requestEnvelope) === intent))
export const handleSessionEnded = handlerInput => getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest'
export const handleAny = () => true

let _handlerInput

export const handle = handlerFunction => (handlerInput, error) => {
  _handlerInput = handlerInput
  return handlerFunction(error)
}

export const inject = constructor => new constructor(_handlerInput)
export const getIntentName = () => _getIntentName(_handlerInput.requestEnvelope)
export const getSlot = slotName => getSlotValue(_handlerInput.requestEnvelope, slotName)
export const isConfirmed = () => _handlerInput.requestEnvelope.request.intent.confirmationStatus === 'CONFIRMED'
export const isDenied = () => _handlerInput.requestEnvelope.request.intent.confirmationStatus === 'DENIED'
export const result = (speakOutput, reprompt = false) => {
  const result = _handlerInput.responseBuilder
  if (speakOutput) result.speak(speakOutput)
  if (reprompt) result.reprompt(speakOutput)
  return result.getResponse()
}