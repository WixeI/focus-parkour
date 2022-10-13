import { IframeHTMLAttributes } from 'react';
import { styled } from '../../../configs/stitches/stitches.config';

interface YoutubeEmbedProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  embedId: string;
}

const YoutubeEmbed = ({ embedId, ...rest }: YoutubeEmbedProps) => (
  <iframe
    width="853"
    height="480"
    src={`https://www.youtube.com/embed/${embedId}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
    {...rest}
  />
);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const StyledYoutubeEmbed = styled(YoutubeEmbed, {});

export default StyledYoutubeEmbed;
