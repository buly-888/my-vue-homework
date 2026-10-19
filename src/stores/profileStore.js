import { defineStore } from 'pinia'
import { ref } from 'vue'
import { profileHeader as defaultHeader, basicInfo as defaultBasic } from '../data/profileData'

export const useProfileStore = defineStore('profile', () => {
  const header = ref(
    JSON.parse(localStorage.getItem('profileHeader') || 'null') || { ...defaultHeader }
  )
  const basicInfo = ref(
    JSON.parse(localStorage.getItem('basicInfo') || 'null') || [...defaultBasic]
  )

  function updateHeader(data) {
    header.value = { ...header.value, ...data }
    localStorage.setItem('profileHeader', JSON.stringify(header.value))
  }

  function updateBasicInfo(list) {
    basicInfo.value = list.map(x => ({ ...x }))
    localStorage.setItem('basicInfo', JSON.stringify(basicInfo.value))
  }

  return { header, basicInfo, updateHeader, updateBasicInfo }
})