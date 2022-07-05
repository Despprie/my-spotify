import React from 'react';

type PageLayoutProps = { children?: React.ReactNode };

const PageLayout = ({ children }: PageLayoutProps) => (
    // <main className='grid h-screen grid-cols-1 grid-rows-[1fr_auto] bg-zinc-900 text-white lg:grid-cols-[auto_1fr] lg:grid-rows-1'>
    //     <div className='flex flex-col gap-6 overflow-y-auto py-2 lg:col-[2/span_1] lg:px-10'>{children}</div>
    //     <NavigationBar />
    // </main>
    <main className='grid h-screen place-items-center bg-zinc-900 text-white'>{children}</main>
);

export default PageLayout;
