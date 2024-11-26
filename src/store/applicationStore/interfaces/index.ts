type IApplicationProps = {
  auth: {
    error: string | null;
    loading: boolean;
    user: {
      name: string;
      token: string;
    };
  };
  application: {
    loadingModal: boolean;
    streams: {
      data: Array<string>;
      error: string | null;
      loading: boolean;
    };
    games: {
      data: Array<string>;
      error: string | null;
      loading: boolean;
    };
    notifications: {
      data: Array<string>;
      error: string | null;
      loading: boolean;
    };
    stories: {
      data: Array<string>;
      error: string | null;
      loading: boolean;
    };
  };
  menu: {
    loading: boolean;
    data: Array<IMenu>;
  };
};

type IMenu = {
  name: string;
  to: string;
  active: boolean;
  disabled: boolean;
  Icon: React.ElementType;
};

type ISetUser = {
  name: string;
  token: string;
};

export type { IApplicationProps, ISetUser, IMenu };
