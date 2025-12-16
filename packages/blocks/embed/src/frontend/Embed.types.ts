import { defineRouting } from 'next-intl/routing';

export interface EmbedProps {
    id: string;
    accessToken?: string;
    locale: string;
    routing: ReturnType<typeof defineRouting>;
    block: {
        domain: string;
        name: string;
        id: string;
    };
}

export type EmbedRendererProps = Omit<EmbedProps, ''> & {
    slug: string[];
};
