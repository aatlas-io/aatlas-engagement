type InAppGuideItemType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type AppConfigType = {
  in_app_guides: InAppGuideItemType[];
  nps_eligible: boolean;
};

type InAppGuidesStatus = {
  seen: number[];
  notSeen: number[];
};

type FeedbackType = {
  message: string;
  type: 'nps' | 'general';
  nps_score?: number;
};

type ConfigType = {
  appConfig: AppConfigType | null;
  setUser: ({ user_id, name, email }: { user_id: string; name?: string; email?: string }) => Promise<void>;
  updateInAppGuidesSeenStatus: (data: InAppGuidesStatus) => Promise<void>;
  resetInAppGuides: () => void;
  resetNPSEligibility: () => void;
  sendFeedback: (data: FeedbackType) => Promise<void>;
};

type GlobalDataType = {
  appKey: string;
  appSecret: string;
  anonymousUserId: string;
};

type AppDataType = {
  appKey: string;
  appSecret: string;
};

type GlobalDataReturnType = {
  getGlobalData: () => GlobalDataType;
  setAppData: (data: AppDataType) => void;
  getAnonymousUserId: () => Promise<string>;
};

declare module '*.jpg';
