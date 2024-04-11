import type { Meta, StoryObj } from '@storybook/react';
import Notification from './Notification';

const meta= {
    component: Notification,
    tags: ['autodocs'],
    // argTypes: {
    //     bgColor: { control: 'color' },
    // },
}satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof Notification>;

export const primary: Story = {
    args: {
        //להוסיף עוד פרמטרים ועוד stories
        messege: "notification!",
        vertical: "top",
        horizontal:"center"
    },
};
export const secondery: Story = {
    args: {
        //להוסיף עוד פרמטרים ועוד stories
        messege: "secondery Notification!",
        vertical:"bottom",
        horizontal:"right"
    },
};