// src/pages/room/widgets/message/index.tsx
import {MsgType} from "@enums/room";
import Normal from "@pages/room/widgets/normal";
import Reminder from "@pages/room/widgets/reminder";
import Patient from "@pages/room/widgets/patient";
import SayDoctor from "@pages/room/widgets/say_doctor";
import SayPatient from "@pages/room/widgets/say_patient";
import {useTypedSelector} from "@store/index";
import {selectAuth} from "@store/slices/authSlice";
import {Message} from "../../../../types/room";
import Prescript from "@pages/room/widgets/prescript";
import Evaluate from "@pages/room/widgets/evaluate";
import EvaluateComplete from "@pages/room/widgets/evaluate_c";

interface Props {
    messages: Message[];
    orderId?: string;
    docId?: string;
    updateEvaluate?: (score: number) => void;
}

export default function MessageCom({messages, orderId, docId,updateEvaluate}: Props) {
    // 获取用户id
    const {id} = useTypedSelector(selectAuth);
    return <>
        {messages.map((message) => {
            switch (message.msgType) {
                case MsgType.Notify:
                    return <Normal key={message.id} msg={message.msg.content!}/>;
                case MsgType.NotifyTip:
                    return <Reminder key={message.id} msg={message.msg.content!}/>;
                case MsgType.CardPat:
                    return <Patient key={message.id} consultRecord={message.msg.consultRecord!}/>;
                // 匹配文字类型的消息
                case MsgType.MsgImage:
                case MsgType.MsgText:
                    return message.from === id ? (
                        <SayPatient key={message.id} message={message}/>
                    ) : (
                        <SayDoctor key={message.id} message={message}/>
                    );
                // 处方消息
                case MsgType.CardPre:
                    return <Prescript key={message.id} prescription={message.msg.prescription!}/>
                // 未评价
                case MsgType.CardEvaForm:
                    return <Evaluate updateEvaluate={updateEvaluate!} orderId={orderId!} docId={docId!} key={message.id}/>;

                // 已评价
                case MsgType.CardEva:
                    return <EvaluateComplete key={message.id} score={message.msg.evaluateDoc!.score}/>;

                default:
                    return null;
            }
        })}
    </>;
}