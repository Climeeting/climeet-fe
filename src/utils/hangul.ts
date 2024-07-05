/**
 * @desc 가~힣 사이에 있는 글자가 완성된 글자입니다. 'ㄱ', 'ㅏ' 등은 완성된 한글이 아닙니다.
 */
const HANGUL_START = 0xac00 // '가'의 유니코드
const HANGUL_END = 0xd7a3 // '힣'의 유니코드

export const Hangul = {
  isComplete(str: string): boolean {
    if (str === ' ') return true
    const code = str.charCodeAt(0)
    return code >= HANGUL_START && code <= HANGUL_END
  },
  isCompleteAll(str: string): boolean {
    return str.split('').every(this.isComplete)
  },
}
