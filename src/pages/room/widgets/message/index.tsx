// src/pages/room/widgets/message/index.tsx
import {MsgType} from "@enums/room";
import Normal from "@pages/room/widgets/normal";
import Reminder from "@pages/room/widgets/reminder";
import Patient from "@pages/room/widgets/patient";
import SayDoctor from "@pages/room/widgets/say_doctor";
import SayPatient from "@pages/room/widgets/say_patient";
import {useTypedSelector} from "@store/index";
import {selectAuth} from "@store/slices/authSlice";

interface Props {
    messages: Message[];
}

export default function Message({ messages }: Props) {
    // 获取用户id
    const { id } = useTypedSelector(selectAuth);
    return <>
        {messages.map((message) => {
            switch (message.msgType) {
                case MsgType.Notify:
                    return <Normal key={message.id} msg={message.msg.content!} />;
                case MsgType.NotifyTip:
                    return <Reminder key={message.id} msg={message.msg.content!} />;
                case MsgType.CardPat:
                    return <Patient key={message.id} consultRecord={message.msg.consultRecord!} />;
                // 匹配文字类型的消息
                case MsgType.MsgText:
                    return message.from === id ? (
                        <SayPatient key={message.id} message={message} />
                    ) : (
                        <SayDoctor key={message.id} message={message} />
                    );
                default:
                    return null;
            }
        })}
    </>;
}