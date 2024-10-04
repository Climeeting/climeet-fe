import Icon from '@/components/Icon/Icon.tsx'

export default function Share () {
  return (
    <div onClick={() => {
      window.navigator.share({
        title: '클라이밋',
        text: '클라이밋',
        url: window.location.href,
      })
    }}
    >
      <Icon icon='Share' size={24} />
    </div>
  )
}
