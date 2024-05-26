import { get_oauth_logout } from '../../services/oauth'
import Profile from './Profile'
import { useStack } from '@stackflow/react'
import { useFlow } from '../stackflow'
import { useEffect } from 'react'
import TopBar from '../../components/NavBar/TopBar'
import styles from './HomePage.module.scss'
import BottomBar from '../../components/NavBar/BottomBar'

export default function HomePage() {
  const stack = useStack()
  const { push } = useFlow()

  useEffect(() => {
    console.log({ stack })
    console.log('현재 쌓여진 액티비티들:', stack.activities)
    console.log('전체 전환 상태:', stack.globalTransitionState)
    console.log('초기에 설정된 Transition Duration 옵션', stack.transitionDuration)
  }, [stack])

  return (
    <div className={styles.container}>
      <TopBar />
      <main className={styles.main}>
        <button
          onClick={() => {
            push('LoginPage', {})
          }}
        >
          로그인 하러 가기
        </button>
        <button onClick={get_oauth_logout}>로그아웃</button>
        <Profile />
        <MockText />
      </main>
      <BottomBar />
    </div>
  )
}

function MockText() {
  return (
    <div>
      국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의
      이익을 보호한다. 중앙선거관리위원회는 대통령이 임명하는 3인, 국회에서 선출하는 3인과
      대법원장이 지명하는 3인의 위원으로 구성한다. 위원장은 위원중에서 호선한다. 대통령이 제1항의
      기간내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은 법률로서 확정된다. 국민의 모든
      자유와 권리는 국가안전보장·질서유지 또는 공공복리를 위하여 필요한 경우에 한하여 법률로써
      제한할 수 있으며, 제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수 없다. 제1항의
      지시를 받은 당해 행정기관은 이에 응하여야 한다. 사면·감형 및 복권에 관한 사항은 법률로 정한다.
      선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게 부담시킬 수 없다.
      국가는 여자의 복지와 권익의 향상을 위하여 노력하여야 한다. 제2항과 제3항의 처분에 대하여는
      법원에 제소할 수 없다. 정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.
      대통령은 내우·외환·천재·지변 또는 중대한 재정·경제상의 위기에 있어서 국가의 안전보장 또는
      공공의 안녕질서를 유지하기 위하여 긴급한 조치가 필요하고 국회의 집회를 기다릴 여유가 없을 때에
      한하여 최소한으로 필요한 재정·경제상의 처분을 하거나 이에 관하여 법률의 효력을 가지는 명령을
      발할 수 있다. 지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의
      범위안에서 자치에 관한 규정을 제정할 수 있다. 감사원은 세입·세출의 결산을 매년 검사하여
      대통령과 차년도국회에 그 결과를 보고하여야 한다. 국무총리·국무위원 또는 정부위원은 국회나 그
      위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다. 대한민국은
      통일을 지향하며, 자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다. 이
      헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 위원은
      정당에 가입하거나 정치에 관여할 수 없다. 법률이 헌법에 위반되는 여부가 재판의 전제가 된
      경우에는 법원은 헌법재판소에 제청하여 그 심판에 의하여 재판한다. 이 헌법은 1988년 2월 25일부터
      시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및
      국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다. 근로조건의 기준은
      인간의 존엄성을 보장하도록 법률로 정한다. 국회는 국정을 감사하거나 특정한 국정사안에 대하여
      조사할 수 있으며, 이에 필요한 서류의 제출 또는 증인의 출석과 증언이나 의견의 진술을 요구할 수
      있다. 의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 헌법재판소는 법률에
      저촉되지 아니하는 범위안에서 심판에 관한 절차, 내부규율과 사무처리에 관한 규칙을 제정할 수
      있다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다. 나는 헌법을 준수하고
      국가를 보위하며 조국의 평화적 통일과 국민의 자유와 복리의 증진 및 민족문화의 창달에 노력하여
      대통령으로서의 직책을 성실히 수행할 것을 국민 앞에 엄숙히 선서합니다. 국회의원은 국회에서
      직무상 행한 발언과 표결에 관하여 국회외에서 책임을 지지 아니한다. 공공필요에 의한 재산권의
      수용·사용 또는 제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다. 국토와
      자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다.
      법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게
      할 수 있다. 대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 지방의회의
      조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한
      사항은 법률로 정한다. 이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그
      효력을 지속한다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다. 국회의원은 그
      지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익
      또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다. 피고인의 자백이
      고문·폭행·협박·구속의 부당한 장기화 또는 기망 기타의 방법에 의하여 자의로 진술된 것이 아니라고
      인정될 때 또는 정식재판에 있어서 피고인의 자백이 그에게 불리한 유일한 증거일 때에는 이를
      유죄의 증거로 삼거나 이를 이유로 처벌할 수 없다. 대법원은 법률에 저촉되지 아니하는 범위안에서
      소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 국방상 또는
      국민경제상 긴절한 필요로 인하여 법률이 정하는 경우를 제외하고는, 사영기업을 국유 또는 공유로
      이전하거나 그 경영을 통제 또는 관리할 수 없다. 명령·규칙 또는 처분이 헌법이나 법률에 위반되는
      여부가 재판의 전제가 된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 국가는
      대외무역을 육성하며, 이를 규제·조정할 수 있다. 정부는 예산에 변경을 가할 필요가 있을 때에는
      추가경정예산안을 편성하여 국회에 제출할 수 있다. 대통령이 임시회의 집회를 요구할 때에는 기간과
      집회요구의 이유를 명시하여야 한다. 전직대통령의 신분과 예우에 관하여는 법률로 정한다. 모든
      국민은 학문과 예술의 자유를 가진다. 법률이 정하는 주요방위산업체에 종사하는 근로자의
      단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다. 국정감사 및
      조사에 관한 절차 기타 필요한 사항은 법률로 정한다. 국회의원의 선거구와 비례대표제 기타 선거에
      관한 사항은 법률로 정한다. 국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
      저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다. 대통령의 국법상 행위는 문서로써
      하며, 이 문서에는 국무총리와 관계 국무위원이 부서한다. 군사에 관한 것도 또한 같다. 일반사면을
      명하려면 국회의 동의를 얻어야 한다. 국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그
      자율적 활동과 발전을 보장한다. 공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는
      바에 의하여 국가 또는 공공단체에 정당한 배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은
      면제되지 아니한다. 국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며,
      그 정치적 중립성은 준수된다. 국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에
      응하기 위하여 국민경제자문회의를 둘 수 있다. 대법원장의 임기는 6년으로 하며, 중임할 수 없다.
      국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 공무원인 근로자는 법률이 정하는 자에
      한하여 단결권·단체교섭권 및 단체행동권을 가진다. 대한민국의 영토는 한반도와 그 부속도서로
      한다. 국회는 국가의 예산안을 심의·확정한다. 정부는 회계연도마다 예산안을 편성하여 회계연도
      개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다.
      국회의원은 국가이익을 우선하여 양심에 따라 직무를 행한다. 대법원장과 대법관이 아닌 법관의
      임기는 10년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다. 대법관의 임기는 6년으로 하며,
      법률이 정하는 바에 의하여 연임할 수 있다. 국가는 건전한 소비행위를 계도하고 생산품의
      품질향상을 촉구하기 위한 소비자보호운동을 법률이 정하는 바에 의하여 보장한다. 국회에 제출된
      법률안 기타의 의안은 회기중에 의결되지 못한 이유로 폐기되지 아니한다. 다만, 국회의원의 임기가
      만료된 때에는 그러하지 아니하다. 새로운 회계연도가 개시될 때까지 예산안이 의결되지 못한 때에는
      정부는 국회에서 예산안이 의결될 때까지 다음의 목적을 위한 경비는 전년도 예산에 준하여 집행할
      수 있다. 헌법재판소의 장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다. 사법권은
      법관으로 구성된 법원에 속한다. 국회에서 의결된 법률안은 정부에 이송되어 15일 이내에 대통령이
      공포한다. 누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다. 대통령은 국가의
      독립·영토의 보전·국가의 계속성과 헌법을 수호할 책무를 진다. 감사위원은 원장의 제청으로
      대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령의 선거에 관한
      사항은 법률로 정한다. 국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 모든
      국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다. 대법원에 대법관을 둔다. 다만, 법률이
      정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 국가는 균형있는 국민경제의 성장 및 안정과
      적정한 소득의 분배를 유지하고, 시장의 지배와 경제력의 남용을 방지하며, 경제주체간의 조화를
      통한 경제의 민주화를 위하여 경제에 관한 규제와 조정을 할 수 있다. 모든 국민은 법률이 정하는
      바에 의하여 납세의 의무를 진다. 모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다.
      헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다. 국가안전보장에 관련되는
      대외정책·군사정책과 국내정책의 수립에 관하여 국무회의의 심의에 앞서 대통령의 자문에 응하기
      위하여 국가안전보장회의를 둔다. 대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다.
      대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다. 공개하지 아니한 회의내용의
      공표에 관하여는 법률이 정하는 바에 의한다. 국회의 정기회는 법률이 정하는 바에 의하여 매년 1회
      집회되며, 국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에 의하여 집회된다.
      국무위원은 국무총리의 제청으로 대통령이 임명한다. 국가유공자·상이군경 및 전몰군경의 유가족은
      법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 행정각부의 설치·조직과
      직무범위는 법률로 정한다. 탄핵결정은 공직으로부터 파면함에 그친다. 그러나, 이에 의하여
      민사상이나 형사상의 책임이 면제되지는 아니한다. 대통령은 법률안의 일부에 대하여 또는 법률안을
      수정하여 재의를 요구할 수 없다. 국채를 모집하거나 예산외에 국가의 부담이 될 계약을 체결하려 할
      때에는 정부는 미리 국회의 의결을 얻어야 한다. 재의의 요구가 있을 때에는 국회는 재의에 붙이고,
      재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은
      법률로서 확정된다. 모든 국민은 헌법과 법률이 정한 법관에 의하여 법률에 의한 재판을 받을 권리를
      가진다. 국가는 청원에 대하여 심사할 의무를 진다. 공무원은 국민전체에 대한 봉사자이며, 국민에
      대하여 책임을 진다. 여자의 근로는 특별한 보호를 받으며, 고용·임금 및 근로조건에 있어서 부당한
      차별을 받지 아니한다. 군인·군무원·경찰공무원 기타 법률이 정하는 자가 전투·훈련등 직무집행과
      관련하여 받은 손해에 대하여는 법률이 정하는 보상외에 국가 또는 공공단체에 공무원의 직무상
      불법행위로 인한 배상은 청구할 수 없다. 국회의원은 현행범인인 경우를 제외하고는 회기중 국회의
      동의없이 체포 또는 구금되지 아니한다. 국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의
      회계검사와 행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여 대통령 소속하에 감사원을 둔다.
      대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한
      국무위원의 순서로 그 권한을 대행한다. 통신·방송의 시설기준과 신문의 기능을 보장하기 위하여
      필요한 사항은 법률로 정한다. 사회적 특수계급의 제도는 인정되지 아니하며, 어떠한 형태로도 이를
      창설할 수 없다. 누구든지 체포 또는 구속의 이유와 변호인의 조력을 받을 권리가 있음을 고지받지
      아니하고는 체포 또는 구속을 당하지 아니한다. 체포 또는 구속을 당한 자의 가족등 법률이 정하는
      자에게는 그 이유와 일시·장소가 지체없이 통지되어야 한다. 행정각부의 장은 국무위원 중에서
      국무총리의 제청으로 대통령이 임명한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의
      효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 그에 관한 필요한
      제한과 의무를 과할 수 있다. 모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적
      신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.
      탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다. 모든 국민은
      거주·이전의 자유를 가진다. 연소자의 근로는 특별한 보호를 받는다. 학교교육 및 평생교육을 포함한
      교육제도와 그 운영, 교육재정 및 교원의 지위에 관한 기본적인 사항은 법률로 정한다. 모든 국민은
      소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다. 국가는 노인과 청소년의
      복지향상을 위한 정책을 실시할 의무를 진다. 모든 국민은 근로의 권리를 가진다. 국가는
      사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는
      바에 의하여 최저임금제를 시행하여야 한다. 대통령은 제3항과 제4항의 사유를 지체없이 공포하여야
      한다. 중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을
      제정할 수 있으며, 법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다.
      각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 헌법재판소의 조직과 운영
      기타 필요한 사항은 법률로 정한다. 형사피해자는 법률이 정하는 바에 의하여 당해 사건의
      재판절차에서 진술할 수 있다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및
      단체행동권을 가진다. 대통령은 조국의 평화적 통일을 위한 성실한 의무를 진다. 모든 국민은
      인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 국가는 개인이 가지는 불가침의
      기본적 인권을 확인하고 이를 보장할 의무를 진다. 의무교육은 무상으로 한다. 대통령은 제4항과
      제5항의 규정에 의하여 확정된 법률을 지체없이 공포하여야 한다. 제5항에 의하여 법률이 확정된 후
      또는 제4항에 의한 확정법률이 정부에 이송된 후 5일 이내에 대통령이 공포하지 아니할 때에는
      국회의장이 이를 공포한다. 정당은 그 목적·조직과 활동이 민주적이어야 하며, 국민의 정치적
      의사형성에 참여하는데 필요한 조직을 가져야 한다.
    </div>
  )
}
