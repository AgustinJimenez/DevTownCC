import AxiosProvider from "./AxiosProvider";

const Providers = ({ children }: { children: any }) => (
  <AxiosProvider>{children}</AxiosProvider>
);

export default Providers;
