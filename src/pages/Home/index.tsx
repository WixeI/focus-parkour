import { Box } from '../../global/components/Box';
import { Button } from '../../global/components/Button';
import { summerTheme } from '../../global/styles/themes/summer';

const Home = () => {
  return (
    <Box>
      {/* With default theme */}
      <Box css={{ margin: '$2', display: 'flex', flexWrap: 'wrap', gap: '$2' }}>
        <Button>Button</Button>
        <Button variant="gray">Gray Button</Button>
        <Button variant="primary">Primary Button</Button>
        <Button variant="gray" outlined>
          Outlined Gray Button
        </Button>
        <Button variant="primary" outlined>
          Outlined Primary Button
        </Button>
        <Button variant="primary" outlined size={{ initial: '2', bp1: '1' }}>
          Responsive Primary Button
        </Button>
      </Box>

      {/* With custom theme */}
      <Box
        className={summerTheme}
        css={{ margin: '$2', display: 'flex', flexWrap: 'wrap', gap: '$2' }}>
        <Button>Button</Button>
        <Button variant="gray">Gray Button</Button>
        <Button variant="primary">Primary Button</Button>
        <Button variant="gray" outlined>
          Outlined Gray Button
        </Button>
        <Button variant="primary" outlined>
          Outlined Primary Button
        </Button>
        <Button variant="primary" outlined size={{ initial: '2', bp1: '1' }}>
          Responsive Primary Button
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
