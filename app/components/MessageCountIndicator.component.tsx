import React from "react";

type MessageCountIndicatorProps = {
  messageCounter?: number;
};

const MessageCountIndicator: React.FC<MessageCountIndicatorProps> = ({
  messageCounter,
}) => {
  const shouldRenderMessageCounter =
    messageCounter !== undefined && messageCounter > 0;

  return (
    <>
      {shouldRenderMessageCounter && (
        <span className="ml-2 inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-500 text-xs text-white">
          {messageCounter}
        </span>
      )}
    </>
  );
};

export default MessageCountIndicator;
