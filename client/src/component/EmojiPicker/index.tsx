import { FC } from 'react';
import emojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface IEmojiPicker {
  setComment:Function
}

const EmojiPicker:FC<IEmojiPicker> = ({ setComment }) => {
  const handleEmojiSelect = (emoji: any):void => {
    setComment((prev:string) => prev + emoji.native);
  };

  return (
    <Picker
      onEmojiSelect={handleEmojiSelect}
      style={{ width: '250px !important', height: '300px !important' }}
      data={emojiData}
      previewPosition="none"
      perLine={7}
      theme="light"
    />
  );
};

export default EmojiPicker;
