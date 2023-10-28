import { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props}) => {
    return <div {...props} className={cn('border-t border-zinc-300', className)}></div>
}

export default ChatInput