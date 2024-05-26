import Select from '../../../components/Select'
import ToggleButton from '../../../components/ToggleButton'
import styles from './FilterList.module.scss'

export default function FilterList() {
  return (
    <div className={styles.container}>
      <ToggleButton>홈짐</ToggleButton>
      <ToggleButton>마감제거</ToggleButton>
      <ToggleButton>필터링1</ToggleButton>
      <ToggleButton>필터링2</ToggleButton>
      <ToggleButton>필터링3</ToggleButton>
      <Select placeholder="모든 지역" items={['강남', '판교', '마포']} />
      <Select placeholder="성별" items={['남자', '여자']} />
      <Select placeholder="종목" items={['종목1', '종목2']} />
    </div>
  )
}
