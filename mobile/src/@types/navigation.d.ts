export type UpdateClientNavigationProps = {
  id: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      employee: undefined;
      client: undefined;
      clientUpdate: UpdateClientNavigationProps;
    }
  }
}