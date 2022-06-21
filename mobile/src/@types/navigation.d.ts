export type UpdateScreenNavigationProps = {
  id: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      employee: undefined;

      client: undefined;
      clientUpdate: UpdateScreenNavigationProps;
      
      product: undefined;
      productUpdate: UpdateScreenNavigationProps;
      
      budget: undefined;
      budgetUpdate: UpdateScreenNavigationProps;
      budgetDetail: UpdateScreenNavigationProps;
    }
  }
}