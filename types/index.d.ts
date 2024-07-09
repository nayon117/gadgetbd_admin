/* eslint-disable no-unused-vars */
export interface NavbarLink {
  route: string;
  label: string;
}
export interface slidesLink {
  imgUrl: string;
  title: string;
  subtitle: string;
}
declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
