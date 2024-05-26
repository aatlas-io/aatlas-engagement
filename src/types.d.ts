type InAppGuideItemType = {
  id: number;
  image: string;
  title: string;
  app_env_id: number;
  created_at: string;
  deleted_at: string | null;
  updated_at: string | null;
  description: string;
};

type InAppGuideType = {
  background_color: string | null;
  title_color: string | null;
  description_color: string | null;
  button_background_color: string | null;
  button_text_color: string | null;
  pagination_active_color: string | null;
  pagination_inactive_color: string | null;
  in_app_guides: InAppGuideItemType[];
};

type AppConfigType = {
  inAppGuide: InAppGuideType;
};

type ConfigType = {
  appConfig: AppConfigType | null;
};

type RenderItemType = {
  item: {
    title: string;
    image: string;
    description: string;
  };
};

type GlobalDataType = {
  appId: number;
  appSecret: string;
  anonymousUserId: string;
};

type AppDataType = {
  appId: number;
  appSecret: string;
};

type GlobalDataReturnType = {
  getGlobalData: () => GlobalDataType;
  setAppData: (data: AppDataType) => void;
  getAnonymousUserId: () => Promise<string>;
};
