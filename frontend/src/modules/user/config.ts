const DOCKER_SERVER_URL = 'http://nginx';

export const ENDPOINTS = {
    PROFILE: `${DOCKER_SERVER_URL}/api/auth/user/profile`,
    UPDATE_PROFILE: `${DOCKER_SERVER_URL}/api/auth/user/profile`,
    CHANGE_AVATAR: `${DOCKER_SERVER_URL}/api/auth/user/avatar`,
    SETTINGS: `${DOCKER_SERVER_URL}/api/auth/user/settings`,
    UPDATE_SETTINGS: `${DOCKER_SERVER_URL}/api/auth/user/settings`,
  };