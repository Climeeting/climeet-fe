import { useCheckAdditionalInfo } from '@/services/user'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdditionalInfoDialog from './Dialog/AdditionalInfoDialog'

export default function CheckAdditionalInfo() {
  const { data: checkAdditionalInfo } = useCheckAdditionalInfo()
  const [open, onOpenChange] = useState(false)

  useEffect(() => {
    onOpenChange(Boolean(checkAdditionalInfo?.isTrue))
  }, [checkAdditionalInfo?.isTrue])

  return (
    <>
      <Outlet />
      <AdditionalInfoDialog hasCancel={false} open={open} onOpenChange={onOpenChange} />
    </>
  )
}
