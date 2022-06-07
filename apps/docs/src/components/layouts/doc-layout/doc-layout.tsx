import {
  Container, Stack,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import { domMax, LazyMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  CSSProperties, useMemo,
} from 'react';

import { DocHeader, DocHeaderProps } from '@/components/doc/doc-header';
import { Toc } from '@/components/doc/toc';
import { DocNav } from '@/components/doc-nav';
import { BaseLayout } from '@/components/layouts/base-layout';
import { HeaderProps } from '@/components/shared/header';
import { useResponsive } from '@/context/responsive';
import { useHeadingsData } from '@/hooks/headings-data';

import styles from './doc-layout.module.css';

export interface IPropsDocLayout extends Pick<DocHeaderProps, 'title' | 'subtitle'> {
  color?: 'mint' | 'blue' | 'salmon' | 'indigo';
  showToc?: boolean;
}

const DynHeader = dynamic<HeaderProps>(
  async () => import('@/components/shared/header').then(mod => mod.Header),
  {
    ssr: false,
  },
);

export const DocLayout: FCChildren<IPropsDocLayout> = ({
  children,
  color,
  title,
  subtitle,
  showToc = true,
}) => {
  const { matches } = useResponsive();
  const router = useRouter();
  const { nestedHeadings } = useHeadingsData();

  const getPretitle = useMemo(() => {
    const pretitle = (router.asPath.split('/')[3] || router.asPath.split('/')[2]).replace(/-/g, ' ');
    const isDifferentFromTitle = pretitle.replace('-', ' ') !== title?.toLowerCase();
    return pretitle && isDifferentFromTitle ? pretitle : 'documentation';
  }, [router, title]);

  const dynamicStyle: CSSProperties = {
    '--layout-color-fg': `var(--highlight-${color ?? 'gray'}-foreground)`,
    '--layout-color-bg': `var(--highlight-${color ?? 'gray'}-background)`,
  };

  return (
    <BaseLayout>
      <DynHeader position="sticky" />
      <span className={styles.Glow} />
      <LazyMotion features={domMax}>
        <Container dimension="large" style={dynamicStyle}>
          <Stack direction={matches.large ? 'row' : undefined} columnGap={56}>

            <div className={styles.Sidebar}>
              <Stack rowGap={40}>
                <DocNav />
              </Stack>
            </div>

            <main className={styles.Content}>
              <DocHeader preTitle={getPretitle} title={title} subtitle={subtitle} />
              {children}
            </main>

            {(showToc && nestedHeadings.length > 0) && (
              <div className={clsx(styles.Sidebar, styles.Toc)}>
                <Toc headings={nestedHeadings} />
              </div>
            )}
          </Stack>
        </Container>
      </LazyMotion>
    </BaseLayout>
  );
};

