'use client';

import { useLocale } from 'next-intl';
import React, { Suspense, useEffect, useRef } from 'react';

import { Container } from '@dxp/ui/components/Container';
import { Loading } from '@dxp/ui/components/Loading';

import { EmbedRendererProps } from './Embed.types';

export const EmbedRenderer: React.FC<EmbedRendererProps> = ({ id, block }) => {
    const locale = useLocale();

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            const { type, height } = (event.data || {}) as { type?: string; height?: number };
            if (type === 'embed:height' && typeof height === 'number' && iframeRef.current) {
                iframeRef.current.style.height = `${height}px`;
            }
        };

        window.addEventListener('message', onMessage);

        return () => window.removeEventListener('message', onMessage);
    }, []);

    return (
        <Suspense
            key={id}
            fallback={
                <>
                    <Loading bars={1} />
                    <Container variant="narrow">
                        <Loading bars={8} />
                    </Container>
                </>
            }
        >
            <iframe
                ref={iframeRef}
                src={`${block.domain}/${locale}/embed/${block.name}/${block.id}`}
                width="100%"
                height="783px"
            ></iframe>
        </Suspense>
    );
};
