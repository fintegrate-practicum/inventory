import type { Meta, StoryObj } from '@storybook/react';
import Notification from './Notification';

const meta: Meta<typeof Notification> = {
    component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const primary: Story = {
    args: {
        //להוסיף עוד פרמטרים ועוד stories
        messege: "notification!"
    },
};