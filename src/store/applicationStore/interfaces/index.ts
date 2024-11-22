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
};

type ISetUser = {
  name: string;
  token: string;
};

export type { IApplicationProps, ISetUser };
