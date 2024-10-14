import { EventEmitter } from "events";
const eventBus = new EventEmitter();

export default eventBus;

export const ACTIONS = {
  OPEN_INVITE_USER_MODAL: "openInviteUserModal",
  OPEN_PROFILE_POPUP: "openProfilePopup",
  NAVIGATE_CREATE_SITE: "navigateCreateSite",
};
