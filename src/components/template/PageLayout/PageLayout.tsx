import React from 'react';
import NavigationBar from '~/components/molecules/NavigationBar';

type PageLayoutProps = { children?: React.ReactNode };

const PageLayout = ({ children }: PageLayoutProps) => (
    <main className='grid h-screen grid-cols-1 grid-rows-[1fr_auto] bg-zinc-900 text-white lg:grid-cols-[auto_1fr] lg:grid-rows-1'>
        <div className='flex flex-col gap-4 overflow-y-auto py-2 lg:col-[2/span_1]'>{children}</div>
        <NavigationBar />
    </main>
);

export default PageLayout;
