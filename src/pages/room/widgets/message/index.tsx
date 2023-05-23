// src/pages/room/widgets/message/index.tsx
import {MsgType} from "@enums/room";
import Normal from "@pages/room/widgets/normal";
import Reminder from "@pages/room/widgets/reminder";
import Patient from "@pages/room/widgets/patient";

interface Props {
    messages: Message[];
}

export default function Message({ messages }: Props) {
    return <>
        {messages.map((message) => {
            switch (message.msgType) {
                case MsgType.Notify:
                    return <Normal key={message.id} msg={message.msg.content!} />;
                case MsgType.NotifyTip:
                    return <Reminder key={message.id} msg={message.msg.content!} />;
                case MsgType.CardPat:
                    return <Patient key={message.id} consultRecord={message.msg.consultRecord!} />;
                default:
                    return null;
            }
        })}
    </>;
}