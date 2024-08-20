import { useScript } from '@uidotdev/usehooks'
import { RefObject, useEffect, useRef, useState } from 'react'

/**
 * 카카오맵 스크립트 삽입하기
 */
export function useKakaoMap () {
  return useScript(
    `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`,
    {
      removeOnUnmount: false,
    },
  )
}

/**
 * 카카오맵 등록 여부 확인하기
 */
export function useKakaoMapReady () {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    window.kakao.maps.load(() => {
      setReady(true)
    })
  }, [])

  return ready
}

/**
 * 카카오맵 초기 설정하기
 */
export function useKakaoMapInit () {
  const ready = useKakaoMapReady()
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<kakao.maps.Map | null>(null)

  useEffect(
    function createMap () {
      if (!mapRef.current || !ready) return
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
        level: 4, // 지도의 레벨(확대, 축소 정도)
      } as kakao.maps.MapOptions
      map.current = new kakao.maps.Map(mapRef.current!, options) // 지도 생성 및 객체 리턴
    },
    [ready, mapRef.current],
  )

  return { mapRef, map }
}

/**
 * 주소로 마커와 텍스트 표시하기 (정적 이미지맵)
 * https://apis.map.kakao.com/web/sample/staticMapWithMarkerText/
 */
export function useKakaoStaticMap ({ name, address }: { name: string, address: string }) {
  const ready = useKakaoMapReady()
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<kakao.maps.StaticMap | null>(null)

  useEffect(
    function address2coord () {
      if (!ready || !name || !address) return
      const geocoder = new kakao.maps.services.Geocoder()

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const position = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x))
          drawMap(position)
        }
      })
    },
    [mapRef.current, name, address, ready],
  )

  const drawMap = (position: kakao.maps.LatLng) => {
    const staticMapOption = {
      center: position, // 이미지 지도의 중심좌표
      level: 4, // 이미지 지도의 확대 레벨
      marker: {
        position,
        text: name, // text 옵션을 설정하면 마커 위에 텍스트를 함께 표시할 수 있습니다
      }, // 이미지 지도에 표시할 마커
    }

    map.current = new kakao.maps.StaticMap(mapRef.current!, staticMapOption) // 지도 생성 및 객체 리턴
  }

  return { mapRef, map }
}

/**
 * 주소로 장소 커스텀하게 표시하기
 * https://apis.map.kakao.com/web/sample/addr2coord/
 */
export function useKakaoGeocoder ({
  map,
  address,
  name,
}: {
  map: RefObject<kakao.maps.Map>
  address: string
  name: string
}) {
  const ready = useKakaoMapReady()

  useEffect(
    function address2coord () {
      if (!map.current || !ready) return
      const geocoder = new kakao.maps.services.Geocoder()

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (!map.current) return

        if (status === kakao.maps.services.Status.OK) {
          const position = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x))

          // 커스텀 오버레이를 생성합니다
          const customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: getMapOverlay(name),
            xAnchor: 0.3,
            yAnchor: 0.91,
          })

          // 커스텀 오버레이를 지도에 표시합니다
          customOverlay.setMap(map.current)
          map.current.setCenter(position)
        }
      })
    },
    [ready, map.current],
  )
}

const getMapOverlay = (text: string) => {
  return `
<div style="${style}">${text}</div>
  `
}

const style = `
  width: 100px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding: 3px 8px;
  background-color: #333333;
  border-radius: 5px;
  font-size: 12px;
  color: white;
`
