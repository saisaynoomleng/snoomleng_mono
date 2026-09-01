import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MainNav } from './MainNav';

const meta: Meta<typeof MainNav> = {
  title: 'Components/shared/MainNavigation',
  component: MainNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main Navigation Menu',
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
