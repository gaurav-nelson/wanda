import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { Hero } from '@/components/home/hero';
import { Mentions } from '@/components/home/mentions';
import { Meta } from '@/components/shared/meta';
import { getLayoutProps } from '@/utils/get-layout-props';

const DynDesigners = dynamic<Record<string, any>>(
  async () => import('@/components/home/designers').then(mod => mod.Designers),
  { ssr: false },
);
const DynDevelopers = dynamic<Record<string, any>>(
  async () => import('@/components/home/developers').then(mod => mod.Developers),
  { ssr: false },
);
const DynBrands = dynamic<Record<string, any>>(
  async () => import('@/components/shared/brands').then(mod => mod.Brands),
  { ssr: false },
);

const Home: NextPage = () => (
  <>
    <Meta />
    <Hero />
    <Mentions />
    <DynDesigners />
    <DynDevelopers />
    <DynBrands />
  </>
);

export default Home;

export const getStaticProps = async () => getLayoutProps({
  layout: 'blank',
  layoutProps: {
    headerPosition: 'absolute',
  },
});

