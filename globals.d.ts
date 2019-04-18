declare module '*.json' {
  const value: any
  export default value
}

export interface AlexaSmartHomeEvent {
  header: { [name: string]: string },
  payload: {
    switchControlAction: string,
    appliance: {
      additionalApplianceDetails: { [name: string]: string },
      applianceId: string,
    },
    accessToken: string
  } 
}

export interface AlexaSkillEvent {
  version: string,
  session: AlexaSkillSession,
  context: AlexaSkillContext,


}

export interface AlexaSkillSession {
  new: boolean,
  sessionId: string,
  application: {
    applicationId: string
  },
  attributes: {
    [name: string]: string
  },
  user: AlexaSkillUser
}

export interface AlexaSkillContext {
  System: {
    device: {
      deviceId: string,
      supportedInterfaces: {
        AudioPlayer: any
      }
    },
    application: {
      applicationId: string
    },
    user: AlexaSkillUser,
    apiEndpoint: string,
    apiAccessToken: string
  },
  AudioPlayer: {
    playerActivity: string,
    token: string,
    offsetInMilliseconds: number,
  }
}

export interface AlexaSkillUser {
  userId: string,
  accessToken: string,
  permissions: {
    consentToken: string
  }
}

export interface AlexaSkillRequest {
  type: string,
  requestId: string,
  timestamp: string,
  locale: string,
}
