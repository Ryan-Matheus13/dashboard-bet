/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StoryCardProps {
  data: IStoryCard;
  onEdit: (data: IStoryCard) => void;
  cdnUrl: string;
}

export interface IStoryCard {
  story_id: string;
  story_dayOfWeek: number;
  story_title: string;
  story_description: string;
  story_thumbnail: string;
  story_image: string;
  story_actionTo: string;
  story_actionTarget: string;
  story_actionTitle: string;
}
