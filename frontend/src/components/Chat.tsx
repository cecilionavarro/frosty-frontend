import { useSidebar } from './ui/sidebar'
import PromptInput from './PromptInput'

const Chat = () => {
  const { state, isMobile } = useSidebar()

  const getLeftPadding = () => {
    if (isMobile) return '1rem' // Default p-4 padding
    return state === 'expanded' ? 'calc(var(--sidebar-width) + 1rem)' : '1rem'
  }

  return (
    <div
      className='fixed bottom-0 left-0 right-0 p-4 transition-all duration-200 ease-linear'
      style={{
        paddingLeft: getLeftPadding(),
      }}
    >
      <PromptInput />
    </div>
  )
}

export default Chat